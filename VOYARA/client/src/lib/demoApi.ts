import { destinations, places, restaurants, stays, type LocationFilter } from "../data/catalog";
import type { User } from "../types/domain";

const delay = (milliseconds = 240) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));

const matchesLocation = <T extends { country: string; state?: string; district?: string }>(item: T, filters: LocationFilter) =>
  (!filters.country || item.country === filters.country) &&
  (!filters.state || item.state === filters.state) &&
  (!filters.district || item.district === filters.district);

const matchesText = (value: object, query: string) => JSON.stringify(value).toLowerCase().includes(query);

export type TravelSearchResults = {
  destinations: typeof destinations;
  places: typeof places;
  stays: typeof stays;
  restaurants: typeof restaurants;
};

/**
 * Replace this local provider with the FastAPI client when the API is ready.
 * All pages use it as an application boundary, so catalogue and AI providers
 * can change without changing screens.
 */
export const demoApi = {
  async signIn(email: string): Promise<User> {
    await delay();
    const name = email.split("@")[0]?.replace(/[._-]/g, " ") || "Voyara traveller";
    return { id: crypto.randomUUID(), name: name.replace(/\b\w/g, (letter) => letter.toUpperCase()), email, role: "TRAVELER" };
  },

  async search(query = "", filters: LocationFilter = {}): Promise<TravelSearchResults> {
    await delay(150);
    const normalized = query.trim().toLowerCase();
    return {
      destinations: destinations.filter((item) => matchesLocation({ country: item.country, state: item.region }, filters) && (!normalized || matchesText(item, normalized))),
      places: places.filter((item) => matchesLocation(item, filters) && (!normalized || matchesText(item, normalized))),
      stays: stays.filter((item) => matchesLocation(item, filters) && (!normalized || matchesText(item, normalized))),
      restaurants: restaurants.filter((item) => matchesLocation(item, filters) && (!normalized || matchesText(item, normalized))),
    };
  },

  async askTravelAssistant(message: string, filters: LocationFilter = {}) {
    await delay(550);
    const result = await this.search(message, filters);
    const scopedPlaces = result.places.length ? result.places : places.filter((item) => matchesLocation(item, filters));
    const scopedStays = result.stays.length ? result.stays : stays.filter((item) => matchesLocation(item, filters));
    const scopedRestaurants = result.restaurants.length ? result.restaurants : restaurants.filter((item) => matchesLocation(item, filters));
    const place = scopedPlaces[0];
    const stay = scopedStays[0];
    const restaurant = scopedRestaurants[0];
    const location = [filters.district, filters.state, filters.country].filter(Boolean).join(", ");
    const opening = location ? `For ${location}, ` : "For your trip, ";
    const highlights = [
      place ? `${place.name} (${place.type.toLowerCase()})` : "a top local attraction",
      stay ? `${stay.name} for your stay` : "a well-rated stay",
      restaurant ? `${restaurant.name} for food` : "a local restaurant",
    ];
    return {
      answer: `${opening}I would start with ${highlights[0]}. I also found ${highlights[1]} and ${highlights[2]}. Tell me your dates, budget and travellers, and I’ll narrow this into a day-by-day plan.`,
      suggestions: [place?.name, stay?.name, restaurant?.name].filter((item): item is string => Boolean(item)),
    };
  },
};
