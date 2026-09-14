import { forwardRef, type ButtonHTMLAttributes } from "react";

const variants = {
  default: "bg-neutral-900 text-white shadow-sm hover:bg-neutral-800 active:bg-neutral-950",
  primary: "bg-emerald-600 text-white shadow-sm shadow-emerald-200/50 hover:bg-emerald-700 active:bg-emerald-800",
  outline: "border border-neutral-200 bg-white text-neutral-900 shadow-sm hover:bg-neutral-50 hover:border-neutral-300 active:bg-neutral-100",
  ghost: "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-200",
  destructive: "bg-red-600 text-white shadow-sm hover:bg-red-700 active:bg-red-800",
  link: "text-neutral-900 underline-offset-4 hover:underline",
} as const;

const sizes = {
  sm: "h-8 px-3 text-xs gap-1.5 rounded-lg",
  md: "h-10 px-4 text-sm gap-2 rounded-xl",
  lg: "h-12 px-6 text-base gap-2.5 rounded-xl",
} as const;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "md", disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
