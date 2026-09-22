import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Hotel,
  MapPin,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type ConfirmationState = {
  destination?: string;
  places?: string[];
  stay?: string;
  checkIn?: string;
  checkOut?: string;
  rooms?: number;
  adults?: number;
  children?: number;
  estimatedCost?: number;
  bookingId?: string;
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function Confirmation() {
  const location = useLocation();

  const booking = (location.state as ConfirmationState | null) ?? {};

  const bookingId = booking.bookingId ?? "VOY-DEMO-000001";

  const destination = booking.destination || "Manali, India";
  const places = booking.places ?? [];
  const stay = booking.stay || "Selected Stay";
  const checkIn = booking.checkIn || "Not selected";
  const checkOut = booking.checkOut || "Not selected";
  const rooms = booking.rooms ?? 1;
  const adults = booking.adults ?? 2;
  const children = booking.children ?? 0;
  const estimatedCost = booking.estimatedCost ?? 0;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            to="/"
            className="text-2xl font-black tracking-tight text-slate-900"
          >
            VOYARA
          </Link>

          <Link
            to="/trips"
            className="font-semibold text-slate-600 transition hover:text-slate-900"
          >
            My Trips
          </Link>
        </div>
      </header>

      {/* Main */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        {/* Success Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2
              size={46}
              className="text-emerald-600"
              strokeWidth={2}
            />
          </div>

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-emerald-600">
            Booking Confirmed
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Your trip is ready!
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            Your VOYARA trip has been successfully created. Keep your booking ID
            for future reference.
          </p>

          <div className="mx-auto mt-7 inline-flex rounded-full bg-slate-100 px-5 py-3">
            <span className="text-sm font-semibold text-slate-500">
              Booking ID:
            </span>
            <span className="ml-2 text-sm font-black text-slate-900">
              {bookingId}
            </span>
          </div>
        </div>

        {/* Trip Details */}
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900">Trip Details</h2>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <InfoCard
              icon={<MapPin size={20} />}
              label="Destination"
              value={destination}
            />

            <InfoCard icon={<Hotel size={20} />} label="Stay" value={stay} />

            <InfoCard
              icon={<CalendarDays size={20} />}
              label="Travel Dates"
              value={`${checkIn} → ${checkOut}`}
            />

            <InfoCard
              icon={<Users size={20} />}
              label="Guests"
              value={`${adults} Adults • ${children} Children • ${rooms} Room${
                rooms > 1 ? "s" : ""
              }`}
            />
          </div>

          {/* Places */}
          {places.length > 0 && (
            <div className="mt-7 rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Places Selected
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {places.map((place) => (
                  <span
                    key={place}
                    className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
                  >
                    {place}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Cost */}
          <div className="mt-7 flex items-center justify-between rounded-2xl bg-slate-900 px-5 py-5 text-white">
            <div>
              <p className="text-sm text-slate-400">Estimated Trip Cost</p>
              <p className="mt-1 text-2xl font-black">
                {formatCurrency(estimatedCost)}
              </p>
            </div>

            <CheckCircle2 size={30} className="text-emerald-400" />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/trips"
            className="flex items-center justify-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 font-semibold text-white transition hover:bg-slate-700"
          >
            View My Trips
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/"
            className="flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3.5 font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}

type InfoCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function InfoCard({ icon, label, value }: InfoCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {label}
          </p>

          <p className="mt-1 truncate font-semibold text-slate-900">{value}</p>
        </div>
      </div>
    </div>
  );
}
