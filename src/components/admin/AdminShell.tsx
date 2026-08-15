"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowDownToLine,
  Bell,
  CheckCircle2,
  ChevronDown,
  Command,
  Filter,
  Menu,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { WebsiteCmsManager } from "@/components/admin/WebsiteCmsManager";
import {
  adminModules,
  auditEvents,
  calendarSeed,
  channelData,
  dashboardMetrics,
  dealSeed,
  leadSeed,
  monthlyTraffic,
  permissionActions,
  permissionMatrixSeed,
  projectSeed,
  roleNames,
  supportTicketSeed,
  type AdminModuleId,
  type AdminProject,
  type Lead,
  type LeadStatus,
  type PermissionAction,
  type PermissionMatrix,
  type ProjectStatus,
  type RoleName,
} from "@/data/admin";

const leadStatuses: LeadStatus[] = ["New", "Contacted", "Proposal Sent", "Negotiation", "Won", "Lost"];
const projectStatuses: ProjectStatus[] = ["Discovery", "Design", "Build", "Review", "Launched"];

const moduleCopy: Partial<Record<AdminModuleId, string[]>> = {
  blog: ["SEO-ready editor", "Categories and tags", "Publishing calendar", "Open Graph metadata"],
  portfolio: ["Case-study builder", "Technology taxonomy", "Results and metrics", "Media gallery"],
  services: ["Service ordering", "Pricing controls", "FAQ mapping", "Visibility scheduling"],
  customers: ["Account timeline", "Company records", "Contract tracking", "Lifecycle health"],
  ai: ["Knowledge uploads", "Prompt versions", "Human handoff", "Conversation exports"],
  media: ["Folder manager", "Drag and drop upload", "Bulk actions", "Restore deleted files"],
  video: ["Central asset library", "Social scheduling", "Playlist manager", "Performance analytics"],
  team: ["Employee profiles", "Department status", "Skills and resumes", "Public visibility"],
  testimonials: ["Approval workflow", "Featured reviews", "Rating controls", "Customer media"],
  faq: ["Category ordering", "Rich answers", "Publish control", "Search tuning"],
  newsletter: ["Campaign builder", "Template system", "Subscriber export", "Delivery analytics"],
  marketing: ["SEO campaigns", "Landing pages", "Ad performance", "ROI reporting"],
  analytics: ["Traffic sources", "Lead conversion", "SEO performance", "AI usage trends"],
  settings: ["Branding", "SMTP and Resend", "Cloudinary", "Analytics pixels"],
  audit: ["Immutable timeline", "Actor tracking", "Object diffs", "Exportable history"],
};

