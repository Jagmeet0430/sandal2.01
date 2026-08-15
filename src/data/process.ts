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
      "We study the business problem, user needs, existing workflows, technical constraints, and measurable goals.",
    points: ["Stakeholder discovery", "Workflow analysis", "Technical assessment"],
    visualLabel: "DISCOVER",
  },
  {
    id: "define",
    number: "02",
    title: "Define",
    description:
      "We turn discovery findings into a clear product direction, architecture, delivery plan, and success criteria.",
    points: ["Product scope", "System architecture", "Delivery roadmap"],
    visualLabel: "DEFINE",
  },
  {
    id: "build",
    number: "03",
    title: "Build",
    description:
      "We design and engineer the product in focused iterations with continuous technical review.",
    points: ["UX and interface design", "Application engineering", "AI and system integration"],
    visualLabel: "BUILD",
  },
  {
    id: "validate",
    number: "04",
    title: "Validate",
    description:
      "We test the product with real workflows, measure performance, address risk, and prepare for release.",
    points: ["Functional testing", "Security and reliability checks", "User validation"],
    visualLabel: "VALIDATE",
  },
  {
    id: "scale",
    number: "05",
    title: "Scale",
    description:
      "We improve performance, automate operations, monitor usage, and support long-term product growth.",
    points: ["Monitoring and optimization", "Infrastructure scaling", "Continuous improvement"],
    visualLabel: "SCALE",
  },
];
