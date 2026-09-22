import { ArrowRight, MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { categories, destinations } from "../data/catalog";

export default function Explore() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(params.get("category") || "All");
  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    return destinations.filter((item) => (category === "All" || item.category === category) && (!term || [item.name, item.region, item.category, item.description].join(" ").toLowerCase().includes(term)));
  }, [category, query]);

  return <main className="min-h-screen bg-white"><section className="bg-[#eef4e9] px-5 py-14 sm:px-8 lg:px-10"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#4a8558]">Explore India</p><h1 className="mt-3 text-4xl font-black tracking-[-.05em] sm:text-6xl">Your next good story<br />starts here.</h1><p className="mt-5 max-w-2xl leading-7 text-slate-600">Search the destination catalogue by city, state, travel style or food.</p><label className="mt-7 flex max-w-xl items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-[#dbe8d8]"><Search size={19} className="text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search destinations…" className="min-w-0 flex-1 bg-transparent outline-none" /></label></div></section><section className="mx-auto max-w-7xl px-5 py-9 sm:px-8 lg:px-10"><div className="flex gap-2 overflow-x-auto pb-2">{["All", ...categories].map((item) => <button key={item} onClick={() => setCategory(item)} className={"shrink-0 rounded-full px-4 py-2.5 text-sm font-bold " + (category === item ? "bg-[#183927] text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50")}>{item}</button>)}</div><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{results.map((item) => <Link key={item.id} to={"/destinations/" + item.id} className="group overflow-hidden rounded-3xl border border-slate-100 bg-white transition hover:shadow-xl"><img src={item.image} alt={item.name} className="h-56 w-full object-cover transition duration-500 group-hover:scale-105" /><div className="p-5"><p className="text-xs font-bold uppercase tracking-wider text-[#4a8558]">{item.category}</p><h2 className="mt-1 text-2xl font-black">{item.name}</h2><p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500"><MapPin size={15} /> {item.region}</p><p className="mt-4 text-sm leading-6 text-slate-500">{item.description}</p><span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#245239]">Explore guide <ArrowRight size={16} /></span></div></Link>)}</div>{results.length === 0 && <p className="mt-12 text-center text-slate-500">No destinations match this search.</p>}</section></main>;
}
