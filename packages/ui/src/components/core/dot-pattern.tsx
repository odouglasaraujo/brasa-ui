import { forwardRef, useId, type SVGAttributes } from "react";

export interface DotPatternProps extends SVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  radius?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  dotColor?: string;
}

export const DotPattern = forwardRef<SVGSVGElement, DotPatternProps>(
  (
    {
      className = "",
      width = 16,
      height = 16,
      radius = 1,
      cx = 1,
      cy = 1,
      cr,
      dotColor = "currentColor",
      ...props
    },
    ref
  ) => {
    const id = useId();

    return (
      <svg
        ref={ref}
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 h-full w-full fill-neutral-300/50 ${className}`}
        {...props}
      >
        <defs>
          <pattern
            id={id}
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
            x={0}
            y={0}
          >
            <circle cx={cx} cy={cy} r={cr ?? radius} fill={dotColor} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    );
  }
);

DotPattern.displayName = "DotPattern";
