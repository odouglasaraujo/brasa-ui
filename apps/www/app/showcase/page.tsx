import type { Metadata } from "next";
import { ArrowRight, Wallet, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Showcase — brasa.ui",
  description: "Páginas e aplicações construídas com brasa.ui",
};

const showcases = [
  {
    slug: "pagafacil",
    name: "PagaFácil",
    description: "Fintech brasileira com conta digital, Pix, cartão e parcelamento. Landing page completa com formulário de abertura de conta.",
    tags: ["Fintech", "Landing Page", "Pix", "CPF", "CEP"],
    color: "emerald",
    icon: Wallet,
    gradient: "from-emerald-50 to-emerald-100/50",
    iconBg: "bg-emerald-600 shadow-emerald-200",
  },
  {
    slug: "orion",
    name: "Orion",
    description: "SaaS de infraestrutura bancária com core banking, Pix API, Open Finance e compliance. Design dark premium.",
    tags: ["SaaS B2B", "Banking", "Dark Theme", "API", "KYC"],
    color: "indigo",
    icon: Layers,
    gradient: "from-[#0c0c18] to-[#12121f]",
    iconBg: "bg-gradient-to-br from-indigo-500 to-violet-600 shadow-indigo-300",
  },
];

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-neutral-100">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="flex gap-[3px]">
              <div className="h-5 w-1.5 rounded-full bg-brasil-green" />
              <div className="h-5 w-1.5 rounded-full bg-brasil-yellow" />
              <div className="h-5 w-1.5 rounded-full bg-brasil-blue" />
            </div>
            <span className="text-lg font-bold tracking-tight">brasa.ui</span>
          </a>
          <nav className="flex items-center gap-6 text-sm">
            <a href="/" className="text-neutral-500 hover:text-neutral-900 transition-colors">Home</a>
            <a href="/componentes" className="text-neutral-500 hover:text-neutral-900 transition-colors">Componentes</a>
            <span className="font-medium text-neutral-900">Showcase</span>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12">
          <div className="flex items-start gap-3 mb-3">
            <div className="mt-1.5 flex gap-0.5">
              <div className="h-6 w-1.5 rounded-full bg-brasil-green" />
              <div className="h-6 w-1.5 rounded-full bg-brasil-yellow" />
              <div className="h-6 w-1.5 rounded-full bg-brasil-blue" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Showcase</h1>
              <p className="mt-2 text-lg text-neutral-500 max-w-2xl">
                Páginas e aplicações reais construídas com componentes brasa.ui. Cada exemplo demonstra como criar produtos digitais brasileiros profissionais.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {showcases.map((s) => (
            <a
              key={s.slug}
              href={`/showcase/${s.slug}`}
              className="group flex flex-col rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all hover:border-neutral-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className={`flex min-h-[180px] items-center justify-center rounded-t-2xl bg-gradient-to-br ${s.gradient} p-6`}>
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${s.iconBg} shadow-lg`}>
                  <s.icon className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-semibold text-neutral-900 group-hover:text-emerald-600 transition-colors">
                    {s.name}
                  </h3>
                  <ArrowRight className="h-4 w-4 text-neutral-300 group-hover:text-emerald-500 transition-all group-hover:translate-x-0.5" />
                </div>
                <p className="text-sm text-neutral-500 mb-3">{s.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {s.tags.map((t) => (
                    <span key={t} className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-500">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}

          {/* Coming soon card */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/50 p-8 text-center">
            <p className="text-sm font-medium text-neutral-400">Mais exemplos em breve</p>
            <p className="text-xs text-neutral-300 mt-1">E-commerce, Dashboard, SaaS...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
