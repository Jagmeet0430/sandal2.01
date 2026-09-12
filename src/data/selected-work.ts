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
  eyebrow: "PORTFOLIO / CASE STUDIES",
  heading: "Proof-ready systems for real business impact",
  title: "AI-Enabled Company Platform",
  description:
    "A secure platform concept for enquiries, portfolio CMS, AI website assistance, workflow automation, analytics, and admin controls.",
  challenge:
    "Growing companies lose time when leads, project requests, case studies, website content, and follow-ups sit in disconnected tools.",
  solution:
    "Alyvora connects the enquiry, CMS, AI assistant, analytics, and follow-up workflow into one secure operating layer.",
  badges: ["AI Assistant", "Lead Management", "Admin CMS", "Analytics"],
  metrics: [
    {
      value: "40%",
      label: "less repetitive admin work",
    },
    {
      value: "3x",
      label: "faster enquiry follow-up",
    },
    {
      value: "24/7",
      label: "AI-assisted website support",
    },
  ],
  ctas: [
    {
      label: "View Case Study",
      href: "/work",
      variant: "primary",
    },
    {
      label: "Request a Project Quotation",
      href: "/contact",
      variant: "secondary",
    },
  ],
};
