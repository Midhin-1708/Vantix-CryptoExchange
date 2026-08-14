import { useOutletContext } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { TickerStrip } from "../components/MarketOverview";
import PriceChart from "../components/PriceChart";
import TradingPanel from "../components/TradingPanel";
import OrderBook from "../components/OrderBook";

export default function Trade() {
  const {
    coins,
    selectedCoin,
    setSelectedCoin,
  } = useOutletContext();

  return (
    <div className="w-full">
      <SectionHeading
        title="Trade"
        subtitle="Place buy and sell orders across your favorite pairs."
      />

      <div className="mb-8 mt-4 h-px w-full bg-slate-200" />

      <div className="mb-8">
        <TickerStrip
          coins={coins}
          onSelect={setSelectedCoin}
          selectedId={selectedCoin.id}
        />
      </div>

      <div className="w-full">
        <div className="grid w-full grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-12 xl:gap-5">
          <div className="order-1 min-w-0 lg:col-span-1 xl:col-span-4">
            <TradingPanel coin={selectedCoin} />
          </div>

          <div className="order-2 min-w-0 lg:col-span-1 xl:col-span-5">
            <PriceChart coin={selectedCoin} />
          </div>

          <div className="order-3 min-w-0 lg:col-span-1 xl:col-span-3">
            <OrderBook coin={selectedCoin} />
          </div>
        </div>
      </div>
    </div>
  );
}