"use client";

import { forwardRef, useCallback, useState } from "react";

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  description?: string;
  id?: string;
  className?: string;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onChange,
      disabled = false,
      label,
      description,
      id,
      className = "",
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isChecked = controlledChecked ?? internalChecked;

    const handleToggle = useCallback(() => {
      if (disabled) return;
      const next = !isChecked;
      if (controlledChecked === undefined) {
        setInternalChecked(next);
      }
      onChange?.(next);
    }, [isChecked, controlledChecked, onChange, disabled]);

    const switchId = id || label?.toLowerCase().replace(/\s+/g, "-");

    const toggle = (
      <button
        ref={ref}
        id={switchId}
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
          isChecked ? "bg-emerald-600" : "bg-neutral-200"
        } ${className}`}
      >
        <span
          className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform ${
            isChecked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    );

    if (!label) return toggle;

    return (
      <div className="flex items-start gap-3">
        {toggle}
        <div>
          <label
            htmlFor={switchId}
            className="text-sm font-medium text-neutral-700 cursor-pointer"
          >
            {label}
          </label>
          {description && (
            <p className="text-xs text-neutral-500">{description}</p>
          )}
        </div>
      </div>
    );
  }
);

Switch.displayName = "Switch";
