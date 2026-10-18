"use client";

import { labelStyles } from "../../utils/styles";
import { forwardRef, useId, useCallback, useState, type ChangeEvent } from "react";

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

    const generatedId = useId();
    const inputId = id || generatedId;
    const displayValue = formatCurrency(cents);
    const installmentValue = cents > 0 && maxInstallments > 1
      ? formatCurrency(Math.ceil(cents / maxInstallments))
      : null;

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className={labelStyles}
          >
            {label}
          </label>
        )}
        <div className={`flex h-10 items-center rounded-[var(--brasa-radius-control,0.625rem)] border bg-[var(--brasa-surface,#fff)] transition-shadow focus-within:ring-[3px] ${
          error
            ? "border-red-300 focus-within:ring-red-400/40"
            : "border-[var(--brasa-border,#dfe4dc)] focus-within:border-[var(--brasa-primary,#285b43)] focus-within:ring-[var(--brasa-ring,#dce9df)] hover:border-[#b7c3b8]"
        }`}>
          <span className="border-r border-neutral-200 bg-[#f5f6f2] px-3.5 py-2 text-sm font-semibold text-neutral-500 rounded-l-[var(--brasa-radius-control,0.625rem)]">
            R$
          </span>
          <input
            {...props}
          ref={ref}
            id={inputId}
            type="text"
            inputMode="numeric"
            placeholder="0,00"
            aria-invalid={!!error}
            aria-describedby={[props["aria-describedby"], error ? `${inputId}-error` : null].filter(Boolean).join(" ") || undefined}
            value={displayValue}
            onChange={handleChange}
            className={`min-w-0 flex-1 bg-transparent px-3.5 py-2 font-mono text-sm text-neutral-900 placeholder:text-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            />
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-xs font-medium text-red-600" role="alert">
            {error}
          </p>
        )}
        {showInstallments && installmentValue && (
          <p className="text-xs font-medium text-neutral-500">
            ou {maxInstallments}x de R$ {installmentValue} sem juros
          </p>
        )}
      </div>
    );
  }
);

CurrencyBRL.displayName = "CurrencyBRL";
