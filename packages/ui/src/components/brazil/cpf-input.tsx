"use client";

import { forwardRef, useCallback, useState, type ChangeEvent } from "react";
import { maskCPF } from "../../utils/masks";
import { validateCPF } from "../../utils/validators";

export interface CPFInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value?: string;
  onChange?: (value: string, raw: string) => void;
  onValidate?: (valid: boolean) => void;
  label?: string;
  error?: string;
  showValidation?: boolean;
}

export const CPFInput = forwardRef<HTMLInputElement, CPFInputProps>(
  (
    {
      className = "",
      value: controlledValue,
      onChange,
      onValidate,
      label = "CPF",
      error,
      showValidation = true,
      id,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState("");
    const [validationState, setValidationState] = useState<
      "idle" | "valid" | "invalid"
    >("idle");

    const currentValue = controlledValue ?? internalValue;

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const masked = maskCPF(e.target.value);
        const raw = masked.replace(/\D/g, "");

        if (controlledValue === undefined) {
          setInternalValue(masked);
        }

        onChange?.(masked, raw);

        if (raw.length === 11) {
          const isValid = validateCPF(raw);
          setValidationState(isValid ? "valid" : "invalid");
          onValidate?.(isValid);
        } else {
          setValidationState("idle");
        }
      },
      [controlledValue, onChange, onValidate]
    );

    const inputId = id || "cpf-input";
    const hasError = error || validationState === "invalid";

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
        <input
          ref={ref}
          id={inputId}
          type="text"
          inputMode="numeric"
          placeholder="000.000.000-00"
          aria-invalid={!!hasError}
          aria-describedby={
            hasError
              ? `${inputId}-error`
              : showValidation && validationState === "valid"
                ? `${inputId}-valid`
                : undefined
          }
          value={currentValue}
          onChange={handleChange}
          maxLength={14}
          className={`flex h-10 w-full rounded-xl border bg-white px-3 py-2 font-mono text-sm text-neutral-900 transition-colors placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
            hasError
              ? "border-red-300 focus-visible:ring-red-400"
              : validationState === "valid"
                ? "border-emerald-300 focus-visible:ring-emerald-400"
                : "border-neutral-200 focus-visible:ring-neutral-400 hover:border-neutral-300"
          } ${className}`}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-600" role="alert">
            {error}
          </p>
        )}
        {showValidation && !error && validationState === "valid" && (
          <p id={`${inputId}-valid`} className="text-xs text-emerald-600" role="status">
            CPF válido
          </p>
        )}
        {showValidation && !error && validationState === "invalid" && (
          <p id={`${inputId}-error`} className="text-xs text-red-600" role="alert">
            CPF inválido
          </p>
        )}
      </div>
    );
  }
);

CPFInput.displayName = "CPFInput";
