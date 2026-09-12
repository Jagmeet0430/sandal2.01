export type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    title: "CommandFlow Operations",
    description:
      "Alyvora designed a workflow intelligence layer that helps operations teams prioritize exceptions, route approvals, and monitor service health in one secure workspace.",
    image: "/images/apexmind-case-commandflow.svg",
    tags: ["Operations", "Automation", "AI"],
  },
  {
    title: "SignalCare Platform",
    description:
      "Alyvora built an AI-assisted service platform that turns fragmented field data into clear next actions for coordinators, analysts, and executive teams.",
    image: "/images/apexmind-case-signalcare.svg",
    tags: ["Platform", "Analytics", "Cloud"],
  },
];
