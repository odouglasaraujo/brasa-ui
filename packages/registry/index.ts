import cpfInput from "./schemas/cpf-input.json";
import cepInput from "./schemas/cep-input.json";
import currencyBrl from "./schemas/currency-brl.json";
import phoneBr from "./schemas/phone-br.json";
import pixPayment from "./schemas/pix-payment.json";
import installmentSelect from "./schemas/installment-select.json";

export const schemas = {
  "cpf-input": cpfInput,
  "cep-input": cepInput,
  "currency-brl": currencyBrl,
  "phone-br": phoneBr,
  "pix-payment": pixPayment,
  "installment-select": installmentSelect,
};

export const registry = {
  version: "0.0.1",
  components: Object.keys(schemas),
  getSchema: (name: string) => schemas[name as keyof typeof schemas] ?? null,
};
