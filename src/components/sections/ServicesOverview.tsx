import { Bot, Code2, CloudCog, Gauge, LayoutDashboard, Smartphone } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const services = [
  {
    title: "AI & Automation",
    description: "AI assistants, chatbots, RAG systems, AI agents, analytics, and workflow automation.",
    deliverables: ["AI assistant", "RAG knowledge base", "Automation workflows"],
    icon: Bot,
  },
  {
    title: "Custom Software",
    description: "CRM, ERP, POS, SaaS platforms, admin dashboards, portals, APIs, and backend systems.",
    deliverables: ["Business systems", "Admin dashboards", "Secure backend APIs"],
    icon: LayoutDashboard,
  },
  {
    title: "Web & Mobile Apps",
    description: "Corporate websites, custom web apps, e-commerce, PWAs, client portals, and mobile apps.",
    deliverables: ["Responsive UI/UX", "Web applications", "Mobile-ready products"],
    icon: Smartphone,
  },
  {
    title: "Cloud & DevOps",
    description: "Cloud architecture, PostgreSQL, deployment pipelines, monitoring, storage, and security foundations.",
    deliverables: ["Vercel/AWS setup", "Database design", "CI/CD and monitoring"],
    icon: CloudCog,
  },
  {
    title: "MVP Development",
    description: "Fast product discovery, essential feature planning, UI flows, build execution, testing, and launch support.",
    deliverables: ["MVP roadmap", "Launch build", "Iteration plan"],
    icon: Code2,
  },
  {
    title: "Technical Consulting",
    description: "Architecture reviews, AI opportunity mapping, automation planning, security checks, and modernization guidance.",
    deliverables: ["Technical audit", "AI roadmap", "Cost-aware plan"],
    icon: Gauge,
  },
];

export function ServicesOverview() {
  return (
    <section id="capabilities" className="relative overflow-hidden bg-[var(--background)] px-5 py-16 text-[var(--foreground)] sm:py-20 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(124,58,237,0.09),transparent_30%),radial-gradient(circle_at_18%_82%,rgba(37,99,235,0.055),transparent_26%)]" />
      <div className="relative mx-auto max-w-[1240px]">
        <div className="max-w-[760px]">
          <SectionLabel>Service Capabilities</SectionLabel>
          <h2 className="mt-5 text-[clamp(2.35rem,4vw,4.5rem)] font-semibold leading-[1.04] tracking-normal text-[var(--text)]">
            What Alyvora can build for your business
          </h2>
          <p className="mt-5 text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
            Start with the business problem, then choose the right mix of AI, software, automation,
            cloud, and product design. Every project should have a clear outcome, owner, timeline,
            and launch path.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article key={service.title} className="rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_18px_58px_var(--shadow-color)]">
                <div className="flex items-start justify-between gap-4">
                  <div className="grid size-11 place-items-center rounded-[14px] border border-purple-300/20 bg-purple-500/10 text-purple-200">
                    <Icon aria-hidden="true" className="size-5" />
                  </div>
                  <span className="rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--purple)]">
                    Build
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-normal text-[var(--text)]">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{service.description}</p>
                <div className="mt-5 grid gap-2">
                  {service.deliverables.map((item) => (
                    <span key={item} className="text-sm font-semibold text-[var(--text)]">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
