"use client";

import { useState, useCallback, createContext, useContext, type ReactNode } from "react";

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tab components must be used within <Tabs>");
  return ctx;
}

export interface TabsProps {
  defaultValue: string;
  value?: string;
  onChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export function Tabs({ defaultValue, value, onChange, children, className = "" }: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const activeTab = value ?? internalValue;

  const setActiveTab = useCallback(
    (id: string) => {
      if (value === undefined) setInternalValue(id);
      onChange?.(id);
    },
    [value, onChange]
  );

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export interface TabListProps {
  children: ReactNode;
  className?: string;
}

export function TabList({ children, className = "" }: TabListProps) {
  return (
    <div role="tablist" className={`flex gap-1 rounded-xl bg-neutral-100 p-1 ${className}`}>
      {children}
    </div>
  );
}

export interface TabTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

export function TabTrigger({ value, children, className = "", disabled }: TabTriggerProps) {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <button
      role="tab"
      type="button"
      aria-selected={isActive}
      disabled={disabled}
      onClick={() => setActiveTab(value)}
      className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${
        isActive
          ? "bg-white text-neutral-900 shadow-sm"
          : "text-neutral-500 hover:text-neutral-700"
      } ${className}`}
    >
      {children}
    </button>
  );
}

export interface TabContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function TabContent({ value, children, className = "" }: TabContentProps) {
  const { activeTab } = useTabsContext();
  if (activeTab !== value) return null;

  return (
    <div role="tabpanel" className={`mt-3 ${className}`}>
      {children}
    </div>
  );
}
