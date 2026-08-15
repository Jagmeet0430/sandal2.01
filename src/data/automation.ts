export type AutomationWorkflowNode = {
  id: "trigger" | "logic" | "action" | "output";
  label: string;
  title: string;
  detail: string;
  meta: string;
};

export const automationContent = {
  eyebrow: "SERVICE CAPABILITIES",
  number: "03",
  heading: "Automation",
  description:
    "Connected systems that reduce repetitive work, improve operational speed, and create reliable workflows across teams and tools.",
  bullets: [
    "Workflow automation",
    "System integrations",
    "Event-driven actions",
    "Approval and notification flows",
    "Operational monitoring",
    "Human-in-the-loop controls",
  ],
  cta: "Explore automation",
  progress: [
    "01 AI Products",
    "02 Cloud Platforms",
    "03 Automation",
    "04 Digital Intelligence",
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
