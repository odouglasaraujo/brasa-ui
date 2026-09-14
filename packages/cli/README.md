# @odougaraujo/brasa-ui

CLI to add [brasa.ui](https://brasa-ui.vercel.app) components to your React project — copy-paste style, like shadcn/ui.

## Quick Start

```bash
npx @odougaraujo/brasa-ui init
npx @odougaraujo/brasa-ui add cpf-input
```

## Commands

### `init`

Sets up brasa.ui in your project. Creates a `brasa.json` config and the component directories.

```bash
npx @odougaraujo/brasa-ui init
```

### `add <name...>`

Adds one or more components to your project, including their dependencies (utils, masks, validators).

```bash
npx @odougaraujo/brasa-ui add cpf-input
npx @odougaraujo/brasa-ui add cpf-input cep-input pix-payment
```

### `list`

Lists all available components from the registry.

```bash
npx @odougaraujo/brasa-ui list
```

## Available Components

**Brazilian:** `cpf-input` · `cnpj-input` · `cep-input` · `currency-brl` · `phone-br` · `state-select`

**Payments:** `pix-payment` · `installment-select`

**Core:** `button` · `input` · `select` · `card` · `badge` · `alert` · `dialog` · `tabs` · `accordion` · `dropdown` · `tooltip` · `avatar` · `switch` · `separator` · `textarea`

**Utils:** `masks` · `validators` · `formatters` · `qrcode`

## How It Works

1. `init` creates a `brasa.json` with your project's path aliases
2. `add` fetches component source code from the [brasa.ui registry](https://brasa-ui.vercel.app/r/index.json)
3. Files are copied into your project with imports rewritten to match your aliases
4. You own the code — customize freely

## Alternative: npm Package

If you prefer a compiled package instead of copy-paste:

```bash
npm install brasa.ui
```

```tsx
import { CPFInput, PixPayment } from "brasa.ui";
```

## License

MIT
