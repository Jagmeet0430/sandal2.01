"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Clock3, Eye, RotateCcw, Save, Send } from "lucide-react";
import { defaultHomeContent } from "@/lib/cms/default-home";
import type { HomeCmsState, HomePageContent, HomePillar, HomeServiceCard } from "@/lib/cms/types";
import { validateHomeContent } from "@/lib/cms/validation";

const cmsPages = ["Home", "Capabilities", "Process", "Technology", "Work", "Contact"];
const cmsGlobals = ["Header", "Footer", "SEO", "Social Links", "Site Settings"];

type SaveStatus = "idle" | "saving" | "saved" | "error";

function updateAtPath<T>(items: T[], index: number, nextItem: T) {
  return items.map((item, itemIndex) => (itemIndex === index ? nextItem : item));
}

export function WebsiteCmsManager() {
  const [state, setState] = useState<HomeCmsState | null>(null);
  const [content, setContent] = useState<HomePageContent>(defaultHomeContent);
  const [activePage, setActivePage] = useState("Home");
  const [activeTab, setActiveTab] = useState("Content");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    let active = true;

    fetch("/api/admin/cms/home")
      .then((response) => response.json())
      .then((nextState: HomeCmsState) => {
        if (!active) {
          return;
        }

        setState(nextState);
        setContent(nextState.draft);
      })
      .catch(() => setSaveStatus("error"));

    return () => {
      active = false;
    };
  }, []);

  const validation = useMemo(() => validateHomeContent(content), [content]);

  useEffect(() => {
    setErrors(validation.errors);
  }, [validation]);

  const updateContent = (updater: (current: HomePageContent) => HomePageContent) => {
    setContent((current) => updater(current));
    setSaveStatus("idle");
  };

  const saveDraft = async () => {
    const result = validateHomeContent(content);
    setErrors(result.errors);

    if (!result.valid) {
      setSaveStatus("error");
      return;
    }

    setSaveStatus("saving");

    const response = await fetch("/api/admin/cms/home", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "save-draft", content }),
    });

    if (!response.ok) {
      setSaveStatus("error");
      return;
    }

    const nextState = (await response.json()) as HomeCmsState;
    setState(nextState);
    setContent(nextState.draft);
    setSaveStatus("saved");
  };

  const publish = async () => {
    await saveDraft();

    const response = await fetch("/api/admin/cms/home", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "publish" }),
    });

    if (!response.ok) {
      setSaveStatus("error");
      return;
    }

    const nextState = (await response.json()) as HomeCmsState;
    setState(nextState);
    setContent(nextState.draft);
    setSaveStatus("saved");
  };

  const restore = async (version: number) => {
    const response = await fetch("/api/admin/cms/home", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "restore", version }),
    });

    if (!response.ok) {
      setSaveStatus("error");
      return;
    }

    const nextState = (await response.json()) as HomeCmsState;
    setState(nextState);
    setContent(nextState.draft);
    setSaveStatus("saved");
  };

  const saveLabel = saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved" : "Save Draft";

  return (
    <div className="grid gap-6 xl:grid-cols-[270px_1fr]">
      <aside className="rounded-[28px] border border-white/[0.08] bg-[#121019] p-4">
        <p className="px-3 text-[10px] font-black uppercase tracking-[0.18em] text-[#777080]">Overview</p>
        <button
          type="button"
          className="mt-3 flex w-full items-center justify-between rounded-xl bg-[#8B3DFF]/16 px-3 py-3 text-left text-sm font-black text-white"
        >
          Website CMS
          <CheckCircle2 className="size-4 text-emerald-300" />
        </button>

        <p className="mt-6 px-3 text-[10px] font-black uppercase tracking-[0.18em] text-[#777080]">Pages</p>
        <div className="mt-3 grid gap-1">
          {cmsPages.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setActivePage(page)}
              className={[
                "rounded-xl px-3 py-2.5 text-left text-sm font-bold transition",
                activePage === page ? "bg-[#18141F] text-white" : "text-[#A69FAF] hover:bg-[#18141F] hover:text-white",
              ].join(" ")}
            >
              {page}
            </button>
          ))}
        </div>

        <p className="mt-6 px-3 text-[10px] font-black uppercase tracking-[0.18em] text-[#777080]">Global</p>
        <div className="mt-3 grid gap-1">
          {cmsGlobals.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setActivePage(item)}
              className={[
                "rounded-xl px-3 py-2.5 text-left text-sm font-bold transition",
                activePage === item ? "bg-[#18141F] text-white" : "text-[#A69FAF] hover:bg-[#18141F] hover:text-white",
              ].join(" ")}
            >
              {item}
            </button>
          ))}
        </div>
      </aside>

      <section className="grid gap-6">
        <div className="rounded-[28px] border border-white/[0.08] bg-[#121019] p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#8B5CF6]">Website CMS</p>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.035em]">{activePage} Page</h2>
              <p className="mt-2 flex items-center gap-2 text-sm text-[#A69FAF]">
                <Clock3 className="size-4" />
                Last saved {state ? new Date(state.lastSavedAt).toLocaleString() : "loading..."}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="/?preview=home-draft"
                target="_blank"
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/[0.08] bg-[#18141F] px-4 text-sm font-black text-[#A69FAF] transition hover:text-white"
              >
                <Eye className="size-4" />
                Preview
              </a>
              <button
                type="button"
                onClick={saveDraft}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/[0.08] bg-[#18141F] px-4 text-sm font-black text-white transition hover:border-[#8B3DFF]/45"
              >
                <Save className="size-4" />
                {saveLabel}
              </button>
              <button
                type="button"
                onClick={publish}
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-gradient-to-b from-[#8B3DFF] to-[#5B16C9] px-4 text-sm font-black text-white shadow-[0_16px_42px_rgba(139,61,255,0.25)] transition hover:-translate-y-0.5"
              >
                <Send className="size-4" />
                Publish
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {["Content", "Media", "SEO", "Advanced"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={[
                  "h-9 rounded-xl border px-3 text-xs font-black transition",
                  activeTab === tab
                    ? "border-[#8B3DFF]/45 bg-[#8B3DFF]/16 text-white"
                    : "border-white/[0.08] bg-[#18141F] text-[#A69FAF] hover:text-white",
                ].join(" ")}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {activePage === "Home" && activeTab === "Content" ? (
          <HomeContentEditor content={content} errors={errors} onChange={updateContent} />
        ) : null}

        {activePage === "Home" && activeTab === "Advanced" ? (
          <AdvancedPanel content={content} versions={state?.versions ?? []} onRestore={restore} />
        ) : null}

        {activePage === "Home" && activeTab !== "Content" && activeTab !== "Advanced" ? (
          <PlaceholderPanel title={`${activeTab} controls`} />
        ) : null}

        {activePage !== "Home" ? <PlaceholderPanel title={`${activePage} editor`} /> : null}
      </section>
    </div>
  );
}

function HomeContentEditor({
  content,
  errors,
  onChange,
}: {
  content: HomePageContent;
  errors: Record<string, string>;
  onChange: (updater: (current: HomePageContent) => HomePageContent) => void;
}) {
  const field = (label: string, value: string, onValue: (value: string) => void, errorKey: string, multiline = false) => (
    <label className="grid gap-2">
      <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#8B5CF6]">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onValue(event.target.value)}
          className="min-h-24 rounded-2xl border border-white/[0.08] bg-[#18141F] p-4 text-sm leading-7 text-white outline-none transition focus:border-[#8B3DFF]/55 focus:ring-4 focus:ring-[#8B3DFF]/12"
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onValue(event.target.value)}
          className="h-11 rounded-xl border border-white/[0.08] bg-[#18141F] px-4 text-sm text-white outline-none transition focus:border-[#8B3DFF]/55 focus:ring-4 focus:ring-[#8B3DFF]/12"
        />
      )}
      {errors[errorKey] ? <span className="text-xs font-bold text-red-300">{errors[errorKey]}</span> : null}
    </label>
  );

  return (
    <div className="grid gap-6">
      <Panel title="Hero">
        <div className="grid gap-4 lg:grid-cols-2">
          {field("Eyebrow", content.hero.eyebrow, (value) => onChange((current) => ({ ...current, hero: { ...current.hero, eyebrow: value } })), "hero.eyebrow")}
          {field("Heading", content.hero.heading, (value) => onChange((current) => ({ ...current, hero: { ...current.hero, heading: value } })), "hero.heading")}
          {field("Highlighted heading", content.hero.highlightedHeading, (value) => onChange((current) => ({ ...current, hero: { ...current.hero, highlightedHeading: value } })), "hero.highlightedHeading")}
          {field("CTA label", content.hero.ctaLabel, (value) => onChange((current) => ({ ...current, hero: { ...current.hero, ctaLabel: value } })), "hero.ctaLabel")}
          {field("CTA link", content.hero.ctaLink, (value) => onChange((current) => ({ ...current, hero: { ...current.hero, ctaLink: value } })), "hero.ctaLink")}
          <div className="lg:col-span-2">
            {field("Paragraph", content.hero.paragraph, (value) => onChange((current) => ({ ...current, hero: { ...current.hero, paragraph: value } })), "hero.paragraph", true)}
          </div>
        </div>
      </Panel>

      <Panel title="What We Create">
        <div className="grid gap-4 lg:grid-cols-3">
          {field("Section label", content.whatWeCreate.eyebrow, (value) => onChange((current) => ({ ...current, whatWeCreate: { ...current.whatWeCreate, eyebrow: value } })), "whatWeCreate.eyebrow")}
          {field("Heading", content.whatWeCreate.heading, (value) => onChange((current) => ({ ...current, whatWeCreate: { ...current.whatWeCreate, heading: value } })), "whatWeCreate.heading")}
          {field("Highlighted text", content.whatWeCreate.highlightedHeading, (value) => onChange((current) => ({ ...current, whatWeCreate: { ...current.whatWeCreate, highlightedHeading: value } })), "whatWeCreate.highlightedHeading")}
        </div>

        <div className="mt-5 grid gap-4">
          {content.whatWeCreate.cards.map((card, index) => (
            <ServiceCardEditor
              key={card.id}
              card={card}
              index={index}
              onChange={(nextCard) =>
                onChange((current) => ({
                  ...current,
                  whatWeCreate: {
                    ...current.whatWeCreate,
                    cards: updateAtPath(current.whatWeCreate.cards, index, nextCard),
                  },
                }))
              }
            />
          ))}
        </div>
      </Panel>

      <Panel title="About">
        <div className="grid gap-4 lg:grid-cols-2">
          {field("Eyebrow", content.about.eyebrow, (value) => onChange((current) => ({ ...current, about: { ...current.about, eyebrow: value } })), "about.eyebrow")}
          {field("Heading", content.about.heading, (value) => onChange((current) => ({ ...current, about: { ...current.about, heading: value } })), "about.heading")}
          <div className="lg:col-span-2">
            {field("Paragraph", content.about.paragraph, (value) => onChange((current) => ({ ...current, about: { ...current.about, paragraph: value } })), "about.paragraph", true)}
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {content.about.pillars.map((pillar, index) => (
            <PillarEditor
              key={pillar.id}
              pillar={pillar}
              onChange={(nextPillar) =>
                onChange((current) => ({
                  ...current,
                  about: {
                    ...current.about,
                    pillars: updateAtPath(current.about.pillars, index, nextPillar),
                  },
                }))
              }
            />
          ))}
        </div>
      </Panel>
    </div>
  );
}

