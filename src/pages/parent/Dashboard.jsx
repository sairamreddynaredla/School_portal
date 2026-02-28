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

  /* ⭐ HELPER → CALCULATE GRADE */
  const getGrade = (percentage) => {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B";
    if (percentage >= 60) return "C";
    return "D";
  };

  const stats = useMemo(() => {
    if (!student) {
      return {
        attendance: 0,
        overallGrade: "-",
        avgMarks: 0,
        recentAlerts: 0,
      };
    }

    const performance = student?.performance || [];
    const attendanceData = student?.attendance || [];

    /* Attendance Calculation */
    const presentCount = attendanceData.filter(
      (a) => a.status === "Present"
    ).length;

    const attendancePercent =
      attendanceData.length > 0
        ? Math.round(
            (presentCount / attendanceData.length) * 100
          )
        : 0;

    /* Marks Calculation (NEW ERP STYLE) */
    const totalMarks = performance.reduce(
      (sum, subject) => sum + subject.marksObtained,
      0
    );

    const avgMarks =
      performance.length > 0
        ? Math.round(totalMarks / performance.length)
        : 0;

    const overallGrade = getGrade(avgMarks);

    return {
      attendance: attendancePercent,
      overallGrade,
      avgMarks,
      recentAlerts:
        attendancePercent < 75 || avgMarks < 60 ? 1 : 0,
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
    if (grade.startsWith("A")) return "text-blue-600 bg-blue-50";
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
            Here's an overview of {student?.name}'s academic performance
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="Attendance"
            value={`${stats.attendance}%`}
            icon={<Clock className="h-12 w-12 opacity-20" />}
            colorClass={getAttendanceColor(stats.attendance)}
          />

          <StatCard
            title="Overall Grade"
            value={stats.overallGrade}
            icon={<Award className="h-12 w-12 opacity-20" />}
            colorClass={getGradeColor(stats.overallGrade)}
          />

          <StatCard
            title="Average Score"
            value={`${stats.avgMarks}%`}
            icon={<BarChart3 className="h-12 w-12 opacity-20" />}
            colorClass="bg-purple-50 text-purple-600"
          />

          <StatCard
            title="Recent Alerts"
            value={stats.recentAlerts}
            icon={<AlertCircle className="h-12 w-12 opacity-20" />}
            colorClass="bg-orange-50 text-orange-600"
          />

        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">

            <Card title="Attendance Overview" icon={<Clock className="h-5 w-5 text-blue-600" />}>
              <AttendanceCalendar />
            </Card>

            <Card title="Performance Trends" icon={<TrendingUp className="h-5 w-5 text-green-600" />}>
              <WeeklyProgress />
            </Card>

          </div>

          <div className="space-y-6 lg:sticky lg:top-8 lg:h-fit">
            <Card>
              <Notifications />
            </Card>

            <Card>
              <Messages />
            </Card>
          </div>
        </div>

        <Card title="Academic Records" icon={<Award className="h-5 w-5 text-purple-600" />}>
          <Marksheet />
        </Card>
      </div>
    </div>
  );
}

/* SMALL COMPONENTS */

function StatCard({ title, value, icon, colorClass }) {
  return (
    <div className={`rounded-lg border p-6 shadow-sm transition-all hover:shadow-md ${colorClass}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
        </div>
        {icon}
      </div>
    </div>
  );
}

function Card({ title, icon, children }) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      {title && (
        <div className="mb-4 flex items-center gap-2">
          {icon}
          <h2 className="text-lg font-semibold text-gray-900">
            {title}
          </h2>
        </div>
      )}
      {children}
    </div>
  );
}