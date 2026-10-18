export const directions = [
  {
    id: "essencial",
    name: "Essencial",
    description: "Clareza para o dia a dia. Verde pontual, espaço para respirar e hierarquia direta.",
    useFor: "Produtos financeiros, gestão e operações de pequenas empresas.",
    tokens: { accent: "#047857", accentSoft: "#ecfdf5", canvas: "#fafaf9", surface: "#ffffff", text: "#171717", muted: "#525252", border: "#e5e5e5", radius: 12, spacing: 24, font: "sans-serif" },
  },
  {
    id: "preciso",
    name: "Preciso",
    description: "Mais informação, menos ruído. Azul profundo, geometria contida e ritmo compacto.",
    useFor: "Conciliação, análise de dados e operações com alta densidade de informação.",
    tokens: { accent: "#1d4ed8", accentSoft: "#eff6ff", canvas: "#f8fafc", surface: "#ffffff", text: "#0f172a", muted: "#475569", border: "#e2e8f0", radius: 6, spacing: 16, font: "sans-serif" },
  },
  {
    id: "editorial",
    name: "Editorial",
    description: "Uma presença mais humana. Tons de papel, títulos com serifa e ritmo generoso.",
    useFor: "Negócios criativos e serviços que pedem uma experiência mais acolhedora.",
    tokens: { accent: "#92400e", accentSoft: "#fef3c7", canvas: "#faf8f3", surface: "#fffefa", text: "#292524", muted: "#57534e", border: "#e7e2d8", radius: 16, spacing: 32, font: "Georgia, serif" },
  },
] as const;

export type DirectionId = (typeof directions)[number]["id"];
export type Density = "comfortable" | "compact";

export const financialComposition = {
  id: "painel-financeiro",
  name: "Painel financeiro",
  intent: "Ajudar uma pequena empresa brasileira a entender entradas, saídas e recebimentos pendentes.",
  useWhen: "O usuário precisa acompanhar o caixa e consultar movimentações recentes.",
  avoidWhen: "Para executar um pagamento isolado, prefira um fluxo de checkout com uma ação principal.",
  hierarchy: ["Período e título da página", "Saldo disponível, entradas e saídas", "Evolução das entradas", "Movimentações recentes com valor, método e situação"],
  layout: {
    desktop: "A partir de 1024px: navegação lateral, três indicadores, gráfico e lista de movimentações.",
    mobile: "Abaixo de 1024px: navegação compacta. Abaixo de 640px: indicadores empilhados e movimentações em lista, preservando valor e situação.",
  },
  rules: [
    "Use números tabulares e alinhe valores monetários à direita para facilitar comparação.",
    "Use a cor de destaque para seleção e foco. Sucesso, pendência e erro precisam de rótulos textuais e cores semânticas independentes.",
    "Dê mais destaque ao saldo do que aos indicadores secundários. Mantenha uma única ação principal por seção.",
    "Apresente o período junto dos indicadores. Compare variações apenas entre períodos equivalentes.",
    "Em gráficos, disponibilize também os dados em texto ou tabela acessível.",
  ],
  states: {
    loading: "Preserve as dimensões dos indicadores e da lista com Skeleton. Anuncie o carregamento com aria-busy.",
    empty: "Mostre 'Nenhuma movimentação neste período' e uma opção para alterar o período. Diferencie ausência de dados de saldo zero.",
    error: "Explique a falha na consulta e ofereça tentar novamente. Nunca substitua uma falha por valores zerados.",
    success: "Exiba valores, período e situação. Confirmação financeira deve vir do backend.",
  },
  components: ["Card", "CardContent", "Button", "Badge", "Skeleton"],
  componentSources: ["/r/styles/default/card.json", "/r/styles/default/button.json", "/r/styles/default/badge.json", "/r/styles/default/skeleton.json"],
};

