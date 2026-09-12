"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Card, CardHeader, CardContent, CardFooter,
  Badge,
  Alert,
  Tabs, TabList, TabTrigger, TabContent,
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  Separator,
  Switch,
  Tooltip,
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
  BarChart3,
  Globe,
  Server,
  ChevronRight,
  Check,
  Code2,
  Database,
  Layers,
  Activity,
  ArrowUpRight,
  Terminal,
  Cpu,
  Network,
  Eye,
} from "lucide-react";

function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#08080c]/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a href="/showcase/orion" className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600">
            <Layers className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-white">Orion</span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          <a href="#" className="text-sm text-neutral-400 transition-colors hover:text-white">Produto</a>
          <a href="#" className="text-sm text-neutral-400 transition-colors hover:text-white">Developers</a>
          <a href="#" className="text-sm text-neutral-400 transition-colors hover:text-white">Pricing</a>
          <a href="#" className="text-sm text-neutral-400 transition-colors hover:text-white">Docs</a>
          <div className="h-4 w-px bg-white/10" />
          <Button size="sm" className="bg-indigo-600 text-white hover:bg-indigo-500 border-0 rounded-lg">
            Começar agora
          </Button>
        </div>
      </nav>
    </header>
  );
}

function HeroSection() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText("npm install @orion/core");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="relative overflow-hidden pt-24 pb-20">
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute -top-20 right-1/3 h-[400px] w-[400px] rounded-full bg-violet-600/8 blur-[100px]" />
        <div className="absolute top-40 right-0 h-[300px] w-[300px] rounded-full bg-blue-600/5 blur-[80px]" />
      </div>

      {/* Grid pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          <a
            href="#"
            className="group mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-neutral-300 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.06]"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Open Finance 2.0 compatível
            <ChevronRight className="h-3.5 w-3.5 text-neutral-500 transition-transform group-hover:translate-x-0.5" />
          </a>

          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[64px] lg:leading-[1.08]">
            Infraestrutura bancária{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              para o Brasil moderno
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400">
            Core banking, processamento Pix, Open Finance e compliance — tudo via API.
            De fintechs a bancos de grande porte, em produção desde 2021.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Button size="lg" className="bg-indigo-600 text-white hover:bg-indigo-500 border-0 rounded-xl gap-2 shadow-lg shadow-indigo-600/25">
              Agendar demo
              <ArrowRight className="h-4 w-4" />
            </Button>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 font-mono text-sm text-neutral-300 transition-all hover:border-white/20 hover:bg-white/[0.06]"
            >
              <span className="text-indigo-400">$</span>
              npm install @orion/core
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <Code2 className="h-3.5 w-3.5 text-neutral-500" />
              )}
            </button>
          </div>

          {/* Trust logos */}
          <div className="mt-16 flex flex-col items-center gap-4">
            <p className="text-xs font-medium uppercase tracking-widest text-neutral-600">
              Processando para +40 instituições financeiras
            </p>
            <div className="flex items-center gap-8">
              {["BancoPrime", "FinNova", "CréditoJá", "PayBR", "VaultBank"].map((name) => (
                <span key={name} className="text-sm font-semibold text-neutral-700 tracking-wide">{name}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Code preview */}
        <div className="relative mx-auto mt-20 max-w-3xl">
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-indigo-500/20 via-white/5 to-transparent" />
          <div className="relative rounded-2xl border border-white/[0.06] bg-[#0c0c14] p-1">
            <div className="rounded-xl bg-[#08080c] p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-white/[0.06]" />
                  <div className="h-3 w-3 rounded-full bg-white/[0.06]" />
                  <div className="h-3 w-3 rounded-full bg-white/[0.06]" />
                  <span className="ml-3 font-mono text-xs text-neutral-600">create-pix-transfer.ts</span>
                </div>
                <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 text-[10px]">TypeScript</Badge>
              </div>

              <div className="space-y-1 font-mono text-[13px] leading-relaxed">
                <div>
                  <span className="text-violet-400">import</span>
                  <span className="text-neutral-300">{" { Orion } "}</span>
                  <span className="text-violet-400">from</span>
                  <span className="text-amber-300">{' "@orion/core"'}</span>
                </div>
                <div className="text-neutral-700">&nbsp;</div>
                <div>
                  <span className="text-violet-400">const</span>
                  <span className="text-blue-300"> orion </span>
                  <span className="text-neutral-500">= </span>
                  <span className="text-violet-400">new</span>
                  <span className="text-blue-300"> Orion</span>
                  <span className="text-neutral-500">{"({ "}</span>
                  <span className="text-neutral-300">apiKey</span>
                  <span className="text-neutral-500">: </span>
                  <span className="text-amber-300">{'"sk_live_..."'}</span>
                  <span className="text-neutral-500">{" })"}</span>
                </div>
                <div className="text-neutral-700">&nbsp;</div>
                <div>
                  <span className="text-neutral-600">{"// Criar transferência Pix em 3 linhas"}</span>
                </div>
                <div>
                  <span className="text-violet-400">const</span>
                  <span className="text-blue-300"> transfer </span>
                  <span className="text-neutral-500">= </span>
                  <span className="text-violet-400">await</span>
                  <span className="text-blue-300"> orion</span>
                  <span className="text-neutral-500">.</span>
                  <span className="text-blue-300">pix</span>
                  <span className="text-neutral-500">.</span>
                  <span className="text-yellow-200">createTransfer</span>
                  <span className="text-neutral-500">{"({"}</span>
                </div>
                <div className="pl-4">
                  <span className="text-neutral-300">amount</span>
                  <span className="text-neutral-500">: </span>
                  <span className="text-amber-300">14990</span>
                  <span className="text-neutral-500">,</span>
                  <span className="text-neutral-600">{" // R$ 149,90 em centavos"}</span>
                </div>
                <div className="pl-4">
                  <span className="text-neutral-300">pixKey</span>
                  <span className="text-neutral-500">: </span>
                  <span className="text-amber-300">{'"12345678909"'}</span>
                  <span className="text-neutral-500">,</span>
                  <span className="text-neutral-600">{" // CPF do recebedor"}</span>
                </div>
                <div className="pl-4">
                  <span className="text-neutral-300">description</span>
                  <span className="text-neutral-500">: </span>
                  <span className="text-amber-300">{'"Pagamento fatura #4521"'}</span>
                </div>
                <div>
                  <span className="text-neutral-500">{"})"}</span>
                </div>
                <div className="text-neutral-700">&nbsp;</div>
                <div>
                  <span className="text-neutral-600">{"// transfer.id → \"pix_9f8a7b6c5d\""}</span>
                </div>
                <div>
                  <span className="text-neutral-600">{"// transfer.status → \"completed\" (< 2s)"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricsSection() {
  return (
    <section className="border-y border-white/[0.04] py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {[
            { value: "R$ 127B+", label: "Processados em 2025", sub: "Volume anual" },
            { value: "< 800ms", label: "Latência média Pix", sub: "End-to-end" },
            { value: "99.995%", label: "Uptime garantido", sub: "SLA contratual" },
            { value: "40+", label: "Instituições", sub: "Em produção" },
          ].map((m, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-bold text-white lg:text-4xl tracking-tight">{m.value}</p>
              <p className="mt-2 text-sm font-medium text-neutral-300">{m.label}</p>
              <p className="text-xs text-neutral-600">{m.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductsSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">Plataforma</p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Uma API para toda a operação bancária
          </h2>
          <p className="mt-4 text-lg text-neutral-400 max-w-2xl mx-auto">
            Do core banking ao compliance, cada módulo funciona sozinho ou integrado.
            Construa seu banco em semanas, não anos.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Database,
              title: "Core Banking",
              desc: "Contas, ledger, conciliação e extrato. Multi-moeda, multi-produto, auditável.",
              tag: "Fundamental",
              gradient: "from-indigo-500/10 to-indigo-500/0",
              iconColor: "text-indigo-400 bg-indigo-500/10",
            },
            {
              icon: Zap,
              title: "Pix",
              desc: "PSP direto com o Banco Central. Pix instantâneo, QR dinâmico, Pix Saque e Troco.",
              tag: "Mais adotado",
              gradient: "from-emerald-500/10 to-emerald-500/0",
              iconColor: "text-emerald-400 bg-emerald-500/10",
            },
            {
              icon: Globe,
              title: "Open Finance",
              desc: "Compartilhamento de dados, iniciação de pagamentos e portabilidade. Fase 1–4.",
              tag: "Novo",
              gradient: "from-violet-500/10 to-violet-500/0",
              iconColor: "text-violet-400 bg-violet-500/10",
            },
            {
              icon: Shield,
              title: "Compliance & KYC",
              desc: "Validação de CPF/CNPJ, PEP screening, análise de risco e relatórios BACEN.",
              gradient: "from-amber-500/10 to-amber-500/0",
              iconColor: "text-amber-400 bg-amber-500/10",
            },
            {
              icon: Lock,
              title: "Tokenização",
              desc: "Cartões tokenizados, cofre PCI DSS Level 1, gestão de chaves criptográficas.",
              gradient: "from-rose-500/10 to-rose-500/0",
              iconColor: "text-rose-400 bg-rose-500/10",
            },
            {
              icon: Activity,
              title: "Monitoramento",
              desc: "Dashboards em tempo real, alertas, webhooks e logs de auditoria imutáveis.",
              gradient: "from-cyan-500/10 to-cyan-500/0",
              iconColor: "text-cyan-400 bg-cyan-500/10",
            },
          ].map((p, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl border border-white/[0.06] bg-gradient-to-b ${p.gradient} p-6 transition-all hover:border-white/[0.1] hover:bg-white/[0.02]`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${p.iconColor}`}>
                  <p.icon className="h-5 w-5" />
                </div>
                {p.tag && (
                  <span className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[10px] font-medium text-neutral-400">
                    {p.tag}
                  </span>
                )}
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{p.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-xs font-medium text-indigo-400 opacity-0 transition-opacity group-hover:opacity-100">
                Ver documentação <ArrowUpRight className="h-3 w-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoSection() {
  return (
    <section className="py-24 border-t border-white/[0.04]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">Integração</p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Da sandbox à produção em minutos
            </h2>
            <p className="mt-4 text-lg text-neutral-400">
              API RESTful com SDKs em TypeScript, Python e Go.
              Sandbox completa com dados sintéticos de CPF, CNPJ e contas reais.
            </p>

            <div className="mt-10 space-y-6">
              {[
                {
                  icon: Terminal,
                  title: "SDKs tipados",
                  desc: "TypeScript-first com autocomplete completo. Cada endpoint, cada webhook, cada erro tipado.",
                },
                {
                  icon: Cpu,
                  title: "Sandbox realista",
                  desc: "Simule transferências Pix, aprovações de crédito e fluxos de KYC com dados brasileiros válidos.",
                },
                {
                  icon: Network,
                  title: "Webhooks confiáveis",
                  desc: "Retry automático com backoff exponencial, assinatura HMAC, e replay de eventos.",
                },
                {
                  icon: Eye,
                  title: "Observabilidade",
                  desc: "Cada request com trace ID. Integração nativa com Datadog, Grafana e CloudWatch.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-indigo-400">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                    <p className="text-sm text-neutral-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live demo card */}
          <div className="space-y-6">
            <Card className="rounded-2xl border-white/[0.06] bg-[#0c0c14] shadow-2xl shadow-black/40">
              <CardHeader className="border-b border-white/[0.06] px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Validação KYC — Sandbox</h3>
                    <p className="text-[11px] text-neutral-600 mt-0.5">Teste com dados reais brasileiros</p>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px]">
                    <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Sandbox
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Input
                  label="Nome completo"
                  placeholder="Maria da Silva Santos"
                  className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-neutral-600"
                />
                <CPFInput
                  label="CPF"
                  className="bg-white/[0.03] border-white/[0.08] text-white"
                />
                <CNPJInput
                  label="CNPJ da empresa"
                  className="bg-white/[0.03] border-white/[0.08] text-white"
                />
                <CurrencyBRL
                  label="Renda mensal"
                  className="bg-white/[0.03] border-white/[0.08] text-white"
                />
              </CardContent>
              <CardFooter className="border-t border-white/[0.06] px-6 py-4 flex gap-3">
                <Button size="sm" className="bg-indigo-600 text-white hover:bg-indigo-500 border-0 rounded-lg flex-1">
                  Validar KYC
                </Button>
                <Button size="sm" className="bg-white/[0.04] text-neutral-300 hover:bg-white/[0.08] border-white/[0.08] rounded-lg">
                  Resetar
                </Button>
              </CardFooter>
            </Card>

            <Alert
              variant="info"
              title="Ambiente de sandbox"
              className="border-indigo-500/20 bg-indigo-500/5"
            >
              <span className="text-neutral-400">
                Use CPF 123.456.789-09 para simular aprovação, ou 000.000.000-00 para rejeição.
              </span>
            </Alert>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="py-24 border-t border-white/[0.04]">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">Pricing</p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Pague pelo que usar
          </h2>
          <p className="mt-4 text-lg text-neutral-400 max-w-2xl mx-auto">
            Sem setup fee, sem mínimo mensal. Escale de 100 a 100 milhões de transações.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Starter */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
            <p className="text-sm font-semibold text-neutral-400">Starter</p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">R$ 0</span>
              <span className="text-sm text-neutral-500">/mês</span>
            </div>
            <p className="mt-2 text-sm text-neutral-500">Para fintechs em estágio inicial</p>
            <Separator className="my-6 bg-white/[0.06]" />
            <ul className="space-y-3">
              {["1.000 transações/mês", "Sandbox completa", "Suporte por email", "1 ambiente"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-neutral-300">
                  <Check className="h-3.5 w-3.5 text-neutral-500" />
                  {f}
                </li>
              ))}
            </ul>
            <Button className="mt-8 w-full bg-white/[0.06] text-white hover:bg-white/[0.1] border-white/[0.08] rounded-xl">
              Começar grátis
            </Button>
          </div>

          {/* Scale — highlighted */}
          <div className="relative rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.08] to-transparent p-8">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="rounded-full bg-indigo-600 px-3 py-1 text-[11px] font-semibold text-white">
                Mais popular
              </span>
            </div>
            <p className="text-sm font-semibold text-indigo-400">Scale</p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">R$ 2.990</span>
              <span className="text-sm text-neutral-500">/mês</span>
            </div>
            <p className="mt-2 text-sm text-neutral-500">Para fintechs em crescimento</p>
            <Separator className="my-6 bg-white/[0.06]" />
            <ul className="space-y-3">
              {[
                "100.000 transações/mês",
                "Pix + Core Banking",
                "Suporte prioritário",
                "3 ambientes",
                "Webhooks + dashboards",
                "SLA 99.9%",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-neutral-200">
                  <Check className="h-3.5 w-3.5 text-indigo-400" />
                  {f}
                </li>
              ))}
            </ul>
            <Button size="lg" className="mt-8 w-full bg-indigo-600 text-white hover:bg-indigo-500 border-0 rounded-xl shadow-lg shadow-indigo-600/20">
              Começar agora
            </Button>
          </div>

          {/* Enterprise */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
            <p className="text-sm font-semibold text-neutral-400">Enterprise</p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">Custom</span>
            </div>
            <p className="mt-2 text-sm text-neutral-500">Para bancos e instituições reguladas</p>
            <Separator className="my-6 bg-white/[0.06]" />
            <ul className="space-y-3">
              {[
                "Transações ilimitadas",
                "Todos os módulos",
                "Gerente dedicado",
                "Ambientes ilimitados",
                "On-premise disponível",
                "SLA 99.995%",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-neutral-300">
                  <Check className="h-3.5 w-3.5 text-neutral-500" />
                  {f}
                </li>
              ))}
            </ul>
            <Button className="mt-8 w-full bg-white/[0.06] text-white hover:bg-white/[0.1] border-white/[0.08] rounded-xl">
              Falar com vendas
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="py-24 border-t border-white/[0.04]">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-white">Perguntas frequentes</h2>
          <p className="mt-3 text-neutral-400">Dúvidas sobre integração, compliance e operação.</p>
        </div>

        <Accordion type="single" defaultOpen={["q1"]}>
          <AccordionItem value="q1" className="border-white/[0.06]">
            <AccordionTrigger value="q1" className="text-white hover:text-neutral-200">
              Preciso de licença do Banco Central para usar?
            </AccordionTrigger>
            <AccordionContent value="q1">
              <p className="text-sm text-neutral-400 leading-relaxed">
                Depende do modelo. Se você opera como correspondente bancário ou under uma instituição parceira, pode usar a Orion sob a licença dela. Para operação própria como SCD, SEP ou IP, você precisa da autorização do BACEN. Nossa equipe de compliance te orienta no processo completo.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2" className="border-white/[0.06]">
            <AccordionTrigger value="q2" className="text-white hover:text-neutral-200">
              Qual o tempo de integração típico?
            </AccordionTrigger>
            <AccordionContent value="q2">
              <p className="text-sm text-neutral-400 leading-relaxed">
                Uma integração básica (contas + Pix) leva de 2 a 4 semanas. Integrações completas com KYC, crédito e Open Finance levam de 6 a 12 semanas. Oferecemos sandbox desde o dia 1 e um time de Solutions Engineering dedicado.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3" className="border-white/[0.06]">
            <AccordionTrigger value="q3" className="text-white hover:text-neutral-200">
              Vocês são PSP direto do Pix?
            </AccordionTrigger>
            <AccordionContent value="q3">
              <p className="text-sm text-neutral-400 leading-relaxed">
                Sim. A Orion é participante direto do SPI (Sistema de Pagamentos Instantâneos) e do DICT (Diretório de Identificadores de Contas Transacionais), conectada diretamente ao Banco Central. Isso garante menor latência e maior confiabilidade.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q4" className="border-white/[0.06]">
            <AccordionTrigger value="q4" className="text-white hover:text-neutral-200">
              Suportam on-premise?
            </AccordionTrigger>
            <AccordionContent value="q4">
              <p className="text-sm text-neutral-400 leading-relaxed">
                No plano Enterprise, sim. Deployamos em cloud privada (AWS, GCP, Azure) ou data centers próprios com suporte a HSM dedicado. Todos os ambientes passam por pen testing trimestral e auditorias SOC 2 Type II.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 border-t border-white/[0.04]">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="relative rounded-3xl border border-white/[0.06] bg-gradient-to-b from-indigo-500/[0.08] via-transparent to-transparent p-12 md:p-16 overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[200px] w-[400px] rounded-full bg-indigo-600/15 blur-[80px]" />
          </div>
          <div className="relative">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Construa o futuro do sistema financeiro brasileiro
            </h2>
            <p className="mt-4 text-lg text-neutral-400 max-w-xl mx-auto">
              Agende uma demo de 30 minutos e veja a plataforma em ação com dados reais da sua operação.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-indigo-600 text-white hover:bg-indigo-500 border-0 rounded-xl gap-2 shadow-lg shadow-indigo-600/25">
                Agendar demo
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" className="bg-white/[0.06] text-white hover:bg-white/[0.1] border-white/[0.08] rounded-xl">
                Ler documentação
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-violet-600">
              <Layers className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-semibold text-white">Orion</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-neutral-600">
            <a href="#" className="hover:text-neutral-300 transition-colors">Produto</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Docs</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Status</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Blog</a>
          </div>
          <p className="text-xs text-neutral-700">
            Exemplo fictício criado com{" "}
            <a href="/" className="text-indigo-400 hover:underline">brasa.ui</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function OrionShowcase() {
  return (
    <div className="min-h-screen bg-[#08080c] text-white">
      <NavBar />
      <main>
        <HeroSection />
        <MetricsSection />
        <ProductsSection />
        <DemoSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
