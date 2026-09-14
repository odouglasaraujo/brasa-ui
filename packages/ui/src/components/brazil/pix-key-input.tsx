import { forwardRef, useCallback, useMemo, useState, type InputHTMLAttributes } from "react";
import { maskCPF, maskCNPJ, maskPhone } from "../../utils/masks";

export type PixKeyType = "cpf" | "cnpj" | "email" | "phone" | "random" | "unknown";

export interface PIXKeyInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "type"> {
  value?: string;
  onChange?: (value: string, keyType: PixKeyType) => void;
  label?: string;
  error?: string;
  showKeyType?: boolean;
}

function detectKeyType(value: string): PixKeyType {
  const digits = value.replace(/\D/g, "");

  if (value.includes("@") && value.includes(".")) return "email";
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)) return "random";

  if (digits.length <= 11 && digits.length > 0) {
    if (value.startsWith("+55") || (digits.length >= 10 && digits.length <= 11 && !value.includes("@"))) {
      const phoneDigits = digits.startsWith("55") ? digits.slice(2) : digits;
      if (phoneDigits.length >= 10 && phoneDigits.length <= 11) return "phone";
    }
    if (digits.length <= 11) return "cpf";
  }

  if (digits.length > 11 && digits.length <= 14) return "cnpj";

  if (value.includes("@")) return "email";
  if (value.includes("-") && value.length > 20) return "random";

  return "unknown";
}

function applyMask(value: string, keyType: PixKeyType): string {
  switch (keyType) {
    case "cpf":
      return maskCPF(value);
    case "cnpj":
      return maskCNPJ(value);
    case "phone": {
      const digits = value.replace(/\D/g, "");
      const phoneDigits = digits.startsWith("55") ? digits.slice(2) : digits;
      return maskPhone(phoneDigits);
    }
    default:
      return value;
  }
}

const keyTypeLabels: Record<PixKeyType, string> = {
  cpf: "CPF",
  cnpj: "CNPJ",
  email: "E-mail",
  phone: "Telefone",
  random: "Chave aleatória",
  unknown: "Chave Pix",
};

const keyTypeColors: Record<PixKeyType, string> = {
  cpf: "bg-blue-50 text-blue-700 border-blue-200",
  cnpj: "bg-purple-50 text-purple-700 border-purple-200",
  email: "bg-amber-50 text-amber-700 border-amber-200",
  phone: "bg-green-50 text-green-700 border-green-200",
  random: "bg-neutral-50 text-neutral-600 border-neutral-200",
  unknown: "bg-neutral-50 text-neutral-400 border-neutral-200",
};

export const PIXKeyInput = forwardRef<HTMLInputElement, PIXKeyInputProps>(
  (
    {
      className = "",
      value: controlledValue,
      onChange,
      label = "Chave Pix",
      error,
      showKeyType = true,
      placeholder = "CPF, e-mail, telefone ou chave aleatória",
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState("");
    const value = controlledValue ?? internalValue;

    const keyType = useMemo(() => detectKeyType(value), [value]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;
        const detected = detectKeyType(newValue);

        if (detected === "cpf" || detected === "cnpj" || detected === "phone") {
          newValue = applyMask(newValue, detected);
        }

        if (controlledValue === undefined) {
          setInternalValue(newValue);
        }
        onChange?.(newValue, detected);
      },
      [controlledValue, onChange]
    );

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-neutral-700">
            {label}
            {showKeyType && value.length > 2 && keyType !== "unknown" && (
              <span
                className={`inline-flex rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${keyTypeColors[keyType]}`}
              >
                {keyTypeLabels[keyType]}
              </span>
            )}
          </label>
        )}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-4 w-4 text-neutral-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.5 2.1L12 4.6l2.5-2.5 1.4 1.4-2.5 2.5 2.5 2.5-1.4 1.4L12 7.4l-2.5 2.5-1.4-1.4 2.5-2.5-2.5-2.5 1.4-1.4zM12 16.6l2.5 2.5 1.4-1.4-2.5-2.5 2.5-2.5-1.4-1.4L12 13.8l-2.5-2.5-1.4 1.4 2.5 2.5-2.5 2.5 1.4 1.4 2.5-2.5zM4.6 12l-2.5-2.5 1.4-1.4 2.5 2.5 2.5-2.5 1.4 1.4L7.4 12l2.5 2.5-1.4 1.4-2.5-2.5-2.5 2.5-1.4-1.4 2.5-2.5zM19.4 12l-2.5 2.5-1.4-1.4 2.5-2.5-2.5-2.5 1.4-1.4 2.5 2.5 2.5-2.5 1.4 1.4-2.5 2.5 2.5 2.5-1.4 1.4-2.5-2.5z"/>
            </svg>
          </div>
          <input
            ref={ref}
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={`h-11 w-full rounded-xl border bg-white pl-9 pr-4 text-sm text-neutral-900 shadow-sm outline-none transition-all duration-150 placeholder:text-neutral-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 ${
              error
                ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                : "border-neutral-200 hover:border-neutral-300"
            }`}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

PIXKeyInput.displayName = "PIXKeyInput";
