import { Github, ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-brasil-green via-brasil-yellow-light to-brasil-blue" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />

          <div className="relative px-8 py-16 text-center md:px-16 md:py-24">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Feito no Brasil.
              <br />
              Para o Brasil.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/70">
              Open source, grátis, para sempre. Contribua com componentes,
              padrões e contexto brasileiro.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://github.com/odouglasaraujo/brasa-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-neutral-950 transition-all hover:bg-white/90"
              >
                <Github className="h-4 w-4" />
                Star no GitHub
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#components"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/10"
              >
                Explorar componentes
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
