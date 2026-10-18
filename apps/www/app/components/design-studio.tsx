"use client";

import { useEffect, useState } from "react";
import { ArrowDownToLine, ArrowUpRight, Check, Code2, Copy, Layers3, Monitor, Smartphone, SlidersHorizontal, Sparkles } from "lucide-react";
import { contextAsMarkdown, createDesignContext, directions, getDirection, type Density, type DirectionId } from "@/lib/design-context";
import { FinancialPreview } from "./financial-preview";

export function DesignStudio({ builder = false }: { builder?: boolean }) {
  const [direction, setDirection] = useState<DirectionId>("essencial");
  const [density, setDensity] = useState<Density>("comfortable");
  const [view, setView] = useState<"preview" | "context">("preview");
  const [format, setFormat] = useState<"markdown" | "json">("markdown");
  const [mobile, setMobile] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!builder) return;
    const params = new URLSearchParams(window.location.search);
    setDirection(getDirection(params.get("direction") ?? "essencial").id);
    if (params.get("density") === "compact") setDensity("compact");
  }, [builder]);

  useEffect(() => {
    if (!feedback) return;
    const timer = window.setTimeout(() => setFeedback(""), 3500);
    return () => window.clearTimeout(timer);
  }, [feedback]);

  const context = createDesignContext(direction, density);
  const content = format === "json" ? JSON.stringify(context, null, 2) : contextAsMarkdown(context);
  const createUrl = `/create?direction=${direction}&density=${density}`;

  async function copyContext() {
    try {
      await navigator.clipboard.writeText(content);
      setFeedback("Contexto copiado. Cole na conversa com sua IA.");
    } catch {
      setView("context");
      setFeedback("Não foi possível copiar. Selecione o texto ou baixe o arquivo.");
    }
  }

  function downloadContext() {
    const url = URL.createObjectURL(new Blob([content], { type: format === "json" ? "application/json" : "text/markdown;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `brasa-${direction}-${density}.${format === "json" ? "json" : "md"}`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setFeedback("Arquivo de contexto preparado.");
  }

  return (
    <section id="explorar" aria-label="Estúdio de contexto de design" className="scroll-mt-20">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4"><div><p className="mb-1.5 font-mono text-[10px] uppercase tracking-[.15em] text-neutral-500">COMPOSIÇÃO 001</p><h2 className="text-lg font-semibold tracking-tight">Um painel. Diferentes intenções.</h2></div><a href={builder ? "/directory" : createUrl} className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-950">{builder ? "Explorar direções" : "Abrir no estúdio"}<ArrowUpRight size={14} /></a></div>
      <div className={`studio-shell ${builder ? "studio-builder" : ""}`}>
        <aside className="studio-controls">
          <div className="mb-6 flex items-center gap-2 text-xs font-medium"><SlidersHorizontal size={14} /> Direção de design</div>
          <fieldset><legend className="mb-3 text-[11px] text-neutral-500">Personalidade</legend><div className="space-y-2">{directions.map((item) => <label key={item.id} className={`studio-direction ${direction === item.id ? "border-neutral-900 bg-white shadow-sm" : "border-transparent hover:bg-white"}`}><input className="sr-only peer" type="radio" name={builder ? "builder-direction" : "home-direction"} value={item.id} checked={direction === item.id} onChange={() => setDirection(item.id)} /><span className="flex items-center justify-between gap-2 rounded peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4"><span className="flex items-center gap-2 text-xs font-medium"><span className="size-2 rounded-full" style={{ background: item.tokens.accent }} />{item.name}</span>{direction === item.id && <Check size={12} />}</span><span className="mt-2 block text-[10px] leading-relaxed text-neutral-500">{item.description.split(". ")[0]}.</span></label>)}</div></fieldset>
          <label className="mt-6 block text-[11px] text-neutral-500">Densidade<select value={density} onChange={(e) => setDensity(e.target.value as Density)} className="mt-2 block w-full rounded-md border border-neutral-200 bg-white px-2 py-2 text-xs text-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2"><option value="comfortable">Confortável</option><option value="compact">Compacta</option></select></label>
          <div className="mt-6 border-t border-neutral-200 pt-5"><p className="flex items-center gap-1.5 font-mono text-[10px] text-neutral-500"><span className="size-1.5 rounded-full bg-emerald-600" /> pt-BR / BRL</p><p className="mt-2 text-[10px] leading-relaxed text-neutral-500">Contexto brasileiro incluído em todas as direções.</p></div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="studio-toolbar"><div className="flex gap-1" role="group" aria-label="Visualização">{[{ id: "preview", label: "Prévia", icon: Layers3 }, { id: "context", label: "Contexto IA", icon: Code2 }].map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => setView(id as "preview" | "context")} aria-pressed={view === id} className={`flex items-center gap-1.5 rounded-md px-3 py-2 text-[11px] transition-colors ${view === id ? "bg-white text-neutral-950 shadow-sm" : "text-neutral-500 hover:text-neutral-950"}`}><Icon size={13} />{label}</button>)}</div><div className="flex items-center gap-2"><div className="hidden items-center border-r border-neutral-200 pr-2 sm:flex" role="group" aria-label="Largura da prévia"><button type="button" aria-label="Prévia desktop" aria-pressed={!mobile} onClick={() => setMobile(false)} className={`rounded p-2 ${mobile ? "text-neutral-400" : "bg-white text-neutral-950"}`}><Monitor size={14} /></button><button type="button" aria-label="Prévia mobile" aria-pressed={mobile} onClick={() => setMobile(true)} className={`rounded p-2 ${mobile ? "bg-white text-neutral-950" : "text-neutral-400"}`}><Smartphone size={14} /></button></div><button type="button" onClick={copyContext} className="flex items-center gap-1.5 rounded-md bg-neutral-950 px-3 py-2 text-[11px] font-medium text-white hover:bg-neutral-800"><Copy size={12} /><span className="hidden sm:inline">Copiar contexto</span><span className="sm:hidden">Copiar</span></button></div></div>
          {view === "preview" ? <div className={`studio-canvas ${mobile ? "studio-canvas-mobile" : ""}`}><FinancialPreview direction={direction} density={density} mobile={mobile} /></div> : <div className="studio-code"><div className="mb-4 flex items-center justify-between gap-3"><span className="font-mono text-[10px] text-neutral-500">brasa-{direction}.{format === "json" ? "json" : "md"}</span><label className="text-xs text-neutral-500">Formato <select value={format} onChange={(e) => setFormat(e.target.value as "json" | "markdown")} className="ml-2 rounded border border-neutral-200 bg-white px-2 py-1 text-neutral-900"><option value="markdown">Markdown</option><option value="json">JSON</option></select></label></div><pre tabIndex={0} aria-label="Contexto de design exportável" className="max-h-[570px] overflow-auto whitespace-pre-wrap break-words font-mono text-[11px] leading-6 text-neutral-700">{content}</pre></div>}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 bg-white px-4 py-3"><p className="flex items-center gap-1.5 text-[10px] text-neutral-500"><Sparkles size={12} className="text-emerald-700" />{context.direction.name} · Tokens, composição e contexto brasileiro</p><button type="button" onClick={downloadContext} className="flex items-center gap-1.5 text-[10px] font-medium text-neutral-600 hover:text-neutral-950"><ArrowDownToLine size={12} />Baixar {format === "json" ? "JSON" : "Markdown"}</button></div>
        </div>
      </div>
      <div className="mt-3 min-h-5 text-xs text-emerald-800" role="status" aria-live="polite">{feedback}</div>
      <div className="grid gap-6 border-b border-neutral-200 pb-8 pt-3 sm:grid-cols-3">{[{ number: "01", title: "Hierarquia explícita", text: "Saldo primeiro. Evolução depois. Movimentações para aprofundar." }, { number: "02", title: "Brasil no detalhe", text: "Reais, datas locais e métodos de pagamento com nomes familiares." }, { number: "03", title: "Decisões exportáveis", text: "Leve os tokens, as regras e os estados para a conversa com sua IA." }].map((item) => <div key={item.number} className="flex gap-3"><span className="pt-0.5 font-mono text-[10px] text-neutral-400">{item.number}</span><div><h3 className="text-xs font-medium">{item.title}</h3><p className="mt-1.5 max-w-72 text-xs leading-relaxed text-neutral-500">{item.text}</p></div></div>)}</div>
    </section>
  );
}
