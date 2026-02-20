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
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const user = login(username, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-blue-200">
      <div className="w-full max-w-md">
        <div className="bg-white/90 rounded-2xl shadow-2xl p-10 border border-slate-200 backdrop-blur-md">
          {/* Branding */}
          <div className="flex flex-col items-center mb-8">
            <img src="/SCHOOL.png" alt="School Logo" className="w-20 h-20 mb-3 drop-shadow-lg rounded-xl border border-blue-200 bg-white object-contain" />
            <h1 className="text-3xl font-extrabold text-blue-800 tracking-tight">School Portal</h1>
            <p className="text-slate-500 mt-1 text-base">Sign in to your account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-shake">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-red-800 font-semibold">Login Failed</p>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
              <input
                type="text"
                placeholder="Username (teacher / parent)"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition shadow-sm bg-slate-50"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                required
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <input
                type="password"
                placeholder="Password (123)"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition shadow-sm bg-slate-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 shadow-md ${
                loading
                  ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                  : "bg-blue-700 text-white hover:bg-blue-800 active:bg-blue-900"
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
          <div className="mt-10 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-500 font-semibold mb-3">Demo Credentials</p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 flex items-center gap-3">
                <span className="text-blue-700 text-lg">👨‍🏫</span>
                <span className="font-medium text-slate-800">Teacher</span>
                <span className="ml-auto text-slate-600">Username: <code className="bg-white px-2 py-1 rounded border">teacher</code></span>
                <span className="text-slate-600">Password: <code className="bg-white px-2 py-1 rounded border">123</code></span>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border border-green-100 flex items-center gap-3">
                <span className="text-green-700 text-lg">👨‍👩‍👧</span>
                <span className="font-medium text-slate-800">Parent</span>
                <span className="ml-auto text-slate-600">Username: <code className="bg-white px-2 py-1 rounded border">parent</code></span>
                <span className="text-slate-600">Password: <code className="bg-white px-2 py-1 rounded border">123</code></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
