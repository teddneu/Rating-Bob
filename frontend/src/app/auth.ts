const AUTH_KEY = "rating-bob-auth";
const USER_KEY = "rating-bob-user";
export const DASHBOARD_PATH = "/";
export const AUTH_BASE_PATH = "/auth";
export const LOGIN_PATH = "/auth/login";

export type AuthUser = {
  name: string;
  email: string;
};

type RedirectLocationLike = {
  pathname?: string;
  search?: string;
  hash?: string;
};

type RedirectStateLike = {
  from?: RedirectLocationLike;
};

export const isAuthenticated = () => localStorage.getItem(AUTH_KEY) === "true";

export const getAuthUser = (): AuthUser | null => {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
};

export const setAuthenticated = (user: AuthUser) => {
  localStorage.setItem(AUTH_KEY, "true");
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getPostAuthRedirectPath = (
  state?: RedirectStateLike | null,
  fallback: string = DASHBOARD_PATH,
) => {
  const from = state?.from;
  if (!from?.pathname || from.pathname.startsWith("/auth")) {
    return fallback;
  }

  return `${from.pathname}${from.search ?? ""}${from.hash ?? ""}`;
};
