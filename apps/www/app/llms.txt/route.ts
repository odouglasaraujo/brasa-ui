export const dynamic = "force-static";

export function GET() {
  return new Response(`# brasa.ui

> Biblioteca brasileira de componentes React com contexto de design para IA.

## Comece aqui
- [Contexto de design em JSON](/ai/context.json): três direções visuais para um painel financeiro, com tokens, composição, estados e acessibilidade. Selecione apenas a direção relevante.
- [Criar contexto](/create): configure direção e densidade; exporte JSON ou Markdown.
- [Direções visuais](/directory): explore as direções disponíveis.
- [Componentes](/componentes): documentação visual dos componentes.
- [Instalação](/docs/installation): instalação da biblioteca e CLI.

## Código dos componentes usados no painel
- [Card](/r/styles/default/card.json)
- [Button](/r/styles/default/button.json)
- [Badge](/r/styles/default/badge.json)
- [Skeleton](/r/styles/default/skeleton.json)

## Regras
- Use português brasileiro e moeda BRL, com formato pt-BR.
- Use as APIs reais dos componentes; consulte os arquivos antes de gerar código.
- Os tokens exportados orientam o layout e a customização via className. Não constituem um tema automático da biblioteca.
- O painel é uma composição de referência com dados demonstrativos. Confirmação de pagamentos vem do backend.
`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
