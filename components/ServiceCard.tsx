import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/data/siteData";

type ServiceCardProps = {
  service: Service;
  href?: string;
  ctaLabel?: string;
};

/**
 * Image-led card for a single service. The CTA link is stretched over the
 * whole card (via its ::after), so the card is one click target and one tab
 * stop — no nested links, and the link text still names the service.
 */
export default function ServiceCard({
  service,
  href = service.link,
  ctaLabel = "Learn more",
}: ServiceCardProps) {
  return (
    <article
      data-anim-child
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-lift"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-100">
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          loading="lazy"
          sizes="(min-width: 1280px) 300px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold leading-snug text-ink-900">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-ink-600">{service.description}</p>

        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors after:absolute after:inset-0 after:rounded-3xl after:content-[''] group-hover:text-brand-600"
        >
          {ctaLabel}
          <span className="sr-only"> about {service.title}</span>
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
