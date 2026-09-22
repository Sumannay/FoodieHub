export const ROOM_POLICY = {
  includedAdultsPerRoom: 2,
  maxChildrenPerRoom: 2,
  maxGuestsPerRoom: 4,
  defaultChildExtraBedFee: 650,
} as const;

export type Occupancy = {
  adults: number;
  children: number;
  rooms: number;
  requiredRooms: number;
  totalGuests: number;
  availableAdults: number;
  availableChildren: number;
  availableGuests: number;
  isValid: boolean;
  childExtraBedFee: number;
  childAccommodationCost: number;
  message: string;
};

export function getOccupancy(adults: number, children: number, rooms: number, childExtraBedFee: number = ROOM_POLICY.defaultChildExtraBedFee): Occupancy {
  const totalGuests = adults + children;
  const requiredRooms = Math.max(
    1,
    Math.ceil(adults / ROOM_POLICY.includedAdultsPerRoom),
    Math.ceil(children / ROOM_POLICY.maxChildrenPerRoom),
    Math.ceil(totalGuests / ROOM_POLICY.maxGuestsPerRoom),
  );
  const availableAdults = rooms * ROOM_POLICY.includedAdultsPerRoom;
  const availableChildren = rooms * ROOM_POLICY.maxChildrenPerRoom;
  const availableGuests = rooms * ROOM_POLICY.maxGuestsPerRoom;
  const isValid = adults <= availableAdults && children <= availableChildren && totalGuests <= availableGuests;
  const message = isValid
    ? "Fits the selected rooms: up to 2 adults and 2 children per room."
    : "This guest mix needs at least " + requiredRooms + " room" + (requiredRooms === 1 ? "" : "s") + ". Each room allows up to 2 adults, 2 children and 4 guests total.";

  return {
    adults, children, rooms, requiredRooms, totalGuests, availableAdults, availableChildren, availableGuests, isValid,
    childExtraBedFee,
    childAccommodationCost: children * childExtraBedFee,
    message,
  };
}

export function getNights(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 1;
  const start = new Date(checkIn + "T00:00:00").getTime();
  const end = new Date(checkOut + "T00:00:00").getTime();
  return Number.isFinite(start) && Number.isFinite(end) ? Math.max(1, Math.ceil((end - start) / 86400000)) : 1;
}
