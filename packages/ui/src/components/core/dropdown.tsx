"use client";

import { useState, useRef, useEffect, useCallback, type ReactNode } from "react";

export interface DropdownItem {
  label: string;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
}

export interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  onSelect: (value: string) => void;
  align?: "left" | "right";
  className?: string;
}

export function Dropdown({ trigger, items, onSelect, align = "left", className = "" }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, close]);

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <div onClick={() => setOpen((p) => !p)} role="button" tabIndex={0} aria-haspopup="true" aria-expanded={open}>
        {trigger}
      </div>
      {open && (
        <div
          className={`absolute z-40 mt-1 min-w-[180px] rounded-xl border border-neutral-200 bg-white py-1 shadow-lg ${
            align === "right" ? "right-0" : "left-0"
          }`}
          role="menu"
        >
          {items.map((item) => (
            <button
              key={item.value}
              role="menuitem"
              type="button"
              disabled={item.disabled}
              onClick={() => {
                if (!item.disabled) {
                  onSelect(item.value);
                  close();
                }
              }}
              className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                item.danger
                  ? "text-red-600 hover:bg-red-50"
                  : "text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              {item.icon && <span className="shrink-0">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
