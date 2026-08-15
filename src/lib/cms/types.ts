export type CmsStatus = "draft" | "published" | "archived";

export type HomeServiceCard = {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaUrl: string;
  order: number;
};

export type HomePillar = {
  id: string;
  number: string;
  title: string;
  description: string;
  order: number;
};

export type HomePageContent = {
  hero: {
    eyebrow: string;
    heading: string;
    highlightedHeading: string;
    paragraph: string;
    ctaLabel: string;
    ctaLink: string;
  };
  whatWeCreate: {
    eyebrow: string;
    heading: string;
    highlightedHeading: string;
    cards: HomeServiceCard[];
  };
  about: {
    eyebrow: string;
    heading: string;
    paragraph: string;
    pillars: HomePillar[];
  };
};

export type CmsVersion = {
  id: string;
  version: number;
  page: "home";
  editor: string;
  status: CmsStatus;
  createdAt: string;
  content: HomePageContent;
};

export type CmsAuditEvent = {
  id: string;
  user: string;
  action: "cms.edit" | "cms.draft_saved" | "cms.page_published" | "cms.version_restored";
  resource: string;
  timestamp: string;
  metadata?: Record<string, string | number | boolean>;
};

export type HomeCmsState = {
  page: "home";
  draft: HomePageContent;
  published: HomePageContent;
  lastSavedAt: string;
  lastPublishedAt: string;
  versions: CmsVersion[];
  auditLog: CmsAuditEvent[];
};
