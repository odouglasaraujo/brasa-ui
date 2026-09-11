"use client";

import { ArrowRight, Copy, Check, ChevronRight } from "lucide-react";
import { useState } from "react";

function ComponentDemo() {
  return (
    <div className="relative mx-auto mt-16 w-full max-w-3xl animate-fade-in-up-slow" style={{ animationDelay: "0.5s" }}>
      <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-brasil-green via-brasil-yellow to-brasil-blue opacity-40 blur-md" />
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-brasil-green via-brasil-yellow to-brasil-blue" />

      <div className="relative rounded-2xl bg-white p-1">
        <div className="rounded-xl bg-neutral-950 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-neutral-800" />
              <div className="h-3 w-3 rounded-full bg-neutral-800" />
              <div className="h-3 w-3 rounded-full bg-neutral-800" />
              <span className="ml-3 text-xs text-neutral-500 font-mono">
                checkout.tsx
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-brasil-green/20 px-2 py-0.5 text-[10px] font-medium text-brasil-green">brasa.ui</span>
            </div>
          </div>

          <div className="space-y-1 font-mono text-[13px] leading-relaxed">
            <div>
              <span className="text-neutral-500">{"import "}</span>
              <span className="text-emerald-400">{"{ PixPayment, CPFInput, CurrencyBRL }"}</span>
              <span className="text-neutral-500">{" from "}</span>
              <span className="text-amber-300">{'"brasa.ui"'}</span>
            </div>
            <div className="text-neutral-700">&nbsp;</div>
            <div>
              <span className="text-blue-400">{"export function "}</span>
              <span className="text-yellow-200">{"Checkout"}</span>
              <span className="text-neutral-500">{"() {"}</span>
            </div>
            <div className="text-neutral-500">{"  return ("}</div>
            <div className="pl-4">
              <span className="text-neutral-500">{"<"}</span>
              <span className="text-emerald-400">{"PixPayment"}</span>
            </div>
            <div className="pl-8">
              <span className="text-sky-300">{"amount"}</span>
              <span className="text-neutral-500">{"={"}</span>
              <span className="text-amber-300">{"149.90"}</span>
              <span className="text-neutral-500">{"}"}</span>
            </div>
            <div className="pl-8">
              <span className="text-sky-300">{"currency"}</span>
              <span className="text-neutral-500">{"="}</span>
              <span className="text-amber-300">{'"BRL"'}</span>
            </div>
            <div className="pl-8">
              <span className="text-sky-300">{"installments"}</span>
              <span className="text-neutral-500">{"={"}</span>
              <span className="text-amber-300">{"10"}</span>
              <span className="text-neutral-500">{"}"}</span>
            </div>
            <div className="pl-4">
              <span className="text-neutral-500">{"/>"}</span>
            </div>
            <div className="text-neutral-500">{"  )"}</div>
            <div className="text-neutral-500">{"}"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText("npx brasa-ui@latest init");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="relative overflow-hidden pb-20 pt-20 md:pt-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 left-1/4 h-96 w-96 rounded-full bg-brasil-green/5 blur-[100px]" />
        <div className="absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-brasil-yellow/5 blur-[100px]" />
        <div className="absolute top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brasil-blue/5 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          <a
            href="#components"
            className="group mb-8 inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-sm text-neutral-600 shadow-sm transition-all hover:border-neutral-300 hover:shadow-md animate-fade-in-up"
          >
            <span className="mr-0.5">🇧🇷</span>
            Componentes brasileiros para IA
            <ChevronRight className="h-3.5 w-3.5 text-neutral-400 transition-transform group-hover:translate-x-0.5" />
          </a>

          <h1
            className="max-w-4xl text-4xl font-extrabold tracking-tight text-neutral-950 sm:text-5xl md:text-6xl lg:text-[68px] lg:leading-[1.05] animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Componentes para{" "}
            <span className="bg-gradient-to-r from-brasil-green via-brasil-yellow-light to-brasil-blue bg-clip-text text-transparent">
              produtos digitais brasileiros
            </span>
          </h1>

          <p
            className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-500 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Componentes React com{" "}
            <strong className="font-semibold text-neutral-700">CPF, Pix, CEP, boleto e parcelamento</strong>
            {" "}— tipados, acessíveis, e com schema JSON para agentes de IA.
          </p>

          <div
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <a
              href="#components"
              className="group inline-flex items-center gap-2 rounded-xl bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-neutral-800 hover:shadow-lg"
            >
              Ver componentes
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2.5 rounded-xl border border-neutral-200 bg-white px-5 py-3 font-mono text-sm text-neutral-600 transition-all hover:border-neutral-300 hover:bg-neutral-50 hover:shadow-md"
            >
              npx brasa-ui@latest init
              {copied ? (
                <Check className="h-3.5 w-3.5 text-brasil-green" />
              ) : (
                <Copy className="h-3.5 w-3.5 text-neutral-400" />
              )}
            </button>
          </div>

          <ComponentDemo />
        </div>
      </div>
    </section>
  );
}
