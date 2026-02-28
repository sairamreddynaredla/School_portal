import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdminSidebar from "../components/admin/AdminSidebar";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 bg-gray-50 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">
            Welcome, {user?.name}
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded text-white"
          >
            Logout
          </button>
        </div>

        {/* VERY IMPORTANT */}
        <Outlet />
      </div>
    </div>
  );
}