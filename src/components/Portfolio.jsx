import { Wallet, Banknote, PieChart, TrendingUp, TrendingDown } from "lucide-react";
import { portfolioHoldings, portfolioSummary, coins } from "../data/mockData";
import { formatCurrency, formatNumber } from "../utils/format";

function SummaryCard({ icon: Icon, label, value, sub, subPositive }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-card">
      <div className="flex items-center gap-2 text-ink-400">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-2 font-display text-2xl font-semibold tabular text-ink-900">{value}</p>
      {sub && (
        <p className={`mt-1 flex items-center gap-1 text-xs font-semibold ${subPositive ? "text-buy-700" : "text-ink-500"}`}>
          {subPositive && <TrendingUp className="h-3.5 w-3.5" />}
          {sub}
        </p>
      )}
    </div>
  );
}

export default function Portfolio() {
  const holdingsTotal = portfolioHoldings.reduce((s, h) => s + h.value, 0);
  const grandTotal = holdingsTotal + portfolioSummary.availableBalance;

  const allocationRows = [
    ...portfolioHoldings.map((h) => ({
      symbol: h.symbol,
      name: h.name,
      value: h.value,
      color: h.color,
    })),
    {
      symbol: portfolioSummary.cashLabel,
      name: "Available Cash",
      value: portfolioSummary.availableBalance,
      color: "#61708A",
    },
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-border bg-surface p-5 shadow-card">
        <h3 className="mb-4 font-display text-base font-semibold text-ink-900">Portfolio Overview</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <SummaryCard
            icon={Wallet}
            label="Total Portfolio Balance"
            value={formatCurrency(portfolioSummary.totalBalance)}
            sub={`Invested ${formatCurrency(portfolioSummary.invested)}`}
          />
          <SummaryCard
            icon={Banknote}
            label="Available Balance"
            value={formatCurrency(portfolioSummary.availableBalance)}
            sub="Ready for trading"
          />
          <SummaryCard
            icon={PieChart}
            label="Profit / Loss"
            value={`+${formatCurrency(portfolioSummary.profitLoss)}`}
            sub={`+${portfolioSummary.profitLossPercent}% unrealized gain`}
            subPositive
          />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface p-5 shadow-card">
        <h3 className="font-display text-base font-semibold text-ink-900">Asset Allocation</h3>

        <div className="mt-4 flex h-3 w-full overflow-hidden rounded-full bg-surface-alt">
          {allocationRows.map((h) => (
            <div
              key={h.symbol}
              style={{ width: `${(h.value / grandTotal) * 100}%`, backgroundColor: h.color }}
              title={`${h.symbol} ${((h.value / grandTotal) * 100).toFixed(1)}%`}
            />
          ))}
        </div>

        <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3">
          {allocationRows.map((h) => (
            <li key={h.symbol} className="flex items-center justify-between gap-2 text-sm">
              <span className="flex min-w-0 items-center gap-2">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: h.color }} />
                <span className="truncate font-medium text-ink-900">{h.symbol}</span>
              </span>
              <span className="shrink-0 tabular text-ink-500">{((h.value / grandTotal) * 100).toFixed(1)}%</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-border bg-surface p-5 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold text-ink-900">Cryptocurrency Holdings</h3>
          <span className="text-xs font-medium text-ink-400">{portfolioHoldings.length} assets</span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {portfolioHoldings.map((h) => {
            const marketCoin = coins.find((c) => c.symbol === h.symbol);
            const change = marketCoin?.change24h ?? 0;
            const positive = change >= 0;
            const pct = (h.value / holdingsTotal) * 100;

            return (
              <div key={h.symbol} className="rounded-xl border border-border bg-surface-alt p-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: h.color }}
                    >
                      {h.symbol.slice(0, 2)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink-900">{h.name}</p>
                      <p className="text-xs text-ink-400">{h.symbol}</p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex shrink-0 items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-bold tabular ${
                      positive ? "bg-buy-100 text-buy-700" : "bg-sell-100 text-sell-700"
                    }`}
                  >
                    {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {Math.abs(change).toFixed(2)}%
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-ink-400">Holdings</span>
                  <span className="tabular font-medium text-ink-700">
                    {formatNumber(h.amount)} {h.symbol}
                  </span>
                </div>

                <div className="mt-1.5 flex items-center justify-between text-xs">
                  <span className="text-ink-400">Value</span>
                  <span className="tabular font-semibold text-ink-900">{formatCurrency(h.value)}</span>
                </div>

                <div className="mt-2.5">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: h.color }} />
                  </div>
                  <p className="mt-1 text-right text-[10px] font-medium text-ink-400">{pct.toFixed(1)}% of holdings</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 overflow-x-auto border-t border-border pt-4">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr className="text-left text-[11px] font-semibold uppercase tracking-wide text-ink-400">
                <th className="px-3 py-2">Asset</th>
                <th className="px-3 py-2">Holdings</th>
                <th className="px-3 py-2">Value</th>
                <th className="px-3 py-2">Allocation</th>
                <th className="px-3 py-2">24h</th>
              </tr>
            </thead>
            <tbody>
              {portfolioHoldings.map((h) => {
                const marketCoin = coins.find((c) => c.symbol === h.symbol);
                const change = marketCoin?.change24h ?? 0;
                const positive = change >= 0;

                return (
                  <tr key={h.symbol} className="border-t border-border">
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold text-white"
                          style={{ backgroundColor: h.color }}
                        >
                          {h.symbol[0]}
                        </span>
                        <div>
                          <p className="font-medium text-ink-900">{h.name}</p>
                          <p className="text-xs text-ink-400">{h.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 tabular text-ink-700">
                      {formatNumber(h.amount)} {h.symbol}
                    </td>
                    <td className="px-3 py-3 font-medium tabular text-ink-900">{formatCurrency(h.value)}</td>
                    <td className="px-3 py-3 tabular text-ink-500">{((h.value / holdingsTotal) * 100).toFixed(1)}%</td>
                    <td className={`px-3 py-3 tabular font-semibold ${positive ? "text-buy-700" : "text-sell-700"}`}>
                      {positive ? "+" : ""}
                      {change.toFixed(2)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
