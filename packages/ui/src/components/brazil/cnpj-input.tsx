"use client";

import { forwardRef, useState, useCallback, type InputHTMLAttributes } from "react";
import { maskCNPJ } from "../../utils/masks";
import { validateCNPJ } from "../../utils/validators";

export interface CNPJInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value?: string;
  onChange?: (value: string, isValid: boolean) => void;
  label?: string;
  error?: string;
  hint?: string;
  showValidation?: boolean;
}

export const CNPJInput = forwardRef<HTMLInputElement, CNPJInputProps>(
  ({ value: controlledValue, onChange, label, error, hint, showValidation = true, className = "", ...props }, ref) => {
    const [internalValue, setInternalValue] = useState("");
    const [touched, setTouched] = useState(false);

    const displayValue = controlledValue !== undefined ? maskCNPJ(controlledValue) : internalValue;
    const rawDigits = displayValue.replace(/\D/g, "");
    const isComplete = rawDigits.length === 14;
    const isValid = isComplete && validateCNPJ(rawDigits);
    const showError = touched && isComplete && !isValid && showValidation;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const masked = maskCNPJ(e.target.value);
        if (controlledValue === undefined) setInternalValue(masked);
        const digits = masked.replace(/\D/g, "");
        onChange?.(digits, digits.length === 14 && validateCNPJ(digits));
      },
      [controlledValue, onChange]
    );

    const errorMessage = error || (showError ? "CNPJ invalido" : undefined);

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-[13px] font-semibold text-neutral-700">{label}</label>
        )}
        <input
          ref={ref}
          type="text"
          inputMode="numeric"
          placeholder="00.000.000/0000-00"
          value={displayValue}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
          maxLength={18}
          className={`h-10 rounded-xl border bg-white px-3.5 font-mono text-sm text-neutral-900 shadow-sm outline-none transition-all duration-150 placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
            errorMessage
              ? "border-red-300 focus-visible:ring-red-400/40"
              : touched && isComplete && isValid
              ? "border-emerald-300 focus-visible:ring-emerald-500/40"
              : "border-neutral-200 focus-visible:ring-emerald-500/40 hover:border-neutral-300"
          } ${className}`}
          aria-invalid={!!errorMessage}
          {...props}
        />
        {errorMessage && (
          <span className="text-xs font-medium text-red-600">{errorMessage}</span>
        )}
        {!errorMessage && hint && (
          <span className="text-xs text-neutral-500">{hint}</span>
        )}
      </div>
    );
  }
);

CNPJInput.displayName = "CNPJInput";
