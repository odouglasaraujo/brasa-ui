import { forwardRef, type ComponentType, type HTMLAttributes, type ReactNode } from "react";

export interface BentoGridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const BentoGrid = forwardRef<HTMLDivElement, BentoGridProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`grid w-full auto-rows-[22rem] grid-cols-1 gap-4 md:grid-cols-3 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

BentoGrid.displayName = "BentoGrid";

export interface BentoCardProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  description?: string;
  Icon?: ComponentType<{ className?: string }>;
  href?: string;
  cta?: string;
  background?: ReactNode;
}

export const BentoCard = forwardRef<HTMLDivElement, BentoCardProps>(
  ({ className = "", name, description, Icon, href, cta, background, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`group relative col-span-1 flex flex-col justify-end overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md ${className}`}
        {...props}
      >
        {background && (
          <div className="absolute inset-0 transition-all duration-300 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105">
            {background}
          </div>
        )}
        <div className="pointer-events-none z-10 flex flex-col gap-1 p-4 md:p-6 transition-all duration-300 group-hover:-translate-y-2">
          {Icon && (
            <Icon className="h-8 w-8 md:h-10 md:w-10 text-neutral-600 transition-all duration-300 ease-in-out group-hover:scale-75 origin-left" />
          )}
          <h3 className="text-base md:text-lg font-semibold text-neutral-900">{name}</h3>
          {description && (
            <p className="max-w-lg text-xs md:text-sm text-neutral-500">{description}</p>
          )}
        </div>

        {href && cta && (
          <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <a
              href={href}
              className="pointer-events-auto inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
              {cta}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        )}
      </div>
    );
  }
);

BentoCard.displayName = "BentoCard";
