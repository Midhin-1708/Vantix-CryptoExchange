import { NavLink } from "react-router-dom";
import { ShieldCheck, ExternalLink } from "lucide-react";

const footerLinks = [
  { label: "Dashboard", to: "/" },
  { label: "Markets", to: "/markets" },
  { label: "Trade", to: "/trade" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Orders", to: "/orders" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#0A101C] text-white">
      <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500 font-display text-sm font-bold text-[#062723] shadow-lg shadow-teal-900/20 transition-all duration-200 hover:bg-teal-400">
              V
            </div>

            <div>
              <p className="font-display text-sm font-bold tracking-wide text-white">
                VANTIXTRADE
              </p>
              <p className="text-[11px] text-slate-500">Professional crypto trading</p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {footerLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className="relative text-xs font-medium text-slate-400 transition-all duration-200 hover:text-teal-400"
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="group flex w-fit cursor-default items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 transition-all duration-200 hover:border-emerald-500/30 hover:bg-emerald-500/10">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all duration-200 group-hover:scale-110" />
            <span className="text-xs font-semibold text-slate-400 transition-colors duration-200 group-hover:text-emerald-400">
              Systems operational
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-slate-500">© 2026 VantixTrade. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#"
              className="group inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 transition-all duration-200 hover:text-slate-200"
            >
              Privacy
              <ExternalLink className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="#"
              className="group inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 transition-all duration-200 hover:text-slate-200"
            >
              Terms
              <ExternalLink className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <span className="hidden h-3 w-px bg-white/10 sm:block" />

            <span className="group inline-flex cursor-default items-center gap-1.5 text-[11px] font-medium text-slate-500 transition-colors duration-200 hover:text-slate-300">
              <ShieldCheck className="h-3.5 w-3.5 text-teal-400 transition-all duration-200 group-hover:scale-110" />
              Secure trading environment
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}