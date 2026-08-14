import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import { chartSeries } from "../data/mockData";
import { formatCurrency } from "../utils/format";

const PERIODS = ["1H", "1D", "1W", "1M"];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-border bg-surface-alt px-3 py-2 shadow-card-hover">
      <p className="text-xs text-ink-400">{label}</p>
      <p className="text-sm font-semibold tabular text-ink-900">{formatCurrency(payload[0].value)}</p>
    </div>
  );
}

export default function PriceChart({ coin }) {
  const [period, setPeriod] = useState("1D");

  const data = useMemo(() => chartSeries[period], [period]);

  const first = data[0].price;
  const last = data[data.length - 1].price;
  const diff = last - first;
  const diffPct = (diff / first) * 100;
  const positive = diff >= 0;

  return (
    <div className="flex h-full min-h-[520px] w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-4 shadow-card sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
              style={{ backgroundColor: coin.color }}
            >
              {coin.icon}
            </span>
            <h2 className="truncate font-display text-base font-semibold text-ink-900 sm:text-lg">
              {coin.symbol}/USDT
            </h2>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2.5">
            <span className="font-display text-2xl font-semibold tabular text-ink-900 sm:text-3xl">
              {formatCurrency(coin.price)}
            </span>

            <span
              className={`inline-flex items-center gap-0.5 rounded-md px-2 py-0.5 text-xs font-semibold tabular sm:text-sm ${
                positive ? "bg-buy-100 text-buy-700" : "bg-sell-100 text-sell-700"
              }`}
            >
              {positive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {Math.abs(diffPct).toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="flex shrink-0 gap-1 rounded-lg bg-surface-alt p-1">
          {PERIODS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors sm:px-3 ${
                period === p ? "bg-surface text-brand-500 shadow-card" : "text-ink-500 hover:text-ink-900"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%" minHeight={260}>
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={positive ? "var(--color-buy-600)" : "var(--color-sell-600)"}
                  stopOpacity={0.35}
                />
                <stop
                  offset="100%"
                  stopColor={positive ? "var(--color-buy-600)" : "var(--color-sell-600)"}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} stroke="var(--color-border)" />

            <XAxis
              dataKey="t"
              tick={{ fontSize: 11, fill: "var(--color-ink-400)" }}
              tickLine={false}
              axisLine={{ stroke: "var(--color-border)" }}
              minTickGap={24}
            />

            <YAxis
              domain={["dataMin - 400", "dataMax + 400"]}
              tick={{ fontSize: 11, fill: "var(--color-ink-400)" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
              width={44}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="price"
              stroke={positive ? "var(--color-buy-600)" : "var(--color-sell-600)"}
              strokeWidth={2.5}
              fill="url(#priceFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
