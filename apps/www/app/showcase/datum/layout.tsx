import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datum — Governança de dados para a era da IA",
  description: "Plataforma de data governance que unifica catálogo, linhagem, qualidade e compliance em um só lugar. Feita para empresas data-driven.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
