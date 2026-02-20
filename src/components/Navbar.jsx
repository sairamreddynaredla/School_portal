import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow pl-4 pr-6 py-3 flex justify-between items-center">
      <h1 className="font-bold text-lg">School Portal</h1>

      <div className="flex gap-6 items-center">
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
        {user?.role === "parent" && (
          <>
            <Link to="/attendance" className="text-gray-700 hover:text-blue-600">Attendance</Link>
            <Link to="/messages" className="text-gray-700 hover:text-blue-600">Messages</Link>
          </>
        )}
        {user && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
          >
            <LogOut size={18} />
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
