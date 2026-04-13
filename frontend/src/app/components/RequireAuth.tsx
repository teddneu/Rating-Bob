import { Navigate, Outlet, useLocation } from "react-router";
import { isAuthenticated, LOGIN_PATH } from "../auth";

export function RequireAuth() {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to={LOGIN_PATH} replace state={{ from: location }} />;
  }

  return <Outlet />;
}
