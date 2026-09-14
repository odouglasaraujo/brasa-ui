import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

export interface ShimmerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  shimmerColor?: string;
  shimmerSize?: string;
  shimmerDuration?: string;
  background?: string;
  borderRadius?: string;
}

export const ShimmerButton = forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      className = "",
      children,
      shimmerColor = "#059669",
      shimmerSize = "0.1em",
      shimmerDuration = "2.5s",
      background = "rgba(0, 0, 0, 0.9)",
      borderRadius = "12px",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`group relative inline-flex h-11 items-center justify-center overflow-hidden whitespace-nowrap px-6 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 ${className}`}
        style={{ borderRadius, background }}
        {...props}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ borderRadius }}
        >
          <div
            className="absolute inset-[-100%]"
            style={{
              background: `conic-gradient(from 0deg, transparent 0 340deg, ${shimmerColor} 360deg)`,
              animation: `shimmer-spin ${shimmerDuration} linear infinite`,
            }}
          />
        </div>
        <div
          className="absolute inset-px flex items-center justify-center"
          style={{ borderRadius, background }}
        />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        <style>{`
          @keyframes shimmer-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";
