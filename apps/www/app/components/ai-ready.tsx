"use client";

import { Braces, Sparkles, Plug, ArrowRight } from "lucide-react";

const schemaExample = `{
  "name": "pix-payment",
  "locale": "pt-BR",
  "category": "payment",
  "props": {
    "amount": { "type": "number" },
    "pixKey": { "type": "string" }
  },
  "states": [
    "pending", "qr_generated",
    "paid", "expired"
  ],
  "context": {
    "whenToUse": "Brazilian checkout",
    "culturalNote": "Pix is Brazil's
     most used payment method,
     with 40B+ annual transactions"
  }
}`;

const features = [
  {
    icon: Braces,
    title: "JSON Schema por componente",
    description: "Props, estados, variantes e regras de comportamento em formato estruturado que qualquer agente entende.",
    color: "text-brasil-green bg-brasil-green/10 border-brasil-green/20",
  },
  {
    icon: Sparkles,
    title: "Contexto cultural brasileiro",
    description: "Sua IA sabe quando usar CPF vs CNPJ, que Pix é o método mais usado, e que preços usam vírgula.",
    color: "text-brasil-yellow bg-brasil-yellow/10 border-brasil-yellow/20",
  },
  {
    icon: Plug,
    title: "Registry + MCP",
    description: "Registry compatível com shadcn. MCP server para Cursor, Claude Code e outros agentes descobrirem componentes.",
    color: "text-brasil-blue bg-brasil-blue/10 border-brasil-blue/20",
  },
];

export function AIReady() {
  return (
    <section id="ai-ready" className="relative border-t border-neutral-100 bg-neutral-50/50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brasil-blue/20 bg-brasil-blue/5 px-3 py-1 text-xs font-medium text-brasil-blue">
              <span className="h-1.5 w-1.5 rounded-full bg-brasil-blue" />
              AI-Ready
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl md:text-5xl">
              Não é só componente.
              <br />
              <span className="bg-gradient-to-r from-brasil-green via-brasil-yellow-light to-brasil-blue bg-clip-text text-transparent">
                É contexto para sua IA.
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-500">
              Peça para sua IA: &ldquo;Crie um checkout brasileiro.&rdquo; Com
              brasa.ui, ela sabe o que isso significa — Pix, CPF, parcelamento,
              R$, CEP, boleto.
            </p>

            <div className="mt-8 space-y-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex gap-4 rounded-xl border border-neutral-100 bg-white p-4 transition-all hover:border-neutral-200 hover:shadow-sm">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${feature.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-neutral-950">{feature.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-neutral-500">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-brasil-green via-brasil-yellow to-brasil-blue opacity-30 blur-md" />
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-brasil-green via-brasil-yellow to-brasil-blue" />
            <div className="relative rounded-2xl bg-white p-1">
              <div className="rounded-xl bg-neutral-950 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-neutral-800" />
                  <div className="h-2.5 w-2.5 rounded-full bg-neutral-800" />
                  <div className="h-2.5 w-2.5 rounded-full bg-neutral-800" />
                  <span className="ml-2 text-[11px] text-neutral-500 font-mono">
                    pix-payment.schema.json
                  </span>
                  <span className="ml-auto rounded-md bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                    AI Schema
                  </span>
                </div>
                <pre className="overflow-x-auto text-[13px] leading-relaxed font-mono">
                  <code>
                    {schemaExample.split("\n").map((line, i) => (
                      <div key={i}>
                        {line.split(/("[^"]*")/g).map((part, j) =>
                          part.startsWith('"') ? (
                            line.includes(":") && line.trim().startsWith(part) ? (
                              <span key={j} className="text-sky-300">{part}</span>
                            ) : (
                              <span key={j} className="text-emerald-400">{part}</span>
                            )
                          ) : (
                            <span key={j} className="text-neutral-500">{part}</span>
                          )
                        )}
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
