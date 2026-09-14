"use client";

import {
  Button,
  Input,
  Textarea,
  Select,
  Card, CardHeader, CardContent,
  Badge,
  Alert,
  Dialog, DialogHeader, DialogContent, DialogFooter,
  Tabs, TabList, TabTrigger, TabContent,
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  Switch,
  Avatar,
  Separator,
  Dropdown,
  Tooltip,
  CPFInput,
  CNPJInput,
  CEPInput,
  PhoneBR,
  CurrencyBRL,
  StateSelect,
  PixPayment,
  InstallmentSelect,
  Marquee,
  NumberTicker,
  AnimatedList,
  BentoGrid, BentoCard,
  AvatarCircles,
  BorderBeam,
  ShimmerButton,
  MagicCard,
  TypingAnimation,
  DotPattern,
  RetroGrid,
  Skeleton, SkeletonGroup,
  Progress, StepProgress,
  PIXKeyInput,
  BoletoDisplay,
} from "../../../../packages/ui/src";
import { useState } from "react";

function DialogPreview() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} size="sm">Abrir Dialog</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogHeader><h3 className="text-base font-semibold">Confirmar</h3></DialogHeader>
        <DialogContent><p className="text-sm text-neutral-600">Deseja continuar?</p></DialogContent>
        <DialogFooter>
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button size="sm" onClick={() => setOpen(false)}>Confirmar</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export const PREVIEWS: Record<string, React.ReactNode> = {
  button: (
    <div className="flex items-center gap-2 flex-wrap">
      <Button variant="primary" size="sm">Primario</Button>
      <Button variant="outline" size="sm">Outline</Button>
      <Button variant="ghost" size="sm">Ghost</Button>
      <Button variant="destructive" size="sm">Destructive</Button>
    </div>
  ),
  input: (
    <div className="w-full max-w-[260px]">
      <Input label="Nome" placeholder="Maria Silva" />
    </div>
  ),
  textarea: (
    <div className="w-full max-w-[260px]">
      <Textarea label="Bio" placeholder="Conte sobre voce..." />
    </div>
  ),
  select: (
    <div className="w-full max-w-[260px]">
      <Select label="Tipo" options={[{ value: "pf", label: "Pessoa Fisica" }, { value: "pj", label: "Pessoa Juridica" }]} />
    </div>
  ),
  card: (
    <Card className="w-full max-w-[260px]">
      <CardHeader><p className="text-sm font-semibold">Pedido #1234</p></CardHeader>
      <CardContent><p className="text-xs text-neutral-500">3 itens — R$ 679,70</p></CardContent>
    </Card>
  ),
  badge: (
    <div className="flex items-center gap-2 flex-wrap">
      <Badge>Default</Badge>
      <Badge variant="success">Aprovado</Badge>
      <Badge variant="warning">Pendente</Badge>
      <Badge variant="error">Erro</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
  alert: (
    <div className="w-full max-w-[300px]">
      <Alert variant="success" title="Pagamento confirmado">
        Seu pedido foi processado.
      </Alert>
    </div>
  ),
  dialog: <DialogPreview />,
  tabs: (
    <div className="w-full max-w-[280px]">
      <Tabs defaultValue="pix">
        <TabList>
          <TabTrigger value="pix">Pix</TabTrigger>
          <TabTrigger value="cartao">Cartao</TabTrigger>
        </TabList>
        <TabContent value="pix"><p className="text-xs text-neutral-500 p-2">Pague via Pix</p></TabContent>
        <TabContent value="cartao"><p className="text-xs text-neutral-500 p-2">Cartao de credito</p></TabContent>
      </Tabs>
    </div>
  ),
  accordion: (
    <div className="w-full max-w-[280px]">
      <Accordion type="single" defaultOpen={["q1"]}>
        <AccordionItem value="q1">
          <AccordionTrigger value="q1">O que e Pix?</AccordionTrigger>
          <AccordionContent value="q1">Pagamento instantaneo do BCB.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="q2">
          <AccordionTrigger value="q2">Tem taxa?</AccordionTrigger>
          <AccordionContent value="q2">Gratuito para pessoa fisica.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
  switch: (
    <Switch label="Notificacoes" description="Receba por email" defaultChecked />
  ),
  avatar: (
    <div className="flex items-center gap-3">
      <Avatar fallback="Maria S" size="sm" />
      <Avatar fallback="Joao P" size="md" />
      <Avatar fallback="Ana R" size="lg" />
    </div>
  ),
  separator: (
    <div className="w-full max-w-[260px] space-y-3">
      <Separator />
      <Separator label="ou" />
    </div>
  ),
  dropdown: (
    <Dropdown
      trigger={<Button variant="outline" size="sm">Acoes</Button>}
      items={[
        { label: "Editar", value: "edit" },
        { label: "Duplicar", value: "dup" },
        { label: "Excluir", value: "del", danger: true },
      ]}
      onSelect={() => {}}
    />
  ),
  tooltip: (
    <Tooltip content="Copiar codigo">
      <Button variant="ghost" size="sm">Passe o mouse</Button>
    </Tooltip>
  ),
  "cpf-input": (
    <div className="w-full max-w-[260px]">
      <CPFInput label="CPF" />
    </div>
  ),
  "cnpj-input": (
    <div className="w-full max-w-[260px]">
      <CNPJInput label="CNPJ" />
    </div>
  ),
  "cep-input": (
    <div className="w-full max-w-[260px]">
      <CEPInput label="CEP" />
    </div>
  ),
  "phone-br": (
    <div className="w-full max-w-[260px]">
      <PhoneBR label="Telefone" />
    </div>
  ),
  "currency-brl": (
    <div className="w-full max-w-[260px]">
      <CurrencyBRL label="Valor" />
    </div>
  ),
  "state-select": (
    <div className="w-full max-w-[260px]">
      <StateSelect label="Estado" />
    </div>
  ),
  "pix-payment": (
    <div className="w-full max-w-[280px]">
      <PixPayment
        pixCode="00020126580014br.gov.bcb.pix0136demo"
        amount={149.90}
        status="qr_generated"
      />
    </div>
  ),
  "installment-select": (
    <div className="w-full max-w-[280px]">
      <InstallmentSelect
        amount={67970}
        maxInstallments={6}
        freeInstallments={3}
        interestRate={1.99}
        onChange={() => {}}
      />
    </div>
  ),
  // New components
  marquee: (
    <div className="w-full max-w-[300px] overflow-hidden">
      <Marquee duration="10s" pauseOnHover>
        {["Next.js", "React", "TypeScript", "Tailwind", "Pix", "CPF"].map((t) => (
          <span key={t} className="mx-2 rounded-lg bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">{t}</span>
        ))}
      </Marquee>
    </div>
  ),
  "number-ticker": (
    <div className="flex items-baseline gap-4">
      <div className="text-center">
        <NumberTicker value={12847} className="text-2xl font-bold text-neutral-900" />
        <p className="text-[10px] text-neutral-400 mt-0.5">usuarios</p>
      </div>
      <div className="text-center">
        <NumberTicker value={99.9} className="text-2xl font-bold text-emerald-600" formatOptions={{ minimumFractionDigits: 1 }} delay={300} />
        <p className="text-[10px] text-neutral-400 mt-0.5">%</p>
      </div>
    </div>
  ),
  "animated-list": (
    <div className="w-full max-w-[260px]">
      <AnimatedList delay={600}>
        <div key="1" className="rounded-lg border border-neutral-100 bg-white p-2 text-xs shadow-sm">
          <span className="font-medium">Pix recebido</span> <span className="text-neutral-400">— R$ 150,00</span>
        </div>
        <div key="2" className="rounded-lg border border-neutral-100 bg-white p-2 text-xs shadow-sm">
          <span className="font-medium">Novo pedido</span> <span className="text-neutral-400">— #4521</span>
        </div>
        <div key="3" className="rounded-lg border border-neutral-100 bg-white p-2 text-xs shadow-sm">
          <span className="font-medium">Entrega confirmada</span> <span className="text-neutral-400">— SP</span>
        </div>
      </AnimatedList>
    </div>
  ),
  "bento-grid": (
    <div className="w-full max-w-[300px]">
      <BentoGrid columns={2}>
        <BentoCard title="Pix" description="Instantaneo" />
        <BentoCard title="Boleto" description="Ate 3 dias" />
      </BentoGrid>
    </div>
  ),
  "avatar-circles": (
    <AvatarCircles
      avatars={[
        { src: "https://api.dicebear.com/9.x/initials/svg?seed=MS", alt: "Maria" },
        { src: "https://api.dicebear.com/9.x/initials/svg?seed=JP", alt: "Joao" },
        { src: "https://api.dicebear.com/9.x/initials/svg?seed=AR", alt: "Ana" },
        { src: "https://api.dicebear.com/9.x/initials/svg?seed=CF", alt: "Carlos" },
        { src: "https://api.dicebear.com/9.x/initials/svg?seed=LG", alt: "Lucia" },
        { src: "https://api.dicebear.com/9.x/initials/svg?seed=RF", alt: "Rafael" },
      ]}
      max={4}
    />
  ),
  "border-beam": (
    <div className="relative rounded-xl border border-neutral-200 bg-white p-4 text-center">
      <BorderBeam size={100} duration={8} colorFrom="#059669" colorTo="#eab308" />
      <p className="text-xs font-medium text-neutral-700">Borda animada</p>
    </div>
  ),
  "shimmer-button": (
    <ShimmerButton shimmerColor="#059669">
      Comecar agora
    </ShimmerButton>
  ),
  "magic-card": (
    <MagicCard gradientColor="#059669" className="w-full max-w-[240px]">
      <div className="p-4">
        <p className="text-sm font-semibold text-neutral-900">Magic Card</p>
        <p className="text-xs text-neutral-500 mt-1">Passe o mouse aqui</p>
      </div>
    </MagicCard>
  ),
  "typing-animation": (
    <TypingAnimation
      text="Componentes brasileiros"
      duration={50}
      className="text-sm font-medium text-neutral-800"
    />
  ),
  "dot-pattern": (
    <div className="relative h-20 w-full max-w-[260px] overflow-hidden rounded-lg border border-neutral-100">
      <DotPattern width={12} height={12} radius={0.8} />
      <div className="relative z-10 flex h-full items-center justify-center">
        <span className="text-xs font-medium text-neutral-500">Background pattern</span>
      </div>
    </div>
  ),
  "retro-grid": (
    <div className="relative h-24 w-full max-w-[260px] overflow-hidden rounded-lg border border-neutral-100">
      <RetroGrid angle={65} />
      <div className="relative z-10 flex h-full items-center justify-center">
        <span className="text-xs font-medium text-neutral-500">Retro Grid</span>
      </div>
    </div>
  ),
  skeleton: (
    <div className="w-full max-w-[260px]">
      <SkeletonGroup lines={3} avatar />
    </div>
  ),
  progress: (
    <div className="w-full max-w-[260px] space-y-3">
      <Progress value={65} showLabel label="Upload" />
      <StepProgress steps={["Dados", "Pagamento", "Pronto"]} currentStep={1} />
    </div>
  ),
  "pix-key-input": (
    <div className="w-full max-w-[260px]">
      <PIXKeyInput label="Chave Pix" />
    </div>
  ),
  "boleto-display": (
    <div className="w-full max-w-[300px]">
      <BoletoDisplay
        digitableLine="23793381286000000000300000000040184340000012345"
        amount={123.45}
        dueDate="15/10/2026"
        beneficiary="Empresa Exemplo"
      />
    </div>
  ),
};
