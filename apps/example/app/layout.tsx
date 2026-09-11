import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Checkout Demo — brasa.ui",
  description: "Exemplo de checkout brasileiro usando componentes brasa.ui",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-neutral-50 text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}
