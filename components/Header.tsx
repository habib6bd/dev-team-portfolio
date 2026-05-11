"use client";

import Link from "next/link";
import { useState } from "react";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold text-blue-700">
          DevTeam <span className="text-slate-500">Studio</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium hover:text-blue-700">
              {item.label}
            </Link>
          ))}
          <Link href="/hire-us" className="rounded-full bg-blue-700 px-5 py-2 text-sm font-semibold text-white">
            Hire us
          </Link>
        </nav>

        <button onClick={() => setOpen(!open)} className="rounded border px-3 py-2 md:hidden">
          Menu
        </button>
      </div>

      {open && (
        <div className="border-t px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/hire-us" onClick={() => setOpen(false)} className="font-semibold text-blue-700">
              Hire us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}