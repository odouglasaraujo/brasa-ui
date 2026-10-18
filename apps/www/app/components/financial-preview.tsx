"use client";

import { useId, useState, type CSSProperties } from "react";
import { ArrowDownLeft, ArrowUpRight, ChevronDown, Eye, EyeOff, LayoutDashboard, Search, Wallet, ArrowLeftRight, Landmark, CircleHelp, TrendingUp } from "lucide-react";
import { createDesignContext, type Density, type DirectionId } from "@/lib/design-context";

const movements = [
  { name: "Marina Costa", initials: "MC", detail: "Identidade visual", method: "Pix", value: 2450, status: "Recebido", date: "Hoje, 10:42" },
  { name: "Estúdio Aurora", initials: "EA", detail: "Projeto de marca", method: "Boleto", value: 4800, status: "Pendente", date: "Hoje, 09:18" },
  { name: "Rafael Almeida", initials: "RA", detail: "Consultoria", method: "Pix", value: 850, status: "Recebido", date: "Ontem, 16:30" },
  { name: "Casa Botânica", initials: "CB", detail: "Manutenção mensal", method: "Cartão", value: 1290, status: "Recebido", date: "Ontem, 14:05" },
];

const brl = (value: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export function FinancialPreview({ direction, density, mobile = false }: { direction: DirectionId; density: Density; mobile?: boolean }) {
  const { tokens } = createDesignContext(direction, density);
  const [visible, setVisible] = useState(true);
  const [query, setQuery] = useState("");
  const chartId = useId();
  const filtered = movements.filter((item) => `${item.name} ${item.method} ${item.status}`.toLocaleLowerCase("pt-BR").includes(query.toLocaleLowerCase("pt-BR")));
  const style = {
    "--preview-accent": tokens.accent, "--preview-soft": tokens.accentSoft,
    "--preview-surface": tokens.surface, "--preview-canvas": tokens.canvas,
    "--preview-text": tokens.text, "--preview-muted": tokens.muted, "--preview-border": tokens.border,
    "--preview-radius": `${tokens.radius}px`, "--preview-spacing": `${tokens.contentPadding}px`,
    "--preview-row": `${tokens.rowMinHeight}px`, "--preview-heading": tokens.font,
  } as CSSProperties;

  return (
    <div className={`financial-preview ${mobile ? "preview-mobile" : ""}`} style={style}>
      <aside className="preview-sidebar">
        <div className="mb-9 flex items-center gap-2.5 px-2 font-semibold"><span className="flex size-7 items-center justify-center rounded-lg bg-[var(--preview-accent)] text-white"><Landmark size={15} /></span> casa financeira<span className="ml-auto text-neutral-400"><ChevronDown size={13} /></span></div>
        <p className="mb-3 px-3 text-[10px] font-medium tracking-widest text-neutral-500">SEU NEGÓCIO</p>
        <ul className="space-y-1 text-xs">
          {[{ icon: LayoutDashboard, text: "Visão geral" }, { icon: ArrowLeftRight, text: "Movimentações" }, { icon: Wallet, text: "Cobranças" }, { icon: Landmark, text: "Contas conectadas" }].map(({ icon: Icon, text }, i) => <li key={text} className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 ${i === 0 ? "bg-[var(--preview-soft)] font-medium text-[var(--preview-accent)]" : "text-neutral-500"}`}><Icon size={15} />{text}</li>)}
        </ul>
        <div className="mt-auto space-y-4 pt-16"><p className="flex items-center gap-2 px-3 text-xs text-neutral-500"><CircleHelp size={15} /> Central de ajuda</p><div className="flex items-center gap-2 border-t border-[var(--preview-border)] px-2 pt-4"><span className="flex size-8 items-center justify-center rounded-full bg-[var(--preview-soft)] text-[11px] font-semibold text-[var(--preview-accent)]">JS</span><div><p className="text-xs font-medium">Júlia Santos</p><p className="mt-0.5 text-[10px] text-neutral-500">Conta demonstrativa</p></div></div></div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="flex h-12 items-center justify-between border-b border-[var(--preview-border)] bg-[var(--preview-surface)] px-5 text-[11px] text-neutral-500"><span className="flex items-center gap-2"><LayoutDashboard size={13} /> Workspace <span className="mx-1 text-neutral-300">/</span><span className="text-[var(--preview-text)]">Visão geral</span></span><span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-emerald-600" />Dados de exemplo</span></div>
        <div className="preview-content">
          <div className="mb-5 flex items-start justify-between gap-3"><div><p className="mb-1 text-[11px] text-[var(--preview-muted)]">Seu negócio em perspectiva</p><h3 className="preview-heading text-[23px] font-semibold tracking-tight">Bom dia, Júlia <span className="text-lg">☀</span></h3></div><span className="mt-1 rounded-md border border-[var(--preview-border)] bg-[var(--preview-surface)] px-2.5 py-2 text-[10px] text-[var(--preview-muted)]">01–07 out. 2026</span></div>
          <div className="preview-metrics">
            {[{ label: "Saldo disponível", value: 24850.9, icon: Wallet, note: "Disponível em conta" }, { label: "Entradas no período", value: 12380, icon: ArrowDownLeft, note: "+12,8% sobre a semana anterior" }, { label: "Saídas no período", value: 4260.5, icon: ArrowUpRight, note: "−4,2% sobre a semana anterior" }].map(({ label, value, icon: Icon, note }, i) => <div key={label} className="preview-card min-w-0 p-4"><div className="mb-3 flex items-center justify-between gap-1 text-[11px] text-[var(--preview-muted)]"><span>{label}</span>{i === 0 ? <button type="button" onClick={() => setVisible(!visible)} className="rounded p-1 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--preview-accent)]" aria-label={visible ? "Ocultar valores" : "Mostrar valores"}>{visible ? <Eye size={13} /> : <EyeOff size={13} />}</button> : <Icon size={14} />}</div><p className="preview-heading truncate text-[25px] font-semibold tracking-tight tabular-nums">{visible ? brl(value) : "••••••"}</p><p className={`mt-2 text-[10px] ${i === 1 ? "text-emerald-700" : "text-[var(--preview-muted)]"}`}>{note}</p></div>)}
          </div>
          <div className="preview-card mt-4 px-4 pb-3 pt-4">
            <div className="flex items-start justify-between"><div><h4 className="text-xs font-semibold">Entradas na semana</h4><p className="mt-1 text-[10px] text-[var(--preview-muted)]">Um olhar sobre o ritmo do seu caixa.</p></div><span className="flex items-center gap-1 text-[10px] text-[var(--preview-accent)]"><TrendingUp size={12} /> 12,8%</span></div>
            <div className="mt-4 flex gap-3"><div aria-hidden="true" className="flex flex-col justify-between pb-4 text-[9px] tabular-nums text-neutral-500"><span>R$ 3 mil</span><span>R$ 1,5 mil</span><span>R$ 0</span></div><div className="min-w-0 flex-1"><svg viewBox="0 0 650 120" preserveAspectRatio="none" className="h-[104px] w-full" role="img" aria-labelledby={`${chartId}-title ${chartId}-desc`}><title id={`${chartId}-title`}>Entradas entre 1 e 7 de outubro</title><desc id={`${chartId}-desc`}>{visible ? "Valores em reais: 900, 1450, 1180, 2400, 1800, 2050 e 2600. Total: 12.380 reais." : "Valores ocultos."}</desc><defs><linearGradient id={chartId} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={tokens.accent} stopOpacity=".13" /><stop offset="100%" stopColor={tokens.accent} stopOpacity="0" /></linearGradient></defs>{[10, 55, 100].map((y) => <line key={y} x1="0" x2="650" y1={y} y2={y} stroke={tokens.border} strokeDasharray="3 4" />)}{visible && <><path d="M0 88 C35 88 60 58 108 67 S175 92 216 79 S286 26 325 31 S395 67 433 54 S500 61 542 44 S610 13 650 18 L650 120 L0 120Z" fill={`url(#${chartId})`} /><path d="M0 88 C35 88 60 58 108 67 S175 92 216 79 S286 26 325 31 S395 67 433 54 S500 61 542 44 S610 13 650 18" fill="none" stroke={tokens.accent} strokeWidth="2.5" /></>}</svg><div aria-hidden="true" className="mt-2 flex justify-between text-[9px] text-neutral-500">{["01 out.", "02 out.", "03 out.", "04 out.", "05 out.", "06 out.", "07 out."].map((day) => <span key={day}>{day}</span>)}</div></div></div>
          </div>
          <div className="preview-card mt-4 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--preview-border)] px-4 py-3"><h4 className="text-xs font-semibold">Movimentações recentes</h4><label className="flex items-center gap-1.5 text-[var(--preview-muted)]"><Search size={12} /><input aria-label="Buscar movimentações de exemplo" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar movimentação..." className="w-32 bg-transparent text-[10px] outline-none placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-[var(--preview-accent)]" /></label></div>
            <div className="divide-y divide-[var(--preview-border)]">{filtered.map((item) => <div key={item.name} className="preview-row"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--preview-canvas)] text-[10px] font-medium text-[var(--preview-muted)]">{item.initials}</span><div className="min-w-0 flex-1"><p className="truncate text-[11px] font-medium">{item.name}</p><p className="mt-0.5 truncate text-[10px] text-[var(--preview-muted)]">{item.detail}</p></div><span className="preview-method w-14 text-[10px] text-[var(--preview-muted)]">{item.method}</span><span className={`preview-status rounded-md px-2 py-1 text-[9px] ${item.status === "Pendente" ? "bg-amber-50 text-amber-800" : "bg-emerald-50 text-emerald-800"}`}>{item.status}</span><div className="w-24 text-right"><p className="text-[11px] font-medium tabular-nums">{visible ? brl(item.value) : "••••••"}</p><p className="mt-0.5 text-[9px] text-[var(--preview-muted)]">{item.date}</p></div></div>)}{filtered.length === 0 && <p className="p-6 text-center text-xs text-[var(--preview-muted)]">Nenhuma movimentação encontrada. Tente outro nome, método ou situação.</p>}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
