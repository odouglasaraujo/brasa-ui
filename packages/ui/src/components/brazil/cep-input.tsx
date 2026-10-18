"use client";

import { controlStyles, controlBorder, controlError, labelStyles } from "../../utils/styles";
import { forwardRef, useId, useCallback, useState, type ChangeEvent } from "react";
import { maskCEP } from "../../utils/masks";
import { validateCEP } from "../../utils/validators";

export interface CEPAddress {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export interface CEPInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value?: string;
  onChange?: (value: string, raw: string) => void;
  onAddress?: (address: CEPAddress | null) => void;
  label?: string;
  error?: string;
  autoFetch?: boolean;
}

async function fetchCEP(cep: string): Promise<CEPAddress | null> {
  try {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await res.json();
    if (data.erro) return null;
    return data as CEPAddress;
  } catch {
    return null;
  }
}

export const CEPInput = forwardRef<HTMLInputElement, CEPInputProps>(
  (
    {
      className = "",
      value: controlledValue,
      onChange,
      onAddress,
      label = "CEP",
      error,
      autoFetch = true,
      id,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState<CEPAddress | null>(null);

    const currentValue = controlledValue ?? internalValue;

    const handleChange = useCallback(
      async (e: ChangeEvent<HTMLInputElement>) => {
        const masked = maskCEP(e.target.value);
        const raw = masked.replace(/\D/g, "");

        if (controlledValue === undefined) {
          setInternalValue(masked);
        }

        onChange?.(masked, raw);

        if (autoFetch && validateCEP(raw)) {
          setLoading(true);
          const result = await fetchCEP(raw);
          setAddress(result);
          onAddress?.(result);
          setLoading(false);
        } else {
          setAddress(null);
        }
      },
      [controlledValue, onChange, onAddress, autoFetch]
    );

    const generatedId = useId();
    const inputId = id || generatedId;

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
        <div className="relative">
          <input
            {...props}
          ref={ref}
            id={inputId}
            type="text"
            inputMode="numeric"
            placeholder="00000-000"
            aria-invalid={!!error}
            aria-describedby={[props["aria-describedby"], error ? `${inputId}-error` : null].filter(Boolean).join(" ") || undefined}
            value={currentValue}
            onChange={handleChange}
            maxLength={9}
            className={`${controlStyles} font-mono ${
              error
                ? controlError
                : controlBorder
            } ${className}`}
            />
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-200 border-t-emerald-600" />
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-xs font-medium text-red-600" role="alert">
            {error}
          </p>
        )}
        {address && (
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 px-3.5 py-2.5">
            <p className="text-sm font-medium text-neutral-900">{address.logradouro}</p>
            <p className="text-xs text-neutral-500">
              {address.bairro} — {address.localidade}, {address.uf}
            </p>
          </div>
        )}
      </div>
    );
  }
);

CEPInput.displayName = "CEPInput";
