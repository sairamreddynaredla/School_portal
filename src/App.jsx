import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

/* ================= AUTH ================= */
import Login from "./pages/auth/Login";

/* ================= LAYOUTS ================= */
import DashboardLayout from "./layouts/DashboardLayout";
import TeacherLayout from "./layouts/TeacherLayout";
import AdminLayout from "./layouts/AdminLayout";

/* ================= ADMIN ================= */
import Dashboard from "./pages/admin/dashboard/Dashboard";
import StudentsList from "./pages/admin/students/StudentsList";
import TeachersList from "./pages/admin/teachers/TeachersList";
import ClassesList from "./pages/admin/classes/ClassesList";

/* ================= PARENT ================= */
import ParentDashboard from "./pages/parent/Dashboard";
import AttendanceCalendar from "./pages/parent/AttendanceCalendar";
import WeeklyProgress from "./pages/parent/WeeklyProgress";
import Marksheet from "./pages/parent/Marksheet";
import Alerts from "./pages/parent/Alerts";
import ExamResult from "./pages/parent/ExamResult";
import Messages from "./pages/parent/Messages";
import Notifications from "./pages/parent/Notifications";

/* ================= TEACHER ================= */
import TeacherDashboard from "./pages/teacher/Dashboard";
import TeacherAttendance from "./pages/teacher/Attendance";
import TeacherClasses from "./pages/teacher/Classes";
import TeacherMarks from "./pages/teacher/Marks";
import TeacherPerformance from "./pages/teacher/Performance";
import TeacherStudents from "./pages/teacher/Students";
import TeacherMessages from "./pages/teacher/Messages";
import ClassOverview from "./pages/teacher/ClassOverview"; // ✅ FIXED
import Remarks from "./pages/teacher/Remarks";

/* ================= PROTECTED ROUTE ================= */
const Protected = ({ children, allow }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (allow && user.role !== allow) return <Navigate to="/" replace />;

  return children;
};

/* ================= ROLE REDIRECT ================= */
const RoleRedirect = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (user.role === "admin")
    return <Navigate to="/admin" replace />;

  if (user.role === "teacher")
    return <Navigate to="/teacher" replace />;

  if (user.role === "parent")
    return <Navigate to="/parent" replace />;

  return <Navigate to="/login" replace />;
};

/* ================= APP ROUTES ================= */
export default function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RoleRedirect />} />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin"
        element={
          <Protected allow="admin">
            <AdminLayout />
          </Protected>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="students" element={<StudentsList />} />
        <Route path="teachers" element={<TeachersList />} />
        <Route path="classes" element={<ClassesList />} />
      </Route>

      {/* ================= PARENT ================= */}
      <Route
        path="/parent"
        element={
          <Protected allow="parent">
            <DashboardLayout />
          </Protected>
        }
      >
        <Route index element={<ParentDashboard />} />
        <Route path="dashboard" element={<ParentDashboard />} />
        <Route path="attendance" element={<AttendanceCalendar />} />
        <Route path="weekly-progress" element={<WeeklyProgress />} />
        <Route path="marksheet" element={<Marksheet />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="exam-result" element={<ExamResult />} />
        <Route path="messages" element={<Messages />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>

      {/* ================= TEACHER ================= */}
      <Route
        path="/teacher"
        element={
          <Protected allow="teacher">
            <TeacherLayout />
          </Protected>
        }
      >
        <Route index element={<TeacherDashboard />} />
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="attendance" element={<TeacherAttendance />} />
        <Route path="attendence" element={<TeacherAttendance />} />
        <Route path="classes" element={<TeacherClasses />} />
        <Route path="classoverview" element={<ClassOverview />} />
        <Route path="marks" element={<TeacherMarks />} />
        <Route path="performance" element={<TeacherPerformance />} />
        <Route path="students" element={<TeacherStudents />} />
        <Route path="student" element={<TeacherStudents />} />
        <Route path="remarks" element={<Remarks />} />
        <Route path="messages" element={<TeacherMessages />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}