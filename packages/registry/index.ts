import cpfInput from "./schemas/cpf-input.json";
import pixPayment from "./schemas/pix-payment.json";

export const schemas = {
  "cpf-input": cpfInput,
  "pix-payment": pixPayment,
};

export const registry = {
  version: "0.0.1",
  components: Object.keys(schemas),
  getSchema: (name: string) => schemas[name as keyof typeof schemas] ?? null,
};
