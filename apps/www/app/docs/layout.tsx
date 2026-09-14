"use client";

import { usePathname } from "next/navigation";

const sidebarNav = [
  {
    title: "Comecando",
    items: [
      { title: "Introducao", href: "/docs" },
      { title: "Instalacao", href: "/docs/installation" },
    ],
  },
  {
    title: "Componentes",
    items: [
      { title: "Galeria", href: "/componentes" },
    ],
  },
  {
    title: "Links",
    items: [
      { title: "GitHub", href: "https://github.com/odouglasaraujo/brasa-ui", external: true },
      { title: "npm", href: "https://www.npmjs.com/package/brasa.ui", external: true },
    ],
  },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <a href="/" className="flex items-center gap-2.5">
            <div className="flex gap-[3px]">
              <div className="h-6 w-[5px] rounded-full bg-brasil-green" />
              <div className="h-6 w-[5px] rounded-full bg-brasil-yellow" />
              <div className="h-6 w-[5px] rounded-full bg-brasil-blue" />
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-neutral-950">
              brasa.ui
            </span>
          </a>
          <div className="hidden items-center gap-6 md:flex">
            <a href="/docs" className="text-sm font-medium text-neutral-950">Docs</a>
            <a href="/componentes" className="text-sm text-neutral-500 transition-colors hover:text-neutral-950">Componentes</a>
            <a href="/showcase" className="text-sm text-neutral-500 transition-colors hover:text-neutral-950">Showcase</a>
            <div className="h-4 w-px bg-neutral-200" />
            <a
              href="https://github.com/odouglasaraujo/brasa-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-500 transition-colors hover:text-neutral-950"
            >
              GitHub
            </a>
          </div>
        </nav>
      </header>

      <div className="mx-auto max-w-6xl px-6">
        <div className="flex gap-12 py-10">
          {/* Sidebar */}
          <aside className="hidden w-56 shrink-0 md:block">
            <nav className="sticky top-24 space-y-6">
              {sidebarNav.map((section) => (
                <div key={section.title}>
                  <h4 className="mb-2 text-sm font-semibold text-neutral-950">
                    {section.title}
                  </h4>
                  <ul className="space-y-1">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href;
                      const isExternal = "external" in item && item.external;
                      return (
                        <li key={item.href}>
                          <a
                            href={item.href}
                            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                              isActive
                                ? "bg-neutral-100 font-medium text-neutral-950"
                                : "text-neutral-500 hover:text-neutral-950 hover:bg-neutral-50"
                            }`}
                          >
                            {item.title}
                            {isExternal && (
                              <svg className="ml-1 inline h-3 w-3 text-neutral-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                              </svg>
                            )}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="min-w-0 flex-1">
            {children}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-200 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex gap-[3px]">
              <div className="h-5 w-[4px] rounded-full bg-brasil-green" />
              <div className="h-5 w-[4px] rounded-full bg-brasil-yellow" />
              <div className="h-5 w-[4px] rounded-full bg-brasil-blue" />
            </div>
            <span className="text-sm font-semibold text-neutral-950">brasa.ui</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-neutral-400">
            <a href="/componentes" className="transition-colors hover:text-neutral-600">Componentes</a>
            <a href="/showcase" className="transition-colors hover:text-neutral-600">Showcase</a>
            <a href="https://github.com/odouglasaraujo/brasa-ui" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-neutral-600">GitHub</a>
          </div>
          <p className="text-xs text-neutral-400">Open source &middot; MIT License</p>
        </div>
      </footer>
    </div>
  );
}
