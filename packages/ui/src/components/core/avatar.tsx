import { forwardRef, useState, type ImgHTMLAttributes } from "react";

const sizes = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
  xl: "h-20 w-20 text-xl",
} as const;

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "size"> {
  size?: keyof typeof sizes;
  fallback?: string;
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ size = "md", fallback, src, alt = "", className = "", ...props }, ref) => {
    const [error, setError] = useState(false);
    const showImage = src && !error;
    const initials = fallback ? getInitials(fallback) : alt ? getInitials(alt) : "?";

    return (
      <div
        ref={ref}
        className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-100 font-medium text-neutral-600 ${sizes[size]} ${className}`}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt}
            onError={() => setError(true)}
            className="h-full w-full object-cover"
            {...props}
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";
