import { orderBook } from "../data/mockData";
import { formatCurrency } from "../utils/format";

function Rows({ rows, side }) {
  const maxTotal = Math.max(...rows.map((r) => r.total));
  const positive = side === "bid";

  return (
    <div className="space-y-0.5">
      {rows.map((r) => (
        <div
          key={r.price}
          className="relative grid grid-cols-[minmax(0,1.3fr)_minmax(55px,0.8fr)_minmax(65px,1fr)] items-center gap-2 px-3 py-1.5 text-xs sm:px-4"
        >
          <div
            className={`absolute inset-y-0 right-0 ${positive ? "bg-buy-100" : "bg-sell-100"}`}
            style={{ width: `${(r.total / maxTotal) * 100}%` }}
          />

          <span className={`relative z-10 min-w-0 truncate tabular font-medium ${positive ? "text-buy-700" : "text-sell-700"}`}>
            {r.price.toLocaleString()}
          </span>

          <span className="relative z-10 min-w-0 truncate text-right tabular text-ink-700">
            {r.amount.toFixed(3)}
          </span>

          <span className="relative z-10 min-w-0 truncate text-right tabular text-ink-400">
            {r.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function OrderBook({ coin }) {
  const asksAsc = [...orderBook.asks].sort((a, b) => b.price - a.price);

  return (
    <div className="flex h-full min-h-[520px] w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
      <div className="border-b border-border px-4 py-4 sm:px-5">
        <h3 className="font-display text-lg font-bold tracking-tight text-ink-900 sm:text-xl">
          Order Book
        </h3>
      </div>

      <div className="flex flex-1 flex-col px-0 py-3 sm:py-4">
        <div className="grid grid-cols-[minmax(0,1.3fr)_minmax(55px,0.8fr)_minmax(65px,1fr)] gap-2 px-3 text-[10px] font-semibold uppercase tracking-wide text-ink-400 sm:px-4 sm:text-[11px]">
          <span>
            Price
            <span className="block">(USDT)</span>
          </span>

          <span className="text-right">
            Amount
            <span className="block">({coin.symbol})</span>
          </span>

          <span className="text-right">Total</span>
        </div>

        <div className="mt-2">
          <Rows rows={asksAsc} side="ask" />
        </div>

        <div className="my-3 flex min-h-[58px] items-center justify-between gap-3 rounded-xl bg-surface-alt px-3 sm:px-4">
          <span className="font-display text-base font-bold tabular text-ink-900 sm:text-lg">
            {formatCurrency(coin.price)}
          </span>

          <span className="text-right text-[10px] font-medium leading-tight text-ink-400 sm:text-xs">
            Market
            <br />
            price
          </span>
        </div>

        <div>
          <Rows rows={orderBook.bids} side="bid" />
        </div>
      </div>
    </div>
  );
}
