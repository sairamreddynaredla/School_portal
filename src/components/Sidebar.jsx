import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  CalendarCheck,
  TrendingUp,
  FileText,
  BookOpen,
  MessageSquare,
  Bell,
  AlertTriangle,
} from "lucide-react";

const notificationCount = 3;

// 🎨 Active link style
const navClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2 rounded transition ${
    isActive
      ? "bg-blue-600 text-white"
      : "text-gray-700 hover:bg-blue-100"
  }`;

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useAuth();

  // 👨‍👩‍👧 Parent Menu
  const parentMenu = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Attendance", path: "/attendance", icon: CalendarCheck },
    { name: "Weekly Progress", path: "/weekly-progress", icon: TrendingUp },
    { name: "Marksheet", path: "/marksheet", icon: FileText },
    { name: "Alerts", path: "/parent/alerts", icon: AlertTriangle },
    { name: "Exam Result", path: "/exam-result", icon: BookOpen },
    { name: "Messages", path: "/messages", icon: MessageSquare },
    { name: "Notifications", path: "/notifications", icon: Bell },
  ];

  // 👨‍🏫 Teacher Menu (✅ Students removed)
  const teacherMenu = [
    { name: "Dashboard", path: "/teacher/dashboard", icon: LayoutDashboard },
    { name: "Attendance", path: "/teacher/attendance", icon: CalendarCheck },
    { name: "Classes", path: "/teacher/classes", icon: BookOpen },
    { name: "Marks", path: "/teacher/marks", icon: FileText },
    { name: "Messages", path: "/teacher/messages", icon: MessageSquare },
  ];

  // 🔁 Choose menu based on role
  const menuItems = user?.role === "teacher" ? teacherMenu : parentMenu;

  return (
    <aside
      className={`bg-white shadow border-r p-4 min-h-screen transition-all duration-300 flex flex-col ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        {isOpen && (
          <h2 className="text-xl font-bold">
            {user?.role === "teacher" ? "Teacher Panel" : "Parent Panel"}
          </h2>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded hover:bg-gray-200"
        >
          ☰
        </button>
      </div>

      {/* User Info */}
      {isOpen && user?.name && (
        <div className="p-4 border-b bg-blue-50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-sm text-gray-800">
                {user.name}
              </p>
              <p className="text-xs text-gray-600">
                {user.email || "user@school.edu"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Menu */}
      <nav className="p-2 space-y-1 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink key={item.name} to={item.path} className={navClass}>
              <Icon size={18} />

              {isOpen && <span className="flex-1">{item.name}</span>}

              {/* Notification Badge */}
              {item.name === "Notifications" &&
                isOpen &&
                notificationCount > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {notificationCount}
                  </span>
                )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}