export const brazilianContext = {
  locale: "pt-BR",
  currency: "BRL",
  money: "Formate com Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }). Para as APIs monetárias do brasa.ui, use reais (149.90), não centavos.",
  dates: "Exiba datas como dd/MM/aaaa e declare o fuso do produto. Converta timestamps para o fuso configurado antes de agrupar por dia.",
  language: "Use português brasileiro, frases curtas e ações específicas: 'Copiar código Pix', 'Ver movimentações'.",
  payments: "Diferencie Pix, boleto e cartão por texto. PixPayment é uma interface; geração de cobrança e confirmação pertencem ao backend/PSP.",
  privacy: "Em listas e resumos, mascare CPF, CNPJ e chaves Pix quando não for necessário mostrar o documento completo.",
};

export function getDirection(id: string) {
  return directions.find((direction) => direction.id === id) ?? directions[0];
}

export function createDesignContext(id: string = "essencial", density: Density = "comfortable") {
  const direction = getDirection(id);
  return {
    schemaVersion: "1.0.0",
    library: "brasa.ui",
    scope: "Biblioteca brasileira de componentes React com contexto de design para IA.",
    direction: { id: direction.id, name: direction.name, useFor: direction.useFor },
    tokens: {
      ...direction.tokens,
      density,
      contentPadding: density === "compact" ? 16 : direction.tokens.spacing,
      rowMinHeight: density === "compact" ? 44 : 56,
      typography: { body: 14, label: 12, title: 24, metric: 28, lineHeight: 1.5 },
      semantic: { success: "#047857", pending: "#92400e", error: "#b91c1c" },
    },
    composition: financialComposition,
    brazil: brazilianContext,
    accessibility: [
      "Mantenha contraste WCAG AA: 4,5:1 para texto normal e 3:1 para texto grande e elementos de interface.",
      "Use landmarks, títulos em ordem, foco visível e rótulos acessíveis. Todas as ações devem funcionar pelo teclado.",
      "Respeite prefers-reduced-motion. Nunca comunique situação apenas por cor.",
    ],
    implementation: {
      stack: ["React", "TypeScript", "Tailwind CSS"],
      importFrom: "brasa.ui",
      instructions: "Os tokens são diretrizes de composição. Aplique-os ao layout e customize os componentes com className; eles não são um tema aplicado automaticamente pela biblioteca. Consulte os arquivos do registry para as APIs reais antes de gerar código.",
      example: 'import { Card, CardContent } from "brasa.ui";\n\n<Card>\n  <CardContent>\n    <p>Saldo disponível</p>\n    <p className="text-3xl font-semibold tabular-nums">\n      {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(24850.90)}\n    </p>\n  </CardContent>\n</Card>',
    },
  };
}

export function contextAsMarkdown(context: ReturnType<typeof createDesignContext>) {
  return [
    `# brasa.ui — ${context.direction.name}`,
    context.scope,
    "## Direção visual", context.direction.useFor,
    "## Tokens", "```json", JSON.stringify(context.tokens, null, 2), "```",
    "## Composição", context.composition.intent,
    `Quando usar: ${context.composition.useWhen}`, `Quando evitar: ${context.composition.avoidWhen}`,
    "### Hierarquia", ...context.composition.hierarchy.map((rule, index) => `${index + 1}. ${rule}`),
    "### Layout", ...Object.values(context.composition.layout),
    "### Regras", ...context.composition.rules.map((rule) => `- ${rule}`),
    "### Estados", ...Object.entries(context.composition.states).map(([state, rule]) => `- ${state}: ${rule}`),
    "## Contexto brasileiro", ...Object.entries(context.brazil).map(([key, value]) => `- ${key}: ${value}`),
    "## Acessibilidade", ...context.accessibility.map((rule) => `- ${rule}`),
    "## Implementação", `Stack: ${context.implementation.stack.join(", ")}.`, context.implementation.instructions,
    `Componentes: ${context.composition.components.join(", ")}.`,
    ...context.composition.componentSources.map((source) => `- ${source} (relativo à origem do site brasa.ui)`),
    "```tsx", context.implementation.example, "```",
  ].join("\n\n");
}
