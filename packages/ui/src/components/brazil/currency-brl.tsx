"use client";

import { forwardRef, useCallback, useState, type ChangeEvent } from "react";

export interface CurrencyBRLProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value?: number;
  onChange?: (value: number, formatted: string) => void;
  label?: string;
  error?: string;
  showInstallments?: boolean;
  maxInstallments?: number;
}

function formatCurrency(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export const CurrencyBRL = forwardRef<HTMLInputElement, CurrencyBRLProps>(
  (
    {
      className = "",
      value: controlledValue,
      onChange,
      label = "Valor",
      error,
      showInstallments = false,
      maxInstallments = 10,
      id,
      ...props
    },
    ref
  ) => {
    const [internalCents, setInternalCents] = useState(0);

    const cents = controlledValue !== undefined ? Math.round(controlledValue * 100) : internalCents;

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const digits = e.target.value.replace(/\D/g, "");
        const newCents = parseInt(digits || "0", 10);

        if (controlledValue === undefined) {
          setInternalCents(newCents);
        }

        const numericValue = newCents / 100;
        const formatted = formatCurrency(newCents);
        onChange?.(numericValue, `R$ ${formatted}`);
      },
      [controlledValue, onChange]
    );

    const inputId = id || "currency-brl";
    const displayValue = formatCurrency(cents);
    const installmentValue = cents > 0 && maxInstallments > 1
      ? formatCurrency(Math.ceil(cents / maxInstallments))
      : null;

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-neutral-700"
          >
            {label}
          </label>
        )}
        <div className={`flex items-center rounded-xl border bg-white transition-colors focus-within:ring-2 focus-within:ring-offset-2 ${
          error
            ? "border-red-300 focus-within:ring-red-400"
            : "border-neutral-200 focus-within:ring-neutral-400 hover:border-neutral-300"
        }`}>
          <span className="border-r border-neutral-200 bg-neutral-50 px-3 py-2 text-sm font-medium text-neutral-500 rounded-l-xl">
            R$
          </span>
          <input
            ref={ref}
            id={inputId}
            type="text"
            inputMode="numeric"
            placeholder="0,00"
            aria-invalid={!!error}
            value={displayValue}
            onChange={handleChange}
            className={`flex-1 bg-transparent px-3 py-2 font-mono text-sm text-neutral-900 placeholder:text-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-red-600" role="alert">
            {error}
          </p>
        )}
        {showInstallments && installmentValue && (
          <p className="text-xs text-neutral-500">
            ou {maxInstallments}x de R$ {installmentValue} sem juros
          </p>
        )}
      </div>
    );
  }
);

CurrencyBRL.displayName = "CurrencyBRL";
