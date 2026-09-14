"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Types ──────────────────────────────────────────────
type PaymentMethod = "pix" | "boleto" | "cartao";
type ChargeStatus = "pago" | "aguardando_pix" | "boleto_vencido" | "parcialmente_pago" | "cancelado" | "em_analise";
type FilterPeriod = "7d" | "30d" | "90d" | "all";
type ViewState = "loaded" | "empty" | "error" | "no_results";
type Page = "painel" | "cobrancas" | "clientes" | "relatorios" | "configuracoes";

interface Charge {
  id: string;
  client: string;
  document: string;
  documentType: "CPF" | "CNPJ";
  dueDate: string;
  amount: number;
  method: PaymentMethod;
  status: ChargeStatus;
  state: string;
}

interface Client {
  id: string;
  name: string;
  document: string;
  documentType: "CPF" | "CNPJ";
  email: string;
  phone: string;
  totalCharges: number;
  totalValue: number;
  state: string;
}

// ── Data ───────────────────────────────────────────────
const CHARGES: Charge[] = [
  { id: "COB-001", client: "Maria Oliveira Santos", document: "123.456.789-00", documentType: "CPF", dueDate: "2026-09-18", amount: 1580.00, method: "pix", status: "pago", state: "SP" },
  { id: "COB-002", client: "Auto Pecas Souza LTDA", document: "12.345.678/0001-90", documentType: "CNPJ", dueDate: "2026-09-20", amount: 4350.50, method: "boleto", status: "aguardando_pix", state: "MG" },
  { id: "COB-003", client: "Carlos Eduardo Mendes", document: "987.654.321-00", documentType: "CPF", dueDate: "2026-09-05", amount: 890.00, method: "boleto", status: "boleto_vencido", state: "RJ" },
  { id: "COB-004", client: "Transportes Rota Sul ME", document: "98.765.432/0001-10", documentType: "CNPJ", dueDate: "2026-09-25", amount: 12600.00, method: "cartao", status: "parcialmente_pago", state: "PR" },
  { id: "COB-005", client: "Fernanda Lima Costa", document: "456.789.123-00", documentType: "CPF", dueDate: "2026-09-10", amount: 320.00, method: "pix", status: "cancelado", state: "SP" },
  { id: "COB-006", client: "Mecanica Estrela do Norte", document: "55.444.333/0001-22", documentType: "CNPJ", dueDate: "2026-09-22", amount: 7890.00, method: "pix", status: "em_analise", state: "BA" },
  { id: "COB-007", client: "Rafael Gomes Pereira", document: "321.654.987-00", documentType: "CPF", dueDate: "2026-09-15", amount: 2150.00, method: "cartao", status: "pago", state: "SP" },
  { id: "COB-008", client: "Distribuidora Planalto", document: "77.888.999/0001-55", documentType: "CNPJ", dueDate: "2026-09-28", amount: 18400.00, method: "boleto", status: "aguardando_pix", state: "MG" },
  { id: "COB-009", client: "Ana Paula Rodrigues", document: "654.321.987-00", documentType: "CPF", dueDate: "2026-09-12", amount: 560.00, method: "pix", status: "pago", state: "RJ" },
  { id: "COB-010", client: "Borracharia Boa Viagem", document: "11.222.333/0001-44", documentType: "CNPJ", dueDate: "2026-09-30", amount: 3200.00, method: "cartao", status: "em_analise", state: "PR" },
];

const CLIENTS: Client[] = [
  { id: "CLI-001", name: "Maria Oliveira Santos", document: "123.456.789-00", documentType: "CPF", email: "maria@email.com", phone: "(11) 99887-6543", totalCharges: 5, totalValue: 7450.00, state: "SP" },
  { id: "CLI-002", name: "Auto Pecas Souza LTDA", document: "12.345.678/0001-90", documentType: "CNPJ", email: "contato@autopecas.com", phone: "(31) 3322-1100", totalCharges: 12, totalValue: 45300.50, state: "MG" },
  { id: "CLI-003", name: "Carlos Eduardo Mendes", document: "987.654.321-00", documentType: "CPF", email: "carlos.mendes@email.com", phone: "(21) 98765-4321", totalCharges: 3, totalValue: 2670.00, state: "RJ" },
  { id: "CLI-004", name: "Transportes Rota Sul ME", document: "98.765.432/0001-10", documentType: "CNPJ", email: "financeiro@rotasul.com.br", phone: "(41) 3456-7890", totalCharges: 8, totalValue: 67800.00, state: "PR" },
  { id: "CLI-005", name: "Fernanda Lima Costa", document: "456.789.123-00", documentType: "CPF", email: "fernanda.costa@email.com", phone: "(11) 91234-5678", totalCharges: 2, totalValue: 1280.00, state: "SP" },
  { id: "CLI-006", name: "Mecanica Estrela do Norte", document: "55.444.333/0001-22", documentType: "CNPJ", email: "estrela@norte.com.br", phone: "(71) 3210-9876", totalCharges: 6, totalValue: 23890.00, state: "BA" },
];

