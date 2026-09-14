"use client";

import { useState, useEffect, useRef } from "react";
import {
  Button,
  Input,
  Select,
  Badge,
  Alert,
  PhoneBR,
  Textarea,
} from "../../../../../packages/ui/src";
import {
  ArrowRight,
  Scale,
  Building2,
  Shield,
  Users,
  FileText,
  Briefcase,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Star,
  Clock,
  Award,
  Quote,
} from "lucide-react";

const UNSPLASH = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

const IMAGES = {
  hero: UNSPLASH("photo-1589829545856-d10d557cf95f", 1400),
  office: UNSPLASH("photo-1571055931484-22dce9d6c510", 1200),
  team1: UNSPLASH("photo-1560250097-0b93528c311a", 400),
  team2: UNSPLASH("photo-1573496359142-b8d87734a5a2", 400),
  team3: UNSPLASH("photo-1519085360753-af0119f7cbe7", 400),
  team4: UNSPLASH("photo-1580489944761-15a19d654956", 400),
};

/* ─── Animated counter ─── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - t0) / 1800, 1);
          setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref} className="tabular-nums">{value.toLocaleString("pt-BR")}{suffix}</span>;
}

/* ─── Nav ─── */
function Nav() {
  return (
    <header className="fixed top-0 z-50 w-full bg-[#0c1425]/90 backdrop-blur-xl border-b border-white/[0.06]">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="/showcase/monteiro-cavalcanti" className="flex items-center gap-2.5">
          <Scale className="h-5 w-5 text-amber-500" />
          <div className="leading-none">
            <span className="text-[15px] font-semibold text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Monteiro & Cavalcanti
            </span>
          </div>
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {["Áreas", "Equipe", "Sobre", "Contato"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-[13px] text-neutral-400 transition-colors hover:text-white">{l}</a>
          ))}
          <Button size="sm" className="bg-amber-600 text-white hover:bg-amber-500 border-0 text-xs h-8 px-4 rounded-lg">
            Agendar consulta
          </Button>
        </div>
      </nav>
    </header>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Escritório moderno"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1425] via-[#0c1425]/70 to-[#0c1425]/30" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-40 w-full">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1">
            <Award className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-xs text-amber-400 font-medium">Reconhecidos pela Chambers & Partners desde 2018</span>
          </div>

          <h1
            className="text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-[56px]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Soluções jurídicas que impulsionam negócios
          </h1>

          <p className="mt-5 text-base leading-relaxed text-neutral-300 max-w-lg">
            Há mais de 25 anos assessorando empresas em operações estratégicas,
            contencioso e compliance. Presença em São Paulo, Rio de Janeiro e Brasília.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <Button size="sm" className="bg-amber-600 text-white hover:bg-amber-500 border-0 rounded-lg gap-2 h-10 px-5 text-sm">
              Fale com um especialista <ArrowRight className="h-4 w-4" />
            </Button>
            <a href="#areas" className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-1">
              Nossas áreas <ChevronRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Trust bar */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-2xl">
          {[
            { value: 25, suffix: "+", label: "Anos de atuação" },
            { value: 3200, suffix: "+", label: "Casos atendidos" },
            { value: 98, suffix: "%", label: "Satisfação dos clientes" },
            { value: 3, suffix: " escritórios", label: "SP, RJ e Brasília" },
          ].map((m) => (
            <div key={m.label} className="border-l border-amber-500/30 pl-4">
              <p className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                <Counter target={m.value} suffix={m.suffix} />
              </p>
              <p className="text-[11px] text-neutral-500 mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Áreas de Atuação ─── */
function AreasSection() {
  const areas = [
    { icon: Building2, title: "Direito Societário", desc: "M&A, joint ventures, reestruturações, governança corporativa e due diligence para operações nacionais e cross-border.", tag: "Destaque" },
    { icon: Scale, title: "Contencioso Cível", desc: "Litígios complexos, arbitragem e mediação. Atuação estratégica em disputas societárias, contratuais e de responsabilidade civil." },
    { icon: FileText, title: "Direito Tributário", desc: "Planejamento fiscal, contencioso administrativo e judicial, consultoria em operações e reorganizações societárias." },
    { icon: Users, title: "Direito Trabalhista", desc: "Contencioso trabalhista em massa, consultoria preventiva, negociações sindicais e compliance trabalhista." },
    { icon: Shield, title: "Compliance & LGPD", desc: "Programas de integridade, investigações internas, proteção de dados e adequação à LGPD." },
    { icon: Briefcase, title: "Direito Imobiliário", desc: "Operações imobiliárias, built-to-suit, sale and leaseback, incorporações e regularizações fundiárias." },
  ];

  return (
    <section id="áreas" className="py-24 bg-[#0c1425]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-2">Áreas de atuação</p>
            <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Expertise multidisciplinar
            </h2>
          </div>
          <a href="#contato" className="hidden sm:flex items-center gap-1 text-sm text-amber-500 hover:text-amber-400 transition-colors">
            Consulte nosso time <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((a) => (
            <div
              key={a.title}
              className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all hover:border-amber-500/20 hover:bg-white/[0.04]"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                  <a.icon className="h-5 w-5 text-amber-500" />
                </div>
                {a.tag && (
                  <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-400">
                    {a.tag}
                  </span>
                )}
              </div>
              <h3 className="text-base font-semibold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{a.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── About / Office image ─── */
function AboutSection() {
  return (
    <section id="sobre" className="relative">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[400px] lg:min-h-[500px]">
          <img
            src={IMAGES.office}
            alt="Interior do escritório"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0c1425] hidden lg:block" />
        </div>
        <div className="bg-[#0c1425] flex items-center px-6 py-16 lg:px-14">
          <div className="max-w-md">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3">Sobre o escritório</p>
            <h2 className="text-2xl font-bold text-white mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
              Tradição com visão de futuro
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed mb-4">
              Fundado em 2001 por Ana Monteiro e Rafael Cavalcanti, o escritório nasceu
              da convicção de que advocacia empresarial de excelência exige entender
              profundamente o negócio do cliente — não apenas a lei.
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed mb-6">
              Hoje somos mais de 80 profissionais distribuídos em três escritórios,
              atendendo empresas dos setores de tecnologia, energia, saúde, agronegócio
              e serviços financeiros.
            </p>
            <div className="flex gap-6">
              {[
                { n: "80+", l: "Profissionais" },
                { n: "3", l: "Escritórios" },
                { n: "15+", l: "Setores atendidos" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="text-lg font-bold text-amber-500" style={{ fontFamily: "'Playfair Display', serif" }}>{s.n}</p>
                  <p className="text-[11px] text-neutral-600">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Team ─── */
function TeamSection() {
  const team = [
    { name: "Ana Monteiro", role: "Sócia-fundadora", area: "Societário & M&A", img: IMAGES.team2 },
    { name: "Rafael Cavalcanti", role: "Sócio-fundador", area: "Contencioso Cível", img: IMAGES.team3 },
    { name: "Juliana Ribeiro", role: "Sócia", area: "Tributário", img: IMAGES.team4 },
    { name: "Marcos Oliveira", role: "Sócio", area: "Trabalhista & Compliance", img: IMAGES.team1 },
  ];

  return (
    <section id="equipe" className="py-24 bg-[#0c1425]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-2">Equipe</p>
          <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Sócios
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((t) => (
            <div key={t.name} className="group">
              <div className="relative rounded-xl overflow-hidden mb-4 aspect-[3/4]">
                <img
                  src={t.img}
                  alt={t.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1425]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{t.name}</p>
                  <p className="text-[11px] text-amber-400">{t.role}</p>
                </div>
              </div>
              <p className="text-xs text-neutral-500">{t.area}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
function TestimonialsSection() {
  const testimonials = [
    {
      text: "A equipe do Monteiro & Cavalcanti foi fundamental na estruturação da nossa operação de M&A. Profissionalismo e agilidade que raramente vi em 20 anos de mercado.",
      name: "Carlos Eduardo Pinto",
      role: "CEO, TechBridge Capital",
      stars: 5,
    },
    {
      text: "Confiamos no escritório para todo o nosso contencioso trabalhista. Reduziram nosso passivo em 40% nos primeiros dois anos de parceria.",
      name: "Mariana Santos",
      role: "Diretora Jurídica, Grupo Vitae",
      stars: 5,
    },
    {
      text: "A consultoria em LGPD e compliance transformou a nossa governança de dados. Processo claro, entregas no prazo e equipe sempre disponível.",
      name: "Fernando Nakamura",
      role: "CTO, DataFlow Systems",
      stars: 5,
    },
  ];

  return (
    <section className="py-24 bg-[#0e1830]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-2">Depoimentos</p>
          <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            O que nossos clientes dizem
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
              <Quote className="h-8 w-8 text-amber-500/20 mb-4" />
              <p className="text-sm text-neutral-300 leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-sm font-semibold text-white">{t.name}</p>
              <p className="text-xs text-neutral-500">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact Form (brasa.ui components in light container) ─── */
function ContactSection() {
  return (
    <section id="contato" className="py-24 bg-[#0c1425]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3">Contato</p>
            <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Agende uma consulta
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed mb-8 max-w-md">
              Preencha o formulário ao lado ou entre em contato diretamente.
              Respondemos em até 24 horas úteis.
            </p>

            <div className="space-y-5">
              {[
                { icon: Phone, label: "(11) 3456-7890", sub: "Seg a Sex, 9h às 18h" },
                { icon: Mail, label: "contato@monteirocavalcanti.adv.br", sub: "Respondemos em até 24h" },
                { icon: MapPin, label: "Av. Faria Lima, 3900 — 12º andar", sub: "São Paulo, SP" },
                { icon: Clock, label: "Horário de atendimento", sub: "Segunda a sexta, 9h às 18h" },
              ].map((c) => (
                <div key={c.label} className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                    <c.icon className="h-4 w-4 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-200">{c.label}</p>
                    <p className="text-xs text-neutral-600">{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form in white container */}
          <div className="rounded-xl border border-white/[0.06] bg-[#0a0f1e] overflow-hidden">
            <div className="border-b border-white/[0.06] px-6 py-4">
              <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Formulário de contato
              </h3>
              <p className="text-[11px] text-neutral-600 mt-0.5">Preencha seus dados para agendarmos</p>
            </div>
            <div className="bg-white p-6">
              <div className="space-y-3">
                <Input label="Nome completo" placeholder="Maria da Silva Santos" />
                <Input label="E-mail corporativo" placeholder="maria@empresa.com.br" type="email" />
                <PhoneBR label="Telefone" />
                <Input label="Empresa" placeholder="Nome da sua empresa" />
                <Select
                  label="Área de interesse"
                  options={[
                    { value: "societario", label: "Direito Societário & M&A" },
                    { value: "contencioso", label: "Contencioso Cível" },
                    { value: "tributario", label: "Direito Tributário" },
                    { value: "trabalhista", label: "Direito Trabalhista" },
                    { value: "compliance", label: "Compliance & LGPD" },
                    { value: "imobiliario", label: "Direito Imobiliário" },
                    { value: "outro", label: "Outra área" },
                  ]}
                />
                <Textarea label="Descreva brevemente sua necessidade" placeholder="Ex: Precisamos de assessoria para uma operação de M&A..." />
                <Alert variant="info" title="Sigilo garantido">
                  Todas as informações são tratadas com confidencialidade absoluta.
                </Alert>
                <Button variant="primary" size="sm" className="w-full mt-2 bg-amber-600 hover:bg-amber-500 border-0">
                  Enviar mensagem <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
            </div>
          </div>
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
        <svg className={`h-4 w-4 shrink-0 text-neutral-600 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && <p className="pb-4 text-sm text-neutral-500 leading-relaxed">{a}</p>}
    </div>
  );
}

function FAQSection() {
  return (
    <section className="py-24 bg-[#0e1830]">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-2xl font-bold text-white mb-8 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
          Perguntas frequentes
        </h2>
        <div className="rounded-xl border border-white/[0.06] px-5">
          <FAQItem defaultOpen q="Como funciona a primeira consulta?" a="A primeira reunião é gratuita e dura cerca de 30 minutos. Nela, entendemos a sua situação, avaliamos a viabilidade jurídica e apresentamos os próximos passos. Pode ser presencial ou por videoconferência." />
          <FAQItem q="Qual o valor dos honorários?" a="Trabalhamos com diferentes modelos: honorários fixos por projeto, mensalidade para assessoria contínua, ou honorários por êxito em casos de contencioso. Os valores são apresentados de forma transparente após a avaliação inicial." />
          <FAQItem q="Vocês atendem empresas de qual porte?" a="Atendemos desde startups early-stage até empresas listadas na B3. Nossa estrutura permite escalar o atendimento conforme a complexidade da operação do cliente." />
          <FAQItem q="É possível atendimento 100% remoto?" a="Sim. Temos estrutura completa para reuniões virtuais, assinatura digital de documentos e gestão remota de processos. Muitos de nossos clientes estão fora de São Paulo." />
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="border-t border-white/[0.04] bg-[#0c1425] py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scale className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Monteiro & Cavalcanti
              </span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Advocacia empresarial com excelência e compromisso desde 2001.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">Áreas</p>
            <div className="space-y-2 text-xs text-neutral-600">
              <p>Direito Societário</p>
              <p>Contencioso Cível</p>
              <p>Direito Tributário</p>
              <p>Compliance & LGPD</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">Escritórios</p>
            <div className="space-y-2 text-xs text-neutral-600">
              <p>São Paulo — Faria Lima</p>
              <p>Rio de Janeiro — Centro</p>
              <p>Brasília — Asa Norte</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">Contato</p>
            <div className="space-y-2 text-xs text-neutral-600">
              <p>(11) 3456-7890</p>
              <p>contato@monteirocavalcanti.adv.br</p>
              <p>Seg a Sex, 9h às 18h</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-white/[0.04] pt-6">
          <p className="text-[11px] text-neutral-700">
            Exemplo fictício — <a href="/" className="text-amber-600 hover:underline">brasa.ui</a>
          </p>
          <p className="text-[11px] text-neutral-700">OAB/SP 12.345</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function MonteiroCavalcantiShowcase() {
  return (
    <div className="min-h-screen bg-[#0c1425]">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap"
      />
      <Nav />
      <main>
        <Hero />
        <AreasSection />
        <AboutSection />
        <TeamSection />
        <TestimonialsSection />
        <ContactSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
