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
  Avatar,
  Separator,
  Tooltip,
  Switch,
  CPFInput,
  CEPInput,
  PhoneBR,
  CurrencyBRL,
  StateSelect,
  PixPayment,
  InstallmentSelect,
} from "../../../../../packages/ui/src";
import {
  ArrowRight,
  TrendingUp,
  Shield,
  Zap,
  CreditCard,
  Smartphone,
  Building2,
  ChevronRight,
  Star,
  Users,
  BarChart3,
  Wallet,
  QrCode,
  Receipt,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-white pt-20 pb-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/3 h-80 w-80 rounded-full bg-emerald-100/60 blur-[100px]" />
        <div className="absolute top-10 right-1/4 h-64 w-64 rounded-full bg-amber-100/40 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
              <Zap className="h-3.5 w-3.5" />
              Conta digital 100% gratuita
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-neutral-950 sm:text-5xl lg:text-[56px] lg:leading-[1.1]">
              Sua vida financeira,{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                simplificada.
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-lg leading-relaxed text-neutral-500">
              Conta digital com Pix gratuito e ilimitado, cartão sem anuidade e rendimento de 100% do CDI. Abra sua conta em 3 minutos.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="primary" size="lg" className="gap-2">
                Abrir minha conta
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Conhecer benefícios
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-2">
                <Avatar fallback="Ana S" size="sm" className="ring-2 ring-white" />
                <Avatar fallback="Pedro M" size="sm" className="ring-2 ring-white" />
                <Avatar fallback="Julia R" size="sm" className="ring-2 ring-white" />
                <Avatar fallback="Lucas F" size="sm" className="ring-2 ring-white" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-xs text-neutral-500 mt-0.5">+2 milhões de clientes satisfeitos</p>
              </div>
            </div>
          </div>

          {/* Hero Card - Mini Dashboard */}
          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-emerald-200/40 via-transparent to-amber-200/30 blur-xl" />
            <Card className="relative overflow-hidden rounded-2xl border-neutral-200/80 shadow-2xl shadow-neutral-200/50">
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-emerald-100">Saldo disponível</p>
                    <p className="text-2xl font-bold text-white mt-0.5">R$ 12.847,90</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    <Wallet className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <button className="flex flex-col items-center gap-1.5 rounded-xl bg-neutral-50 p-3 transition-colors hover:bg-neutral-100">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                      <QrCode className="h-4 w-4" />
                    </div>
                    <span className="text-[11px] font-medium text-neutral-600">Pix</span>
                  </button>
                  <button className="flex flex-col items-center gap-1.5 rounded-xl bg-neutral-50 p-3 transition-colors hover:bg-neutral-100">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                      <Receipt className="h-4 w-4" />
                    </div>
                    <span className="text-[11px] font-medium text-neutral-600">Boleto</span>
                  </button>
                  <button className="flex flex-col items-center gap-1.5 rounded-xl bg-neutral-50 p-3 transition-colors hover:bg-neutral-100">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                      <CreditCard className="h-4 w-4" />
                    </div>
                    <span className="text-[11px] font-medium text-neutral-600">Cartão</span>
                  </button>
                </div>

                <Separator />

                <div>
                  <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-3">Últimas transações</p>
                  <div className="space-y-3">
                    {[
                      { name: "Supermercado Pão de Açúcar", value: -234.56, type: "Débito", time: "Hoje, 14:32" },
                      { name: "Pix recebido — João Silva", value: 1500.00, type: "Pix", time: "Hoje, 11:20" },
                      { name: "Netflix", value: -55.90, type: "Cartão", time: "Ontem" },
                    ].map((tx, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${tx.value > 0 ? "bg-emerald-50 text-emerald-600" : "bg-neutral-50 text-neutral-400"}`}>
                            {tx.value > 0 ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-neutral-900 truncate max-w-[180px]">{tx.name}</p>
                            <p className="text-[11px] text-neutral-400">{tx.type} · {tx.time}</p>
                          </div>
                        </div>
                        <span className={`text-sm font-semibold tabular-nums ${tx.value > 0 ? "text-emerald-600" : "text-neutral-900"}`}>
                          {tx.value > 0 ? "+" : ""}{formatBRL(tx.value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricsSection() {
  const metrics = [
    { icon: Users, label: "Clientes ativos", value: "2.1M+", sub: "+34% este ano", color: "emerald" },
    { icon: Zap, label: "Transações Pix/mês", value: "48M+", sub: "Instantâneo e gratuito", color: "blue" },
    { icon: BarChart3, label: "Sob gestão", value: "R$ 8.2B", sub: "Rendendo 100% CDI", color: "amber" },
    { icon: Shield, label: "Uptime", value: "99.97%", sub: "Infraestrutura robusta", color: "neutral" },
  ];

  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-100 text-emerald-600",
    blue: "bg-blue-100 text-blue-600",
    amber: "bg-amber-100 text-amber-600",
    neutral: "bg-neutral-100 text-neutral-600",
  };

  return (
    <section className="border-y border-neutral-100 bg-neutral-50/50 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <div key={i} className="text-center">
              <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${colorMap[m.color]}`}>
                <m.icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-bold text-neutral-950 lg:text-3xl">{m.value}</p>
              <p className="mt-1 text-sm font-medium text-neutral-600">{m.label}</p>
              <p className="text-xs text-neutral-400">{m.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-14">
          <Badge variant="info" className="mb-4">Funcionalidades</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
            Tudo que você precisa em um só lugar
          </h2>
          <p className="mt-3 text-lg text-neutral-500 max-w-2xl mx-auto">
            Conta, cartão, investimentos e seguros — sem burocracia, sem anuidade, sem pegadinha.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: QrCode,
              title: "Pix gratuito e ilimitado",
              desc: "Envie e receba dinheiro 24/7 sem nenhuma taxa. Pix por QR code, chave ou copia e cola.",
              badge: "Mais usado",
              color: "emerald",
            },
            {
              icon: CreditCard,
              title: "Cartão sem anuidade",
              desc: "Cartão de crédito e débito sem custo. Parcele em até 12x e acumule cashback.",
              badge: "Grátis",
              color: "blue",
            },
            {
              icon: TrendingUp,
              title: "Rendimento 100% CDI",
              desc: "Seu dinheiro rende automaticamente desde o primeiro dia. Sem carência.",
              badge: "Automático",
              color: "amber",
            },
            {
              icon: Receipt,
              title: "Pagamento de boletos",
              desc: "Pague boletos por câmera ou código de barras. Agende pagamentos futuros.",
              color: "neutral",
            },
            {
              icon: Smartphone,
              title: "App completo",
              desc: "Gerencie tudo pelo celular. Notificações em tempo real para cada transação.",
              color: "neutral",
            },
            {
              icon: Shield,
              title: "Segurança total",
              desc: "Biometria, token, limites personalizáveis e bloqueio instantâneo pelo app.",
              color: "neutral",
            },
          ].map((f, i) => {
            const colorMap: Record<string, string> = {
              emerald: "bg-emerald-100 text-emerald-600",
              blue: "bg-blue-100 text-blue-600",
              amber: "bg-amber-100 text-amber-600",
              neutral: "bg-neutral-100 text-neutral-600",
            };

            return (
              <Card key={i} className="group rounded-2xl border-neutral-200 transition-all hover:border-neutral-300 hover:shadow-lg hover:shadow-neutral-100">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${colorMap[f.color]}`}>
                      <f.icon className="h-5 w-5" />
                    </div>
                    {f.badge && <Badge variant="success">{f.badge}</Badge>}
                  </div>
                  <h3 className="text-base font-semibold text-neutral-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function OpenAccountSection() {
  const [step, setStep] = useState("dados");

  return (
    <section className="py-20 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-start">
          <div>
            <Badge variant="success" className="mb-4">Abertura de conta</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
              Abra sua conta em 3 minutos
            </h2>
            <p className="mt-3 text-lg text-neutral-500">
              Sem burocracia, sem agência, sem papelada. Basta seu CPF e celular.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { step: "1", title: "Preencha seus dados", desc: "CPF, telefone e endereço — tudo validado automaticamente." },
                { step: "2", title: "Confirme sua identidade", desc: "Selfie rápida com seu documento. Levamos a sério sua segurança." },
                { step: "3", title: "Pronto! Conta aberta", desc: "Seu cartão virtual é gerado na hora. O físico chega em 5 dias úteis." },
              ].map((s, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                    {s.step}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900">{s.title}</h4>
                    <p className="text-sm text-neutral-500">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="rounded-2xl shadow-xl shadow-neutral-200/50">
            <CardHeader className="border-b border-neutral-100 px-6 py-4">
              <h3 className="text-base font-semibold text-neutral-900">Abra sua conta grátis</h3>
              <p className="text-xs text-neutral-400 mt-0.5">Todos os campos são obrigatórios</p>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="dados">
                <TabList className="mb-6">
                  <TabTrigger value="dados">Dados pessoais</TabTrigger>
                  <TabTrigger value="endereco">Endereço</TabTrigger>
                </TabList>

                <TabContent value="dados">
                  <div className="space-y-4">
                    <Input label="Nome completo" placeholder="Maria da Silva Santos" />
                    <CPFInput label="CPF" />
                    <PhoneBR label="Celular" />
                    <Input label="E-mail" placeholder="maria@email.com" type="email" />
                    <div className="flex items-start gap-2 mt-2">
                      <Switch defaultChecked />
                      <p className="text-xs text-neutral-500 mt-1">
                        Li e aceito os <a href="#" className="text-emerald-600 underline">termos de uso</a> e a <a href="#" className="text-emerald-600 underline">política de privacidade</a>.
                      </p>
                    </div>
                  </div>
                </TabContent>

                <TabContent value="endereco">
                  <div className="space-y-4">
                    <CEPInput label="CEP" />
                    <Input label="Rua" placeholder="Av. Paulista" />
                    <div className="grid grid-cols-3 gap-3">
                      <Input label="Número" placeholder="1234" />
                      <div className="col-span-2">
                        <Input label="Complemento" placeholder="Apto 42" />
                      </div>
                    </div>
                    <Input label="Bairro" placeholder="Bela Vista" />
                    <div className="grid grid-cols-2 gap-3">
                      <Input label="Cidade" placeholder="São Paulo" />
                      <StateSelect label="Estado" />
                    </div>
                  </div>
                </TabContent>
              </Tabs>
            </CardContent>
            <CardFooter className="border-t border-neutral-100 px-6 py-4">
              <Button variant="primary" size="lg" className="w-full gap-2">
                Criar minha conta grátis
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}

function PaymentShowcase() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-14">
          <Badge className="mb-4">Pagamentos</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
            Pague como preferir
          </h2>
          <p className="mt-3 text-lg text-neutral-500 max-w-2xl mx-auto">
            Pix instantâneo, cartão em até 12x ou boleto. Todos os métodos que o Brasil usa.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="rounded-2xl shadow-lg">
            <CardHeader className="px-6 pt-6 pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-emerald-600" />
                  <h3 className="text-lg font-semibold text-neutral-900">Pix</h3>
                </div>
                <Badge variant="success">Instantâneo</Badge>
              </div>
              <p className="text-sm text-neutral-500 mt-1">Pagamento em segundos, 24 horas por dia</p>
            </CardHeader>
            <CardContent className="p-6">
              <PixPayment
                amount={14990}
                pixCode="00020126580014br.gov.bcb.pix0136pagafacil-demo"
                status="qr_generated"
              />
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-lg">
            <CardHeader className="px-6 pt-6 pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-neutral-900">Parcelamento</h3>
                </div>
                <Badge variant="info">Até 12x</Badge>
              </div>
              <p className="text-sm text-neutral-500 mt-1">Parcele no cartão com ou sem juros</p>
            </CardHeader>
            <CardContent className="p-6">
              <InstallmentSelect
                amount={14990}
                maxInstallments={12}
                freeInstallments={3}
                interestRate={1.99}
                onChange={() => {}}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-950">Perguntas frequentes</h2>
          <p className="mt-3 text-neutral-500">Tudo que você precisa saber sobre a PagaFácil.</p>
        </div>

        <Accordion type="single" defaultOpen={["q1"]}>
          <AccordionItem value="q1">
            <AccordionTrigger value="q1">A conta é realmente gratuita?</AccordionTrigger>
            <AccordionContent value="q1">
              <p className="text-sm text-neutral-600 leading-relaxed">
                Sim! A conta PagaFácil é 100% gratuita, sem nenhuma taxa de manutenção. Pix ilimitado e gratuito, cartão de débito sem custo, e seu dinheiro rende 100% do CDI automaticamente.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger value="q2">Preciso ir a uma agência para abrir conta?</AccordionTrigger>
            <AccordionContent value="q2">
              <p className="text-sm text-neutral-600 leading-relaxed">
                Não! Todo o processo é digital e leva apenas 3 minutos. Basta ter seu CPF, celular e tirar uma selfie com seu documento. Sua conta é aberta na hora.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger value="q3">O Pix funciona 24 horas?</AccordionTrigger>
            <AccordionContent value="q3">
              <p className="text-sm text-neutral-600 leading-relaxed">
                Sim! O Pix funciona 24 horas por dia, 7 dias por semana, inclusive feriados. As transferências são instantâneas e sem custo para pessoa física.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q4">
            <AccordionTrigger value="q4">Como funciona o rendimento do CDI?</AccordionTrigger>
            <AccordionContent value="q4">
              <p className="text-sm text-neutral-600 leading-relaxed">
                O dinheiro na sua conta rende automaticamente 100% do CDI desde o primeiro dia, sem carência e sem mínimo. Você pode sacar a qualquer momento sem perder o rendimento acumulado.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q5">
            <AccordionTrigger value="q5">É seguro usar a PagaFácil?</AccordionTrigger>
            <AccordionContent value="q5">
              <p className="text-sm text-neutral-600 leading-relaxed">
                Sim! Somos regulados pelo Banco Central do Brasil e seguimos todos os padrões de segurança exigidos. Usamos criptografia de ponta a ponta, biometria e autenticação em dois fatores.
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
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-700 px-8 py-16 shadow-2xl shadow-emerald-200/50">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Pronto para simplificar suas finanças?
          </h2>
          <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
            Junte-se a mais de 2 milhões de brasileiros que já usam PagaFácil no dia a dia.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 gap-2">
              Abrir conta grátis
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              Falar com a gente
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a href="/showcase/pagafacil" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
            <Wallet className="h-4 w-4 text-white" />
          </div>
          <span className="text-base font-bold tracking-tight text-neutral-950">PagaFácil</span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">Conta</a>
          <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">Cartão</a>
          <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">Empresas</a>
          <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">Ajuda</a>
          <Button variant="primary" size="sm">Abrir conta</Button>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600">
              <Wallet className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-bold text-neutral-950">PagaFácil</span>
          </div>

          <Separator className="w-full max-w-xs" />

          <div className="text-center">
            <p className="text-xs text-neutral-400">
              PagaFácil S.A. — CNPJ 12.345.678/0001-00
            </p>
            <p className="text-xs text-neutral-400 mt-1">
              Instituição de pagamento autorizada pelo Banco Central do Brasil
            </p>
            <p className="text-xs text-neutral-300 mt-3">
              Exemplo fictício criado com{" "}
              <a href="/" className="text-emerald-600 hover:underline font-medium">brasa.ui</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function PagaFacilShowcase() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <MetricsSection />
        <FeaturesSection />
        <OpenAccountSection />
        <PaymentShowcase />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
