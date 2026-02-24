import React, { useState, useMemo } from "react";
import { useSchool } from "../../context/SchoolContext";
import { teacherClasses } from "../../data/dummydata";

/* shadcn UI */
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

/* Icons */
import {
  Users,
  CalendarDays,
  AlertTriangle,
  MessageSquare,
  BookOpen,
} from "lucide-react";

export default function TeacherDashboard() {
  const { students = [] } = useSchool();

  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  /* ⭐ LOW PERFORMERS */
  const lowStudents = useMemo(() => {
    return students.filter(
      (s) => Number(s?.performance?.percentage) < 50
    );
  }, [students]);

  const sendMessage = () => {
    if (!message.trim()) return;
    setSent(true);
    setTimeout(() => setSent(false), 2000);
    setMessage("");
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">

        {/* ⭐ HEADER */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome Back, Teacher!
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your classes, track student performance, and stay connected with parents
          </p>
        </div>

        {/* ⭐ STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Students"
            value={students.length}
            icon={<Users className="w-6 h-6" />}
            color="blue"
          />

          <StatCard
            title="Classes Today"
            value={teacherClasses?.length || 0}
            icon={<BookOpen className="w-6 h-6" />}
            color="purple"
          />

          <StatCard
            title="Attendance %"
            value="92%"
            icon={<CalendarDays className="w-6 h-6" />}
            color="green"
          />

          <StatCard
            title="Low Performers"
            value={lowStudents.length}
            icon={<AlertTriangle className="w-6 h-6" />}
            color="orange"
          />
        </div>

        {/* ⭐ MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">

            {/* ⭐ TODAY CLASSES */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Today's Classes
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {teacherClasses?.map((cls, index) => {
                  const colors = [
                    "bg-blue-50 border-blue-200 text-blue-900 text-blue-700",
                    "bg-purple-50 border-purple-200 text-purple-900 text-purple-700",
                    "bg-green-50 border-green-200 text-green-900 text-green-700",
                    "bg-orange-50 border-orange-200 text-orange-900 text-orange-700",
                  ];

                  const [bg, border, text1, text2] =
                    colors[index % colors.length].split(" ");

                  return (
                    <div
                      key={cls.id}
                      className={`p-4 border rounded-lg ${bg} ${border}`}
                    >
                      <p className={`font-semibold ${text1}`}>
                        {cls.subject} - Grade {cls.grade}
                      </p>
                      <p className={`text-sm ${text2}`}>
                        {cls.time}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ⭐ STUDENT OVERVIEW (IMPROVED) */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Quick Student Overview
                </h2>
              </div>

              {students.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No students available
                </p>
              ) : (
                /* ⭐ ADDED VERTICAL SCROLL */
                <div className="overflow-x-auto max-h-72 overflow-y-auto rounded-lg border">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-4 py-2 text-left">Student</th>
                        <th className="px-4 py-2 text-left">Attendance %</th>
                        <th className="px-4 py-2 text-left">Marks %</th>
                      </tr>
                    </thead>

                    <tbody>
                      {/* ⭐ SHOW ALL STUDENTS (FIXED HERE) */}
                      {students.map((s) => {
                        const totalDays = Array.isArray(s.attendance)
                          ? s.attendance.length
                          : 0;

                        const presentDays = Array.isArray(s.attendance)
                          ? s.attendance.filter(
                              (a) => a.status === "Present"
                            ).length
                          : 0;

                        const attendancePercent =
                          totalDays > 0
                            ? Math.round((presentDays / totalDays) * 100)
                            : 0;

                        const marksPercent =
                          s?.performance?.percentage ?? "-";

                        return (
                          <tr
                            key={s.id}
                            className="border-b hover:bg-gray-50 transition"
                          >
                            <td className="px-4 py-2 font-medium">
                              {s.name}
                            </td>
                            <td className="px-4 py-2">
                              {attendancePercent}%
                            </td>
                            <td className="px-4 py-2">
                              {marksPercent}%
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* ⭐ RIGHT SIDEBAR */}
          <div className="space-y-6 lg:sticky lg:top-8 lg:h-fit">

            {/* Parent Communication */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Parent Communication
                </h2>
              </div>

              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Send important updates to parents..."
                className="mb-3"
              />

              <Button
                onClick={sendMessage}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Send Message
              </Button>

              {sent && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 text-sm font-medium">
                    ✓ Message sent successfully
                  </p>
                </div>
              )}
            </div>

            {/* Alerts */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Students Need Attention
                </h2>
              </div>

              <div className="space-y-3">
                {lowStudents.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">
                    All students are doing well!
                  </p>
                ) : (
                  lowStudents.map((s) => (
                    <div
                      key={s.id}
                      className="p-3 bg-orange-50 border border-orange-200 rounded-lg"
                    >
                      <p className="text-orange-900 font-medium">
                        {s.name}
                      </p>
                      <p className="text-xs text-orange-700 mt-1">
                        Marks: {s?.performance?.percentage ?? 0}%
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

/* ⭐ STAT CARD */
function StatCard({ title, value, icon, color }) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    green: "bg-green-50 text-green-600 border-green-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
  };

  return (
    <div
      className={`rounded-lg p-6 shadow-sm border transition-all hover:shadow-md ${
        colorClasses[color] || colorClasses.blue
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className="opacity-20">{icon}</div>
      </div>
    </div>
  );
}