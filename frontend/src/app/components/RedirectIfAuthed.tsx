import { Navigate, Outlet } from "react-router";
import { DASHBOARD_PATH, isAuthenticated } from "../auth";

export function RedirectIfAuthed() {
  if (isAuthenticated()) {
    return <Navigate to={DASHBOARD_PATH} replace />;
  }

  return <Outlet />;
}
