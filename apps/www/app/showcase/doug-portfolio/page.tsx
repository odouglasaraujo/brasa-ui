"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  ArrowUpRight,
  Dribbble,
  Linkedin,
  Mail,
  MapPin,
  Layers,
  Smartphone,
  Monitor,
  Users,
  BarChart3,
  Target,
  Palette,
  MousePointerClick,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";

const UNSPLASH = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

const PROJECTS = [
  {
    title: "NuBank",
    subtitle: "Redesign do fluxo de investimentos",
    description:
      "Redesenhei o fluxo de investimentos mobile, simplificando a jornada de 7 para 4 passos. Aumento de 32% na conversão de novos investidores.",
    tags: ["Mobile App", "Fintech", "Design System", "Pesquisa"],
    image: UNSPLASH("photo-1551288049-bebda4e38f71", 900),
    metrics: "+32% conversão",
    year: "2024",
    color: "#7C3AED",
  },
  {
    title: "Saúde+",
    subtitle: "App de telemedicina",
    description:
      "Produto do zero para startup de telemedicina. Entrevistas com +40 pacientes, protótipos hi-fi no Figma, design system e handoff para 3 squads.",
    tags: ["0 → 1", "Health Tech", "User Research", "Design System"],
    image: UNSPLASH("photo-1576091160399-112ba8d25d1d", 900),
    metrics: "4.8★ App Store",
    year: "2023",
    color: "#059669",
  },
  {
    title: "LogiTrack",
    subtitle: "Dashboard de logística",
    description:
      "Dashboard complexo para gestão de frotas em tempo real. Data visualization, mapas interativos, alertas e relatórios customizáveis.",
    tags: ["Dashboard", "Data Viz", "B2B SaaS", "Mapas"],
    image: UNSPLASH("photo-1460925895917-afdab827c52f", 900),
    metrics: "-45% tempo de análise",
    year: "2023",
    color: "#2563EB",
  },
  {
    title: "EduFlow",
    subtitle: "Plataforma de cursos online",
    description:
      "Redesign completo da experiência de aprendizado. Sistema de gamificação, progresso visual e comunidade integrada que reduziu churn em 28%.",
    tags: ["EdTech", "Gamification", "Web App", "Comunidade"],
    image: UNSPLASH("photo-1522202176988-66273c2fd55f", 900),
    metrics: "-28% churn",
    year: "2022",
    color: "#EA580C",
  },
];

const EXPERIENCE = [
  {
    company: "NuBank",
    role: "Senior Product Designer",
    period: "2023 — Atual",
    description:
      "Design de produtos financeiros para +90M de clientes. Liderança de discovery, prototipação e testes de usabilidade no squad de investimentos.",
    logo: "N",
  },
  {
    company: "VTEX",
    role: "Product Designer",
    period: "2021 — 2023",
    description:
      "Design de ferramentas B2B para e-commerce. Contribuição ao design system Shoreline e pesquisa com lojistas de grande porte.",
    logo: "V",
  },
  {
    company: "Globo",
    role: "UX Designer",
    period: "2019 — 2021",
    description:
      "Experiências digitais para produtos de streaming e portais de notícia. Testes A/B, analytics e otimização de jornadas.",
    logo: "G",
  },
];

const RECOMMENDATIONS = [
  {
    name: "Marina Silva",
    role: "Head of Design, NuBank",
    text: "Doug tem uma capacidade rara de traduzir dados complexos em decisões de design claras. Ele elevou o nível de todo o squad.",
    avatar: UNSPLASH("photo-1494790108377-be9c29b29330", 100),
  },
  {
    name: "Rafael Costa",
    role: "PM Lead, VTEX",
    text: "Trabalhar com o Doug mudou a forma como nosso time pensa produto. Ele questiona as premissas certas e sempre propõe soluções baseadas em evidência.",
    avatar: UNSPLASH("photo-1472099645785-5658abf4ff4e", 100),
  },
  {
    name: "Ana Beatriz Lima",
    role: "CTO, Saúde+",
    text: "Doug construiu nosso produto do zero com uma maturidade impressionante. Desde a pesquisa até o handoff, tudo foi impecável.",
    avatar: UNSPLASH("photo-1438761681033-6461ffad8d80", 100),
  },
];

const TOOLS = [
  "Figma", "Framer", "Maze", "Hotjar", "Mixpanel", "Notion",
  "FigJam", "Principle", "After Effects", "Miro", "Linear",
];

