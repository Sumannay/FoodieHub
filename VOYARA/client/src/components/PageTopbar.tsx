import { Heart, Menu, Plane, Search, Sparkles, UserRound, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useVoyara } from "../context/VoyaraContext";

const links = [
  ["Explore", "/explore"],
  ["Destinations", "/destinations"],
  ["Stays", "/hotels"],
  ["Trips", "/trips"],
] as const;

export default function PageTopbar() {
  const [open, setOpen] = useState(false);
  const { favorites, user } = useVoyara();
  return (
    <header className="z-40 border-b border-slate-200 bg-white/95 text-slate-900 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link to="/" className="flex items-center gap-2.5" aria-label="VOYARA home"><span className="grid size-9 place-items-center rounded-xl bg-[#183927] text-white"><Plane size={17} fill="currentColor" /></span><span className="text-lg font-black tracking-[.14em]">VOYARA</span></Link>
        <nav className="hidden items-center gap-6 lg:flex">{links.map(([label, to]) => <NavLink key={to} to={to} className={({ isActive }) => `text-sm font-bold transition ${isActive ? "text-[#245239]" : "text-slate-500 hover:text-slate-950"}`}>{label}</NavLink>)}</nav>
        <div className="hidden items-center gap-2 sm:flex"><Link to="/ai-assistant" className="flex items-center gap-1.5 rounded-full bg-[#eef4e9] px-3 py-2 text-xs font-bold text-[#245239] hover:bg-[#dfeeda]"><Sparkles size={15} /> Ask AI</Link><Link to="/search" aria-label="Search" className="grid size-9 place-items-center rounded-full hover:bg-slate-100"><Search size={18} /></Link><Link to="/favorites" aria-label="Saved items" className="relative grid size-9 place-items-center rounded-full hover:bg-slate-100"><Heart size={18} />{favorites.length > 0 && <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-rose-500 text-[9px] font-bold text-white">{favorites.length}</span>}</Link><Link to={user ? "/profile" : "/login"} aria-label={user ? "Profile" : "Sign in"} className="grid size-9 place-items-center rounded-full bg-[#183927] text-white"><UserRound size={17} /></Link></div>
        <button type="button" aria-label="Toggle menu" onClick={() => setOpen((value) => !value)} className="grid size-10 place-items-center sm:hidden">{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="border-t border-slate-100 px-5 py-3 sm:hidden">{links.map(([label, to]) => <NavLink key={to} to={to} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 font-bold text-slate-700 hover:bg-slate-100">{label}</NavLink>)}<NavLink to="/ai-assistant" onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 font-bold text-slate-700 hover:bg-slate-100">AI travel assistant</NavLink><NavLink to={user ? "/profile" : "/login"} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 font-bold text-slate-700 hover:bg-slate-100">{user ? "Profile" : "Sign in"}</NavLink></nav>}
    </header>
  );
}
