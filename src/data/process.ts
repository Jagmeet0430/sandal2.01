export type ProcessStageId = "discover" | "define" | "build" | "validate" | "scale";

export type ProcessStage = {
  id: ProcessStageId;
  number: string;
  title: string;
  description: string;
  points: string[];
  visualLabel: string;
};

export const processStages: ProcessStage[] = [
  {
    id: "discover",
    number: "01",
    title: "Discover",
    description:
      "We understand the business goal, users, current tools, required service, budget range, timeline, and launch constraints.",
    points: ["Problem brief", "User/workflow map", "Success metrics"],
    visualLabel: "DISCOVER",
  },
  {
    id: "define",
    number: "02",
    title: "Define",
    description:
      "We turn the brief into scope, features, technical architecture, content needs, integrations, and delivery milestones.",
    points: ["Feature scope", "Architecture plan", "Project estimate"],
    visualLabel: "DEFINE",
  },
  {
    id: "build",
    number: "03",
    title: "Build",
    description:
      "We design and engineer the website, app, dashboard, automation, API, AI workflow, or cloud platform in focused sprints.",
    points: ["UI/UX design", "Frontend/backend build", "AI integration"],
    visualLabel: "BUILD",
  },
  {
    id: "validate",
    number: "04",
    title: "Validate",
    description:
      "We test real workflows, responsive screens, forms, security basics, performance, integrations, and admin controls.",
    points: ["QA testing", "Security checks", "Launch checklist"],
    visualLabel: "VALIDATE",
  },
  {
    id: "scale",
    number: "05",
    title: "Scale",
    description:
      "We support improvements after launch: SEO, analytics, monitoring, automation, content updates, and new feature planning.",
    points: ["Analytics review", "Maintenance", "Roadmap updates"],
    visualLabel: "SCALE",
  },
];