function ServiceCardEditor({ card, index, onChange }: { card: HomeServiceCard; index: number; onChange: (card: HomeServiceCard) => void }) {
  return (
    <article className="rounded-[22px] border border-white/[0.08] bg-[#18141F] p-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#777080]">Card {index + 1}</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {(["number", "category", "title", "ctaLabel", "ctaUrl"] as const).map((key) => (
          <input
            key={key}
            value={card[key]}
            aria-label={key}
            onChange={(event) => onChange({ ...card, [key]: event.target.value })}
            className="h-10 rounded-xl border border-white/[0.08] bg-[#121019] px-3 text-sm text-white outline-none focus:border-[#8B3DFF]/55"
          />
        ))}
        <textarea
          value={card.description}
          aria-label="description"
          onChange={(event) => onChange({ ...card, description: event.target.value })}
          className="min-h-20 rounded-xl border border-white/[0.08] bg-[#121019] px-3 py-2 text-sm text-white outline-none focus:border-[#8B3DFF]/55 md:col-span-2 xl:col-span-4"
        />
      </div>
    </article>
  );
}

function PillarEditor({ pillar, onChange }: { pillar: HomePillar; onChange: (pillar: HomePillar) => void }) {
  return (
    <article className="rounded-[22px] border border-white/[0.08] bg-[#18141F] p-4">
      <input
        value={pillar.title}
        aria-label="pillar title"
        onChange={(event) => onChange({ ...pillar, title: event.target.value })}
        className="h-10 w-full rounded-xl border border-white/[0.08] bg-[#121019] px-3 text-sm font-bold text-white outline-none focus:border-[#8B3DFF]/55"
      />
      <textarea
        value={pillar.description}
        aria-label="pillar description"
        onChange={(event) => onChange({ ...pillar, description: event.target.value })}
        className="mt-3 min-h-24 w-full rounded-xl border border-white/[0.08] bg-[#121019] px-3 py-2 text-sm text-white outline-none focus:border-[#8B3DFF]/55"
      />
    </article>
  );
}

