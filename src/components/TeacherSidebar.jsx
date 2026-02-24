import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardCheck,
  BarChart3,
  MessageSquare,
  FileText,
  GraduationCap,
  LogOut,
} from "lucide-react";

export default function TeacherSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItem =
    "relative flex items-center gap-3 rounded-lg px-3 py-2 transition";

  const activeStyle =
    "bg-blue-50 text-blue-700 font-semibold before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:rounded-r before:bg-blue-600";

  const normalStyle = "text-gray-600 hover:bg-gray-100";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-white p-4">
      <h2 className="mb-4 text-xl font-bold tracking-tight">
        🎓 Teacher Panel
      </h2>

      {user?.name && (
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-3">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-bold text-white">
              {user.name.charAt(0)}
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">
                {user.name}
              </p>
              <p className="text-xs text-gray-600">
                {user.subject || user.email || "Teacher"}
              </p>
            </div>
          </div>
        </div>
      )}

      <nav className="flex flex-1 flex-col gap-1 text-sm">
        <Section title="OVERVIEW" />

        <NavLink
          to="/teacher/dashboard"
          className={({ isActive }) =>
            `${navItem} ${isActive ? activeStyle : normalStyle}`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <Section title="CLASSES" />

        <NavLink
          to="/teacher/classes"
          className={({ isActive }) =>
            `${navItem} ${isActive ? activeStyle : normalStyle}`
          }
        >
          <BookOpen size={18} />
          Classes
        </NavLink>

        <NavLink
          to="/teacher/classoverview"
          className={({ isActive }) =>
            `${navItem} ${isActive ? activeStyle : normalStyle}`
          }
        >
          <GraduationCap size={18} />
          Class Overview
        </NavLink>

        <Section title="STUDENTS" />

        <NavLink
          to="/teacher/student"
          className={({ isActive }) =>
            `${navItem} ${isActive ? activeStyle : normalStyle}`
          }
        >
          <Users size={18} />
          Student List
        </NavLink>

        <Section title="MANAGEMENT" />

        <NavLink
          to="/teacher/attendence"
          className={({ isActive }) =>
            `${navItem} ${isActive ? activeStyle : normalStyle}`
          }
        >
          <ClipboardCheck size={18} />
          Attendance
        </NavLink>

        <NavLink
          to="/teacher/marks"
          className={({ isActive }) =>
            `${navItem} ${isActive ? activeStyle : normalStyle}`
          }
        >
          <BarChart3 size={18} />
          Marks
        </NavLink>

        <NavLink
          to="/teacher/performance"
          className={({ isActive }) =>
            `${navItem} ${isActive ? activeStyle : normalStyle}`
          }
        >
          <BarChart3 size={18} />
          Performance
        </NavLink>

        <NavLink
          to="/teacher/remarks"
          className={({ isActive }) =>
            `${navItem} ${isActive ? activeStyle : normalStyle}`
          }
        >
          <FileText size={18} />
          Remarks
        </NavLink>

        <Section title="COMMUNICATION" />

        <NavLink
          to="/teacher/messages"
          className={({ isActive }) =>
            `${navItem} ${isActive ? activeStyle : normalStyle}`
          }
        >
          <MessageSquare size={18} />
          Parent Messages
        </NavLink>
      </nav>

      <div className="border-t pt-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-lg bg-red-500 px-3 py-2 font-medium text-white transition hover:bg-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

function Section({ title }) {
  return (
    <p className="mt-4 mb-1 px-2 text-xs font-semibold text-gray-400">
      {title}
    </p>
  );
}