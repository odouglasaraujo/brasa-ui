"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Card, CardContent,
  Badge,
  Tabs, TabList, TabTrigger, TabContent,
  Separator,
  CPFInput,
  CNPJInput,
  CurrencyBRL,
  PixPayment,
} from "../../../../../packages/ui/src";
import {
  ArrowRight,
  Shield,
  Zap,
  Lock,
  Globe,
  Layers,
  Check,
  Code2,
  Activity,
  ArrowUpRight,
  Terminal,
  Copy,
} from "lucide-react";

function Nav() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/[0.06] bg-[#08080c]/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <a href="/showcase/orion" className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-violet-600">
            <Layers className="h-3 w-3 text-white" />
          </div>
          <span className="text-sm font-semibold text-white">Orion</span>
        </a>
        <div className="hidden items-center gap-5 md:flex">
          {["Produto", "Docs", "Pricing", "Blog"].map((l) => (
            <a key={l} href="#" className="text-[13px] text-neutral-500 transition-colors hover:text-white">{l}</a>
          ))}
        </div>
        <Button size="sm" className="bg-indigo-600 text-white hover:bg-indigo-500 border-0 text-xs h-8 px-3 rounded-lg">
          Começar
        </Button>
      </nav>
    </header>
  );
}

function Hero() {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText("npm install @orion/core");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="pt-32 pb-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-neutral-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            PSP direto — conectado ao Banco Central
          </div>

          <h1 className="text-[40px] font-bold leading-[1.15] tracking-tight text-white sm:text-5xl">
            APIs de infraestrutura bancária para o Brasil
          </h1>

          <p className="mt-5 text-base leading-relaxed text-neutral-400 max-w-lg">
            Core banking, Pix, Open Finance e KYC — tudo via API. Construa produtos financeiros em semanas, não anos.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <Button size="sm" className="bg-indigo-600 text-white hover:bg-indigo-500 border-0 rounded-lg gap-1.5 h-9 px-4 text-sm">
              Agendar demo
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 h-9 font-mono text-xs text-neutral-400 transition-all hover:border-white/[0.15] hover:bg-white/[0.04]"
            >
              <span className="text-indigo-400">$</span>
              npm i @orion/core
              {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3 text-neutral-600" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function LiveDemo() {
  return (
    <section className="pb-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-xl border border-white/[0.06] bg-[#0a0a12] overflow-hidden">
          {/* Window chrome */}
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-white/[0.06]" />
              <div className="h-2.5 w-2.5 rounded-full bg-white/[0.06]" />
              <div className="h-2.5 w-2.5 rounded-full bg-white/[0.06]" />
            </div>
            <div className="ml-3 flex items-center gap-3">
              <span className="rounded bg-white/[0.04] px-2.5 py-0.5 font-mono text-[11px] text-neutral-500">
                dashboard.orion.com.br
              </span>
            </div>
          </div>

          {/* Dashboard content */}
          <div className="grid lg:grid-cols-[220px_1fr] min-h-[480px]">
            {/* Sidebar */}
            <div className="hidden lg:block border-r border-white/[0.06] p-4">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-gradient-to-br from-indigo-500 to-violet-600">
                  <Layers className="h-2.5 w-2.5 text-white" />
                </div>
                <span className="text-xs font-semibold text-white">Orion</span>
              </div>
              <nav className="space-y-0.5">
                {[
                  { label: "Visão geral", active: true },
                  { label: "Transações" },
                  { label: "Pix" },
                  { label: "Contas" },
                  { label: "KYC / Compliance" },
                  { label: "Webhooks" },
                  { label: "API Keys" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-md px-2.5 py-1.5 text-xs ${
                      item.active
                        ? "bg-white/[0.06] text-white font-medium"
                        : "text-neutral-600 hover:text-neutral-400"
                    }`}
                  >
                    {item.label}
                  </div>
                ))}
              </nav>
            </div>

            {/* Main area */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-sm font-semibold text-white">Visão geral</h2>
                  <p className="text-[11px] text-neutral-600 mt-0.5">Últimas 24 horas — Sandbox</p>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] rounded-md">
                  <span className="mr-1 h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  Live
                </Badge>
              </div>

              {/* Metric cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {[
                  { label: "Volume Pix", value: "R$ 2.4M", change: "+12%" },
                  { label: "Transações", value: "14.892", change: "+8%" },
                  { label: "Latência p99", value: "720ms", change: "-15%" },
                  { label: "Taxa de erro", value: "0.02%", change: "-40%" },
                ].map((m) => (
                  <div key={m.label} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                    <p className="text-[10px] text-neutral-600 uppercase tracking-wider">{m.label}</p>
                    <p className="text-lg font-bold text-white mt-1 tabular-nums">{m.value}</p>
                    <p className={`text-[10px] mt-0.5 ${m.change.startsWith("-") && m.label !== "Taxa de erro" ? "text-red-400" : "text-emerald-400"}`}>
                      {m.change}
                    </p>
                  </div>
                ))}
              </div>

              {/* Transactions table */}
              <div className="rounded-lg border border-white/[0.06] overflow-hidden">
                <div className="border-b border-white/[0.06] px-4 py-2.5 flex items-center justify-between">
                  <span className="text-xs font-medium text-neutral-400">Últimas transações</span>
                  <span className="text-[10px] text-neutral-600">Ver todas →</span>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  {[
                    { id: "pix_9f8a7b6c", type: "Pix enviado", to: "João S. — CPF •••.456.789-09", value: "- R$ 1.500,00", status: "Concluído", time: "14:32" },
                    { id: "pix_3d2e1f0a", type: "Pix recebido", to: "Loja ABC — CNPJ •••.234.567/0001-00", value: "+ R$ 4.200,00", status: "Concluído", time: "13:58" },
                    { id: "pix_7c6b5a49", type: "Pix enviado", to: "Maria R. — Chave aleatória", value: "- R$ 89,90", status: "Processando", time: "13:41" },
                    { id: "ted_1a2b3c4d", type: "TED enviado", to: "Empresa XYZ — Ag 0001 Cc 12345-6", value: "- R$ 25.000,00", status: "Agendado", time: "12:00" },
                  ].map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between px-4 py-2.5 hover:bg-white/[0.02] transition-colors">
                      <div className="flex items-center gap-3 min-w-0">
                        <code className="text-[10px] text-neutral-700 font-mono shrink-0">{tx.id}</code>
                        <div className="min-w-0">
                          <p className="text-xs text-neutral-300 truncate">{tx.type} — {tx.to}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 shrink-0 ml-4">
                        <span className={`text-xs font-mono tabular-nums ${tx.value.startsWith("+") ? "text-emerald-400" : "text-neutral-300"}`}>
                          {tx.value}
                        </span>
                        <span className={`text-[10px] rounded px-1.5 py-0.5 ${
                          tx.status === "Concluído" ? "bg-emerald-500/10 text-emerald-400" :
                          tx.status === "Processando" ? "bg-amber-500/10 text-amber-400" :
                          "bg-white/[0.04] text-neutral-500"
                        }`}>
                          {tx.status}
                        </span>
                        <span className="text-[10px] text-neutral-700 tabular-nums">{tx.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function APISection() {
  return (
    <section className="py-24 border-t border-white/[0.04]">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">API</p>
        <h2 className="text-2xl font-bold text-white mb-3">3 linhas para um Pix</h2>
        <p className="text-sm text-neutral-500 mb-10 max-w-md">
          SDK tipado em TypeScript. Cada endpoint, webhook e erro com autocomplete.
        </p>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Code */}
          <div className="rounded-xl border border-white/[0.06] bg-[#0a0a12] overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
              <span className="font-mono text-[11px] text-neutral-600">pix-transfer.ts</span>
              <span className="text-[10px] text-indigo-400">TypeScript</span>
            </div>
            <div className="p-5 font-mono text-[12px] leading-relaxed">
              <div>
                <span className="text-violet-400">import</span>
                <span className="text-neutral-300">{" { Orion } "}</span>
                <span className="text-violet-400">from</span>
                <span className="text-amber-300">{' "@orion/core"'}</span>
              </div>
              <div className="text-neutral-800">&nbsp;</div>
              <div>
                <span className="text-violet-400">const</span>
                <span className="text-blue-300"> pix </span>
                <span className="text-neutral-500">= </span>
                <span className="text-violet-400">await</span>
                <span className="text-neutral-300"> orion</span>
                <span className="text-neutral-500">.</span>
                <span className="text-blue-300">pix</span>
                <span className="text-neutral-500">.</span>
                <span className="text-yellow-200">transfer</span>
                <span className="text-neutral-500">{"({"}</span>
              </div>
              <div className="pl-4">
                <span className="text-neutral-400">amount</span>
                <span className="text-neutral-600">: </span>
                <span className="text-amber-300">14990</span>
                <span className="text-neutral-600">,</span>
              </div>
              <div className="pl-4">
                <span className="text-neutral-400">pixKey</span>
                <span className="text-neutral-600">: </span>
                <span className="text-amber-300">{'"12345678909"'}</span>
                <span className="text-neutral-600">,</span>
              </div>
              <div className="pl-4">
                <span className="text-neutral-400">description</span>
                <span className="text-neutral-600">: </span>
                <span className="text-amber-300">{'"Fatura #4521"'}</span>
              </div>
              <div><span className="text-neutral-500">{"})"}</span></div>
              <div className="text-neutral-800">&nbsp;</div>
              <div className="text-neutral-700">{"// → completed em < 2s"}</div>
            </div>
          </div>

          {/* Live result */}
          <div className="rounded-xl border border-white/[0.06] bg-[#0a0a12] overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
              <span className="font-mono text-[11px] text-neutral-600">Resultado — Pix gerado</span>
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] rounded-md">
                200 OK
              </Badge>
            </div>
            <div className="p-5">
              <PixPayment
                amount={14990}
                pixCode="00020126580014br.gov.bcb.pix0136orion-demo-key"
                status="qr_generated"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function KYCSection() {
  return (
    <section className="py-24 border-t border-white/[0.04]">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px] items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">Compliance</p>
            <h2 className="text-2xl font-bold text-white mb-3">KYC com dados brasileiros reais</h2>
            <p className="text-sm text-neutral-500 mb-8 max-w-md">
              Validação de CPF, CNPJ, PEP screening e análise de risco em uma chamada de API. Sandbox com dados sintéticos válidos.
            </p>

            <div className="space-y-4">
              {[
                { icon: Shield, title: "Validação CPF/CNPJ", desc: "Mod11 + consulta Receita Federal em tempo real" },
                { icon: Activity, title: "Análise de risco", desc: "Score proprietário com +200 variáveis comportamentais" },
                { icon: Globe, title: "PEP & sanctions", desc: "Screening contra listas COAF, OFAC e EU sanctions" },
                { icon: Lock, title: "LGPD compliant", desc: "Dados criptografados, auditoria e direito ao esquecimento" },
              ].map((item) => (
                <div key={item.title} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">
                    <item.icon className="h-3.5 w-3.5 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-neutral-200">{item.title}</h4>
                    <p className="text-xs text-neutral-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* KYC form */}
          <div className="rounded-xl border border-white/[0.06] bg-[#0a0a12] overflow-hidden">
            <div className="border-b border-white/[0.06] px-5 py-3 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-300">Validação KYC</span>
              <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 text-[10px] rounded-md">Sandbox</Badge>
            </div>
            <div className="p-5 space-y-3">
              <Input
                label="Nome"
                placeholder="Maria da Silva"
                className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-neutral-700 text-sm"
              />
              <CPFInput
                label="CPF"
                className="bg-white/[0.03] border-white/[0.08] text-white text-sm"
              />
              <CNPJInput
                label="CNPJ"
                className="bg-white/[0.03] border-white/[0.08] text-white text-sm"
              />
              <CurrencyBRL
                label="Renda mensal"
                className="bg-white/[0.03] border-white/[0.08] text-white text-sm"
              />
              <Button size="sm" className="w-full bg-indigo-600 text-white hover:bg-indigo-500 border-0 rounded-lg mt-2 h-9 text-sm">
                Validar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NumbersSection() {
  return (
    <section className="py-20 border-t border-white/[0.04]">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {[
            { value: "R$ 127B+", label: "Processados em 2025" },
            { value: "< 800ms", label: "Latência Pix p99" },
            { value: "99.995%", label: "Uptime (SLA)" },
            { value: "40+", label: "Instituições em produção" },
          ].map((m) => (
            <div key={m.label} className="text-center">
              <p className="text-2xl font-bold text-white tabular-nums">{m.value}</p>
              <p className="mt-1 text-xs text-neutral-600">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 border-t border-white/[0.04]">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-xl border border-white/[0.06] bg-gradient-to-br from-indigo-500/[0.06] via-transparent to-violet-500/[0.04] p-10 lg:p-14 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Construa o próximo banco brasileiro
          </h2>
          <p className="mt-3 text-sm text-neutral-400 max-w-md mx-auto">
            Agende 30 minutos com nosso time e veja a plataforma rodando com dados da sua operação.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button size="sm" className="bg-indigo-600 text-white hover:bg-indigo-500 border-0 rounded-lg gap-1.5 h-9 px-4 text-sm">
              Agendar demo
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
            <Button size="sm" className="bg-white/[0.04] text-neutral-300 hover:bg-white/[0.08] border-white/[0.08] rounded-lg h-9 px-4 text-sm">
              Documentação
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-8">
      <div className="mx-auto max-w-5xl px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-gradient-to-br from-indigo-500 to-violet-600">
            <Layers className="h-2.5 w-2.5 text-white" />
          </div>
          <span className="text-xs font-semibold text-neutral-500">Orion</span>
        </div>
        <p className="text-[11px] text-neutral-800">
          Exemplo fictício — <a href="/" className="text-indigo-500 hover:underline">brasa.ui</a>
        </p>
      </div>
    </footer>
  );
}

export default function OrionShowcase() {
  return (
    <div className="min-h-screen bg-[#08080c]">
      <Nav />
      <main>
        <Hero />
        <LiveDemo />
        <APISection />
        <KYCSection />
        <NumbersSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
