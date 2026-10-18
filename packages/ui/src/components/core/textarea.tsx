"use client";

import { forwardRef, useId, type TextareaHTMLAttributes } from "react";
import { controlStyles, controlBorder, controlError, labelStyles } from "../../utils/styles";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", label, error, hint, id, "aria-describedby": describedBy, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const descriptionId = error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined;
    return (
      <div className="space-y-1.5">
        {label && <label htmlFor={textareaId} className={labelStyles}>{label}</label>}
        <textarea
          ref={ref}
          {...props}
          id={textareaId}
          aria-invalid={error ? true : props["aria-invalid"]}
          aria-describedby={[describedBy, descriptionId].filter(Boolean).join(" ") || undefined}
          className={`${controlStyles} min-h-24 resize-y ${error ? controlError : controlBorder} ${className}`}
        />
        {error && <p id={`${textareaId}-error`} className="text-xs text-red-700" role="alert">{error}</p>}
        {hint && !error && <p id={`${textareaId}-hint`} className="text-xs leading-5 text-[#6b766d]">{hint}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
