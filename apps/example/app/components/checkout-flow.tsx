"use client";

import { useState, useCallback } from "react";
import {
  CPFInput,
  CEPInput,
  PhoneBR,
  PixPayment,
  InstallmentSelect,
  Button,
  Card,
  CardHeader,
  CardContent,
  Badge,
  Input,
  type CEPAddress,
  type InstallmentOption,
} from "brasa.ui";
import {
  ArrowLeft,
  User,
  MapPin,
  CreditCard,
  Check,
  ChevronRight,
  ShieldCheck,
  Lock,
  Truck,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  size: string;
}

interface CheckoutFlowProps {
  items: Product[];
  subtotal: number;
  shipping: number;
  total: number;
  onBack: () => void;
}

type Step = "dados" | "endereco" | "pagamento" | "confirmado";
type PaymentMethod = "pix" | "cartao";

function formatBRL(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

const STEPS: { key: Step; label: string; icon: typeof User }[] = [
  { key: "dados", label: "Dados", icon: User },
  { key: "endereco", label: "Endereço", icon: MapPin },
  { key: "pagamento", label: "Pagamento", icon: CreditCard },
];

export function CheckoutFlow({
  items,
  subtotal,
  shipping,
  total,
  onBack,
}: CheckoutFlowProps) {
  const [step, setStep] = useState<Step>("dados");

  // Form state
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [cpfValid, setCpfValid] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneValid, setPhoneValid] = useState(false);
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState<CEPAddress | null>(null);
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");
  const [selectedInstallment, setSelectedInstallment] =
    useState<InstallmentOption | null>(null);

  const canProceedDados = nome.trim() && email.trim() && cpfValid && phoneValid;
  const canProceedEndereco = address && numero.trim();

  const handleDadosNext = useCallback(() => {
    if (canProceedDados) setStep("endereco");
  }, [canProceedDados]);

  const handleEnderecoNext = useCallback(() => {
    if (canProceedEndereco) setStep("pagamento");
  }, [canProceedEndereco]);

  const stepIndex = STEPS.findIndex((s) => s.key === step);

  if (step === "confirmado") {
    return (
      <div className="mx-auto min-h-screen max-w-lg px-4 py-12">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <Check className="h-8 w-8 text-emerald-600" strokeWidth={3} />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900">
            Pedido confirmado!
          </h1>
          <p className="mt-2 text-neutral-500">
            Você receberá um e-mail de confirmação em{" "}
            <span className="font-medium text-neutral-700">{email}</span>
          </p>

          <Card variant="bordered" className="mt-6 text-left">
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Pedido</span>
                <span className="font-mono font-medium">#BRA-2024-0847</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Total</span>
                <span className="font-bold">{formatBRL(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Pagamento</span>
                <span className="font-medium">
                  {paymentMethod === "pix"
                    ? "Pix"
                    : `${selectedInstallment?.installments || 1}x cartão`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Entrega</span>
                <span className="font-medium">
                  {address?.localidade}, {address?.uf}
                </span>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex flex-col gap-3">
            <Button variant="primary" size="lg" className="w-full" onClick={onBack}>
              Voltar à loja
            </Button>
            <p className="text-xs text-neutral-400">
              Prazo estimado: 5-8 dias úteis
            </p>
          </div>

          <div className="mt-8 rounded-xl bg-neutral-100 p-4">
            <p className="text-xs text-neutral-500">
              Este checkout foi construído inteiramente com componentes{" "}
              <span className="font-semibold text-emerald-600">brasa.ui</span>
              {" — "}CPFInput, CEPInput, PhoneBR, PixPayment, InstallmentSelect,
              Button, Card, Badge, Input.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={step === "dados" ? onBack : () => setStep(STEPS[stepIndex - 1]?.key || "dados")}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 transition-colors hover:bg-neutral-50"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h1 className="text-lg font-bold">Checkout</h1>
        <Badge variant="brasil" className="ml-auto">
          Seguro
        </Badge>
      </div>

      {/* Step indicator */}
      <div className="mb-8 flex items-center gap-2">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const isActive = i === stepIndex;
          const isDone = i < stepIndex;
          return (
            <div key={s.key} className="flex flex-1 items-center gap-2">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all ${
                  isDone
                    ? "bg-emerald-600 text-white"
                    : isActive
                      ? "bg-neutral-900 text-white"
                      : "bg-neutral-100 text-neutral-400"
                }`}
              >
                {isDone ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
              </div>
              <span
                className={`hidden text-xs font-medium sm:block ${
                  isActive
                    ? "text-neutral-900"
                    : isDone
                      ? "text-emerald-600"
                      : "text-neutral-400"
                }`}
              >
                {s.label}
              </span>
              {i < STEPS.length - 1 && (
                <div
                  className={`h-px flex-1 ${
                    isDone ? "bg-emerald-300" : "bg-neutral-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Main content */}
        <div className="lg:col-span-3">
          {/* Step: Dados Pessoais */}
          {step === "dados" && (
            <Card variant="elevated">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-neutral-500" />
                  <h2 className="font-semibold">Dados Pessoais</h2>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Nome completo"
                  placeholder="João da Silva"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <Input
                  label="E-mail"
                  type="email"
                  placeholder="joao@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <CPFInput
                  value={cpf}
                  onChange={(masked) => setCpf(masked)}
                  onValidate={setCpfValid}
                />
                <PhoneBR
                  value={phone}
                  onChange={(masked) => setPhone(masked)}
                  onValidate={setPhoneValid}
                />
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={!canProceedDados}
                  onClick={handleDadosNext}
                >
                  Continuar
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step: Endereço */}
          {step === "endereco" && (
            <Card variant="elevated">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-neutral-500" />
                  <h2 className="font-semibold">Endereço de Entrega</h2>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CEPInput
                  value={cep}
                  onChange={(masked) => setCep(masked)}
                  onAddress={setAddress}
                />
                {address && (
                  <div className="space-y-4 rounded-xl bg-emerald-50/50 p-4 border border-emerald-100">
                    <div className="flex items-center gap-2 text-sm text-emerald-700">
                      <Check className="h-4 w-4" />
                      <span className="font-medium">Endereço encontrado</span>
                    </div>
                    <Input
                      label="Rua"
                      value={address.logradouro}
                      disabled
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        label="Número"
                        placeholder="123"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                      />
                      <Input
                        label="Complemento"
                        placeholder="Apto 4B"
                        value={complemento}
                        onChange={(e) => setComplemento(e.target.value)}
                      />
                    </div>
                    <Input
                      label="Bairro"
                      value={address.bairro}
                      disabled
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        label="Cidade"
                        value={address.localidade}
                        disabled
                      />
                      <Input
                        label="Estado"
                        value={address.uf}
                        disabled
                      />
                    </div>
                  </div>
                )}
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={!canProceedEndereco}
                  onClick={handleEnderecoNext}
                >
                  Continuar para Pagamento
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step: Pagamento */}
          {step === "pagamento" && (
            <div className="space-y-4">
              {/* Payment method selector */}
              <Card variant="elevated">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-neutral-500" />
                    <h2 className="font-semibold">Forma de Pagamento</h2>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <button
                    onClick={() => setPaymentMethod("pix")}
                    className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                      paymentMethod === "pix"
                        ? "border-emerald-500 bg-emerald-50/50"
                        : "border-neutral-100 hover:border-neutral-200"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        paymentMethod === "pix"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-neutral-100 text-neutral-400"
                      }`}
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                        <path d="M9.5 4.5l2.5 2.5-2.5 2.5M14.5 4.5L12 7l2.5 2.5M4.5 9.5l2.5 2.5-2.5 2.5M9.5 14.5l2.5 2.5-2.5 2.5M14.5 14.5L12 17l2.5 2.5M19.5 9.5L17 12l2.5 2.5M9.5 9.5l2.5 2.5-2.5 2.5M14.5 9.5L12 12l2.5 2.5" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-neutral-900">Pix</p>
                      <p className="text-xs text-neutral-500">
                        Aprovação instantânea
                      </p>
                    </div>
                    <Badge variant="success">-5%</Badge>
                  </button>

                  <button
                    onClick={() => setPaymentMethod("cartao")}
                    className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                      paymentMethod === "cartao"
                        ? "border-emerald-500 bg-emerald-50/50"
                        : "border-neutral-100 hover:border-neutral-200"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        paymentMethod === "cartao"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-neutral-100 text-neutral-400"
                      }`}
                    >
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-neutral-900">
                        Cartão de Crédito
                      </p>
                      <p className="text-xs text-neutral-500">
                        Em até 10x sem juros
                      </p>
                    </div>
                  </button>
                </CardContent>
              </Card>

              {/* Payment details */}
              {paymentMethod === "pix" && (
                <PixPayment
                  amount={total / 100 * 0.95}
                  beneficiary="Loja Demo brasa.ui"
                  expiresIn={600}
                  onPayment={() => setStep("confirmado")}
                />
              )}

              {paymentMethod === "cartao" && (
                <Card variant="elevated">
                  <CardContent className="space-y-4">
                    <InstallmentSelect
                      amount={total / 100}
                      maxInstallments={10}
                      freeInstallments={10}
                      onChange={setSelectedInstallment}
                    />
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full"
                      onClick={() => setStep("confirmado")}
                    >
                      <Lock className="h-4 w-4" />
                      Pagar{" "}
                      {selectedInstallment
                        ? `${selectedInstallment.installments}x de ${formatBRL(
                            Math.round(selectedInstallment.value * 100)
                          )}`
                        : formatBRL(total)}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        <div className="lg:col-span-2">
          <div className="sticky top-6 space-y-4">
            <Card>
              <CardHeader>
                <h3 className="text-sm font-semibold">Resumo do Pedido</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <span className="text-lg">{item.image}</span>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-neutral-400">Tam: {item.size}</p>
                    </div>
                    <p className="text-sm font-medium">{formatBRL(item.price)}</p>
                  </div>
                ))}
                <div className="border-t border-neutral-100 pt-3 space-y-1">
                  <div className="flex justify-between text-sm text-neutral-500">
                    <span>Subtotal</span>
                    <span>{formatBRL(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Truck className="h-3 w-3" /> Frete
                    </span>
                    <span>{formatBRL(shipping)}</span>
                  </div>
                  {paymentMethod === "pix" && step === "pagamento" && (
                    <div className="flex justify-between text-sm text-emerald-600">
                      <span>Desconto Pix (5%)</span>
                      <span>- {formatBRL(Math.round(total * 0.05))}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-neutral-100 pt-2 text-base font-bold">
                    <span>Total</span>
                    <span>
                      {paymentMethod === "pix" && step === "pagamento"
                        ? formatBRL(Math.round(total * 0.95))
                        : formatBRL(total)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust badges */}
            <div className="flex flex-col gap-2 rounded-xl border border-neutral-100 bg-white p-3">
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                Compra 100% segura
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <Lock className="h-3.5 w-3.5 text-emerald-500" />
                Dados protegidos com criptografia
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <Truck className="h-3.5 w-3.5 text-emerald-500" />
                Entrega em 5-8 dias úteis
              </div>
            </div>

            {/* brasa.ui badge */}
            <div className="rounded-xl bg-neutral-50 p-3 text-center">
              <p className="text-[10px] text-neutral-400">
                Componentes utilizados nesta página
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-1">
                {[
                  "CPFInput",
                  "CEPInput",
                  "PhoneBR",
                  "PixPayment",
                  "InstallmentSelect",
                  "Button",
                  "Card",
                  "Badge",
                  "Input",
                ].map((name) => (
                  <span
                    key={name}
                    className="rounded-md bg-neutral-200/60 px-1.5 py-0.5 font-mono text-[9px] text-neutral-500"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
