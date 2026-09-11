import { forwardRef, type TextareaHTMLAttributes } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", label, error, hint, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-neutral-700"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
          className={`flex min-h-[80px] w-full rounded-xl border bg-white px-3 py-2 text-sm text-neutral-900 transition-colors placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
            error
              ? "border-red-300 focus-visible:ring-red-400"
              : "border-neutral-200 focus-visible:ring-neutral-400 hover:border-neutral-300"
          } ${className}`}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="text-xs text-red-600" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${textareaId}-hint`} className="text-xs text-neutral-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
