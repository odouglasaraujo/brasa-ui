import { createDesignContext, directions } from "@/lib/design-context";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    schemaVersion: "1.0.0",
    description: "Contexto de design brasileiro. Escolha uma direção; consulte apenas os arquivos de componentes necessários para a tarefa.",
    contexts: directions.map((direction) => createDesignContext(direction.id)),
  });
}