/* ─── Carousel component ─── */
function CasesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = useCallback((dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector("[data-case-card]") as HTMLElement;
    const step = card ? card.offsetWidth + 16 : 340;
    el.scrollBy({ left: dir === "right" ? step : -step, behavior: "smooth" });
  }, []);

  return (
    <div className="relative">
      {/* Scroll track — breaks out of max-w-3xl on the right */}
      <div className="overflow-visible -mr-6">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pr-6 pb-2 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {PROJECTS.map((project, i) => (
            <article
              key={i}
              data-case-card
              className="group flex-shrink-0 w-[calc(45%-8px)] snap-start rounded-2xl bg-white border border-neutral-100 overflow-hidden hover:border-neutral-200 hover:shadow-lg hover:shadow-neutral-200/50 transition-all"
            >
              <div className="aspect-[3/2] overflow-hidden bg-neutral-100 relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <span
                    className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold text-white mb-1.5"
                    style={{ backgroundColor: project.color }}
                  >
                    {project.metrics}
                  </span>
                  <h3 className="text-[15px] font-bold text-white tracking-tight leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-[11px] text-white/60">{project.subtitle}</p>
                </div>
                <span className="absolute top-3 right-3 text-[10px] text-white/40 font-medium">
                  {project.year}
                </span>
              </div>
              <div className="p-4">
                <p className="text-[12px] text-neutral-500 leading-relaxed mb-3 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-neutral-50 text-[10px] font-medium text-neutral-500 border border-neutral-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:border-neutral-300 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:border-neutral-300 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Hide scrollbar */}
      <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}

/* ─── Stats counter ─── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
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

export default function DougPortfolio() {
  return (
    <div
      className="min-h-screen bg-[#FAFAF9] text-neutral-900"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAF9]/80 backdrop-blur-xl border-b border-neutral-200/60">
        <div className="mx-auto max-w-3xl px-6 h-14 flex items-center justify-between">
          <span className="text-[15px] font-bold tracking-tight">Doug.</span>
          <div className="flex items-center gap-5 text-[13px] text-neutral-500">
            <a href="#sobre" className="hover:text-neutral-900 transition-colors">
              Sobre
            </a>
            <a href="#cases" className="hover:text-neutral-900 transition-colors">
              Cases
            </a>
            <a href="#experiencia" className="hover:text-neutral-900 transition-colors">
              Experiência
            </a>
            <a
              href="#contato"
              className="px-3.5 py-1.5 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
            >
              Contato
            </a>
          </div>
        </div>
      </nav>

      {/* Hero — bigger, bolder */}
      <section className="pt-28 pb-16 px-6">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-full bg-neutral-200 overflow-hidden flex-shrink-0">
              <img
                src={UNSPLASH("photo-1507003211169-0a1dd7228f2d", 200)}
                alt="Doug"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-semibold">Doug Araújo</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Disponível
                </span>
              </div>
              <div className="flex items-center gap-1 text-[12px] text-neutral-400">
                <MapPin className="w-3 h-3" />
                São Paulo, Brasil
              </div>
            </div>
          </div>

          <h1 className="text-[40px] md:text-[52px] font-extrabold leading-[1.05] tracking-tight mb-5" style={{ textWrap: "balance" as any }}>
            Transformo problemas<br />
            complexos em{" "}
            <span className="bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-400 bg-clip-text text-transparent">
              experiências simples.
            </span>
          </h1>

          <p className="text-[16px] leading-relaxed text-neutral-500 max-w-lg mb-8">
            Product Designer com +5 anos ajudando times em{" "}
            <span className="text-neutral-700 font-medium">NuBank</span>,{" "}
            <span className="text-neutral-700 font-medium">VTEX</span> e{" "}
            <span className="text-neutral-700 font-medium">Globo</span>{" "}
            a criar produtos digitais que pessoas reais usam e gostam.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="#cases"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white text-[13px] font-medium hover:bg-neutral-800 transition-colors"
            >
              Ver cases <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-neutral-200 text-neutral-400 hover:text-neutral-900 hover:border-neutral-300 transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-neutral-200 text-neutral-400 hover:text-neutral-900 hover:border-neutral-300 transition-all"
            >
              <Dribbble className="w-4 h-4" />
            </a>
            <a
              href="mailto:doug@email.com"
              className="p-2.5 rounded-full border border-neutral-200 text-neutral-400 hover:text-neutral-900 hover:border-neutral-300 transition-all"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Números — big stats strip */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-3xl">
          <div className="grid grid-cols-4 gap-4">
            {[
              { value: 5, suffix: "+", label: "Anos de experiência" },
              { value: 90, suffix: "M+", label: "Usuários impactados" },
              { value: 12, suffix: "", label: "Produtos lançados" },
              { value: 3, suffix: "", label: "Design systems" },
            ].map((stat) => (
              <div key={stat.label} className="text-center py-5 px-3 rounded-xl bg-white border border-neutral-100">
                <p className="text-[28px] font-extrabold tracking-tight text-neutral-900">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-[11px] text-neutral-400 font-medium mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-3xl px-6">
        <div className="border-t border-neutral-200/80" />
      </div>

      {/* Sobre — single column, tighter */}
      <section id="sobre" className="py-16 px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-4">
            Sobre
          </p>
          <div className="max-w-xl">
            <p className="text-[15px] leading-[1.75] text-neutral-600 mb-4">
              Comecei na área como estagiário de UX em 2019. Desde então, passei por empresas de
              diferentes portes — de startups early-stage a produtos com dezenas de milhões de
              usuários.
            </p>
            <p className="text-[15px] leading-[1.75] text-neutral-600 mb-4">
              Meu processo é centrado em{" "}
              <span className="font-medium text-neutral-900">discovery</span>: antes de desenhar, eu
              entendo. Entrevistas, análise de dados, benchmarking e muita conversa com stakeholders.
              O Figma vem depois.
            </p>
            <p className="text-[15px] leading-[1.75] text-neutral-600">
              Acredito que design bom é o que resolve — não o que impressiona no Dribbble. Fora do
              trabalho, mentoro designers juniores e contribuo para projetos open source.
            </p>
          </div>
        </div>
      </section>

      {/* Tools marquee */}
      <section className="pb-16 px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-4">
            Ferramentas
          </p>
          <div className="flex flex-wrap gap-2">
            {TOOLS.map((tool) => (
              <span
                key={tool}
                className="px-3.5 py-2 rounded-lg bg-white border border-neutral-100 text-[13px] font-medium text-neutral-600 hover:border-neutral-200 transition-colors"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-3xl px-6">
        <div className="border-t border-neutral-200/80" />
      </div>

      {/* Cases — Carousel */}
      <section id="cases" className="py-16 px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-2">
              Cases
            </p>
            <h2 className="text-2xl font-bold tracking-tight">Trabalhos selecionados</h2>
          </div>

          <CasesCarousel />
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-3xl px-6">
        <div className="border-t border-neutral-200/80" />
      </div>

      {/* Experiência — horizontal cards */}
      <section id="experiencia" className="py-16 px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-2">
            Experiência
          </p>
          <h2 className="text-2xl font-bold tracking-tight mb-8">Onde já trabalhei</h2>

          <div className="space-y-3">
            {EXPERIENCE.map((exp, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-xl bg-white border border-neutral-100 hover:border-neutral-200 hover:shadow-sm transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center text-white text-[14px] font-bold flex-shrink-0">
                  {exp.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-[15px] font-semibold text-neutral-900">{exp.company}</h3>
                      <p className="text-[13px] text-neutral-500">{exp.role}</p>
                    </div>
                    <span className="text-[12px] font-medium text-neutral-400 shrink-0">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-[13px] text-neutral-500 leading-relaxed mt-2">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Formação inline */}
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-3 mt-10">
            Formação
          </p>
          <div className="flex items-center gap-4 p-5 rounded-xl bg-white border border-neutral-100">
            <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-500 text-[14px] font-bold flex-shrink-0">
              E
            </div>
            <div className="flex-1 flex items-start justify-between">
              <div>
                <h3 className="text-[15px] font-semibold text-neutral-900">ESPM São Paulo</h3>
                <p className="text-[13px] text-neutral-500">
                  Design de Interação — Bacharelado
                </p>
              </div>
              <span className="text-[12px] font-medium text-neutral-400">2015 — 2019</span>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-3xl px-6">
        <div className="border-t border-neutral-200/80" />
      </div>

      {/* Recomendações */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-2">
            Recomendações
          </p>
          <h2 className="text-2xl font-bold tracking-tight mb-8">O que dizem sobre mim</h2>

          <div className="grid md:grid-cols-3 gap-4">
            {RECOMMENDATIONS.map((rec, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-white border border-neutral-100 hover:border-neutral-200 transition-all flex flex-col"
              >
                <Quote className="w-5 h-5 text-neutral-200 mb-3" />
                <p className="text-[13px] text-neutral-600 leading-relaxed flex-1">
                  &ldquo;{rec.text}&rdquo;
                </p>
                <div className="flex items-center gap-2.5 mt-4 pt-4 border-t border-neutral-100">
                  <img
                    src={rec.avatar}
                    alt={rec.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-[12px] font-semibold text-neutral-900">{rec.name}</p>
                    <p className="text-[11px] text-neutral-400">{rec.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-3xl px-6">
        <div className="border-t border-neutral-200/80" />
      </div>

      {/* Contato — left-aligned, more personality */}
      <section id="contato" className="py-16 px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-3">
            Contato
          </p>
          <h2 className="text-[32px] font-extrabold tracking-tight mb-3" style={{ textWrap: "balance" as any }}>
            Tem um projeto? Vamos conversar.
          </h2>
          <p className="text-[15px] text-neutral-500 mb-8 max-w-md">
            Se você tem um desafio de produto, quer trocar ideias sobre design ou precisa de um
            designer para seu time — me chama.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="mailto:doug@email.com"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 text-white text-[14px] font-medium hover:bg-neutral-800 transition-colors"
            >
              <Mail className="w-4 h-4" />
              doug@email.com
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-neutral-200 text-[14px] font-medium text-neutral-700 hover:border-neutral-300 hover:bg-white transition-all"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-neutral-200 text-[14px] font-medium text-neutral-700 hover:border-neutral-300 hover:bg-white transition-all"
            >
              <Dribbble className="w-4 h-4" />
              Dribbble
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200/80 py-8 px-6">
        <div className="mx-auto max-w-3xl flex items-center justify-between">
          <span className="text-[12px] text-neutral-400">
            &copy; 2024 Doug Araújo
          </span>
          <span className="text-[12px] text-neutral-400">
            Feito com{" "}
            <a
              href="/"
              className="text-neutral-500 hover:text-neutral-700 transition-colors font-medium"
            >
              brasa.ui
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
