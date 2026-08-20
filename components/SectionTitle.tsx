type SectionTitleProps = {
  label: string;
  title: string;
  description?: string;
  /**
   * Headings must not all be <h1>. Pages pass "h1" once; every in-page
   * section below it uses the default "h2".
   */
  as?: "h1" | "h2";
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export default function SectionTitle({
  label,
  title,
  description,
  as: Heading = "h2",
  align = "left",
  tone = "light",
}: SectionTitleProps) {
  const centered = align === "center";

  return (
    <div
      data-anim="fade-up"
      className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}
    >
      <span
        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] ${
          tone === "dark" ? "bg-white/10 text-brand-200" : "bg-brand-50 text-brand-700"
        }`}
      >
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
        {label}
      </span>

      <Heading
        className={`mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl ${
          tone === "dark" ? "text-white" : "text-ink-900"
        }`}
      >
        {title}
      </Heading>

      {description && (
        <p
          className={`mt-4 text-pretty text-lg leading-8 ${
            tone === "dark" ? "text-ink-300" : "text-ink-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
