import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "brasa.ui — Design brasileiro. Contexto para IA.",
  description:
    "Biblioteca brasileira de componentes React com tokens, composições e contexto de design para IA. Explore direções visuais e exporte seu contexto.",
  metadataBase: new URL("https://brasa-ui.vercel.app"),
  openGraph: {
    title: "brasa.ui — Design brasileiro. Contexto para IA.",
    description:
      "Componentes, composições e decisões de design para criar produtos que entendem o Brasil. Sua IA também.",
    type: "website",
    locale: "pt_BR",
    siteName: "brasa.ui",
  },
  twitter: {
    card: "summary_large_image",
    title: "brasa.ui — Design brasileiro. Contexto para IA.",
    description:
      "CPF, Pix, CEP, boleto, parcelamento — componentes React prontos para produtos digitais brasileiros.",
  },
  keywords: [
    "react",
    "components",
    "brazil",
    "cpf",
    "pix",
    "cep",
    "ui",
    "typescript",
    "tailwindcss",
    "ai",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Geist+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
