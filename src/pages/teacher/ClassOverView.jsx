import { useSchool } from "../../context/SchoolContext";

export default function ClassOverView() {
  // ⭐ Get LIVE students from context (dummy data comes here)
  const { students } = useSchool();

  // ==============================
  // 📊 CALCULATE CLASS STATS
  // ==============================

  const totalStudents = students.length;

  const averageAttendance =
    totalStudents > 0
      ? Math.round(
          students.reduce(
            (sum, s) => sum + (s.attendancePercentage || 0),
            0
          ) / totalStudents
        )
      : 0;

  const averagePerformance =
    totalStudents > 0
      ? Math.round(
          students.reduce(
            (sum, s) =>
              sum + (s.performance?.percentage || 0),
            0
          ) / totalStudents
        )
      : 0;

  const topPerformer =
    students.length > 0
      ? students.reduce((prev, curr) =>
          (curr.performance?.percentage || 0) >
          (prev.performance?.percentage || 0)
            ? curr
            : prev
        ).name
      : "N/A";

  const lowPerformers = students.filter(
    (s) => (s.performance?.percentage || 0) < 60
  ).length;

  // ==============================
  // 🎨 UI
  // ==============================

  return (
    <div className="p-6 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">
        Class Overview
      </h1>

      {/* ⭐ TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Students" value={totalStudents} />

        <StatCard
          title="Avg Attendance"
          value={`${averageAttendance}%`}
          color="text-blue-600"
        />

        <StatCard
          title="Avg Performance"
          value={`${averagePerformance}%`}
          color="text-green-600"
        />

        <StatCard
          title="Low Performers"
          value={lowPerformers}
          color="text-red-600"
        />
      </div>

      {/* ⭐ TOP PERFORMER */}
      <div className="bg-blue-50 p-4 rounded mb-8">
        <h2 className="font-semibold mb-1">
          🏆 Top Performer
        </h2>
        <p className="text-lg font-bold">{topPerformer}</p>
      </div>

      {/* ⭐ STUDENT PERFORMANCE LIST */}
      <div className="bg-white rounded shadow">
        <h2 className="text-lg font-semibold p-4 border-b">
          Student Performance Summary
        </h2>

        <div className="divide-y">
          {students.map((student) => {
            const performance =
              student.performance?.percentage || 0;

            return (
              <div
                key={student.id}
                className="flex items-center justify-between p-4"
              >
                <p className="font-medium">
                  {student.name}
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-40 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        performance >= 75
                          ? "bg-green-500"
                          : performance >= 60
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${performance}%` }}
                    />
                  </div>

                  <span className="font-medium">
                    {performance}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ==============================
   ⭐ REUSABLE STAT CARD
================================*/
function StatCard({ title, value, color = "" }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className={`text-2xl font-bold ${color}`}>
        {value}
      </p>
    </div>
  );
}
