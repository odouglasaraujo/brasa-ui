"use client";

import { labelStyles } from "../../utils/styles";
import { forwardRef, useId, useCallback, useState, type ChangeEvent } from "react";
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
        <div className={`flex h-10 items-center rounded-[var(--brasa-radius-control,0.625rem)] border bg-[var(--brasa-surface,#fff)] transition-shadow focus-within:ring-[3px] ${
          error
            ? "border-red-300 focus-within:ring-red-400/40"
            : "border-[var(--brasa-border,#dfe4dc)] focus-within:border-[var(--brasa-primary,#285b43)] focus-within:ring-[var(--brasa-ring,#dce9df)] hover:border-[#b7c3b8]"
        }`}>
          <span className="flex items-center gap-1.5 border-r border-neutral-200 bg-[#f5f6f2] px-3.5 py-2 rounded-l-[var(--brasa-radius-control,0.625rem)]">
            <span className="text-sm">🇧🇷</span>
            <span className="text-[11px] font-semibold tracking-wide text-neutral-500">+55</span>
          </span>
          <input
            {...props}
          ref={ref}
            id={inputId}
            type="tel"
            inputMode="tel"
            placeholder="(00) 00000-0000"
            aria-invalid={!!error}
            aria-describedby={[props["aria-describedby"], error ? `${inputId}-error` : null].filter(Boolean).join(" ") || undefined}
            value={currentValue}
            onChange={handleChange}
            maxLength={15}
            className={`min-w-0 flex-1 bg-transparent px-3.5 py-2 font-mono text-sm text-neutral-900 placeholder:text-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            />
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-xs font-medium text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

PhoneBR.displayName = "PhoneBR";
