"use client";

import { useState, useCallback, createContext, useContext, type ReactNode } from "react";

interface AccordionContextValue {
  openItems: Set<string>;
  toggle: (id: string) => void;
  type: "single" | "multiple";
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionItem must be used within <Accordion>");
  return ctx;
}

export interface AccordionProps {
  type?: "single" | "multiple";
  defaultOpen?: string[];
  children: ReactNode;
  className?: string;
}

export function Accordion({ type = "single", defaultOpen = [], children, className = "" }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen));

  const toggle = useCallback(
    (id: string) => {
      setOpenItems((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          if (type === "single") next.clear();
          next.add(id);
        }
        return next;
      });
    },
    [type]
  );

  return (
    <AccordionContext.Provider value={{ openItems, toggle, type }}>
      <div className={`divide-y divide-neutral-200 rounded-xl border border-neutral-200 shadow-sm ${className}`}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function AccordionItem({ value, children, className = "" }: AccordionItemProps) {
  return (
    <div className={`${className}`} data-value={value}>
      {children}
    </div>
  );
}

export interface AccordionTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function AccordionTrigger({ value, children, className = "" }: AccordionTriggerProps) {
  const { openItems, toggle } = useAccordionContext();
  const isOpen = openItems.has(value);

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      onClick={() => toggle(value)}
      className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-neutral-900 transition-all duration-150 hover:bg-neutral-50 ${className}`}
    >
      {children}
      <svg
        className={`h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </button>
  );
}

export interface AccordionContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function AccordionContent({ value, children, className = "" }: AccordionContentProps) {
  const { openItems } = useAccordionContext();
  if (!openItems.has(value)) return null;

  return (
    <div className={`px-4 pb-3 text-sm text-neutral-600 ${className}`}>
      {children}
    </div>
  );
}
