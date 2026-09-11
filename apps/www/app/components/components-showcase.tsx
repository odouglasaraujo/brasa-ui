"use client";

import { ArrowRight, Check, Copy, Search } from "lucide-react";

function CPFDemo() {
  return (
    <div className="space-y-3">
      <div>
        <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-neutral-400">
          CPF
        </label>
        <div className="relative">
          <div className="flex items-center rounded-xl border-2 border-brasil-green/40 bg-white px-4 py-2.5 shadow-[0_0_0_3px_rgba(5,150,105,0.08)] transition-all">
            <span className="font-mono text-[15px] tracking-wide text-neutral-900">
              123.456.789
            </span>
            <span className="font-mono text-[15px] tracking-wide text-neutral-300">-</span>
            <span className="font-mono text-[15px] tracking-wide text-neutral-900">09</span>
            <span className="ml-0.5 inline-block h-5 w-[2px] animate-blink bg-brasil-green" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-brasil-green/5 px-3 py-2">
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-brasil-green">
          <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
        </div>
        <span className="text-xs font-medium text-brasil-green">
          CPF válido — mod11 verificado
        </span>
      </div>
    </div>
  );
}

function PixDemo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <div className="rounded-2xl border border-neutral-100 bg-white p-3 shadow-sm">
          <svg viewBox="0 0 80 80" className="h-20 w-20" fill="none">
            <rect width="80" height="80" rx="4" fill="white"/>
            {/* QR code pattern */}
            {[0,1,2,3,4,5,6].map(r =>
              [0,1,2,3,4,5,6].map(c => {
                const isCorner = (r < 3 && c < 3) || (r < 3 && c > 3) || (r > 3 && c < 3);
                const isData = !isCorner && ((r + c) % 3 !== 0 || (r * c) % 2 === 0);
                return (
                  <rect
                    key={`${r}-${c}`}
                    x={6 + c * 10}
                    y={6 + r * 10}
                    width="8"
                    height="8"
                    rx="1.5"
                    fill={isCorner || isData ? "#171717" : "#e5e5e5"}
                    opacity={isCorner ? 1 : isData ? 0.85 : 0.3}
                  />
                );
              })
            )}
            <rect x="28" y="28" width="24" height="24" rx="6" fill="#059669"/>
            <text x="40" y="44" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">$</text>
          </svg>
        </div>
        <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-brasil-green shadow-sm">
          <Check className="h-3 w-3 text-white" strokeWidth={3} />
        </div>
      </div>
      <div className="text-center">
        <p className="text-lg font-bold text-neutral-900">R$ 149,90</p>
        <div className="mt-0.5 flex items-center justify-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brasil-green opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brasil-green" />
          </span>
          <span className="text-xs text-neutral-500">Expira em <strong className="text-neutral-700">4:59</strong></span>
        </div>
      </div>
      <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-neutral-800">
        <Copy className="h-3.5 w-3.5" />
        Copiar código Pix
      </button>
    </div>
  );
}

function CEPDemo() {
  return (
    <div className="space-y-3">
      <div>
        <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-neutral-400">
          CEP
        </label>
        <div className="flex items-center gap-2">
          <div className="flex flex-1 items-center rounded-xl border-2 border-brasil-blue/40 bg-white px-4 py-2.5 shadow-[0_0_0_3px_rgba(37,99,235,0.08)]">
            <span className="font-mono text-[15px] tracking-wide text-neutral-900">01310-100</span>
          </div>
          <div className="flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-400 transition-colors hover:bg-neutral-100">
            <Search className="h-4 w-4" />
          </div>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-neutral-100 bg-gradient-to-b from-white to-neutral-50/80">
        <div className="border-b border-neutral-100 px-4 py-2">
          <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">Endereço encontrado</p>
        </div>
        <div className="px-4 py-3">
          <p className="text-sm font-medium text-neutral-900">Av. Paulista</p>
          <p className="mt-0.5 text-xs text-neutral-500">Bela Vista — São Paulo, SP</p>
        </div>
      </div>
    </div>
  );
}

function CurrencyDemo() {
  return (
    <div className="space-y-3">
      <div>
        <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-neutral-400">
          Valor
        </label>
        <div className="flex items-center rounded-xl border-2 border-neutral-200 bg-white shadow-sm transition-all focus-within:border-brasil-green/40 focus-within:shadow-[0_0_0_3px_rgba(5,150,105,0.08)]">
          <span className="border-r border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm font-medium text-neutral-500 rounded-l-xl">
            R$
          </span>
          <div className="flex flex-1 items-center px-3 py-2.5">
            <span className="font-mono text-[15px] font-medium text-neutral-900">1.499,90</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-brasil-blue/5 px-3 py-2">
        <svg className="h-3.5 w-3.5 text-brasil-blue" fill="none" viewBox="0 0 16 16">
          <path d="M8 1v14M4.5 4h7a2.5 2.5 0 010 5H4.5V4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-xs text-neutral-600">
          ou <strong className="font-semibold text-neutral-900">10x de R$ 149,99</strong> sem juros
        </span>
      </div>
    </div>
  );
}

