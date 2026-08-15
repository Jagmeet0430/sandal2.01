import type { HomePageContent } from "@/lib/cms/types";

export type CmsValidationResult = {
  valid: boolean;
  errors: Record<string, string>;
};

function required(value: string | undefined, label: string, errors: Record<string, string>) {
  if (!value || !value.trim()) {
    errors[label] = "Required";
  }
}

function maxLength(value: string | undefined, label: string, limit: number, errors: Record<string, string>) {
  if (value && value.length > limit) {
    errors[label] = `Must be ${limit} characters or fewer`;
  }
}

function validUrl(value: string | undefined, label: string, errors: Record<string, string>) {
  if (!value || value.startsWith("/") || value.startsWith("#")) {
    return;
  }

  try {
    new URL(value);
  } catch {
    errors[label] = "Use a valid URL, route, or anchor";
  }
}

export function validateHomeContent(content: HomePageContent): CmsValidationResult {
  const errors: Record<string, string> = {};

  required(content.hero.eyebrow, "hero.eyebrow", errors);
  required(content.hero.heading, "hero.heading", errors);
  required(content.hero.highlightedHeading, "hero.highlightedHeading", errors);
  required(content.hero.paragraph, "hero.paragraph", errors);
  maxLength(content.hero.paragraph, "hero.paragraph", 220, errors);
  validUrl(content.hero.ctaLink, "hero.ctaLink", errors);

  required(content.whatWeCreate.eyebrow, "whatWeCreate.eyebrow", errors);
  required(content.whatWeCreate.heading, "whatWeCreate.heading", errors);
  required(content.whatWeCreate.highlightedHeading, "whatWeCreate.highlightedHeading", errors);

  content.whatWeCreate.cards.forEach((card, index) => {
    required(card.number, `whatWeCreate.cards.${index}.number`, errors);
    required(card.category, `whatWeCreate.cards.${index}.category`, errors);
    required(card.title, `whatWeCreate.cards.${index}.title`, errors);
    validUrl(card.ctaUrl, `whatWeCreate.cards.${index}.ctaUrl`, errors);
  });

  required(content.about.eyebrow, "about.eyebrow", errors);
  required(content.about.heading, "about.heading", errors);
  required(content.about.paragraph, "about.paragraph", errors);

  content.about.pillars.forEach((pillar, index) => {
    required(pillar.title, `about.pillars.${index}.title`, errors);
    required(pillar.description, `about.pillars.${index}.description`, errors);
  });

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
