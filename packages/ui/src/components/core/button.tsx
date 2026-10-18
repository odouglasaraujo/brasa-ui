import { forwardRef, type ButtonHTMLAttributes } from "react";
import { focusStyles } from "../../utils/styles";

const variants = {
  default: "border-transparent bg-[#23352c] text-white shadow-[0_1px_2px_#182a1e18] hover:bg-[#15271d]",
  primary: "border-transparent bg-[var(--brasa-primary,#285b43)] text-white shadow-[0_1px_2px_#182a1e18] hover:bg-[var(--brasa-primary-hover,#1d4733)]",
  outline: "border-[var(--brasa-border,#dfe4dc)] bg-[var(--brasa-surface,#fff)] text-[var(--brasa-foreground,#23352c)] shadow-[0_1px_2px_#182a1e05] hover:bg-[var(--brasa-subtle,#f0f4ec)]",
  ghost: "border-transparent text-[#526157] hover:bg-[var(--brasa-subtle,#f0f4ec)] hover:text-[#23352c]",
  destructive: "border-transparent bg-[#bc3c3c] text-white hover:bg-[#a52b2b]",
  link: "border-transparent text-[var(--brasa-primary,#285b43)] underline-offset-4 hover:underline",
} as const;

const sizes = {
  sm: "h-8 gap-1.5 px-3 text-xs",
  md: "h-10 gap-2 px-4 text-sm",
  lg: "h-12 gap-2 px-6 text-sm",
} as const;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "md", disabled, loading = false, children, ...props }, ref) => (
    <button
      ref={ref}
      {...props}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-[var(--brasa-radius-control,0.625rem)] border font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0 ${focusStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading && (
        <svg aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" opacity=".25" />
          <path d="M12 3a9 9 0 019 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
      {children}
    </button>
  )
);
Button.displayName = "Button";
