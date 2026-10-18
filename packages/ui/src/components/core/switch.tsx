"use client";

import { forwardRef, useId, useCallback, useState } from "react";

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

    const generatedId = useId();
    const switchId = id || generatedId;

    const toggle = (
      <button
        ref={ref}
        id={switchId}
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brasa-ring,#dce9df)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
          isChecked ? "bg-[var(--brasa-primary,#285b43)]" : "bg-[#dfe4dc]"
        } ${className}`}
      >
        <span
          className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-sm ring-0 transition-transform duration-150 ${
            isChecked ? "translate-x-[22px]" : "translate-x-0"
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
            className="text-[13px] font-medium text-[#23352c] cursor-pointer"
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
