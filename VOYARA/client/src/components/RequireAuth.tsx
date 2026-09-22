import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useVoyara } from "../context/VoyaraContext";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useVoyara();
  const location = useLocation();
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <>{children}</>;
}
