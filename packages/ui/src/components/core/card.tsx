import { forwardRef, type HTMLAttributes } from "react";
import { surfaceStyles } from "../../utils/styles";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "elevated";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const variantStyles = {
      default: "shadow-[0_2px_4px_#182a1e03]",
      bordered: "ring-1 ring-[var(--brasa-border,#dfe4dc)]",
      elevated: "shadow-[0_8px_30px_-12px_#182a1e26]",
    };

    return (
      <div
        ref={ref}
        className={`${surfaceStyles} ${variantStyles[variant]} ${className}`}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={`border-b border-[var(--brasa-border,#dfe4dc)] px-6 py-5 ${className}`} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={`px-6 py-5 ${className}`} {...props} />
  )
);
CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={`border-t border-[var(--brasa-border,#dfe4dc)] px-6 py-4 ${className}`} {...props} />
  )
);
CardFooter.displayName = "CardFooter";
