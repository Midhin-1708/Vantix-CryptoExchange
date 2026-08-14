import { useState, useMemo } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { coins } from "../data/mockData";

export default function Layout() {
  const [search, setSearch] = useState("");
  const [selectedCoin, setSelectedCoin] = useState(coins[0]);

  const filteredCoins = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return coins;
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(q) ||
        coin.symbol.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-base">
      <Header search={search} onSearchChange={setSearch} />

      <main className="w-full pb-10">
        <Outlet
          context={{
            coins,
            filteredCoins,
            search,
            selectedCoin,
            setSelectedCoin,
          }}
        />
      </main>

      <Footer />
    </div>
  );
}
