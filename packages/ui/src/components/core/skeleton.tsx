import { forwardRef, type HTMLAttributes } from "react";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className = "", variant = "text", width, height, style, ...props }, ref) => {
    const variantClasses = {
      text: "rounded-md h-4 w-full",
      circular: "rounded-full aspect-square",
      rectangular: "rounded-xl",
    };

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={`bg-neutral-100 ${variantClasses[variant]} ${className}`}
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
          animation: "skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          ...style,
        }}
        {...props}
      >
        <style>{`
          @keyframes skeleton-pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
        `}</style>
      </div>
    );
  }
);

Skeleton.displayName = "Skeleton";

export interface SkeletonGroupProps extends HTMLAttributes<HTMLDivElement> {
  lines?: number;
  avatar?: boolean;
}

export const SkeletonGroup = forwardRef<HTMLDivElement, SkeletonGroupProps>(
  ({ className = "", lines = 3, avatar = false, ...props }, ref) => {
    return (
      <div ref={ref} className={`flex gap-4 ${className}`} {...props}>
        {avatar && <Skeleton variant="circular" width={40} height={40} className="shrink-0" />}
        <div className="flex flex-1 flex-col gap-2.5">
          <Skeleton variant="text" className="w-3/5" />
          {Array.from({ length: lines - 1 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="text"
              className={i === lines - 2 ? "w-2/5" : "w-full"}
            />
          ))}
        </div>
      </div>
    );
  }
);

SkeletonGroup.displayName = "SkeletonGroup";
