import type { Metadata } from "next";
import { ArrowRight, Wallet, Layers, Scale, User, Bot, Database, BarChart3, ShoppingBag } from "lucide-react";

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
  {
    slug: "monteiro-cavalcanti",
    name: "Monteiro & Cavalcanti",
    description: "Escritório de advocacia empresarial com design dark premium, imagens reais, formulário de contato e áreas de atuação.",
    tags: ["Advocacia", "Empresarial", "Dark Theme", "Formulário", "Premium"],
    color: "amber",
    icon: Scale,
    gradient: "from-[#0c1425] to-[#0e1830]",
    iconBg: "bg-gradient-to-br from-amber-500 to-amber-700 shadow-amber-300",
  },
  {
    slug: "doug-portfolio",
    name: "Doug — Portfolio",
    description: "Portfolio pessoal de product designer com +5 anos de experiência. Layout vertical, tipografia Inter, fundo claro e cases de produto.",
    tags: ["Portfolio", "Product Design", "Light Theme", "Pessoal"],
    color: "neutral",
    icon: User,
    gradient: "from-[#FAFAF9] to-neutral-100",
    iconBg: "bg-gradient-to-br from-neutral-800 to-neutral-950 shadow-neutral-400",
  },
  {
    slug: "nexoia",
    name: "NexoIA",
    description: "Landing page de startup de IA brasileira com design dark premium, verde neon, bento grid, pricing e FAQ. Nível enterprise.",
    tags: ["AI Agent", "SaaS B2B", "Dark Theme", "Neon", "Enterprise"],
    color: "green",
    icon: Bot,
    gradient: "from-[#06060a] to-[#0d0d12]",
    iconBg: "bg-gradient-to-br from-emerald-400 to-green-500 shadow-emerald-300",
  },
  {
    slug: "datum",
    name: "Datum",
    description: "Plataforma de data governance para a era da IA. Design dark navy com accent cyan, dashboard interativo, lineage e compliance LGPD.",
    tags: ["Data Governance", "SaaS B2B", "Dark Theme", "Cyan", "LGPD"],
    color: "cyan",
    icon: Database,
    gradient: "from-[#0a0e1a] to-[#0f1525]",
    iconBg: "bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-cyan-300",
  },
  {
    slug: "oficina-horizonte",
    name: "Oficina Horizonte",
    description: "Dashboard financeiro premium para pequena empresa brasileira. Fluxo de caixa, cobrancas, vendas por estado, filtros e acoes via Pix, boleto e cartao.",
    tags: ["Dashboard", "Financeiro", "Light Theme", "Cobrancas", "PME"],
    color: "emerald",
    icon: BarChart3,
    gradient: "from-[#FAFAF9] to-emerald-50",
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-300",
  },
  {
    slug: "casa-norte",
    name: "Casa Norte",
    description: "Checkout de e-commerce brasileiro para loja de moveis. Pix com QR Code e timer, cartao com parcelamento ate 10x, boleto, validacao completa e estados de loading/erro/sucesso.",
    tags: ["E-commerce", "Checkout", "Pix", "Parcelamento", "CPF"],
    color: "amber",
    icon: ShoppingBag,
    gradient: "from-[#FFFBF5] to-amber-50",
    iconBg: "bg-gradient-to-br from-amber-500 to-amber-700 shadow-amber-300",
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
            <a href="https://github.com/odouglasaraujo/brasa-ui" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-900 transition-colors">GitHub</a>
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

      <footer className="border-t border-neutral-100 py-8">
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
            <a href="/" className="transition-colors hover:text-neutral-600">Home</a>
            <a href="/componentes" className="transition-colors hover:text-neutral-600">Componentes</a>
            <a href="https://github.com/odouglasaraujo/brasa-ui" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-neutral-600">GitHub</a>
          </div>
          <p className="text-xs text-neutral-400">Open source &middot; MIT License</p>
        </div>
      </footer>
    </div>
  );
}
