"use client";

import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Database,
  GitBranch,
  Shield,
  BarChart3,
  Search,
  Layers,
  Activity,
  Lock,
  Eye,
  Zap,
  Check,
  ChevronDown,
  Sparkles,
  Table2,
  Workflow,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Menu,
  X,
  TrendingUp,
  Users,
  Clock,
} from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─── Palette ─── */
const CYAN = "#06b6d4";
const CYAN_LIGHT = "#22d3ee";
const CYAN_DIM = "#0891b2";
const BG = "#0a0e1a";
const CARD = "#0f1525";
const CARD_HOVER = "#131a2e";
const BORDER = "rgba(255,255,255,0.06)";
const BORDER_CYAN = "rgba(6,182,212,0.2)";

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

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

/* ─── Section wrapper ─── */
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

/* ─── FAQ Item ─── */
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
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
          <ChevronDown className="h-4 w-4 shrink-0 text-neutral-500" />
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

/* ─── Animated bar ─── */
function AnimBar({ h, delay, color }: { h: number; delay: number; color: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  return (
    <motion.div
      ref={ref}
      className="flex-1 rounded-t-sm"
      initial={{ height: 0 }}
      animate={inView ? { height: `${h}%` } : { height: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ background: color }}
    />
  );
}

/* ─── Lineage node ─── */
function LineageNode({ label, icon: Icon, delay, status }: { label: string; icon: any; delay: number; status: "ok" | "warn" | "error" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const statusColor = status === "ok" ? "#10b981" : status === "warn" ? "#f59e0b" : "#ef4444";
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center gap-2"
    >
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center relative"
        style={{ background: CARD, border: `1px solid ${BORDER}` }}
      >
        <Icon className="w-6 h-6" style={{ color: CYAN }} />
        <div
          className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center"
          style={{ borderColor: BG, background: statusColor }}
        />
      </div>
      <span className="text-[11px] text-neutral-400 font-medium">{label}</span>
    </motion.div>
  );
}

export default function DatumPage() {
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
        style={{ background: "rgba(10,14,26,0.85)", borderBottom: `1px solid ${BORDER}` }}
      >
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${CYAN}, ${CYAN_DIM})` }}>
              <Database className="w-4 h-4 text-white" />
            </div>
            <span className="text-[16px] font-bold tracking-tight">
              Datum
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[13px] text-neutral-400">
            <a href="#features" className="hover:text-white transition-colors">Produto</a>
            <a href="#how" className="hover:text-white transition-colors">Como funciona</a>
            <a href="#pricing" className="hover:text-white transition-colors">Planos</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="#" className="text-[13px] text-neutral-400 hover:text-white transition-colors px-3 py-2">
              Login
            </a>
            <a
              href="#"
              className="text-[13px] font-medium px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${CYAN}, ${CYAN_DIM})` }}
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
      <section className="relative pt-40 pb-28 px-6 overflow-hidden">
        {/* Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.12, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[140px] pointer-events-none"
          style={{ background: CYAN }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.06 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-[100px] right-[10%] w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none"
          style={{ background: "#8b5cf6" }}
        />

        <div className="mx-auto max-w-4xl text-center relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-medium mb-8"
            style={{ border: `1px solid ${BORDER_CYAN}`, background: "rgba(6,182,212,0.06)", color: CYAN_LIGHT }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Data governance para a era da inteligência artificial
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-[48px] md:text-[68px] font-extrabold leading-[1.02] tracking-tight mb-6"
            style={{ textWrap: "balance" as any }}
          >
            Seus dados,{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${CYAN_LIGHT}, #818cf8)` }}>
              sob controle total
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-[18px] text-neutral-300 leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Catálogo, linhagem, qualidade e compliance unificados em uma plataforma.
            Governe cada dado que alimenta seus modelos de IA — antes que eles governem você.
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
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[14px] font-semibold text-white transition-all"
              style={{ background: `linear-gradient(135deg, ${CYAN}, ${CYAN_DIM})` }}
            >
              Agendar demo <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="#features"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[14px] font-medium text-neutral-200 transition-all hover:text-white"
              style={{ border: `1px solid rgba(255,255,255,0.1)`, background: "rgba(255,255,255,0.03)" }}
            >
              Ver funcionalidades
            </motion.a>
          </motion.div>
        </div>

        {/* ── Dashboard mockup ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mx-auto max-w-5xl mt-20 rounded-2xl overflow-hidden relative"
          style={{ border: `1px solid ${BORDER}`, background: CARD }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${BORDER}` }}>
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-[12px] text-neutral-500 font-medium">Datum — Data Governance Platform</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-2.5 py-1 rounded-md text-[11px] font-medium" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}>
                All systems healthy
              </div>
            </div>
          </div>

          {/* Dashboard content */}
          <div className="grid md:grid-cols-4 gap-4 p-5">
            {/* Stat cards */}
            {[
              { label: "Datasets catalogados", value: "2.847", trend: "+12%", icon: Table2 },
              { label: "Qualidade média", value: "94.2%", trend: "+3.1%", icon: Activity },
              { label: "Linhagens mapeadas", value: "18.5k", trend: "+8%", icon: GitBranch },
              { label: "Violações LGPD", value: "0", trend: "0 este mês", icon: Shield },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.1 + i * 0.1 }}
                className="p-4 rounded-xl"
                style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className="w-4 h-4 text-neutral-500" />
                  <span className="text-[11px] font-medium" style={{ color: "#10b981" }}>{stat.trend}</span>
                </div>
                <p className="text-[22px] font-bold tracking-tight">{stat.value}</p>
                <p className="text-[11px] text-neutral-500 mt-0.5">{stat.label}</p>
              </motion.div>
            ))}

            {/* Quality chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="md:col-span-2 p-4 rounded-xl"
              style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}` }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[13px] font-medium text-neutral-300">Data Quality Score</span>
                <span className="text-[11px] text-neutral-500">Últimos 30 dias</span>
              </div>
              <div className="flex items-end gap-1 h-24">
                {[65, 70, 68, 75, 72, 80, 78, 82, 85, 83, 88, 87, 90, 89, 92, 91, 93, 94, 93, 95, 94, 96, 95, 94].map((h, i) => (
                  <AnimBar
                    key={i}
                    h={h}
                    delay={1.6 + i * 0.03}
                    color={h >= 90 ? CYAN : "rgba(6,182,212,0.25)"}
                  />
                ))}
              </div>
            </motion.div>

            {/* Recent activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              className="md:col-span-2 p-4 rounded-xl"
              style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}` }}
            >
              <span className="text-[13px] font-medium text-neutral-300">Atividade recente</span>
              <div className="mt-3 space-y-2">
                {[
                  { text: "Schema change detectada em payments_db", icon: AlertTriangle, color: "#f59e0b" },
                  { text: "Dataset clients_v3 passou em todos os checks", icon: CheckCircle2, color: "#10b981" },
                  { text: "Novo modelo ML registrado: churn_predictor_v2", icon: Zap, color: CYAN },
                  { text: "PII encontrada em staging.user_logs", icon: XCircle, color: "#ef4444" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.8 + i * 0.12 }}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px]"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    <item.icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: item.color }} />
                    <span className="text-neutral-300">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Gradient overlay at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
            style={{ background: `linear-gradient(to top, ${BG}, transparent)` }}
          />
        </motion.div>
      </section>

      {/* ═══════ LOGOS ═══════ */}
      <Section
        className="py-16 px-6"
        style={{ borderTop: `1px solid ${BORDER}` }}
      >
        <div className="mx-auto max-w-5xl">
          <motion.p
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="text-[12px] text-neutral-400 text-center uppercase tracking-[0.2em] mb-10"
          >
            Empresas data-driven que confiam no Datum
          </motion.p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-50">
            {["Nubank", "iFood", "Creditas", "QuintoAndar", "Loft", "Wildlife", "EBANX", "Neon"].map((name, i) => (
              <motion.span
                key={name}
                variants={fadeUp}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="text-[17px] font-bold tracking-tight text-white"
              >
                {name}
              </motion.span>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════ FEATURES ═══════ */}
      <Section id="features" className="py-24 px-6" style={{ borderTop: `1px solid ${BORDER}` }}>
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-[12px] font-semibold uppercase tracking-[0.2em] mb-3"
              style={{ color: CYAN }}
            >
              Produto
            </motion.p>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[36px] md:text-[48px] font-extrabold tracking-tight mb-4"
            >
              Governança completa,{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${CYAN_LIGHT}, #818cf8)` }}>
                uma plataforma
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[16px] text-neutral-300 max-w-2xl mx-auto"
            >
              Quatro pilares que transformam dados dispersos em um ativo estratégico confiável.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                icon: Search,
                title: "Data Catalog",
                description: "Descubra, documente e encontre qualquer dataset em segundos. Metadados automáticos, tags inteligentes e busca semântica com IA que entende o contexto dos seus dados.",
                visual: "catalog",
              },
              {
                icon: GitBranch,
                title: "Data Lineage",
                description: "Visualize o caminho completo dos dados — da origem ao modelo de IA. Rastreie impacto de mudanças, identifique dependências e garanta reprodutibilidade.",
                visual: "lineage",
              },
              {
                icon: Activity,
                title: "Data Quality",
                description: "Monitore a saúde dos seus dados em tempo real. Regras de validação automáticas, alertas de anomalia, score de qualidade por dataset e SLAs de freshness.",
                visual: "quality",
              },
              {
                icon: Shield,
                title: "Compliance & LGPD",
                description: "Mapeie dados pessoais automaticamente, gerencie consentimento, controle acesso e gere relatórios de impacto. LGPD, GDPR e SOC 2 no piloto automático.",
                visual: "compliance",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="p-7 rounded-2xl relative overflow-hidden group"
                style={{ background: CARD, border: `1px solid ${BORDER}` }}
              >
                <motion.div
                  variants={scaleUp}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "rgba(6,182,212,0.08)", border: `1px solid ${BORDER_CYAN}` }}
                >
                  <feature.icon className="w-5 h-5" style={{ color: CYAN }} />
                </motion.div>
                <motion.h3
                  variants={fadeUp}
                  transition={{ duration: 0.4, delay: 0.25 + i * 0.1 }}
                  className="text-[20px] font-bold mb-2"
                >
                  {feature.title}
                </motion.h3>
                <motion.p
                  variants={fadeUp}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="text-[14px] text-neutral-300 leading-relaxed"
                >
                  {feature.description}
                </motion.p>

                {/* Visual elements per card */}
                {feature.visual === "catalog" && (
                  <div className="mt-5 space-y-2">
                    {[
                      { name: "payments_transactions", type: "PostgreSQL", rows: "12.4M", quality: 98 },
                      { name: "user_events_raw", type: "BigQuery", rows: "847M", quality: 94 },
                      { name: "product_catalog_v3", type: "MongoDB", rows: "52K", quality: 100 },
                    ].map((ds, j) => (
                      <motion.div
                        key={j}
                        variants={slideRight}
                        transition={{ duration: 0.4, delay: 0.4 + j * 0.1 }}
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-[12px]"
                        style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}` }}
                      >
                        <div className="flex items-center gap-2.5">
                          <Table2 className="w-3.5 h-3.5 text-neutral-500" />
                          <span className="text-neutral-200 font-mono text-[11px]">{ds.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-neutral-500">{ds.type}</span>
                          <span className="text-neutral-500">{ds.rows}</span>
                          <span className="font-medium" style={{ color: ds.quality >= 98 ? "#10b981" : CYAN }}>{ds.quality}%</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {feature.visual === "lineage" && (
                  <div className="mt-5 flex items-center justify-between px-4">
                    <LineageNode label="Source" icon={Database} delay={0.4} status="ok" />
                    <motion.div
                      initial={{ scaleX: 0 }}
                      variants={{ visible: { scaleX: 1 } }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                      className="flex-1 h-px mx-2"
                      style={{ background: `linear-gradient(to right, ${CYAN}, rgba(6,182,212,0.2))`, transformOrigin: "left" }}
                    />
                    <LineageNode label="Transform" icon={Workflow} delay={0.6} status="ok" />
                    <motion.div
                      initial={{ scaleX: 0 }}
                      variants={{ visible: { scaleX: 1 } }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                      className="flex-1 h-px mx-2"
                      style={{ background: `linear-gradient(to right, rgba(6,182,212,0.2), ${CYAN})`, transformOrigin: "left" }}
                    />
                    <LineageNode label="Model" icon={Zap} delay={0.8} status="warn" />
                    <motion.div
                      initial={{ scaleX: 0 }}
                      variants={{ visible: { scaleX: 1 } }}
                      transition={{ duration: 0.4, delay: 1.0 }}
                      className="flex-1 h-px mx-2"
                      style={{ background: `linear-gradient(to right, rgba(6,182,212,0.2), ${CYAN})`, transformOrigin: "left" }}
                    />
                    <LineageNode label="Dashboard" icon={BarChart3} delay={1.0} status="ok" />
                  </div>
                )}

                {feature.visual === "quality" && (
                  <div className="mt-5 space-y-2.5">
                    {[
                      { rule: "Completude > 99%", status: "pass", value: "99.7%" },
                      { rule: "Freshness < 1h", status: "pass", value: "23 min" },
                      { rule: "Unicidade de IDs", status: "pass", value: "100%" },
                      { rule: "Formato de e-mail válido", status: "warn", value: "97.1%" },
                    ].map((check, j) => (
                      <motion.div
                        key={j}
                        variants={slideRight}
                        transition={{ duration: 0.4, delay: 0.4 + j * 0.1 }}
                        className="flex items-center justify-between px-3.5 py-2 rounded-lg text-[12px]"
                        style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}` }}
                      >
                        <div className="flex items-center gap-2">
                          {check.status === "pass" ? (
                            <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "#10b981" }} />
                          ) : (
                            <AlertTriangle className="w-3.5 h-3.5" style={{ color: "#f59e0b" }} />
                          )}
                          <span className="text-neutral-300">{check.rule}</span>
                        </div>
                        <span className="font-mono font-medium" style={{ color: check.status === "pass" ? "#10b981" : "#f59e0b" }}>
                          {check.value}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}

                {feature.visual === "compliance" && (
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    {[
                      { label: "LGPD", status: "Conforme" },
                      { label: "GDPR", status: "Conforme" },
                      { label: "SOC 2 Type II", status: "Conforme" },
                      { label: "ISO 27001", status: "Em auditoria" },
                    ].map((item, j) => (
                      <motion.div
                        key={j}
                        variants={scaleUp}
                        transition={{ duration: 0.4, delay: 0.4 + j * 0.1 }}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-[12px]"
                        style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}` }}
                      >
                        <Lock className="w-3 h-3 text-neutral-500" />
                        <span className="text-neutral-300">{item.label}</span>
                        <span className="ml-auto font-medium" style={{ color: item.status === "Conforme" ? "#10b981" : "#f59e0b" }}>
                          {item.status === "Conforme" ? "✓" : "…"}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}

                <div
                  className="absolute -right-16 -bottom-16 w-[200px] h-[200px] rounded-full blur-[80px] opacity-[0.03] pointer-events-none"
                  style={{ background: CYAN }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <Section id="how" className="py-24 px-6" style={{ borderTop: `1px solid ${BORDER}` }}>
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-[12px] font-semibold uppercase tracking-[0.2em] mb-3"
              style={{ color: CYAN }}
            >
              Como funciona
            </motion.p>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[36px] md:text-[44px] font-extrabold tracking-tight"
            >
              Do caos à confiança em 3 passos
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: Layers,
                title: "Conecte suas fontes",
                description: "PostgreSQL, BigQuery, Snowflake, MongoDB, S3, Kafka — conecte em minutos com conectores nativos. Sem agentes, sem código.",
              },
              {
                step: "02",
                icon: Eye,
                title: "Descubra e classifique",
                description: "A IA do Datum escaneia automaticamente: metadados, PII, relações entre tabelas, qualidade. Zero configuração manual.",
              },
              {
                step: "03",
                icon: TrendingUp,
                title: "Governe e escale",
                description: "Defina políticas, monitore qualidade, rastreie linhagem e garanta compliance. Tudo em um dashboard unificado.",
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
                  className="text-[72px] font-black leading-none absolute -top-3 -left-1"
                  style={{ color: "rgba(6,182,212,0.04)" }}
                >
                  {item.step}
                </motion.span>
                <div className="relative z-10">
                  <motion.div
                    variants={scaleUp}
                    transition={{ duration: 0.4, delay: 0.25 + i * 0.15, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: "rgba(6,182,212,0.06)", border: `1px solid ${BORDER_CYAN}` }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: CYAN }} />
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

      {/* ═══════ STATS ═══════ */}
      <Section className="py-20 px-6" style={{ borderTop: `1px solid ${BORDER}` }}>
        <div className="mx-auto max-w-5xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: 500, suffix: "+", label: "Fontes de dados suportadas" },
              { value: 98, suffix: "%", label: "Redução em incidentes de dados" },
              { value: 15, suffix: "min", label: "Setup médio por fonte" },
              { value: 3, suffix: "x", label: "Mais rápido que alternatives" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="text-[36px] md:text-[44px] font-extrabold tracking-tight" style={{ color: CYAN }}>
                  <Counter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-[13px] text-neutral-400 mt-1">{stat.label}</p>
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
              style={{ color: CYAN }}
            >
              Planos
            </motion.p>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[36px] md:text-[44px] font-extrabold tracking-tight mb-4"
            >
              Preço justo, valor real
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[16px] text-neutral-300 max-w-xl mx-auto"
            >
              Comece grátis e escale conforme seus dados crescem.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                name: "Starter",
                price: "R$0",
                period: "/mês",
                subtitle: "Para times começando com governança",
                cta: "Começar grátis",
                ctaStyle: "outline" as const,
                features: ["Até 10 datasets", "Data catalog básico", "Quality checks diários", "1 usuário", "Community support"],
                highlighted: false,
              },
              {
                name: "Team",
                price: "R$997",
                period: "/mês",
                subtitle: "Para times data-driven em crescimento",
                cta: "Iniciar trial de 14 dias",
                ctaStyle: "filled" as const,
                features: ["Datasets ilimitados", "Lineage completo", "Quality checks em real-time", "Até 20 usuários", "LGPD compliance", "Slack & Teams alerts", "Suporte prioritário"],
                highlighted: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                subtitle: "Para grandes organizações data-first",
                cta: "Falar com vendas",
                ctaStyle: "outline" as const,
                features: ["Tudo do Team", "SSO & RBAC avançado", "Multi-cloud governance", "SLA 99.99%", "Dedicated CSM", "On-premise option", "Auditoria SOC 2"],
                highlighted: false,
              },
            ].map((plan, i) => (
              <motion.div
                key={plan.name}
                variants={plan.highlighted ? scaleUp : fadeUp}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
                whileHover={{ y: plan.highlighted ? -8 : -6, transition: { duration: 0.25 } }}
                className="p-7 rounded-2xl flex flex-col relative"
                style={{
                  background: CARD,
                  border: plan.highlighted ? `1px solid ${BORDER_CYAN}` : `1px solid ${BORDER}`,
                }}
              >
                {plan.highlighted && (
                  <motion.div
                    initial={{ scale: 0, y: 8 }}
                    variants={{ visible: { scale: 1, y: 0 } }}
                    transition={{ duration: 0.4, delay: 0.4, type: "spring", stiffness: 300 }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[11px] font-semibold text-white"
                    style={{ background: `linear-gradient(135deg, ${CYAN}, ${CYAN_DIM})` }}
                  >
                    Mais popular
                  </motion.div>
                )}
                <p className="text-[14px] text-neutral-300 mb-1">{plan.name}</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-[40px] font-extrabold tracking-tight">{plan.price}</span>
                  {plan.period && <span className="text-[14px] text-neutral-400">{plan.period}</span>}
                </div>
                <p className="text-[13px] text-neutral-400 mb-6">{plan.subtitle}</p>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="block text-center py-2.5 rounded-lg text-[13px] font-semibold transition-all mb-6"
                  style={
                    plan.ctaStyle === "filled"
                      ? { background: `linear-gradient(135deg, ${CYAN}, ${CYAN_DIM})`, color: "white" }
                      : { border: `1px solid rgba(255,255,255,0.1)`, color: "white" }
                  }
                >
                  {plan.cta}
                </motion.a>
                <div className="space-y-3 text-[13px] text-neutral-300">
                  {plan.features.map((f, j) => (
                    <motion.div
                      key={f}
                      variants={slideLeft}
                      transition={{ duration: 0.3, delay: 0.35 + j * 0.05 }}
                      className="flex items-center gap-2.5"
                    >
                      <Check className="w-4 h-4 flex-shrink-0" style={{ color: CYAN }} />
                      {f}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
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
              style={{ color: CYAN }}
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
              q="O Datum funciona com qualquer banco de dados?"
              a="Sim. Temos conectores nativos para PostgreSQL, MySQL, BigQuery, Snowflake, Redshift, MongoDB, S3, Kafka, e mais de 200 outras fontes. Se não tivermos, construímos para você."
              defaultOpen
              index={0}
            />
            <FAQItem
              q="Como funciona a detecção automática de PII?"
              a="Usamos modelos de NLP treinados para identificar dados pessoais em qualquer formato — nomes, CPFs, e-mails, endereços, dados de saúde. A classificação é automática e pode ser customizada com suas regras."
              index={1}
            />
            <FAQItem
              q="O Datum atende requisitos de LGPD?"
              a="Totalmente. Geramos relatórios de impacto (RIPD), mapeamos dados pessoais automaticamente, controlamos consentimento e mantemos logs de auditoria completos. Também suportamos GDPR e SOC 2."
              index={2}
            />
            <FAQItem
              q="Quanto tempo leva para implementar?"
              a="A conexão da primeira fonte leva cerca de 15 minutos. Uma implementação completa para enterprise com dezenas de fontes leva entre 2 a 4 semanas, com acompanhamento do nosso time."
              index={3}
            />
            <FAQItem
              q="Existe integração com ferramentas de BI e ML?"
              a="Sim. Integramos com dbt, Airflow, Databricks, MLflow, Metabase, Looker, Power BI e mais. A linhagem é capturada automaticamente de todas essas ferramentas."
              index={4}
            />
          </div>
        </div>
      </Section>

      {/* ═══════ FINAL CTA ═══════ */}
      <Section className="py-28 px-6 relative overflow-hidden" style={{ borderTop: `1px solid ${BORDER}` }}>
        <motion.div
          variants={fadeIn}
          transition={{ duration: 1.2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[140px] opacity-10 pointer-events-none"
          style={{ background: CYAN }}
        />
        <motion.div
          variants={fadeIn}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute top-[30%] right-[20%] w-[200px] h-[200px] rounded-full blur-[100px] opacity-[0.04] pointer-events-none"
          style={{ background: "#8b5cf6" }}
        />
        <div className="mx-auto max-w-3xl text-center relative z-10">
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[36px] md:text-[52px] font-extrabold tracking-tight mb-5"
            style={{ textWrap: "balance" as any }}
          >
            Pare de improvisar.{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${CYAN_LIGHT}, #818cf8)` }}>
              Governe seus dados.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-[17px] text-neutral-300 mb-10 max-w-xl mx-auto"
          >
            Junte-se a centenas de empresas brasileiras que já confiam no Datum para governar seus dados com inteligência.
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
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-[15px] font-semibold text-white transition-all"
              style={{ background: `linear-gradient(135deg, ${CYAN}, ${CYAN_DIM})` }}
            >
              Agendar demo <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-[15px] font-medium text-neutral-200 transition-all hover:text-white"
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
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${CYAN}, ${CYAN_DIM})` }}>
                  <Database className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-[15px] font-bold">Datum</span>
              </div>
              <p className="text-[13px] text-neutral-400 leading-relaxed">
                Governança de dados inteligente para empresas que levam dados a sério.
              </p>
            </div>

            {[
              { title: "Produto", links: ["Data Catalog", "Data Lineage", "Data Quality", "Compliance"] },
              { title: "Empresa", links: ["Sobre", "Blog", "Carreiras", "Contato"] },
              { title: "Legal", links: ["Privacidade", "Termos de uso", "LGPD", "SOC 2"] },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-4">
                  {col.title}
                </p>
                <div className="space-y-2.5">
                  {col.links.map((link) => (
                    <a key={link} href="#" className="block text-[13px] text-neutral-400 hover:text-white transition-colors">
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
            <span>&copy; 2024 Datum. Todos os direitos reservados.</span>
            <span>
              Feito com{" "}
              <a href="/" className="text-neutral-400 hover:text-white transition-colors font-medium">
                brasa.ui
              </a>
            </span>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
