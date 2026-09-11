import type { Metadata } from "next";
import { ComponentGallery } from "./gallery";

export const metadata: Metadata = {
  title: "Componentes — brasa.ui",
  description: "Todos os componentes da biblioteca brasa.ui com previews interativos e codigo pronto para copiar.",
};

export default function ComponentesPage() {
  return <ComponentGallery />;
}
