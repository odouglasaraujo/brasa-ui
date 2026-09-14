export default function InstallationPage() {
  return (
    <article className="max-w-2xl">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-950">
          Instalacao
        </h1>
        <p className="text-lg text-neutral-500">
          Como instalar e configurar brasa.ui no seu projeto.
        </p>
      </div>

      <div className="prose prose-neutral max-w-none">
        <h2 className="text-xl font-semibold text-neutral-950 mt-8 mb-3">
          Via CLI (recomendado)
        </h2>

        <p className="text-[15px] leading-relaxed text-neutral-700">
          A forma mais rapida de adicionar componentes ao seu projeto. O CLI copia o
          codigo-fonte do componente direto para o seu projeto — sem dependencias extras.
        </p>

        <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-950 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-neutral-400">Terminal</span>
          </div>
          <pre className="text-sm font-mono text-neutral-100 overflow-x-auto">
            <code>npx @odougaraujo/brasa-ui add cpf-input</code>
          </pre>
        </div>

        <p className="text-[15px] leading-relaxed text-neutral-700 mt-4">
          Isso vai criar o arquivo do componente no seu projeto, dentro da pasta de
          componentes configurada. Voce pode usar o componente imediatamente:
        </p>

        <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-950 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-neutral-400">page.tsx</span>
          </div>
          <pre className="text-sm font-mono text-neutral-100 overflow-x-auto whitespace-pre">
            <code>{`import { CPFInput } from "./components/cpf-input"

export default function Page() {
  return <CPFInput label="CPF" />
}`}</code>
          </pre>
        </div>

        <h2 className="text-xl font-semibold text-neutral-950 mt-10 mb-3">
          Via npm
        </h2>

        <p className="text-[15px] leading-relaxed text-neutral-700">
          Se preferir instalar como pacote, voce pode usar o npm. Isso adiciona
          todos os componentes como dependencia do seu projeto.
        </p>

        <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-950 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-neutral-400">Terminal</span>
          </div>
          <pre className="text-sm font-mono text-neutral-100 overflow-x-auto">
            <code>npm install brasa.ui</code>
          </pre>
        </div>

        <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-950 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-neutral-400">page.tsx</span>
          </div>
          <pre className="text-sm font-mono text-neutral-100 overflow-x-auto whitespace-pre">
            <code>{`import { CPFInput, PixPayment, CurrencyBRL } from "brasa.ui"

export default function Checkout() {
  return (
    <form>
      <CPFInput label="CPF" />
      <CurrencyBRL label="Valor" />
      <PixPayment
        pixCode="00020126580014br.gov.bcb.pix"
        amount={149.90}
        status="qr_generated"
      />
    </form>
  )
}`}</code>
          </pre>
        </div>

        <h2 className="text-xl font-semibold text-neutral-950 mt-10 mb-3">
          Manual (copiar e colar)
        </h2>

        <p className="text-[15px] leading-relaxed text-neutral-700">
          Voce pode copiar o codigo de qualquer componente diretamente da pagina de{" "}
          <a
            href="/componentes"
            className="font-medium text-neutral-950 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-950"
          >
            componentes
          </a>{" "}
          e colar no seu projeto. Cada componente e independente — nao tem dependencias
          entre eles.
        </p>

        <h2 className="text-xl font-semibold text-neutral-950 mt-10 mb-3">
          Requisitos
        </h2>

        <ul className="space-y-2 text-[15px] text-neutral-700">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
            <span><strong className="text-neutral-950">React 18+</strong> — funciona com React 18 ou 19</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
            <span><strong className="text-neutral-950">TypeScript</strong> — recomendado, mas nao obrigatorio</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
            <span><strong className="text-neutral-950">Tailwind CSS v4</strong> — para estilizacao dos componentes</span>
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-neutral-950 mt-10 mb-3">
          Configuracao do Tailwind
        </h2>

        <p className="text-[15px] leading-relaxed text-neutral-700">
          Alguns componentes brasileiros usam cores especificas. Adicione ao seu CSS:
        </p>

        <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-950 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-neutral-400">globals.css</span>
          </div>
          <pre className="text-sm font-mono text-neutral-100 overflow-x-auto whitespace-pre">
            <code>{`@import "tailwindcss";

@theme {
  --color-brasil-green: #059669;
  --color-brasil-yellow: #eab308;
  --color-brasil-blue: #2563eb;
}`}</code>
          </pre>
        </div>

        <h2 className="text-xl font-semibold text-neutral-950 mt-10 mb-3">
          Utilitarios
        </h2>

        <p className="text-[15px] leading-relaxed text-neutral-700">
          Componentes brasileiros como <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm font-mono text-neutral-800">CPFInput</code>{" "}
          e <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm font-mono text-neutral-800">CNPJInput</code>{" "}
          usam funcoes de mascara e validacao. Se voce esta copiando os componentes manualmente,
          copie tambem os utilitarios:
        </p>

        <ul className="mt-4 space-y-2 text-[15px] text-neutral-700">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
            <span>
              <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm font-mono text-neutral-800">utils/masks.ts</code>
              {" "}— mascaras de CPF, CNPJ, CEP, telefone
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
            <span>
              <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm font-mono text-neutral-800">utils/validators.ts</code>
              {" "}— validacao de CPF, CNPJ
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
            <span>
              <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm font-mono text-neutral-800">utils/formatters.ts</code>
              {" "}— formatacao de moeda, numeros
            </span>
          </li>
        </ul>

        <div className="mt-10 flex items-center gap-3">
          <a
            href="/componentes"
            className="inline-flex items-center gap-2 rounded-lg bg-neutral-950 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            Ver componentes
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <a
            href="/docs"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            Voltar para introducao
          </a>
        </div>
      </div>
    </article>
  );
}
