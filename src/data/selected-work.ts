export type SelectedWorkMetric = {
  value: string;
  label: string;
};

export type SelectedWorkDetail = {
  label: string;
  value: string;
};

export type SelectedWorkCta = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
};

export type SelectedWork = {
  eyebrow: string;
  heading: string;
  title: string;
  description: string;
  challenge: string;
  solution: string;
  badges: string[];
  metrics: SelectedWorkMetric[];
  ctas: SelectedWorkCta[];
};

export const selectedWork: SelectedWork = {
  eyebrow: "SELECTED WORK",
  heading: "Selected systems built for measurable impact",
  title: "AI Operations Intelligence Platform",
  description:
    "A secure operational intelligence platform combining workflow automation, retrieval systems, analytics, and AI-assisted decision support.",
  challenge:
    "Operational teams were working across disconnected tools, manual approvals, and fragmented reporting, creating slower response times and limited visibility.",
  solution:
    "ApexMind designed an AI-assisted operations platform that connects workflows, retrieves relevant knowledge, surfaces live analytics, and supports faster operational decisions.",
  badges: ["AI Product", "Automation", "Cloud Platform", "Analytics"],
  metrics: [
    {
      value: "40%",
      label: "less manual processing",
    },
    {
      value: "3x",
      label: "faster operational reporting",
    },
    {
      value: "24/7",
      label: "AI-assisted decision support",
    },
  ],
  ctas: [
    {
      label: "View Case Study",
      href: "/work",
      variant: "primary",
    },
    {
      label: "Discuss a Similar Project",
      href: "/contact",
      variant: "secondary",
    },
  ],
};
