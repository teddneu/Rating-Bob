import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { AuthLayout } from "./components/AuthLayout";
import { RedirectIfAuthed } from "./components/RedirectIfAuthed";
import { RequireAuth } from "./components/RequireAuth";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { WishlistPage } from "./pages/WishlistPage";
import { InsightsPage } from "./pages/InsightsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { AUTH_BASE_PATH, DASHBOARD_PATH } from "./auth";

export const router = createBrowserRouter([
  {
    path: DASHBOARD_PATH,
    Component: RequireAuth,
    children: [
      {
        Component: Layout,
        children: [
          { index: true, Component: HomePage },
          { path: "wishlist", Component: WishlistPage },
          { path: "insights", Component: InsightsPage },
          { path: "settings", Component: SettingsPage },
        ],
      },
    ],
  },
  {
    path: AUTH_BASE_PATH,
    Component: RedirectIfAuthed,
    children: [
      {
        Component: AuthLayout,
        children: [
          { path: "login", Component: LoginPage },
          { path: "register", Component: RegisterPage },
        ],
      },
    ],
  },
]);
