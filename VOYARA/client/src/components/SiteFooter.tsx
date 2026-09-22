import { Compass } from "lucide-react";
import { Link } from "react-router-dom";

export default function SiteFooter() {
  return <footer className="border-t border-slate-200 bg-white px-5 py-10 sm:px-8 lg:px-10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 sm:flex-row sm:items-end"><div><Link to="/" className="flex items-center gap-2 text-lg font-black tracking-[.14em]"><span className="grid size-8 place-items-center rounded-lg bg-[#183927] text-white"><Compass size={16} /></span>VOYARA</Link><p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">Make room for the journeys you will remember.</p></div><div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-slate-500"><Link to="/explore" className="hover:text-slate-950">Explore</Link><Link to="/ai-assistant" className="hover:text-slate-950">AI Assistant</Link><Link to="/favorites" className="hover:text-slate-950">Saved</Link><Link to="/settings" className="hover:text-slate-950">Settings</Link></div></div></footer>;
}
