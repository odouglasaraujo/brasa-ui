import { forwardRef, useEffect, useRef, useState, type HTMLAttributes } from "react";

export interface NumberTickerProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  value: number;
  direction?: "up" | "down";
  delay?: number;
  duration?: number;
  formatOptions?: Intl.NumberFormatOptions;
  locale?: string;
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export const NumberTicker = forwardRef<HTMLSpanElement, NumberTickerProps>(
  (
    {
      className = "",
      value,
      direction = "up",
      delay = 0,
      duration = 2000,
      formatOptions,
      locale = "pt-BR",
      ...props
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = useState(direction === "down" ? value : 0);
    const startTimeRef = useRef<number | null>(null);
    const rafRef = useRef<number>(0);
    const hasStarted = useRef(false);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const elementRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
      const el = elementRef.current;
      if (!el) return;

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasStarted.current) {
            hasStarted.current = true;
            const timeoutId = setTimeout(() => {
              const startValue = direction === "down" ? value : 0;
              const endValue = direction === "down" ? 0 : value;

              const animate = (timestamp: number) => {
                if (!startTimeRef.current) startTimeRef.current = timestamp;
                const elapsed = timestamp - startTimeRef.current;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeOutExpo(progress);
                const current = startValue + (endValue - startValue) * easedProgress;
                setDisplayValue(current);
                if (progress < 1) {
                  rafRef.current = requestAnimationFrame(animate);
                }
              };

              rafRef.current = requestAnimationFrame(animate);
            }, delay);

            return () => clearTimeout(timeoutId);
          }
        },
        { threshold: 0.1 }
      );

      observerRef.current.observe(el);

      return () => {
        observerRef.current?.disconnect();
        cancelAnimationFrame(rafRef.current);
      };
    }, [value, direction, delay, duration]);

    const formatted = new Intl.NumberFormat(locale, formatOptions).format(
      Number.isInteger(value) ? Math.round(displayValue) : displayValue
    );

    return (
      <span
        ref={(node) => {
          elementRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={`inline-block tabular-nums tracking-tight ${className}`}
        {...props}
      >
        {formatted}
      </span>
    );
  }
);

NumberTicker.displayName = "NumberTicker";
