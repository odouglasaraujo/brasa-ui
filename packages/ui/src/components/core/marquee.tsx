import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
  duration?: string;
}

export const Marquee = forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      className = "",
      children,
      reverse = false,
      pauseOnHover = false,
      vertical = false,
      repeat = 4,
      duration = "40s",
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`group flex overflow-hidden [--gap:1rem] ${
          vertical ? "flex-col" : "flex-row"
        } ${className}`}
        style={
          {
            "--duration": duration,
            gap: "var(--gap)",
          } as React.CSSProperties
        }
        {...props}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <div
            key={i}
            className={`flex shrink-0 justify-around ${
              vertical ? "flex-col" : "flex-row"
            } ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
            style={{
              gap: "var(--gap)",
              animation: `${vertical ? "marquee-vertical" : "marquee-horizontal"} var(--duration) linear infinite ${
                reverse ? "reverse" : ""
              }`,
            }}
          >
            {children}
          </div>
        ))}
        <style>{`
          @keyframes marquee-horizontal {
            from { transform: translateX(0); }
            to { transform: translateX(calc(-100% - var(--gap))); }
          }
          @keyframes marquee-vertical {
            from { transform: translateY(0); }
            to { transform: translateY(calc(-100% - var(--gap))); }
          }
        `}</style>
      </div>
    );
  }
);

Marquee.displayName = "Marquee";
