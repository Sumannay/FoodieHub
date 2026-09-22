import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Compass,
  MapPin,
  Plus,
  Search,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type Trip = {
  id: string;
  destinationId: string;
  name: string;
  location: string;
  duration: string;
  price: string;
  rating: string;
  image: string;
  description: string;
  category: string;
  status: "Popular" | "Recommended" | "Adventure";
  travelers: string;
};

const trips: Trip[] = [
  {
    id: "manali-escape",
    destinationId: "manali",
    name: "Manali Mountain Escape",
    location: "Himachal Pradesh, India",
    duration: "5 Days / 4 Nights",
    price: "₹18,499",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=85",
    description:
      "Snow-covered mountains, peaceful valleys, adventure activities and beautiful Himalayan views.",
    category: "Mountain",
    status: "Popular",
    travelers: "2–4 Travelers",
  },
  {
    id: "bali-getaway",
    destinationId: "bali",
    name: "Bali Island Getaway",
    location: "Bali, Indonesia",
    duration: "6 Days / 5 Nights",
    price: "₹38,999",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85",
    description:
      "Experience tropical beaches, temples, waterfalls, local food and unforgettable sunsets.",
    category: "Beach",
    status: "Recommended",
    travelers: "2–4 Travelers",
  },
  {
    id: "leh-ladakh",
    destinationId: "leh-ladakh",
    name: "Leh-Ladakh Adventure",
    location: "Ladakh, India",
    duration: "7 Days / 6 Nights",
    price: "₹24,999",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
    description:
      "Explore dramatic mountain passes, monasteries, lakes and incredible Himalayan landscapes.",
    category: "Adventure",
    status: "Adventure",
    travelers: "2–6 Travelers",
  },
  {
    id: "swiss-alps",
    destinationId: "swiss-alps",
    name: "Swiss Alps Escape",
    location: "Switzerland",
    duration: "7 Days / 6 Nights",
    price: "₹1,24,999",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=85",
    description:
      "Discover snow-covered peaks, beautiful villages, alpine lakes and unforgettable train journeys.",
    category: "Mountain",
    status: "Recommended",
    travelers: "2–4 Travelers",
  },
  {
    id: "jaipur-royal",
    destinationId: "jaipur",
    name: "Royal Jaipur Experience",
    location: "Rajasthan, India",
    duration: "4 Days / 3 Nights",
    price: "₹14,999",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=85",
    description:
      "Explore magnificent forts, royal palaces, colourful markets and authentic Rajasthani cuisine.",
    category: "Culture",
    status: "Popular",
    travelers: "2–5 Travelers",
  },
  {
    id: "santorini",
    destinationId: "santorini",
    name: "Santorini Sunset Escape",
    location: "Santorini, Greece",
    duration: "5 Days / 4 Nights",
    price: "₹89,999",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=85",
    description:
      "Relax beside the Aegean Sea, explore whitewashed villages and enjoy iconic Santorini sunsets.",
    category: "Beach",
    status: "Recommended",
    travelers: "2–4 Travelers",
  },
  {
    id: "kyoto",
    destinationId: "kyoto",
    name: "Kyoto Cultural Journey",
    location: "Kyoto, Japan",
    duration: "6 Days / 5 Nights",
    price: "₹79,999",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85",
    description:
      "Discover ancient temples, peaceful gardens, traditional streets and Japanese culture.",
    category: "Culture",
    status: "Popular",
    travelers: "2–4 Travelers",
  },
];

const categories = ["All", "Mountain", "Beach", "Adventure", "Culture"];

