"use client";

import { X, Check, ArrowRight } from "lucide-react";

const genericItems = [
  { label: "Tax ID", value: "123-45-6789" },
  { label: "Zip Code", value: "90210" },
  { label: "Payment", value: "Credit Card" },
  { label: "Price", value: "$149.90" },
  { label: "Phone", value: "+1 (555) 123-4567" },
];

const brasaItems = [
  { label: "CPF", value: "123.456.789-09" },
  { label: "CEP", value: "01310-100" },
  { label: "Pagamento", value: "Pix · Cartão · Boleto" },
  { label: "Preço", value: "R$ 149,90 · 10x R$ 14,99" },
  { label: "Telefone", value: "(11) 99999-9999" },
];

export function Problem() {
  return (
    <section className="relative border-t border-neutral-100 bg-neutral-50/50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            O problema
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl md:text-5xl">
            Sua IA não sabe como
            <br className="hidden sm:block" />
            {" "}o Brasil funciona
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-neutral-500">
            Toda IA gera interfaces americanas por padrão. O resultado: produtos
            genéricos que não servem para o mercado brasileiro.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {/* Generic - muted/faded */}
          <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 opacity-75 transition-opacity hover:opacity-100">
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-red-50" />
            <div className="relative mb-5 flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-100">
                <X className="h-4 w-4 text-red-500" />
              </div>
              <span className="text-sm font-bold text-neutral-950">IA genérica</span>
              <span className="ml-auto rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-medium text-red-500">US defaults</span>
            </div>
            <div className="space-y-2">
              {genericItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-xl border border-neutral-100 bg-neutral-50 px-4 py-3">
                  <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">{item.label}</span>
                  <span className="font-mono text-sm text-neutral-500">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* brasa.ui - highlighted */}
          <div className="relative overflow-hidden rounded-2xl p-6">
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-brasil-green via-brasil-yellow to-brasil-blue" />
            <div className="absolute inset-[1px] rounded-[15px] bg-white" />
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-brasil-green/5" />
            <div className="relative">
              <div className="mb-5 flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brasil-green to-brasil-blue">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-bold text-neutral-950">brasa.ui</span>
                <span className="ml-auto rounded-full bg-brasil-green/10 px-2 py-0.5 text-[10px] font-medium text-brasil-green">BR context</span>
              </div>
              <div className="space-y-2">
                {brasaItems.map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-xl border border-brasil-green/10 bg-brasil-green/[0.02] px-4 py-3 transition-colors hover:bg-brasil-green/5">
                    <span className="text-[11px] font-semibold text-brasil-green uppercase tracking-wider">{item.label}</span>
                    <span className="font-mono text-sm font-medium text-neutral-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-xs font-medium text-neutral-400">
            <ArrowRight className="h-3 w-3 rotate-90 text-neutral-500" />
            <span>Mesma funcionalidade.</span>
            <span className="text-white">Contexto brasileiro.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
