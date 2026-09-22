import { Heart, Menu, Plane, Search, Sparkles, UserRound, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useVoyara } from "../context/VoyaraContext";

const navItems = [
  { label: "Explore", to: "/explore" },
  { label: "Destinations", to: "/destinations" },
  { label: "Stays", to: "/hotels" },
  { label: "Plan a trip", to: "/trips/create" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, favorites } = useVoyara();

  return (
    <header className="absolute inset-x-0 top-0 z-50 text-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link to="/" aria-label="VOYARA home" className="group flex items-center gap-2.5">
          <span className="grid size-10 place-items-center rounded-2xl bg-white text-slate-950 shadow-lg shadow-black/10 transition group-hover:-rotate-6">
            <Plane size={19} fill="currentColor" />
          </span>
          <span className="text-xl font-black tracking-[0.16em]">VOYARA</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-semibold transition ${isActive ? "text-white" : "text-white/70 hover:text-white"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <Link to="/ai-assistant" className="rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/20">
            <span className="flex items-center gap-1.5"><Sparkles size={15} /> Ask AI</span>
          </Link>
          <Link to="/search" aria-label="Search VOYARA" className="grid size-10 place-items-center rounded-full bg-white/10 backdrop-blur transition hover:bg-white/20">
            <Search size={18} />
          </Link>
          <Link to="/favorites" aria-label="Saved items" className="relative grid size-10 place-items-center rounded-full bg-white/10 backdrop-blur transition hover:bg-white/20">
            <Heart size={18} />
            {favorites.length > 0 && <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-rose-500 text-[9px] font-bold text-white">{favorites.length}</span>}
          </Link>
          <Link to={user ? "/profile" : "/login"} className="grid size-10 place-items-center rounded-full bg-white text-slate-950 transition hover:bg-slate-100" aria-label={user ? "Profile" : "Sign in"}>
            <UserRound size={18} />
          </Link>
        </div>

        <button type="button" onClick={() => setIsOpen((current) => !current)} aria-label="Toggle menu" className="grid size-10 place-items-center rounded-full bg-white/10 backdrop-blur sm:hidden">
          {isOpen ? <X size={21} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 bg-slate-950/95 px-5 py-5 backdrop-blur sm:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} onClick={() => setIsOpen(false)} className="rounded-xl px-4 py-3 font-semibold text-white/80 hover:bg-white/10 hover:text-white">
                {item.label}
              </NavLink>
            ))}
            <NavLink to="/ai-assistant" onClick={() => setIsOpen(false)} className="rounded-xl px-4 py-3 font-semibold text-white/80 hover:bg-white/10 hover:text-white">AI travel assistant</NavLink>
            <NavLink to={user ? "/profile" : "/login"} onClick={() => setIsOpen(false)} className="rounded-xl px-4 py-3 font-semibold text-white/80 hover:bg-white/10 hover:text-white">{user ? "Profile" : "Sign in"}</NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}
