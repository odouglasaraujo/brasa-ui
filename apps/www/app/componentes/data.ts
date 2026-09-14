export type ComponentCategory = "core" | "brazil" | "payments";

export interface ComponentDoc {
  slug: string;
  name: string;
  description: string;
  category: ComponentCategory;
  tags: string[];
  importPath: string;
  propsTable: { name: string; type: string; default: string; description: string }[];
  codeExample: string;
  aiContext?: string;
}

export const CATEGORY_LABELS: Record<ComponentCategory, string> = {
  core: "Core",
  brazil: "Brasil",
  payments: "Pagamentos",
};

export const CATEGORY_COLORS: Record<ComponentCategory, { bg: string; text: string; border: string; dot: string }> = {
  core: { bg: "bg-neutral-50", text: "text-neutral-700", border: "border-neutral-200", dot: "bg-neutral-400" },
  brazil: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
  payments: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", dot: "bg-blue-500" },
};

export const COMPONENTS: ComponentDoc[] = [
  // ── Core ──
  {
    slug: "button",
    name: "Button",
    description: "Botao com variantes, tamanhos e estados de loading.",
    category: "core",
    tags: ["botao", "acao", "form", "submit"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "variant", type: '"default" | "primary" | "outline" | "ghost" | "destructive" | "link"', default: '"default"', description: "Estilo visual do botao" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Tamanho do botao" },
      { name: "loading", type: "boolean", default: "false", description: "Exibe spinner de carregamento" },
      { name: "disabled", type: "boolean", default: "false", description: "Desabilita o botao" },
    ],
    codeExample: `import { Button } from "brasa.ui";

<Button variant="primary" size="md">
  Continuar
</Button>

<Button variant="outline" disabled>
  Desabilitado
</Button>`,
  },
  {
    slug: "input",
    name: "Input",
    description: "Campo de texto com label, erro e hint integrados.",
    category: "core",
    tags: ["input", "texto", "form", "campo"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "label", type: "string", default: "-", description: "Label do campo" },
      { name: "error", type: "string", default: "-", description: "Mensagem de erro" },
      { name: "hint", type: "string", default: "-", description: "Texto de ajuda" },
    ],
    codeExample: `import { Input } from "brasa.ui";

<Input
  label="Nome completo"
  placeholder="Digite seu nome"
  hint="Como aparece no documento"
/>`,
  },
  {
    slug: "textarea",
    name: "Textarea",
    description: "Area de texto multi-linha com suporte a label e validacao.",
    category: "core",
    tags: ["textarea", "texto", "form", "multi-linha"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "label", type: "string", default: "-", description: "Label do campo" },
      { name: "error", type: "string", default: "-", description: "Mensagem de erro" },
      { name: "hint", type: "string", default: "-", description: "Texto de ajuda" },
    ],
    codeExample: `import { Textarea } from "brasa.ui";

<Textarea
  label="Observacoes"
  placeholder="Escreva aqui..."
  hint="Maximo de 500 caracteres"
/>`,
  },
  {
    slug: "select",
    name: "Select",
    description: "Seletor dropdown com opcoes tipadas.",
    category: "core",
    tags: ["select", "dropdown", "opcoes", "form"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "options", type: "SelectOption[]", default: "[]", description: "Lista de opcoes" },
      { name: "label", type: "string", default: "-", description: "Label do campo" },
      { name: "placeholder", type: "string", default: "-", description: "Placeholder" },
      { name: "error", type: "string", default: "-", description: "Mensagem de erro" },
    ],
    codeExample: `import { Select } from "brasa.ui";

<Select
  label="Tipo de conta"
  options={[
    { value: "pf", label: "Pessoa Fisica" },
    { value: "pj", label: "Pessoa Juridica" },
  ]}
/>`,
  },
  {
    slug: "card",
    name: "Card",
    description: "Container com borda e sombra para agrupar conteudo.",
    category: "core",
    tags: ["card", "container", "painel", "box"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "children", type: "ReactNode", default: "-", description: "Conteudo do card" },
      { name: "className", type: "string", default: "-", description: "Classes CSS adicionais" },
    ],
    codeExample: `import { Card, CardHeader, CardContent } from "brasa.ui";

<Card>
  <CardHeader>
    <h3>Resumo do pedido</h3>
  </CardHeader>
  <CardContent>
    <p>3 itens - R$ 679,70</p>
  </CardContent>
</Card>`,
  },
  {
    slug: "badge",
    name: "Badge",
    description: "Etiqueta pequena para status, contadores e categorias.",
    category: "core",
    tags: ["badge", "tag", "status", "label"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "variant", type: '"default" | "success" | "warning" | "error" | "info"', default: '"default"', description: "Estilo visual" },
    ],
    codeExample: `import { Badge } from "brasa.ui";

<Badge variant="success">Aprovado</Badge>
<Badge variant="warning">Pendente</Badge>
<Badge variant="error">Recusado</Badge>`,
  },
  {
    slug: "alert",
    name: "Alert",
    description: "Caixa de alerta para mensagens de feedback ao usuario.",
    category: "core",
    tags: ["alert", "aviso", "feedback", "notificacao"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "variant", type: '"default" | "success" | "warning" | "error" | "info"', default: '"default"', description: "Tipo do alerta" },
      { name: "title", type: "string", default: "-", description: "Titulo do alerta" },
      { name: "dismissible", type: "boolean", default: "false", description: "Permite fechar o alerta" },
      { name: "onDismiss", type: "() => void", default: "-", description: "Callback ao fechar" },
    ],
    codeExample: `import { Alert } from "brasa.ui";

<Alert variant="success" title="Pagamento confirmado">
  Seu pedido foi processado com sucesso.
</Alert>

<Alert variant="error" title="CPF invalido" dismissible>
  Verifique o numero digitado.
</Alert>`,
  },
  {
    slug: "dialog",
    name: "Dialog",
    description: "Modal dialog com overlay, ESC para fechar e acessibilidade.",
    category: "core",
    tags: ["dialog", "modal", "popup", "overlay"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "open", type: "boolean", default: "-", description: "Controla visibilidade" },
      { name: "onClose", type: "() => void", default: "-", description: "Callback ao fechar" },
    ],
    codeExample: `import { Dialog, DialogHeader, DialogContent, DialogFooter } from "brasa.ui";

<Dialog open={open} onClose={() => setOpen(false)}>
  <DialogHeader>
    <h3>Confirmar acao</h3>
  </DialogHeader>
  <DialogContent>
    <p>Tem certeza que deseja continuar?</p>
  </DialogContent>
  <DialogFooter>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
    <Button>Confirmar</Button>
  </DialogFooter>
</Dialog>`,
  },
  {
    slug: "tabs",
    name: "Tabs",
    description: "Navegacao por abas com suporte a controlado/nao controlado.",
    category: "core",
    tags: ["tabs", "abas", "navegacao", "panel"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "defaultValue", type: "string", default: "-", description: "Aba ativa inicial" },
      { name: "value", type: "string", default: "-", description: "Aba ativa (controlado)" },
      { name: "onChange", type: "(value: string) => void", default: "-", description: "Callback de mudanca" },
    ],
    codeExample: `import { Tabs, TabList, TabTrigger, TabContent } from "brasa.ui";

<Tabs defaultValue="pix">
  <TabList>
    <TabTrigger value="pix">Pix</TabTrigger>
    <TabTrigger value="cartao">Cartao</TabTrigger>
    <TabTrigger value="boleto">Boleto</TabTrigger>
  </TabList>
  <TabContent value="pix">Pague com Pix...</TabContent>
  <TabContent value="cartao">Pague com cartao...</TabContent>
</Tabs>`,
  },
  {
    slug: "accordion",
    name: "Accordion",
    description: "Paineis expansiveis single ou multiple com animacao.",
    category: "core",
    tags: ["accordion", "expansivel", "faq", "collapse"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "type", type: '"single" | "multiple"', default: '"single"', description: "Modo de abertura" },
      { name: "defaultOpen", type: "string[]", default: "[]", description: "Itens abertos inicialmente" },
    ],
    codeExample: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "brasa.ui";

