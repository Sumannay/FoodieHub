export type UserRole = "TRAVELER" | "ADMIN" | "HOTEL_OWNER" | "CONTENT_MANAGER";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
};

export type FavoriteKind = "destination" | "stay" | "place" | "trip";

export type Favorite = {
  id: string;
  kind: FavoriteKind;
  title: string;
  subtitle: string;
  image: string;
  href: string;
};

export type TripDraft = {
  destination: string;
  startDate: string;
  endDate: string;
  travellers: number;
  budget: number;
  interests: string[];
};

export type Booking = {
  id: string;
  destination: string;
  stay: string;
  checkIn: string;
  checkOut: string;
  total: number;
  status: "CONFIRMED" | "CANCELLED" | "COMPLETED";
};
