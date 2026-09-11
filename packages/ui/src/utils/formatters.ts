export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatCPF(digits: string): string {
  const d = digits.replace(/\D/g, "").slice(0, 11);
  if (d.length !== 11) return d;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

export function formatCNPJ(digits: string): string {
  const d = digits.replace(/\D/g, "").slice(0, 14);
  if (d.length !== 14) return d;
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
}

export function formatCEP(digits: string): string {
  const d = digits.replace(/\D/g, "").slice(0, 8);
  if (d.length !== 8) return d;
  return `${d.slice(0, 5)}-${d.slice(5)}`;
}

export function formatInstallments(
  total: number,
  n: number,
  interestFree = true
): string {
  const value = total / n;
  const formatted = formatBRL(value);
  const suffix = interestFree ? " sem juros" : "";
  return `${n}x de ${formatted}${suffix}`;
}
