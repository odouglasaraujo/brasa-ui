import type { HTMLAttributes } from "react";

const variants = {
  default: "bg-[#f2f4ef] text-[#526157] border-[#e3e7de]",
  success: "bg-[#edf5e8] text-[#37623e] border-[#dcebd5]",
  warning: "bg-[#fcf5e3] text-[#846224] border-[#f2e7c8]",
  error: "bg-[#fcf0ed] text-[#ac4939] border-[#f2dcd5]",
  info: "bg-[#edf2fa] text-[#426493] border-[#dde6f3]",
  brasil: "bg-[#e8efcf] text-[#3e572f] border-[#dce6b9]",
} as const;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variants;
}

export function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-medium leading-4 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
