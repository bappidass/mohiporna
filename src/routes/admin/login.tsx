import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import  useAuthStore  from "@/stores/useAuthStore";
import { toast } from "sonner";
import { Lock, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.webp";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const { user, login, init } = useAuthStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => init(), [init]);

  useEffect(() => {
    if (user) navigate({ to: "/admin/dashboard" });
  }, [user, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      navigate({ to: "/admin/dashboard" });
    } catch (err: any) {
      toast.error(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-gold mb-8 text-sm font-poppins">
          <ArrowLeft size={16} /> Back to site
        </Link>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur">
          <div className="text-center mb-8">
            <img src={logo} alt="Mohioparna" className="h-14 mx-auto mb-4" />
            <div className="inline-flex items-center gap-2 text-gold font-poppins uppercase tracking-widest text-xs">
              <Lock size={14} /> Admin Portal
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-poppins uppercase tracking-wider text-white/60">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 font-body focus:outline-none focus:border-gold transition"
              />
            </div>

            <div>
              <label className="text-xs font-poppins uppercase tracking-wider text-white/60">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 font-body focus:outline-none focus:border-gold transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-black font-heading uppercase tracking-wider py-3 rounded-lg hover:scale-[1.02] transition disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-xs text-white/40 mt-6 font-poppins">
            Authorized personnel only
          </p>
        </div>
      </div>
    </div>
  );
}
