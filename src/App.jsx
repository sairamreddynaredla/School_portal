import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/auth/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import TeacherLayout from "./layouts/TeacherLayout";
import ParentDashboard from "./pages/parent/Dashboard";
import TeacherDashboard from "./pages/teacher/Dashboard";
import AttendanceCalendar from "./pages/parent/AttendanceCalendar";
import WeeklyProgress from "./pages/parent/WeeklyProgress";
import Marksheet from "./pages/parent/Marksheet";
import Alerts from "./pages/parent/Alerts";
import ExamResult from "./pages/parent/ExamResult";
import Messages from "./pages/parent/Messages";
import Notifications from "./pages/parent/Notifications";
import TeacherAttendance from "./pages/teacher/Attendance";
import TeacherClasses from "./pages/teacher/Classes";
import TeacherMarks from "./pages/teacher/Marks";
import TeacherPerformance from "./pages/teacher/Performance";
import TeacherStudents from "./pages/teacher/Students";
import TeacherMessages from "./pages/teacher/Messages";
import ClassOverView from "./pages/teacher/ClassOverView";
import Remarks from "./pages/teacher/Remarks";


// 🔐 Protected Route Wrapper
const Protected = ({ children, allow }) => {
  const { user } = useAuth();

  // ❌ Not logged in
  if (!user) return <Navigate to="/login" />;

  // ❌ Wrong role trying to access
  if (allow && user.role !== allow) {
    return <Navigate to="/" />;
  }

  return children;
};


// 🔁 Auto role redirect ("/" → correct dashboard)
const RoleRedirect = () => {
  const { user } = useAuth();

  // First check: if no user, must login
  if (!user) return <Navigate to="/login" replace />;

  // Second check: redirect based on role
  if (user.role === "teacher") return <Navigate to="/teacher/dashboard" replace />;

  if (user.role === "parent") return <Navigate to="/parent/dashboard" replace />;

  // Fallback: no valid role, go to login
  return <Navigate to="/login" replace />;
};


export default function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Root redirect */}
      <Route path="/" element={<RoleRedirect />} />

      {/* 👨‍👩‍👧 Parent Routes */}
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

      {/* Redirect /dashboard to /parent */}
      <Route path="/dashboard" element={<Navigate to="/parent" replace />} />
      <Route path="/attendance" element={<Navigate to="/parent/attendance" replace />} />
      <Route path="/weekly-progress" element={<Navigate to="/parent/weekly-progress" replace />} />
      <Route path="/marksheet" element={<Navigate to="/parent/marksheet" replace />} />
      <Route path="/alerts" element={<Navigate to="/parent/alerts" replace />} />
      <Route path="/exam-result" element={<Navigate to="/parent/exam-result" replace />} />
      <Route path="/messages" element={<Navigate to="/parent/messages" replace />} />
      <Route path="/notifications" element={<Navigate to="/parent/notifications" replace />} />

      {/* 👨‍🏫 Teacher Routes */}
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
        <Route path="classoverview" element={<ClassOverView />} />
        <Route path="marks" element={<TeacherMarks />} />
        <Route path="performance" element={<TeacherPerformance />} />
        <Route path="students" element={<TeacherStudents />} />
        <Route path="student" element={<TeacherStudents />} />
        <Route path="remarks" element={<Remarks />} />
        <Route path="messages" element={<TeacherMessages />} />
      </Route>

      {/* Redirect teacher routes */}
      <Route path="/teacher/dashboard" element={<Navigate to="/teacher" replace />} />

      {/* Catch-all: redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
