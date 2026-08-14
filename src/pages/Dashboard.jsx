import { Link, useOutletContext } from "react-router-dom";
import {
  Wallet,
  Banknote,
  LineChart,
  LayoutGrid,
} from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { TickerStrip } from "../components/MarketOverview";
import {
  portfolioSummary,
  recentTransactions,
} from "../data/mockData";
import { formatCurrency } from "../utils/format";

function StatCard({ icon: Icon, label, value, sub, subPositive }) {
  return (
    <div className="rounded-lg border border-border bg-surface-alt px-4 py-3.5 transition-all duration-200 hover:border-brand-200 hover:shadow-sm">
      <div className="flex items-center gap-2 text-brand-500">
        <Icon className="h-4 w-4 shrink-0" />

        <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">
          {label}
        </span>
      </div>

      <p className="mt-1.5 font-display text-xl font-bold tabular text-ink-900">
        {value}
      </p>

      {sub && (
        <p
          className={`mt-0.5 text-[11px] font-semibold ${
            subPositive ? "text-buy-700" : "text-ink-500"
          }`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

export default function Dashboard() {
  const {
    coins: allCoins,
    selectedCoin,
    setSelectedCoin,
  } = useOutletContext();

  const recentActivity = recentTransactions.slice(0, 4);

  return (
    <div className="w-full">
      <SectionHeading
        title="Dashboard"
        subtitle="Track your portfolio, market movers, and recent activity."
        action={
          <p className="hidden text-[11px] font-medium text-ink-400 sm:block">
            Selected Pair:{" "}
            <span className="font-semibold text-brand-500">
              {selectedCoin.symbol}/USDT
            </span>
          </p>
        }
      />

      <div className="py-4">
        <div className="border-y border-border bg-page p-4">
          <h3 className="mb-3 font-display text-sm font-semibold text-ink-900">
            Portfolio Overview
          </h3>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={Wallet}
              label="Total Portfolio"
              value={formatCurrency(portfolioSummary.totalBalance)}
              sub={`+${portfolioSummary.profitLossPercent}%`}
              subPositive
            />

            <StatCard
              icon={Banknote}
              label="Available Balance"
              value={formatCurrency(portfolioSummary.availableBalance)}
              sub="Ready to trade"
            />

            <StatCard
              icon={LineChart}
              label="Selected Pair"
              value={`${selectedCoin.symbol}/USDT`}
              sub={formatCurrency(selectedCoin.price)}
            />

            <div className="rounded-lg border border-border bg-surface-alt px-4 py-3.5 transition-all duration-200 hover:border-brand-200 hover:shadow-sm">
              <div className="flex items-center gap-2 text-brand-500">
                <LayoutGrid className="h-4 w-4 shrink-0" />

                <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">
                  Markets
                </span>
              </div>

              <p className="mt-1.5 font-display text-xl font-bold tabular text-ink-900">
                {allCoins.length}
              </p>

              <Link
                to="/markets"
                className="mt-0.5 inline-block text-[11px] font-semibold text-brand-500 transition-colors hover:text-brand-600"
              >
                View Markets →
              </Link>
            </div>
          </div>
        </div>

        <section className="mt-5">
          <TickerStrip
            coins={allCoins}
            onSelect={setSelectedCoin}
            selectedId={selectedCoin.id}
          />
        </section>

        <div className="mt-5">
          <div className="border border-border bg-page">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h3 className="font-display text-sm font-semibold text-ink-900">
                Recent Transactions
              </h3>

              <Link
                to="/orders"
                className="text-[11px] font-semibold text-brand-500 transition-colors hover:text-brand-600"
              >
                View Orders
              </Link>
            </div>

            <ul className="divide-y divide-border">
              {recentActivity.map((tx) => (
                <li
                  key={tx.id}
                  className="flex items-center justify-between gap-3 px-4 py-2.5 transition-colors hover:bg-surface-alt"
                >
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-ink-900">
                      {tx.type} {tx.coin}
                    </p>

                    <p className="text-[10px] text-ink-400">
                      {tx.time}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                      tx.type === "Buy"
                        ? "bg-buy-100 text-buy-700"
                        : "bg-sell-100 text-sell-700"
                    }`}
                  >
                    {formatCurrency(tx.price)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}