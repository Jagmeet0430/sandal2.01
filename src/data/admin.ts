import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BarChart3,
  Bot,
  CalendarDays,
  BriefcaseBusiness,
  CircleDollarSign,
  FileText,
  FolderKanban,
  HelpCircle,
  Image,
  LayoutDashboard,
  LockKeyhole,
  Mail,
  MessageSquareText,
  Newspaper,
  PlaySquare,
  Settings,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

export type AdminModuleId =
  | "dashboard"
  | "website"
  | "blog"
  | "portfolio"
  | "projects"
  | "services"
  | "crm"
  | "customers"
  | "ai"
  | "media"
  | "video"
  | "team"
  | "testimonials"
  | "faq"
  | "newsletter"
  | "sales"
  | "marketing"
  | "support"
  | "calendar"
  | "analytics"
  | "settings"
  | "users"
  | "audit"
  | "security";

export type AdminModule = {
  id: AdminModuleId;
  label: string;
  group: string;
  icon: LucideIcon;
  description: string;
};

export type LeadStatus = "New" | "Contacted" | "Proposal Sent" | "Negotiation" | "Won" | "Lost";

export type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  service: string;
  budget: string;
  source: string;
  status: LeadStatus;
  priority: "Low" | "Medium" | "High";
  owner: string;
  followUp: string;
};

export type CmsSection = {
  id: string;
  section: string;
  owner: string;
  status: "Published" | "Draft" | "Scheduled";
  updated: string;
  completion: number;
  copy: string;
};

export type ProjectStatus = "Discovery" | "Design" | "Build" | "Review" | "Launched";

export type AdminProject = {
  id: string;
  name: string;
  client: string;
  budget: string;
  deadline: string;
  status: ProjectStatus;
  priority: "Low" | "Medium" | "High";
  progress: number;
  owner: string;
  milestones: string[];
};

export type RoleName =
  | "Super Admin"
  | "Founder"
  | "CEO"
  | "Admin"
  | "Manager"
  | "HR"
  | "Finance"
  | "Marketing"
  | "Sales"
  | "Developer"
  | "Designer"
  | "Customer Support"
  | "Content Manager"
  | "Viewer";

export type PermissionAction =
  | "Create"
  | "Read"
  | "Update"
  | "Delete"
  | "Export"
  | "Publish"
  | "Approve"
  | "Assign"
  | "Manage Users"
  | "Manage Settings";

export type PermissionMatrix = Record<RoleName, Record<PermissionAction, boolean>>;