<Accordion type="single">
  <AccordionItem value="faq-1">
    <AccordionTrigger value="faq-1">O que e o Pix?</AccordionTrigger>
    <AccordionContent value="faq-1">
      Pix e o sistema de pagamentos instantaneos do Banco Central.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
  },
  {
    slug: "switch",
    name: "Switch",
    description: "Toggle on/off com label e descricao.",
    category: "core",
    tags: ["switch", "toggle", "on-off", "form"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "checked", type: "boolean", default: "-", description: "Estado controlado" },
      { name: "defaultChecked", type: "boolean", default: "false", description: "Estado inicial" },
      { name: "onChange", type: "(checked: boolean) => void", default: "-", description: "Callback de mudanca" },
      { name: "label", type: "string", default: "-", description: "Label do switch" },
      { name: "description", type: "string", default: "-", description: "Descricao auxiliar" },
    ],
    codeExample: `import { Switch } from "brasa.ui";

<Switch
  label="Notificacoes por email"
  description="Receba atualizacoes sobre seus pedidos"
  defaultChecked
/>`,
  },
  {
    slug: "avatar",
    name: "Avatar",
    description: "Imagem de perfil com fallback para iniciais.",
    category: "core",
    tags: ["avatar", "perfil", "imagem", "usuario"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "src", type: "string", default: "-", description: "URL da imagem" },
      { name: "fallback", type: "string", default: "-", description: "Nome para gerar iniciais (fallback)" },
      { name: "size", type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: "Tamanho do avatar" },
    ],
    codeExample: `import { Avatar } from "brasa.ui";

<Avatar fallback="Maria Silva" size="lg" />
<Avatar src="/foto.jpg" alt="Joao" size="md" />`,
  },
  {
    slug: "separator",
    name: "Separator",
    description: "Divisor horizontal ou vertical com label opcional.",
    category: "core",
    tags: ["separator", "divisor", "linha", "hr"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direcao do divisor" },
      { name: "label", type: "string", default: "-", description: "Texto no centro do divisor" },
    ],
    codeExample: `import { Separator } from "brasa.ui";

<Separator />
<Separator label="ou" />
<Separator orientation="vertical" />`,
  },
  {
    slug: "dropdown",
    name: "Dropdown",
    description: "Menu dropdown com itens, icones e acoes.",
    category: "core",
    tags: ["dropdown", "menu", "contexto", "acoes"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "trigger", type: "ReactNode", default: "-", description: "Elemento que abre o menu" },
      { name: "items", type: "DropdownItem[]", default: "[]", description: "Itens do menu" },
      { name: "onSelect", type: "(value: string) => void", default: "-", description: "Callback de selecao" },
      { name: "align", type: '"left" | "right"', default: '"left"', description: "Alinhamento do menu" },
    ],
    codeExample: `import { Dropdown } from "brasa.ui";

<Dropdown
  trigger={<Button variant="ghost">Acoes</Button>}
  items={[
    { label: "Editar", value: "edit" },
    { label: "Duplicar", value: "duplicate" },
    { label: "Excluir", value: "delete", danger: true },
  ]}
  onSelect={(action) => console.log(action)}
/>`,
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    description: "Dica flutuante ao passar o mouse sobre um elemento.",
    category: "core",
    tags: ["tooltip", "dica", "hover", "info"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "content", type: "string", default: "-", description: "Texto do tooltip" },
      { name: "position", type: '"top" | "bottom" | "left" | "right"', default: '"top"', description: "Posicao do tooltip" },
      { name: "delay", type: "number", default: "200", description: "Delay em ms para exibir" },
    ],
    codeExample: `import { Tooltip } from "brasa.ui";

<Tooltip content="Copiar para a area de transferencia">
  <Button variant="ghost">Copiar</Button>
</Tooltip>`,
  },

  // ── Brazil ──
  {
    slug: "cpf-input",
    name: "CPFInput",
    description: "Input com mascara e validacao mod11 para CPF.",
    category: "brazil",
    tags: ["cpf", "documento", "identidade", "form", "mascara"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "value", type: "string", default: "-", description: "Digitos do CPF (controlado)" },
      { name: "onChange", type: "(value: string, isValid: boolean) => void", default: "-", description: "Callback com digitos e validacao" },
      { name: "label", type: "string", default: '"CPF"', description: "Label do campo" },
      { name: "showValidation", type: "boolean", default: "true", description: "Mostra feedback visual" },
    ],
    codeExample: `import { CPFInput } from "brasa.ui";

<CPFInput
  label="CPF"
  onChange={(value, isValid) => {
    console.log(value);   // "12345678909"
    console.log(isValid); // true | false
  }}
/>`,
    aiContext: "CPF (Cadastro de Pessoas Fisicas) e obrigatorio em praticamente todas as transacoes no Brasil. A mascara e ###.###.###-## e a validacao usa algoritmo mod11.",
  },
  {
    slug: "cnpj-input",
    name: "CNPJInput",
    description: "Input com mascara e validacao para CNPJ de empresas.",
    category: "brazil",
    tags: ["cnpj", "empresa", "documento", "form", "mascara"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "value", type: "string", default: "-", description: "Digitos do CNPJ (controlado)" },
      { name: "onChange", type: "(value: string, isValid: boolean) => void", default: "-", description: "Callback com digitos e validacao" },
      { name: "label", type: "string", default: "-", description: "Label do campo" },
      { name: "showValidation", type: "boolean", default: "true", description: "Mostra feedback visual" },
    ],
    codeExample: `import { CNPJInput } from "brasa.ui";

<CNPJInput
  label="CNPJ"
  onChange={(value, isValid) => {
    console.log(value);   // "11222333000181"
    console.log(isValid); // true | false
  }}
/>`,
    aiContext: "CNPJ (Cadastro Nacional da Pessoa Juridica) identifica empresas brasileiras. A mascara e ##.###.###/####-## com validacao mod11 usando dois digitos verificadores.",
  },
  {
    slug: "cep-input",
    name: "CEPInput",
    description: "Input de CEP com busca automatica de endereco via ViaCEP.",
    category: "brazil",
    tags: ["cep", "endereco", "viacep", "form", "mascara"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "value", type: "string", default: "-", description: "Digitos do CEP (controlado)" },
      { name: "onChange", type: "(value: string) => void", default: "-", description: "Callback com digitos" },
      { name: "onAddressFound", type: "(address: CEPAddress) => void", default: "-", description: "Callback com endereco completo" },
      { name: "label", type: "string", default: '"CEP"', description: "Label do campo" },
    ],
    codeExample: `import { CEPInput } from "brasa.ui";

<CEPInput
  label="CEP"
  onAddressFound={(address) => {
    // { cep, logradouro, bairro, cidade, uf }
    setCity(address.cidade);
    setState(address.uf);
  }}
/>`,
    aiContext: "CEP (Codigo de Enderecamento Postal) tem formato #####-### e pode ser consultado na API ViaCEP para preenchimento automatico de endereco — padrao em e-commerces brasileiros.",
  },
  {
    slug: "phone-br",
    name: "PhoneBR",
    description: "Input para telefone brasileiro com mascara DDD + numero.",
    category: "brazil",
    tags: ["telefone", "phone", "ddd", "form", "mascara"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "value", type: "string", default: "-", description: "Digitos do telefone (controlado)" },
      { name: "onChange", type: "(value: string) => void", default: "-", description: "Callback com digitos" },
      { name: "label", type: "string", default: '"Telefone"', description: "Label do campo" },
    ],
    codeExample: `import { PhoneBR } from "brasa.ui";

<PhoneBR
  label="WhatsApp"
  onChange={(value) => {
    console.log(value); // "11999887766"
  }}
/>`,
    aiContext: "Telefones brasileiros usam DDD (2 digitos) + numero (8-9 digitos). Celulares com 9 digitos comecam com 9. Mascara: (##) ####-#### ou (##) #####-####.",
  },
  {
    slug: "currency-brl",
    name: "CurrencyBRL",
    description: "Input monetario com formatacao em Real (R$).",
    category: "brazil",
    tags: ["moeda", "real", "brl", "dinheiro", "form"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "value", type: "string", default: "-", description: "Valor em centavos (controlado)" },
      { name: "onChange", type: "(value: string) => void", default: "-", description: "Callback com centavos" },
      { name: "label", type: "string", default: "-", description: "Label do campo" },
    ],
    codeExample: `import { CurrencyBRL } from "brasa.ui";

<CurrencyBRL
  label="Valor"
  onChange={(centavos) => {
    console.log(centavos); // "14990" = R$ 149,90
  }}
/>`,
    aiContext: "O Real (R$) usa ponto como separador de milhares e virgula para decimais: R$ 1.299,90. O input trabalha internamente com centavos.",
  },
  {
    slug: "state-select",
    name: "StateSelect",
    description: "Seletor de estado brasileiro (UF) com todos os 27 estados.",
    category: "brazil",
    tags: ["estado", "uf", "form", "endereco"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "format", type: '"code" | "name" | "both"', default: '"both"', description: "Formato de exibicao" },
      { name: "label", type: "string", default: "-", description: "Label do campo" },
      { name: "placeholder", type: "string", default: '"Selecione o estado"', description: "Placeholder" },
    ],
    codeExample: `import { StateSelect } from "brasa.ui";

<StateSelect
  label="Estado"
  format="both"
  onChange={(e) => setUf(e.target.value)}
/>`,
    aiContext: "O Brasil tem 26 estados + Distrito Federal, identificados por siglas de 2 letras (SP, RJ, MG...). Obrigatorio em enderecos e formularios de cadastro.",
  },

  // ── Core — Visual/Landing ──
  {
    slug: "marquee",
    name: "Marquee",
    description: "Scroll infinito para depoimentos, logos e conteudo repetitivo.",
    category: "core",
    tags: ["marquee", "scroll", "infinito", "logos", "depoimentos", "animacao"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "reverse", type: "boolean", default: "false", description: "Inverte a direcao" },
      { name: "pauseOnHover", type: "boolean", default: "false", description: "Pausa ao passar o mouse" },
      { name: "vertical", type: "boolean", default: "false", description: "Scroll vertical" },
      { name: "repeat", type: "number", default: "4", description: "Repeticoes do conteudo" },
      { name: "duration", type: "string", default: '"40s"', description: "Duracao de um ciclo" },
    ],
    codeExample: `import { Marquee } from "brasa.ui";

<Marquee pauseOnHover duration="20s">
  <img src="/logo1.svg" />
  <img src="/logo2.svg" />
  <img src="/logo3.svg" />
</Marquee>`,
  },
  {
    slug: "number-ticker",
    name: "NumberTicker",
    description: "Contador animado que conta ao entrar na tela. Usa Intl.NumberFormat.",
    category: "core",
    tags: ["numero", "contador", "animacao", "stats", "metricas"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "value", type: "number", default: "-", description: "Numero alvo" },
      { name: "direction", type: '"up" | "down"', default: '"up"', description: "Direcao da contagem" },
      { name: "duration", type: "number", default: "2000", description: "Duracao em ms" },
      { name: "locale", type: "string", default: '"pt-BR"', description: "Locale para formatacao" },
    ],
    codeExample: `import { NumberTicker } from "brasa.ui";

<NumberTicker value={12847} />
<NumberTicker value={99.9} formatOptions={{ minimumFractionDigits: 1 }} />`,
  },
  {
    slug: "animated-list",
    name: "AnimatedList",
    description: "Lista com itens que aparecem um a um com animacao suave.",
    category: "core",
    tags: ["lista", "animacao", "notificacao", "feed"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "children", type: "ReactElement[]", default: "-", description: "Itens da lista" },
      { name: "delay", type: "number", default: "1000", description: "Delay entre itens em ms" },
    ],
    codeExample: `import { AnimatedList } from "brasa.ui";

<AnimatedList delay={800}>
  <div>Notificacao 1</div>
  <div>Notificacao 2</div>
  <div>Notificacao 3</div>
</AnimatedList>`,
  },
  {
    slug: "bento-grid",
    name: "BentoGrid",
    description: "Layout grid moderno com cards de destaque. Ideal para features.",
    category: "core",
    tags: ["bento", "grid", "layout", "features", "landing"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "columns", type: "2 | 3 | 4", default: "3", description: "Numero de colunas" },
      { name: "title", type: "string", default: "-", description: "Titulo do card (BentoCard)" },
      { name: "description", type: "string", default: "-", description: "Descricao (BentoCard)" },
      { name: "span", type: "1 | 2", default: "1", description: "Colunas que o card ocupa" },
    ],
    codeExample: `import { BentoGrid, BentoCard } from "brasa.ui";

<BentoGrid columns={3}>
  <BentoCard title="Feature 1" description="Descricao..." span={2} />
  <BentoCard title="Feature 2" description="Descricao..." />
  <BentoCard title="Feature 3" description="Descricao..." />
</BentoGrid>`,
  },
  {
    slug: "avatar-circles",
    name: "AvatarCircles",
    description: "Grupo de avatares sobrepostos com contador de excedentes.",
    category: "core",
    tags: ["avatar", "grupo", "time", "usuarios", "fotos"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "avatars", type: "AvatarCircle[]", default: "-", description: "Lista de avatares com src e alt" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Tamanho dos avatares" },
      { name: "max", type: "number", default: "5", description: "Maximo de avatares visiveis" },
    ],
    codeExample: `import { AvatarCircles } from "brasa.ui";

<AvatarCircles
  avatars={[
    { src: "/user1.jpg", alt: "Maria" },
    { src: "/user2.jpg", alt: "Joao" },
    { src: "/user3.jpg", alt: "Ana" },
  ]}
  max={3}
/>`,
  },
  {
    slug: "border-beam",
    name: "BorderBeam",
    description: "Efeito de feixe animado na borda de um container. Puro CSS.",
    category: "core",
    tags: ["borda", "beam", "efeito", "animacao", "glow"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "size", type: "number", default: "200", description: "Tamanho do feixe em px" },
      { name: "duration", type: "number", default: "12", description: "Duracao do ciclo em segundos" },
      { name: "colorFrom", type: "string", default: '"#059669"', description: "Cor inicial do gradiente" },
      { name: "colorTo", type: "string", default: '"#eab308"', description: "Cor final do gradiente" },
    ],
    codeExample: `import { BorderBeam } from "brasa.ui";

<div className="relative rounded-xl border p-6">
  <BorderBeam colorFrom="#059669" colorTo="#eab308" />
  <p>Conteudo com borda animada</p>
</div>`,
  },
  {
    slug: "shimmer-button",
    name: "ShimmerButton",
    description: "Botao CTA com efeito shimmer rotativo na borda. Zero deps.",
    category: "core",
    tags: ["botao", "shimmer", "glow", "cta", "animacao"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "shimmerColor", type: "string", default: '"#059669"', description: "Cor do shimmer" },
      { name: "shimmerDuration", type: "string", default: '"2.5s"', description: "Velocidade da animacao" },
      { name: "background", type: "string", default: '"rgba(0,0,0,0.9)"', description: "Cor de fundo" },
    ],
    codeExample: `import { ShimmerButton } from "brasa.ui";

<ShimmerButton shimmerColor="#059669">
  Comecar agora
</ShimmerButton>`,
  },
  {
    slug: "magic-card",
    name: "MagicCard",
    description: "Card com spotlight que segue o cursor do mouse.",
    category: "core",
    tags: ["card", "spotlight", "hover", "mouse", "gradiente"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "gradientSize", type: "number", default: "250", description: "Raio do spotlight em px" },
      { name: "gradientColor", type: "string", default: '"#059669"', description: "Cor do spotlight" },
      { name: "gradientOpacity", type: "number", default: "0.15", description: "Opacidade (0-1)" },
    ],
    codeExample: `import { MagicCard } from "brasa.ui";

<MagicCard gradientColor="#059669">
  <div className="p-6">
    <h3>Passe o mouse</h3>
    <p>Efeito de spotlight interativo</p>
  </div>
</MagicCard>`,
  },
  {
    slug: "typing-animation",
    name: "TypingAnimation",
    description: "Efeito de digitacao (typewriter) com cursor piscante.",
    category: "core",
    tags: ["typing", "digitacao", "typewriter", "animacao", "texto"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "text", type: "string", default: "-", description: "Texto a ser digitado" },
      { name: "duration", type: "number", default: "60", description: "Delay entre caracteres em ms" },
      { name: "cursor", type: "boolean", default: "true", description: "Mostra cursor piscante" },
      { name: "loop", type: "boolean", default: "false", description: "Repete a animacao" },
    ],
    codeExample: `import { TypingAnimation } from "brasa.ui";

<TypingAnimation
  text="Componentes brasileiros para a era da IA"
  duration={50}
/>`,
  },
  {
    slug: "dot-pattern",
    name: "DotPattern",
    description: "Padrao de pontos SVG para backgrounds decorativos.",
    category: "core",
    tags: ["background", "pontos", "padrao", "decorativo", "svg"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "width", type: "number", default: "16", description: "Espacamento horizontal" },
      { name: "height", type: "number", default: "16", description: "Espacamento vertical" },
      { name: "radius", type: "number", default: "1", description: "Raio dos pontos" },
    ],
    codeExample: `import { DotPattern } from "brasa.ui";

<div className="relative h-64">
  <DotPattern />
  <div className="relative z-10">Conteudo sobre os pontos</div>
</div>`,
  },
  {
    slug: "retro-grid",
    name: "RetroGrid",
    description: "Grid perspectiva retro-futurista para backgrounds de hero.",
    category: "core",
    tags: ["background", "grid", "retro", "perspectiva", "hero"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "angle", type: "number", default: "65", description: "Angulo de perspectiva" },
      { name: "lineColor", type: "string", default: '"rgba(0,0,0,0.08)"', description: "Cor das linhas" },
    ],
    codeExample: `import { RetroGrid } from "brasa.ui";

<div className="relative h-96 overflow-hidden">
  <RetroGrid />
  <div className="relative z-10">Hero content</div>
</div>`,
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    description: "Placeholder de loading com animacao pulse. Inclui SkeletonGroup.",
    category: "core",
    tags: ["skeleton", "loading", "placeholder", "carregando"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "variant", type: '"text" | "circular" | "rectangular"', default: '"text"', description: "Formato" },
      { name: "width", type: "string | number", default: "-", description: "Largura" },
      { name: "height", type: "string | number", default: "-", description: "Altura" },
      { name: "lines", type: "number", default: "3", description: "Linhas (SkeletonGroup)" },
      { name: "avatar", type: "boolean", default: "false", description: "Mostra avatar (SkeletonGroup)" },
    ],
    codeExample: `import { Skeleton, SkeletonGroup } from "brasa.ui";

<Skeleton variant="text" />
<Skeleton variant="circular" width={40} height={40} />
<SkeletonGroup lines={3} avatar />`,
  },
  {
    slug: "progress",
    name: "Progress",
    description: "Barra de progresso com shimmer e variante de steps.",
    category: "core",
    tags: ["progresso", "barra", "steps", "etapas", "loading"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "value", type: "number", default: "-", description: "Valor atual" },
      { name: "max", type: "number", default: "100", description: "Valor maximo" },
      { name: "variant", type: '"default" | "success" | "warning" | "danger"', default: '"default"', description: "Variante visual" },
      { name: "showLabel", type: "boolean", default: "false", description: "Mostra percentual" },
      { name: "steps", type: "string[]", default: "-", description: "Labels dos steps (StepProgress)" },
      { name: "currentStep", type: "number", default: "-", description: "Step atual (StepProgress)" },
    ],
    codeExample: `import { Progress, StepProgress } from "brasa.ui";

<Progress value={65} showLabel variant="default" />
<StepProgress steps={["Dados", "Pagamento", "Confirmacao"]} currentStep={1} />`,
  },

  // ── Brazil — New ──
  {
    slug: "pix-key-input",
    name: "PIXKeyInput",
    description: "Input inteligente para chave Pix com deteccao automatica do tipo.",
    category: "brazil",
    tags: ["pix", "chave", "cpf", "email", "telefone", "uuid"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "value", type: "string", default: "-", description: "Valor controlado" },
      { name: "onChange", type: "(value: string, keyType: PixKeyType) => void", default: "-", description: "Callback com valor e tipo detectado" },
      { name: "label", type: "string", default: '"Chave Pix"', description: "Label do campo" },
      { name: "showKeyType", type: "boolean", default: "true", description: "Mostra badge com tipo detectado" },
    ],
    codeExample: `import { PIXKeyInput } from "brasa.ui";

<PIXKeyInput
  label="Chave Pix"
  onChange={(value, type) => {
    console.log(type); // "cpf" | "email" | "phone" | "cnpj" | "random"
  }}
/>`,
    aiContext: "Chaves Pix podem ser CPF, CNPJ, e-mail, telefone ou UUID aleatorio. O componente detecta o tipo automaticamente enquanto o usuario digita e aplica a mascara correta.",
  },

  // ── Payments ──
  {
    slug: "pix-payment",
    name: "PixPayment",
    description: "Componente completo de pagamento Pix com QR code, copia-e-cola e estados.",
    category: "payments",
    tags: ["pix", "pagamento", "qrcode", "transferencia"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "pixCode", type: "string", default: "-", description: "Codigo Pix copia-e-cola" },
      { name: "amount", type: "number", default: "-", description: "Valor em reais" },
      { name: "status", type: '"idle" | "qr_generated" | "waiting_payment" | "paid" | "expired" | "failed"', default: '"idle"', description: "Status do pagamento" },
      { name: "beneficiary", type: "string", default: "-", description: "Nome do beneficiario" },
    ],
    codeExample: `import { PixPayment } from "brasa.ui";

<PixPayment
  pixCode="00020126580014br.gov.bcb.pix..."
  amount={149.90}
  status="qr_generated"
  beneficiary="Loja Exemplo"
/>`,
    aiContext: "Pix e o sistema de pagamentos instantaneos do Banco Central do Brasil, lancado em 2020. Ja e o meio de pagamento mais usado no Brasil, superando cartoes e boletos.",
  },
  {
    slug: "installment-select",
    name: "InstallmentSelect",
    description: "Seletor de parcelamento com calculo de juros e badges.",
    category: "payments",
    tags: ["parcelamento", "parcela", "cartao", "juros"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "amount", type: "number", default: "-", description: "Valor total em centavos" },
      { name: "maxInstallments", type: "number", default: "12", description: "Maximo de parcelas" },
      { name: "freeInstallments", type: "number", default: "3", description: "Parcelas sem juros" },
      { name: "interestRate", type: "number", default: "1.99", description: "Taxa de juros mensal (%)" },
    ],
    codeExample: `import { InstallmentSelect } from "brasa.ui";

<InstallmentSelect
  amount={67970}
  maxInstallments={12}
  freeInstallments={3}
  interestRate={1.99}
  onChange={(option) => {
    console.log(option.installments); // 3
    console.log(option.value);        // "3x de R$ 226,57"
  }}
/>`,
    aiContext: "Parcelamento e parte central do e-commerce brasileiro. A maioria dos produtos e comprada parcelada. 'Sem juros' e o principal atrativo de promocoes.",
  },
  {
    slug: "boleto-display",
    name: "BoletoDisplay",
    description: "Exibicao de boleto bancario com codigo de barras e copia-e-cola.",
    category: "payments",
    tags: ["boleto", "bancario", "barcode", "pagamento", "copia"],
    importPath: "brasa.ui",
    propsTable: [
      { name: "digitableLine", type: "string", default: "-", description: "Linha digitavel (47 ou 48 digitos)" },
      { name: "dueDate", type: "string", default: "-", description: "Data de vencimento formatada" },
      { name: "amount", type: "number", default: "-", description: "Valor em reais" },
      { name: "beneficiary", type: "string", default: "-", description: "Nome do beneficiario" },
      { name: "payer", type: "string", default: "-", description: "Nome do pagador" },
    ],
    codeExample: `import { BoletoDisplay } from "brasa.ui";

<BoletoDisplay
  digitableLine="23793.38128 60000.000003 00000.000400 1 84340000012345"
  amount={123.45}
  dueDate="15/10/2026"
  beneficiary="Empresa Exemplo LTDA"
/>`,
    aiContext: "O boleto bancario e um dos meios de pagamento mais populares no Brasil, usado por milhoes de pessoas sem cartao de credito. A linha digitavel e o que o usuario cola no app do banco.",
  },
];

export function getComponent(slug: string): ComponentDoc | undefined {
  return COMPONENTS.find((c) => c.slug === slug);
}

export function getComponentsByCategory(category: ComponentCategory): ComponentDoc[] {
  return COMPONENTS.filter((c) => c.category === category);
}
