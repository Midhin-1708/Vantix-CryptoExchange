import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Markets from "./pages/Markets";
import Trade from "./pages/Trade";
import PortfolioPage from "./pages/PortfolioPage";
import Orders from "./pages/Orders";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/orders" element={<Orders />} />
      </Route>
    </Routes>
  );
}