export function AdminShell() {
  const [activeModule, setActiveModule] = useState<AdminModuleId>("dashboard");
  const [query, setQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [leads, setLeads] = useState<Lead[]>(leadSeed);
  const [projects, setProjects] = useState<AdminProject[]>(projectSeed);
  const [permissionMatrix, setPermissionMatrix] = useState<PermissionMatrix>(permissionMatrixSeed);

  useEffect(() => {
    const storedProjects = window.localStorage.getItem("apexmind-admin-projects");
    const storedPermissions = window.localStorage.getItem("apexmind-admin-permissions");

    if (storedProjects) {
      setProjects(JSON.parse(storedProjects) as AdminProject[]);
    }

    if (storedPermissions) {
      setPermissionMatrix(JSON.parse(storedPermissions) as PermissionMatrix);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("apexmind-admin-projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    window.localStorage.setItem("apexmind-admin-permissions", JSON.stringify(permissionMatrix));
  }, [permissionMatrix]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((open) => !open);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = window.setTimeout(() => setToast(""), 2800);

    return () => window.clearTimeout(timer);
  }, [toast]);

  const filteredModules = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) {
      return adminModules;
    }

    return adminModules.filter((module) =>
      [module.label, module.group, module.description].some((field) => field.toLowerCase().includes(value)),
    );
  }, [query]);

  const active = adminModules.find((module) => module.id === activeModule) ?? adminModules[0];

  const updateLeadStatus = (leadId: string, status: LeadStatus) => {
    setLeads((current) => current.map((lead) => (lead.id === leadId ? { ...lead, status } : lead)));
    setToast(`Lead ${leadId} moved to ${status}.`);
  };

  const updateProjectStatus = (projectId: string, status: ProjectStatus) => {
    setProjects((current) =>
      current.map((project) =>
        project.id === projectId
          ? {
              ...project,
              status,
              progress: status === "Launched" ? 100 : Math.max(project.progress, projectStatuses.indexOf(status) * 22),
            }
          : project,
      ),
    );
    setToast(`Project ${projectId} moved to ${status}.`);
  };

  const togglePermission = (role: RoleName, permission: PermissionAction) => {
    setPermissionMatrix((current) => ({
      ...current,
      [role]: {
        ...current[role],
        [permission]: !current[role][permission],
      },
    }));
    setToast(`${role} ${permission} permission updated.`);
  };

  const exportLeads = () => {
    const csv = [
      ["ID", "Name", "Company", "Email", "Service", "Budget", "Source", "Status", "Priority", "Owner", "Follow Up"],
      ...leads.map((lead) => [
        lead.id,
        lead.name,
        lead.company,
        lead.email,
        lead.service,
        lead.budget,
        lead.source,
        lead.status,
        lead.priority,
        lead.owner,
        lead.followUp,
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "apexmind-leads.csv";
    link.click();
    URL.revokeObjectURL(url);
    setToast("Lead CSV exported.");
  };

  return (
    <main id="main-content" className="dark min-h-screen overflow-x-hidden bg-[#06060A] text-[#F5F2FA]">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_82%_10%,rgba(139,61,255,0.16),transparent_31%),radial-gradient(circle_at_10%_72%,rgba(116,83,255,0.10),transparent_30%)]" />
      <div className="fixed inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:64px_64px]" />

      <AdminSidebar
        activeModule={activeModule}
        modules={filteredModules}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSelect={(moduleId) => {
          setActiveModule(moduleId);
          setSidebarOpen(false);
        }}
      />

      <section className="relative z-10 min-h-screen lg:pl-[292px]">
        <AdminTopbar
          activeLabel={active.label}
          query={query}
          notificationsOpen={notificationsOpen}
          onQueryChange={setQuery}
          onMenu={() => setSidebarOpen(true)}
          onCommand={() => setCommandOpen(true)}
          onNotifications={() => setNotificationsOpen((open) => !open)}
        />

        <div className="mx-auto w-full max-w-[1520px] px-4 pb-10 pt-24 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#A855F7]">
                {active.group}
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{active.label}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#A49EAE]">
                {active.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setCommandOpen(true)}
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.08] bg-[#111018] px-4 text-sm font-bold text-[#A49EAE] backdrop-blur-xl transition hover:border-[#8B3DFF]/45 hover:bg-[#15131E] hover:text-[#F5F2FA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8B3DFF]"
              >
                <Command className="size-4" />
                Command
              </button>
              <button
                type="button"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-b from-[#8B3DFF] to-[#5B16C9] px-5 text-sm font-bold text-white shadow-[0_18px_50px_rgba(139,61,255,0.28)] transition hover:-translate-y-0.5 hover:from-[#A855F7] hover:to-[#7453FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8B3DFF]"
              >
                <Plus className="size-4" />
                Create
              </button>
            </div>
          </div>

          {activeModule === "dashboard" ? <DashboardPanel leads={leads} /> : null}
          {activeModule === "website" ? <WebsiteCmsManager /> : null}
          {activeModule === "crm" ? <CrmPanel leads={leads} onStatusChange={updateLeadStatus} onExport={exportLeads} /> : null}
          {activeModule === "projects" ? <ProjectsPanel projects={projects} onStatusChange={updateProjectStatus} /> : null}
          {activeModule === "users" ? (
            <RoleManagementPanel matrix={permissionMatrix} onToggle={togglePermission} />
          ) : null}
          {activeModule === "sales" ? <SalesPanel /> : null}
          {activeModule === "support" ? <SupportPanel /> : null}
          {activeModule === "calendar" ? <CalendarPanel /> : null}
          {!["dashboard", "website", "crm", "projects", "users", "sales", "support", "calendar"].includes(activeModule) ? (
            <ModulePanel moduleId={activeModule} />
          ) : null}
        </div>
      </section>

      <CommandPalette
        open={commandOpen}
        modules={adminModules}
        onClose={() => setCommandOpen(false)}
        onSelect={(moduleId) => {
          setActiveModule(moduleId);
          setCommandOpen(false);
        }}
      />

      <AnimatePresence>
        {notificationsOpen ? <NotificationPanel onClose={() => setNotificationsOpen(false)} /> : null}
        {toast ? <Toast message={toast} /> : null}
      </AnimatePresence>
    </main>
  );
}

function AdminSidebar({
  activeModule,
  modules,
  open,
  onClose,
  onSelect,
}: {
  activeModule: AdminModuleId;
  modules: typeof adminModules;
  open: boolean;
  onClose: () => void;
  onSelect: (moduleId: AdminModuleId) => void;
}) {
  const grouped = modules.reduce<Record<string, typeof adminModules>>((acc, module) => {
    acc[module.group] = [...(acc[module.group] ?? []), module];
    return acc;
  }, {});

  return (
    <>
      <button
        type="button"
        aria-label="Close admin sidebar"
        className={["fixed inset-0 z-30 bg-black/35 lg:hidden", open ? "block" : "hidden"].join(" ")}
        onClick={onClose}
      />

      <aside
        className={[
          "fixed inset-y-0 left-0 z-40 w-[292px] border-r border-white/[0.08] bg-[#0B0A11]/95 p-4 shadow-[24px_0_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-2 py-2">
            <Link href="/" className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-2xl bg-violet-600 text-sm font-black text-white shadow-[0_16px_40px_rgba(124,44,255,0.32)]">
                A
              </span>
              <span>
                <span className="block text-sm font-black">ApexMind</span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#A49EAE]">
                  Admin OS
                </span>
              </span>
            </Link>

            <button type="button" className="grid size-9 place-items-center rounded-xl border border-white/[0.08] bg-[#15131E] text-[#F5F2FA] lg:hidden" onClick={onClose}>
              <X className="size-5" />
            </button>
          </div>

          <nav className="mt-5 flex-1 space-y-6 overflow-y-auto pr-1">
            {Object.entries(grouped).map(([group, items]) => (
              <div key={group}>
                <p className="mb-2 px-3 text-[10px] font-black uppercase tracking-[0.18em] text-[#6F687A]">{group}</p>
                <div className="grid gap-1">
                  {items.map((item) => {
                    const Icon = item.icon;
                    const active = activeModule === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => onSelect(item.id)}
                        className={[
                          "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8B3DFF]",
                          active
                            ? "bg-[#15131E] text-white shadow-[inset_3px_0_0_#8B3DFF,0_14px_40px_rgba(0,0,0,0.22)]"
                            : "text-[#A49EAE] hover:bg-[#15131E]/78 hover:text-white",
                        ].join(" ")}
                      >
                        <Icon className={["size-4 shrink-0", active ? "text-[#A855F7]" : "text-[#746D80] group-hover:text-[#A855F7]"].join(" ")} />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-4 rounded-[20px] border border-white/[0.08] bg-[#111018] p-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-5 text-[#A855F7]" />
              <p className="text-sm font-black">Security posture</p>
            </div>
            <p className="mt-2 text-xs leading-6 text-[#A49EAE]">
              RBAC matrix, 2FA policy, sessions, and audit logs are mapped for the admin workspace.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

function AdminTopbar({
  activeLabel,
  query,
  notificationsOpen,
  onQueryChange,
  onMenu,
  onCommand,
  onNotifications,
}: {
  activeLabel: string;
  query: string;
  notificationsOpen: boolean;
  onQueryChange: (value: string) => void;
  onMenu: () => void;
  onCommand: () => void;
  onNotifications: () => void;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/[0.08] bg-[#06060A]/86 backdrop-blur-2xl lg:left-[292px]">
      <div className="flex h-20 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          aria-label="Open admin sidebar"
          className="grid size-10 place-items-center rounded-xl border border-white/[0.08] bg-[#111018] text-[#F5F2FA] transition hover:bg-[#15131E] lg:hidden"
          onClick={onMenu}
        >
          <Menu className="size-5" />
        </button>

        <div className="hidden min-w-0 text-sm font-bold text-[#A49EAE] md:block">
          Dashboard / <span className="text-[#F5F2FA]">{activeLabel}</span>
        </div>

        <div className="relative ml-auto hidden w-full max-w-xl md:block">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#706979]" />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search modules, settings, leads..."
            className="h-11 w-full rounded-xl border border-white/[0.08] bg-[#111018] pl-11 pr-24 text-sm text-[#F5F2FA] outline-none transition placeholder:text-[#706979] focus:border-[#8B3DFF]/55 focus:ring-4 focus:ring-[#8B3DFF]/12"
          />
          <button
            type="button"
            onClick={onCommand}
            className="absolute right-2 top-1/2 inline-flex h-8 -translate-y-1/2 items-center gap-1 rounded-lg border border-white/[0.08] bg-[#15131E] px-3 text-[11px] font-black text-[#A49EAE] transition hover:text-white"
          >
            <Command className="size-3" />
            K
          </button>
        </div>

        <button
          type="button"
          onClick={onCommand}
          className="hidden h-11 items-center gap-2 rounded-xl bg-gradient-to-b from-[#8B3DFF] to-[#5B16C9] px-4 text-sm font-black text-white shadow-[0_14px_36px_rgba(139,61,255,0.26)] transition hover:-translate-y-0.5 hover:from-[#A855F7] hover:to-[#7453FF] sm:inline-flex"
        >
          <Plus className="size-4" />
          Create
        </button>

        <button
          type="button"
          aria-label="Open notifications"
          aria-expanded={notificationsOpen}
          onClick={onNotifications}
          className="relative grid size-11 place-items-center rounded-xl border border-white/[0.08] bg-[#111018] text-[#F5F2FA] transition hover:border-[#8B3DFF]/45 hover:bg-[#15131E]"
        >
          <Bell className="size-4" />
          <span className="absolute right-3 top-3 size-2 rounded-full bg-red-500" />
        </button>

        <button
          type="button"
          className="hidden h-11 items-center gap-3 rounded-xl border border-white/[0.08] bg-[#111018] px-2 pr-4 text-sm font-bold text-[#F5F2FA] transition hover:bg-[#15131E] sm:flex"
        >
          <span className="grid size-7 place-items-center rounded-full bg-violet-600 text-xs text-white">GM</span>
          Gopesh
          <ChevronDown className="size-4 text-[#706979]" />
        </button>
      </div>
    </header>
  );
}

function DashboardPanel({ leads }: { leads: Lead[] }) {
  return (
    <div className="grid gap-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <article key={metric.label} className="rounded-[26px] border border-black/10 bg-white/74 p-5 shadow-[0_24px_70px_rgba(47,28,73,0.10)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.055] dark:shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
            <p className="text-sm font-bold text-[#625c6d] dark:text-[#aaa4b8]">{metric.label}</p>
            <div className="mt-4 flex items-end justify-between gap-3">
              <p className="text-3xl font-black tracking-[-0.04em]">{metric.value}</p>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-700 dark:text-emerald-300">
                {metric.change}
              </span>
            </div>
            <p className="mt-3 text-xs text-[#8b8495]">{metric.detail}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.55fr_0.9fr]">
        <Panel title="Monthly analytics" action="View report">
          <LineChart values={monthlyTraffic} />
        </Panel>
        <Panel title="Traffic sources" action="Configure">
          <DonutLegend />
        </Panel>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel title="Recent contact requests" action={`${leads.length} leads`}>
          <div className="space-y-3">
            {leads.slice(0, 3).map((lead) => (
              <div key={lead.id} className="flex items-center justify-between gap-4 rounded-2xl border border-black/10 bg-black/[0.025] p-4 dark:border-white/10 dark:bg-white/[0.04]">
                <div>
                  <p className="font-black">{lead.name}</p>
                  <p className="mt-1 text-xs text-[#625c6d] dark:text-[#aaa4b8]">{lead.company} - {lead.service}</p>
                </div>
                <StatusBadge status={lead.status} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="System status" action="Healthy">
          <div className="grid gap-3">
            {["API Routes", "Theme Engine", "AI Knowledge Base", "Email Delivery"].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-2xl border border-black/10 p-4 dark:border-white/10">
                <span className="text-sm font-bold">{item}</span>
                <span className="inline-flex items-center gap-2 text-xs font-black text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="size-4" />
                  Online
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </section>
    </div>
  );
}

function CrmPanel({
  leads,
  onStatusChange,
  onExport,
}: {
  leads: Lead[];
  onStatusChange: (leadId: string, status: LeadStatus) => void;
  onExport: () => void;
}) {
  const [filter, setFilter] = useState("All");
  const visibleLeads = filter === "All" ? leads : leads.filter((lead) => lead.status === filter);

  return (
    <Panel title="Lead CRM pipeline" action={`${visibleLeads.length} visible`}>
      <div className="mb-5 flex flex-wrap gap-3">
        <button type="button" onClick={onExport} className="inline-flex h-10 items-center gap-2 rounded-full bg-violet-600 px-4 text-sm font-black text-white">
          <ArrowDownToLine className="size-4" />
          Export CSV
        </button>
        <div className="inline-flex h-10 items-center gap-2 rounded-full border border-black/10 px-4 text-sm font-bold dark:border-white/10">
          <Filter className="size-4" />
          <select value={filter} onChange={(event) => setFilter(event.target.value)} className="bg-transparent outline-none">
            <option>All</option>
            {leadStatuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.14em] text-[#8b8495]">
            <tr className="border-b border-black/10 dark:border-white/10">
              <th className="py-4 pr-4">Lead</th>
              <th className="py-4 pr-4">Service</th>
              <th className="py-4 pr-4">Budget</th>
              <th className="py-4 pr-4">Priority</th>
              <th className="py-4 pr-4">Owner</th>
              <th className="py-4 pr-4">Follow-up</th>
              <th className="py-4 pr-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {visibleLeads.map((lead) => (
              <tr key={lead.id} className="border-b border-black/5 dark:border-white/5">
                <td className="py-4 pr-4">
                  <p className="font-black">{lead.name}</p>
                  <p className="mt-1 text-xs text-[#8b8495]">{lead.company} - {lead.email}</p>
                </td>
                <td className="py-4 pr-4 text-[#625c6d] dark:text-[#aaa4b8]">{lead.service}</td>
                <td className="py-4 pr-4">{lead.budget}</td>
                <td className="py-4 pr-4">
                  <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-black text-violet-700 dark:text-violet-300">{lead.priority}</span>
                </td>
                <td className="py-4 pr-4">{lead.owner}</td>
                <td className="py-4 pr-4">{lead.followUp}</td>
                <td className="py-4 pr-4">
                  <select
                    value={lead.status}
                    onChange={(event) => onStatusChange(lead.id, event.target.value as LeadStatus)}
                    className="rounded-full border border-black/10 bg-white/75 px-3 py-2 text-xs font-black outline-none dark:border-white/10 dark:bg-white/[0.06]"
                  >
                    {leadStatuses.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function ProjectsPanel({
  projects,
  onStatusChange,
}: {
  projects: AdminProject[];
  onStatusChange: (projectId: string, status: ProjectStatus) => void;
}) {
  return (
    <div className="grid gap-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {projectStatuses.map((status) => {
          const matchingProjects = projects.filter((project) => project.status === status);

          return (
            <article key={status} className="rounded-[26px] border border-black/10 bg-white/70 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.055]">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-black">{status}</h2>
                <span className="rounded-full bg-violet-500/10 px-2.5 py-1 text-xs font-black text-violet-700 dark:text-violet-300">
                  {matchingProjects.length}
                </span>
              </div>

              <div className="mt-4 grid gap-3">
                {matchingProjects.map((project) => (
                  <div key={project.id} className="rounded-2xl border border-black/10 bg-white/72 p-4 dark:border-white/10 dark:bg-white/[0.045]">
                    <p className="text-xs font-black text-[#8b8495]">{project.id}</p>
                    <h3 className="mt-2 font-black leading-tight">{project.name}</h3>
                    <p className="mt-2 text-xs text-[#625c6d] dark:text-[#aaa4b8]">{project.client}</p>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                      <span className="block h-full rounded-full bg-violet-600" style={{ width: `${project.progress}%` }} />
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3 text-xs">
                      <span className="font-black">{project.budget}</span>
                      <span className="text-[#8b8495]">{project.deadline}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </section>

      <Panel title="Project control table" action={`${projects.length} projects`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.14em] text-[#8b8495]">
              <tr className="border-b border-black/10 dark:border-white/10">
                <th className="py-4 pr-4">Project</th>
                <th className="py-4 pr-4">Owner</th>
                <th className="py-4 pr-4">Priority</th>
                <th className="py-4 pr-4">Progress</th>
                <th className="py-4 pr-4">Milestones</th>
                <th className="py-4 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-black/5 dark:border-white/5">
                  <td className="py-4 pr-4">
                    <p className="font-black">{project.name}</p>
                    <p className="mt-1 text-xs text-[#8b8495]">{project.client} - {project.budget}</p>
                  </td>
                  <td className="py-4 pr-4">{project.owner}</td>
                  <td className="py-4 pr-4">
                    <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-black text-violet-700 dark:text-violet-300">
                      {project.priority}
                    </span>
                  </td>
                  <td className="py-4 pr-4">
                    <div className="h-2 w-32 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                      <span className="block h-full rounded-full bg-violet-600" style={{ width: `${project.progress}%` }} />
                    </div>
                  </td>
                  <td className="py-4 pr-4 text-[#625c6d] dark:text-[#aaa4b8]">{project.milestones.join(", ")}</td>
                  <td className="py-4 pr-4">
                    <select
                      value={project.status}
                      onChange={(event) => onStatusChange(project.id, event.target.value as ProjectStatus)}
                      className="rounded-full border border-black/10 bg-white/75 px-3 py-2 text-xs font-black outline-none dark:border-white/10 dark:bg-white/[0.06]"
                    >
                      {projectStatuses.map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

function RoleManagementPanel({
  matrix,
  onToggle,
}: {
  matrix: PermissionMatrix;
  onToggle: (role: RoleName, permission: PermissionAction) => void;
}) {
  return (
    <div className="grid gap-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {roleNames.slice(0, 8).map((role) => {
          const enabledCount = permissionActions.filter((permission) => matrix[role][permission]).length;

          return (
            <article key={role} className="rounded-[26px] border border-black/10 bg-white/72 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.055]">
              <p className="font-black">{role}</p>
              <p className="mt-2 text-xs text-[#625c6d] dark:text-[#aaa4b8]">{enabledCount} permissions enabled</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                <span className="block h-full rounded-full bg-violet-600" style={{ width: `${(enabledCount / permissionActions.length) * 100}%` }} />
              </div>
            </article>
          );
        })}
      </section>

      <Panel title="Permission matrix" action="Autosaved">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.14em] text-[#8b8495]">
              <tr className="border-b border-black/10 dark:border-white/10">
                <th className="sticky left-0 bg-white/90 py-4 pr-4 dark:bg-[#111017]">Role</th>
                {permissionActions.map((permission) => (
                  <th key={permission} className="py-4 pr-4">{permission}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {roleNames.map((role) => (
                <tr key={role} className="border-b border-black/5 dark:border-white/5">
                  <td className="sticky left-0 bg-white/90 py-4 pr-4 font-black dark:bg-[#111017]">{role}</td>
                  {permissionActions.map((permission) => (
                    <td key={permission} className="py-4 pr-4">
                      <button
                        type="button"
                        aria-pressed={matrix[role][permission]}
                        onClick={() => onToggle(role, permission)}
                        className={[
                          "h-8 w-14 rounded-full border p-1 transition",
                          matrix[role][permission]
                            ? "border-violet-600 bg-violet-600"
                            : "border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "block size-6 rounded-full bg-white shadow-sm transition",
                            matrix[role][permission] ? "translate-x-6" : "translate-x-0",
                          ].join(" ")}
                        />
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

function SalesPanel() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <Panel title="Revenue pipeline" action="$138.5K open">
        <div className="grid gap-4">
          {dealSeed.map((deal) => (
            <article key={deal.id} className="rounded-[24px] border border-black/10 bg-white/68 p-5 dark:border-white/10 dark:bg-white/[0.045]">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black text-[#8b8495]">{deal.id}</p>
                  <h3 className="mt-2 text-lg font-black">{deal.company}</h3>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-700 dark:text-emerald-300">
                  {deal.value}
                </span>
              </div>
              <div className="mt-5 flex items-center justify-between text-xs text-[#625c6d] dark:text-[#aaa4b8]">
                <span>{deal.stage}</span>
                <span>{deal.owner}</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                <span className="block h-full rounded-full bg-emerald-500" style={{ width: `${deal.probability}%` }} />
              </div>
            </article>
          ))}
        </div>
      </Panel>

      <Panel title="Finance controls" action="Invoice ready">
        <div className="grid gap-3">
          {["Quotes", "Proposals", "Invoices", "Payments", "Taxes", "Discounts"].map((item) => (
            <button key={item} type="button" className="flex items-center justify-between rounded-2xl border border-black/10 p-4 text-left dark:border-white/10">
              <span className="text-sm font-black">{item}</span>
              <span className="text-xs font-black text-violet-700 dark:text-violet-300">Configured</span>
            </button>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function SupportPanel() {
  return (
    <Panel title="Support command center" action={`${supportTicketSeed.length} tickets`}>
      <div className="grid gap-4 lg:grid-cols-3">
        {supportTicketSeed.map((ticket) => (
          <article key={ticket.id} className="rounded-[24px] border border-black/10 bg-white/68 p-5 dark:border-white/10 dark:bg-white/[0.045]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black text-[#8b8495]">{ticket.id}</p>
                <h3 className="mt-2 font-black leading-tight">{ticket.subject}</h3>
              </div>
              <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-black text-violet-700 dark:text-violet-300">
                {ticket.priority}
              </span>
            </div>
            <p className="mt-4 text-sm text-[#625c6d] dark:text-[#aaa4b8]">{ticket.customer}</p>
            <div className="mt-5 flex items-center justify-between text-xs">
              <span className="font-black">{ticket.status}</span>
              <span className="text-[#8b8495]">SLA: {ticket.sla}</span>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}

function CalendarPanel() {
  return (
    <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
      <Panel title="Upcoming calendar" action="Team synced">
        <div className="grid gap-3">
          {calendarSeed.map((event) => (
            <article key={event.id} className="rounded-[24px] border border-black/10 bg-white/68 p-5 dark:border-white/10 dark:bg-white/[0.045]">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-violet-700 dark:text-violet-300">{event.type}</p>
              <h3 className="mt-3 font-black">{event.title}</h3>
              <p className="mt-2 text-sm text-[#625c6d] dark:text-[#aaa4b8]">{event.date} - {event.time}</p>
            </article>
          ))}
        </div>
      </Panel>

      <Panel title="Milestone board" action="Gantt ready">
        <div className="grid gap-4">
          {["Discovery", "Design", "Build", "Review", "Launch"].map((stage, index) => (
            <div key={stage} className="grid grid-cols-[90px_1fr] items-center gap-4">
              <span className="text-sm font-black">{stage}</span>
              <div className="h-8 rounded-full bg-black/5 p-1 dark:bg-white/5">
                <span
                  className="block h-full rounded-full bg-gradient-to-r from-violet-700 to-cyan-300"
                  style={{ width: `${42 + index * 11}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function ModulePanel({ moduleId }: { moduleId: AdminModuleId }) {
  const moduleConfig = adminModules.find((item) => item.id === moduleId) ?? adminModules[0];
  const features = moduleCopy[moduleId] ?? ["Workflow controls", "Role permissions", "Activity timeline", "Export tools"];

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <Panel title={`${moduleConfig.label} workspace`} action="Production map">
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <div key={feature} className="rounded-[24px] border border-black/10 bg-white/68 p-5 dark:border-white/10 dark:bg-white/[0.045]">
              <Sparkles className="size-5 text-violet-600 dark:text-violet-300" />
              <p className="mt-4 font-black">{feature}</p>
              <p className="mt-2 text-sm leading-7 text-[#625c6d] dark:text-[#aaa4b8]">
                Configured as an expandable admin module with audit-ready actions and RBAC visibility.
              </p>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Module readiness" action="RBAC enabled">
        <BarChart />
        <div className="mt-6 grid gap-3">
          {["Create", "Read", "Update", "Delete", "Publish", "Export", "Manage Permissions"].map((permission) => (
            <div key={permission} className="flex items-center justify-between rounded-2xl border border-black/10 p-4 dark:border-white/10">
              <span className="text-sm font-black">{permission}</span>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-700 dark:text-emerald-300">Mapped</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function Panel({ title, action, children }: { title: string; action: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[30px] border border-black/10 bg-white/76 p-5 shadow-[0_30px_90px_rgba(47,28,73,0.10)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.055] dark:shadow-[0_30px_90px_rgba(0,0,0,0.36)] sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-lg font-black tracking-[-0.025em]">{title}</h2>
        <span className="rounded-full border border-black/10 px-3 py-1 text-xs font-black text-[#625c6d] dark:border-white/10 dark:text-[#aaa4b8]">{action}</span>
      </div>
      {children}
    </section>
  );
}

function LineChart({ values }: { values: number[] }) {
  const max = Math.max(...values);
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 100;
      const y = 100 - (value / max) * 86;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="h-[310px] rounded-[24px] border border-black/10 bg-black/[0.025] p-4 dark:border-white/10 dark:bg-white/[0.035]">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id="adminLine" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <polyline fill="none" stroke="url(#adminLine)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" points={points} />
      </svg>
    </div>
  );
}

function DonutLegend() {
  return (
    <div className="grid gap-6 sm:grid-cols-[180px_1fr] sm:items-center">
      <div className="relative mx-auto grid size-40 place-items-center rounded-full bg-[conic-gradient(#7c3aed_0_44%,#06b6d4_44%_66%,#a78bfa_66%_84%,#c4b5fd_84%_100%)]">
        <div className="grid size-24 place-items-center rounded-full bg-white text-center dark:bg-[#090711]">
          <span className="text-2xl font-black">28K</span>
        </div>
      </div>
      <div className="grid gap-3">
        {channelData.map((channel) => (
          <div key={channel.label} className="flex items-center justify-between rounded-2xl border border-black/10 p-3 dark:border-white/10">
            <span className="text-sm font-bold">{channel.label}</span>
            <span className="text-sm font-black">{channel.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BarChart() {
  const values = [92, 86, 78, 88, 74, 82, 90];

  return (
    <div className="flex h-56 items-end gap-3 rounded-[24px] border border-black/10 bg-black/[0.025] p-4 dark:border-white/10 dark:bg-white/[0.035]">
      {values.map((value, index) => (
        <span key={index} className="flex-1 rounded-t-2xl bg-gradient-to-t from-violet-700 to-cyan-300" style={{ height: `${value}%` }} />
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span className="shrink-0 rounded-full border border-black/10 px-3 py-1 text-xs font-black text-[#625c6d] dark:border-white/10 dark:text-[#aaa4b8]">
      {status}
    </span>
  );
}

function CommandPalette({
  open,
  modules,
  onClose,
  onSelect,
}: {
  open: boolean;
  modules: typeof adminModules;
  onClose: () => void;
  onSelect: (moduleId: AdminModuleId) => void;
}) {
  const [value, setValue] = useState("");
  const results = modules.filter((module) => module.label.toLowerCase().includes(value.toLowerCase()));

  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-50 grid place-items-start justify-center bg-black/45 px-4 pt-24 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/10 bg-white text-[#17131f] shadow-[0_40px_130px_rgba(0,0,0,0.35)] dark:bg-[#090711] dark:text-white" initial={{ y: 20, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 16, scale: 0.98 }}>
            <div className="flex items-center gap-3 border-b border-black/10 p-4 dark:border-white/10">
              <Search className="size-5 text-[#8b8495]" />
              <input autoFocus value={value} onChange={(event) => setValue(event.target.value)} placeholder="Jump to a module or command..." className="h-11 flex-1 bg-transparent text-sm outline-none" />
              <button type="button" onClick={onClose} className="grid size-9 place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/10">
                <X className="size-5" />
              </button>
            </div>
            <div className="max-h-[420px] overflow-y-auto p-3">
              {results.map((module) => {
                const Icon = module.icon;

                return (
                  <button key={module.id} type="button" onClick={() => onSelect(module.id)} className="flex w-full items-center gap-3 rounded-2xl p-4 text-left transition hover:bg-violet-500/10">
                    <Icon className="size-5 text-violet-600 dark:text-violet-300" />
                    <span>
                      <span className="block font-black">{module.label}</span>
                      <span className="mt-1 block text-xs text-[#625c6d] dark:text-[#aaa4b8]">{module.description}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function NotificationPanel({ onClose }: { onClose: () => void }) {
  return (
    <motion.aside className="fixed right-4 top-24 z-40 w-[calc(100vw-2rem)] max-w-sm rounded-[28px] border border-black/10 bg-white/92 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.2)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#090711]/95" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }}>
      <div className="flex items-center justify-between">
        <h2 className="font-black">Notifications</h2>
        <button type="button" onClick={onClose} className="grid size-9 place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/10">
          <X className="size-5" />
        </button>
      </div>
      <div className="mt-4 grid gap-3">
        {auditEvents.slice(0, 4).map((event) => (
          <div key={event} className="rounded-2xl border border-black/10 p-4 text-sm font-bold dark:border-white/10">
            {event}
            <p className="mt-2 text-xs text-[#8b8495]">Just now</p>
          </div>
        ))}
      </div>
    </motion.aside>
  );
}

function Toast({ message }: { message: string }) {
  return (
    <motion.div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full border border-emerald-500/20 bg-emerald-500 px-5 py-3 text-sm font-black text-white shadow-[0_20px_60px_rgba(16,185,129,0.3)]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
      <CheckCircle2 className="size-5" />
      {message}
    </motion.div>
  );
}
