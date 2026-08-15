import { technologyCategories } from "@/data/technology";

export function TechnologyCategories() {
  return (
    <div className="mt-0 grid gap-5 md:grid-cols-3">
      {technologyCategories.map((category, index) => (
        <article
          key={category.title}
          data-technology-category
          className="border-t border-[var(--border-color)] pt-6"
        >
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--purple)] dark:text-purple-200/70">
              0{index + 1}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-purple-300 shadow-[0_0_14px_rgba(168,85,247,0.72)]" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-[var(--text)] dark:text-white">{category.title}</h3>
          <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)] dark:text-white/54">{category.description}</p>
        </article>
      ))}
    </div>
  );
}
