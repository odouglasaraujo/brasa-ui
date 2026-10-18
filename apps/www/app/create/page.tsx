import type { Metadata } from "next";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { DesignStudio } from "../components/design-studio";

export const metadata: Metadata = { title: "Criar contexto — brasa.ui", description: "Escolha uma direção visual brasileira e exporte tokens, regras de composição e contexto para sua IA." };

export default function CreatePage() {
  return <><Navbar /><main id="main-content" className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:px-12"><p className="font-mono text-[10px] uppercase tracking-widest text-emerald-700">ESTÚDIO BRASA.UI</p><h1 className="mt-4 text-4xl font-semibold tracking-tight">Seu próximo projeto começa com contexto.</h1><p className="mb-12 mt-4 max-w-2xl text-sm leading-7 text-neutral-500">Escolha a direção e a densidade. Explore a prévia e copie o contexto em Markdown ou JSON para orientar sua IA. Os dados da interface são demonstrativos.</p><DesignStudio builder /></main><Footer /></>;
}
