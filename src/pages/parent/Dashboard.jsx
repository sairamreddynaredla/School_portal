import { useEffect, useState } from "react";
import useActiveStudent from "../../hooks/useActiveStudent";
import {
  BarChart3,
  TrendingUp,
  Clock,
  Award,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import AttendanceCalendar from "./AttendanceCalendar";
import WeeklyProgress from "./WeeklyProgress";
import Marksheet from "./Marksheet";
import Messages from "./Messages";
import Notifications from "./Notifications";

export default function ParentDashboard() {
  const student = useActiveStudent();
  const [stats, setStats] = useState({
    attendance: 0,
    overallGrade: "-",
    avgMarks: 0,
    recentAlerts: 0,
  });

  useEffect(() => {
    if (student) {
      const performance = student?.performance || {};
      const attendanceData = student?.attendance || [];
      
      const presentCount = attendanceData.filter(
        (a) => a.status === "Present"
      ).length;
      const attendancePercent = attendanceData.length > 0
        ? Math.round((presentCount / attendanceData.length) * 100)
        : 0;

      const subjects = Object.entries(performance).filter(
        ([key]) => key !== "percentage" && key !== "grade"
      );
      const avgMarks = subjects.length > 0
        ? Math.round(
            subjects.reduce((sum, [, val]) => sum + val, 0) /
              subjects.length
          )
        : 0;

      setStats({
        attendance: attendancePercent,
        overallGrade: performance.grade || "-",
        avgMarks: avgMarks,
        recentAlerts: 2,
      });
    }
  }, [student]);

  if (!student) {
    return (
      <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-lg bg-white p-6 shadow-sm text-center text-gray-500">
            <p className="text-lg">No student selected</p>
          </div>
        </div>
      </div>
    );
  }

  const getAttendanceColor = (attendance) => {
    if (attendance >= 80) return "text-green-600 bg-green-50";
    if (attendance >= 70) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getGradeColor = (grade) => {
    if (grade === "A") return "text-blue-600 bg-blue-50";
    if (grade === "B") return "text-green-600 bg-green-50";
    if (grade === "C") return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">

        {/* ⭐ WELCOME HEADER */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome Back!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's an overview of {student?.name}'s academic performance
          </p>
        </div>

        {/* ⭐ STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Attendance Card */}
          <div className={`rounded-lg p-6 shadow-sm border transition-all hover:shadow-md ${getAttendanceColor(stats.attendance)}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">Attendance</p>
                <p className="text-3xl font-bold mt-2">{stats.attendance}%</p>
                <p className="text-xs opacity-70 mt-1">
                  {stats.attendance >= 80 ? "✓ On Track" : "⚠ Needs Improvement"}
                </p>
              </div>
              <Clock className="w-12 h-12 opacity-20" />
            </div>
          </div>

          {/* Grade Card */}
          <div className={`rounded-lg p-6 shadow-sm border transition-all hover:shadow-md ${getGradeColor(stats.overallGrade)}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">Overall Grade</p>
                <p className="text-3xl font-bold mt-2">{stats.overallGrade}</p>
                <p className="text-xs opacity-70 mt-1">Latest Assessment</p>
              </div>
              <Award className="w-12 h-12 opacity-20" />
            </div>
          </div>

          {/* Average Marks Card */}
          <div className="rounded-lg p-6 shadow-sm border bg-purple-50 text-purple-600 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">Average Score</p>
                <p className="text-3xl font-bold mt-2">{stats.avgMarks}%</p>
                <p className="text-xs opacity-70 mt-1">Across Subjects</p>
              </div>
              <BarChart3 className="w-12 h-12 opacity-20" />
            </div>
          </div>

          {/* Alerts Card */}
          <div className="rounded-lg p-6 shadow-sm border bg-orange-50 text-orange-600 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">Recent Updates</p>
                <p className="text-3xl font-bold mt-2">{stats.recentAlerts}</p>
                <p className="text-xs opacity-70 mt-1">Alerts This Week</p>
              </div>
              <AlertCircle className="w-12 h-12 opacity-20" />
            </div>
          </div>
        </div>

        {/* ⭐ MAIN GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-6">
            {/* Attendance Section */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Attendance Overview</h2>
              </div>
              <AttendanceCalendar />
            </div>

            {/* Weekly Progress Section */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-semibold text-gray-900">Performance Trends</h2>
              </div>
              <WeeklyProgress />
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6 lg:sticky lg:top-8 lg:h-fit">
            {/* Notifications */}
            <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
              <Notifications />
            </div>

            {/* Messages */}
            <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
              <Messages />
            </div>
          </div>
        </div>

        {/* ⭐ MARKSHEET SECTION */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900">Academic Records</h2>
          </div>
          <Marksheet />
        </div>

      </div>
    </div>
  );
}
