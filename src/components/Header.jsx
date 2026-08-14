import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  Wallet,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", to: "/" },
  { label: "Markets", to: "/markets" },
  { label: "Trade", to: "/trade" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Orders", to: "/orders" },
];

const NOTIFICATIONS = [
  { title: "BTC order filled", time: "2m ago" },
  { title: "SOL up 5.6% in the last hour", time: "18m ago" },
  { title: "Withdrawal confirmed", time: "1h ago" },
];

export default function Header({ search, onSearchChange }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (value) => {
    onSearchChange(value);

    if (value.trim()) {
      navigate("/markets");
    }
  };

  const navLinkClass = ({ isActive }) =>
    `relative rounded-lg px-4 py-2.5 text-[15px] font-medium transition-all duration-200 after:absolute after:-bottom-[9px] after:left-1/2 after:h-[2px] after:-translate-x-1/2 after:rounded-full after:bg-teal-400 after:transition-all after:duration-200 ${
      isActive
        ? "bg-teal-500/15 text-teal-300 after:w-6"
        : "text-slate-400 after:w-0 hover:bg-white/5 hover:text-white"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `flex w-full items-center rounded-xl px-3.5 py-3 text-left text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-teal-500/15 text-teal-300"
        : "text-slate-400 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0A101C]/95 backdrop-blur-md">
      <div className="flex h-[68px] w-full items-center sm:h-[72px]">
        <NavLink
          to="/"
          className="flex shrink-0 items-center gap-2.5 transition-opacity duration-200 hover:opacity-90"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 shadow-lg shadow-teal-900/30 transition-transform duration-200 hover:scale-[1.03]">
            <Wallet
              className="h-5 w-5 text-[#062723]"
              strokeWidth={2.4}
            />
          </span>

          <span className="leading-tight">
            <span className="block font-display text-[18px] font-bold tracking-tight text-white sm:text-[19px]">
              Vantix<span className="text-teal-400">Trade</span>
            </span>

            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:block">
              Exchange
            </span>
          </span>
        </NavLink>

        <nav className="ml-6 hidden items-center gap-1 lg:flex xl:ml-10">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === "/"}
              className={navLinkClass}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="group ml-auto hidden w-full max-w-[380px] items-center gap-3 rounded-xl border border-slate-600/70 bg-slate-900/90 px-4 py-2.5 shadow-sm transition-all duration-200 hover:border-slate-500 focus-within:border-teal-400 focus-within:bg-slate-900 focus-within:shadow-[0_0_0_3px_rgba(45,212,191,0.10)] lg:flex xl:max-w-[420px]">
          <Search className="h-[19px] w-[19px] shrink-0 text-white transition-colors duration-200 group-focus-within:text-teal-400" />

          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search cryptocurrency..."
            className="min-w-0 flex-1 appearance-none bg-transparent text-[15px] font-medium !text-white caret-teal-400 outline-none placeholder:!text-slate-400 focus:!text-white"
          />
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2 lg:ml-5 xl:ml-7">
          <div className="relative">
            <button
              onClick={() => setNotifOpen((v) => !v)}
              aria-label="Notifications"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-white transition-all duration-200 hover:bg-white/5 active:scale-95"
            >
              <Bell className="h-[20px] w-[20px] text-white" />

              <span className="absolute right-[8px] top-[7px] h-2 w-2 rounded-full bg-rose-500 ring-2 ring-[#0A101C]" />
            </button>

            {notifOpen && (
              <div className="absolute right-0 top-[calc(100%+10px)] w-[280px] animate-fade-up overflow-hidden rounded-xl border border-white/10 bg-[#0F1626] p-2 shadow-2xl sm:w-72">
                <div className="border-b border-white/10 px-2 pb-2 pt-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Notifications
                  </p>
                </div>

                <div className="pt-1">
                  {NOTIFICATIONS.map((n) => (
                    <div
                      key={n.title}
                      className="cursor-pointer rounded-lg px-2.5 py-2.5 transition-colors duration-150 hover:bg-white/5"
                    >
                      <p className="text-sm font-medium text-white">
                        {n.title}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        {n.time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button className="flex items-center gap-2 rounded-xl py-1.5 pl-1.5 pr-2 transition-all duration-200 hover:bg-white/5 active:scale-[0.98] sm:gap-2.5 sm:pr-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-700 text-xs font-semibold text-[#062723] shadow-sm">
              JD
            </span>

            <span className="hidden text-left leading-tight sm:block">
              <span className="block text-sm font-medium text-white">
                Jordan
              </span>

              <span className="block text-[11px] text-slate-500">
                Pro Trader
              </span>
            </span>

            <ChevronDown className="hidden h-4 w-4 text-slate-500 transition-transform duration-200 sm:block" />
          </button>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-white transition-all duration-200 hover:bg-white/5 active:scale-95 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-5 w-5 text-white" />
            ) : (
              <Menu className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="animate-fade-up border-t border-white/10 bg-[#0A101C] pb-5 pt-4 lg:hidden">
          <div className="group flex items-center gap-3 rounded-xl border border-slate-600/70 bg-slate-900/90 px-4 py-3 shadow-sm transition-all duration-200 hover:border-slate-500 focus-within:border-teal-400 focus-within:bg-slate-900 focus-within:shadow-[0_0_0_3px_rgba(45,212,191,0.10)]">
            <Search className="h-[19px] w-[19px] shrink-0 text-white transition-colors duration-200 group-focus-within:text-teal-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search cryptocurrency..."
              className="min-w-0 flex-1 appearance-none bg-transparent text-[15px] font-medium !text-white caret-teal-400 outline-none placeholder:!text-slate-400 focus:!text-white"
            />
          </div>

          <nav className="mt-4 flex flex-col gap-1 border-t border-white/10 pt-3">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setMobileOpen(false)}
                className={mobileNavLinkClass}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}