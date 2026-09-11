"use client";

import { useCallback, useEffect, useState } from "react";

export type PixPaymentStatus =
  | "idle"
  | "qr_generated"
  | "waiting_payment"
  | "paid"
  | "expired"
  | "failed";

export interface PixPaymentProps {
  amount: number;
  pixCode?: string;
  expiresIn?: number;
  beneficiary?: string;
  onCopy?: () => void;
  onPayment?: () => void;
  onExpired?: () => void;
  status?: PixPaymentStatus;
  className?: string;
}

function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function PixPayment({
  amount,
  pixCode = "00020126580014br.gov.bcb.pix0136example-key5204000053039865802BR",
  expiresIn = 300,
  beneficiary,
  onCopy,
  onPayment,
  onExpired,
  status: controlledStatus,
  className = "",
}: PixPaymentProps) {
  const [internalStatus, setInternalStatus] =
    useState<PixPaymentStatus>("qr_generated");
  const [timeLeft, setTimeLeft] = useState(expiresIn);
  const [copied, setCopied] = useState(false);

  const status = controlledStatus ?? internalStatus;

  useEffect(() => {
    if (status !== "qr_generated" && status !== "waiting_payment") return;
    if (timeLeft <= 0) {
      setInternalStatus("expired");
      onExpired?.();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [status, timeLeft, onExpired]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setInternalStatus("waiting_payment");
    onCopy?.();
    setTimeout(() => setCopied(false), 2000);
  }, [pixCode, onCopy]);

  if (status === "paid") {
    return (
      <div className={`rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center ${className}`}>
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
          <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <p className="text-lg font-bold text-emerald-900">Pagamento confirmado</p>
        <p className="mt-1 text-sm text-emerald-700">{formatBRL(amount)}</p>
      </div>
    );
  }

  if (status === "expired") {
    return (
      <div className={`rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-center ${className}`}>
        <p className="text-lg font-bold text-neutral-900">QR Code expirado</p>
        <p className="mt-1 text-sm text-neutral-500">Gere um novo código para continuar</p>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border border-neutral-200 bg-white p-6 ${className}`}>
      <div className="text-center">
        <p className="text-2xl font-bold text-neutral-900">{formatBRL(amount)}</p>
        {beneficiary && (
          <p className="mt-1 text-sm text-neutral-500">para {beneficiary}</p>
        )}
      </div>

      <div className="mx-auto my-5 flex h-40 w-40 items-center justify-center rounded-2xl border border-neutral-100 bg-neutral-50">
        <svg viewBox="0 0 100 100" className="h-28 w-28">
          {Array.from({ length: 8 }, (_, r) =>
            Array.from({ length: 8 }, (_, c) => {
              const isCorner =
                (r < 3 && c < 3) || (r < 3 && c > 4) || (r > 4 && c < 3);
              const isData = !isCorner && ((r + c) % 3 !== 0 || (r * c) % 2 === 0);
              return (
                <rect
                  key={`${r}-${c}`}
                  x={4 + c * 12}
                  y={4 + r * 12}
                  width="9"
                  height="9"
                  rx="2"
                  fill={isCorner || isData ? "#171717" : "#e5e5e5"}
                  opacity={isCorner ? 1 : isData ? 0.8 : 0.2}
                />
              );
            })
          )}
          <rect x="34" y="34" width="32" height="32" rx="8" fill="#059669" />
          <text x="50" y="54" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
            PIX
          </text>
        </svg>
      </div>

      <div className="mb-4 text-center">
        <p className="text-sm text-neutral-500">
          Expira em{" "}
          <span className="font-mono font-medium text-neutral-900">
            {formatTime(timeLeft)}
          </span>
        </p>
      </div>

      <button
        onClick={handleCopy}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
      >
        {copied ? (
          <>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Código copiado
          </>
        ) : (
          <>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
            </svg>
            Copiar código Pix
          </>
        )}
      </button>
    </div>
  );
}
