"use client";

import { focusStyles } from "../../utils/styles";
import { useState, useCallback } from "react";

export interface InstallmentOption {
  installments: number;
  value: number;
  total: number;
  interestFree: boolean;
}

export interface InstallmentSelectProps {
  amount: number;
  maxInstallments?: number;
  minInstallmentValue?: number;
  interestRate?: number;
  freeInstallments?: number;
  onChange?: (option: InstallmentOption) => void;
  value?: number;
  label?: string;
  className?: string;
}

function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function generateOptions(
  amount: number,
  maxInstallments: number,
  minValue: number,
  interestRate: number,
  freeInstallments: number
): InstallmentOption[] {
  const options: InstallmentOption[] = [];

  for (let i = 1; i <= maxInstallments; i++) {
    const interestFree = i <= freeInstallments;
    const total = interestFree
      ? amount
      : amount * Math.pow(1 + interestRate / 100, i);
    const value = total / i;

    if (value < minValue && i > 1) break;

    options.push({
      installments: i,
      value: Math.ceil(value * 100) / 100,
      total: Math.ceil(total * 100) / 100,
      interestFree,
    });
  }

  return options;
}

export function InstallmentSelect({
  amount,
  maxInstallments = 12,
  minInstallmentValue = 5,
  interestRate = 1.99,
  freeInstallments = 3,
  onChange,
  value: controlledValue,
  label = "Parcelamento",
  className = "",
}: InstallmentSelectProps) {
  const [internalValue, setInternalValue] = useState(1);
  const selected = controlledValue ?? internalValue;

  const options = generateOptions(
    amount,
    maxInstallments,
    minInstallmentValue,
    interestRate,
    freeInstallments
  );

  const handleSelect = useCallback(
    (option: InstallmentOption) => {
      if (controlledValue === undefined) {
        setInternalValue(option.installments);
      }
      onChange?.(option);
    },
    [controlledValue, onChange]
  );

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-[13px] font-semibold text-neutral-700">
          {label}
        </label>
      )}
      <div className="space-y-1.5" role="radiogroup" aria-label={label}>
        {options.map((opt) => {
          const isSelected = selected === opt.installments;
          return (
            <button
              key={opt.installments}
              type="button"
              role="radio"
              aria-checked={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onKeyDown={(event) => {
                const delta = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : event.key === "ArrowUp" || event.key === "ArrowLeft" ? -1 : 0;
                if (!delta) return;
                event.preventDefault();
                const next = options[(options.indexOf(opt) + delta + options.length) % options.length];
                handleSelect(next);
                const buttons = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="radio"]');
                buttons?.[options.indexOf(next)]?.focus();
              }}
              onClick={() => handleSelect(opt)}
              className={`${focusStyles} flex w-full items-center gap-3 rounded-[var(--brasa-radius-control,0.625rem)] border px-3 py-3 text-left transition-colors duration-150 ${
                isSelected
                  ? "border-[#75977c] bg-[#f0f5eb]"
                  : "border-[#dfe4dc] bg-white hover:border-[#b7c3b8]"
              }`}
            >
              <div
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  isSelected
                    ? "border-[#285b43] bg-[#285b43]"
                    : "border-neutral-300"
                }`}
              >
                {isSelected && (
                  <div className="h-1.5 w-1.5 rounded-full bg-white" />
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-medium text-neutral-900">
                  {opt.installments}x de R$ {formatBRL(opt.value)}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wide ${
                    opt.interestFree
                      ? "bg-[#e4edda] text-[#385b31]"
                      : "bg-neutral-100 text-neutral-500"
                  }`}
                >
                  {opt.installments === 1
                    ? "à vista"
                    : opt.interestFree
                      ? "sem juros"
                      : `total R$ ${formatBRL(opt.total)}`}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
