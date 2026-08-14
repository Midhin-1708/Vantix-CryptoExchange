import { useOutletContext } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import MarketOverview from "../components/MarketOverview";

export default function Markets() {
  const {
    filteredCoins,
    coins,
    selectedCoin,
    setSelectedCoin,
  } = useOutletContext();

  return (
    <div className="w-full">
      <SectionHeading
        title="Markets"
        subtitle="Browse cryptocurrencies, prices, and 24h performance."
        action={
          <p className="hidden text-xs font-medium text-ink-400 sm:block">
            Showing {filteredCoins.length} of {coins.length} assets
          </p>
        }
      />

      <div className="px-0">
        <div className="border border-border bg-page p-5 shadow-none sm:p-6">
          <h3 className="mb-5 font-display text-base font-semibold text-ink-900">
            Market Overview
          </h3>

          <MarketOverview
            coins={filteredCoins}
            onSelect={setSelectedCoin}
            selectedId={selectedCoin.id}
          />
        </div>
      </div>
    </div>
  );
}