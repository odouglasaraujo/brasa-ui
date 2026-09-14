import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doug — Product Designer",
  description: "Portfolio de product designer com +5 anos de experiência em design de interfaces digitais.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
