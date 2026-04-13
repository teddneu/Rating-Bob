import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";
import { authService } from "../services/api";
import { getPostAuthRedirectPath, setAuthenticated } from "../auth";

type RegisterLocationState = {
  from?: {
    pathname?: string;
    search?: string;
    hash?: string;
  };
};

export function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const postAuthPath = getPostAuthRedirectPath(location.state as RegisterLocationState | null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await authService.register(formData);
      setAuthenticated(response.data);
      navigate(postAuthPath, { replace: true });
    } catch (err) {
      setError("Không tạo được tài khoản. Email có thể đã tồn tại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl p-8 shadow-lg"
    >
      <h2 className="text-foreground mb-2">Tạo tài khoản mới</h2>
      <p className="text-muted-foreground mb-8">Bắt đầu đánh giá Bob!</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block mb-2">
            Tên của yêu
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              className="w-full pl-11 pr-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
              className="w-full pl-11 pr-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block mb-2">
            Mật khẩu
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full pl-11 pr-11 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isLoading ? "Đang tạo..." : "Tạo Tài Khoản"}
        </button>
      </form>

      {error && <p className="text-sm text-destructive mt-4">{error}</p>}

      <p className="text-center text-muted-foreground mt-6">
        Đã có tài khoản?{" "}
        <Link to="/auth/login" className="text-primary hover:underline">
          Đăng nhập
        </Link>
      </p>
    </motion.div>
  );
}
