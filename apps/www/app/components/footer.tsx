export function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex gap-[3px]">
            <div className="h-5 w-[4px] rounded-full bg-brasil-green" />
            <div className="h-5 w-[4px] rounded-full bg-brasil-yellow" />
            <div className="h-5 w-[4px] rounded-full bg-brasil-blue" />
          </div>
          <span className="text-sm font-semibold text-neutral-950">
            brasa.ui
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-neutral-400">
          <a href="#components" className="transition-colors hover:text-neutral-600">Componentes</a>
          <a href="#ai-ready" className="transition-colors hover:text-neutral-600">AI-Ready</a>
          <a href="https://github.com/odouglasaraujo/brasa-ui" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-neutral-600">GitHub</a>
        </div>

        <p className="text-xs text-neutral-400">
          Open source &middot; MIT License
        </p>
      </div>
    </footer>
  );
}
