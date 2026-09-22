import {
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  Minus,
  Mountain,
  Plus,
  Sparkles,
  Utensils,
  Waves,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

type Interest = "Mountains" | "Beaches" | "Adventure" | "Culture" | "Food";

type ItineraryDay = {
  day: string;
  title: string;
  places: string[];
  activities: string[];
  food: string;
};

const interests: {
  name: Interest;
  icon: typeof Mountain;
}[] = [
  { name: "Mountains", icon: Mountain },
  { name: "Beaches", icon: Waves },
  { name: "Adventure", icon: Mountain },
  { name: "Culture", icon: Sparkles },
  { name: "Food", icon: Utensils },
];

const destinationPlans: Record<
  string,
  {
    title: string;
    description: string;
    days: ItineraryDay[];
  }
> = {
  Manali: {
    title: "Manali Mountain Escape",
    description:
      "A refreshing Himalayan trip combining mountain views, adventure, local culture and delicious Himachali food.",
    days: [
      {
        day: "Day 1",
        title: "Welcome to Manali",
        places: ["Mall Road", "Hidimba Temple", "Old Manali"],
        activities: ["Local sightseeing", "Cafe hopping", "Evening walk"],
        food: "Try traditional Himachali thali.",
      },
      {
        day: "Day 2",
        title: "Solang Valley Adventure",
        places: ["Solang Valley", "Atal Tunnel"],
        activities: ["Paragliding", "Mountain sightseeing", "Photography"],
        food: "Enjoy local momos and mountain cafes.",
      },
      {
        day: "Day 3",
        title: "Rohtang Mountain Day",
        places: ["Rohtang Pass", "Snow Point"],
        activities: ["Snow activities", "Scenic drive", "Photography"],
        food: "Warm up with local tea and snacks.",
      },
    ],
  },

  Puri: {
    title: "Puri Spiritual & Coastal Escape",
    description:
      "A calm Odisha plan combining Jagannath culture, a beach sunrise, local crafts and Odia food at a comfortable pace.",
    days: [
      {
        day: "Day 1",
        title: "Puri temple and beach",
        places: ["Jagannath Temple outer precinct", "Puri Beach"],
        activities: ["Respectful heritage walk", "Sunrise beach walk", "Evening market"],
        food: "Try an Odia thali, dalma and chhena poda.",
      },
      {
        day: "Day 2",
        title: "Crafts and coast",
        places: ["Raghurajpur Heritage Village", "Chandrabhaga Beach"],
        activities: ["Pattachitra craft visit", "Coastal drive", "Sunset photography"],
        food: "Look for pakhala bhata or fresh coastal dishes.",
      },
      {
        day: "Day 3",
        title: "Konark day trip",
        places: ["Konark Sun Temple", "ASI interpretation centre"],
        activities: ["Heritage tour", "Architecture photography", "Leisurely return"],
        food: "Try poda pitha and an Odia meal near Konark.",
      },
    ],
  },

  Konark: {
    title: "Konark Heritage Day Plan",
    description:
      "An unhurried heritage-focused stay around the Sun Temple, Chandrabhaga and the wider Odisha Golden Triangle.",
    days: [
      {
        day: "Day 1",
        title: "Sun Temple discovery",
        places: ["Konark Sun Temple", "ASI museum / interpretation centre"],
        activities: ["Guided heritage walk", "Temple-carving study", "Photography"],
        food: "Have a simple Odia thali and chhena gaja.",
      },
      {
        day: "Day 2",
        title: "Chandrabhaga coast",
        places: ["Chandrabhaga Beach", "Konark market"],
        activities: ["Sunrise visit", "Coastal walk", "Local shopping"],
        food: "Try dalma, macha ghanta and seasonal sweets.",
      },
      {
        day: "Day 3",
        title: "Puri extension",
        places: ["Puri Beach", "Raghurajpur Heritage Village"],
        activities: ["Beach morning", "Craft visit", "Return transfer"],
        food: "Sample local snacks and an Odia vegetarian meal.",
      },
    ],
  },

  Bhubaneswar: {
    title: "Bhubaneswar Temple City Circuit",
    description:
      "A well-paced plan for Kalinga architecture, ancient caves, wildlife and the food of Odisha's capital.",
    days: [
      {
        day: "Day 1",
        title: "Temple City heritage",
        places: ["Lingaraj Temple public viewpoint", "Mukteshwar area"],
        activities: ["Architecture walk", "Local guide tour", "Evening food trail"],
        food: "Try dahi bara aloo dum and dalma.",
      },
      {
        day: "Day 2",
        title: "Caves and wildlife",
        places: ["Udayagiri & Khandagiri Caves", "Nandankanan Zoological Park"],
        activities: ["Early cave visit", "Wildlife park", "Kanjia Lake views"],
        food: "Try pakhala and bara–ghuguni.",
      },
      {
        day: "Day 3",
        title: "Odisha Golden Triangle",
        places: ["Konark Sun Temple", "Puri Beach"],
        activities: ["Day-trip transfer", "Heritage visit", "Coastal sunset"],
        food: "Finish with chhena poda and local coastal cuisine.",
      },
    ],
  },

  Bali: {
    title: "Bali Island Escape",
    description:
      "A tropical journey through beaches, temples, culture, adventure and beautiful island landscapes.",
    days: [
      {
        day: "Day 1",
        title: "Explore Ubud",
        places: ["Ubud", "Tegallalang Rice Terrace"],
        activities: ["Temple visit", "Rice terrace walk", "Local market"],
        food: "Try Nasi Goreng and Balinese cuisine.",
      },
      {
        day: "Day 2",
        title: "Beach & Sunset",
        places: ["Seminyak Beach", "Seminyak"],
        activities: ["Beach relaxation", "Shopping", "Sunset"],
        food: "Enjoy a beachside dinner.",
      },
      {
        day: "Day 3",
        title: "Island Adventure",
        places: ["Nusa Penida", "Kelingking Beach"],
        activities: ["Island tour", "Snorkeling", "Photography"],
        food: "Try fresh tropical fruits and seafood.",
      },
    ],
  },

  Jaipur: {
    title: "Royal Jaipur Journey",
    description:
      "Discover Rajasthan's royal heritage, magnificent forts, colorful markets and famous local cuisine.",
    days: [
      {
        day: "Day 1",
        title: "Royal Jaipur",
        places: ["Amber Fort", "City Palace", "Hawa Mahal"],
        activities: ["Heritage sightseeing", "Photography", "City walk"],
        food: "Try Dal Baati Churma.",
      },
      {
        day: "Day 2",
        title: "Culture & Markets",
        places: ["Jantar Mantar", "Johari Bazaar"],
        activities: ["Shopping", "Architecture tour", "Local culture"],
        food: "Taste Jaipur's famous kachori.",
      },
      {
        day: "Day 3",
        title: "Sunset Jaipur",
        places: ["Nahargarh Fort", "Jal Mahal"],
        activities: ["Sunset view", "Photography", "Relaxation"],
        food: "Enjoy a traditional Rajasthani dinner.",
      },
    ],
  },

  Kyoto: {
    title: "Kyoto Cultural Escape",
    description:
      "Experience Japanese temples, traditional neighborhoods, peaceful gardens and authentic cuisine.",
    days: [
      {
        day: "Day 1",
        title: "Traditional Kyoto",
        places: ["Fushimi Inari Shrine", "Gion"],
        activities: ["Temple visit", "Walking tour", "Culture"],
        food: "Try authentic Japanese ramen.",
      },
      {
        day: "Day 2",
        title: "Bamboo Forest",
        places: ["Arashiyama Bamboo Grove", "Tenryu-ji"],
        activities: ["Forest walk", "Temple exploration", "Photography"],
        food: "Enjoy traditional Kyoto cuisine.",
      },
      {
        day: "Day 3",
        title: "Golden Kyoto",
        places: ["Kinkaku-ji", "Nishiki Market"],
        activities: ["Sightseeing", "Shopping", "Food exploration"],
        food: "Explore Nishiki Market's local specialties.",
      },
    ],
  },
};

export default function AITravelAssistant() {
  const [destination, setDestination] = useState("Manali");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState(25000);
  const [travellers, setTravellers] = useState(2);
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>([
    "Mountains",
    "Adventure",
  ]);
  const [generated, setGenerated] = useState(false);

  const plan = destinationPlans[destination] ?? destinationPlans.Manali;

  const toggleInterest = (interest: Interest) => {
    setSelectedInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest],
    );
  };

  const generateTrip = () => {
    setGenerated(true);

    setTimeout(() => {
      document
        .getElementById("ai-itinerary")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link to="/" className="text-2xl font-black tracking-tight">
            VOYARA
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              to="/explore"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Explore
            </Link>

            <Link
              to="/destinations"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Destinations
            </Link>

            <Link
              to="/hotels"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Hotels
            </Link>

            <Link
              to="/trips"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Trips
            </Link>
          </div>

          <Link
            to="/profile"
            className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold transition hover:bg-slate-100"
          >
            Profile
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white">
              <Sparkles size={16} />
              AI-powered trip planning
            </div>

            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl">
              Your journey,
              <br />
              planned by AI.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Tell VOYARA where you want to go, your budget and what you love.
              We'll create a personalized travel itinerary for you.
            </p>
          </div>
        </div>
      </section>

      {/* Planner */}
      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                Trip Planner
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Tell us about your trip
              </h2>

              <p className="mt-2 text-slate-500">
                We'll use your preferences to create a personalized plan.
              </p>
            </div>

            {/* Destination */}
            <div>
              <label className="mb-3 block text-sm font-semibold">
                Where do you want to go?
              </label>

              <div className="relative">
                <MapPin
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={destination}
                  onChange={(event) => {
                    setDestination(event.target.value);
                    setGenerated(false);
                  }}
                  className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-12 py-4 font-medium outline-none transition focus:border-slate-500"
                >
                  {Object.keys(destinationPlans).map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dates */}
            <div className="mt-7">
              <label className="mb-3 block text-sm font-semibold">
                Travel dates
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="relative">
                  <CalendarDays
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="date"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 px-12 py-4 outline-none focus:border-slate-500"
                  />
                </div>

                <div className="relative">
                  <CalendarDays
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="date"
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 px-12 py-4 outline-none focus:border-slate-500"
                  />
                </div>
              </div>
            </div>

            {/* Budget */}
            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-semibold">Your budget</label>

                <span className="text-lg font-bold">
                  ₹{budget.toLocaleString("en-IN")}
                </span>
              </div>

              <input
                type="range"
                min="5000"
                max="150000"
                step="5000"
                value={budget}
                onChange={(event) => setBudget(Number(event.target.value))}
                className="w-full"
              />

              <div className="mt-2 flex justify-between text-xs text-slate-400">
                <span>₹5,000</span>
                <span>₹1,50,000+</span>
              </div>
            </div>

            {/* Travellers */}
            <div className="mt-7">
              <label className="mb-3 block text-sm font-semibold">
                Number of travellers
              </label>

              <div className="flex w-fit items-center gap-5 rounded-2xl border border-slate-200 px-5 py-3">
                <button
                  type="button"
                  onClick={() => setTravellers(Math.max(1, travellers - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 hover:bg-slate-100"
                >
                  <Minus size={16} />
                </button>

                <span className="min-w-20 text-center font-semibold">
                  {travellers} {travellers === 1 ? "traveller" : "travellers"}
                </span>

                <button
                  type="button"
                  onClick={() => setTravellers(travellers + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 hover:bg-slate-100"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Interests */}
            <div className="mt-7">
              <label className="mb-3 block text-sm font-semibold">
                What are you interested in?
              </label>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {interests.map(({ name, icon: Icon }) => {
                  const selected = selectedInterests.includes(name);

                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => toggleInterest(name)}
                      className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
                        selected
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 bg-white hover:border-slate-400"
                      }`}
                    >
                      <Icon size={19} />
                      <span className="font-medium">{name}</span>

                      {selected && <Check size={17} className="ml-auto" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Generate */}
            <button
              type="button"
              onClick={generateTrip}
              className="mt-9 flex w-full items-center justify-center gap-3 rounded-full bg-slate-950 px-7 py-4 font-semibold text-white transition hover:bg-slate-800"
            >
              <Sparkles size={19} />
              Generate My Trip
              <ArrowRight size={18} />
            </button>
          </section>

          {/* Summary */}
          <aside className="h-fit rounded-3xl bg-slate-950 p-7 text-white lg:sticky lg:top-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Your preferences
            </p>

            <h3 className="mt-3 text-2xl font-bold">{destination}</h3>

            <div className="mt-7 space-y-5">
              <div>
                <p className="text-sm text-slate-400">Budget</p>
                <p className="mt-1 font-semibold">
                  ₹{budget.toLocaleString("en-IN")}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-400">Travellers</p>
                <p className="mt-1 font-semibold">
                  {travellers} {travellers === 1 ? "traveller" : "travellers"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-400">Interests</p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedInterests.length > 0 ? (
                    selectedInterests.map((interest) => (
                      <span
                        key={interest}
                        className="rounded-full bg-white/10 px-3 py-1 text-sm"
                      >
                        {interest}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-500">
                      No interests selected
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-sm leading-6 text-slate-400">
                VOYARA will create a personalized itinerary based on your
                destination, budget, dates and interests.
              </p>
            </div>
          </aside>
        </div>

        {/* AI Itinerary */}
        {generated && (
          <section
            id="ai-itinerary"
            className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="flex flex-col justify-between gap-5 border-b border-slate-200 pb-7 md:flex-row md:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold">
                  <Sparkles size={16} />
                  AI-generated itinerary
                </div>

                <h2 className="mt-4 text-3xl font-bold">{plan.title}</h2>

                <p className="mt-2 max-w-3xl leading-7 text-slate-500">
                  {plan.description}
                </p>
              </div>

              <div className="shrink-0 rounded-2xl bg-slate-950 px-6 py-4 text-white">
                <p className="text-xs uppercase tracking-wider text-slate-400">
                  Estimated budget
                </p>

                <p className="mt-1 text-2xl font-bold">
                  ₹{budget.toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              {plan.days.map((day) => (
                <article
                  key={day.day}
                  className="rounded-3xl border border-slate-200 p-6"
                >
                  <div className="flex flex-col gap-5 md:flex-row">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white">
                      {day.day.replace("Day ", "D")}
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-400">
                        {day.day}
                      </p>

                      <h3 className="mt-1 text-2xl font-bold">{day.title}</h3>

                      <div className="mt-6 grid gap-5 md:grid-cols-3">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Places
                          </p>

                          <ul className="mt-3 space-y-2">
                            {day.places.map((place) => (
                              <li
                                key={place}
                                className="flex items-center gap-2 text-sm font-medium"
                              >
                                <MapPin size={15} />
                                {place}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Activities
                          </p>

                          <ul className="mt-3 space-y-2">
                            {day.activities.map((activity) => (
                              <li
                                key={activity}
                                className="flex items-center gap-2 text-sm font-medium"
                              >
                                <Check size={15} />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Food
                          </p>

                          <p className="mt-3 text-sm leading-6 text-slate-600">
                            {day.food}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to={`/trip-builder?destination=${destination.toLowerCase()}`}
                className="flex items-center justify-center gap-2 rounded-full bg-slate-950 px-7 py-3 font-semibold text-white transition hover:bg-slate-800"
              >
                Customize This Trip
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/hotels"
                className="flex items-center justify-center rounded-full border border-slate-300 px-7 py-3 font-semibold transition hover:bg-slate-100"
              >
                Explore Stays
              </Link>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
