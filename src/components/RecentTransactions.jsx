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

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return recentTransactions.filter((tx) => {
      const matchesQuery =
        !q ||
        tx.id.toLowerCase().includes(q) ||
        tx.coin.toLowerCase().includes(q);

      const matchesType =
        typeFilter === "All" || tx.type === typeFilter;

      const matchesStatus =
        statusFilter === "All" || tx.status === statusFilter;

      return matchesQuery && matchesType && matchesStatus;
    });
  }, [search, typeFilter, statusFilter]);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-surface shadow-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-4 sm:px-5">
        <div>
          <h3 className="font-display text-base font-semibold text-ink-900">
            Recent Transactions
          </h3>

          <p className="mt-0.5 text-[11px] text-ink-400">
            View and filter your latest transactions
          </p>
        </div>

        <span className="rounded-md bg-surface-alt px-2.5 py-1 text-[11px] font-semibold tabular text-ink-500">
          {filtered.length} Results
        </span>
      </div>

      <div className="flex flex-col gap-3 border-b border-border px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex h-9 w-full items-center gap-2 rounded-lg border border-border bg-surface-alt px-3 transition-colors focus-within:border-brand-300 focus-within:bg-surface lg:max-w-sm">
          <Search className="h-4 w-4 shrink-0 text-ink-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ID or crypto..."
            className="min-w-0 flex-1 bg-transparent text-xs font-medium text-ink-900 outline-none placeholder:text-ink-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-0.5 rounded-lg border border-border bg-surface-alt p-1">
            {TYPE_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setTypeFilter(f)}
                className={`rounded-md px-3 py-1.5 text-[11px] font-semibold transition-all ${
                  typeFilter === f
                    ? "bg-brand-600 text-white shadow-sm"
                    : "text-ink-500 hover:bg-surface hover:text-ink-900"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-0.5 rounded-lg border border-border bg-surface-alt p-1">
            {STATUS_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`rounded-md px-3 py-1.5 text-[11px] font-semibold transition-all ${
                  statusFilter === f
                    ? "bg-brand-600 text-white shadow-sm"
                    : "text-ink-500 hover:bg-surface hover:text-ink-900"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse">
          <thead>
            <tr className="border-b border-border bg-surface-alt/60 text-left">
              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-ink-400">
                Transaction ID
              </th>

              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-ink-400">
                Coin
              </th>

              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-ink-400">
                Type
              </th>

              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-ink-400">
                Amount
              </th>

              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-ink-400">
                Price
              </th>

              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-ink-400">
                Status
              </th>

              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-ink-400">
                Date / Time
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-14 text-center text-xs font-medium text-ink-400"
                >
                  No transactions match your filters.
                </td>
              </tr>
            )}

            {filtered.map((tx) => (
              <tr
                key={tx.id}
                className="border-b border-border last:border-b-0 transition-colors hover:bg-surface-alt"
              >
                <td className="px-5 py-3.5">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-ink-500">
                    <Lock className="h-3 w-3 text-ink-400" />
                    {tx.id}
                  </span>
                </td>

                <td className="px-5 py-3.5">
                  <span className="font-semibold text-xs text-ink-900">
                    {tx.coin}
                  </span>
                </td>

                <td className="px-5 py-3.5">
                  <span
                    className={`inline-flex rounded-md px-2 py-1 text-[10px] font-bold ${
                      tx.type === "Buy"
                        ? "bg-buy-100 text-buy-700"
                        : "bg-sell-100 text-sell-700"
                    }`}
                  >
                    {tx.type}
                  </span>
                </td>

                <td className="px-5 py-3.5 text-xs font-medium tabular text-ink-700">
                  {tx.amount} {tx.coin}
                </td>

                <td className="px-5 py-3.5 text-xs font-medium tabular text-ink-700">
                  {formatCurrency(tx.price)}
                </td>

                <td className="px-5 py-3.5">
                  <span
                    className={`inline-flex rounded-md px-2 py-1 text-[10px] font-bold ${
                      STATUS_STYLES[tx.status]
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>

                <td className="whitespace-nowrap px-5 py-3.5 text-[11px] font-medium text-ink-400">
                  {tx.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}