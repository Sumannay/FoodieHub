import {
  AlertTriangle,
  ArrowLeft,
  CalendarDays,
  Check,
  CreditCard,
  Hotel,
  MapPin,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useVoyara } from "../context/VoyaraContext";
import { getOccupancy } from "../lib/roomOccupancy";

type BookingState = {
  destination?: string;
  places?: string[];
  stay?: string;
  checkIn?: string;
  checkOut?: string;
  rooms?: number;
  adults?: number;
  children?: number;
  estimatedCost?: number;
  childExtraBedFee?: number;
};

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { confirmBooking } = useVoyara();

  const bookingData = (location.state as BookingState) || {};

  const {
    destination = "Manali, India",
    places = ["Solang Valley"],
    stay = "Mountain View Resort",
    checkIn = "",
    checkOut = "",
    rooms = 1,
    adults = 2,
    children = 0,
    estimatedCost = 0,
    childExtraBedFee,
  } = bookingData;

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);

  const totalGuests = adults + children;
  const occupancy = getOccupancy(adults, children, rooms, childExtraBedFee);

  const handleConfirmBooking = () => {
    if (!occupancy.isValid) {
      return;
    }
    setProcessing(true);

    setTimeout(() => {
      const booking = confirmBooking({
        destination,
        stay,
        checkIn,
        checkOut,
        total: estimatedCost,
      });
      navigate("/confirmation", {
        state: {
          destination,
          places,
          stay,
          checkIn,
          checkOut,
          rooms,
          adults,
          children,
          estimatedCost,
          paymentMethod,
          bookingId: booking.id,
        },
      });
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            to="/"
            className="text-2xl font-black tracking-tight text-slate-900"
          >
            VOYARA
          </Link>

          <div className="text-sm font-medium text-slate-500">Booking</div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Back */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Heading */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Almost there
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Confirm your booking
          </h1>

          <p className="mt-3 max-w-2xl text-slate-500">
            Review your trip details and choose your payment method before
            confirming your booking.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Left */}
          <section className="space-y-6">
            {/* Destination */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <MapPin size={21} className="text-slate-700" />
                </div>

                <div>
                  <p className="text-sm text-slate-400">Destination</p>
                  <h2 className="text-lg font-bold text-slate-900">
                    {destination}
                  </h2>
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-slate-700">
                  Places selected
                </p>

                <div className="flex flex-wrap gap-2">
                  {places.length > 0 ? (
                    places.map((place) => (
                      <span
                        key={place}
                        className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
                      >
                        {place}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-400">
                      No places selected
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Stay */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100">
                  <Hotel size={21} className="text-slate-700" />
                </div>

                <div>
                  <p className="text-sm text-slate-400">Stay</p>

                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    {stay}
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    {rooms} {rooms === 1 ? "room" : "rooms"} · {totalGuests}{" "}
                    {totalGuests === 1 ? "guest" : "guests"}
                  </p>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <CalendarDays size={21} className="text-slate-700" />
                </div>

                <div>
                  <p className="text-sm text-slate-400">Travel dates</p>
                  <h2 className="text-lg font-bold text-slate-900">
                    Your selected dates
                  </h2>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Check-in
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    {checkIn || "Not selected"}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Check-out
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    {checkOut || "Not selected"}
                  </p>
                </div>
              </div>
            </div>

            {/* Guests */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <Users size={21} className="text-slate-700" />
                </div>

                <div>
                  <p className="text-sm text-slate-400">Travellers</p>
                  <h2 className="text-lg font-bold text-slate-900">
                    Guest details
                  </h2>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <GuestItem label="Adults" value={adults} />
                <GuestItem label="Children" value={children} />
                <GuestItem label="Rooms" value={rooms} />
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <CreditCard size={21} className="text-slate-700" />
                </div>

                <div>
                  <p className="text-sm text-slate-400">Payment</p>
                  <h2 className="text-lg font-bold text-slate-900">
                    Select payment method
                  </h2>
                </div>
              </div>

              <div className="space-y-3">
                <PaymentOption
                  value="card"
                  selected={paymentMethod === "card"}
                  onChange={setPaymentMethod}
                  title="Credit / Debit Card"
                  description="Pay securely using your card"
                />

                <PaymentOption
                  value="upi"
                  selected={paymentMethod === "upi"}
                  onChange={setPaymentMethod}
                  title="UPI"
                  description="Pay using your preferred UPI app"
                />

                <PaymentOption
                  value="cash"
                  selected={paymentMethod === "cash"}
                  onChange={setPaymentMethod}
                  title="Pay at property"
                  description="Available for selected stays"
                />
              </div>
            </div>
            {!occupancy.isValid && <div role="alert" className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-amber-950"><div className="flex gap-3"><AlertTriangle size={20} className="mt-0.5 shrink-0" /><div><p className="font-bold">Room capacity needs attention</p><p className="mt-1 text-sm leading-6">{occupancy.message} Return to the stay or trip builder and add rooms before confirming.</p></div></div></div>}
          </section>

          {/* Right Summary */}
          <aside className="lg:sticky lg:top-6 lg:h-fit">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">
                Booking summary
              </h2>

              <div className="my-6 h-px bg-slate-200" />

              <div className="space-y-5">
                <SummaryRow label="Destination" value={destination} />

                <SummaryRow label="Stay" value={stay} />

                <SummaryRow label="Rooms" value={`${rooms}`} />

                <SummaryRow label="Guests" value={`${totalGuests}`} />

                <SummaryRow
                  label="Check-in"
                  value={checkIn || "Not selected"}
                />

                <SummaryRow
                  label="Check-out"
                  value={checkOut || "Not selected"}
                />
              </div>

              <div className="my-6 h-px bg-slate-200" />

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-slate-400">Estimated total</p>

                  <p className="mt-1 text-3xl font-bold text-slate-900">
                    ₹{estimatedCost.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleConfirmBooking}
                disabled={processing || !occupancy.isValid}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-4 font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {processing ? (
                  "Processing..."
                ) : (
                  <>
                    {occupancy.isValid ? "Confirm Booking" : "Room limit exceeded"}
                    <Check size={18} />
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                By confirming, you agree to the booking terms and cancellation
                policy.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function GuestItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 text-xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function PaymentOption({
  value,
  selected,
  onChange,
  title,
  description,
}: {
  value: string;
  selected: boolean;
  onChange: (value: string) => void;
  title: string;
  description: string;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition ${
        selected
          ? "border-slate-900 bg-slate-50"
          : "border-slate-200 hover:border-slate-400"
      }`}
    >
      <input
        type="radio"
        name="payment"
        value={value}
        checked={selected}
        onChange={() => onChange(value)}
        className="h-4 w-4"
      />

      <div>
        <p className="font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-sm text-slate-400">{label}</span>

      <span className="max-w-[210px] text-right text-sm font-semibold text-slate-900">
        {value}
      </span>
    </div>
  );
}
