import {
  forwardRef,
  useCallback,
  useRef,
  useState,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";

export interface MagicCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
}

export const MagicCard = forwardRef<HTMLDivElement, MagicCardProps>(
  (
    {
      className = "",
      children,
      gradientSize = 250,
      gradientColor = "#059669",
      gradientOpacity = 0.15,
      ...props
    },
    ref
  ) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: -gradientSize, y: -gradientSize });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        const rect = (cardRef.current || (e.target as HTMLElement)).getBoundingClientRect();
        setPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      },
      []
    );

    const handleMouseEnter = useCallback(() => {
      setOpacity(1);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setOpacity(0);
      setPosition({ x: -gradientSize, y: -gradientSize });
    }, [gradientSize]);

    return (
      <div
        ref={(node) => {
          (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={`relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm ${className}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div
          className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300"
          style={{
            background: `radial-gradient(${gradientSize}px circle at ${position.x}px ${position.y}px, ${gradientColor}, transparent 65%)`,
            opacity: opacity * gradientOpacity,
          }}
        />
        <div className="relative">{children}</div>
      </div>
    );
  }
);

MagicCard.displayName = "MagicCard";
