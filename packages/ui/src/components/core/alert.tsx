import { forwardRef, type HTMLAttributes } from "react";

const variants = {
  default: "border-neutral-200 bg-neutral-50 text-neutral-900",
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  error: "border-red-200 bg-red-50 text-red-900",
  info: "border-blue-200 bg-blue-50 text-blue-900",
} as const;

const iconColors = {
  default: "text-neutral-500",
  success: "text-emerald-600",
  warning: "text-amber-600",
  error: "text-red-600",
  info: "text-blue-600",
} as const;

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof variants;
  title?: string;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = "default", title, icon, dismissible, onDismiss, children, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={`flex gap-3 rounded-xl border p-4 ${variants[variant]} ${className}`}
        {...props}
      >
        {icon && (
          <div className={`shrink-0 mt-0.5 ${iconColors[variant]}`}>
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          {title && (
            <p className="text-sm font-semibold">{title}</p>
          )}
          {children && (
            <div className={`text-sm opacity-90 ${title ? "mt-1" : ""}`}>
              {children}
            </div>
          )}
        </div>
        {dismissible && (
          <button
            onClick={onDismiss}
            className="shrink-0 rounded-lg p-1 opacity-50 transition-opacity hover:opacity-100"
            aria-label="Fechar"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = "Alert";
