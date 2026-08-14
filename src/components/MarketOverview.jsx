import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, TrendingDown, ChevronLeft, ChevronRight } from "lucide-react";
import { formatCurrency, formatCompact } from "../utils/format";

function ChangeBadge({ value, size = "sm" }) {
  const positive = value >= 0;
  const sizing = size === "sm" ? "px-1.5 py-0.5 text-[10px] sm:text-xs" : "px-2.5 py-1 text-xs sm:text-sm";

  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-md font-bold tabular ${sizing} ${
        positive ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
      }`}
    >
      {positive ? <TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> : <TrendingDown className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
      {Math.abs(value).toFixed(2)}%
    </span>
  );
}

export function TickerStrip({ coins, onSelect, selectedId }) {
  const tickerRef = useRef(null);

  const scrollLeft = () => {
    tickerRef.current?.scrollBy({ left: -tickerRef.current.clientWidth, behavior: "smooth" });
  };

  const scrollRight = () => {
    tickerRef.current?.scrollBy({ left: tickerRef.current.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative w-full px-12 sm:px-14 lg:px-16">
      <button
        type="button"
        onClick={scrollLeft}
        className="absolute left-1 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-900 shadow-lg transition-all duration-200 hover:bg-slate-50 active:scale-95 sm:left-2 sm:h-10 sm:w-10"
        aria-label="Previous cryptocurrencies"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div
        ref={tickerRef}
        className="ticker-strip grid w-full grid-flow-col auto-cols-[calc((100%-12px)/2)] gap-3 overflow-x-auto py-1 sm:auto-cols-[calc((100%-24px)/3)] lg:auto-cols-[calc((100%-48px)/5)]"
      >
        {coins.map((coin) => {
          const positive = coin.change24h >= 0;
          const active = selectedId === coin.id;

          return (
            <button
              key={coin.id}
              type="button"
              onClick={() => onSelect(coin)}
              className={`flex min-w-0 items-center gap-2 rounded-2xl border px-2.5 py-3 text-left transition-all duration-200 sm:gap-3 sm:px-3.5 sm:py-3.5 ${
                active
                  ? "border-teal-500 bg-teal-50 shadow-[0_8px_24px_rgba(20,184,166,0.14)]"
                  : "border-slate-200 bg-white shadow-[0_4px_18px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:border-slate-300"
              }`}
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm sm:h-10 sm:w-10 lg:h-11 lg:w-11 lg:text-base"
                style={{ backgroundColor: coin.color }}
              >
                {coin.icon}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <p className="truncate text-[10px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">
                    {coin.symbol}
                  </p>
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${positive ? "bg-emerald-500" : "bg-rose-500"}`} />
                </div>

                {/*
                  Color is set inline (not via a Tailwind text-* class) on purpose.
                  A global/media-query CSS rule elsewhere was overriding the
                  text-emerald-700 / text-rose-700 classes once the desktop
                  breakpoint kicked in, making the price look washed out on
                  larger screens while mobile rendered fine. Inline style wins
                  over any external stylesheet rule regardless of viewport.
                */}
                <p
                  className="mt-0.5 truncate text-xs font-bold tabular sm:text-sm lg:text-base"
                  style={{ color: positive ? "#047857" : "#be123c" }}
                >
                  {formatCurrency(coin.price)}
                </p>

                <div className="mt-1">
                  <ChangeBadge value={coin.change24h} />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={scrollRight}
        className="absolute right-1 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-900 shadow-lg transition-all duration-200 hover:bg-slate-50 active:scale-95 sm:right-2 sm:h-10 sm:w-10"
        aria-label="Next cryptocurrencies"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

export default function MarketOverview({ coins, onSelect, selectedId }) {
  const navigate = useNavigate();

  const handleSelect = (coin) => {
    onSelect(coin);
    navigate("/trade");
  };

  if (coins.length === 0) {
    return (
      <div className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-14 text-center text-sm text-slate-400 shadow-sm">
        No cryptocurrencies match your search.
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {coins.map((coin) => {
        const positive = coin.change24h >= 0;
        const active = selectedId === coin.id;

        return (
          <button
            key={coin.id}
            type="button"
            onClick={() => handleSelect(coin)}
            className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-200 ${
              active
                ? "border-teal-500 bg-teal-50 shadow-[0_0_0_1px_rgba(45,212,191,0.35),0_12px_30px_rgba(20,184,166,0.14)]"
                : "border-slate-200 bg-white shadow-sm hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-display text-base font-bold text-slate-900">{coin.name}</p>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-slate-400">{coin.symbol}</p>
              </div>

              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                  positive ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                }`}
              >
                {positive ? <TrendingUp className="h-[18px] w-[18px]" /> : <TrendingDown className="h-[18px] w-[18px]" />}
              </span>
            </div>

            <p
              className="mt-4 font-display text-2xl font-bold tabular"
              style={{ color: positive ? "#059669" : "#e11d48" }}
            >
              {formatCurrency(coin.price)}
            </p>

            <div className="mt-2">
              <ChangeBadge value={coin.change24h} size="md" />
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3 text-xs">
              <span className="text-slate-400">Market Cap</span>
              <span className="tabular font-semibold text-slate-700">${formatCompact(coin.marketCap)}</span>
            </div>

            <div className="mt-1.5 flex items-center justify-between text-xs">
              <span className="text-slate-400">Volume</span>
              <span className="tabular font-semibold text-slate-700">${formatCompact(coin.volume24h)}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}