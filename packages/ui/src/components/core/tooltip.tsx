"use client";

import { useState, useRef, type ReactNode } from "react";

export interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  className?: string;
}

const positionClasses = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
} as const;

export function Tooltip({ content, children, position = "top", delay = 200, className = "" }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    timeoutRef.current = setTimeout(() => setVisible(true), delay) as ReturnType<typeof setTimeout>;
  };

  const hide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  return (
    <div className={`relative inline-block ${className}`} onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      {children}
      {visible && (
        <div
          role="tooltip"
          className={`absolute z-50 whitespace-nowrap rounded-lg bg-neutral-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-lg pointer-events-none ${positionClasses[position]}`}
        >
          {content}
        </div>
      )}
    </div>
  );
}
