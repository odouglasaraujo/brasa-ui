"use client";

import { useState } from "react";
import { CheckoutFlow } from "./components/checkout-flow";
import { ShoppingBag } from "lucide-react";

const PRODUCTS = [
  {
    id: 1,
    name: "Camiseta Oversized Premium",
    description: "100% algodão pima, tingimento natural",
    price: 14990,
    image: "👕",
    size: "G",
  },
  {
    id: 2,
    name: "Bermuda Cargo Slim",
    description: "Sarja stretch com bolsos laterais",
    price: 17990,
    image: "🩳",
    size: "42",
  },
  {
    id: 3,
    name: "Tênis Runner 3.0",
    description: "Entressola em EVA, cabedal knit respirável",
    price: 34990,
    image: "👟",
    size: "42",
  },
];

function formatBRL(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function Home() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [cart] = useState(PRODUCTS);

  const subtotal = cart.reduce((sum, p) => sum + p.price, 0);
  const shipping = 1590;
  const total = subtotal + shipping;

  if (showCheckout) {
    return (
      <CheckoutFlow
        items={cart}
        subtotal={subtotal}
        shipping={shipping}
        total={total}
        onBack={() => setShowCheckout(false)}
      />
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
          <ShoppingBag className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight">Loja Demo</h1>
          <p className="text-xs text-neutral-500">
            Powered by{" "}
            <span className="font-semibold text-emerald-600">brasa.ui</span>
          </p>
        </div>
        <span className="ml-auto rounded-full bg-gradient-to-r from-emerald-50 via-yellow-50 to-blue-50 px-3 py-1 text-xs font-medium text-emerald-700 border border-emerald-200">
          Exemplo
        </span>
      </div>

      {/* Cart items */}
      <div className="space-y-3">
        {cart.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 transition-shadow hover:shadow-md"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-neutral-100 text-3xl">
              {product.image}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-neutral-900">{product.name}</h3>
              <p className="text-xs text-neutral-500">{product.description}</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-600">
                  Tam: {product.size}
                </span>
                <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-600">
                  Qtd: 1
                </span>
              </div>
            </div>
            <p className="text-sm font-bold text-neutral-900">
              {formatBRL(product.price)}
            </p>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-neutral-600">
            <span>Subtotal ({cart.length} itens)</span>
            <span>{formatBRL(subtotal)}</span>
          </div>
          <div className="flex justify-between text-neutral-600">
            <span>Frete</span>
            <span>{formatBRL(shipping)}</span>
          </div>
          <div className="flex justify-between border-t border-neutral-100 pt-2 text-base font-bold text-neutral-900">
            <span>Total</span>
            <span>{formatBRL(total)}</span>
          </div>
          <p className="text-center text-xs text-neutral-400">
            ou 10x de {formatBRL(Math.ceil(total / 10))} sem juros
          </p>
        </div>

        <button
          onClick={() => setShowCheckout(true)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-emerald-700 active:bg-emerald-800"
        >
          Finalizar Compra
        </button>
      </div>

      {/* Footer badge */}
      <div className="mt-8 flex flex-col items-center gap-2 text-center">
        <p className="text-xs text-neutral-400">
          Todos os componentes desta página são da biblioteca
        </p>
        <a
          href="https://github.com/odouglasaraujo/brasa-ui"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-neutral-800"
        >
          <span className="text-emerald-400">●</span>
          brasa.ui
          <span className="text-neutral-500">→</span>
        </a>
      </div>
    </div>
  );
}
