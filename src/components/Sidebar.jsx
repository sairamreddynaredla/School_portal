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

const navClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2 rounded transition ${
    isActive
      ? "bg-blue-600 text-white"
      : "text-gray-700 hover:bg-blue-100"
  }`;

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useAuth();

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

  const teacherMenu = [
    { name: "Dashboard", path: "/teacher/dashboard", icon: LayoutDashboard },
    { name: "Attendance", path: "/teacher/attendance", icon: CalendarCheck },
    { name: "Classes", path: "/teacher/classes", icon: BookOpen },
    { name: "Marks", path: "/teacher/marks", icon: FileText },
    { name: "Messages", path: "/teacher/messages", icon: MessageSquare },
  ];

  const menuItems =
    user?.role === "teacher" ? teacherMenu : parentMenu;

  return (
    <aside
      className={`flex min-h-screen flex-col border-r bg-white p-4 shadow transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex items-center justify-between border-b p-4">
        {isOpen && (
          <h2 className="text-xl font-bold">
            {user?.role === "teacher"
              ? "Teacher Panel"
              : "Parent Panel"}
          </h2>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded p-1 hover:bg-gray-200"
        >
          ☰
        </button>
      </div>

      {isOpen && user?.name && (
        <div className="border-b bg-blue-50 p-4">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-bold text-white">
              {user.name.charAt(0)}
            </div>

            <div>
              <p className="text-sm font-medium text-gray-800">
                {user.name}
              </p>
              <p className="text-xs text-gray-600">
                {user.email || "user@school.edu"}
              </p>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 space-y-1 p-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink key={item.name} to={item.path} className={navClass}>
              <Icon size={18} />

              {isOpen && <span className="flex-1">{item.name}</span>}

              {item.name === "Notifications" &&
                isOpen &&
                notificationCount > 0 && (
                  <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
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