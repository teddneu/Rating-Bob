import { Outlet } from "react-router";
import { Navigation } from "./Navigation";
import { ToastProvider } from "./ToastProvider";

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Outlet />
      <ToastProvider />
    </div>
  );
}
