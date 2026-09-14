import { forwardRef, type HTMLAttributes } from "react";

export interface RetroGridProps extends HTMLAttributes<HTMLDivElement> {
  angle?: number;
  lineColor?: string;
}

export const RetroGrid = forwardRef<HTMLDivElement, RetroGridProps>(
  ({ className = "", angle = 65, lineColor = "rgba(0,0,0,0.08)", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`pointer-events-none absolute inset-0 overflow-hidden [perspective:200px] ${className}`}
        {...props}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `rotateX(${angle}deg)`,
            backgroundImage: `linear-gradient(${lineColor} 1px, transparent 1px), linear-gradient(90deg, ${lineColor} 1px, transparent 1px)`,
            backgroundSize: "60px 30px",
            backgroundPosition: "center center",
            animation: "retro-grid-scroll 20s linear infinite",
            transformOrigin: "center center",
            top: "-50%",
            left: "-50%",
            right: "-50%",
            bottom: "-120%",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 40%, white 100%)",
          }}
        />
        <style>{`
          @keyframes retro-grid-scroll {
            from { background-position: center 0; }
            to { background-position: center 30px; }
          }
        `}</style>
      </div>
    );
  }
);

RetroGrid.displayName = "RetroGrid";
