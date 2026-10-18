"use client";

import { controlStyles, controlBorder, controlError, labelStyles } from "../../utils/styles";
import { forwardRef, useId, useState, useCallback, type InputHTMLAttributes } from "react";
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
  ({ value: controlledValue, onChange, label, error, hint, showValidation = true, className = "", id, onBlur, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState("");
    const generatedId = useId();
    const inputId = id || generatedId;
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

    const errorMessage = error || (showError ? "CNPJ inválido" : undefined);

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className={labelStyles}>{label}</label>
        )}
        <input
          {...props}
          ref={ref}
          id={inputId}
          type="text"
          inputMode="numeric"
          placeholder="00.000.000/0000-00"
          value={displayValue}
          onChange={handleChange}
          onBlur={(event) => { setTouched(true); onBlur?.(event); }}
          maxLength={18}
          className={`${controlStyles} font-mono ${
            errorMessage
              ? controlError
              : touched && isComplete && isValid
              ? "border-[#88a68b]"
              : controlBorder
          } ${className}`}
          aria-invalid={!!errorMessage}
          aria-describedby={[props["aria-describedby"], errorMessage || hint ? `${inputId}-description` : null].filter(Boolean).join(" ") || undefined}
        />
        {errorMessage && (
          <span id={`${inputId}-description`} className="text-xs font-medium text-red-600">{errorMessage}</span>
        )}
        {!errorMessage && hint && (
          <span id={`${inputId}-description`} className="text-xs text-neutral-500">{hint}</span>
        )}
      </div>
    );
  }
);

CNPJInput.displayName = "CNPJInput";
