import { useMemo } from "react";
import useActiveStudent from "../../hooks/useActiveStudent";
import {
  BarChart3,
  TrendingUp,
  Clock,
  Award,
  AlertCircle,
} from "lucide-react";
import AttendanceCalendar from "./AttendanceCalendar";
import WeeklyProgress from "./WeeklyProgress";
import Marksheet from "./Marksheet";
import Messages from "./Messages";
import Notifications from "./Notifications";

export default function ParentDashboard() {
  const student = useActiveStudent();

  const stats = useMemo(() => {
    if (!student) {
      return {
        attendance: 0,
        overallGrade: "-",
        avgMarks: 0,
        recentAlerts: 0,
      };
    }

    const performance = student?.performance || {};
    const attendanceData = student?.attendance || [];

    const presentCount = attendanceData.filter(
      (a) => a.status === "Present"
    ).length;

    const attendancePercent =
      attendanceData.length > 0
        ? Math.round(
            (presentCount / attendanceData.length) * 100
          )
        : 0;

    const subjects = Object.entries(performance).filter(
      ([key]) => key !== "percentage" && key !== "grade"
    );

    const avgMarks =
      subjects.length > 0
        ? Math.round(
            subjects.reduce((sum, [, val]) => sum + val, 0) /
              subjects.length
          )
        : 0;

    return {
      attendance: attendancePercent,
      overallGrade: performance.grade || "-",
      avgMarks,
      recentAlerts: 2,
    };
  }, [student]);

  if (!student) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-lg bg-white p-6 text-center text-gray-500 shadow-sm">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 md:px-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome Back!
          </h1>
          <p className="mt-2 text-gray-600">
            Here's an overview of {student?.name}'s academic
            performance
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div
            className={`rounded-lg border p-6 shadow-sm transition-all hover:shadow-md ${getAttendanceColor(
              stats.attendance
            )}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">
                  Attendance
                </p>
                <p className="mt-2 text-3xl font-bold">
                  {stats.attendance}%
                </p>
              </div>
              <Clock className="h-12 w-12 opacity-20" />
            </div>
          </div>

          <div
            className={`rounded-lg border p-6 shadow-sm transition-all hover:shadow-md ${getGradeColor(
              stats.overallGrade
            )}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">
                  Overall Grade
                </p>
                <p className="mt-2 text-3xl font-bold">
                  {stats.overallGrade}
                </p>
              </div>
              <Award className="h-12 w-12 opacity-20" />
            </div>
          </div>

          <div className="rounded-lg border bg-purple-50 p-6 text-purple-600 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">
                  Average Score
                </p>
                <p className="mt-2 text-3xl font-bold">
                  {stats.avgMarks}%
                </p>
              </div>
              <BarChart3 className="h-12 w-12 opacity-20" />
            </div>
          </div>

          <div className="rounded-lg border bg-orange-50 p-6 text-orange-600 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">
                  Recent Updates
                </p>
                <p className="mt-2 text-3xl font-bold">
                  {stats.recentAlerts}
                </p>
              </div>
              <AlertCircle className="h-12 w-12 opacity-20" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Attendance Overview
                </h2>
              </div>
              <AttendanceCalendar />
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Performance Trends
                </h2>
              </div>
              <WeeklyProgress />
            </div>
          </div>

          <div className="space-y-6 lg:sticky lg:top-8 lg:h-fit">
            <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
              <Notifications />
            </div>

            <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
              <Messages />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Academic Records
            </h2>
          </div>
          <Marksheet />
        </div>
      </div>
    </div>
  );
}