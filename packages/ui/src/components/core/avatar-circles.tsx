import { forwardRef, type HTMLAttributes } from "react";

export interface AvatarCircle {
  src: string;
  alt?: string;
}

export interface AvatarCirclesProps extends HTMLAttributes<HTMLDivElement> {
  avatars: AvatarCircle[];
  size?: "sm" | "md" | "lg";
  max?: number;
  borderColor?: string;
}

const sizeConfig = {
  sm: { dimension: 28, text: "text-[10px]", overlap: "-ml-2" },
  md: { dimension: 36, text: "text-xs", overlap: "-ml-3" },
  lg: { dimension: 44, text: "text-sm", overlap: "-ml-3.5" },
} as const;

export const AvatarCircles = forwardRef<HTMLDivElement, AvatarCirclesProps>(
  (
    {
      className = "",
      avatars,
      size = "md",
      max = 5,
      borderColor = "white",
      ...props
    },
    ref
  ) => {
    const config = sizeConfig[size];
    const visible = avatars.slice(0, max);
    const remaining = avatars.length - max;

    return (
      <div
        ref={ref}
        className={`flex items-center ${className}`}
        {...props}
      >
        {visible.map((avatar, i) => (
          <img
            key={i}
            src={avatar.src}
            alt={avatar.alt || ""}
            width={config.dimension}
            height={config.dimension}
            className={`rounded-full ${i > 0 ? config.overlap : ""}`}
            style={{
              border: `2px solid ${borderColor}`,
              width: config.dimension,
              height: config.dimension,
              objectFit: "cover",
            }}
          />
        ))}
        {remaining > 0 && (
          <div
            className={`flex items-center justify-center rounded-full bg-neutral-100 font-medium text-neutral-600 ${config.overlap} ${config.text}`}
            style={{
              border: `2px solid ${borderColor}`,
              width: config.dimension,
              height: config.dimension,
            }}
          >
            +{remaining}
          </div>
        )}
      </div>
    );
  }
);

AvatarCircles.displayName = "AvatarCircles";