const MONTHLY_FLOW = [
  { month: "Abr", receitas: 42000, despesas: 28000 },
  { month: "Mai", receitas: 38000, despesas: 31000 },
  { month: "Jun", receitas: 51000, despesas: 29000 },
  { month: "Jul", receitas: 47000, despesas: 34000 },
  { month: "Ago", receitas: 55000, despesas: 32000 },
  { month: "Set", receitas: 49000, despesas: 30000 },
];

const SALES_BY_STATE = [
  { state: "SP", value: 38200, pct: 42 },
  { state: "MG", value: 18500, pct: 20 },
  { state: "RJ", value: 14800, pct: 16 },
  { state: "PR", value: 9200, pct: 10 },
  { state: "BA", value: 5600, pct: 6 },
  { state: "Outros", value: 5500, pct: 6 },
];

const STATES_FILTER = ["Todos", "SP", "MG", "RJ", "PR", "BA", "SC", "RS", "GO", "PE", "CE"];

// ── Helpers ────────────────────────────────────────────
function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("pt-BR");
}

function daysAgo(iso: string) {
  const d = new Date(iso + "T12:00:00");
  const now = new Date("2026-09-14T12:00:00");
  return Math.floor((now.getTime() - d.getTime()) / 86400000);
}

const STATUS_CONFIG: Record<ChargeStatus, { label: string; bg: string; text: string; dot: string }> = {
  pago: { label: "Pago", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  aguardando_pix: { label: "Aguardando Pix", bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  boleto_vencido: { label: "Boleto vencido", bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
  parcialmente_pago: { label: "Parcialmente pago", bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  cancelado: { label: "Cancelado", bg: "bg-neutral-100", text: "text-neutral-500", dot: "bg-neutral-400" },
  em_analise: { label: "Em analise", bg: "bg-violet-50", text: "text-violet-700", dot: "bg-violet-500" },
};

const METHOD_LABELS: Record<PaymentMethod, string> = { pix: "Pix", boleto: "Boleto", cartao: "Cartao" };

const NAV_ITEMS: { key: Page; label: string; icon: string }[] = [
  { key: "painel", label: "Painel", icon: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" },
  { key: "cobrancas", label: "Cobrancas", icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" },
  { key: "clientes", label: "Clientes", icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" },
  { key: "relatorios", label: "Relatorios", icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" },
  { key: "configuracoes", label: "Configuracoes", icon: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" },
];

const PAGE_TITLES: Record<Page, { title: string; subtitle: string }> = {
  painel: { title: "Painel financeiro", subtitle: "Setembro 2026" },
  cobrancas: { title: "Cobrancas", subtitle: "Gerencie suas cobrancas" },
  clientes: { title: "Clientes", subtitle: "Base de clientes cadastrados" },
  relatorios: { title: "Relatorios", subtitle: "Analise de desempenho" },
  configuracoes: { title: "Configuracoes", subtitle: "Preferencias do sistema" },
};

// ── Shared Components ──────────────────────────────────
function StatusBadge({ status }: { status: ChargeStatus }) {
  const c = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${c.bg} ${c.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}

function MetricCard({ title, value, subtitle, trend, icon }: {
  title: string; value: string; subtitle?: string;
  trend?: { value: string; positive: boolean }; icon: React.ReactNode;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-[13px] font-semibold text-neutral-500">{title}</p>
          <p className="mt-1.5 text-2xl font-bold tracking-tight text-neutral-900">{value}</p>
          {subtitle && <p className="mt-0.5 text-xs text-neutral-400">{subtitle}</p>}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-50">{icon}</div>
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1">
          <span className={`text-xs font-semibold ${trend.positive ? "text-emerald-600" : "text-red-500"}`}>
            {trend.positive ? "+" : ""}{trend.value}
          </span>
          <span className="text-xs text-neutral-400">vs. mes anterior</span>
        </div>
      )}
    </motion.div>
  );
}

function RowActions({ chargeId, onAction }: { chargeId: string; onAction: (action: string, id: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(p => !p)} className="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-40 mt-1 w-44 rounded-xl border border-neutral-200 bg-white py-1 shadow-lg">
            {[
              { label: "Ver detalhes", value: "details" },
              { label: "Enviar lembrete", value: "remind" },
              { label: "Copiar link", value: "copy" },
              { label: "Cancelar cobranca", value: "cancel", danger: true },
            ].map(a => (
              <button key={a.value} onClick={() => { onAction(a.value, chargeId); setOpen(false); }}
                className={`flex w-full items-center px-3.5 py-2 text-left text-sm transition-colors ${a.danger ? "text-red-600 hover:bg-red-50" : "text-neutral-700 hover:bg-neutral-50"}`}>
                {a.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── Charts ─────────────────────────────────────────────
function CashflowChart() {
  const maxVal = Math.max(...MONTHLY_FLOW.flatMap(m => [m.receitas, m.despesas]));
  const chartH = 200;
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-neutral-900">Fluxo de caixa</h3>
          <p className="text-xs text-neutral-400">Ultimos 6 meses</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-emerald-500" /><span className="text-[11px] font-medium text-neutral-500">Receitas</span></div>
          <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-red-400" /><span className="text-[11px] font-medium text-neutral-500">Despesas</span></div>
        </div>
      </div>
      <div className="relative" style={{ height: chartH + 40 }}>
        <div className="absolute inset-0 flex flex-col justify-between pb-8">
          {[maxVal, maxVal * 0.75, maxVal * 0.5, maxVal * 0.25, 0].map((v, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-10 text-right text-[10px] tabular-nums text-neutral-400">{(v / 1000).toFixed(0)}k</span>
              <div className="flex-1 border-t border-dashed border-neutral-100" />
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-14 right-0 flex items-end justify-around" style={{ height: chartH }}>
          {MONTHLY_FLOW.map((m, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="flex items-end gap-1">
                <motion.div initial={{ height: 0 }} animate={{ height: (m.receitas / maxVal) * (chartH - 20) }}
                  transition={{ delay: i * 0.08, duration: 0.5 }} className="w-5 rounded-t-md bg-emerald-500" title={`Receitas: ${formatBRL(m.receitas)}`} />
                <motion.div initial={{ height: 0 }} animate={{ height: (m.despesas / maxVal) * (chartH - 20) }}
                  transition={{ delay: i * 0.08 + 0.05, duration: 0.5 }} className="w-5 rounded-t-md bg-red-400" title={`Despesas: ${formatBRL(m.despesas)}`} />
              </div>
              <span className="text-[10px] font-medium text-neutral-400">{m.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SalesByState() {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="mb-5"><h3 className="text-sm font-semibold text-neutral-900">Vendas por estado</h3><p className="text-xs text-neutral-400">Distribuicao regional</p></div>
      <div className="space-y-3">
        {SALES_BY_STATE.map((s, i) => (
          <div key={s.state} className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><span className="w-7 text-xs font-semibold text-neutral-700">{s.state}</span><span className="text-xs text-neutral-400">{formatBRL(s.value)}</span></div>
              <span className="text-xs font-semibold text-neutral-500">{s.pct}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
              <motion.div initial={{ width: 0 }} animate={{ width: `${s.pct}%` }} transition={{ delay: i * 0.08, duration: 0.6 }} className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Empty / Error States ───────────────────────────────
function EmptyState({ onNew }: { onNew: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100">
        <svg className="h-8 w-8 text-neutral-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
      </div>
      <h3 className="mt-4 text-sm font-semibold text-neutral-700">Nenhuma cobranca cadastrada</h3>
      <p className="mt-1 max-w-xs text-xs text-neutral-400">Crie sua primeira cobranca via Pix, boleto ou cartao para comecar a acompanhar seus recebimentos.</p>
      <button onClick={onNew} className="mt-5 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-[0.98]">Nova cobranca</button>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
        <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
      </div>
      <h3 className="mt-4 text-sm font-semibold text-neutral-700">Erro ao carregar dados</h3>
      <p className="mt-1 max-w-xs text-xs text-neutral-400">Nao foi possivel conectar ao servidor. Verifique sua conexao e tente novamente.</p>
      <button onClick={onRetry} className="mt-5 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 shadow-sm transition-all hover:bg-neutral-50 active:scale-[0.98]">Tentar novamente</button>
    </div>
  );
}

function NoResults({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50">
        <svg className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
      </div>
      <h3 className="mt-4 text-sm font-semibold text-neutral-700">Nenhum resultado encontrado</h3>
      <p className="mt-1 max-w-xs text-xs text-neutral-400">Nenhuma cobranca corresponde aos filtros selecionados. Tente ajustar os criterios.</p>
      <button onClick={onClear} className="mt-5 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 shadow-sm transition-all hover:bg-neutral-50 active:scale-[0.98]">Limpar filtros</button>
    </div>
  );
}

// ── New Charge Modal ───────────────────────────────────
function NewChargeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [method, setMethod] = useState<PaymentMethod>("pix");
  const [clientName, setClientName] = useState("");
  const [doc, setDoc] = useState("");
  const [valor, setValor] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setClientName(""); setDoc(""); setValor(""); setDueDate(""); onClose(); }, 1500);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white shadow-xl" onClick={e => e.stopPropagation()}>
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
              <svg className="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            </div>
            <p className="mt-3 text-sm font-semibold text-neutral-900">Cobranca gerada com sucesso!</p>
            <p className="mt-1 text-xs text-neutral-400">O cliente sera notificado via {METHOD_LABELS[method]}</p>
          </div>
        ) : (
          <>
            <div className="border-b border-neutral-100 px-6 py-4">
              <h3 className="text-base font-semibold text-neutral-900">Nova cobranca</h3>
              <p className="text-xs text-neutral-400">Escolha o metodo e preencha os dados</p>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-[13px] font-semibold text-neutral-700 mb-1.5">Metodo de pagamento</label>
                <div className="flex gap-2">
                  {(["pix", "boleto", "cartao"] as PaymentMethod[]).map(m => (
                    <button key={m} onClick={() => setMethod(m)}
                      className={`flex-1 rounded-xl border-2 px-3 py-2.5 text-sm font-semibold transition-all ${method === m ? "border-emerald-500 bg-emerald-50/50 text-emerald-700" : "border-neutral-100 bg-white text-neutral-500 hover:border-neutral-200"}`}>
                      {m === "pix" && "⚡ Pix"}{m === "boleto" && "📄 Boleto"}{m === "cartao" && "💳 Cartao"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-neutral-700 mb-1.5">Cliente</label>
                <input value={clientName} onChange={e => setClientName(e.target.value)} className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-3.5 text-sm shadow-sm transition-all placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:ring-offset-2" placeholder="Nome do cliente" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[13px] font-semibold text-neutral-700 mb-1.5">CPF / CNPJ</label>
                  <input value={doc} onChange={e => setDoc(e.target.value)} className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-3.5 font-mono text-sm shadow-sm transition-all placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:ring-offset-2" placeholder="000.000.000-00" />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-neutral-700 mb-1.5">Valor</label>
                  <div className="flex items-center rounded-xl border border-neutral-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-emerald-500/40 focus-within:ring-offset-2">
                    <span className="border-r border-neutral-200 bg-neutral-50 px-3 py-2 text-sm font-semibold text-neutral-500 rounded-l-xl">R$</span>
                    <input value={valor} onChange={e => setValor(e.target.value)} className="h-10 flex-1 bg-transparent px-3 font-mono text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none" placeholder="0,00" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-neutral-700 mb-1.5">Vencimento</label>
                <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-3.5 text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:ring-offset-2" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 border-t border-neutral-100 px-6 py-4">
              <button onClick={onClose} className="rounded-xl px-4 py-2 text-sm font-semibold text-neutral-500 transition-colors hover:text-neutral-700">Cancelar</button>
              <button onClick={handleSubmit} disabled={!clientName || !valor}
                className="rounded-xl bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-emerald-200/50 transition-all hover:bg-emerald-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
                Gerar cobranca
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

// ── Toast Notification ─────────────────────────────────
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 shadow-lg">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
        <svg className="h-3.5 w-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
      </div>
      <p className="text-sm font-medium text-neutral-700">{message}</p>
      <button onClick={onClose} className="ml-2 text-neutral-400 hover:text-neutral-600"><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
    </motion.div>
  );
}

// ── Page: Clientes ─────────────────────────────────────
function ClientesPage() {
  const [search, setSearch] = useState("");
  const filtered = CLIENTS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.document.includes(search));
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-100 px-5 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div><h3 className="text-sm font-semibold text-neutral-900">Clientes</h3><p className="text-xs text-neutral-400">{filtered.length} cadastrados</p></div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nome ou documento..."
            className="h-8 w-full sm:w-64 rounded-lg border border-neutral-200 bg-white px-3 text-xs shadow-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead><tr className="border-b border-neutral-100 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
              <th className="px-5 py-3">Cliente</th><th className="px-5 py-3">Documento</th><th className="px-5 py-3">Contato</th><th className="px-5 py-3">UF</th><th className="px-5 py-3 text-right">Total cobrado</th><th className="px-5 py-3 text-right">Cobrancas</th>
            </tr></thead>
            <tbody className="divide-y divide-neutral-50">
              {filtered.map(c => (
                <tr key={c.id} className="transition-colors hover:bg-neutral-50/50">
                  <td className="px-5 py-3.5"><p className="text-sm font-medium text-neutral-900">{c.name}</p><p className="text-[10px] text-neutral-400">{c.id}</p></td>
                  <td className="px-5 py-3.5"><p className="font-mono text-xs text-neutral-700">{c.document}</p><p className="text-[10px] text-neutral-400">{c.documentType}</p></td>
                  <td className="px-5 py-3.5"><p className="text-xs text-neutral-700">{c.email}</p><p className="text-[10px] text-neutral-400">{c.phone}</p></td>
                  <td className="px-5 py-3.5 text-xs font-semibold text-neutral-600">{c.state}</td>
                  <td className="px-5 py-3.5 text-right font-mono text-sm font-semibold text-neutral-900 tabular-nums">{formatBRL(c.totalValue)}</td>
                  <td className="px-5 py-3.5 text-right text-sm text-neutral-600">{c.totalCharges}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center"><p className="text-sm text-neutral-400">Nenhum cliente encontrado</p></div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Page: Relatorios ───────────────────────────────────
function RelatoriosPage() {
  const totalReceitas = MONTHLY_FLOW.reduce((s, m) => s + m.receitas, 0);
  const totalDespesas = MONTHLY_FLOW.reduce((s, m) => s + m.despesas, 0);
  const lucro = totalReceitas - totalDespesas;
  const margemPct = ((lucro / totalReceitas) * 100).toFixed(1);
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <p className="text-[13px] font-semibold text-neutral-500">Total receitas (6m)</p>
          <p className="mt-1.5 text-2xl font-bold text-emerald-600">{formatBRL(totalReceitas)}</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <p className="text-[13px] font-semibold text-neutral-500">Total despesas (6m)</p>
          <p className="mt-1.5 text-2xl font-bold text-red-500">{formatBRL(totalDespesas)}</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <p className="text-[13px] font-semibold text-neutral-500">Margem de lucro</p>
          <p className="mt-1.5 text-2xl font-bold text-neutral-900">{margemPct}%</p>
          <p className="mt-0.5 text-xs text-neutral-400">Lucro: {formatBRL(lucro)}</p>
        </div>
      </div>
      <CashflowChart />
      <SalesByState />
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-neutral-900 mb-4">Cobrancas por status</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {(Object.entries(STATUS_CONFIG) as [ChargeStatus, typeof STATUS_CONFIG[ChargeStatus]][]).map(([key, cfg]) => {
            const count = CHARGES.filter(c => c.status === key).length;
            const total = CHARGES.filter(c => c.status === key).reduce((s, c) => s + c.amount, 0);
            return (
              <div key={key} className={`rounded-xl p-3.5 ${cfg.bg}`}>
                <div className="flex items-center gap-1.5 mb-1"><span className={`h-2 w-2 rounded-full ${cfg.dot}`} /><span className={`text-xs font-semibold ${cfg.text}`}>{cfg.label}</span></div>
                <p className={`text-lg font-bold ${cfg.text}`}>{count}</p>
                <p className="text-xs text-neutral-500">{formatBRL(total)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Page: Configuracoes ────────────────────────────────
function ConfiguracoesPage() {
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifWhatsapp, setNotifWhatsapp] = useState(false);
  const [autoReminder, setAutoReminder] = useState(true);
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-100 px-5 py-4"><h3 className="text-sm font-semibold text-neutral-900">Dados da empresa</h3></div>
        <div className="px-5 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-[13px] font-semibold text-neutral-700 mb-1.5">Razao social</label><input defaultValue="Oficina Horizonte LTDA" className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-3.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:ring-offset-2" /></div>
            <div><label className="block text-[13px] font-semibold text-neutral-700 mb-1.5">CNPJ</label><input defaultValue="12.345.678/0001-90" className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-3.5 font-mono text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:ring-offset-2" /></div>
          </div>
          <div><label className="block text-[13px] font-semibold text-neutral-700 mb-1.5">Email financeiro</label><input defaultValue="financeiro@oficina-horizonte.com.br" className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-3.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:ring-offset-2" /></div>
        </div>
      </div>
      <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-100 px-5 py-4"><h3 className="text-sm font-semibold text-neutral-900">Notificacoes</h3></div>
        <div className="px-5 py-5 space-y-4">
          {[{ label: "Email", desc: "Receba notificacoes por email", checked: notifEmail, onChange: setNotifEmail },
            { label: "WhatsApp", desc: "Receba notificacoes via WhatsApp", checked: notifWhatsapp, onChange: setNotifWhatsapp },
            { label: "Lembrete automatico", desc: "Enviar lembrete 3 dias antes do vencimento", checked: autoReminder, onChange: setAutoReminder },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between">
              <div><p className="text-sm font-medium text-neutral-700">{item.label}</p><p className="text-xs text-neutral-400">{item.desc}</p></div>
              <button onClick={() => item.onChange(!item.checked)}
                className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-transparent shadow-sm transition-all ${item.checked ? "bg-emerald-600" : "bg-neutral-200"}`}>
                <span className={`block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${item.checked ? "translate-x-5" : "translate-x-0"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleSave} className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-200/50 transition-all hover:bg-emerald-700 active:scale-[0.98]">
        {saved ? "✓ Salvo!" : "Salvar alteracoes"}
      </button>
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────
export default function OficinaHorizontePage() {
  const [currentPage, setCurrentPage] = useState<Page>("painel");
  const [viewState, setViewState] = useState<ViewState>("loaded");
  const [filterPeriod, setFilterPeriod] = useState<FilterPeriod>("30d");
  const [filterState, setFilterState] = useState("Todos");
  const [filterStatus, setFilterStatus] = useState<ChargeStatus | "todos">("todos");
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const filteredCharges = useMemo(() => {
    if (viewState !== "loaded") return [];
    return CHARGES.filter(c => {
      if (filterStatus !== "todos" && c.status !== filterStatus) return false;
      if (filterState !== "Todos" && c.state !== filterState) return false;
      if (filterPeriod !== "all") {
        const days = daysAgo(c.dueDate);
        const limit = filterPeriod === "7d" ? 7 : filterPeriod === "30d" ? 30 : 90;
        if (days > limit) return false;
      }
      return true;
    });
  }, [filterStatus, filterState, filterPeriod, viewState]);

  const clearFilters = useCallback(() => {
    setFilterStatus("todos");
    setFilterState("Todos");
    setFilterPeriod("all");
    setViewState("loaded");
  }, []);

  const handleRowAction = useCallback((action: string, id: string) => {
    if (action === "copy") showToast(`Link da cobranca ${id} copiado!`);
    else if (action === "remind") showToast(`Lembrete enviado para ${id}`);
    else if (action === "cancel") showToast(`Cobranca ${id} cancelada`);
    else if (action === "details") showToast(`Detalhes de ${id}`);
  }, [showToast]);

  const totalReceber = CHARGES.filter(c => c.status === "aguardando_pix" || c.status === "em_analise").reduce((s, c) => s + c.amount, 0);
  const totalPagar = 32400;
  const saldo = 87650.42;
  const pageInfo = PAGE_TITLES[currentPage];

  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  }, []);

  // Sidebar content — shared between desktop and mobile
  const sidebarNav = (
    <>
      {NAV_ITEMS.map((item) => (
        <button key={item.key} onClick={() => navigateTo(item.key)}
          className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-all ${
            currentPage === item.key ? "bg-emerald-50 font-semibold text-emerald-700" : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700"
          }`}>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
          {item.label}
        </button>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
        {/* Desktop Sidebar — fixed */}
        <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-60 flex-col border-r border-neutral-200 bg-white z-30">
          <div className="px-5 py-5 border-b border-neutral-100">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-sm shadow-emerald-200/50">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5z" /></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-900">Oficina Horizonte</p>
                <p className="text-[10px] font-medium text-neutral-400">Gestao financeira</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">{sidebarNav}</nav>
          <div className="border-t border-neutral-100 bg-white px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-xs font-semibold text-neutral-600">JR</div>
              <div>
                <p className="text-xs font-semibold text-neutral-700">Jose Ricardo</p>
                <p className="text-[10px] text-neutral-400">jose@oficina.com.br</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}

        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
              <motion.aside initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }} transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-neutral-200 bg-white lg:hidden">
                <div className="px-5 py-5 border-b border-neutral-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5z" /></svg>
                    </div>
                    <p className="text-sm font-bold text-neutral-900">Oficina Horizonte</p>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="rounded-lg p-1 text-neutral-400 hover:text-neutral-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">{sidebarNav}</nav>
                <div className="border-t border-neutral-100 px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-xs font-semibold text-neutral-600">JR</div>
                    <div><p className="text-xs font-semibold text-neutral-700">Jose Ricardo</p><p className="text-[10px] text-neutral-400">jose@oficina.com.br</p></div>
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="min-h-screen lg:ml-60">
          {/* Top Bar — sticky */}
          <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/95 backdrop-blur-sm px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={() => setMobileMenuOpen(true)} className="rounded-lg p-1.5 text-neutral-500 hover:bg-neutral-100 lg:hidden">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
                </button>
                <div>
                  <h1 className="text-lg font-bold text-neutral-900">{pageInfo.title}</h1>
                  <p className="text-xs text-neutral-400">{pageInfo.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {currentPage === "painel" && (
                  <select value={viewState} onChange={e => setViewState(e.target.value as ViewState)}
                    className="h-8 rounded-lg border border-neutral-200 bg-white px-2 text-[11px] font-medium text-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40" aria-label="Estado da interface">
                    <option value="loaded">Dados carregados</option><option value="empty">Sem cobrancas</option><option value="error">Erro de conexao</option><option value="no_results">Sem resultados</option>
                  </select>
                )}
                {(currentPage === "painel" || currentPage === "cobrancas") && (
                  <button onClick={() => setModalOpen(true)}
                    className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-emerald-200/50 transition-all hover:bg-emerald-700 active:scale-[0.98]">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                    <span className="hidden sm:inline">Nova cobranca</span>
                  </button>
                )}
              </div>
            </div>
          </header>

          <div className="p-6 space-y-6">
            {/* ── Page: Painel ── */}
            {currentPage === "painel" && (
              <>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <MetricCard title="Saldo disponivel" value={formatBRL(saldo)} subtitle="Conta principal" trend={{ value: "12,4%", positive: true }}
                    icon={<svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>} />
                  <MetricCard title="Contas a receber" value={formatBRL(totalReceber)} subtitle={`${CHARGES.filter(c => c.status === "aguardando_pix" || c.status === "em_analise").length} cobrancas pendentes`} trend={{ value: "8,2%", positive: true }}
                    icon={<svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>} />
                  <MetricCard title="Contas a pagar" value={formatBRL(totalPagar)} subtitle="12 vencimentos no mes" trend={{ value: "3,1%", positive: false }}
                    icon={<svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" /></svg>} />
                  <MetricCard title="Resultado mensal" value={formatBRL(saldo - totalPagar)} subtitle="Receitas - despesas" trend={{ value: "18,7%", positive: true }}
                    icon={<svg className="h-5 w-5 text-violet-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>} />
                </div>
                <div className="grid gap-6 lg:grid-cols-5">
                  <div className="lg:col-span-3"><CashflowChart /></div>
                  <div className="lg:col-span-2"><SalesByState /></div>
                </div>
              </>
            )}

            {/* ── Charges Table (Painel + Cobrancas) ── */}
            {(currentPage === "painel" || currentPage === "cobrancas") && (
              <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
                <div className="border-b border-neutral-100 px-5 py-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div><h3 className="text-sm font-semibold text-neutral-900">Cobrancas</h3><p className="text-xs text-neutral-400">{filteredCharges.length} de {CHARGES.length} registros</p></div>
                    <div className="flex flex-wrap items-center gap-2">
                      <select value={filterPeriod} onChange={e => setFilterPeriod(e.target.value as FilterPeriod)}
                        className="h-8 rounded-lg border border-neutral-200 bg-white px-2.5 text-xs font-medium text-neutral-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40" aria-label="Periodo">
                        <option value="7d">7 dias</option><option value="30d">30 dias</option><option value="90d">90 dias</option><option value="all">Todo periodo</option>
                      </select>
                      <select value={filterState} onChange={e => setFilterState(e.target.value)}
                        className="h-8 rounded-lg border border-neutral-200 bg-white px-2.5 text-xs font-medium text-neutral-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40" aria-label="Estado">
                        {STATES_FILTER.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as ChargeStatus | "todos")}
                        className="h-8 rounded-lg border border-neutral-200 bg-white px-2.5 text-xs font-medium text-neutral-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40" aria-label="Status">
                        <option value="todos">Todos os status</option>
                        {(Object.entries(STATUS_CONFIG) as [ChargeStatus, typeof STATUS_CONFIG[ChargeStatus]][]).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                {viewState === "empty" && <EmptyState onNew={() => setModalOpen(true)} />}
                {viewState === "error" && <ErrorState onRetry={() => setViewState("loaded")} />}
                {viewState === "no_results" && <NoResults onClear={clearFilters} />}
                {viewState === "loaded" && filteredCharges.length === 0 && <NoResults onClear={clearFilters} />}
                {viewState === "loaded" && filteredCharges.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead><tr className="border-b border-neutral-100 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                        <th className="px-5 py-3">Cliente</th><th className="px-5 py-3">CPF / CNPJ</th><th className="px-5 py-3">Vencimento</th><th className="px-5 py-3 text-right">Valor</th><th className="px-5 py-3">Metodo</th><th className="px-5 py-3">Status</th><th className="px-5 py-3 text-right">Acoes</th>
                      </tr></thead>
                      <tbody className="divide-y divide-neutral-50">
                        {filteredCharges.map(c => (
                          <tr key={c.id} className="transition-colors hover:bg-neutral-50/50">
                            <td className="px-5 py-3.5"><p className="text-sm font-medium text-neutral-900">{c.client}</p><p className="text-[10px] text-neutral-400">{c.id}</p></td>
                            <td className="px-5 py-3.5"><p className="font-mono text-xs text-neutral-700">{c.document}</p><p className="text-[10px] text-neutral-400">{c.documentType}</p></td>
                            <td className="px-5 py-3.5 text-sm text-neutral-600 tabular-nums">{formatDate(c.dueDate)}</td>
                            <td className="px-5 py-3.5 text-right font-mono text-sm font-semibold text-neutral-900 tabular-nums">{formatBRL(c.amount)}</td>
                            <td className="px-5 py-3.5"><span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-600">{METHOD_LABELS[c.method]}</span></td>
                            <td className="px-5 py-3.5"><StatusBadge status={c.status} /></td>
                            <td className="px-5 py-3.5 text-right"><RowActions chargeId={c.id} onAction={handleRowAction} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {currentPage === "clientes" && <ClientesPage />}
            {currentPage === "relatorios" && <RelatoriosPage />}
            {currentPage === "configuracoes" && <ConfiguracoesPage />}
          </div>
        </main>

      <NewChargeModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <AnimatePresence>{toast && <Toast message={toast} onClose={() => setToast(null)} />}</AnimatePresence>
    </div>
  );
}
