import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NexoIA — Agentes de IA para empresas brasileiras",
  description: "Automatize operações com agentes de IA que entendem o contexto brasileiro. Pix, NF-e, compliance, atendimento — tudo no piloto automático.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
