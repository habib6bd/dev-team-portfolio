import type { Faq } from "@/data/siteData";

/**
 * Question-and-answer accordion. Native <details>, so the answers are in the
 * HTML for search and AI engines even while collapsed, and it works without JS.
 */
export default function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div data-anim="fade-up" className="mt-12 max-w-3xl divide-y divide-ink-100 border-y border-ink-100">
      {faqs.map((faq) => (
        <details key={faq.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-base font-semibold text-ink-900">
            <h3 className="text-base font-semibold">{faq.question}</h3>
            <span
              aria-hidden="true"
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-ink-200 text-ink-500 transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-ink-600">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
