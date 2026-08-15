import { NextResponse } from "next/server";
import { getHomeCmsState, publishHomeDraft, restoreHomeVersion, saveHomeDraft } from "@/lib/cms/store";
import type { HomePageContent } from "@/lib/cms/types";
import { validateHomeContent } from "@/lib/cms/validation";

export async function GET() {
  const state = await getHomeCmsState();
  return NextResponse.json(state);
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    action: "save-draft" | "publish" | "restore";
    content?: HomePageContent;
    version?: number;
  };

  try {
    if (body.action === "save-draft") {
      if (!body.content) {
        return NextResponse.json({ error: "Missing content" }, { status: 400 });
      }

      const validation = validateHomeContent(body.content);
      if (!validation.valid) {
        return NextResponse.json({ errors: validation.errors }, { status: 422 });
      }

      return NextResponse.json(await saveHomeDraft(body.content));
    }

    if (body.action === "publish") {
      return NextResponse.json(await publishHomeDraft());
    }

    if (body.action === "restore") {
      if (!body.version) {
        return NextResponse.json({ error: "Missing version" }, { status: 400 });
      }

      return NextResponse.json(await restoreHomeVersion(body.version));
    }

    return NextResponse.json({ error: "Unsupported action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "CMS action failed" },
      { status: 500 },
    );
  }
}
