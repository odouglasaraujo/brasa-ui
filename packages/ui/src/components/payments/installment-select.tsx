"use client";

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
              onClick={() => handleSelect(opt)}
              className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left shadow-sm transition-all duration-150 active:scale-[0.99] ${
                isSelected
                  ? "border-emerald-500 bg-emerald-50/50 shadow-emerald-100/50"
                  : "border-neutral-100 bg-white hover:border-neutral-200 hover:shadow-md"
              }`}
            >
              <div
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  isSelected
                    ? "border-emerald-500 bg-emerald-500"
                    : "border-neutral-300"
                }`}
              >
                {isSelected && (
                  <div className="h-1.5 w-1.5 rounded-full bg-white" />
                )}
              </div>
              <div className="flex flex-1 items-center justify-between">
                <span className="text-sm font-medium text-neutral-900">
                  {opt.installments}x de R$ {formatBRL(opt.value)}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wide ${
                    opt.interestFree
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-neutral-100 text-neutral-500"
                  }`}
                >
                  {opt.installments === 1
                    ? "a vista"
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
