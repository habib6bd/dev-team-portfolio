"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { EASE, gsap, prefersReducedMotion, useGSAP } from "@/components/animations/gsap";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close the drawer whenever the route changes. Adjusting state during
  // render (rather than in an effect) avoids a second render pass showing the
  // menu still open on the new page.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // Solid background once the page has scrolled past the hero's top edge.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the open drawer.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // One-time entrance for the bar itself.
  useGSAP(() => {
    if (prefersReducedMotion() || !headerRef.current) return;
    gsap.from(headerRef.current, { y: -70, opacity: 0, duration: 0.8, ease: EASE });
  });

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel || !open || prefersReducedMotion()) return;

      gsap
        .timeline()
        .from(panel, { opacity: 0, duration: 0.25, ease: "power2.out" })
        .from(
          panel.querySelectorAll("[data-menu-item]"),
          { y: 22, opacity: 0, duration: 0.4, stagger: 0.06, ease: EASE },
          "-=0.1",
        );
    },
    { dependencies: [open] },
  );

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink-100 bg-white/85 backdrop-blur-xl shadow-[0_1px_20px_-12px_rgb(15_23_42/0.35)]"
          : "border-b border-transparent bg-white/60 backdrop-blur-sm"
      }`}
    >
      <div className="container-page flex items-center justify-between gap-4 py-4">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="DevTeam Studio home">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-black text-white shadow-glow transition-transform duration-300 group-hover:scale-105">
            DT
          </span>
          <span className="text-lg font-bold tracking-tight">
            DevTeam <span className="text-ink-400 font-medium">Studio</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "text-brand-600"
                  : "text-ink-600 hover:text-ink-900"
              }`}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-brand-500" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/hire-us"
            className="hidden rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-600 hover:shadow-glow sm:inline-flex"
          >
            Hire us
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-xl border border-ink-200 text-ink-700 transition-colors hover:bg-ink-50 lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="relative block h-4 w-5">
              <span
                className={`absolute left-0 block h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                  open ? "top-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 rounded bg-current transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                  open ? "top-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div
          ref={panelRef}
          id="mobile-menu"
          className="border-t border-ink-100 bg-white lg:hidden"
        >
          <nav className="container-page flex flex-col py-4" aria-label="Mobile">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-menu-item
                className={`rounded-xl px-3 py-3 text-base font-medium transition-colors ${
                  isActive(item.href) ? "bg-brand-50 text-brand-700" : "text-ink-700 hover:bg-ink-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/hire-us"
              data-menu-item
              className="mt-3 rounded-xl bg-ink-900 px-3 py-3 text-center text-base font-semibold text-white"
            >
              Hire us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
