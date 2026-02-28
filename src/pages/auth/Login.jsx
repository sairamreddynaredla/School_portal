import { useState } from "react";
import useAuth from "../../context/useAuth"; // ✅ Correct import
import { useNavigate } from "react-router-dom";
import { AlertCircle, LogIn } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Fake delay for UI effect
      await new Promise((resolve) => setTimeout(resolve, 500));

      const user = login(username, password);

      // Redirect based on role
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "teacher") {
        navigate("/teacher");
      } else if (user.role === "parent") {
        navigate("/parent");
      } else {
        navigate("/");
      }

    } catch (err) {
      setError(err.message);
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-blue-200">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-200 bg-white/90 p-10 shadow-2xl backdrop-blur-md">
          
          {/* Header */}
          <div className="mb-8 flex flex-col items-center">
            <img
              src="/SCHOOL.png"
              alt="School Logo"
              className="mb-3 h-20 w-20 rounded-xl border border-blue-200 bg-white object-contain drop-shadow-lg"
            />
            <h1 className="text-3xl font-extrabold tracking-tight text-blue-800">
              School Portal
            </h1>
            <p className="mt-1 text-base text-slate-500">
              Sign in to your account
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
              <AlertCircle
                className="mt-0.5 flex-shrink-0 text-red-600"
                size={20}
              />
              <div>
                <p className="font-semibold text-red-800">
                  Login Failed
                </p>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Username
              </label>
              <input
                type="text"
                placeholder="admin / teacher / parent"
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 shadow-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-blue-400"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                required
                autoFocus
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>
              <input
                type="password"
                placeholder="123"
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 shadow-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`flex w-full items-center justify-center gap-2 rounded-lg py-2.5 px-4 font-semibold shadow-md transition ${
                loading
                  ? "cursor-not-allowed bg-slate-300 text-slate-500"
                  : "bg-blue-700 text-white hover:bg-blue-800 active:bg-blue-900"
              }`}
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Login
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-10 border-t border-slate-200 pt-6">
            <p className="mb-3 text-sm font-semibold text-slate-500">
              Demo Credentials
            </p>

            <div className="space-y-2 text-sm">
              <div>Admin → admin / 123</div>
              <div>Teacher → teacher / 123</div>
              <div>Parent → parent / 123</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}