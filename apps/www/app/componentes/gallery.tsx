"use client";

import { useState, useMemo } from "react";
import { COMPONENTS, CATEGORY_LABELS, CATEGORY_COLORS, type ComponentCategory, type ComponentDoc } from "./data";
import { PREVIEWS } from "./previews";
import { ComponentDetail } from "./component-detail";

const ALL_CATEGORIES: (ComponentCategory | "all")[] = ["all", "core", "brazil", "payments"];

export function ComponentGallery() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ComponentCategory | "all">("all");
  const [selected, setSelected] = useState<ComponentDoc | null>(null);

  const filtered = useMemo(() => {
    let items = COMPONENTS;
    if (category !== "all") {
      items = items.filter((c) => c.category === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.tags.some((t) => t.includes(q))
      );
    }
    return items;
  }, [search, category]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: COMPONENTS.length };
    for (const c of COMPONENTS) {
      map[c.category] = (map[c.category] || 0) + 1;
    }
    return map;
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-neutral-100">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="flex gap-0.5">
              <div className="h-5 w-1.5 rounded-full bg-brasil-green" />
              <div className="h-5 w-1.5 rounded-full bg-brasil-yellow" />
              <div className="h-5 w-1.5 rounded-full bg-brasil-blue" />
            </div>
            <span className="text-lg font-bold tracking-tight">brasa.ui</span>
          </a>
          <nav className="flex items-center gap-6 text-sm">
            <a href="/" className="text-neutral-500 hover:text-neutral-900 transition-colors">Home</a>
            <span className="font-medium text-neutral-900">Componentes</span>
            <a href="/showcase" className="text-neutral-500 hover:text-neutral-900 transition-colors">Showcase</a>
            <a href="https://github.com/odouglasaraujo/brasa-ui" target="_blank" rel="noopener" className="text-neutral-500 hover:text-neutral-900 transition-colors">GitHub</a>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6">
        {/* Hero */}
        <div className="py-12 md:py-16">
          <div className="flex items-start gap-3 mb-3">
            <div className="mt-1.5 flex gap-0.5">
              <div className="h-6 w-1.5 rounded-full bg-brasil-green" />
              <div className="h-6 w-1.5 rounded-full bg-brasil-yellow" />
              <div className="h-6 w-1.5 rounded-full bg-brasil-blue" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Componentes</h1>
              <p className="mt-2 text-lg text-neutral-500 max-w-2xl">
                {COMPONENTS.length} componentes prontos para usar. Core UI, inputs brasileiros e pagamentos — todos com preview interativo.
              </p>
            </div>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6">
          {/* Search */}
          <div className="relative max-w-sm flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar componentes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-4 text-sm outline-none transition-all placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-400/20"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex gap-2">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
                  category === cat
                    ? cat === "all"
                      ? "bg-neutral-900 text-white"
                      : `${CATEGORY_COLORS[cat].bg} ${CATEGORY_COLORS[cat].text} ring-1 ${CATEGORY_COLORS[cat].border}`
                    : "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                {cat !== "all" && (
                  <span className={`h-2 w-2 rounded-full ${category === cat ? CATEGORY_COLORS[cat].dot : "bg-neutral-300"}`} />
                )}
                {cat === "all" ? "Todos" : CATEGORY_LABELS[cat]}
                <span className={`text-xs ${category === cat ? "opacity-70" : "text-neutral-400"}`}>
                  {counts[cat]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-neutral-400 text-sm">Nenhum componente encontrado para &ldquo;{search}&rdquo;</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pb-16">
            {filtered.map((comp) => (
              <ComponentCard
                key={comp.slug}
                component={comp}
                preview={PREVIEWS[comp.slug]}
                onClick={() => setSelected(comp)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-100 py-8 mt-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex gap-[3px]">
              <div className="h-5 w-[4px] rounded-full bg-brasil-green" />
              <div className="h-5 w-[4px] rounded-full bg-brasil-yellow" />
              <div className="h-5 w-[4px] rounded-full bg-brasil-blue" />
            </div>
            <span className="text-sm font-semibold text-neutral-950">brasa.ui</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-neutral-400">
            <a href="/" className="transition-colors hover:text-neutral-600">Home</a>
            <a href="/showcase" className="transition-colors hover:text-neutral-600">Showcase</a>
            <a href="https://github.com/odouglasaraujo/brasa-ui" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-neutral-600">GitHub</a>
          </div>
          <p className="text-xs text-neutral-400">Open source &middot; MIT License</p>
        </div>
      </footer>

      {/* Detail panel */}
      {selected && (
        <ComponentDetail
          component={selected}
          preview={PREVIEWS[selected.slug]}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

function ComponentCard({
  component,
  preview,
  onClick,
}: {
  component: ComponentDoc;
  preview: React.ReactNode;
  onClick: () => void;
}) {
  const colors = CATEGORY_COLORS[component.category];

  return (
    <button
      onClick={onClick}
      className="group flex flex-col rounded-2xl border border-neutral-200 bg-white text-left shadow-sm transition-all hover:border-neutral-300 hover:shadow-lg hover:shadow-neutral-200/60 hover:-translate-y-0.5"
    >
      {/* Preview area */}
      <div className="flex min-h-[140px] items-center justify-center p-6 border-b border-neutral-100 bg-neutral-50/80 rounded-t-2xl">
        <div className="pointer-events-auto" onClick={(e) => e.stopPropagation()}>
          {preview}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-neutral-900 group-hover:text-brasil-green transition-colors">
            {component.name}
          </h3>
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${colors.bg} ${colors.text}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
            {CATEGORY_LABELS[component.category]}
          </span>
        </div>
        <p className="text-xs text-neutral-500 line-clamp-2">{component.description}</p>
      </div>
    </button>
  );
}
