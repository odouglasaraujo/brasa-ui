import { forwardRef, type HTMLAttributes } from "react";

export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  value: number;
  max?: number;
  variant?: "default" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}

const variantColors = {
  default: "bg-emerald-600",
  success: "bg-green-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
} as const;

const sizeClasses = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
} as const;

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className = "",
      value,
      max = 100,
      variant = "default",
      size = "md",
      showLabel = false,
      label,
      animated = true,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div ref={ref} className={`w-full ${className}`} {...props}>
        {(showLabel || label) && (
          <div className="mb-1.5 flex items-center justify-between text-sm">
            {label && <span className="font-medium text-neutral-700">{label}</span>}
            {showLabel && (
              <span className="tabular-nums text-neutral-500">{Math.round(percentage)}%</span>
            )}
          </div>
        )}
        <div
          className={`w-full overflow-hidden rounded-full bg-neutral-100 ${sizeClasses[size]}`}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          <div
            className={`h-full rounded-full ${variantColors[variant]} ${
              animated ? "transition-all duration-500 ease-out" : ""
            }`}
            style={{ width: `${percentage}%` }}
          >
            {animated && percentage > 0 && percentage < 100 && (
              <div
                className="h-full w-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  backgroundSize: "200% 100%",
                  animation: "progress-shimmer 2s ease-in-out infinite",
                }}
              />
            )}
          </div>
        </div>
        <style>{`
          @keyframes progress-shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
      </div>
    );
  }
);

Progress.displayName = "Progress";

export interface StepProgressProps extends HTMLAttributes<HTMLDivElement> {
  steps: string[];
  currentStep: number;
}

export const StepProgress = forwardRef<HTMLDivElement, StepProgressProps>(
  ({ className = "", steps, currentStep, ...props }, ref) => {
    return (
      <div ref={ref} className={`w-full ${className}`} {...props}>
        <div className="flex items-center">
          {steps.map((step, i) => (
            <div key={i} className={`flex items-center ${i < steps.length - 1 ? "flex-1" : ""}`}>
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors duration-300 ${
                    i < currentStep
                      ? "bg-emerald-600 text-white"
                      : i === currentStep
                      ? "border-2 border-emerald-600 text-emerald-600"
                      : "border border-neutral-200 text-neutral-400"
                  }`}
                >
                  {i < currentStep ? (
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={`text-xs text-center ${
                    i <= currentStep ? "font-medium text-neutral-900" : "text-neutral-400"
                  }`}
                >
                  {step}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`mx-2 mt-[-1.25rem] h-px flex-1 transition-colors duration-300 ${
                    i < currentStep ? "bg-emerald-600" : "bg-neutral-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

StepProgress.displayName = "StepProgress";
