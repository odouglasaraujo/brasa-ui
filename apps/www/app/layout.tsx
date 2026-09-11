import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "brasa.ui — Componentes brasileiros para a era da IA",
  description:
    "CPF, Pix, CEP, boleto, parcelamento — componentes React prontos para produtos digitais brasileiros. AI-ready.",
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
