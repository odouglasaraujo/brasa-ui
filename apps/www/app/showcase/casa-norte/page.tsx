"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Types ──────────────────────────────────────────────
type PaymentMethod = "pix" | "cartao" | "boleto";
type CheckoutStep = "dados" | "pagamento" | "confirmacao";
type PixState = "awaiting" | "confirmed" | "expired" | "error";

interface FormData {
  nome: string;
  cpf: string;
  telefone: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  estado: string;
  cidade: string;
  bairro: string;
}

interface FormErrors {
  [key: string]: string;
}

// ── Constants ──────────────────────────────────────────
const PRODUCT_PRICE = 1499.90;
const PRODUCT_NAME = "Sofa Modular Oslo 3 Lugares";
const PRODUCT_SKU = "MOV-2026-0847";
const PRODUCT_COLOR = "Cinza Grafite";

const STATES = [
  "AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG","MS","MT",
  "PA","PB","PE","PI","PR","RJ","RN","RO","RR","RS","SC","SE","SP","TO"
];

const INSTALLMENTS = Array.from({ length: 10 }, (_, i) => {
  const n = i + 1;
  const hasInterest = n > 6;
  const rate = hasInterest ? 1 + (n - 6) * 0.0199 : 1;
  const total = PRODUCT_PRICE * rate;
  const monthly = total / n;
  return { n, monthly, total, hasInterest, rate };
});

const PIX_CODE = "00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-abcd-ef1234567890520400005303986540" + PRODUCT_PRICE.toFixed(2).replace(".", "") + "5802BR5925CASA NORTE MOVEIS LTDA6009SAO PAULO62070503***6304";

// ── Helpers ────────────────────────────────────────────
function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function maskCPF(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function maskCEP(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 8);
  if (d.length <= 5) return d;
  return `${d.slice(0, 5)}-${d.slice(5)}`;
}

function validateCPF(cpf: string): boolean {
  const d = cpf.replace(/\D/g, "");
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
  for (let t = 9; t < 11; t++) {
    let sum = 0;
    for (let i = 0; i < t; i++) sum += Number(d[i]) * (t + 1 - i);
    const rem = (sum * 10) % 11;
    if ((rem === 10 ? 0 : rem) !== Number(d[t])) return false;
  }
  return true;
}

// ── Shared UI ──────────────────────────────────────────
function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-[13px] font-semibold text-neutral-700 mb-1.5">
      {children}
      {required && <span className="ml-0.5 text-red-400">*</span>}
    </label>
  );
}

function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
      className="mt-1 text-xs text-red-500 flex items-center gap-1">
      <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
      {error}
    </motion.p>
  );
}

function Input({ value, onChange, placeholder, error, className = "", ...props }: {
  value: string; onChange: (v: string) => void; placeholder?: string;
  error?: string; className?: string; [key: string]: unknown;
}) {
  return (
    <div className={className}>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className={`h-11 w-full rounded-xl border bg-white px-3.5 text-sm shadow-sm transition-all placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          error ? "border-red-300 focus:ring-red-500/40" : "border-neutral-200 focus:ring-amber-500/40 focus:border-amber-400"
        }`} {...props} />
    </div>
  );
}

// ── QR Code SVG ────────────────────────────────────────
function QRCodeSVG() {
  const size = 25;
  const modules: boolean[][] = [];
  for (let r = 0; r < size; r++) {
    modules[r] = [];
    for (let c = 0; c < size; c++) {
      const isFinder = (r < 7 && c < 7) || (r < 7 && c >= size - 7) || (r >= size - 7 && c < 7);
      const isFinderInner = isFinder && (
        (r >= 2 && r <= 4 && c >= 2 && c <= 4) ||
        (r >= 2 && r <= 4 && c >= size - 5 && c <= size - 3) ||
        (r >= size - 5 && r <= size - 3 && c >= 2 && c <= 4)
      );
      const isFinderBorder = isFinder && !isFinderInner && (
        r === 0 || r === 6 || c === 0 || c === 6 ||
        r === size - 7 || r === size - 1 || c === size - 7 || c === size - 1 ||
        (r < 7 && (c === 0 || c === 6)) || (c < 7 && (r === 0 || r === 6)) ||
        (r < 7 && c >= size - 7 && (c === size - 7 || c === size - 1)) ||
        (r >= size - 7 && c < 7 && (r === size - 7 || r === size - 1))
      );
      if (isFinderInner || isFinderBorder) {
        modules[r][c] = true;
      } else if (isFinder) {
        modules[r][c] = false;
      } else {
        const seed = (r * 31 + c * 17 + r * c) % 7;
        modules[r][c] = seed < 4;
      }
    }
  }
  const cellSize = 6;
  const padding = 12;
  const svgSize = size * cellSize + padding * 2;
  return (
    <svg viewBox={`0 0 ${svgSize} ${svgSize}`} className="h-44 w-44">
      <rect width={svgSize} height={svgSize} fill="white" rx="8" />
      {modules.map((row, r) => row.map((cell, c) => cell ? (
        <rect key={`${r}-${c}`} x={padding + c * cellSize} y={padding + r * cellSize}
          width={cellSize} height={cellSize} fill="#171717" rx={1} />
      ) : null))}
      <rect x={svgSize / 2 - 16} y={svgSize / 2 - 16} width={32} height={32} rx={8} fill="#d97706" />
      <text x={svgSize / 2} y={svgSize / 2 + 6} textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">$</text>
    </svg>
  );
}

