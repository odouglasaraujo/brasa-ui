"use client";

import { forwardRef, useId, type SelectHTMLAttributes } from "react";
import { controlStyles, controlBorder, controlError, labelStyles } from "../../utils/styles";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", label, error, options, placeholder, id, "aria-describedby": describedBy, ...props }, ref) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    return (
      <div className="space-y-1.5">
        {label && <label htmlFor={selectId} className={labelStyles}>{label}</label>}
        <div className="relative">
          <select
            ref={ref}
            {...props}
            id={selectId}
            aria-invalid={error ? true : props["aria-invalid"]}
            aria-describedby={[describedBy, error ? `${selectId}-error` : undefined].filter(Boolean).join(" ") || undefined}
            className={`${controlStyles} appearance-none pr-9 ${error ? controlError : controlBorder} ${className}`}
          >
            {placeholder && <option value="" disabled>{placeholder}</option>}
            {options.map((option) => <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>)}
          </select>
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="pointer-events-none absolute right-3 top-3 size-4 text-[#6b766d]"><path d="m8 10 4 4 4-4" /></svg>
        </div>
        {error && <p id={`${selectId}-error`} className="text-xs text-red-700" role="alert">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";
