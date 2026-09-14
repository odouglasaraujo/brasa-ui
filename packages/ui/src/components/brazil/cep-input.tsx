"use client";

import { forwardRef, useCallback, useState, type ChangeEvent } from "react";
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

    const inputId = id || "cep-input";

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[13px] font-semibold text-neutral-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type="text"
            inputMode="numeric"
            placeholder="00000-000"
            aria-invalid={!!error}
            value={currentValue}
            onChange={handleChange}
            maxLength={9}
            className={`flex h-10 w-full rounded-xl border bg-white px-3.5 py-2 font-mono text-sm text-neutral-900 shadow-sm transition-all duration-150 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
              error
                ? "border-red-300 focus-visible:ring-red-400/40"
                : "border-neutral-200 focus-visible:ring-emerald-500/40 hover:border-neutral-300"
            } ${className}`}
            {...props}
          />
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-200 border-t-emerald-600" />
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs font-medium text-red-600" role="alert">
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
