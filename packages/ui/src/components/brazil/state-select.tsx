import { forwardRef, type SelectHTMLAttributes } from "react";

const BRAZILIAN_STATES = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapa" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceara" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espirito Santo" },
  { value: "GO", label: "Goias" },
  { value: "MA", label: "Maranhao" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Para" },
  { value: "PB", label: "Paraiba" },
  { value: "PR", label: "Parana" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piaui" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondonia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "Sao Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
] as const;

export type BrazilianState = (typeof BRAZILIAN_STATES)[number]["value"];

export interface StateSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label?: string;
  error?: string;
  hint?: string;
  placeholder?: string;
  format?: "code" | "name" | "both";
}

export const StateSelect = forwardRef<HTMLSelectElement, StateSelectProps>(
  ({ label, error, hint, placeholder = "Selecione o estado", format = "both", className = "", ...props }, ref) => {
    const formatOption = (state: (typeof BRAZILIAN_STATES)[number]) => {
      switch (format) {
        case "code": return state.value;
        case "name": return state.label;
        default: return `${state.value} - ${state.label}`;
      }
    };

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-neutral-700">{label}</label>
        )}
        <select
          ref={ref}
          className={`h-10 rounded-xl border bg-white px-3 text-sm text-neutral-900 outline-none transition-all focus:ring-2 ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
              : "border-neutral-200 focus:border-neutral-400 focus:ring-neutral-400/20"
          } ${className}`}
          aria-invalid={!!error}
          {...props}
        >
          <option value="">{placeholder}</option>
          {BRAZILIAN_STATES.map((state) => (
            <option key={state.value} value={state.value}>
              {formatOption(state)}
            </option>
          ))}
        </select>
        {error && <span className="text-xs text-red-500">{error}</span>}
        {!error && hint && <span className="text-xs text-neutral-400">{hint}</span>}
      </div>
    );
  }
);

StateSelect.displayName = "StateSelect";
