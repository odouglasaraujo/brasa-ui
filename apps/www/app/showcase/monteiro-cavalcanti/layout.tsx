import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monteiro & Cavalcanti — Advocacia empresarial",
  description: "Escritório de advocacia empresarial com atuação em direito societário, tributário, trabalhista e compliance.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
