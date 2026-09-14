import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const uiSrc = resolve(root, "packages/ui/src");
const outDir = resolve(root, "apps/www/public/r/styles/default");

mkdirSync(outDir, { recursive: true });

const components = [
  // Brazil
  {
    name: "cpf-input",
    type: "brazil",
    files: ["components/brazil/cpf-input.tsx"],
    deps: ["utils/masks.ts", "utils/validators.ts"],
    registryDeps: [],
  },
  {
    name: "cnpj-input",
    type: "brazil",
    files: ["components/brazil/cnpj-input.tsx"],
    deps: ["utils/masks.ts", "utils/validators.ts"],
    registryDeps: [],
  },
  {
    name: "cep-input",
    type: "brazil",
    files: ["components/brazil/cep-input.tsx"],
    deps: ["utils/masks.ts", "utils/validators.ts"],
    registryDeps: [],
  },
  {
    name: "currency-brl",
    type: "brazil",
    files: ["components/brazil/currency-brl.tsx"],
    deps: [],
    registryDeps: [],
  },
  {
    name: "phone-br",
    type: "brazil",
    files: ["components/brazil/phone-br.tsx"],
    deps: ["utils/masks.ts", "utils/validators.ts"],
    registryDeps: [],
  },
  {
    name: "state-select",
    type: "brazil",
    files: ["components/brazil/state-select.tsx"],
    deps: [],
    registryDeps: [],
  },
  // Payments
  {
    name: "pix-payment",
    type: "payments",
    files: ["components/payments/pix-payment.tsx"],
    deps: ["utils/qrcode.ts"],
    registryDeps: [],
  },
  {
    name: "installment-select",
    type: "payments",
    files: ["components/payments/installment-select.tsx"],
    deps: [],
    registryDeps: [],
  },
  // Core
  {
    name: "button",
    type: "core",
    files: ["components/core/button.tsx"],
    deps: [],
    registryDeps: [],
  },
  {
    name: "input",
    type: "core",
    files: ["components/core/input.tsx"],
    deps: [],
    registryDeps: [],
  },
  {
    name: "select",
    type: "core",
    files: ["components/core/select.tsx"],
    deps: [],
    registryDeps: [],
  },
  {
    name: "card",
    type: "core",
    files: ["components/core/card.tsx"],
    deps: [],
    registryDeps: [],
  },
  {
    name: "badge",
    type: "core",
    files: ["components/core/badge.tsx"],
    deps: [],
    registryDeps: [],
  },
  {
    name: "alert",
    type: "core",
    files: ["components/core/alert.tsx"],
    deps: [],
    registryDeps: [],
  },
  {
    name: "dialog",
    type: "core",
    files: ["components/core/dialog.tsx"],
    deps: [],
    registryDeps: [],
  },
  {
    name: "tabs",
    type: "core",
    files: ["components/core/tabs.tsx"],
    deps: [],
    registryDeps: [],
  },
  {
    name: "accordion",
    type: "core",
    files: ["components/core/accordion.tsx"],
    deps: [],
    registryDeps: [],
  },
  {
    name: "dropdown",
    type: "core",
    files: ["components/core/dropdown.tsx"],
    deps: [],
    registryDeps: [],
  },
  {
    name: "tooltip",
    type: "core",
    files: ["components/core/tooltip.tsx"],
    deps: [],
    registryDeps: [],
  },
  {
    name: "avatar",
    type: "core",
    files: ["components/core/avatar.tsx"],
    deps: [],
    registryDeps: [],
  },
  {
    name: "switch",
    type: "core",
    files: ["components/core/switch.tsx"],
    deps: [],
    registryDeps: [],
  },
  {
    name: "separator",
    type: "core",
    files: ["components/core/separator.tsx"],
    deps: [],
    registryDeps: [],
  },
  {
    name: "textarea",
    type: "core",
    files: ["components/core/textarea.tsx"],
    deps: [],
    registryDeps: [],
  },
  // Core — New (visual/landing page)
  {
    name: "marquee",
    type: "core",
    files: ["components/core/marquee.tsx"],
    deps: [],
    registryDeps: [],
  },
  {
    name: "number-ticker",
    type: "core",
    files: ["components/core/number-ticker.tsx"],
    deps: [],
    registryDeps: [],
  },
  {
    name: "animated-list",
    type: "core",
    files: ["components/core/animated-list.tsx"],
    deps: [],
    registryDeps: [],
  },
  {
    name: "bento-grid",
    type: "core",
    files: ["components/core/bento-grid.tsx"],
    deps: [],
    registryDeps: [],
  },
  {
    name: "avatar-circles",
    type: "core",
    files: ["components/core/avatar-circles.tsx"],
    deps: [],
    registryDeps: [],
  },
  {
    name: "border-beam",
    type: "core",
    files: ["components/core/border-beam.tsx"],
    deps: [],
    registryDeps: [],
  },
  {
    name: "shimmer-button",
    type: "core",
    files: ["components/core/shimmer-button.tsx"],
    deps: [],
    registryDeps: [],
  },
  {
    name: "magic-card",
    type: "core",
    files: ["components/core/magic-card.tsx"],
    deps: [],
    registryDeps: [],
  },
  {
    name: "typing-animation",
    type: "core",
    files: ["components/core/typing-animation.tsx"],
    deps: [],
    registryDeps: [],
  },
  {
    name: "dot-pattern",
    type: "core",
    files: ["components/core/dot-pattern.tsx"],
    deps: [],
    registryDeps: [],
  },
  {
    name: "retro-grid",
    type: "core",
    files: ["components/core/retro-grid.tsx"],
    deps: [],
    registryDeps: [],
  },
  {
    name: "skeleton",
    type: "core",
    files: ["components/core/skeleton.tsx"],
    deps: [],
    registryDeps: [],
  },
  {
    name: "progress",
    type: "core",
    files: ["components/core/progress.tsx"],
    deps: [],
    registryDeps: [],
  },
  // Brazil — New
  {
    name: "pix-key-input",
    type: "brazil",
    files: ["components/brazil/pix-key-input.tsx"],
    deps: ["utils/masks.ts"],
    registryDeps: [],
  },
  // Payments — New
  {
    name: "boleto-display",
    type: "payments",
    files: ["components/payments/boleto-display.tsx"],
    deps: [],
    registryDeps: [],
  },
  // Utils (standalone)
  {
    name: "masks",
    type: "utils",
    files: ["utils/masks.ts"],
    deps: [],
    registryDeps: [],
  },
  {
    name: "validators",
    type: "utils",
    files: ["utils/validators.ts"],
    deps: [],
    registryDeps: [],
  },
  {
    name: "formatters",
    type: "utils",
    files: ["utils/formatters.ts"],
    deps: [],
    registryDeps: [],
  },
  {
    name: "qrcode",
    type: "utils",
    files: ["utils/qrcode.ts"],
    deps: [],
    registryDeps: [],
  },
];

