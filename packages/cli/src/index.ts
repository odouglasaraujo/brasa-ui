import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { resolve, dirname, join } from "path";

const REGISTRY_URL = "https://brasa-ui.vercel.app/r";
const CONFIG_FILE = "brasa.json";
const VERSION = "0.1.0";

interface BrasaConfig {
  aliases: {
    components: string;
    utils: string;
  };
}

interface RegistryFile {
  path: string;
  content: string;
  type: string;
}

interface RegistryEntry {
  name: string;
  type: string;
  registryDependencies: string[];
  files: RegistryFile[];
}

interface RegistryIndex {
  name: string;
  type: string;
  registryDependencies: string[];
  files: string[];
}

// ── Helpers ──

function log(msg: string) {
  console.log(`  ${msg}`);
}

function success(msg: string) {
  console.log(`\x1b[32m✓\x1b[0m ${msg}`);
}

function error(msg: string) {
  console.error(`\x1b[31m✗\x1b[0m ${msg}`);
}

function warn(msg: string) {
  console.log(`\x1b[33m!\x1b[0m ${msg}`);
}

function heading(msg: string) {
  console.log(`\n\x1b[1m${msg}\x1b[0m\n`);
}

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.json() as Promise<T>;
}

function loadConfig(): BrasaConfig | null {
  const configPath = resolve(process.cwd(), CONFIG_FILE);
  if (!existsSync(configPath)) return null;
  return JSON.parse(readFileSync(configPath, "utf-8"));
}

function resolveAlias(alias: string): string {
  if (alias.startsWith("@/")) return alias.slice(2);
  if (alias.startsWith("~/")) return alias.slice(2);
  return alias;
}

// ── Commands ──

async function init() {
  heading("brasa.ui — init");

  const configPath = resolve(process.cwd(), CONFIG_FILE);

  if (existsSync(configPath)) {
    warn("brasa.json already exists");
    const existing = JSON.parse(readFileSync(configPath, "utf-8"));
    log(`  components: ${existing.aliases.components}`);
    log(`  utils: ${existing.aliases.utils}`);
    return;
  }

  // Detect src directory
  const hasSrc = existsSync(resolve(process.cwd(), "src"));
  const base = hasSrc ? "src" : ".";

  const config: BrasaConfig = {
    aliases: {
      components: `@/${base === "src" ? "" : ""}components/brasa`,
      utils: `@/${base === "src" ? "" : ""}lib/brasa/utils`,
    },
  };

  writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n");
  success("Created brasa.json");

  // Create directories
  const componentsDir = resolve(process.cwd(), base, "components/brasa");
  const utilsDir = resolve(process.cwd(), base, "lib/brasa/utils");

  mkdirSync(componentsDir, { recursive: true });
  mkdirSync(utilsDir, { recursive: true });

  success(`Created ${componentsDir.replace(process.cwd() + "/", "")}/`);
  success(`Created ${utilsDir.replace(process.cwd() + "/", "")}/`);

  log("");
  log("Now add components:");
  log("  npx brasa-ui add cpf-input");
  log("  npx brasa-ui add pix-payment");
  log("  npx brasa-ui add cep-input");
}

async function add(names: string[]) {
  if (names.length === 0) {
    error("Specify at least one component: npx brasa-ui add cpf-input");
    process.exit(1);
  }

  const config = loadConfig();
  if (!config) {
    error("No brasa.json found. Run `npx brasa-ui init` first.");
    process.exit(1);
  }

  heading(`brasa.ui — adding ${names.join(", ")}`);

  // Fetch index to validate names
  const index = await fetchJSON<RegistryIndex[]>(`${REGISTRY_URL}/index.json`);
  const available = new Set(index.map((c) => c.name));

  for (const name of names) {
    if (!available.has(name)) {
      error(`Component "${name}" not found in registry`);
      log("Available components:");
      for (const c of index) {
        log(`  ${c.name} (${c.type})`);
      }
      process.exit(1);
    }
  }

  // Collect all components to install (including deps)
  const toInstall = new Set<string>();
  const queue = [...names];

  while (queue.length > 0) {
    const name = queue.pop()!;
    if (toInstall.has(name)) continue;
    toInstall.add(name);
    const entry = index.find((c) => c.name === name);
    if (entry?.registryDependencies) {
      for (const dep of entry.registryDependencies) {
        if (!toInstall.has(dep)) queue.push(dep);
      }
    }
  }

  // Fetch and write each component
  for (const name of toInstall) {
    const entry = await fetchJSON<RegistryEntry>(
      `${REGISTRY_URL}/styles/default/${name}.json`
    );

    for (const file of entry.files) {
      // Rewrite paths based on config aliases
      let targetPath = file.path;

      // Map lib/brasa/utils/* to the configured utils alias path
      if (targetPath.startsWith("lib/brasa/utils/")) {
        const utilsBase = resolveAlias(config.aliases.utils);
        const filename = targetPath.replace("lib/brasa/utils/", "");
        targetPath = join(utilsBase, filename);
      }
      // Map lib/brasa/components/* to the configured components alias path
      else if (targetPath.startsWith("lib/brasa/components/")) {
        const compBase = resolveAlias(config.aliases.components);
        const rest = targetPath.replace("lib/brasa/components/", "");
        targetPath = join(compBase, rest);
      }

      const fullPath = resolve(process.cwd(), targetPath);

      // Rewrite imports in content to match user's aliases
      let content = file.content;
      content = content.replace(
        /@\/lib\/brasa\/utils\//g,
        config.aliases.utils.endsWith("/")
          ? config.aliases.utils
          : config.aliases.utils + "/"
      );

      // Check if file already exists
      if (existsSync(fullPath)) {
        warn(`${targetPath} already exists, skipping`);
        continue;
      }

      mkdirSync(dirname(fullPath), { recursive: true });
      writeFileSync(fullPath, content);
      success(targetPath);
    }
  }

  log("");
  success("Done! Components added to your project.");
}

async function list() {
  heading("brasa.ui — available components");

  const index = await fetchJSON<RegistryIndex[]>(`${REGISTRY_URL}/index.json`);

  const groups: Record<string, RegistryIndex[]> = {};
  for (const c of index) {
    (groups[c.type] ??= []).push(c);
  }

  for (const [type, components] of Object.entries(groups)) {
    console.log(`\x1b[1m${type}\x1b[0m`);
    for (const c of components) {
      log(`  ${c.name}`);
    }
    log("");
  }

  log(`${index.length} components available`);
  log("Add with: npx brasa-ui add <name>");
}

function help() {
  heading(`brasa-ui v${VERSION}`);
  log("Brazilian UI components for React");
  log("");
  log("Commands:");
  log("  init           Set up brasa.ui in your project");
  log("  add <name...>  Add components to your project");
  log("  list           List available components");
  log("  help           Show this help");
  log("");
  log("Examples:");
  log("  npx brasa-ui init");
  log("  npx brasa-ui add cpf-input cep-input");
  log("  npx brasa-ui add pix-payment");
  log("  npx brasa-ui list");
}

// ── Main ──

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case "init":
    init().catch((e) => { error(e.message); process.exit(1); });
    break;
  case "add":
    add(args.slice(1)).catch((e) => { error(e.message); process.exit(1); });
    break;
  case "list":
  case "ls":
    list().catch((e) => { error(e.message); process.exit(1); });
    break;
  case "help":
  case "--help":
  case "-h":
  case undefined:
    help();
    break;
  default:
    error(`Unknown command: ${command}`);
    help();
    process.exit(1);
}
