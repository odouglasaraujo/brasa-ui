# brasa.ui

Brazilian UI components for React. CPF, Pix, CEP, parcelamento, and everything your AI doesn't know about Brazil.

[Live Demo](https://brasa-ui.vercel.app) · [Showcase](https://brasa-ui.vercel.app/showcase) · [GitHub](https://github.com/odouglasaraujo/brasa-ui)

## Install

```bash
npm install brasa.ui
# or
pnpm add brasa.ui
```

**Peer dependencies:** React 18+ and Tailwind CSS v4.

## Components

### Brazilian

| Component | Description |
|-----------|-------------|
| `CPFInput` | Mask + mod11 validation |
| `CNPJInput` | Mask + mod11 validation |
| `CEPInput` | Mask + auto address lookup via ViaCEP |
| `PhoneBR` | Brazilian phone mask with DDD |
| `CurrencyBRL` | R$ input with Brazilian formatting |
| `StateSelect` | Brazilian state (UF) selector |

### Payments

| Component | Description |
|-----------|-------------|
| `PixPayment` | QR code display, copy-paste, countdown, status |
| `InstallmentSelect` | Parcelamento selector with interest calc |

### Core

`Button` · `Input` · `Select` · `Card` · `Badge` · `Alert` · `Dialog` · `Tabs` · `Accordion` · `Dropdown` · `Tooltip` · `Avatar` · `Switch` · `Separator` · `Textarea`

### Utilities

```ts
import { maskCPF, validateCPF, formatBRL } from "brasa.ui";
```

`maskCPF` · `maskCNPJ` · `maskCEP` · `maskPhone` · `maskBRL` · `validateCPF` · `validateCNPJ` · `validateCEP` · `validatePhone` · `formatBRL` · `formatCPF` · `formatCNPJ` · `formatCEP` · `formatInstallments` · `generateQR`

## Quick Start

```tsx
import { CPFInput, CEPInput, PixPayment } from "brasa.ui";

function Checkout() {
  const [cpf, setCpf] = useState("");

  return (
    <form>
      <CPFInput value={cpf} onChange={setCpf} />
      <CEPInput onAddress={(addr) => console.log(addr)} />
      <PixPayment amount={149.90} pixCode={pixCodeFromBackend} />
    </form>
  );
}
```

## Important: What This Is (and Isn't)

brasa.ui is a **UI component library**. It renders forms, inputs, QR codes, and payment interfaces.

It does **NOT**:
- Process payments
- Communicate with banks, PSPs, or the Central Bank
- Generate Pix EMV payloads (your backend does this via your PSP)
- Store or transmit sensitive data
- Replace your payment gateway

The `PixPayment` component displays a QR code from a payload you provide. The `InstallmentSelect` calculates display values. Your backend handles actual payment processing.

## AI Schemas

Every component includes a JSON schema at `@brasa-ui/registry` with props, behavior, states, limits, and cultural context — designed for AI coding agents to understand how Brazilian digital products work.

## License

MIT
