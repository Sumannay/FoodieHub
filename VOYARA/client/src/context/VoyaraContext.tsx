import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { demoApi } from "../lib/demoApi";
import type { Booking, Favorite, TripDraft, User } from "../types/domain";

type VoyaraContextValue = {
  user: User | null;
  favorites: Favorite[];
  bookings: Booking[];
  tripDraft: TripDraft | null;
  signIn: (email: string) => Promise<void>;
  signOut: () => void;
  toggleFavorite: (favorite: Favorite) => void;
  saveTripDraft: (draft: TripDraft) => void;
  confirmBooking: (booking: Omit<Booking, "id" | "status">) => Booking;
};

const VoyaraContext = createContext<VoyaraContextValue | undefined>(undefined);

const readStorage = <T,>(key: string, fallback: T): T => {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export function VoyaraProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => readStorage("voyara:user", null));
  const [favorites, setFavorites] = useState<Favorite[]>(() => readStorage("voyara:favorites", []));
  const [bookings, setBookings] = useState<Booking[]>(() => readStorage("voyara:bookings", []));
  const [tripDraft, setTripDraft] = useState<TripDraft | null>(() => readStorage("voyara:trip-draft", null));

  const value = useMemo<VoyaraContextValue>(
    () => ({
      user,
      favorites,
      bookings,
      tripDraft,
      async signIn(email) {
        const nextUser = await demoApi.signIn(email);
        setUser(nextUser);
        writeStorage("voyara:user", nextUser);
      },
      signOut() {
        setUser(null);
        localStorage.removeItem("voyara:user");
      },
      toggleFavorite(favorite) {
        setFavorites((current) => {
          const exists = current.some((item) => item.id === favorite.id && item.kind === favorite.kind);
          const next = exists
            ? current.filter((item) => !(item.id === favorite.id && item.kind === favorite.kind))
            : [favorite, ...current];
          writeStorage("voyara:favorites", next);
          return next;
        });
      },
      saveTripDraft(draft) {
        setTripDraft(draft);
        writeStorage("voyara:trip-draft", draft);
      },
      confirmBooking(booking) {
        const nextBooking: Booking = {
          ...booking,
          id: `VOY-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
          status: "CONFIRMED",
        };
        setBookings((current) => {
          const next = [nextBooking, ...current];
          writeStorage("voyara:bookings", next);
          return next;
        });
        return nextBooking;
      },
    }),
    [bookings, favorites, tripDraft, user],
  );

  return <VoyaraContext.Provider value={value}>{children}</VoyaraContext.Provider>;
}

// The hook is intentionally co-located with its provider so consumers cannot
// accidentally read this private context without the required provider.
// eslint-disable-next-line react-refresh/only-export-components
export function useVoyara() {
  const context = useContext(VoyaraContext);
  if (!context) throw new Error("useVoyara must be used inside VoyaraProvider");
  return context;
}
