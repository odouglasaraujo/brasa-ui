import { forwardRef, type InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, hint, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

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
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={`flex h-10 w-full rounded-xl border bg-white px-3.5 py-2 text-sm text-neutral-900 shadow-sm transition-all duration-150 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
            error
              ? "border-red-300 focus-visible:ring-red-400/40"
              : "border-neutral-200 focus-visible:ring-emerald-500/40 hover:border-neutral-300"
          } ${className}`}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs font-medium text-red-600" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-neutral-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