function PhoneDemo() {
  return (
    <div className="space-y-3">
      <div>
        <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-neutral-400">
          Telefone
        </label>
        <div className="flex items-center rounded-xl border-2 border-neutral-200 bg-white shadow-sm">
          <span className="flex items-center gap-1.5 border-r border-neutral-200 bg-neutral-50 px-3 py-2.5 rounded-l-xl">
            <span className="text-sm">🇧🇷</span>
            <span className="text-xs font-medium text-neutral-500">+55</span>
          </span>
          <div className="flex flex-1 items-center px-3 py-2.5">
            <span className="font-mono text-[15px] text-neutral-900">(11) 99999-9999</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-medium text-neutral-600">
          <span className="h-1.5 w-1.5 rounded-full bg-brasil-green" />
          Celular
        </span>
        <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-medium text-neutral-600">
          DDD 11 · São Paulo
        </span>
      </div>
    </div>
  );
}

function InstallmentDemo() {
  return (
    <div className="space-y-2">
      <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-neutral-400">
        Parcelamento
      </label>
      {[
        { n: "1x", v: "R$ 149,90", tag: "à vista", discount: "-5%", selected: false },
        { n: "3x", v: "R$ 49,97", tag: "sem juros", selected: true },
        { n: "10x", v: "R$ 14,99", tag: "sem juros", selected: false },
      ].map((opt) => (
        <div
          key={opt.n}
          className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 transition-all ${
            opt.selected
              ? "border-brasil-green bg-brasil-green/[0.03] shadow-[0_0_0_3px_rgba(5,150,105,0.08)]"
              : "border-neutral-100 bg-white hover:border-neutral-200"
          }`}
        >
          <div className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
            opt.selected ? "border-brasil-green bg-brasil-green" : "border-neutral-300"
          }`}>
            {opt.selected && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />}
          </div>
          <div className="flex flex-1 items-center justify-between">
            <span className="text-sm font-medium text-neutral-900">{opt.n} de {opt.v}</span>
            <div className="flex items-center gap-1.5">
              {opt.discount && (
                <span className="rounded-md bg-brasil-green/10 px-1.5 py-0.5 text-[10px] font-bold text-brasil-green">
                  {opt.discount}
                </span>
              )}
              <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium ${
                opt.selected ? "bg-brasil-green/10 text-brasil-green" : "bg-neutral-100 text-neutral-500"
              }`}>
                {opt.tag}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface ComponentCardData {
  name: string;
  description: string;
  category: string;
  demo: React.ReactNode;
}

const components: ComponentCardData[] = [
  { name: "CPFInput", description: "Máscara automática e validação mod11 em tempo real", category: "Brazil", demo: <CPFDemo /> },
  { name: "PixPayment", description: "Fluxo completo de pagamento via Pix com QR code", category: "Payments", demo: <PixDemo /> },
  { name: "CEPInput", description: "Busca automática de endereço via ViaCEP", category: "Brazil", demo: <CEPDemo /> },
  { name: "CurrencyBRL", description: "Input monetário com formatação brasileira", category: "Brazil", demo: <CurrencyDemo /> },
  { name: "PhoneBR", description: "Telefone brasileiro com DDD e detecção automática", category: "Brazil", demo: <PhoneDemo /> },
  { name: "InstallmentSelect", description: "Seletor de parcelamento com cálculo automático", category: "Payments", demo: <InstallmentDemo /> },
];

const categoryStyle: Record<string, string> = {
  Brazil: "text-brasil-green bg-brasil-green/8 border-brasil-green/20",
  Payments: "text-brasil-blue bg-brasil-blue/8 border-brasil-blue/20",
};

export function ComponentsShowcase() {
  return (
    <section id="components" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brasil-blue/20 bg-brasil-blue/5 px-3 py-1 text-xs font-medium text-brasil-blue">
            <span className="h-1.5 w-1.5 rounded-full bg-brasil-blue" />
            Componentes
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl md:text-5xl">
            Tudo que o Brasil precisa
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-neutral-500">
            Cada componente é tipado, acessível, e inclui um schema JSON para
            agentes de IA. Copy. Paste. Build.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {components.map((component) => (
            <div key={component.name} className="group relative">
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-brasil-green via-brasil-yellow to-brasil-blue opacity-0 blur-[1px] transition-all duration-500 group-hover:opacity-40" />

              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm transition-all duration-500 group-hover:border-transparent group-hover:shadow-xl">
                <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-3.5">
                  <h3 className="text-sm font-bold text-neutral-950 font-mono">{component.name}</h3>
                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${categoryStyle[component.category]}`}>
                    {component.category}
                  </span>
                </div>

                <p className="px-5 pt-3 text-[13px] leading-relaxed text-neutral-500">{component.description}</p>

                <div className="mt-auto p-5 pt-4">
                  <div className="rounded-xl border border-neutral-100 bg-gradient-to-b from-neutral-50/50 to-neutral-50 p-4">
                    {component.demo}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#docs"
            className="group inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-600 shadow-sm transition-all hover:border-neutral-300 hover:text-neutral-950 hover:shadow-md"
          >
            Ver todos os componentes
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
