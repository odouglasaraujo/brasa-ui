export default function IntroductionPage() {
  return (
    <article className="max-w-2xl">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-950">
          Introducao
        </h1>
        <p className="text-lg text-neutral-500">
          Componentes brasileiros, acessiveis e prontos para IA. Copie, cole e customize.
        </p>
      </div>

      <div className="prose prose-neutral max-w-none">
        <p className="text-[15px] leading-relaxed text-neutral-700">
          brasa.ui e uma colecao de componentes reutilizaveis que voce pode copiar e colar
          nos seus projetos. Componentes bonitos, acessiveis e com o contexto que produtos
          digitais brasileiros precisam — CPF, Pix, CEP, boleto, parcelamento, e muito mais.
        </p>

        <p className="text-[15px] leading-relaxed text-neutral-700 mt-4">
          A ideia e simples: ao inves de instalar uma dependencia monolitica e rigida,
          voce escolhe os componentes que precisa e adiciona direto no seu codigo. Isso
          te da controle total sobre o estilo e comportamento de cada componente.
        </p>

        <h2 className="text-xl font-semibold text-neutral-950 mt-10 mb-3">
          Por que brasa.ui?
        </h2>

        <p className="text-[15px] leading-relaxed text-neutral-700">
          A maioria das bibliotecas de UI sao feitas no exterior. Elas resolvem bem os
          casos genericos — botoes, inputs, modais — mas nao entendem como produtos
          brasileiros funcionam. Mascara de CPF, validacao de CNPJ, formatacao de Real,
          QR Code Pix, parcelamento com juros — tudo isso fica por conta do time.
        </p>

        <p className="text-[15px] leading-relaxed text-neutral-700 mt-4">
          brasa.ui resolve isso. Alem dos primitivos de UI que voce ja conhece, a
          biblioteca traz componentes com <strong>contexto cultural brasileiro</strong> embutido.
          E cada componente vem com um schema JSON que ensina agentes de IA a usar
          o componente corretamente.
        </p>

        <h2 className="text-xl font-semibold text-neutral-950 mt-10 mb-3">
          Nao e um framework
        </h2>

        <p className="text-[15px] leading-relaxed text-neutral-700">
          brasa.ui <strong>nao e uma dependencia</strong>. E um conjunto de componentes que voce
          copia para o seu projeto e faz o que quiser. Sem lock-in, sem abstracoes
          escondidas, sem upgrades que quebram tudo.
        </p>

        <div className="mt-6 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
          <p className="text-sm text-neutral-600">
            <strong className="text-neutral-950">Inspiracao.</strong>{" "}
            brasa.ui e fortemente inspirado no{" "}
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-neutral-950 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-950"
            >
              shadcn/ui
            </a>{" "}
            e no{" "}
            <a
              href="https://magicui.design"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-neutral-950 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-950"
            >
              Magic UI
            </a>
            . A filosofia de &ldquo;copie e cole&rdquo; vem deles. O diferencial e o contexto
            brasileiro e a camada AI-ready que cada componente carrega.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-neutral-950 mt-10 mb-3">
          AI-Ready
        </h2>

        <p className="text-[15px] leading-relaxed text-neutral-700">
          Cada componente da brasa.ui tem um{" "}
          <a
            href="/#ai-ready"
            className="font-medium text-neutral-950 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-950"
          >
            schema JSON
          </a>{" "}
          que descreve suas props, comportamentos, e contexto de uso. Isso permite que
          agentes de IA (Claude, GPT, Cursor, etc.) gerem interfaces com componentes
          brasileiros de forma precisa.
        </p>

        <p className="text-[15px] leading-relaxed text-neutral-700 mt-4">
          Quando voce pede para sua IA &ldquo;criar um checkout brasileiro&rdquo;, ela sabe
          usar <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm font-mono text-neutral-800">PIXKeyInput</code>,{" "}
          <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm font-mono text-neutral-800">InstallmentSelect</code>,
          e <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm font-mono text-neutral-800">CurrencyBRL</code> —
          com mascaras, validacoes e formatacao corretas.
        </p>

        <h2 className="text-xl font-semibold text-neutral-950 mt-10 mb-3">
          Stack
        </h2>

        <p className="text-[15px] leading-relaxed text-neutral-700 mb-4">
          Os componentes sao construidos com:
        </p>

        <ul className="space-y-2 text-[15px] text-neutral-700">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
            <span><strong className="text-neutral-950">React 19</strong> — componentes funcionais com forwardRef</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
            <span><strong className="text-neutral-950">TypeScript</strong> — tipagem completa em todas as props</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
            <span><strong className="text-neutral-950">Tailwind CSS v4</strong> — estilizacao via classes utilitarias</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
            <span><strong className="text-neutral-950">Zero dependencias runtime</strong> — sem framer-motion, sem libs de mascara</span>
          </li>
        </ul>

        <div className="mt-10 flex items-center gap-3">
          <a
            href="/docs/installation"
            className="inline-flex items-center gap-2 rounded-lg bg-neutral-950 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            Instalacao
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <a
            href="/componentes"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            Ver componentes
          </a>
        </div>
      </div>
    </article>
  );
}
