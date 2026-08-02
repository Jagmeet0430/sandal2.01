import {
  ArrowRight,
  Bot,
  CloudCog,
  DatabaseZap,
  GitBranch,
  LockKeyhole,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";

type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const services: Service[] = [
  {
    title: "AI product engineering",
    description: "Design, prototype, and ship intelligent product features with reliable interfaces and measurable outcomes.",
    icon: Bot,
  },
  {
    title: "Cloud platform modernization",
    description: "Rebuild critical systems on resilient cloud foundations with cleaner deployment, observability, and scale.",
    icon: CloudCog,
  },
  {
    title: "Workflow automation",
    description: "Connect teams, data, and approvals through secure automations that remove repetitive operational drag.",
    icon: Workflow,
  },
  {
    title: "Data systems architecture",
    description: "Create trusted data layers, pipelines, and application APIs that support faster decisions across the business.",
    icon: DatabaseZap,
  },
  {
    title: "Security-first delivery",
    description: "Embed access controls, auditability, and secure engineering practices into the products your teams depend on.",
    icon: LockKeyhole,
  },
  {
    title: "Integration strategy",
    description: "Unify business platforms with maintainable integrations that reduce manual handoffs and brittle data movement.",
    icon: GitBranch,
  },
];

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="bg-white py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="services-title"
            eyebrow="Services"
            title={
              <>
                Technology services for teams building beyond the old operating model.
              </>
            }
            description="From first strategy sessions to production systems, we help enterprise teams turn complex technology priorities into dependable digital capability."
          />
          <Button href="/#contact" variant="secondary" icon={ArrowRight} className="w-full sm:w-fit">
            Talk to an expert
          </Button>
        </div>

        <div className="mt-12 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="group flex h-full flex-col rounded-2xl border border-brand-border bg-brand-elevated p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand-primary/35 hover:bg-white hover:shadow-soft"
              >
                <div className="grid size-12 place-items-center rounded-brand border border-brand-border bg-white text-brand-primary shadow-sm transition duration-200 group-hover:border-brand-primary/30 group-hover:bg-brand-sky/60">
                  <Icon aria-hidden="true" className="size-5" />
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-7 text-brand-navy">{service.title}</h3>
                <p className="mt-3 grow text-sm leading-7 text-brand-muted">{service.description}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
