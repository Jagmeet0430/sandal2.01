import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative flex min-h-screen items-center px-5 pb-20 pt-32 text-[#12101a] dark:text-white">
      <div className="mx-auto w-full max-w-[1380px]">
        <div className="mx-auto max-w-[980px] text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-300">
            {eyebrow}
          </p>

          <h1 className="mt-7 text-5xl font-medium leading-[1] tracking-[-0.055em] sm:text-7xl lg:text-[94px]">
            {title}
          </h1>

          <p className="mx-auto mt-7 max-w-[680px] text-base leading-8 text-[#625d6f] dark:text-white/50 sm:text-lg">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
