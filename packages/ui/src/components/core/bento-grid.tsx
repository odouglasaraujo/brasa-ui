import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export interface BentoGridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  columns?: 2 | 3 | 4;
}

const columnClasses = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
} as const;

export const BentoGrid = forwardRef<HTMLDivElement, BentoGridProps>(
  ({ className = "", columns = 3, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`grid gap-4 ${columnClasses[columns]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

BentoGrid.displayName = "BentoGrid";

export interface BentoCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  icon?: ReactNode;
  span?: 1 | 2;
  children?: ReactNode;
}

export const BentoCard = forwardRef<HTMLDivElement, BentoCardProps>(
  ({ className = "", title, description, icon, span = 1, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-neutral-300 ${
          span === 2 ? "md:col-span-2" : ""
        } ${className}`}
        {...props}
      >
        {icon && (
          <div className="mb-4 inline-flex rounded-xl border border-neutral-100 bg-neutral-50 p-2.5 text-neutral-600">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
        {description && (
          <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
            {description}
          </p>
        )}
        {children && <div className="mt-4">{children}</div>}
      </div>
    );
  }
);

BentoCard.displayName = "BentoCard";
