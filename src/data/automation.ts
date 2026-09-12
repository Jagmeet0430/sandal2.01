export type AutomationWorkflowNode = {
  id: "trigger" | "logic" | "action" | "output";
  label: string;
  title: string;
  detail: string;
  meta: string;
};

export const automationContent = {
  eyebrow: "AI & AUTOMATION",
  number: "03",
  heading: "Business automation built around real workflows",
  description:
    "Alyvora connects teams, tools, and data so repetitive work becomes reliable, monitored, and easier to improve.",
  bullets: [
    "AI assistants and chatbots",
    "RAG-based AI systems",
    "AI agents",
    "Workflow automation",
    "System integrations",
    "Human-in-the-loop controls",
  ],
  cta: "Book a Free Consultation",
  progress: [
    "01 AI Solutions",
    "02 Custom Software",
    "03 Automation",
    "04 Web & Mobile",
  ],
};

export const automationWorkflow: AutomationWorkflowNode[] = [
  {
    id: "trigger",
    label: "TRIGGER",
    title: "Event pulse",
    detail: "New request received",
    meta: "CRM INPUT",
  },
  {
    id: "logic",
    label: "LOGIC",
    title: "Decision layer",
    detail: "Rules route the work",
    meta: "POLICY CHECK",
  },
  {
    id: "action",
    label: "ACTION",
    title: "Execution",
    detail: "Tasks and approvals fire",
    meta: "API + EMAIL",
  },
  {
    id: "output",
    label: "OUTPUT",
    title: "Operational signal",
    detail: "Status updates monitored",
    meta: "REPORT READY",
  },
];

export const automationLabels = ["CRM", "API", "EMAIL", "DATA", "APPROVAL", "REPORT"];
