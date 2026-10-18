import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { ComponentShowcase } from "./components/component-showcase";
import { ArrowRight, ArrowUpRight, Braces, Component, BookOpen } from "lucide-react";

export default function Home() {
  return <div className="brasa-home">
    <Navbar />
    <main id="main-content" className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
      <section className="home-hero">
        <a href="/docs/ai-context" className="hero-eyebrow"><span className="size-1.5 rounded-full bg-[#73934c]"/> RAÍZES BRASILEIRAS. NOVAS POSSIBILIDADES.<ArrowUpRight size={12}/></a>
        <h1>Interfaces com <span>alma brasileira.</span></h1>
        <p>Feita por brasileiros. Para quem constrói no Brasil.<br className="hidden sm:block"/> Componentes, código e contexto para criar produtos com a nossa cara.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3"><a href="/componentes" className="hero-primary">Explorar componentes<ArrowRight size={14}/></a><a href="/create" className="hero-secondary"><Braces size={15}/> Criar com IA</a></div>
        <div className="mt-5 flex items-center justify-center gap-3 text-[10px] text-[#66735f]"><span>React + TypeScript</span><span className="size-[3px] rounded-full bg-[#b9c2ad]"/><span>Código aberto</span><span className="size-[3px] rounded-full bg-[#b9c2ad]"/><span>Feito no Brasil</span></div>
      </section>
      <ComponentShowcase />
      <section className="grid gap-8 border-t border-[#e3e8dc] py-14 md:grid-cols-[1fr_1.4fr] md:gap-20"><div><p className="font-mono text-[10px] uppercase tracking-widest text-[#678151]">DO COMPONENTE À INTENÇÃO</p><h2 className="mt-3 text-[28px] font-medium leading-tight tracking-[-.04em]">Sua próxima interface<br/>já tem um bom começo.</h2><p className="mt-4 max-w-80 text-sm leading-6 text-[#66735f]">Uma biblioteca feita para quem cria. Com o repertório que sua IA precisa para criar junto.</p></div><div className="divide-y divide-[#e3e8dc]">{[{ icon: Component, title: "O Brasil está nos detalhes", description: "CPF, CEP, Pix e parcelamento, junto dos fundamentos de interface.", href: "/componentes" }, { icon: Braces, title: "Decisões que acompanham o código", description: "Tokens, hierarquia, estados e contexto para orientar sua IA.", href: "/docs/ai-context" }, { icon: BookOpen, title: "Um ponto de partida. Do seu jeito.", description: "Explore as APIs, personalize o visual e componha seu produto.", href: "/docs/installation" }].map(({ icon: Icon, title, description, href }) => <a key={href} href={href} className="group flex items-start gap-4 py-5 first:pt-0"><Icon size={18} className="mt-1 shrink-0 text-[#789164]"/><div><h3 className="text-sm font-medium">{title}</h3><p className="mt-1.5 text-xs leading-6 text-[#66735f]">{description}</p></div><ArrowUpRight size={15} className="ml-auto mt-1 shrink-0 text-[#93a381]"/></a>)}</div></section>
    </main><Footer/>
  </div>;
}
