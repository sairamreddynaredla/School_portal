import React, { useMemo } from "react";
import { useSchool } from "../../context/SchoolContext";
import { teacherClasses } from "../../data/dummydata";

/* Icons */
import {
  Users,
  CalendarDays,
  AlertTriangle,
  BookOpen,
} from "lucide-react";

export default function TeacherDashboard() {
  const { students = [] } = useSchool();

  /* ✅ ERP-STYLE MARKS PERCENTAGE */
  const getMarksPercentage = (student) => {
    const perf = student?.performance || [];
    if (!Array.isArray(perf) || perf.length === 0) return 0;

    const totalMax = perf.reduce(
      (sum, s) => sum + s.maxMarks,
      0
    );

    const totalObtained = perf.reduce(
      (sum, s) => sum + s.marksObtained,
      0
    );

    return totalMax > 0
      ? Math.round((totalObtained / totalMax) * 100)
      : 0;
  };

  /* ✅ LOW PERFORMERS */
  const lowStudents = useMemo(() => {
    return students.filter((s) => getMarksPercentage(s) < 50);
  }, [students]);

  /* ✅ CLASS AVERAGE */
  const classAverage = useMemo(() => {
    if (!students.length) return 0;

    const total = students.reduce(
      (sum, s) => sum + getMarksPercentage(s),
      0
    );

    return Math.round(total / students.length);
  }, [students]);

  /* ✅ SUBJECT TOPPERS */
  const subjectToppers = useMemo(() => {
    if (!students.length) return {};

    const result = {};

    students.forEach((student) => {
      student.performance?.forEach((sub) => {
        if (!result[sub.subject]) {
          result[sub.subject] = {
            name: student.name,
            marks: sub.marksObtained,
          };
        } else if (sub.marksObtained > result[sub.subject].marks) {
          result[sub.subject] = {
            name: student.name,
            marks: sub.marksObtained,
          };
        }
      });
    });

    return result;
  }, [students]);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome Back, Teacher!
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your classes and track student performance
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <StatCard title="Total Students" value={students.length} icon={<Users className="w-6 h-6" />} color="blue" />
          <StatCard title="Classes Today" value={teacherClasses?.length || 0} icon={<BookOpen className="w-6 h-6" />} color="purple" />
          <StatCard title="Attendance %" value="92%" icon={<CalendarDays className="w-6 h-6" />} color="green" />
          <StatCard title="Low Performers" value={lowStudents.length} icon={<AlertTriangle className="w-6 h-6" />} color="orange" />
          <StatCard title="Class Average" value={`${classAverage}%`} icon={<BookOpen className="w-6 h-6" />} color="green" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">

            {/* STUDENT OVERVIEW */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">
                Quick Student Overview
              </h2>

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
                    {students.map((s) => {
                      const totalDays = s.attendance?.length || 0;
                      const presentDays = s.attendance?.filter(
                        (a) => a.status === "Present"
                      ).length || 0;

                      const attendancePercent =
                        totalDays > 0
                          ? Math.round((presentDays / totalDays) * 100)
                          : 0;

                      const marksPercent = getMarksPercentage(s);

                      return (
                        <tr key={s.id} className="border-b hover:bg-gray-50 transition">
                          <td className="px-4 py-2 font-medium">{s.name}</td>
                          <td className="px-4 py-2">{attendancePercent}%</td>
                          <td className="px-4 py-2">{marksPercent}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SUBJECT TOPPERS */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">
                Subject Toppers
              </h2>

              <div className="space-y-3">
                {Object.entries(subjectToppers).map(([subject, data]) => (
                  <div key={subject} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="font-semibold text-green-900">{subject}</p>
                    <p className="text-sm text-green-700">
                      {data.name} — {data.marks}%
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">
                Students Need Attention
              </h2>

              {lowStudents.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">
                  All students are doing well!
                </p>
              ) : (
                lowStudents.map((s) => (
                  <div key={s.id} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-orange-900 font-medium">{s.name}</p>
                    <p className="text-xs text-orange-700 mt-1">
                      Marks: {getMarksPercentage(s)}%
                    </p>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

/* STAT CARD */
function StatCard({ title, value, icon, color }) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    green: "bg-green-50 text-green-600 border-green-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
  };

  return (
    <div className={`rounded-lg p-6 shadow-sm border transition-all hover:shadow-md ${colorClasses[color]}`}>
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