"use client";

import { useState, type ReactNode } from "react";
import { ArrowUpRight, ArrowRight, Check, Copy, Code2, Braces, Plus, CreditCard, Bell, Sparkles, ShieldCheck, TrendingUp, X } from "lucide-react";
import { Button, Input, CPFInput, CurrencyBRL, Badge, Switch, Avatar, InstallmentSelect, PixPayment } from "../../../../packages/ui/src";

const categories = ["Todos", "Fundamentos", "Brasil", "Pagamentos", "Para IA"] as const;
type Category = typeof categories[number];
const sampleCode = `import { CPFInput, Button } from "../../../../packages/ui/src";\n\n<CPFInput label="CPF" showValidation />\n<Button variant="primary">Continuar</Button>`;

function Specimen({ title, tag, children, className = "" }: { title: string; tag: string; children: ReactNode; className?: string }) {
  return <article className={`specimen ${className}`}><div className="specimen-caption"><h3>{title}</h3><span>{tag}</span></div>{children}</article>;
}

export function ComponentShowcase() {
  const [category, setCategory] = useState<Category>("Todos");
  const [period, setPeriod] = useState("Semana");
  const [cpf, setCpf] = useState("");
  const [cpfValid, setCpfValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [amount, setAmount] = useState(249.9);
  const [installment, setInstallment] = useState(1);
  const [view, setView] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [notification, setNotification] = useState(false);
  const show = (...groups: Category[]) => category === "Todos" || groups.includes(category);
  async function copyCode() {
    try { await navigator.clipboard.writeText(sampleCode); setCopied(true); setCopyError(false); window.setTimeout(() => setCopied(false), 2000); }
    catch { setCopyError(true); }
  }
  return <section id="biblioteca" aria-label="Experimente os componentes" className="pb-12">
    <div className="showcase-toolbar">
      <div className="flex flex-wrap gap-1" aria-label="Filtrar exemplos">{categories.map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)} className={`showcase-filter ${category === item ? "is-active" : ""}`}>{item}</button>)}</div>
      <a href="/componentes" className="inline-flex shrink-0 items-center gap-1.5 text-xs text-[#627066] hover:text-[#285b43]">Ver biblioteca completa<ArrowUpRight size={14} /></a>
    </div>
    <div className="showcase-grid">
      {show("Brasil") && <Specimen title="Uma boa primeira impressão" tag="FORMULÁRIOS">
        <div className="px-6 pb-6 pt-2">
          <div className="mb-5 flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-xl bg-[#edf2e6] text-[#285b43]"><Plus size={21}/></div><div><h4 className="text-[17px] font-semibold tracking-tight">Seu próximo começo.</h4><p className="mt-0.5 text-xs text-[#66735f]">Um cadastro que fala a sua língua.</p></div></div>
          {view === "preview" ? <form className="space-y-4" onSubmit={event => { event.preventDefault(); if (cpfValid) setSubmitted(true); }}>
            <Input label="Como podemos te chamar?" placeholder="Seu nome" required autoComplete="name" />
            <CPFInput value={cpf} onChange={(value: string) => { setCpf(value); setSubmitted(false); setCpfValid(false); }} onValidate={setCpfValid} required />
            <Button type="submit" variant="primary" className="w-full" disabled={!cpfValid}>{submitted ? <><Check size={15}/> Exemplo concluído</> : <>Continuar<ArrowRight size={15}/></>}</Button>
            <p role="status" className="text-center text-[10px] leading-4 text-[#66735f]">{submitted ? "Pronto! Nenhum dado foi enviado ou armazenado." : "Demonstração local. Seus dados ficam aqui."}</p>
          </form> : <div className="relative min-h-[232px] rounded-xl bg-[#f5f7f1] p-3"><pre className="overflow-x-auto text-[11px] leading-6 text-[#38533d]"><code>{sampleCode}</code></pre><Button variant="outline" size="sm" onClick={copyCode} className="mt-4">{copied ? <Check size={12}/> : <Copy size={12}/>} {copied ? "Copiado" : "Copiar código"}</Button>{copyError && <p role="alert" className="mt-2 text-xs text-red-700">Não foi possível copiar.</p>}</div>}
          <div className="mt-5 flex items-center justify-between border-t border-[#edf0e9] pt-3"><span className="font-mono text-[10px] text-[#66735f]">CPFInput + Input + Button</span><button type="button" onClick={() => setView(view === "preview" ? "code" : "preview")} className="inline-flex items-center gap-1.5 text-[11px] text-[#52664e]"><Code2 size={13}/>{view === "preview" ? "Código" : "Preview"}</button></div>
        </div>
      </Specimen>}
      {show("Fundamentos") && <Specimen title="Números com contexto" tag="VISUALIZAÇÃO">
        <div className="px-6 pb-5 pt-2"><div className="flex items-center justify-between"><span className="text-xs text-[#6b766d]">Receita de exemplo</span><select aria-label="Período da receita" value={period} onChange={e => setPeriod(e.target.value)} className="rounded-md border border-[#e1e6db] bg-white px-2 py-1 text-[10px]"><option>Semana</option><option>Mês</option></select></div><div className="mt-3 flex items-center gap-3"><strong className="text-[32px] font-medium tracking-[-.06em]">{period === "Semana" ? "R$ 12.840" : "R$ 48.620"}<span className="text-xl text-[#9ba592]">,00</span></strong></div><span className="mt-1 inline-flex items-center gap-1 text-[11px] text-[#5c7751]"><TrendingUp size={12}/> {period === "Semana" ? "+18,6%" : "+24,2%"} em relação ao período anterior</span>
          <div className="chart-bars mt-7" role="img" aria-label={`Gráfico ilustrativo de receita por ${period === "Semana" ? "dia" : "semana"}`}>
            {(period === "Semana" ? [36,59,47,76,57,88,72] : [28,50,67,83]).map((height, i) => <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-3"><div style={{height: `${height}%`}} className={`w-full rounded-t-[5px] ${i === (period === "Semana" ? 5 : 3) ? "bg-[#456848]" : "bg-[#dce8c7]"}`}/><span className="text-[9px] text-[#66735f]">{period === "Semana" ? ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"][i] : `Sem ${i + 1}`}</span></div>)}
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-[#edf0e9] pt-4"><span className="text-xs text-[#66735f]">Um pouco melhor a cada dia.</span><span className="flex size-7 items-center justify-center rounded-full bg-[#f0f4e9] text-[#5b754c]"><ArrowUpRight size={14}/></span></div>
        </div>
      </Specimen>}
      {show("Pagamentos", "Brasil") && <Specimen title="O jeito brasileiro de pagar" tag="PIX"><div className="px-5 pb-5 pt-1"><PixPayment amount={149.9} beneficiary="Loja Brasa · exemplo" expiresIn={600}/></div></Specimen>}
      {show("Fundamentos") && <Specimen title="Pequenos detalhes. Muito cuidado." tag="FUNDAMENTOS"><div className="space-y-5 px-6 pb-6 pt-2"><div className="flex flex-wrap gap-2"><Button variant="primary" size="sm" onClick={() => setNotification(true)}><Plus size={13}/> Criar algo</Button><Button variant="outline" size="sm" onClick={() => setNotification(false)}>Limpar</Button><Button variant="ghost" size="sm" onClick={() => setNotification(true)} aria-label="Mostrar notificação"><Bell size={15}/></Button></div><div className="flex flex-wrap gap-2"><Badge variant="success">Publicado</Badge><Badge variant="warning">Em revisão</Badge><Badge variant="brasil">Feito aqui</Badge></div><div className="border-t border-[#edf0e9] pt-4"><Switch defaultChecked label="Notificações do projeto" description="Só o que importa, no momento certo."/></div><div className="flex items-center justify-between"><div className="flex -space-x-2">{["Ana Lima", "João Costa", "Lia Souza"].map((name, i) => <Avatar key={name} fallback={name} alt={name} size="sm" className={`ring-2 ring-white ${i === 1 ? "!bg-[#e8d9ca] !text-[#745539]" : "!bg-[#e2e9d8] !text-[#53664a]"}`}/>)}</div><span className="text-[11px] text-[#66735f]">Melhor quando é junto.</span></div>{notification && <div role="status" className="flex items-center justify-between gap-2 rounded-lg bg-[#eff5e8] p-3 text-xs text-[#45653b]"><span className="flex items-center gap-2"><Check size={14}/> Seu exemplo está pronto.</span><button type="button" aria-label="Fechar notificação" onClick={() => setNotification(false)}><X size={13}/></button></div>}</div></Specimen>}
      {show("Pagamentos", "Brasil") && <Specimen title="Cabe nos seus planos" tag="PARCELAMENTO"><div className="px-6 pb-6 pt-2"><div className="mb-4 flex items-center gap-2 text-xs text-[#6b766d]"><CreditCard size={15}/> Flexível até na hora de pagar.</div><CurrencyBRL value={amount} onChange={(value: number) => { setAmount(value); setInstallment(1); }} label="Valor da compra"/><InstallmentSelect className="mt-4" label="Escolha como pagar" amount={amount} maxInstallments={3} value={installment} onChange={option => setInstallment(option.installments)}/><p className="mt-3 flex items-center gap-1.5 text-[10px] text-[#66735f]"><ShieldCheck size={12}/> Simulação. Nenhuma cobrança é realizada.</p></div></Specimen>}
      {show("Para IA") && <Specimen title="Design que a IA entende" tag="CONTEXTO" className="specimen-context"><div className="px-6 pb-6 pt-2"><div className="mb-4 flex size-10 items-center justify-center rounded-xl border border-[#d4dec8] bg-[#eef3e7] text-[#5a7349]"><Braces size={20}/></div><h4 className="text-xl font-medium leading-snug tracking-tight">Além dos pixels,<br/>as decisões.</h4><p className="mt-2 text-xs leading-6 text-[#66735f]">Dê à sua IA os tokens, as regras e o contexto brasileiro por trás de cada interface.</p><div className="my-5 rounded-xl border border-[#dfe6d5] bg-white/60 p-3 font-mono text-[10px] leading-6 text-[#66735f]"><p>{"{"}</p><p className="pl-3">"locale": <span className="text-[#3b643b]">"pt-BR"</span>,</p><p className="pl-3">"currency": <span className="text-[#3b643b]">"BRL"</span>,</p><p className="pl-3">"intent": <span className="text-[#3b643b]">"clareza e confiança"</span></p><p>{"}"}</p></div><a href="/create" className="flex items-center justify-between text-xs font-medium text-[#3f6035]">Montar meu contexto<Sparkles size={15}/></a></div></Specimen>}
    </div>
    <p className="mt-5 text-center font-mono text-[10px] text-[#66735f]">Componentes reais. Exemplos interativos. Pode mexer.</p>
  </section>;
}
