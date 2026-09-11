"use client";

import { useState } from "react";
import { Menu, X, Github } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Componentes", href: "#components" },
  { label: "AI-Ready", href: "#ai-ready" },
  { label: "Docs", href: "#docs" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex h-7 w-7 items-center justify-center rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brasil-green via-brasil-yellow to-brasil-blue" />
            <span className="relative text-xs font-bold text-white">B</span>
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-neutral-950">
            brasa<span className="bg-gradient-to-r from-brasil-green via-brasil-yellow to-brasil-blue bg-clip-text text-transparent">.ui</span>
          </span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-neutral-500 transition-colors hover:text-neutral-950"
            >
              {link.label}
            </a>
          ))}
          <div className="h-4 w-px bg-neutral-200" />
          <a
            href="https://github.com/brasa-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-950"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-neutral-500 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "overflow-hidden border-t border-neutral-100 bg-white transition-all duration-300 md:hidden",
          open ? "max-h-64" : "max-h-0 border-t-transparent"
        )}
      >
        <div className="flex flex-col gap-3 p-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm text-neutral-600 transition-colors hover:text-neutral-950"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
