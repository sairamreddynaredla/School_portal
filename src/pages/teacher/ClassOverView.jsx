import { useSchool } from "../../context/SchoolContext";

export default function ClassOverView() {
  const { students } = useSchool();

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

  return (
    <div className="max-w-6xl p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Class Overview
      </h1>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
        <StatCard
          title="Total Students"
          value={totalStudents}
        />

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

      <div className="mb-8 rounded bg-blue-50 p-4">
        <h2 className="mb-1 font-semibold">
          🏆 Top Performer
        </h2>
        <p className="text-lg font-bold">
          {topPerformer}
        </p>
      </div>

      <div className="rounded bg-white shadow">
        <h2 className="border-b p-4 text-lg font-semibold">
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
                  <div className="h-2 w-40 rounded-full bg-gray-200">
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

function StatCard({ title, value, color = "" }) {
  return (
    <div className="rounded bg-white p-4 shadow">
      <p className="text-sm text-gray-500">
        {title}
      </p>
      <p className={`text-2xl font-bold ${color}`}>
        {value}
      </p>
    </div>
  );
}