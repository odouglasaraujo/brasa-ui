import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PagaFácil — Showcase brasa.ui",
  description: "Exemplo de fintech brasileira construída com componentes brasa.ui",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
