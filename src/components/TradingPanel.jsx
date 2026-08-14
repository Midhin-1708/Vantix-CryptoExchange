import { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";

const ORDER_TYPES = ["Market", "Limit", "Stop-Limit"];

export default function TradingPanel({ coin }) {
  const [side, setSide] = useState("buy");
  const [orderType, setOrderType] = useState("Market");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState(coin.price.toFixed(2));
  const [confirmation, setConfirmation] = useState(null);

  const total = useMemo(() => {
    const a = parseFloat(amount) || 0;
    const p = orderType === "Market" ? coin.price : parseFloat(price) || 0;
    return a * p;
  }, [amount, price, orderType, coin.price]);

  const availableBalance = side === "buy" ? 42380.9 : 0.842;

  function handleSubmit(e) {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    setConfirmation({ side, amount, coin: coin.symbol, total: total.toFixed(2) });
    setTimeout(() => setConfirmation(null), 3200);
  }

  function setPercent(pct) {
    if (side === "buy") {
      const p = orderType === "Market" ? coin.price : parseFloat(price) || coin.price;
      const spend = availableBalance * pct;
      setAmount((spend / p).toFixed(6));
    } else {
      setAmount((availableBalance * pct).toFixed(6));
    }
  }

  return (
    <div className="flex h-full min-h-[520px] w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
      <div className="border-b border-border px-4 py-4 sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-ink-400">
              Trading Pair
            </p>
            <h3 className="truncate font-display text-base font-bold text-ink-900 sm:text-lg">
              Trade {coin.symbol}/USDT
            </h3>
          </div>

          <div className="relative shrink-0">
            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              className="h-10 appearance-none rounded-lg border border-border bg-surface-alt py-1.5 pl-3 pr-8 text-xs font-semibold text-ink-700 outline-none transition hover:border-border-strong focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 sm:text-sm"
            >
              {ORDER_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-400" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-surface-alt p-1">
          {["buy", "sell"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSide(s)}
              className={`rounded-lg py-2.5 text-sm font-bold capitalize transition-all duration-200 ${
                side === s
                  ? s === "buy"
                    ? "bg-buy-600 text-white shadow-sm"
                    : "bg-sell-600 text-white shadow-sm"
                  : "text-ink-500 hover:bg-surface hover:text-ink-900"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-1 flex-col space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <span className="text-xs text-ink-400">Available balance</span>
            <span className="text-xs font-semibold tabular text-ink-700">
              {side === "buy" ? `$${availableBalance.toLocaleString()}` : `${availableBalance} ${coin.symbol}`}
            </span>
          </div>

          {orderType !== "Market" && (
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-ink-500">Price (USDT)</span>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="h-11 w-full rounded-xl border border-border bg-surface-alt px-3 text-sm font-medium tabular text-ink-900 outline-none transition placeholder:text-ink-400 focus:border-brand-500 focus:bg-surface-sunken focus:ring-2 focus:ring-brand-500/10"
              />
            </label>
          )}

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-ink-500">Amount ({coin.symbol})</span>
            <input
              type="number"
              step="0.000001"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="h-11 w-full rounded-xl border border-border bg-surface-alt px-3 text-sm font-medium tabular text-ink-900 outline-none transition placeholder:text-ink-400 focus:border-brand-500 focus:bg-surface-sunken focus:ring-2 focus:ring-brand-500/10"
            />
          </label>

          <div className="grid grid-cols-4 gap-1.5">
            {[0.25, 0.5, 0.75, 1].map((pct) => (
              <button
                type="button"
                key={pct}
                onClick={() => setPercent(pct)}
                className="rounded-lg border border-border bg-surface py-2 text-[11px] font-semibold text-ink-500 transition hover:border-brand-500 hover:bg-brand-100 hover:text-brand-500"
              >
                {pct * 100}%
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between rounded-xl border border-border bg-surface-alt px-3.5 py-3">
            <span className="text-xs font-medium text-ink-500">Total</span>
            <span className="font-display text-sm font-bold tabular text-ink-900">
              ${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
          </div>

          <button
            type="submit"
            className={`mt-auto w-full rounded-xl py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 active:scale-[0.98] ${
              side === "buy" ? "bg-buy-600 hover:bg-buy-700" : "bg-sell-600 hover:bg-sell-700"
            }`}
          >
            {side === "buy" ? `Buy ${coin.symbol}` : `Sell ${coin.symbol}`}
          </button>

          {confirmation && (
            <p className="animate-fade-up rounded-xl border border-brand-500/30 bg-brand-100 px-3 py-2.5 text-center text-xs font-semibold text-brand-500">
              {confirmation.side === "buy" ? "Buy" : "Sell"} order placed — {confirmation.amount} {confirmation.coin} (${confirmation.total})
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
