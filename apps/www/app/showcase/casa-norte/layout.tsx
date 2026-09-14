import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Casa Norte — Checkout | Showcase brasa.ui",
  description: "Checkout de e-commerce brasileiro com Pix, cartao e boleto",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
