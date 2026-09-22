import { BrowserRouter, Route, Routes } from "react-router-dom";
import BrowseLayout from "./components/BrowseLayout";
import RequireAuth from "./components/RequireAuth";
import { VoyaraProvider } from "./context/VoyaraContext";
import AITravelAssistant from "./pages/AITravelAssistant";
import AuthPage from "./pages/AuthPage";
import Booking from "./pages/Booking";
import Confirmation from "./pages/Confirmation";
import DestinationDetails from "./pages/DestinationDetails";
import Destinations from "./pages/Destinations";
import Explore from "./pages/Explore";
import FavoritesPage from "./pages/FavoritesPage";
import Home from "./pages/Home";
import HotelDetailsPage from "./pages/HotelDetailsPage";
import Hotels from "./pages/Hotels";
import InfoPage from "./pages/InfoPage";
import Profile from "./pages/Profile";
import SearchPage from "./pages/SearchPage";
import TripBuilder from "./pages/TripBuilder";
import Trips from "./pages/Trips";

function NotFound() {
  return <main className="grid min-h-screen place-items-center bg-[#fbfaf7] px-6 text-center"><div><p className="text-sm font-bold uppercase tracking-[.2em] text-[#4a8558]">VOYARA</p><h1 className="mt-3 text-7xl font-black tracking-tighter">404</h1><h2 className="mt-2 text-2xl font-black">That path has drifted away.</h2><p className="mt-3 text-slate-500">Let’s get you back to somewhere beautiful.</p><a href="/" className="mt-7 inline-block rounded-full bg-[#183927] px-5 py-3 text-sm font-bold text-white">Go home</a></div></main>;
}

export default function App() {
  return <VoyaraProvider><BrowserRouter><Routes>
    <Route path="/" element={<Home />} />
    <Route element={<BrowseLayout />}>
      <Route path="/explore" element={<Explore />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/destinations/:id" element={<DestinationDetails />} />
      <Route path="/destination/:id" element={<DestinationDetails />} />
      <Route path="/places/:id" element={<DestinationDetails />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/hotels" element={<Hotels />} />
      <Route path="/hotels/:id" element={<HotelDetailsPage />} />
      <Route path="/trips" element={<Trips />} />
      <Route path="/trips/:id" element={<Trips />} />
      <Route path="/favorites" element={<RequireAuth><FavoritesPage /></RequireAuth>} />
      <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
      <Route path="/settings" element={<RequireAuth><InfoPage kind="settings" /></RequireAuth>} />
      <Route path="/reviews" element={<RequireAuth><InfoPage kind="reviews" /></RequireAuth>} />
      <Route path="/admin" element={<RequireAuth><InfoPage kind="admin" /></RequireAuth>} />
      <Route path="/admin/dashboard" element={<RequireAuth><InfoPage kind="admin" /></RequireAuth>} />
      <Route path="/admin/:resource" element={<RequireAuth><InfoPage kind="admin" /></RequireAuth>} />
    </Route>
    <Route path="/booking" element={<Booking />} />
    <Route path="/booking/:id" element={<Booking />} />
    <Route path="/confirmation" element={<Confirmation />} />
    <Route path="/confirmation/:id" element={<Confirmation />} />
    <Route path="/trips/create" element={<TripBuilder />} />
    <Route path="/trip-builder" element={<TripBuilder />} />
    <Route path="/ai-assistant" element={<AITravelAssistant />} />
    <Route path="/login" element={<AuthPage mode="login" />} />
    <Route path="/register" element={<AuthPage mode="register" />} />
    <Route path="/forgot-password" element={<InfoPage kind="forgot" />} />
    <Route path="*" element={<NotFound />} />
  </Routes></BrowserRouter></VoyaraProvider>;
}
