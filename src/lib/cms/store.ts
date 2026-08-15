import { promises as fs } from "fs";
import path from "path";
import { createDefaultHomeCmsState, defaultHomeContent } from "@/lib/cms/default-home";
import type { CmsAuditEvent, HomeCmsState, HomePageContent } from "@/lib/cms/types";
import { validateHomeContent } from "@/lib/cms/validation";

const cmsDir = path.join(process.cwd(), ".cms");
const homeFile = path.join(cmsDir, "home.json");

async function ensureCmsDir() {
  await fs.mkdir(cmsDir, { recursive: true });
}

async function writeHomeState(state: HomeCmsState) {
  await ensureCmsDir();
  await fs.writeFile(homeFile, JSON.stringify(state, null, 2), "utf8");
}

function audit(action: CmsAuditEvent["action"], resource: string, metadata?: CmsAuditEvent["metadata"]): CmsAuditEvent {
  return {
    id: `audit-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    user: "Gopesh",
    action,
    resource,
    timestamp: new Date().toISOString(),
    metadata,
  };
}

export async function getHomeCmsState(): Promise<HomeCmsState> {
  try {
    const file = await fs.readFile(homeFile, "utf8");
    return JSON.parse(file) as HomeCmsState;
  } catch {
    const state = createDefaultHomeCmsState();
    await writeHomeState(state);
    return state;
  }
}

export async function getPublishedHomeContent(): Promise<HomePageContent> {
  try {
    const state = await getHomeCmsState();
    return state.published;
  } catch (error) {
    console.error("CMS published home content unavailable", error);
    return defaultHomeContent;
  }
}

export async function getDraftHomeContent(): Promise<HomePageContent> {
  try {
    const state = await getHomeCmsState();
    return state.draft;
  } catch (error) {
    console.error("CMS draft home content unavailable", error);
    return defaultHomeContent;
  }
}

export async function saveHomeDraft(content: HomePageContent): Promise<HomeCmsState> {
  const result = validateHomeContent(content);

  if (!result.valid) {
    throw new Error(JSON.stringify(result.errors));
  }

  const state = await getHomeCmsState();
  const next: HomeCmsState = {
    ...state,
    draft: content,
    lastSavedAt: new Date().toISOString(),
    auditLog: [audit("cms.draft_saved", "home"), ...state.auditLog].slice(0, 50),
  };

  await writeHomeState(next);
  return next;
}

export async function publishHomeDraft(): Promise<HomeCmsState> {
  const state = await getHomeCmsState();
  const result = validateHomeContent(state.draft);

  if (!result.valid) {
    throw new Error(JSON.stringify(result.errors));
  }

  const now = new Date().toISOString();
  const version = (state.versions[0]?.version ?? 0) + 1;
  const next: HomeCmsState = {
    ...state,
    published: state.draft,
    lastPublishedAt: now,
    versions: [
      {
        id: `home-v${version}-${Date.now()}`,
        version,
        page: "home",
        editor: "Gopesh",
        status: "published",
        createdAt: now,
        content: state.draft,
      },
      ...state.versions,
    ],
    auditLog: [audit("cms.page_published", "home", { version }), ...state.auditLog].slice(0, 50),
  };

  await writeHomeState(next);
  return next;
}

export async function restoreHomeVersion(version: number): Promise<HomeCmsState> {
  const state = await getHomeCmsState();
  const selected = state.versions.find((item) => item.version === version);

  if (!selected) {
    throw new Error("Version not found");
  }

  const next: HomeCmsState = {
    ...state,
    draft: selected.content,
    lastSavedAt: new Date().toISOString(),
    auditLog: [audit("cms.version_restored", "home", { version }), ...state.auditLog].slice(0, 50),
  };

  await writeHomeState(next);
  return next;
}