function readSource(relPath) {
  const full = resolve(uiSrc, relPath);
  let content = readFileSync(full, "utf-8");
  // Rewrite internal imports for the copy-paste model
  // ../../utils/masks -> @/lib/brasa/utils/masks
  content = content.replace(
    /from\s+"\.\.\/\.\.\/utils\/(\w+)"/g,
    'from "@/lib/brasa/utils/$1"'
  );
  // ../../utils/qrcode -> @/lib/brasa/utils/qrcode
  content = content.replace(
    /from\s+"\.\.\/\.\.\/utils\/(\w+)"/g,
    'from "@/lib/brasa/utils/$1"'
  );
  return content;
}

// Build each component JSON
for (const comp of components) {
  const files = comp.files.map((f) => {
    const content = readSource(f);
    const targetPath = `lib/brasa/${f}`;
    return {
      path: targetPath,
      content,
      type: "registry:component",
    };
  });

  // Add dependency files
  for (const dep of comp.deps) {
    const content = readSource(dep);
    const targetPath = `lib/brasa/${dep}`;
    // Avoid duplicate files
    if (!files.some((f) => f.path === targetPath)) {
      files.push({
        path: targetPath,
        content,
        type: "registry:lib",
      });
    }
  }

  const entry = {
    name: comp.name,
    type: `registry:${comp.type}`,
    registryDependencies: comp.registryDeps,
    files,
    tailwind: {},
    cssVars: {},
  };

  const outPath = resolve(outDir, `${comp.name}.json`);
  writeFileSync(outPath, JSON.stringify(entry, null, 2));
}

// Build index.json
const index = components.map((c) => ({
  name: c.name,
  type: c.type,
  registryDependencies: c.registryDeps,
  files: c.files.map((f) => `lib/brasa/${f}`),
}));

writeFileSync(
  resolve(root, "apps/www/public/r/index.json"),
  JSON.stringify(index, null, 2)
);

console.log(`Built ${components.length} registry entries`);
