import { useMemo, useState } from "react";
import { Lock, Search } from "lucide-react";
import { recentTransactions } from "../data/mockData";
import { formatCurrency } from "../utils/format";

const STATUS_STYLES = {
  Completed: "bg-buy-100 text-buy-700",
  Pending: "bg-amber-100 text-amber-600",
  Failed: "bg-sell-100 text-sell-700",
};

const STATUS_FILTERS = ["All", "Completed", "Pending", "Failed"];
const TYPE_FILTERS = ["All", "Buy", "Sell"];

export default function RecentTransactions() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const counts = useMemo(() => {
    return recentTransactions.reduce(
      (acc, tx) => {
        acc.total += 1;
        if (tx.status === "Completed") acc.completed += 1;
        if (tx.status === "Pending") acc.pending += 1;
        if (tx.status === "Failed") acc.failed += 1;
        return acc;
      },
      { total: 0, completed: 0, pending: 0, failed: 0 }
    );
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return recentTransactions.filter((tx) => {
      const matchesQuery =
        !q || tx.id.toLowerCase().includes(q) || tx.coin.toLowerCase().includes(q);
      const matchesType = typeFilter === "All" || tx.type === typeFilter;
      const matchesStatus = statusFilter === "All" || tx.status === statusFilter;
      return matchesQuery && matchesType && matchesStatus;
    });
  }, [search, typeFilter, statusFilter]);

  return (
    <div className="rounded-xl border border-border bg-surface shadow-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h3 className="font-display text-base font-semibold text-ink-900">Recent Transactions</h3>
        <span className="text-xs font-medium text-ink-400">
          {filtered.length} of {recentTransactions.length}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-4">
        <div className="rounded-lg border border-border bg-surface-alt px-4 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-400">Total</p>
          <p className="mt-1 font-display text-xl font-bold tabular text-ink-900">{counts.total}</p>
        </div>
        <div className="rounded-lg border border-border bg-surface-alt px-4 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-400">Completed</p>
          <p className="mt-1 font-display text-xl font-bold tabular text-buy-700">{counts.completed}</p>
        </div>
        <div className="rounded-lg border border-border bg-surface-alt px-4 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-400">Pending</p>
          <p className="mt-1 font-display text-xl font-bold tabular text-brand-500">{counts.pending}</p>
        </div>
        <div className="rounded-lg border border-border bg-surface-alt px-4 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-400">Failed</p>
          <p className="mt-1 font-display text-xl font-bold tabular text-sell-700">{counts.failed}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 px-5 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-xs items-center gap-2 rounded-lg border border-border bg-surface-alt px-3 py-2">
          <Search className="h-4 w-4 shrink-0 text-ink-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ID or crypto..."
            className="min-w-0 flex-1 bg-transparent text-sm text-ink-900 outline-none placeholder:text-ink-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex gap-1 rounded-lg bg-surface-alt p-1">
            {TYPE_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setTypeFilter(f)}
                className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                  typeFilter === f ? "bg-brand-600 text-brand-900" : "text-ink-500 hover:text-ink-900"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex gap-1 rounded-lg bg-surface-alt p-1">
            {STATUS_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                  statusFilter === f ? "bg-brand-600 text-brand-900" : "text-ink-500 hover:text-ink-900"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-sm">
          <thead>
            <tr className="text-left text-[11px] font-semibold uppercase tracking-wide text-ink-400">
              <th className="px-5 py-2.5">Transaction ID</th>
              <th className="px-5 py-2.5">Coin</th>
              <th className="px-5 py-2.5">Type</th>
              <th className="px-5 py-2.5">Amount</th>
              <th className="px-5 py-2.5">Price</th>
              <th className="px-5 py-2.5">Status</th>
              <th className="px-5 py-2.5">Date / Time</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-sm text-ink-400">
                  No transactions match your filters.
                </td>
              </tr>
            )}

            {filtered.map((tx) => (
              <tr key={tx.id} className="border-t border-border transition-colors hover:bg-surface-alt">
                <td className="px-5 py-3 font-mono text-xs text-ink-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Lock className="h-3 w-3 text-ink-400" />
                    {tx.id}
                  </span>
                </td>
                <td className="px-5 py-3 font-medium text-ink-900">{tx.coin}</td>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-md px-2 py-0.5 text-xs font-semibold ${
                      tx.type === "Buy" ? "bg-buy-100 text-buy-700" : "bg-sell-100 text-sell-700"
                    }`}
                  >
                    {tx.type}
                  </span>
                </td>
                <td className="px-5 py-3 tabular text-ink-700">
                  {tx.amount} {tx.coin}
                </td>
                <td className="px-5 py-3 tabular text-ink-700">{formatCurrency(tx.price)}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${STATUS_STYLES[tx.status]}`}>
                    {tx.status}
                  </span>
                </td>
                <td className="px-5 py-3 whitespace-nowrap text-xs text-ink-400">{tx.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
