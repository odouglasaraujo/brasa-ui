"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, Github, Search, ArrowUpRight, Braces } from "lucide-react";
import { COMPONENTS } from "../componentes/data";

const links = [
  { label: "Componentes", href: "/componentes" },
  { label: "Direções", href: "/directory" },
  { label: "Documentação", href: "/docs" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); dialog.current?.showModal(); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const results = COMPONENTS.filter(item => `${item.name} ${item.description} ${item.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())).slice(0, 8);
  return <>
    <a href="#main-content" className="sr-only z-[100] rounded bg-white p-3 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Pular para o conteúdo</a>
    <header className="sticky top-0 z-40 border-b border-[#e4e8df] bg-[#fafbf8]/95 backdrop-blur-xl">
      <nav aria-label="Navegação principal" className="mx-auto flex h-[62px] max-w-[1320px] items-center gap-8 px-5 sm:px-8 lg:px-12">
        <a href="/" className="flex shrink-0 items-center gap-2.5" aria-label="brasa.ui, início"><span className="flex items-center gap-[3px]" aria-hidden="true"><span className="h-6 w-[5px] rounded-full bg-[#3d674b]"/><span className="h-5 w-[5px] rounded-full bg-[#c5d395]"/><span className="h-4 w-[5px] rounded-full bg-[#d3b68a]"/></span><span className="text-[17px] font-semibold tracking-[-.06em] text-[#263b2d]">brasa.ui</span></a>
        <div className="hidden items-center gap-6 md:flex">{links.map(link => <a key={link.href} href={link.href} className="text-[11px] text-[#66735f] transition-colors hover:text-[#285b43]">{link.label}</a>)}</div>
        <div className="ml-auto flex items-center gap-3"><button type="button" onClick={() => dialog.current?.showModal()} className="flex h-8 items-center gap-2 rounded-lg border border-[#e0e5d8] bg-white px-2.5 text-[#66735f]" aria-label="Buscar componentes"><Search size={13}/><span className="hidden text-[10px] lg:inline">Encontre um componente...</span><kbd className="hidden rounded border border-[#e4e9dd] px-1 text-[9px] lg:inline">⌘ K</kbd></button><a href="https://github.com/odouglasaraujo/brasa-ui" target="_blank" rel="noopener noreferrer" className="text-[#617355]" aria-label="brasa.ui no GitHub"><Github size={17}/></a><a href="/create" className="hidden h-8 items-center gap-1.5 rounded-lg bg-[#eaf0df] px-3 text-[10px] font-medium text-[#4e693c] sm:inline-flex"><Braces size={12}/> Criar com IA<ArrowUpRight size={12}/></a><button type="button" onClick={() => setOpen(!open)} className="p-1 text-[#617355] md:hidden" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="main-mobile-menu">{open ? <X size={19}/> : <Menu size={19}/>}</button></div>
      </nav>
      {open && <div id="main-mobile-menu" className="flex flex-col gap-4 border-t border-[#e4e8df] p-5 md:hidden">{[...links,{label:"Criar com IA",href:"/create"}].map(link => <a key={link.href} href={link.href} className="text-sm text-[#526448]" onClick={() => setOpen(false)}>{link.label}</a>)}</div>}
    </header>
    <dialog ref={dialog} aria-label="Buscar na biblioteca" className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-[#dfe5d7] bg-white p-0 text-[#263b2d] shadow-2xl backdrop:bg-[#263b2d]/30" onClick={event => { if(event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="flex items-center gap-3 border-b border-[#e4e8df] p-4"><Search size={17}/><input autoFocus aria-label="Nome do componente" value={query} onChange={event => setQuery(event.target.value)} placeholder="Busque por CPF, botão, Pix..." className="min-w-0 flex-1 bg-transparent text-sm outline-none"/><button type="button" onClick={() => dialog.current?.close()} aria-label="Fechar busca"><X size={18}/></button></div>
      <div className="max-h-[60vh] overflow-auto p-2">{results.length ? results.map(item => <a key={item.slug} href={`/componentes?component=${item.slug}`} className="block rounded-lg px-3 py-3 hover:bg-[#f0f4e9]"><span className="text-sm font-medium">{item.name}</span><p className="mt-1 text-xs text-[#66735f]">{item.description}</p></a>) : <p className="p-5 text-sm text-[#66735f]">Nenhum componente encontrado. Tente outro nome.</p>}</div>
      <p className="border-t border-[#e4e8df] px-5 py-3 text-[10px] text-[#66735f]">Tab para navegar · Enter para abrir · Esc para fechar</p>
    </dialog>
  </>;
}