// ── Step Indicator ─────────────────────────────────────
function StepIndicator({ current, onNavigate }: { current: CheckoutStep; onNavigate: (s: CheckoutStep) => void }) {
  const steps: { key: CheckoutStep; label: string; num: number }[] = [
    { key: "dados", label: "Seus dados", num: 1 },
    { key: "pagamento", label: "Pagamento", num: 2 },
    { key: "confirmacao", label: "Confirmacao", num: 3 },
  ];
  const currentIdx = steps.findIndex(s => s.key === current);
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((step, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        const canClick = done;
        return (
          <div key={step.key} className="flex items-center">
            <button disabled={!canClick} onClick={() => canClick && onNavigate(step.key)}
              className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                active ? "bg-amber-100 text-amber-800" :
                done ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 cursor-pointer" :
                "bg-neutral-100 text-neutral-400 cursor-default"
              }`}>
              {done ? (
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
              ) : (
                <span className={`flex h-4.5 w-4.5 items-center justify-center rounded-full text-[10px] font-bold ${
                  active ? "bg-amber-600 text-white" : "bg-neutral-300 text-white"
                }`}>{step.num}</span>
              )}
              <span className="hidden sm:inline">{step.label}</span>
            </button>
            {i < steps.length - 1 && (
              <div className={`mx-1.5 h-px w-8 sm:w-12 ${done ? "bg-emerald-300" : "bg-neutral-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Order Summary ──────────────────────────────────────
function OrderSummary({ method, installment, compact }: {
  method?: PaymentMethod; installment?: number; compact?: boolean;
}) {
  const inst = installment ? INSTALLMENTS[installment - 1] : null;
  const discount = method === "pix" ? 0.05 : 0;
  const total = inst ? inst.total : PRODUCT_PRICE * (1 - discount);

  return (
    <div className={`rounded-2xl border border-neutral-200 bg-white shadow-sm ${compact ? "p-4" : "p-5"}`}>
      <h3 className="text-sm font-semibold text-neutral-900 mb-4">Resumo do pedido</h3>
      <div className="flex gap-3 mb-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-neutral-100 shrink-0">
          <svg className="h-8 w-8 text-neutral-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-neutral-900 leading-tight">{PRODUCT_NAME}</p>
          <p className="text-[11px] text-neutral-400 mt-0.5">{PRODUCT_SKU} · {PRODUCT_COLOR}</p>
          <p className="text-xs text-neutral-500 mt-1">Qtd: 1</p>
        </div>
      </div>
      <div className="space-y-2 border-t border-neutral-100 pt-3">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">Subtotal</span>
          <span className="text-neutral-700 tabular-nums">{formatBRL(PRODUCT_PRICE)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">Frete</span>
          <span className="text-emerald-600 font-medium">Gratis</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-emerald-600">Desconto Pix (5%)</span>
            <span className="text-emerald-600 font-medium tabular-nums">-{formatBRL(PRODUCT_PRICE * discount)}</span>
          </div>
        )}
        {inst && inst.hasInterest && (
          <div className="flex justify-between text-sm">
            <span className="text-neutral-500">Juros ({inst.n}x)</span>
            <span className="text-neutral-700 tabular-nums">+{formatBRL(inst.total - PRODUCT_PRICE)}</span>
          </div>
        )}
      </div>
      <div className="flex justify-between items-baseline border-t border-neutral-100 pt-3 mt-3">
        <span className="text-sm font-semibold text-neutral-900">Total</span>
        <div className="text-right">
          <p className="text-xl font-bold text-neutral-900 tabular-nums">{formatBRL(total)}</p>
          {inst && inst.n > 1 && (
            <p className="text-xs text-neutral-400 tabular-nums">{inst.n}x de {formatBRL(inst.monthly)}</p>
          )}
          {method === "pix" && <p className="text-xs text-emerald-600 font-medium">com 5% de desconto</p>}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2">
        <svg className="h-4 w-4 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H6.375c-.621 0-1.125-.504-1.125-1.125V14.25m17.25 4.5h.375a1.125 1.125 0 001.125-1.125v-4.5A1.125 1.125 0 0020.625 8.25h-1.875M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H5.625c-.621 0-1.125.504-1.125 1.125v6.75" /></svg>
        <span className="text-xs text-amber-800">Entrega em <strong>7-12 dias uteis</strong> para todo o Brasil</span>
      </div>
    </div>
  );
}

// ── Pix Payment Flow ───────────────────────────────────
function PixPaymentFlow({ onConfirm }: { onConfirm: () => void }) {
  const [pixState, setPixState] = useState<PixState>("awaiting");
  const [timer, setTimer] = useState(300);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (pixState !== "awaiting") return;
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) { setPixState("expired"); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [pixState]);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mins = Math.floor(timer / 60);
  const secs = timer % 60;

  if (pixState === "confirmed") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center py-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 mb-4">
          <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
        </div>
        <h3 className="text-lg font-bold text-neutral-900">Pagamento confirmado!</h3>
        <p className="text-sm text-neutral-500 mt-1 max-w-xs">Recebemos seu Pix de {formatBRL(PRODUCT_PRICE * 0.95)}. Voce recebera o comprovante por email.</p>
        <button onClick={onConfirm} className="mt-6 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-[0.98]">
          Ver confirmacao do pedido
        </button>
      </motion.div>
    );
  }

  if (pixState === "expired") {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 mb-4">
          <svg className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <h3 className="text-lg font-bold text-neutral-900">Codigo Pix expirado</h3>
        <p className="text-sm text-neutral-500 mt-1 max-w-xs">O tempo para pagamento via Pix expirou. Gere um novo codigo para continuar.</p>
        <button onClick={() => { setPixState("awaiting"); setTimer(300); }}
          className="mt-5 rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-amber-700 active:scale-[0.98]">
          Gerar novo codigo
        </button>
      </div>
    );
  }

  if (pixState === "error") {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 mb-4">
          <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
        </div>
        <h3 className="text-lg font-bold text-neutral-900">Erro no pagamento</h3>
        <p className="text-sm text-neutral-500 mt-1 max-w-xs">Ocorreu um erro ao processar seu Pix. Tente novamente ou escolha outra forma de pagamento.</p>
        <button onClick={() => { setPixState("awaiting"); setTimer(300); }}
          className="mt-5 rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 shadow-sm transition-all hover:bg-neutral-50 active:scale-[0.98]">
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="text-center">
        <h3 className="text-base font-semibold text-neutral-900">Pague com Pix</h3>
        <p className="text-xs text-neutral-500 mt-0.5">Escaneie o QR Code ou copie o codigo abaixo</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="rounded-2xl border-2 border-neutral-100 bg-white p-3 shadow-sm">
          <QRCodeSVG />
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-40" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
          </span>
          <span className="text-sm text-neutral-600">Expira em <strong className="text-neutral-900 tabular-nums">{String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}</strong></span>
        </div>
      </div>
      <div>
        <FieldLabel>Codigo copia e cola</FieldLabel>
        <div className="flex gap-2">
          <div className="flex-1 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2.5">
            <p className="text-xs font-mono text-neutral-600 break-all line-clamp-2">{PIX_CODE.slice(0, 80)}...</p>
          </div>
          <button onClick={handleCopy}
            className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition-all active:scale-[0.98] ${
              copied ? "bg-emerald-600 text-white" : "bg-neutral-900 text-white hover:bg-neutral-800"
            }`}>
            {copied ? "Copiado!" : "Copiar"}
          </button>
        </div>
      </div>
      <div className="rounded-xl bg-amber-50 border border-amber-200/50 p-3.5">
        <p className="text-xs text-amber-800 leading-relaxed">
          <strong>Aguardando pagamento.</strong> Apos realizar o Pix, a confirmacao pode levar ate 30 segundos. Nao feche esta pagina.
        </p>
      </div>
      <div className="flex gap-2 pt-1">
        <button onClick={() => setPixState("confirmed")}
          className="flex-1 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-[0.98]">
          Simular pagamento
        </button>
        <button onClick={() => setPixState("error")}
          className="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-600 shadow-sm transition-all hover:bg-neutral-50 active:scale-[0.98]">
          Simular erro
        </button>
      </div>
    </div>
  );
}

// ── Card Payment Form ──────────────────────────────────
function CardPaymentForm({ onSubmit, loading }: { onSubmit: () => void; loading: boolean }) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [installment, setInstallment] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const maskCard = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 16);
    return d.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const maskExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    if (d.length <= 2) return d;
    return `${d.slice(0, 2)}/${d.slice(2)}`;
  };

  const inst = INSTALLMENTS[installment - 1];

  return (
    <div className="space-y-4">
      <div>
        <FieldLabel required>Numero do cartao</FieldLabel>
        <input value={cardNumber} onChange={e => setCardNumber(maskCard(e.target.value))}
          placeholder="0000 0000 0000 0000" inputMode="numeric"
          className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-3.5 font-mono text-sm shadow-sm transition-all placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:ring-offset-2 focus:border-amber-400" />
      </div>
      <div>
        <FieldLabel required>Nome no cartao</FieldLabel>
        <input value={cardName} onChange={e => setCardName(e.target.value.toUpperCase())}
          placeholder="Como impresso no cartao"
          className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-3.5 text-sm uppercase shadow-sm transition-all placeholder:text-neutral-400 placeholder:normal-case focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:ring-offset-2 focus:border-amber-400" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <FieldLabel required>Validade</FieldLabel>
          <input value={cardExpiry} onChange={e => setCardExpiry(maskExpiry(e.target.value))}
            placeholder="MM/AA" inputMode="numeric"
            className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-3.5 font-mono text-sm shadow-sm transition-all placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:ring-offset-2 focus:border-amber-400" />
        </div>
        <div>
          <FieldLabel required>CVV</FieldLabel>
          <input value={cardCVV} onChange={e => setCardCVV(e.target.value.replace(/\D/g, "").slice(0, 4))}
            placeholder="123" inputMode="numeric"
            className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-3.5 font-mono text-sm shadow-sm transition-all placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:ring-offset-2 focus:border-amber-400" />
        </div>
      </div>
      <div>
        <FieldLabel required>Parcelamento</FieldLabel>
        <div className="space-y-1.5 max-h-52 overflow-y-auto rounded-xl border border-neutral-200 p-2">
          {INSTALLMENTS.map(inst => (
            <button key={inst.n} onClick={() => setInstallment(inst.n)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-all ${
                installment === inst.n
                  ? "bg-amber-50 ring-2 ring-amber-500/40"
                  : "hover:bg-neutral-50"
              }`}>
              <div className="flex items-center gap-2.5">
                <div className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                  installment === inst.n ? "border-amber-500 bg-amber-500" : "border-neutral-300"
                }`}>
                  {installment === inst.n && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                </div>
                <span className="text-sm text-neutral-900">{inst.n}x de <strong className="tabular-nums">{formatBRL(inst.monthly)}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                {inst.hasInterest && <span className="text-[10px] text-neutral-400 tabular-nums">Total: {formatBRL(inst.total)}</span>}
                <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${
                  inst.hasInterest ? "bg-neutral-100 text-neutral-500" : "bg-emerald-50 text-emerald-700"
                }`}>
                  {inst.hasInterest ? "com juros" : "sem juros"}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
      <label className="flex items-start gap-2.5 cursor-pointer group">
        <button type="button" onClick={() => setTermsAccepted(!termsAccepted)}
          className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border-2 transition-all ${
            termsAccepted ? "border-amber-500 bg-amber-500" : "border-neutral-300 group-hover:border-neutral-400"
          }`}>
          {termsAccepted && <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>}
        </button>
        <span className="text-xs text-neutral-500 leading-relaxed">
          Concordo com os <a href="#" className="text-amber-600 underline underline-offset-2 hover:text-amber-700">Termos de Uso</a> e a <a href="#" className="text-amber-600 underline underline-offset-2 hover:text-amber-700">Politica de Privacidade</a> da Casa Norte.
        </span>
      </label>
      <button onClick={onSubmit} disabled={loading || !termsAccepted || !cardNumber || !cardName || !cardExpiry || !cardCVV}
        className="w-full rounded-xl bg-amber-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-amber-200/50 transition-all hover:bg-amber-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
            Processando...
          </span>
        ) : (
          `Pagar ${formatBRL(INSTALLMENTS[installment - 1].total)}`
        )}
      </button>
    </div>
  );
}

// ── Boleto Flow ────────────────────────────────────────
function BoletoFlow({ onGenerate, loading }: { onGenerate: () => void; loading: boolean }) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const boletoCode = "23793.38128 60000.000003 00000.000401 1 94220000149990";

  if (generated) {
    return (
      <div className="space-y-5">
        <div className="text-center">
          <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-full bg-amber-100 mb-3">
            <svg className="h-7 w-7 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
          </div>
          <h3 className="text-base font-semibold text-neutral-900">Boleto gerado!</h3>
          <p className="text-xs text-neutral-500 mt-1">Pague ate <strong>17/09/2026</strong> em qualquer banco ou loteria.</p>
        </div>
        <div>
          <FieldLabel>Linha digitavel</FieldLabel>
          <div className="flex gap-2">
            <div className="flex-1 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2.5">
              <p className="text-xs font-mono text-neutral-700 tracking-wide">{boletoCode}</p>
            </div>
            <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}
              className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition-all active:scale-[0.98] ${
                copied ? "bg-emerald-600 text-white" : "bg-neutral-900 text-white hover:bg-neutral-800"
              }`}>
              {copied ? "Copiado!" : "Copiar"}
            </button>
          </div>
        </div>
        <div className="rounded-xl bg-amber-50 border border-amber-200/50 p-3.5 space-y-1.5">
          <p className="text-xs text-amber-800"><strong>Valor:</strong> {formatBRL(PRODUCT_PRICE)}</p>
          <p className="text-xs text-amber-800"><strong>Vencimento:</strong> 17/09/2026 (3 dias uteis)</p>
          <p className="text-xs text-amber-800">O pedido sera confirmado em ate 2 dias uteis apos o pagamento.</p>
        </div>
        <button onClick={onGenerate}
          className="w-full rounded-xl bg-amber-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-amber-200/50 transition-all hover:bg-amber-700 active:scale-[0.98]">
          Concluir pedido
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="text-center">
        <h3 className="text-base font-semibold text-neutral-900">Pagar com boleto</h3>
        <p className="text-xs text-neutral-500 mt-0.5">O boleto vence em 3 dias uteis</p>
      </div>
      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 space-y-2">
        <div className="flex justify-between text-sm"><span className="text-neutral-500">Valor</span><span className="font-semibold text-neutral-900 tabular-nums">{formatBRL(PRODUCT_PRICE)}</span></div>
        <div className="flex justify-between text-sm"><span className="text-neutral-500">Vencimento</span><span className="text-neutral-700">17/09/2026</span></div>
        <div className="flex justify-between text-sm"><span className="text-neutral-500">Beneficiario</span><span className="text-neutral-700">Casa Norte Moveis LTDA</span></div>
      </div>
      <div className="rounded-xl bg-blue-50 border border-blue-200/50 p-3.5">
        <p className="text-xs text-blue-800 leading-relaxed">O boleto nao possui desconto. Para economizar 5%, pague via Pix.</p>
      </div>
      <label className="flex items-start gap-2.5 cursor-pointer group">
        <button type="button" onClick={() => setTermsAccepted(!termsAccepted)}
          className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border-2 transition-all ${
            termsAccepted ? "border-amber-500 bg-amber-500" : "border-neutral-300 group-hover:border-neutral-400"
          }`}>
          {termsAccepted && <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>}
        </button>
        <span className="text-xs text-neutral-500 leading-relaxed">
          Concordo com os <a href="#" className="text-amber-600 underline underline-offset-2 hover:text-amber-700">Termos de Uso</a> e a <a href="#" className="text-amber-600 underline underline-offset-2 hover:text-amber-700">Politica de Privacidade</a> da Casa Norte.
        </span>
      </label>
      <button onClick={() => setGenerated(true)} disabled={loading || !termsAccepted}
        className="w-full rounded-xl bg-amber-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-amber-200/50 transition-all hover:bg-amber-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
        {loading ? "Gerando boleto..." : "Gerar boleto"}
      </button>
    </div>
  );
}

// ── Success Page ───────────────────────────────────────
function SuccessPage({ method, orderNumber }: { method: PaymentMethod; orderNumber: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-lg text-center py-8">
      <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-emerald-100 mb-6">
        <svg className="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
      </div>
      <h2 className="text-2xl font-bold text-neutral-900">Pedido confirmado!</h2>
      <p className="text-sm text-neutral-500 mt-2">Obrigado por comprar na Casa Norte.</p>
      <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm text-left space-y-3">
        <div className="flex justify-between text-sm"><span className="text-neutral-500">Numero do pedido</span><span className="font-mono font-semibold text-neutral-900">{orderNumber}</span></div>
        <div className="flex justify-between text-sm"><span className="text-neutral-500">Produto</span><span className="text-neutral-700">{PRODUCT_NAME}</span></div>
        <div className="flex justify-between text-sm"><span className="text-neutral-500">Pagamento</span><span className="text-neutral-700">{method === "pix" ? "Pix" : method === "cartao" ? "Cartao de credito" : "Boleto bancario"}</span></div>
        <div className="flex justify-between text-sm"><span className="text-neutral-500">Total</span><span className="font-semibold text-neutral-900 tabular-nums">{formatBRL(method === "pix" ? PRODUCT_PRICE * 0.95 : PRODUCT_PRICE)}</span></div>
        <div className="flex justify-between text-sm"><span className="text-neutral-500">Previsao de entrega</span><span className="text-neutral-700">22/09/2026 a 26/09/2026</span></div>
      </div>
      <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200/50 p-3.5">
        <p className="text-xs text-amber-800 leading-relaxed">Um email de confirmacao foi enviado. Voce pode acompanhar o status do seu pedido na area "Meus Pedidos".</p>
      </div>
      <div className="mt-6 flex gap-3 justify-center">
        <a href="/showcase" className="rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 shadow-sm transition-all hover:bg-neutral-50 active:scale-[0.98]">
          Voltar a loja
        </a>
        <button className="rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-amber-200/50 transition-all hover:bg-amber-700 active:scale-[0.98]">
          Acompanhar pedido
        </button>
      </div>
    </motion.div>
  );
}

// ── Main Page ──────────────────────────────────────────
export default function CasaNortePage() {
  const [step, setStep] = useState<CheckoutStep>("dados");
  const [method, setMethod] = useState<PaymentMethod>("pix");
  const [loading, setLoading] = useState(false);
  const [installment, setInstallment] = useState(1);
  const [orderNumber] = useState(() => `CN-${Date.now().toString(36).toUpperCase()}`);

  const [form, setForm] = useState<FormData>({
    nome: "", cpf: "", telefone: "", cep: "", endereco: "",
    numero: "", complemento: "", estado: "", cidade: "", bairro: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [cepLoading, setCepLoading] = useState(false);
  const [cepFound, setCepFound] = useState(false);

  const updateField = useCallback((field: keyof FormData, value: string) => {
    let v = value;
    if (field === "cpf") v = maskCPF(value);
    else if (field === "telefone") v = maskPhone(value);
    else if (field === "cep") v = maskCEP(value);
    else if (field === "numero") v = value.replace(/\D/g, "");
    setForm(prev => ({ ...prev, [field]: v }));
    setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });

    if (field === "cep" && v.replace(/\D/g, "").length === 8) {
      setCepLoading(true);
      setCepFound(false);
      const raw = v.replace(/\D/g, "");
      fetch(`https://viacep.com.br/ws/${raw}/json/`)
        .then(res => res.json())
        .then(data => {
          if (!data.erro) {
            setForm(prev => ({
              ...prev,
              endereco: data.logradouro || "",
              bairro: data.bairro || "",
              cidade: data.localidade || "",
              estado: data.uf || "",
            }));
            setCepFound(true);
          } else {
            setCepFound(false);
          }
          setCepLoading(false);
        })
        .catch(() => {
          setCepLoading(false);
          setCepFound(false);
        });
    }
  }, []);

  const validateForm = useCallback((): boolean => {
    const e: FormErrors = {};
    if (!form.nome.trim()) e.nome = "Informe seu nome completo";
    else if (form.nome.trim().split(" ").length < 2) e.nome = "Informe nome e sobrenome";
    const cpfDigits = form.cpf.replace(/\D/g, "");
    if (!cpfDigits) e.cpf = "Informe seu CPF";
    else if (cpfDigits.length !== 11) e.cpf = "CPF deve ter 11 digitos";
    else if (!validateCPF(cpfDigits)) e.cpf = "CPF invalido";
    const phoneDigits = form.telefone.replace(/\D/g, "");
    if (!phoneDigits) e.telefone = "Informe seu telefone";
    else if (phoneDigits.length < 10) e.telefone = "Telefone incompleto";
    const cepDigits = form.cep.replace(/\D/g, "");
    if (!cepDigits) e.cep = "Informe seu CEP";
    else if (cepDigits.length !== 8) e.cep = "CEP deve ter 8 digitos";
    if (!form.endereco.trim()) e.endereco = "Informe o endereco";
    if (!form.numero.trim()) e.numero = "Informe o numero";
    if (!form.estado) e.estado = "Selecione o estado";
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [form]);

  const handleContinue = () => {
    if (validateForm()) setStep("pagamento");
  };

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("confirmacao"); }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFBF5] to-[#FFF8EE]">
      {/* Header */}
      <header className="border-b border-amber-100 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <a href="/showcase" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600 shadow-sm shadow-amber-200/50">
              <svg className="h-4.5 w-4.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
            </div>
            <span className="text-base font-bold tracking-tight text-neutral-900">Casa Norte</span>
          </a>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
            <span className="text-xs font-medium text-neutral-500">Checkout seguro</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
        {step !== "confirmacao" && <StepIndicator current={step} onNavigate={setStep} />}

        {step === "confirmacao" ? (
          <SuccessPage method={method} orderNumber={orderNumber} />
        ) : (
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Left: Form */}
            <div className="lg:col-span-3 space-y-6">
              <AnimatePresence mode="wait">
                {step === "dados" && (
                  <motion.div key="dados" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                    <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-sm space-y-5">
                      <div>
                        <h2 className="text-base font-bold text-neutral-900">Dados pessoais</h2>
                        <p className="text-xs text-neutral-400 mt-0.5">Preencha seus dados para entrega e nota fiscal</p>
                      </div>
                      <div>
                        <FieldLabel required>Nome completo</FieldLabel>
                        <Input value={form.nome} onChange={v => updateField("nome", v)} placeholder="Maria Oliveira Santos" error={errors.nome} />
                        <FieldError error={errors.nome} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <FieldLabel required>CPF</FieldLabel>
                          <Input value={form.cpf} onChange={v => updateField("cpf", v)} placeholder="000.000.000-00" error={errors.cpf} inputMode="numeric" />
                          <FieldError error={errors.cpf} />
                        </div>
                        <div>
                          <FieldLabel required>Telefone</FieldLabel>
                          <Input value={form.telefone} onChange={v => updateField("telefone", v)} placeholder="(11) 99999-9999" error={errors.telefone} inputMode="numeric" />
                          <FieldError error={errors.telefone} />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-sm space-y-5 mt-6">
                      <div>
                        <h2 className="text-base font-bold text-neutral-900">Endereco de entrega</h2>
                        <p className="text-xs text-neutral-400 mt-0.5">Informe o CEP para preenchimento automatico</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <FieldLabel required>CEP</FieldLabel>
                          <div className="relative">
                            <Input value={form.cep} onChange={v => updateField("cep", v)} placeholder="00000-000" error={errors.cep} inputMode="numeric" />
                            {cepLoading && (
                              <div className="absolute right-3 top-3">
                                <svg className="h-5 w-5 animate-spin text-amber-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                              </div>
                            )}
                            {cepFound && !cepLoading && (
                              <div className="absolute right-3 top-3">
                                <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                              </div>
                            )}
                          </div>
                          <FieldError error={errors.cep} />
                        </div>
                        <div className="sm:col-span-2">
                          <FieldLabel required>Endereco</FieldLabel>
                          <Input value={form.endereco} onChange={v => updateField("endereco", v)} placeholder="Rua, Avenida..." error={errors.endereco} />
                          <FieldError error={errors.endereco} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div>
                          <FieldLabel required>Numero</FieldLabel>
                          <Input value={form.numero} onChange={v => updateField("numero", v)} placeholder="123" error={errors.numero} inputMode="numeric" />
                          <FieldError error={errors.numero} />
                        </div>
                        <div>
                          <FieldLabel>Complemento</FieldLabel>
                          <Input value={form.complemento} onChange={v => updateField("complemento", v)} placeholder="Apto, bloco..." />
                        </div>
                        <div>
                          <FieldLabel>Bairro</FieldLabel>
                          <input value={form.bairro} readOnly={cepFound} onChange={e => !cepFound && updateField("bairro", e.target.value)} placeholder="Bairro"
                            className={`h-11 w-full rounded-xl border border-neutral-200 bg-white px-3.5 text-sm shadow-sm transition-all placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:ring-offset-2 ${cepFound ? "bg-neutral-50 text-neutral-600" : ""}`} />
                        </div>
                        <div>
                          <FieldLabel required>Estado</FieldLabel>
                          {cepFound ? (
                            <input value={form.estado} readOnly
                              className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 text-sm text-neutral-600 shadow-sm" />
                          ) : (
                            <select value={form.estado} onChange={e => updateField("estado", e.target.value)}
                              className={`h-11 w-full rounded-xl border bg-white px-3 text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                errors.estado ? "border-red-300 focus:ring-red-500/40" : "border-neutral-200 focus:ring-amber-500/40 focus:border-amber-400"
                              }`}>
                              <option value="">UF</option>
                              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          )}
                          <FieldError error={errors.estado} />
                        </div>
                      </div>
                      {form.cidade && (
                        <div>
                          <FieldLabel>Cidade</FieldLabel>
                          <input value={form.cidade} readOnly={cepFound} onChange={e => !cepFound && updateField("cidade", e.target.value)} placeholder="Cidade"
                            className={`h-11 w-full rounded-xl border border-neutral-200 bg-white px-3.5 text-sm shadow-sm transition-all placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:ring-offset-2 ${cepFound ? "bg-neutral-50 text-neutral-600" : ""}`} />
                        </div>
                      )}
                    </div>

                    <button onClick={handleContinue}
                      className="mt-6 w-full rounded-xl bg-amber-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-amber-200/50 transition-all hover:bg-amber-700 active:scale-[0.98]">
                      Continuar para pagamento
                    </button>
                  </motion.div>
                )}

                {step === "pagamento" && (
                  <motion.div key="pagamento" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-sm space-y-5">
                      <div>
                        <h2 className="text-base font-bold text-neutral-900">Forma de pagamento</h2>
                        <p className="text-xs text-neutral-400 mt-0.5">Escolha como deseja pagar</p>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {([
                          { key: "pix" as const, icon: "⚡", label: "Pix", desc: "5% de desconto" },
                          { key: "cartao" as const, icon: "💳", label: "Cartao", desc: "ate 10x" },
                          { key: "boleto" as const, icon: "📄", label: "Boleto", desc: "3 dias uteis" },
                        ]).map(m => (
                          <button key={m.key} onClick={() => setMethod(m.key)}
                            className={`flex flex-col items-center rounded-xl border-2 px-3 py-3.5 transition-all ${
                              method === m.key
                                ? "border-amber-500 bg-amber-50/50 shadow-sm"
                                : "border-neutral-100 bg-white hover:border-neutral-200"
                            }`}>
                            <span className="text-xl mb-1">{m.icon}</span>
                            <span className={`text-sm font-semibold ${method === m.key ? "text-amber-700" : "text-neutral-700"}`}>{m.label}</span>
                            <span className={`text-[10px] mt-0.5 ${method === m.key ? "text-amber-600" : "text-neutral-400"}`}>{m.desc}</span>
                          </button>
                        ))}
                      </div>
                      <div className="border-t border-neutral-100 pt-5">
                        {method === "pix" && <PixPaymentFlow onConfirm={() => setStep("confirmacao")} />}
                        {method === "cartao" && <CardPaymentForm onSubmit={handlePayment} loading={loading} />}
                        {method === "boleto" && <BoletoFlow onGenerate={handlePayment} loading={loading} />}
                      </div>
                    </div>
                    <button onClick={() => setStep("dados")}
                      className="mt-4 flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 transition-colors">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                      Voltar para dados
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Summary */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-8">
                <OrderSummary method={method} installment={method === "cartao" ? installment : undefined} />
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-neutral-400">
                  <div className="flex items-center gap-1"><svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg><span className="text-[10px]">SSL 256-bit</span></div>
                  <div className="flex items-center gap-1"><svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg><span className="text-[10px]">PCI DSS</span></div>
                  <div className="flex items-center gap-1"><svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg><span className="text-[10px]">Compra segura</span></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-amber-100 bg-white/60 mt-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-amber-600"><svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg></div>
            <span className="text-sm font-semibold text-neutral-700">Casa Norte</span>
          </div>
          <p className="text-[11px] text-neutral-400">Casa Norte Moveis LTDA · CNPJ 12.345.678/0001-90 · Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
}
