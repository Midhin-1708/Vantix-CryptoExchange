import { useOutletContext } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import Portfolio from "../components/Portfolio";

export default function PortfolioPage() {
  const { selectedCoin } = useOutletContext();

  return (
    <div className="w-full">
      <SectionHeading
        title="Portfolio"
        subtitle="Track balances, allocation, and crypto holdings."
        action={
          <p className="text-xs font-medium text-ink-400">
            Selected:{" "}
            <span className="font-semibold text-ink-500">
              {selectedCoin.symbol}/USDT
            </span>
          </p>
        }
      />

      <div className="px-0">
        <Portfolio />
      </div>
    </div>
  );
}