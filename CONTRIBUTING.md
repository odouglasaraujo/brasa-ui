# Contribuindo para brasa.ui

Obrigado por querer contribuir! Este guia vai te ajudar a adicionar componentes, padrões e contexto brasileiro para a biblioteca.

## Início rápido

```bash
# Fork e clone
git clone https://github.com/<SEU_USERNAME>/brasa.ui.git
cd brasa.ui

# Instale dependências (requer Node 22+ e pnpm 10+)
pnpm install

# Rode o site de desenvolvimento
pnpm dev

# Abra http://localhost:3000
```

## Estrutura do projeto

```
brasa.ui/
├── apps/
│   └── www/                    # Site Next.js 15
│       └── app/components/     # Componentes do site (não da lib)
├── packages/
│   ├── ui/                     # Biblioteca de componentes
│   │   └── src/
│   │       ├── components/
│   │       │   ├── core/       # Primitivos (Button, Input, etc.)
│   │       │   ├── brazil/     # Brasileiros (CPF, CEP, etc.)
│   │       │   └── payments/   # Pagamentos (Pix, Parcelamento)
│   │       ├── utils/          # Masks, validators, formatters
│   │       └── index.ts
│   └── registry/               # AI schemas (JSON)
│       └── schemas/
└── turbo.json
```

## Adicionando um componente

Leva ~10 minutos! Você precisa criar 3 arquivos:

### 1. Crie o componente

Em `packages/ui/src/components/<categoria>/<nome>.tsx`:

```tsx
"use client";

import { forwardRef } from "react";

export interface MeuComponenteProps {
  // props tipadas
}

export const MeuComponente = forwardRef<HTMLDivElement, MeuComponenteProps>(
  ({ ...props }, ref) => {
    return <div ref={ref} {...props} />;
  }
);

MeuComponente.displayName = "MeuComponente";
```

### 2. Exporte no index

Adicione o export em `packages/ui/src/components/<categoria>/index.ts` e em `packages/ui/src/index.ts`.

### 3. Crie o AI schema

Em `packages/registry/schemas/<nome>.json`:

```json
{
  "$schema": "https://brasa.ui/schema/v1",
  "name": "meu-componente",
  "displayName": "Meu Componente",
  "description": "O que faz",
  "locale": "pt-BR",
  "country": "BR",
  "category": "brazil/...",
  "props": {},
  "behavior": {},
  "states": [],
  "context": {
    "whenToUse": "Quando usar",
    "whenNotToUse": "Quando NÃO usar",
    "accessibility": "Considerações de acessibilidade",
    "culturalNote": "Contexto cultural brasileiro"
  }
}
```

### 4. Verifique

```bash
# Build da lib
pnpm --filter brasa.ui build

# Build do site
pnpm --filter @brasa-ui/www build
```

### 5. Abra um PR

Abra um Pull Request do seu fork para o repo principal.

## Convenções

- **Componentes**: React + TypeScript + Tailwind CSS. Use `forwardRef` para componentes que renderizam elementos HTML.
- **Acessibilidade**: Sempre inclua `aria-*` attributes, `role`, e suporte a teclado.
- **Nomes**: PascalCase para componentes, kebab-case para arquivos.
- **Schemas**: Todo componente brasileiro deve ter um JSON schema no registry.
- **Commits**: Use [Conventional Commits](https://www.conventionalcommits.org/) — `feat:`, `fix:`, `docs:`, `chore:`.

## Princípios

1. **Contexto brasileiro primeiro** — Cada componente deve resolver um problema real de produtos digitais brasileiros.
2. **AI-readable** — Schemas estruturados que qualquer agente entende.
3. **Acessível** — WCAG 2.1 AA como mínimo.
4. **Bonito** — Se não for bonito, ninguém usa.
5. **Tipado** — TypeScript strict, zero `any`.

## Precisa de ajuda?

Abra uma [issue](https://github.com/brasaui/brasa.ui/issues) ou inicie uma [discussion](https://github.com/brasaui/brasa.ui/discussions).
