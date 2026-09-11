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
        amount={14990}
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
};
