"use client";

import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Bot,
  Zap,
  Shield,
  BarChart3,
  MessageSquare,
  FileText,
  CreditCard,
  Globe,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Cpu,
  Lock,
  Users,
  TrendingUp,
  Clock,
  Check,
  Star,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─── Palette ─── */
const NEON = "#00FF88";
const NEON_DIM = "#00cc6a";
const BG = "#06060a";
const CARD = "#0d0d12";
const BORDER = "rgba(255,255,255,0.06)";

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

/* ─── Section wrapper with InView trigger ─── */
function Section({ children, className = "", ...props }: React.ComponentProps<typeof motion.section>) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}

/* ─── Animated counter ─── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

/* ─── FAQ Item with AnimatePresence ─── */
function FAQItem({ q, a, defaultOpen = false, index = 0 }: { q: string; a: string; defaultOpen?: boolean; index?: number }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ borderBottom: `1px solid ${BORDER}` }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left text-[15px] font-medium text-neutral-200 transition-colors hover:text-white"
      >
        {q}
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4 shrink-0 text-neutral-600" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-[14px] text-neutral-400 leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Glow dot ─── */
function GlowDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span
        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
        style={{ backgroundColor: NEON }}
      />
      <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: NEON }} />
    </span>
  );
}

/* ─── Chat bubble with staggered entrance ─── */
function ChatBubble({ children, isUser, delay }: { children: React.ReactNode; isUser?: boolean; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={isUser ? "flex justify-end" : "flex items-start gap-2"}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated bar for chart ─── */
function AnimatedBar({ height, index, isHighlighted }: { height: number; index: number; isHighlighted: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  return (
    <motion.div
      ref={ref}
      className="flex-1 rounded-sm"
      initial={{ height: 0 }}
      animate={inView ? { height: `${height}%` } : { height: 0 }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        background: isHighlighted ? NEON : "rgba(0,255,136,0.15)",
      }}
    />
  );
}

export default function NexoIAPage() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="min-h-screen text-white" style={{ background: BG, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      {/* ═══════ NAV ═══════ */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
        style={{ background: "rgba(6,6,10,0.8)", borderBottom: `1px solid ${BORDER}` }}
      >
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: NEON }}>
              <Bot className="w-4.5 h-4.5 text-black" />
            </div>
            <span className="text-[16px] font-bold tracking-tight">
              Nexo<span style={{ color: NEON }}>IA</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[13px] text-neutral-400">
            <a href="#features" className="hover:text-white transition-colors">Como funciona</a>
            <a href="#pricing" className="hover:text-white transition-colors">Planos</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="#" className="text-[13px] text-neutral-400 hover:text-white transition-colors px-3 py-2">
              Login
            </a>
            <a
              href="#"
              className="text-[13px] font-medium px-4 py-2 rounded-lg text-black transition-all hover:opacity-90"
              style={{ background: NEON }}
            >
              Começar grátis
            </a>
          </div>

          <button className="md:hidden text-neutral-400" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* ═══════ HERO ═══════ */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        {/* Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: NEON }}
        />

        <div className="mx-auto max-w-4xl text-center relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-medium mb-8"
            style={{ border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.03)", color: NEON }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Agentes de IA com contexto brasileiro
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-[48px] md:text-[64px] font-extrabold leading-[1.05] tracking-tight mb-6"
            style={{ textWrap: "balance" as any }}
          >
            Automatize sua operação com{" "}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              style={{ color: NEON }}
            >
              inteligência artificial
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-[17px] text-neutral-300 leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Agentes autônomos que entendem NF-e, Pix, compliance tributário e atendimento ao
            cliente brasileiro. Sua equipe foca no estratégico — o NexoIA cuida do resto.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center justify-center gap-4"
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-[14px] font-semibold text-black transition-all"
              style={{ background: NEON }}
            >
              Começar grátis <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="#features"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-[14px] font-medium text-neutral-300 transition-all hover:text-white"
              style={{ border: `1px solid rgba(255,255,255,0.1)`, background: "rgba(255,255,255,0.03)" }}
            >
              Como funciona
            </motion.a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex items-center justify-center gap-10 mt-16"
          >
            {[
              { value: 2500, suffix: "+", label: "Empresas ativas" },
              { value: 14, suffix: "M", label: "Tarefas automatizadas" },
              { value: 99, suffix: ".9%", label: "Uptime garantido" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + i * 0.15 }}
                className="text-center"
              >
                <p className="text-[28px] font-extrabold tracking-tight" style={{ color: NEON }}>
                  <Counter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-[12px] text-neutral-400 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ LOGOS ═══════ */}
      <Section
        className="py-16 px-6"
        style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}
      >
        <div className="mx-auto max-w-5xl">
          <motion.p
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="text-[12px] text-neutral-400 text-center uppercase tracking-[0.2em] mb-10"
          >
            Empresas que confiam no NexoIA
          </motion.p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
            {["Nubank", "iFood", "TOTVS", "Stone", "Vtex", "RD Station", "Conta Azul", "Nuvemshop"].map((name, i) => (
              <motion.span
                key={name}
                variants={fadeUp}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="text-[18px] font-bold tracking-tight text-white"
              >
                {name}
              </motion.span>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════ FEATURES BENTO ═══════ */}
      <Section id="features" className="py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-[12px] font-semibold uppercase tracking-[0.2em] mb-3"
              style={{ color: NEON }}
            >
              Funcionalidades
            </motion.p>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[36px] md:text-[44px] font-extrabold tracking-tight mb-4"
            >
              Tudo que sua operação precisa
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[16px] text-neutral-300 max-w-2xl mx-auto"
            >
              Agentes especializados que trabalham 24/7 para sua empresa — com o contexto que só
              quem entende o Brasil pode oferecer.
            </motion.p>
          </div>

          {/* Bento grid */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Big card — Chat mockup */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="md:col-span-2 p-8 rounded-2xl relative overflow-hidden group"
              style={{ background: CARD, border: `1px solid ${BORDER}` }}
            >
              <div className="relative z-10">
                <motion.div
                  variants={scaleUp}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "rgba(0,255,136,0.1)" }}
                >
                  <MessageSquare className="w-5 h-5" style={{ color: NEON }} />
                </motion.div>
                <motion.h3
                  variants={fadeUp}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="text-[20px] font-bold mb-2"
                >
                  Atendimento Inteligente
                </motion.h3>
                <motion.p
                  variants={fadeUp}
                  transition={{ duration: 0.4, delay: 0.35 }}
                  className="text-[14px] text-neutral-300 leading-relaxed max-w-md"
                >
                  Agente que entende gírias regionais, variações do português brasileiro e contexto
                  cultural. Atende via WhatsApp, chat e e-mail com personalidade da sua marca.
                </motion.p>
              </div>
              {/* Animated chat messages */}
              <div className="mt-6 space-y-3">
                <ChatBubble isUser delay={0.5}>
                  <div className="px-4 py-2.5 rounded-2xl rounded-br-md text-[13px] max-w-[280px]" style={{ background: "rgba(0,255,136,0.08)", border: `1px solid rgba(0,255,136,0.15)` }}>
                    Oi, preciso da 2ª via do meu boleto de março
                  </div>
                </ChatBubble>
                <ChatBubble delay={1.0}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: NEON }}>
                    <Bot className="w-3.5 h-3.5 text-black" />
                  </div>
                  <div className="px-4 py-2.5 rounded-2xl rounded-bl-md text-[13px] max-w-[320px]" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}` }}>
                    Encontrei! Boleto de R$ 347,90 vencimento 15/03. Quer receber o código Pix para
                    pagamento instantâneo ou prefere o PDF do boleto?
                  </div>
                </ChatBubble>
                <ChatBubble isUser delay={1.5}>
                  <div className="px-4 py-2.5 rounded-2xl rounded-br-md text-[13px] max-w-[280px]" style={{ background: "rgba(0,255,136,0.08)", border: `1px solid rgba(0,255,136,0.15)` }}>
                    Pix, por favor!
                  </div>
                </ChatBubble>
                <ChatBubble delay={2.0}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: NEON }}>
                    <Bot className="w-3.5 h-3.5 text-black" />
                  </div>
                  <div className="px-4 py-2.5 rounded-2xl rounded-bl-md text-[13px] max-w-[320px]" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}` }}>
                    <span>Pronto! Código Pix gerado: </span>
                    <span className="font-mono text-[12px]" style={{ color: NEON }}>00020126...</span>
                    <span> Válido por 30 min</span>
                  </div>
                </ChatBubble>
              </div>
              <div
                className="absolute -right-20 -bottom-20 w-[300px] h-[300px] rounded-full blur-[100px] opacity-5 pointer-events-none"
                style={{ background: NEON }}
              />
            </motion.div>

            {/* Right card — NF-e */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.25 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="p-8 rounded-2xl relative overflow-hidden"
              style={{ background: CARD, border: `1px solid ${BORDER}` }}
            >
              <motion.div
                variants={scaleUp}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(0,255,136,0.1)" }}
              >
                <FileText className="w-5 h-5" style={{ color: NEON }} />
              </motion.div>
              <motion.h3
                variants={fadeUp}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="text-[20px] font-bold mb-2"
              >
                NF-e Automática
              </motion.h3>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.4, delay: 0.45 }}
                className="text-[14px] text-neutral-300 leading-relaxed"
              >
                Emissão, cancelamento e consulta de notas fiscais. Integra com SEFAZ, calcula
                impostos (ICMS, ISS, PIS/COFINS) e envia XML ao contador.
              </motion.p>
              {/* NF-e items stagger in from right */}
              <div className="mt-6 space-y-2">
                {["NF-e #4521 — R$ 12.450,00", "NF-e #4520 — R$ 8.900,00", "NF-e #4519 — R$ 3.200,00"].map(
                  (nf, i) => (
                    <motion.div
                      key={i}
                      variants={slideRight}
                      transition={{ duration: 0.4, delay: 0.55 + i * 0.12 }}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-[12px]"
                      style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}` }}
                    >
                      <span className="text-neutral-300">{nf}</span>
                      <motion.div
                        initial={{ scale: 0 }}
                        variants={{ visible: { scale: 1 } }}
                        transition={{ duration: 0.3, delay: 0.8 + i * 0.12, type: "spring" }}
                      >
                        <Check className="w-3.5 h-3.5" style={{ color: NEON }} />
                      </motion.div>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>

            {/* Bottom left — Pix chart */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.35 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="p-8 rounded-2xl relative overflow-hidden"
              style={{ background: CARD, border: `1px solid ${BORDER}` }}
            >
              <motion.div
                variants={scaleUp}
                transition={{ duration: 0.4, delay: 0.45 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(0,255,136,0.1)" }}
              >
                <CreditCard className="w-5 h-5" style={{ color: NEON }} />
              </motion.div>
              <motion.h3
                variants={fadeUp}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="text-[20px] font-bold mb-2"
              >
                Pix & Cobranças
              </motion.h3>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.4, delay: 0.55 }}
                className="text-[14px] text-neutral-300 leading-relaxed"
              >
                Gera QR codes Pix, envia cobranças por WhatsApp, reconcilia pagamentos e identifica
                inadimplência automaticamente.
              </motion.p>
              {/* Animated chart bars */}
              <div className="mt-6 flex items-end gap-1.5 h-20">
                {[35, 52, 41, 68, 55, 72, 60, 78, 65, 82, 90, 85].map((h, i) => (
                  <AnimatedBar key={i} height={h} index={i} isHighlighted={i >= 10} />
                ))}
              </div>
            </motion.div>

            {/* Bottom right — Compliance */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.45 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="md:col-span-2 p-8 rounded-2xl relative overflow-hidden"
              style={{ background: CARD, border: `1px solid ${BORDER}` }}
            >
              <div className="flex gap-8">
                <div className="flex-1">
                  <motion.div
                    variants={scaleUp}
                    transition={{ duration: 0.4, delay: 0.55 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: "rgba(0,255,136,0.1)" }}
                  >
                    <Shield className="w-5 h-5" style={{ color: NEON }} />
                  </motion.div>
                  <motion.h3
                    variants={fadeUp}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    className="text-[20px] font-bold mb-2"
                  >
                    Compliance & LGPD
                  </motion.h3>
                  <motion.p
                    variants={fadeUp}
                    transition={{ duration: 0.4, delay: 0.65 }}
                    className="text-[14px] text-neutral-300 leading-relaxed"
                  >
                    Monitora conformidade com LGPD, regulamentações setoriais e políticas internas.
                    Alertas em tempo real, relatórios para auditoria e data mapping automático.
                  </motion.p>
                </div>
                <div className="hidden md:flex flex-col gap-2 w-[240px] flex-shrink-0">
                  {[
                    { label: "LGPD", status: "Conforme", ok: true },
                    { label: "SOC 2", status: "Em progresso", ok: false },
                    { label: "ISO 27001", status: "Conforme", ok: true },
                    { label: "PCI DSS", status: "Conforme", ok: true },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      variants={slideRight}
                      transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                      whileHover={{ x: 4, transition: { duration: 0.2 } }}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg text-[12px]"
                      style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}` }}
                    >
                      <div className="flex items-center gap-2">
                        <Lock className="w-3 h-3 text-neutral-400" />
                        <span className="text-neutral-300">{item.label}</span>
                      </div>
                      <motion.span
                        initial={{ opacity: 0 }}
                        variants={{ visible: { opacity: 1 } }}
                        transition={{ duration: 0.3, delay: 0.9 + i * 0.1 }}
                        className="font-medium"
                        style={{ color: item.ok ? NEON : "#f59e0b" }}
                      >
                        {item.status}
                      </motion.span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <Section className="py-24 px-6" style={{ borderTop: `1px solid ${BORDER}` }}>
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-[12px] font-semibold uppercase tracking-[0.2em] mb-3"
              style={{ color: NEON }}
            >
              Como funciona
            </motion.p>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[36px] md:text-[44px] font-extrabold tracking-tight"
            >
              Simples. Rápido. Inteligente.
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: Zap,
                title: "Conecte suas ferramentas",
                description:
                  "Integre com ERP, CRM, WhatsApp Business, SEFAZ e bancos em poucos cliques. Suportamos TOTVS, Bling, Tiny e mais.",
              },
              {
                step: "02",
                icon: Cpu,
                title: "Configure seus agentes",
                description:
                  "Defina regras de negócio, tom de voz e limites de autonomia. Os agentes aprendem com seu histórico e melhoram continuamente.",
              },
              {
                step: "03",
                icon: TrendingUp,
                title: "Escale sua operação",
                description:
                  "Os agentes trabalham 24/7 sem pausas. Monitore tudo pelo dashboard em tempo real e ajuste quando quiser.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.15 }}
                className="relative"
              >
                <motion.span
                  variants={scaleUp}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
                  className="text-[64px] font-black leading-none opacity-[0.04] absolute -top-2 -left-1"
                >
                  {item.step}
                </motion.span>
                <div className="relative z-10">
                  <motion.div
                    variants={scaleUp}
                    transition={{ duration: 0.4, delay: 0.25 + i * 0.15, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: "rgba(0,255,136,0.08)", border: `1px solid rgba(0,255,136,0.12)` }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: NEON }} />
                  </motion.div>
                  <motion.h3
                    variants={fadeUp}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
                    className="text-[18px] font-bold mb-2"
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p
                    variants={fadeUp}
                    transition={{ duration: 0.4, delay: 0.35 + i * 0.15 }}
                    className="text-[14px] text-neutral-300 leading-relaxed"
                  >
                    {item.description}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════ TESTIMONIAL ═══════ */}
      <Section className="py-24 px-6" style={{ borderTop: `1px solid ${BORDER}` }}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center gap-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                variants={scaleUp}
                transition={{ duration: 0.3, delay: i * 0.08, type: "spring", stiffness: 300 }}
              >
                <Star className="w-5 h-5 fill-current" style={{ color: NEON }} />
              </motion.div>
            ))}
          </div>
          <motion.blockquote
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[24px] md:text-[28px] font-semibold leading-snug tracking-tight mb-8"
            style={{ textWrap: "balance" as any }}
          >
            &ldquo;O NexoIA reduziu nosso tempo de resposta ao cliente de 4 horas para 12 segundos.
            A parte de NF-e que tomava um dia inteiro do financeiro agora roda no piloto automático.&rdquo;
          </motion.blockquote>
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center justify-center gap-3"
          >
            <div className="w-11 h-11 rounded-full bg-neutral-800 flex items-center justify-center text-[14px] font-bold" style={{ color: NEON }}>
              RC
            </div>
            <div className="text-left">
              <p className="text-[14px] font-semibold">Rafael Carvalho</p>
              <p className="text-[13px] text-neutral-400">COO, TechBR Soluções</p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ═══════ SECURITY ═══════ */}
      <Section className="py-24 px-6" style={{ borderTop: `1px solid ${BORDER}` }}>
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-[12px] font-semibold uppercase tracking-[0.2em] mb-3"
              style={{ color: NEON }}
            >
              Segurança
            </motion.p>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[36px] md:text-[44px] font-extrabold tracking-tight mb-4"
            >
              Feito para crescer com segurança
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[16px] text-neutral-300 max-w-2xl mx-auto"
            >
              Infraestrutura enterprise-grade com criptografia ponta a ponta, conformidade LGPD e
              servidores no Brasil.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: Lock,
                title: "Criptografia AES-256",
                description: "Dados em trânsito e em repouso protegidos com criptografia de grau militar.",
              },
              {
                icon: Globe,
                title: "Servidores no Brasil",
                description: "Dados armazenados em São Paulo (AWS sa-east-1). Latência mínima e conformidade local.",
              },
              {
                icon: Users,
                title: "RBAC & SSO",
                description: "Controle granular de acesso por função. Integração com Google, Azure AD e Okta.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
                className="p-6 rounded-2xl text-center"
                style={{ background: CARD, border: `1px solid ${BORDER}` }}
              >
                <motion.div
                  variants={scaleUp}
                  transition={{ duration: 0.4, delay: 0.25 + i * 0.12, type: "spring" }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(0,255,136,0.08)" }}
                >
                  <item.icon className="w-5 h-5" style={{ color: NEON }} />
                </motion.div>
                <motion.h3
                  variants={fadeUp}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.12 }}
                  className="text-[16px] font-bold mb-2"
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  variants={fadeUp}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.12 }}
                  className="text-[13px] text-neutral-300 leading-relaxed"
                >
                  {item.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════ PRICING ═══════ */}
      <Section id="pricing" className="py-24 px-6" style={{ borderTop: `1px solid ${BORDER}` }}>
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-[12px] font-semibold uppercase tracking-[0.2em] mb-3"
              style={{ color: NEON }}
            >
              Planos
            </motion.p>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[36px] md:text-[44px] font-extrabold tracking-tight mb-4"
            >
              Comece grátis, escale sem limites
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Starter */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.15 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="p-7 rounded-2xl flex flex-col"
              style={{ background: CARD, border: `1px solid ${BORDER}` }}
            >
              <p className="text-[14px] text-neutral-300 mb-1">Starter</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-[40px] font-extrabold tracking-tight">R$0</span>
                <span className="text-[14px] text-neutral-400">/mês</span>
              </div>
              <p className="text-[13px] text-neutral-400 mb-6">Para testar e validar</p>
              <motion.a
                href="#"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="block text-center py-2.5 rounded-lg text-[13px] font-medium transition-all mb-6"
                style={{ border: `1px solid rgba(255,255,255,0.1)`, color: "white" }}
              >
                Começar grátis
              </motion.a>
              <div className="space-y-3 text-[13px] text-neutral-300">
                {["1 agente ativo", "500 interações/mês", "Integrações básicas", "Dashboard"].map((f, i) => (
                  <motion.div
                    key={f}
                    variants={slideLeft}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.06 }}
                    className="flex items-center gap-2.5"
                  >
                    <Check className="w-4 h-4 flex-shrink-0" style={{ color: NEON }} />
                    {f}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Pro */}
            <motion.div
              variants={scaleUp}
              transition={{ duration: 0.5, delay: 0.25 }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
              className="p-7 rounded-2xl flex flex-col relative"
              style={{ background: CARD, border: `1px solid rgba(0,255,136,0.3)` }}
            >
              <motion.div
                initial={{ scale: 0, y: 8 }}
                variants={{ visible: { scale: 1, y: 0 } }}
                transition={{ duration: 0.4, delay: 0.4, type: "spring", stiffness: 300 }}
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[11px] font-semibold text-black"
                style={{ background: NEON }}
              >
                Popular
              </motion.div>
              <p className="text-[14px] text-neutral-300 mb-1">Pro</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-[40px] font-extrabold tracking-tight">R$297</span>
                <span className="text-[14px] text-neutral-400">/mês</span>
              </div>
              <p className="text-[13px] text-neutral-400 mb-6">Para operações em crescimento</p>
              <motion.a
                href="#"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="block text-center py-2.5 rounded-lg text-[13px] font-semibold text-black transition-all mb-6"
                style={{ background: NEON }}
              >
                Assinar Pro
              </motion.a>
              <div className="space-y-3 text-[13px] text-neutral-300">
                {[
                  "5 agentes ativos",
                  "10.000 interações/mês",
                  "NF-e automática",
                  "Pix & cobranças",
                  "WhatsApp Business API",
                  "Suporte prioritário",
                ].map((f, i) => (
                  <motion.div
                    key={f}
                    variants={slideLeft}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.06 }}
                    className="flex items-center gap-2.5"
                  >
                    <Check className="w-4 h-4 flex-shrink-0" style={{ color: NEON }} />
                    {f}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Enterprise */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.35 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="p-7 rounded-2xl flex flex-col"
              style={{ background: CARD, border: `1px solid ${BORDER}` }}
            >
              <p className="text-[14px] text-neutral-300 mb-1">Enterprise</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-[40px] font-extrabold tracking-tight">Custom</span>
              </div>
              <p className="text-[13px] text-neutral-400 mb-6">Para grandes operações</p>
              <motion.a
                href="#"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="block text-center py-2.5 rounded-lg text-[13px] font-medium transition-all mb-6"
                style={{ border: `1px solid rgba(255,255,255,0.1)`, color: "white" }}
              >
                Falar com vendas
              </motion.a>
              <div className="space-y-3 text-[13px] text-neutral-300">
                {[
                  "Agentes ilimitados",
                  "Interações ilimitadas",
                  "SSO & RBAC avançado",
                  "SLA 99.99%",
                  "Servidor dedicado BR",
                  "Onboarding white-glove",
                ].map((f, i) => (
                  <motion.div
                    key={f}
                    variants={slideLeft}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.06 }}
                    className="flex items-center gap-2.5"
                  >
                    <Check className="w-4 h-4 flex-shrink-0" style={{ color: NEON }} />
                    {f}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ═══════ FAQ ═══════ */}
      <Section id="faq" className="py-24 px-6" style={{ borderTop: `1px solid ${BORDER}` }}>
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-[12px] font-semibold uppercase tracking-[0.2em] mb-3"
              style={{ color: NEON }}
            >
              FAQ
            </motion.p>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[36px] font-extrabold tracking-tight"
            >
              Perguntas frequentes
            </motion.h2>
          </div>

          <div>
            <FAQItem
              q="Os agentes realmente entendem o contexto brasileiro?"
              a="Sim. Nossos modelos são fine-tuned com dados brasileiros: legislação tributária, gírias regionais, formatação de CPF/CNPJ, regras de Pix, SEFAZ e muito mais. Não é uma tradução — é contexto nativo."
              defaultOpen
              index={0}
            />
            <FAQItem
              q="Quanto tempo leva para configurar?"
              a="A integração básica leva menos de 15 minutos. Para integrações com ERP (TOTVS, SAP), nosso time faz o setup em até 48 horas com acompanhamento dedicado."
              index={1}
            />
            <FAQItem
              q="Meus dados ficam seguros?"
              a="Todos os dados são armazenados em servidores AWS em São Paulo (sa-east-1), com criptografia AES-256. Somos conformes com LGPD e estamos em processo de certificação SOC 2 Type II."
              index={2}
            />
            <FAQItem
              q="Posso cancelar a qualquer momento?"
              a="Sim, sem multa e sem burocracia. Seus dados ficam disponíveis para exportação por 30 dias após o cancelamento."
              index={3}
            />
            <FAQItem
              q="Vocês oferecem teste grátis?"
              a="O plano Starter é gratuito para sempre com até 500 interações/mês. Perfeito para validar o produto antes de escalar."
              index={4}
            />
          </div>
        </div>
      </Section>

      {/* ═══════ FINAL CTA ═══════ */}
      <Section className="py-24 px-6 relative overflow-hidden" style={{ borderTop: `1px solid ${BORDER}` }}>
        <motion.div
          variants={fadeIn}
          transition={{ duration: 1.2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[120px] opacity-10 pointer-events-none"
          style={{ background: NEON }}
        />
        <div className="mx-auto max-w-3xl text-center relative z-10">
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[36px] md:text-[48px] font-extrabold tracking-tight mb-5"
            style={{ textWrap: "balance" as any }}
          >
            Automatize sua operação com{" "}
            <span style={{ color: NEON }}>NexoIA</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-[16px] text-neutral-300 mb-10 max-w-xl mx-auto"
          >
            Junte-se a mais de 2.500 empresas brasileiras que já economizam milhares de horas por
            mês com agentes de IA.
          </motion.p>
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center gap-4"
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-[15px] font-semibold text-black transition-all"
              style={{ background: NEON }}
            >
              Começar grátis <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-[15px] font-medium text-neutral-300 transition-all hover:text-white"
              style={{ border: `1px solid rgba(255,255,255,0.1)` }}
            >
              Falar com vendas
            </motion.a>
          </motion.div>
        </div>
      </Section>

      {/* ═══════ FOOTER ═══════ */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-12 px-6"
        style={{ borderTop: `1px solid ${BORDER}` }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: NEON }}>
                  <Bot className="w-3.5 h-3.5 text-black" />
                </div>
                <span className="text-[15px] font-bold">
                  Nexo<span style={{ color: NEON }}>IA</span>
                </span>
              </div>
              <p className="text-[13px] text-neutral-400 leading-relaxed">
                Agentes de IA com contexto brasileiro para automatizar sua operação.
              </p>
            </div>

            {[
              {
                title: "Produto",
                links: ["Funcionalidades", "Planos", "Integrações", "API Docs"],
              },
              {
                title: "Empresa",
                links: ["Sobre", "Blog", "Carreiras", "Contato"],
              },
              {
                title: "Legal",
                links: ["Privacidade", "Termos de uso", "LGPD", "SLA"],
              },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-4">
                  {col.title}
                </p>
                <div className="space-y-2.5">
                  {col.links.map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="block text-[13px] text-neutral-400 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div
            className="flex items-center justify-between pt-8 text-[12px] text-neutral-500"
            style={{ borderTop: `1px solid ${BORDER}` }}
          >
            <span>&copy; 2024 NexoIA. Todos os direitos reservados.</span>
            <span>
              Feito com{" "}
              <a href="/" className="text-neutral-500 hover:text-white transition-colors font-medium">
                brasa.ui
              </a>
            </span>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
