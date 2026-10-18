"use client";

import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { controlStyles, controlBorder, controlError, labelStyles } from "../../utils/styles";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, hint, id, "aria-describedby": describedBy, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const descriptionId = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;
    return (
      <div className="space-y-1.5">
        {label && <label htmlFor={inputId} className={labelStyles}>{label}</label>}
        <input
          ref={ref}
          {...props}
          id={inputId}
          aria-invalid={error ? true : props["aria-invalid"]}
          aria-describedby={[describedBy, descriptionId].filter(Boolean).join(" ") || undefined}
          className={`${controlStyles} ${error ? controlError : controlBorder} ${className}`}
        />
        {error && <p id={`${inputId}-error`} className="text-xs text-red-700" role="alert">{error}</p>}
        {hint && !error && <p id={`${inputId}-hint`} className="text-xs leading-5 text-[#6b766d]">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
