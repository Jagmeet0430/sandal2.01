import { Container } from "@/components/common/Container";
import { LabelChip } from "@/components/common/LabelChip";
import { ProcessTabs } from "@/components/home/ProcessTabs";

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-28 dark:bg-transparent"
    >
      <div
        aria-hidden="true"
        className="absolute -right-48 top-20 size-[420px] rounded-full bg-blue-100/60 blur-[120px] dark:bg-purple-700/20"
      />

      <Container className="relative">
        <div className="mx-auto max-w-[850px] text-center">
          <LabelChip>How We Work</LabelChip>

          <h2
            id="process-title"
            className="mt-6 text-4xl font-extrabold leading-[1.12] tracking-[-0.035em] text-[#071838] sm:text-5xl lg:text-[56px] dark:text-white"
          >
            A clear process from{" "}
            <span className="text-blue-600 dark:text-purple-300">
              strategy to successful launch
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-[720px] text-base leading-8 text-slate-600 sm:text-lg dark:text-white/55">
            We combine business strategy, experience design, engineering,
            and quality assurance to deliver reliable digital products.
          </p>
        </div>

        <div className="mt-12 lg:mt-16">
          <ProcessTabs />
        </div>
      </Container>
    </section>
  );
}
