"use client";

import { forwardRef, useCallback, useState, type ChangeEvent } from "react";
import { maskPhone } from "../../utils/masks";
import { validatePhone } from "../../utils/validators";

export interface PhoneBRProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value?: string;
  onChange?: (value: string, raw: string) => void;
  onValidate?: (valid: boolean) => void;
  label?: string;
  error?: string;
}

export const PhoneBR = forwardRef<HTMLInputElement, PhoneBRProps>(
  (
    {
      className = "",
      value: controlledValue,
      onChange,
      onValidate,
      label = "Telefone",
      error,
      id,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState("");

    const currentValue = controlledValue ?? internalValue;

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const masked = maskPhone(e.target.value);
        const raw = masked.replace(/\D/g, "");

        if (controlledValue === undefined) {
          setInternalValue(masked);
        }

        onChange?.(masked, raw);

        if (raw.length >= 10) {
          onValidate?.(validatePhone(raw));
        }
      },
      [controlledValue, onChange, onValidate]
    );

    const inputId = id || "phone-br";

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
          <span className="flex items-center gap-1.5 border-r border-neutral-200 bg-neutral-50 px-3 py-2 rounded-l-xl">
            <span className="text-sm">🇧🇷</span>
            <span className="text-xs font-medium text-neutral-500">+55</span>
          </span>
          <input
            ref={ref}
            id={inputId}
            type="tel"
            inputMode="tel"
            placeholder="(00) 00000-0000"
            aria-invalid={!!error}
            value={currentValue}
            onChange={handleChange}
            maxLength={15}
            className={`flex-1 bg-transparent px-3 py-2 font-mono text-sm text-neutral-900 placeholder:text-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

PhoneBR.displayName = "PhoneBR";
