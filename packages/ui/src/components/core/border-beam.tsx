import { forwardRef, type HTMLAttributes } from "react";

export interface BorderBeamProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export const BorderBeam = forwardRef<HTMLDivElement, BorderBeamProps>(
  (
    {
      className = "",
      size = 200,
      duration = 12,
      borderWidth = 1.5,
      colorFrom = "#059669",
      colorTo = "#eab308",
      delay = 0,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`pointer-events-none absolute inset-0 rounded-[inherit] ${className}`}
        style={
          {
            "--border-beam-size": `${size}px`,
            "--border-beam-duration": `${duration}s`,
            "--border-beam-delay": `${delay}s`,
            "--border-beam-from": colorFrom,
            "--border-beam-to": colorTo,
            "--border-beam-width": `${borderWidth}px`,
          } as React.CSSProperties
        }
        {...props}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            maskImage: `conic-gradient(from 0deg, transparent 0%, transparent 10%, black 36%)`,
            WebkitMaskImage: `conic-gradient(from 0deg, transparent 0%, transparent 10%, black 36%)`,
            border: `var(--border-beam-width) solid transparent`,
            backgroundClip: "border-box",
            backgroundOrigin: "border-box",
            background: `conic-gradient(from calc(var(--border-beam-angle, 0) * 1deg), transparent, var(--border-beam-from), var(--border-beam-to), transparent) border-box`,
            animation: `border-beam-rotate var(--border-beam-duration) linear infinite`,
            animationDelay: `var(--border-beam-delay)`,
          }}
        />
        <style>{`
          @keyframes border-beam-rotate {
            from { --border-beam-angle: 0; }
            to { --border-beam-angle: 360; }
          }
          @property --border-beam-angle {
            syntax: "<number>";
            initial-value: 0;
            inherits: false;
          }
        `}</style>
      </div>
    );
  }
);

BorderBeam.displayName = "BorderBeam";
