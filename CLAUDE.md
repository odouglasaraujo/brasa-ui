# brasa.ui

Brazilian UI component library for the AI era. Components + AI schemas that teach agents how Brazilian digital products work.

## Project Structure

- `apps/www` — Next.js 15 site (App Router, Tailwind v4, Turbopack)
- `packages/ui` — Component library (React 19, TypeScript, tsup build)
- `packages/registry` — AI-readable JSON schemas per component
- `packages/tokens` — Design tokens (planned)

## Commands

```bash
pnpm dev                          # Run dev server (site)
pnpm --filter brasa.ui build      # Build the component library
pnpm --filter @brasa-ui/www build # Build the site
```

## Component Categories

- `core/` — Primitives: Button, Input, Select, Card, Badge
- `brazil/` — Brazilian: CPFInput, CEPInput, CurrencyBRL, PhoneBR
- `payments/` — Payments: PixPayment, InstallmentSelect

## Key Conventions

- Components use `forwardRef` and accept `className` for composability
- Brazilian inputs use masks from `utils/masks.ts` and validators from `utils/validators.ts`
- All components must be accessible (aria attributes, keyboard support)
- Every Brazilian component needs a JSON schema in `packages/registry/schemas/`
- Site uses Brazilian flag colors: green (#059669), yellow (#eab308), blue (#2563eb)
- Light/white theme — no dark mode yet
- Tailwind v4 with `@theme` for custom colors in `apps/www/app/globals.css`

## AI Schemas

Each component has a JSON schema at `packages/registry/schemas/<name>.json` with:
- `props`, `behavior`, `states` — structured component API
- `context.culturalNote` — why this component exists in Brazilian products
- `context.whenToUse` / `context.whenNotToUse` — usage guidance for AI agents
