import { forwardRef, useCallback, useState, type HTMLAttributes } from "react";

export interface BoletoDisplayProps extends HTMLAttributes<HTMLDivElement> {
  digitableLine: string;
  barcode?: string;
  dueDate?: string;
  amount?: number;
  beneficiary?: string;
  payer?: string;
  description?: string;
  onCopyLine?: (value: string) => void;
}

function formatDigitableLine(line: string): string {
  const digits = line.replace(/\D/g, "");
  if (digits.length === 47) {
    return `${digits.slice(0, 5)}.${digits.slice(5, 10)} ${digits.slice(10, 15)}.${digits.slice(15, 21)} ${digits.slice(21, 26)}.${digits.slice(26, 32)} ${digits.slice(32, 33)} ${digits.slice(33)}`;
  }
  if (digits.length === 48) {
    return `${digits.slice(0, 12)} ${digits.slice(12, 24)} ${digits.slice(24, 36)} ${digits.slice(36)}`;
  }
  return line;
}

function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export const BoletoDisplay = forwardRef<HTMLDivElement, BoletoDisplayProps>(
  (
    {
      className = "",
      digitableLine,
      barcode,
      dueDate,
      amount,
      beneficiary,
      payer,
      description,
      onCopyLine,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(async () => {
      const digits = digitableLine.replace(/\D/g, "");
      try {
        await navigator.clipboard.writeText(digits);
        setCopied(true);
        onCopyLine?.(digits);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Clipboard not available
      }
    }, [digitableLine, onCopyLine]);

    const digits = digitableLine.replace(/\D/g, "");
    const formatted = formatDigitableLine(digitableLine);

    return (
      <div
        ref={ref}
        className={`w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm ${className}`}
        {...props}
      >
        <div className="border-b border-neutral-100 bg-neutral-50 px-5 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-neutral-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <span className="text-sm font-semibold text-neutral-700">Boleto Bancário</span>
            </div>
            {dueDate && (
              <span className="text-xs text-neutral-500">
                Vencimento: {dueDate}
              </span>
            )}
          </div>
        </div>

        <div className="px-5 py-4">
          {(beneficiary || amount) && (
            <div className="mb-4 grid grid-cols-2 gap-3">
              {beneficiary && (
                <div>
                  <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">
                    Beneficiário
                  </span>
                  <p className="mt-0.5 text-sm font-medium text-neutral-800">{beneficiary}</p>
                </div>
              )}
              {amount != null && (
                <div className="text-right">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">
                    Valor
                  </span>
                  <p className="mt-0.5 text-sm font-semibold text-neutral-900">
                    {formatBRL(amount)}
                  </p>
                </div>
              )}
              {payer && (
                <div>
                  <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">
                    Pagador
                  </span>
                  <p className="mt-0.5 text-sm text-neutral-700">{payer}</p>
                </div>
              )}
              {description && (
                <div>
                  <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">
                    Descrição
                  </span>
                  <p className="mt-0.5 text-sm text-neutral-700">{description}</p>
                </div>
              )}
            </div>
          )}

          {/* Barcode visualization */}
          <div className="mb-3 flex h-14 items-end gap-px overflow-hidden">
            {digits.split("").map((digit, i) => {
              const width = parseInt(digit) % 4 === 0 ? 3 : parseInt(digit) % 2 === 0 ? 2 : 1;
              const isFilled = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={isFilled ? "bg-neutral-900" : "bg-transparent"}
                  style={{
                    width: `${width}px`,
                    height: `${36 + (i % 5) * 4}px`,
                    minWidth: `${width}px`,
                  }}
                />
              );
            })}
          </div>

          {/* Digitable line */}
          <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-3">
            <div className="flex items-center justify-between gap-3">
              <code className="flex-1 break-all text-xs font-medium tracking-wide text-neutral-700">
                {formatted}
              </code>
              <button
                type="button"
                onClick={handleCopy}
                className="shrink-0 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-sm transition-all duration-150 hover:bg-neutral-50 active:scale-[0.97]"
              >
                {copied ? "Copiado!" : "Copiar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

BoletoDisplay.displayName = "BoletoDisplay";