export default function Trips() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTrips = useMemo(() => {
    const query = search.trim().toLowerCase();

    return trips.filter((trip) => {
      const matchesCategory =
        activeCategory === "All" || trip.category === activeCategory;

      const matchesSearch =
        !query ||
        trip.name.toLowerCase().includes(query) ||
        trip.location.toLowerCase().includes(query) ||
        trip.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                <Sparkles size={16} />
                VOYARA Trips
              </div>

              <h1 className="mt-4 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
                Your next journey
                <span className="block text-slate-400">starts here.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-500">
                Explore inspiring journeys, discover new destinations and create
                a travel experience designed around you.
              </p>
            </div>

            <Link
              to="/trip-builder"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 font-semibold text-white transition hover:bg-slate-700"
            >
              <Plus size={19} />
              Create Custom Trip
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="mx-auto max-w-7xl px-6 pt-8 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                <Compass size={20} />
              </div>

              <div>
                <p className="text-2xl font-bold text-slate-900">50+</p>
                <p className="text-sm text-slate-500">Destinations</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                <CalendarDays size={20} />
              </div>

              <div>
                <p className="text-2xl font-bold text-slate-900">100+</p>
                <p className="text-sm text-slate-500">Curated itineraries</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                <Users size={20} />
              </div>

              <div>
                <p className="text-2xl font-bold text-slate-900">10K+</p>
                <p className="text-sm text-slate-500">Travelers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Trip Banner */}
      <section className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 px-7 py-10 text-white sm:px-10 lg:px-14 lg:py-12">
          <div className="relative z-10 max-w-2xl">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
              <Sparkles size={21} />
            </div>

            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Build a trip that is uniquely yours.
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              Choose your destination, places to visit, stay, dates and guests.
              Build your complete journey with the VOYARA trip planner.
            </p>

            <Link
              to="/trip-builder"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-200"
            >
              Start Building
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -bottom-32 right-20 h-72 w-72 rounded-full border border-white/10" />
        </div>
      </section>

      {/* Explore Trips */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Discover
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Find your perfect trip
            </h2>

            <p className="mt-3 text-slate-500">
              Explore journeys created for different travel styles.
            </p>
          </div>

          <Link
            to="/explore"
            className="inline-flex items-center gap-2 font-semibold text-slate-900 transition hover:text-slate-500"
          >
            Explore all destinations
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Search */}
        <div className="mt-8 flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search trips, destinations..."
              className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => {
            const active = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  active
                    ? "bg-slate-900 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Results */}
        {filteredTrips.length > 0 ? (
          <div className="mt-10 grid gap-7 lg:grid-cols-3">
            {filteredTrips.map((trip) => (
              <article
                key={trip.id}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={trip.image}
                    alt={trip.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                    <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-900 backdrop-blur">
                      {trip.category}
                    </span>

                    <span className="flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-900 backdrop-blur">
                      <Star size={13} className="fill-current" />
                      {trip.rating}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4">
                    <span className="flex items-center gap-1.5 rounded-full bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                      {trip.status === "Popular" && <CheckCircle2 size={13} />}

                      {trip.status === "Recommended" && <Sparkles size={13} />}

                      {trip.status === "Adventure" && <Compass size={13} />}

                      {trip.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900">
                    {trip.name}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                    <MapPin size={15} />
                    {trip.location}
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-500">
                    {trip.description}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-slate-50 p-3">
                      <div className="flex items-center gap-2 text-slate-500">
                        <CalendarDays size={15} />
                        <span className="text-xs">Duration</span>
                      </div>

                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {trip.duration}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Users size={15} />
                        <span className="text-xs">Travelers</span>
                      </div>

                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {trip.travelers}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-end justify-between border-t border-slate-100 pt-5">
                    <div>
                      <p className="text-xs text-slate-400">Starting from</p>

                      <p className="mt-1 text-xl font-bold text-slate-900">
                        {trip.price}
                      </p>
                    </div>

                    <Link
                      to={`/trip-builder?destination=${trip.destinationId}`}
                      className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                    >
                      Plan
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
              <Search size={23} className="text-slate-500" />
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              No trips found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Try another destination or choose a different travel category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-6 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* Travel Inspiration */}
      <section className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
              <Clock3 size={20} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              Flexible planning
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Select your dates, guests, places and stay according to your
              travel plans.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
              <MapPin size={20} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              Explore your way
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Combine multiple places and create an itinerary that matches your
              interests.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
              <Sparkles size={20} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              Made for you
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Build a personalized journey instead of following a fixed package.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white px-7 py-12 text-center sm:px-12">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
            <MapPin size={22} />
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">
            Can't find the perfect trip?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-slate-500">
            Create your own itinerary and choose every part of your journey.
          </p>

          <Link
            to="/trip-builder"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 font-semibold text-white transition hover:bg-slate-700"
          >
            Create My Trip
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
