import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oficina Horizonte — Showcase brasa.ui",
  description: "Dashboard financeiro premium para pequena empresa brasileira construído com brasa.ui",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