function AdvancedPanel({
  content,
  versions,
  onRestore,
}: {
  content: HomePageContent;
  versions: HomeCmsState["versions"];
  onRestore: (version: number) => void;
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.72fr]">
      <Panel title="Advanced JSON">
        <pre className="max-h-[560px] overflow-auto rounded-2xl bg-black/30 p-5 text-xs leading-6 text-[#A69FAF]">
          {JSON.stringify(content, null, 2)}
        </pre>
      </Panel>
      <Panel title="Version history">
        <div className="grid gap-3">
          {versions.map((version) => (
            <article key={version.id} className="flex items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-[#18141F] p-4">
              <div>
                <p className="font-black">Version {version.version}</p>
                <p className="mt-1 text-xs text-[#A69FAF]">{new Date(version.createdAt).toLocaleString()} - {version.editor}</p>
              </div>
              <button type="button" onClick={() => onRestore(version.version)} className="inline-flex h-9 items-center gap-2 rounded-xl border border-white/[0.08] px-3 text-xs font-black text-[#A69FAF] hover:text-white">
                <RotateCcw className="size-4" />
                Restore
              </button>
            </article>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function PlaceholderPanel({ title }: { title: string }) {
  return (
    <Panel title={title}>
      <p className="text-sm leading-7 text-[#A69FAF]">
        This workspace is prepared for the Website CMS module. Home content editing is live in this phase; the remaining
        page editors will follow the same draft, preview, publish, and version-history workflow.
      </p>
    </Panel>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[28px] border border-white/[0.08] bg-[#121019] p-5">
      <h3 className="mb-5 text-lg font-black tracking-[-0.025em]">{title}</h3>
      {children}
    </section>
  );
}
