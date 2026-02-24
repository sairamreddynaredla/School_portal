import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
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
      await new Promise((resolve) => setTimeout(resolve, 500));
      login(username, password);
      navigate("/");
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

          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 animate-shake">
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

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Username
              </label>
              <input
                type="text"
                placeholder="Username (teacher / parent)"
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
                placeholder="Password (123)"
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

          <div className="mt-10 border-t border-slate-200 pt-6">
            <p className="mb-3 text-sm font-semibold text-slate-500">
              Demo Credentials
            </p>

            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-3 rounded-lg border border-blue-100 bg-blue-50 p-3">
                <span className="text-lg text-blue-700">👨‍🏫</span>
                <span className="font-medium text-slate-800">
                  Teacher
                </span>
                <span className="ml-auto text-slate-600">
                  Username:{" "}
                  <code className="rounded border bg-white px-2 py-1">
                    teacher
                  </code>
                </span>
                <span className="text-slate-600">
                  Password:{" "}
                  <code className="rounded border bg-white px-2 py-1">
                    123
                  </code>
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-green-100 bg-green-50 p-3">
                <span className="text-lg text-green-700">👨‍👩‍👧</span>
                <span className="font-medium text-slate-800">
                  Parent
                </span>
                <span className="ml-auto text-slate-600">
                  Username:{" "}
                  <code className="rounded border bg-white px-2 py-1">
                    parent
                  </code>
                </span>
                <span className="text-slate-600">
                  Password:{" "}
                  <code className="rounded border bg-white px-2 py-1">
                    123
                  </code>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}