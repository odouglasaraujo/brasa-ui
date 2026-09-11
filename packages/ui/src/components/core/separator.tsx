import { forwardRef, type HTMLAttributes } from "react";

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  label?: string;
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ orientation = "horizontal", label, className = "", ...props }, ref) => {
    if (label) {
      return (
        <div
          ref={ref}
          role="separator"
          className={`flex items-center gap-3 ${className}`}
          {...props}
        >
          <div className="h-px flex-1 bg-neutral-200" />
          <span className="text-xs font-medium text-neutral-400">{label}</span>
          <div className="h-px flex-1 bg-neutral-200" />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="separator"
        className={`${
          orientation === "horizontal"
            ? "h-px w-full bg-neutral-200"
            : "h-full w-px bg-neutral-200"
        } ${className}`}
        {...props}
      />
    );
  }
);

Separator.displayName = "Separator";
