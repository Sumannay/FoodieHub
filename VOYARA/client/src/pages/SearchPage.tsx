import { ArrowRight, Building2, MapPin, Search, Sparkles, Store, UtensilsCrossed } from "lucide-react";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { formatINR, locationOptions, type LocationFilter } from "../data/catalog";
import { demoApi, type TravelSearchResults } from "../lib/demoApi";

const emptyResults: TravelSearchResults = { destinations: [], places: [], stays: [], restaurants: [] };

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [filters, setFilters] = useState<LocationFilter>({ country: params.get("country") ?? "", state: params.get("state") ?? "", district: params.get("district") ?? "" });
  const [results, setResults] = useState<TravelSearchResults>(emptyResults);
  const [loading, setLoading] = useState(true);
  const currentQuery = params.get("q") ?? "";
  const states = locationOptions.states(filters.country);
  const districts = locationOptions.districts(filters.country, filters.state);
  const total = results.destinations.length + results.places.length + results.stays.length + results.restaurants.length;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    demoApi.search(currentQuery, filters).then((next) => {
      if (!cancelled) {
        setResults(next);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [currentQuery, filters]);

  const updateFilters = (next: LocationFilter) => setFilters(next);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setParams(query.trim() ? { q: query.trim() } : {});
  };
  const reset = () => {
    setQuery("");
    setFilters({});
    setParams({});
  };

  return <main className="min-h-[70vh] bg-[#fbfaf7] px-5 py-12 sm:px-8 lg:px-10"><div className="mx-auto max-w-7xl">
    <p className="text-xs font-bold uppercase tracking-[.18em] text-[#4a8558]">Global discovery</p><h1 className="mt-3 text-4xl font-black tracking-[-.045em] sm:text-5xl">Find places, stays and food.</h1><p className="mt-3 max-w-2xl leading-7 text-slate-500">Search by destination, country, state, district, tourist place, hotel, resort or restaurant. Start broad, then narrow your travel plan.</p>
    <form onSubmit={submit} className="mt-8 flex max-w-4xl rounded-2xl border border-slate-200 bg-white p-2 shadow-sm"><div className="flex min-w-0 flex-1 items-center gap-3 px-3"><Search className="shrink-0 text-slate-400" size={20} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Chilika Lake, Puri, a resort or a restaurant" className="min-w-0 flex-1 bg-transparent py-2.5 text-sm font-semibold outline-none placeholder:font-normal" /></div><button className="rounded-xl bg-[#183927] px-5 py-3 text-sm font-bold text-white">Search</button></form>
    <section className="mt-5 rounded-2xl border border-[#dbe8d8] bg-[#eef4e9] p-4"><div className="flex flex-col gap-3 lg:flex-row"><FilterSelect label="Country" value={filters.country ?? ""} onChange={(country) => updateFilters({ country, state: "", district: "" })} options={locationOptions.countries} /><FilterSelect label="State / Province" value={filters.state ?? ""} onChange={(state) => updateFilters({ ...filters, state, district: "" })} options={states} disabled={!filters.country} /><FilterSelect label="District / City" value={filters.district ?? ""} onChange={(district) => updateFilters({ ...filters, district })} options={districts} disabled={!filters.state} /><button type="button" onClick={reset} className="self-end rounded-xl px-4 py-3 text-sm font-bold text-[#245239] hover:bg-white">Clear all</button></div><p className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#4a8558]"><MapPin size={14} /> Choose Country → State → District to see available local places, stays and restaurants.</p></section>
    {loading ? <div className="py-20 text-center text-slate-500">Searching the VOYARA catalogue…</div> : <><div className="mt-10 flex flex-col justify-between gap-2 sm:flex-row sm:items-center"><div><h2 className="text-2xl font-black">{currentQuery ? `Matches for “${currentQuery}”` : "All available places"}</h2><p className="mt-1 text-sm text-slate-500">{[filters.district, filters.state, filters.country].filter(Boolean).join(" · ") || "All countries in the demo catalogue"}</p></div><span className="text-sm font-bold text-[#245239]">{total} results</span></div>{total === 0 ? <EmptyState onReset={reset} /> : <div className="mt-8 space-y-12">
      <ResultSection icon={MapPin} title="Destination guides" count={results.destinations.length}>{results.destinations.map((destination) => <Link key={destination.id} to={`/destinations/${destination.id}`} className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md"><img src={destination.image} alt={destination.name} className="h-44 w-full object-cover" /><div className="p-4"><p className="text-xs font-bold uppercase tracking-wider text-[#4a8558]">{destination.category} · {destination.region}</p><div className="mt-1 flex items-start justify-between gap-3"><h3 className="text-lg font-black">{destination.name}</h3><span className="shrink-0 text-sm font-bold text-amber-700">★ {destination.rating}</span></div><p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-500">{destination.description}</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#245239]">Open full guide <ArrowRight size={15} /></span></div></Link>)}</ResultSection>
      <ResultSection icon={MapPin} title="Tourist places" count={results.places.length}>{results.places.map((place) => <Link key={place.id} to={`/places/${place.id}`} className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md"><img src={place.image} alt={place.name} className="h-44 w-full object-cover" /><div className="p-4"><p className="text-xs font-bold uppercase tracking-wider text-[#4a8558]">{place.type}</p><h3 className="mt-1 text-lg font-black">{place.name}</h3><p className="mt-1 flex items-center gap-1 text-sm text-slate-500"><MapPin size={14} /> {place.district}, {place.state}</p><p className="mt-3 line-clamp-2 text-sm leading-5 text-slate-500">{place.description}</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#245239]">Explore place <ArrowRight size={15} /></span></div></Link>)}</ResultSection>
      <ResultSection icon={Building2} title="Hotels, resorts and stays" count={results.stays.length}>{results.stays.map((stay) => <Link key={stay.id} to={`/hotels/${stay.id}`} className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md"><img src={stay.image} alt={stay.name} className="h-44 w-full object-cover" /><div className="p-4"><p className="text-xs font-bold uppercase tracking-wider text-[#4a8558]">{stay.type}</p><h3 className="mt-1 text-lg font-black">{stay.name}</h3><p className="mt-1 text-sm text-slate-500">{stay.destination} · {stay.district}</p><div className="mt-4 flex items-center justify-between"><span className="text-sm font-bold">{formatINR(stay.price)}<span className="font-normal text-slate-500"> / night</span></span><span className="text-sm font-bold text-amber-700">★ {stay.rating}</span></div></div></Link>)}</ResultSection>
      <ResultSection icon={UtensilsCrossed} title="Restaurants and local food" count={results.restaurants.length}>{results.restaurants.map((restaurant) => <article key={restaurant.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200"><img src={restaurant.image} alt={restaurant.name} className="h-44 w-full object-cover" /><div className="p-4"><p className="text-xs font-bold uppercase tracking-wider text-[#4a8558]">{restaurant.cuisine}</p><h3 className="mt-1 text-lg font-black">{restaurant.name}</h3><p className="mt-1 flex items-center gap-1 text-sm text-slate-500"><Store size={14} /> {restaurant.district}, {restaurant.state}</p><p className="mt-3 line-clamp-2 text-sm leading-5 text-slate-500">{restaurant.description}</p><div className="mt-4 flex justify-between text-sm"><span className="font-bold">{formatINR(restaurant.priceForTwo)} for two</span><span className="font-bold text-amber-700">★ {restaurant.rating}</span></div></div></article>)}</ResultSection>
    </div>}</>}</div></main>;
}

function FilterSelect({ label, value, options, disabled, onChange }: { label: string; value: string; options: string[]; disabled?: boolean; onChange: (value: string) => void }) {
  return <label className="min-w-0 flex-1"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">{label}</span><select disabled={disabled} value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-800 outline-none disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"><option value="">All {label}s</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}

function ResultSection({ icon: Icon, title, count, children }: { icon: typeof MapPin; title: string; count: number; children: ReactNode }) {
  if (!count) return null;
  return <section><div className="mb-4 flex items-center gap-2"><span className="grid size-8 place-items-center rounded-lg bg-[#eef4e9] text-[#387a43]"><Icon size={16} /></span><h2 className="text-xl font-black">{title}</h2><span className="text-sm text-slate-500">({count})</span></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{children}</div></section>;
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"><Sparkles className="mx-auto text-[#4a8558]" /><h3 className="mt-4 text-xl font-black">No close match yet</h3><p className="mt-2 text-slate-500">Try a broader country, state or district, or clear the filters to search the full catalogue.</p><button type="button" onClick={onReset} className="mt-6 rounded-full bg-[#183927] px-5 py-3 text-sm font-bold text-white">Clear search</button></div>;
}