export const adminModules: AdminModule[] = [
  { id: "dashboard", label: "Dashboard", group: "Overview", icon: LayoutDashboard, description: "Business health, traffic, leads, revenue readiness, and system status." },
  { id: "website", label: "Website CMS", group: "Content", icon: FileText, description: "Hero, about, services, projects, testimonials, FAQ, navigation, and footer content." },
  { id: "blog", label: "Blog", group: "Content", icon: Newspaper, description: "Editorial calendar, SEO metadata, categories, authors, drafts, and publishing." },
  { id: "portfolio", label: "Portfolio", group: "Content", icon: FolderKanban, description: "Case studies, technologies, media, results, and project SEO fields." },
  { id: "projects", label: "Projects", group: "Operations", icon: FolderKanban, description: "Client delivery, tasks, milestones, budgets, deadlines, comments, and progress tracking." },
  { id: "services", label: "Services", group: "Content", icon: BriefcaseBusiness, description: "Service catalog, pricing, FAQs, ordering, visibility, and feature lists." },
  { id: "crm", label: "Lead CRM", group: "Growth", icon: MessageSquareText, description: "Inquiry pipeline, notes, owners, priorities, follow-ups, and CSV-ready filtering." },
  { id: "customers", label: "Customers", group: "Growth", icon: Users, description: "Companies, contacts, contracts, lifecycle stages, timelines, and account ownership." },
  { id: "ai", label: "AI Chat", group: "Growth", icon: Bot, description: "Knowledge base, prompt management, handoff queue, conversation quality, and exports." },
  { id: "newsletter", label: "Newsletter", group: "Growth", icon: Mail, description: "Subscribers, campaigns, templates, scheduling, analytics, and exports." },
  { id: "media", label: "Media Library", group: "Assets", icon: Image, description: "Images, documents, logos, folders, tags, previews, restore, and bulk uploads." },
  { id: "video", label: "Video", group: "Assets", icon: PlaySquare, description: "Central publishing, playlists, social scheduling, drafts, categories, and analytics." },
  { id: "team", label: "Team", group: "Operations", icon: Users, description: "Employees, departments, profiles, resumes, skills, social links, and status." },
  { id: "testimonials", label: "Testimonials", group: "Operations", icon: Star, description: "Reviews, ratings, customer images, approval workflow, and featured status." },
  { id: "faq", label: "FAQ", group: "Operations", icon: HelpCircle, description: "Categories, ordering, rich answers, publish controls, and search." },
  { id: "sales", label: "Sales", group: "Revenue", icon: CircleDollarSign, description: "Deals, quotes, proposals, invoices, payments, discounts, taxes, and revenue reporting." },
  { id: "marketing", label: "Marketing", group: "Revenue", icon: BarChart3, description: "SEO, campaigns, landing pages, social media, ads, ROI, CTR, CPC, and conversion rate." },
  { id: "support", label: "Support", group: "Customer", icon: MessageSquareText, description: "Tickets, live chat, email, WhatsApp readiness, call logs, priorities, and SLA tracking." },
  { id: "calendar", label: "Calendar", group: "Operations", icon: CalendarDays, description: "Meetings, tasks, follow-ups, deadlines, team events, and project milestones." },
  { id: "analytics", label: "Analytics", group: "Intelligence", icon: BarChart3, description: "Traffic, conversion, SEO, AI usage, blog, projects, and revenue-readiness metrics." },
  { id: "settings", label: "Settings", group: "System", icon: Settings, description: "Branding, SMTP, Cloudinary, analytics pixels, social links, SEO, legal, and API keys." },
  { id: "users", label: "Users & RBAC", group: "System", icon: ShieldCheck, description: "Roles, permission matrix, sessions, invitations, and account controls." },
  { id: "audit", label: "Audit Logs", group: "System", icon: Activity, description: "Login, logout, create, update, delete, publish, settings, and permission changes." },
  { id: "security", label: "Security", group: "System", icon: LockKeyhole, description: "2FA, device tracking, IP logs, password policy, rate limits, and secure sessions." },
];

export const dashboardMetrics = [
  { label: "Website Visitors", value: "28.4K", change: "+18.2%", detail: "30-day unique visitors" },
  { label: "Leads", value: "418", change: "+12.7%", detail: "Qualified inquiries" },
  { label: "Conversion Rate", value: "7.8%", change: "+2.1%", detail: "Visitor to lead" },
  { label: "AI Conversations", value: "1,942", change: "+31.5%", detail: "Automated support sessions" },
];

export const leadSeed: Lead[] = [
  { id: "LD-1048", name: "Riya Mehta", company: "Northstar Foods", email: "riya@northstar.example", service: "AI Operations Platform", budget: "$25k-$50k", source: "Website", status: "New", priority: "High", owner: "Aarav", followUp: "Today" },
  { id: "LD-1047", name: "Daniel Brooks", company: "Atlas Labs", email: "daniel@atlas.example", service: "Cloud Platform", budget: "$50k+", source: "Referral", status: "Proposal Sent", priority: "High", owner: "Maya", followUp: "Tomorrow" },
  { id: "LD-1046", name: "Sneha Rao", company: "Finova", email: "sneha@finova.example", service: "Automation", budget: "$10k-$25k", source: "LinkedIn", status: "Negotiation", priority: "Medium", owner: "Ishan", followUp: "Friday" },
  { id: "LD-1045", name: "Omar Aziz", company: "CareGrid", email: "omar@caregrid.example", service: "AI Assistant", budget: "$25k-$50k", source: "Search", status: "Contacted", priority: "Medium", owner: "Maya", followUp: "Next week" },
];

export const projectSeed: AdminProject[] = [
  {
    id: "PRJ-218",
    name: "AI Operations Platform",
    client: "Northstar Foods",
    budget: "$48,000",
    deadline: "Aug 28",
    status: "Build",
    priority: "High",
    progress: 68,
    owner: "Maya",
    milestones: ["Data model", "Dashboard MVP", "Workflow automation"],
  },
  {
    id: "PRJ-217",
    name: "Enterprise Knowledge Assistant",
    client: "Atlas Labs",
    budget: "$62,000",
    deadline: "Sep 12",
    status: "Design",
    priority: "High",
    progress: 42,
    owner: "Aarav",
    milestones: ["Prompt architecture", "Retrieval testing", "Admin controls"],
  },
  {
    id: "PRJ-216",
    name: "Cloud Migration Portal",
    client: "Finova",
    budget: "$35,000",
    deadline: "Aug 19",
    status: "Review",
    priority: "Medium",
    progress: 84,
    owner: "Ishan",
    milestones: ["Infrastructure", "Monitoring", "Security review"],
  },
  {
    id: "PRJ-215",
    name: "Digital Product Redesign",
    client: "CareGrid",
    budget: "$28,500",
    deadline: "Launched",
    status: "Launched",
    priority: "Medium",
    progress: 100,
    owner: "Maya",
    milestones: ["UX audit", "Design system", "Launch"],
  },
];

