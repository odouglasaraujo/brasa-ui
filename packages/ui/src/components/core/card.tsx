import { forwardRef, type HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "elevated";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const variantStyles = {
      default: "border border-neutral-200 bg-white",
      bordered: "border-2 border-neutral-200 bg-white",
      elevated: "border border-neutral-100 bg-white shadow-lg shadow-neutral-200/50",
    };

    return (
      <div
        ref={ref}
        className={`rounded-2xl ${variantStyles[variant]} ${className}`}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={`border-b border-neutral-100 px-6 py-4 ${className}`} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={`px-6 py-4 ${className}`} {...props} />
  )
);
CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={`border-t border-neutral-100 px-6 py-4 ${className}`} {...props} />
  )
);
CardFooter.displayName = "CardFooter";
