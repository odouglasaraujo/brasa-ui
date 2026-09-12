import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orion — Infraestrutura bancária moderna",
  description: "Plataforma de core banking, Pix e Open Finance para instituições financeiras.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
