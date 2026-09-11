<p align="center">
  <img src="https://img.shields.io/badge/🇧🇷-brasa.ui-059669?style=for-the-badge&labelColor=000" alt="brasa.ui" />
</p>

<h3 align="center">Componentes brasileiros para a era da IA</h3>

<p align="center">
  Componentes React com CPF, Pix, CEP, boleto e parcelamento — tipados, acessíveis, e com schema JSON para agentes de IA.
</p>

<p align="center">
  <a href="#componentes">Componentes</a> ·
  <a href="#instalação">Instalação</a> ·
  <a href="#ai-ready">AI-Ready</a> ·
  <a href="CONTRIBUTING.md">Contribuir</a>
</p>

---

## Por que brasa.ui?

Toda IA gera interfaces americanas por padrão. Tax ID, Zip Code, Credit Card, $149.90.

O Brasil precisa de **CPF, CEP, Pix, boleto, parcelamento, R$ 149,90**.

brasa.ui resolve isso: componentes React prontos + schemas JSON que ensinam a qualquer IA como produtos brasileiros funcionam.

## Componentes

### Core
| Componente | Descrição |
|-----------|-----------|
| `Button` | Botão com variantes (default, primary, outline, ghost, destructive) |
| `Input` | Input com label, erro e hint |
| `Select` | Select nativo com label e opções |
| `Card` | Card com Header, Content e Footer |
| `Badge` | Badge com variantes (success, warning, error, info, brasil) |

### Brazil 🇧🇷
| Componente | Descrição |
|-----------|-----------|
| `CPFInput` | Máscara automática e validação mod11 em tempo real |
| `CEPInput` | Busca automática de endereço via ViaCEP |
| `CurrencyBRL` | Input monetário com formatação R$ brasileira |
| `PhoneBR` | Telefone com DDD, flag 🇧🇷 e +55 |

### Payments
| Componente | Descrição |
|-----------|-----------|
| `PixPayment` | Fluxo completo de Pix: QR code, copia e cola, countdown, estados |
| `InstallmentSelect` | Seletor de parcelamento com cálculo automático de juros |

### Utilities
| Util | Funções |
|------|---------|
| `masks` | `maskCPF`, `maskCNPJ`, `maskCEP`, `maskPhone`, `maskBRL` |
| `validators` | `validateCPF`, `validateCNPJ`, `validateCEP`, `validatePhone` |
| `formatters` | `formatBRL`, `formatCPF`, `formatCNPJ`, `formatCEP`, `formatInstallments` |

## Instalação

```bash
npx brasa-ui@latest init
```

Ou instale manualmente:

```bash
pnpm add brasa.ui
```

```tsx
import { CPFInput, PixPayment, CurrencyBRL } from "brasa.ui"

export function Checkout() {
  return (
    <div>
      <CPFInput label="CPF" />
      <CurrencyBRL label="Valor" showInstallments />
      <PixPayment amount={149.90} />
    </div>
  )
}
```

## AI-Ready

Cada componente inclui um **JSON Schema** com props, estados, comportamento e contexto cultural brasileiro.

```json
{
  "name": "pix-payment",
  "locale": "pt-BR",
  "category": "payment",
  "context": {
    "whenToUse": "Brazilian checkout",
    "culturalNote": "Pix is Brazil's most used payment method, with 40B+ annual transactions"
  }
}
```

Peça para sua IA:

> "Crie um checkout brasileiro com brasa.ui"

E ela sabe o que isso significa — Pix, CPF, parcelamento, R$, CEP, boleto.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Componentes | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| Build | tsup (ESM + DTS) |
| Site | Next.js 15 (App Router) |
| Monorepo | Turborepo + pnpm |
| AI Schemas | JSON Schema v1 |

## Desenvolvimento

```bash
# Clone o repo
git clone https://github.com/brasaui/brasa.ui.git
cd brasa.ui

# Instale dependências
pnpm install

# Rode o site de desenvolvimento
pnpm dev

# Build da biblioteca
pnpm --filter brasa.ui build
```

## Contribuindo

Quer contribuir? Leia o [guia de contribuição](CONTRIBUTING.md).

É rápido — leva ~10 minutos para adicionar um componente!

## Licença

[MIT](LICENSE.md) — Open source, grátis, para sempre.

---

<p align="center">
  Feito no Brasil 🇧🇷 Para o Brasil.
</p>
