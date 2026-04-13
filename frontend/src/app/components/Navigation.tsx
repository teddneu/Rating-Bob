import { Link, useLocation, useNavigate } from "react-router";
import { Heart, Home, Gift, TrendingUp, Settings, LogOut, User } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { clearAuth, getAuthUser, LOGIN_PATH } from "../auth";

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const user = getAuthUser();

  const links = [
    { to: "/", label: "Home", icon: Home },
    { to: "/wishlist", label: "Wishlist", icon: Gift },
    { to: "/insights", label: "Insights", icon: TrendingUp },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="border-b border-border bg-card sticky top-0 z-30 backdrop-blur-sm bg-card/95">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
              <Heart className="size-5 text-white fill-white" />
            </div>
            <span className="hidden sm:block text-foreground">Những thứ Bob làm</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors relative ${
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <Icon className="size-5" />
                  <span className="hidden sm:inline">{link.label}</span>
                  {active && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-accent rounded-lg -z-10"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="size-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:shadow-lg transition-shadow"
            >
              <User className="size-5" />
            </button>

            <AnimatePresence>
              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-20"
                  >
                    <div className="p-4 border-b border-border">
                      <p className="text-foreground">Tài khoản của tôi</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {user?.email ?? "vocuabob@gmail.com"}
                      </p>
                    </div>
                    <div className="p-2">
                      <Link
                        to="/settings"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-foreground"
                      >
                        <Settings className="size-4" />
                        <span>Cài đặt</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          clearAuth();
                          setShowUserMenu(false);
                          navigate(LOGIN_PATH, { replace: true });
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-destructive"
                      >
                        <LogOut className="size-4" />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
}
