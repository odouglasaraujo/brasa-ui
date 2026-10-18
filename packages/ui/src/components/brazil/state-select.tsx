"use client";

import { controlStyles, controlBorder, controlError, labelStyles } from "../../utils/styles";
import { forwardRef, useId, type SelectHTMLAttributes } from "react";

const BRAZILIAN_STATES = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
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
  ({ label, error, hint, placeholder = "Selecione o estado", format = "both", className = "", id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const formatOption = (state: (typeof BRAZILIAN_STATES)[number]) => {
      switch (format) {
        case "code": return state.value;
        case "name": return state.label;
        default: return `${state.value} — ${state.label}`;
      }
    };

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className={labelStyles}>{label}</label>
        )}
        <select
          {...props}
          ref={ref}
          id={inputId}
          className={`${controlStyles} ${
            error
              ? controlError
              : controlBorder
          } ${className}`}
          aria-invalid={!!error}
          aria-describedby={[props["aria-describedby"], error || hint ? `${inputId}-description` : null].filter(Boolean).join(" ") || undefined}
        >
          <option value="">{placeholder}</option>
          {BRAZILIAN_STATES.map((state) => (
            <option key={state.value} value={state.value}>
              {formatOption(state)}
            </option>
          ))}
        </select>
        {error && <span id={`${inputId}-description`} className="text-xs font-medium text-red-600">{error}</span>}
        {!error && hint && <span id={`${inputId}-description`} className="text-xs text-neutral-500">{hint}</span>}
      </div>
    );
  }
);

StateSelect.displayName = "StateSelect";
