import {
  forwardRef,
  useEffect,
  useState,
  type HTMLAttributes,
  type ReactElement,
} from "react";

export interface AnimatedListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactElement[];
  delay?: number;
}

export const AnimatedList = forwardRef<HTMLDivElement, AnimatedListProps>(
  ({ className = "", children, delay = 1000, ...props }, ref) => {
    const [visibleCount, setVisibleCount] = useState(0);

    useEffect(() => {
      const total = children.length;
      if (visibleCount >= total) return;

      const timeout = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }, [visibleCount, children.length, delay]);

    const visibleItems = children.slice(0, visibleCount);

    return (
      <div
        ref={ref}
        className={`flex flex-col gap-3 overflow-hidden ${className}`}
        {...props}
      >
        {visibleItems.map((child, index) => (
          <div
            key={child.key ?? index}
            className="animate-slide-in"
            style={{
              animation: "animated-list-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          >
            {child}
          </div>
        ))}
        <style>{`
          @keyframes animated-list-in {
            from {
              opacity: 0;
              transform: translateY(-12px) scale(0.96);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}</style>
      </div>
    );
  }
);

AnimatedList.displayName = "AnimatedList";
