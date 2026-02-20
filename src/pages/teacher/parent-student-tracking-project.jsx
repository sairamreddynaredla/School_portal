export default function Students() {
  // Dummy students stats (later from backend)
  const studentStats = {
    totalStudents: 30,
    averageAttendance: 82,
    averagePerformance: 74,
    lowAttendanceCount: 5,
  };

  const students = [
    {
      id: 1,
      name: "Rahul Kumar",
      attendance: 78,
      performance: 68,
    },
    {
      id: 2,
      name: "Anita Sharma",
      attendance: 92,
      performance: 92,
    },
    {
      id: 3,
      name: "Suresh Reddy",
      attendance: 65,
      performance: 55,
    },
    {
      id: 4,
      name: "Pooja Singh",
      attendance: 81,
      performance: 61,
    },
  ];

  return (
    <div className="p-6 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">
        Students
      </h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-gray-500 text-sm">Total Students</p>
          <p className="text-2xl font-bold">
            {studentStats.totalStudents}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-gray-500 text-sm">Avg Attendance</p>
          <p className="text-2xl font-bold text-blue-600">
            {studentStats.averageAttendance}%
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-gray-500 text-sm">Avg Performance</p>
          <p className="text-2xl font-bold text-green-600">
            {studentStats.averagePerformance}%
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-gray-500 text-sm">Low Attendance</p>
          <p className="text-2xl font-bold text-red-600">
            {studentStats.lowAttendanceCount}
          </p>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white dark:bg-gray-900 rounded shadow">
        <h2 className="text-lg font-semibold p-4 border-b">
          Student Performance Summary
        </h2>

        <div className="divide-y">
          {students.map((student) => (
            <div
              key={student.id}
              className="flex items-center justify-between p-4"
            >
              <p className="font-medium">
                {student.name}
              </p>

              <div className="flex items-center gap-6">
                <p>
                  Attendance:{" "}
                  <span
                    className={`font-semibold ${
                      student.attendance < 75
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {student.attendance}%
                  </span>
                </p>

                <p>
                  Performance:{" "}
                  <span
                    className={`font-semibold ${
                      student.performance < 60
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {student.performance}%
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
