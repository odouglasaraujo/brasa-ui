"use client";

import { useState, useEffect, useCallback } from "react";
import { CATEGORY_LABELS, CATEGORY_COLORS, type ComponentDoc } from "./data";

type Tab = "preview" | "code" | "props" | "ai";

export function ComponentDetail({
  component,
  preview,
  onClose,
}: {
  component: ComponentDoc;
  preview: React.ReactNode;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<Tab>("preview");
  const [copied, setCopied] = useState(false);
  const [copiedInstall, setCopiedInstall] = useState(false);
  const colors = CATEGORY_COLORS[component.category];

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  const copyCode = async () => {
    await navigator.clipboard.writeText(component.codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyInstall = async () => {
    await navigator.clipboard.writeText("pnpm add brasa.ui");
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const tabs: { key: Tab; label: string; show: boolean }[] = [
    { key: "preview", label: "Preview", show: true },
    { key: "code", label: "Codigo", show: true },
    { key: "props", label: "Props", show: component.propsTable.length > 0 },
    { key: "ai", label: "AI Context", show: !!component.aiContext },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm p-4 pt-[5vh] overflow-y-auto"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-3xl rounded-2xl border border-neutral-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-neutral-100 px-6 py-5">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-bold tracking-tight">{component.name}</h2>
              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${colors.bg} ${colors.text}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
                {CATEGORY_LABELS[component.category]}
              </span>
            </div>
            <p className="text-sm text-neutral-500">{component.description}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
            aria-label="Fechar"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Install bar */}
        <div className="flex items-center gap-3 border-b border-neutral-50 bg-neutral-50/60 px-6 py-3">
          <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">Instalar</span>
          <code className="flex-1 rounded-lg bg-white border border-neutral-200 px-3 py-1.5 text-xs font-mono text-neutral-700">
            pnpm add brasa.ui
          </code>
          <button
            onClick={copyInstall}
            className="rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-50"
          >
            {copiedInstall ? "Copiado!" : "Copiar"}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-neutral-100 px-6">
          {tabs.filter((t) => t.show).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                tab === t.key ? "text-neutral-900" : "text-neutral-400 hover:text-neutral-600"
              }`}
            >
              {t.label}
              {tab === t.key && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brasil-green rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="min-h-[300px]">
          {tab === "preview" && (
            <div className="flex items-center justify-center p-8 bg-[repeating-conic-gradient(#f5f5f5_0%_25%,transparent_0%_50%)] bg-[length:20px_20px]  min-h-[300px] rounded-b-2xl">
              {preview}
            </div>
          )}

          {tab === "code" && (
            <div className="relative">
              <button
                onClick={copyCode}
                className="absolute top-4 right-4 z-10 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-600 shadow-sm transition-all hover:bg-neutral-50"
              >
                {copied ? (
                  <span className="flex items-center gap-1">
                    <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Copiado!
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                    </svg>
                    Copiar
                  </span>
                )}
              </button>
              <pre className="overflow-x-auto p-6 text-sm leading-relaxed rounded-b-2xl">
                <code className="text-neutral-800 font-mono text-xs">{component.codeExample}</code>
              </pre>
            </div>
          )}

          {tab === "props" && (
            <div className="overflow-x-auto rounded-b-2xl">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-neutral-100 bg-neutral-50/60">
                    <th className="px-6 py-3 font-medium text-neutral-500 text-xs uppercase tracking-wide">Prop</th>
                    <th className="px-6 py-3 font-medium text-neutral-500 text-xs uppercase tracking-wide">Tipo</th>
                    <th className="px-6 py-3 font-medium text-neutral-500 text-xs uppercase tracking-wide">Default</th>
                    <th className="px-6 py-3 font-medium text-neutral-500 text-xs uppercase tracking-wide">Descricao</th>
                  </tr>
                </thead>
                <tbody>
                  {component.propsTable.map((prop) => (
                    <tr key={prop.name} className="border-b border-neutral-50">
                      <td className="px-6 py-3">
                        <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs font-mono font-medium text-emerald-700">{prop.name}</code>
                      </td>
                      <td className="px-6 py-3">
                        <code className="text-xs font-mono text-neutral-500">{prop.type}</code>
                      </td>
                      <td className="px-6 py-3">
                        <code className="text-xs font-mono text-neutral-400">{prop.default}</code>
                      </td>
                      <td className="px-6 py-3 text-xs text-neutral-600">{prop.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === "ai" && component.aiContext && (
            <div className="p-6 space-y-4">
              <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-blue-100 p-2">
                    <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900 mb-1">Contexto Cultural</h4>
                    <p className="text-sm text-blue-800 leading-relaxed">{component.aiContext}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5">
                <h4 className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-3">Import</h4>
                <code className="text-sm font-mono text-neutral-700">
                  {`import { ${component.name} } from "${component.importPath}";`}
                </code>
              </div>
              <p className="text-xs text-neutral-400">
                Este componente tem um JSON schema em <code className="font-mono">packages/registry/schemas/</code> que agentes de IA podem consumir para entender quando e como usar.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
