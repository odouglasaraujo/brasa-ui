"use client";

import { useState, useEffect, useRef } from "react";
import {
  Button,
  Input,
  Badge,
  Alert,
  Tabs, TabList, TabTrigger, TabContent,
  Switch,
  Separator,
  Tooltip,
  Select,
  CPFInput,
  CNPJInput,
  PhoneBR,
  CEPInput,
  CurrencyBRL,
  StateSelect,
  PixPayment,
  InstallmentSelect,
} from "../../../../../packages/ui/src";
import {
  ArrowRight,
  Shield,
  Zap,
  Lock,
  Globe,
  Layers,
  Check,
  Copy,
  Activity,
  ChevronRight,
  Database,
  Eye,
  Terminal,
  Network,
  Cpu,
} from "lucide-react";

/* ─── Animated counter ─── */
function Counter({ target, prefix = "", suffix = "", duration = 2000 }: {
  target: number; prefix?: string; suffix?: string; duration?: number;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(target * eased));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{value.toLocaleString("pt-BR")}{suffix}
    </span>
  );
}

/* ─── Nav ─── */
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
          {["Produto", "Developers", "Pricing", "Docs"].map((l) => (
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

/* ─── Hero ─── */
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
            Core banking, Pix, Open Finance e KYC — tudo via API.
            Construa produtos financeiros em semanas, não anos.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <Button size="sm" className="bg-indigo-600 text-white hover:bg-indigo-500 border-0 rounded-lg gap-1.5 h-9 px-4 text-sm">
              Agendar demo <ArrowRight className="h-3.5 w-3.5" />
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

/* ─── Animated Dashboard ─── */
function Dashboard() {
  const [activeRow, setActiveRow] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRow((r) => (r + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const transactions = [
    { id: "pix_9f8a7b6c", desc: "Pix enviado — João S. •••.456.789-09", value: "- R$ 1.500,00", positive: false, status: "Concluído", statusColor: "bg-emerald-500/10 text-emerald-400" },
    { id: "pix_3d2e1f0a", desc: "Pix recebido — Loja ABC CNPJ •••.567/0001", value: "+ R$ 4.200,00", positive: true, status: "Concluído", statusColor: "bg-emerald-500/10 text-emerald-400" },
    { id: "pix_7c6b5a49", desc: "Pix enviado — Maria R. chave aleatória", value: "- R$ 89,90", positive: false, status: "Processando", statusColor: "bg-amber-500/10 text-amber-400" },
    { id: "ted_1a2b3c4d", desc: "TED — Empresa XYZ Ag 0001 Cc 12345", value: "- R$ 25.000,00", positive: false, status: "Agendado", statusColor: "bg-white/[0.06] text-neutral-500" },
  ];

  return (
    <section className="pb-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="orion-dashboard rounded-xl border border-white/[0.06] bg-[#0a0a12] overflow-hidden">
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="ml-3 rounded bg-white/[0.04] px-2.5 py-0.5 font-mono text-[11px] text-neutral-500">
              dashboard.orion.com.br
            </span>
          </div>

          <div className="grid lg:grid-cols-[200px_1fr]">
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
                  { label: "Visão geral", active: true, icon: Activity },
                  { label: "Transações", icon: Database },
                  { label: "Pix", icon: Zap },
                  { label: "KYC", icon: Shield },
                  { label: "Webhooks", icon: Network },
                  { label: "API Keys", icon: Lock },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[11px] transition-colors ${
                      item.active
                        ? "bg-indigo-500/10 text-indigo-400 font-medium"
                        : "text-neutral-600 hover:text-neutral-400 hover:bg-white/[0.02]"
                    }`}
                  >
                    <item.icon className="h-3 w-3" />
                    {item.label}
                  </div>
                ))}
              </nav>
            </div>

            {/* Main */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-sm font-semibold text-white">Visão geral</h2>
                  <p className="text-[11px] text-neutral-600 mt-0.5">Últimas 24h · Ambiente sandbox</p>
                </div>
                <div className="flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Operacional
                </div>
              </div>

              {/* Animated metrics */}
              <div className="grid grid-cols-4 gap-3 mb-5">
                {[
                  { label: "Volume Pix", value: 2400000, prefix: "R$ ", suffix: "", format: true, change: "+12.4%", up: true },
                  { label: "Transações", value: 14892, prefix: "", suffix: "", format: true, change: "+8.2%", up: true },
                  { label: "Latência p99", value: 720, prefix: "", suffix: "ms", format: false, change: "-15%", up: false },
                  { label: "Erro rate", value: 2, prefix: "0.0", suffix: "%", format: false, change: "-40%", up: false },
                ].map((m) => (
                  <div key={m.label} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 transition-colors hover:bg-white/[0.03]">
                    <p className="text-[10px] text-neutral-600 uppercase tracking-wider mb-1">{m.label}</p>
                    <p className="text-base font-bold text-white tabular-nums leading-none">
                      {m.format ? (
                        <Counter target={m.value} prefix={m.prefix} suffix={m.suffix} />
                      ) : (
                        <>{m.prefix}{m.value}{m.suffix}</>
                      )}
                    </p>
                    <p className={`text-[10px] mt-1.5 font-medium ${m.label === "Latência p99" || m.label === "Erro rate" ? "text-emerald-400" : m.up ? "text-emerald-400" : "text-red-400"}`}>
                      {m.change}
                    </p>
                  </div>
                ))}
              </div>

              {/* Transactions with animated highlight */}
              <div className="rounded-lg border border-white/[0.06] overflow-hidden">
                <div className="border-b border-white/[0.06] px-4 py-2 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-neutral-400">Últimas transações</span>
                  <span className="text-[10px] text-indigo-400 cursor-pointer hover:text-indigo-300">Ver todas →</span>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  {transactions.map((tx, i) => (
                    <div
                      key={tx.id}
                      className={`flex items-center justify-between px-4 py-2.5 transition-all duration-700 ${
                        i === activeRow ? "bg-indigo-500/[0.04]" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <code className="text-[10px] text-neutral-700 font-mono shrink-0 w-[90px]">{tx.id}</code>
                        <p className="text-[11px] text-neutral-400 truncate">{tx.desc}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0 ml-4">
                        <span className={`text-[11px] font-mono tabular-nums font-medium ${tx.positive ? "text-emerald-400" : "text-neutral-300"}`}>
                          {tx.value}
                        </span>
                        <span className={`text-[10px] rounded px-1.5 py-0.5 ${tx.statusColor}`}>
                          {tx.status}
                        </span>
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

/* ─── Modules (Tabs) ─── */
function ModulesSection() {
  return (
    <section className="py-24 border-t border-white/[0.04]">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">Plataforma</p>
        <h2 className="text-2xl font-bold text-white mb-3">Um SDK, toda a operação bancária</h2>
        <p className="text-sm text-neutral-500 mb-10 max-w-lg">
          Cada módulo funciona sozinho ou integrado. TypeScript-first com autocomplete em cada endpoint.
        </p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Database, title: "Core Banking", desc: "Contas, ledger, conciliação e extrato. Multi-moeda e auditável.", tag: "Fundamental", tagColor: "text-indigo-400 bg-indigo-500/10" },
            { icon: Zap, title: "Pix", desc: "PSP direto com o Banco Central. QR dinâmico, Pix Saque e Troco.", tag: "Mais usado", tagColor: "text-emerald-400 bg-emerald-500/10" },
            { icon: Globe, title: "Open Finance", desc: "Compartilhamento de dados e iniciação de pagamentos. Fase 1–4.", tag: "Novo", tagColor: "text-violet-400 bg-violet-500/10" },
            { icon: Shield, title: "KYC & Compliance", desc: "CPF/CNPJ, PEP screening, análise de risco e relatórios BACEN." },
            { icon: Lock, title: "Tokenização", desc: "Cartões tokenizados, cofre PCI DSS Level 1, gestão de chaves." },
            { icon: Activity, title: "Monitoramento", desc: "Dashboards real-time, alertas, webhooks e audit logs imutáveis." },
          ].map((m) => (
            <div
              key={m.title}
              className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all hover:border-white/[0.1] hover:bg-white/[0.03]"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04]">
                  <m.icon className="h-4 w-4 text-indigo-400" />
                </div>
                {m.tag && (
                  <span className={`rounded-md px-2 py-0.5 text-[10px] font-medium ${m.tagColor}`}>
                    {m.tag}
                  </span>
                )}
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">{m.title}</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Live App Preview (light components inside dark frame) ─── */
function AppPreview() {
  return (
    <section className="py-24 border-t border-white/[0.04]">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">Developer Experience</p>
            <h2 className="text-2xl font-bold text-white mb-3">
              Seus componentes, sua fintech
            </h2>
            <p className="text-sm text-neutral-500 mb-8 max-w-md">
              Use componentes prontos com validação brasileira nativa — CPF, CNPJ, CEP, telefone e moeda.
              Cada input já valida, mascara e formata.
            </p>

            <div className="space-y-4">
              {[
                { icon: Terminal, title: "Validação nativa", desc: "CPF com mod11, CNPJ com dígitos verificadores, CEP com busca ViaCEP automática." },
                { icon: Cpu, title: "Máscara automática", desc: "O usuário digita números, o componente formata: 123.456.789-09, (11) 99999-9999, R$ 1.234,56." },
                { icon: Eye, title: "Sandbox realista", desc: "Dados sintéticos válidos para testar fluxos completos de onboarding e KYC." },
                { icon: Network, title: "Webhooks tipados", desc: "Cada evento com schema TypeScript. Retry automático com backoff exponencial." },
              ].map((item) => (
                <div key={item.title} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">
                    <item.icon className="h-3.5 w-3.5 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-neutral-200">{item.title}</h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Light app preview inside dark frame */}
          <div className="rounded-xl border border-white/[0.06] bg-[#0a0a12] overflow-hidden">
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
              <div className="flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                <div className="h-2 w-2 rounded-full bg-[#febc2e]" />
                <div className="h-2 w-2 rounded-full bg-[#28c840]" />
              </div>
              <span className="ml-2 font-mono text-[10px] text-neutral-600">app.suafintech.com.br/onboarding</span>
            </div>
            {/* White interior — components render naturally */}
            <div className="bg-white p-6">
              <div className="mb-5">
                <h3 className="text-base font-semibold text-neutral-900">Abra sua conta</h3>
                <p className="text-xs text-neutral-500 mt-0.5">Preencha seus dados para continuar</p>
              </div>

              <Tabs defaultValue="pessoal">
                <TabList>
                  <TabTrigger value="pessoal">Dados pessoais</TabTrigger>
                  <TabTrigger value="endereco">Endereço</TabTrigger>
                  <TabTrigger value="pagamento">Pagamento</TabTrigger>
                </TabList>
                <TabContent value="pessoal">
                  <div className="space-y-3 pt-4">
                    <Input label="Nome completo" placeholder="Maria da Silva Santos" />
                    <CPFInput label="CPF" />
                    <PhoneBR label="Celular" />
                    <div className="flex items-center gap-2 pt-1">
                      <Switch defaultChecked />
                      <span className="text-xs text-neutral-500">Aceito os termos de uso</span>
                    </div>
                    <Button variant="primary" size="sm" className="w-full mt-2">
                      Próximo passo
                      <ChevronRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </div>
                </TabContent>
                <TabContent value="endereco">
                  <div className="space-y-3 pt-4">
                    <CEPInput label="CEP" />
                    <Input label="Rua" placeholder="Av. Paulista" />
                    <div className="grid grid-cols-3 gap-2">
                      <Input label="Número" placeholder="1234" />
                      <div className="col-span-2">
                        <Input label="Complemento" placeholder="Apto 42" />
                      </div>
                    </div>
                    <StateSelect label="Estado" />
                    <Button variant="primary" size="sm" className="w-full mt-2">
                      Próximo passo
                      <ChevronRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </div>
                </TabContent>
                <TabContent value="pagamento">
                  <div className="space-y-3 pt-4">
                    <Alert variant="info" title="Escolha como receber">
                      Configure Pix ou conta bancária para recebimentos.
                    </Alert>
                    <CurrencyBRL label="Renda mensal" />
                    <Select
                      label="Tipo de chave Pix"
                      options={[
                        { value: "cpf", label: "CPF" },
                        { value: "phone", label: "Celular" },
                        { value: "email", label: "E-mail" },
                        { value: "random", label: "Chave aleatória" },
                      ]}
                    />
                    <Button variant="primary" size="sm" className="w-full mt-2">
                      Criar conta
                      <Check className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </div>
                </TabContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── API Code ─── */
function APISection() {
  return (
    <section className="py-24 border-t border-white/[0.04]">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">API</p>
        <h2 className="text-2xl font-bold text-white mb-3">3 linhas para um Pix</h2>
        <p className="text-sm text-neutral-500 mb-10 max-w-md">
          SDK tipado em TypeScript. Cada endpoint, webhook e erro com autocomplete.
        </p>

        <div className="grid gap-5 lg:grid-cols-2">
          {/* Request */}
          <div className="rounded-xl border border-white/[0.06] bg-[#0a0a12] overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
              <span className="font-mono text-[11px] text-neutral-600">pix-transfer.ts</span>
              <span className="text-[10px] text-indigo-400 font-medium">Request</span>
            </div>
            <div className="p-5 font-mono text-[12px] leading-[1.8]">
              <div><span className="text-violet-400">import</span><span className="text-neutral-300">{" { Orion } "}</span><span className="text-violet-400">from</span><span className="text-amber-300">{' "@orion/core"'}</span></div>
              <div className="text-neutral-800">&nbsp;</div>
              <div><span className="text-violet-400">const</span><span className="text-blue-300"> pix </span><span className="text-neutral-600">= </span><span className="text-violet-400">await</span><span className="text-neutral-300"> orion</span><span className="text-neutral-600">.</span><span className="text-blue-300">pix</span><span className="text-neutral-600">.</span><span className="text-yellow-200">transfer</span><span className="text-neutral-600">{"({"}</span></div>
              <div className="pl-4"><span className="text-neutral-400">amount</span><span className="text-neutral-600">: </span><span className="text-amber-300">14990</span><span className="text-neutral-600">,</span></div>
              <div className="pl-4"><span className="text-neutral-400">pixKey</span><span className="text-neutral-600">: </span><span className="text-amber-300">{'"12345678909"'}</span><span className="text-neutral-600">,</span></div>
              <div className="pl-4"><span className="text-neutral-400">description</span><span className="text-neutral-600">: </span><span className="text-amber-300">{'"Fatura #4521"'}</span></div>
              <div><span className="text-neutral-600">{"})"}</span></div>
            </div>
          </div>

          {/* Response */}
          <div className="rounded-xl border border-white/[0.06] bg-[#0a0a12] overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
              <span className="font-mono text-[11px] text-neutral-600">response</span>
              <span className="text-[10px] text-emerald-400 font-medium">200 OK · 1.2s</span>
            </div>
            <div className="p-5 font-mono text-[12px] leading-[1.8]">
              <div><span className="text-neutral-600">{"{"}</span></div>
              <div className="pl-4"><span className="text-indigo-300">{'"id"'}</span><span className="text-neutral-600">: </span><span className="text-amber-300">{'"pix_9f8a7b6c5d4e"'}</span><span className="text-neutral-600">,</span></div>
              <div className="pl-4"><span className="text-indigo-300">{'"status"'}</span><span className="text-neutral-600">: </span><span className="text-emerald-400">{'"completed"'}</span><span className="text-neutral-600">,</span></div>
              <div className="pl-4"><span className="text-indigo-300">{'"amount"'}</span><span className="text-neutral-600">: </span><span className="text-amber-300">14990</span><span className="text-neutral-600">,</span></div>
              <div className="pl-4"><span className="text-indigo-300">{'"pixKey"'}</span><span className="text-neutral-600">: </span><span className="text-amber-300">{'"•••.456.789-09"'}</span><span className="text-neutral-600">,</span></div>
              <div className="pl-4"><span className="text-indigo-300">{'"endToEndId"'}</span><span className="text-neutral-600">: </span><span className="text-amber-300">{'"E12345678202509121432"'}</span><span className="text-neutral-600">,</span></div>
              <div className="pl-4"><span className="text-indigo-300">{'"completedAt"'}</span><span className="text-neutral-600">: </span><span className="text-amber-300">{'"2025-09-12T14:32:01Z"'}</span></div>
              <div><span className="text-neutral-600">{"}"}</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Numbers ─── */
function NumbersSection() {
  return (
    <section className="py-16 border-t border-white/[0.04]">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-2 gap-y-8 lg:grid-cols-4">
          {[
            { prefix: "R$ ", value: 127, suffix: "B+", label: "Processados em 2025" },
            { prefix: "< ", value: 800, suffix: "ms", label: "Latência Pix p99" },
            { prefix: "", value: 99, suffix: ".995%", label: "Uptime (SLA)" },
            { prefix: "", value: 40, suffix: "+", label: "Instituições live" },
          ].map((m) => (
            <div key={m.label} className="text-center">
              <p className="text-2xl font-bold text-white tabular-nums">
                <Counter target={m.value} prefix={m.prefix} suffix={m.suffix} duration={1500} />
              </p>
              <p className="mt-1 text-xs text-neutral-600">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
function FAQItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-white/[0.06]">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-neutral-200 transition-colors hover:text-white"
      >
        {q}
        <svg
          className={`h-4 w-4 shrink-0 text-neutral-600 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && (
        <p className="pb-4 text-sm text-neutral-500 leading-relaxed">{a}</p>
      )}
    </div>
  );
}

function FAQSection() {
  return (
    <section className="py-24 border-t border-white/[0.04]">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-xl font-bold text-white mb-8 text-center">Perguntas frequentes</h2>

        <div className="rounded-xl border border-white/[0.06] px-5">
          <FAQItem defaultOpen q="Preciso de licença do Banco Central?" a="Depende do modelo. Sob uma instituição parceira, opera com a licença dela. Para SCD, SEP ou IP própria, precisa de autorização BACEN. Nosso compliance orienta no processo." />
          <FAQItem q="Qual o tempo de integração?" a="Integração básica (contas + Pix) leva 2–4 semanas. Completa com KYC e Open Finance, 6–12 semanas. Sandbox disponível desde o dia 1." />
          <FAQItem q="Vocês são PSP direto do Pix?" a="Sim. Participante direto do SPI e do DICT, conectado diretamente ao Banco Central. Menor latência e maior confiabilidade." />
          <FAQItem q="Suportam on-premise?" a="No Enterprise. Deploy em cloud privada ou data centers próprios com HSM dedicado. Pen testing trimestral e SOC 2 Type II." />
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
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
              Agendar demo <ArrowRight className="h-3.5 w-3.5" />
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

/* ─── Footer ─── */
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
        <p className="text-[11px] text-neutral-700">
          Exemplo fictício — <a href="/" className="text-indigo-500 hover:underline">brasa.ui</a>
        </p>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function OrionShowcase() {
  return (
    <div className="min-h-screen bg-[#08080c]">
      <Nav />
      <main>
        <Hero />
        <Dashboard />
        <ModulesSection />
        <AppPreview />
        <APISection />
        <NumbersSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