export const roleNames: RoleName[] = [
  "Super Admin",
  "Founder",
  "CEO",
  "Admin",
  "Manager",
  "HR",
  "Finance",
  "Marketing",
  "Sales",
  "Developer",
  "Designer",
  "Customer Support",
  "Content Manager",
  "Viewer",
];

export const permissionActions: PermissionAction[] = [
  "Create",
  "Read",
  "Update",
  "Delete",
  "Export",
  "Publish",
  "Approve",
  "Assign",
  "Manage Users",
  "Manage Settings",
];

export const permissionMatrixSeed: PermissionMatrix = roleNames.reduce((matrix, role) => {
  const elevated = ["Super Admin", "Founder", "CEO", "Admin"].includes(role);
  const manager = ["Manager", "Marketing", "Sales", "Developer", "Content Manager"].includes(role);

  matrix[role] = permissionActions.reduce((actions, permission) => {
    actions[permission] =
      elevated ||
      permission === "Read" ||
      (manager && ["Create", "Update", "Export", "Publish", "Assign"].includes(permission));

    return actions;
  }, {} as Record<PermissionAction, boolean>);

  return matrix;
}, {} as PermissionMatrix);

export const dealSeed = [
  { id: "DL-502", company: "Atlas Labs", stage: "Proposal Sent", value: "$62,000", probability: 72, owner: "Maya" },
  { id: "DL-501", company: "Northstar Foods", stage: "Negotiation", value: "$48,000", probability: 81, owner: "Aarav" },
  { id: "DL-500", company: "CareGrid", stage: "Won", value: "$28,500", probability: 100, owner: "Ishan" },
];

export const supportTicketSeed = [
  { id: "TCK-904", customer: "Northstar Foods", subject: "Workflow automation rules", priority: "High", sla: "2h left", status: "Open" },
  { id: "TCK-903", customer: "Atlas Labs", subject: "Knowledge base sync", priority: "Medium", sla: "Today", status: "In Progress" },
  { id: "TCK-902", customer: "Finova", subject: "Cloud dashboard access", priority: "Low", sla: "Tomorrow", status: "Waiting" },
];

export const calendarSeed = [
  { id: "CAL-1", title: "Northstar build review", type: "Meeting", date: "Today", time: "3:00 PM" },
  { id: "CAL-2", title: "Atlas proposal follow-up", type: "Follow-up", date: "Tomorrow", time: "11:30 AM" },
  { id: "CAL-3", title: "Finova launch checkpoint", type: "Milestone", date: "Friday", time: "5:00 PM" },
];

export const cmsSeed: CmsSection[] = [
  { id: "hero", section: "Hero Section", owner: "Content", status: "Published", updated: "2h ago", completion: 100, copy: "Intelligence built for what comes next." },
  { id: "about", section: "Company Story", owner: "Founder Office", status: "Draft", updated: "Today", completion: 72, copy: "ApexMind combines strategy, design, AI, and engineering." },
  { id: "services", section: "Services", owner: "Growth", status: "Published", updated: "Yesterday", completion: 96, copy: "AI products, automation, cloud platforms, and experience design." },
  { id: "case-studies", section: "Portfolio", owner: "Marketing", status: "Scheduled", updated: "Friday", completion: 84, copy: "Selected systems built for measurable impact." },
];

export const monthlyTraffic = [18, 22, 24, 21, 29, 34, 38, 43, 41, 48, 53, 61];
export const channelData = [
  { label: "Organic", value: 44 },
  { label: "Referral", value: 22 },
  { label: "Social", value: 18 },
  { label: "Direct", value: 16 },
];

export const auditEvents = [
  "Maya published Services section",
  "Aarav exported Lead CRM CSV",
  "System rotated session refresh tokens",
  "Ishan updated OpenAI prompt policy",
  "Security blocked 12 rate-limit attempts",
];
