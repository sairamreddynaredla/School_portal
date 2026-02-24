import { useMemo } from "react";
import useActiveStudent from "../../hooks/useActiveStudent";

export default function AttendanceCalendar() {
  // ⭐ Get active student
  const student = useActiveStudent();

  // ⭐ Memoized attendance data (safe fallback)
  const attendanceData = useMemo(() => {
    return student?.attendance || [];
  }, [student]);

  const getStatusStyle = (status) => {
    if (status === "Present") return "bg-green-100 text-green-700 border-green-200";
    if (status === "Absent") return "bg-red-100 text-red-700 border-red-200";
    return "bg-yellow-100 text-yellow-700 border-yellow-200";
  };

  const presentCount = useMemo(
    () => attendanceData.filter((a) => a.status === "Present").length,
    [attendanceData]
  );

  const absentCount = useMemo(
    () => attendanceData.filter((a) => a.status === "Absent").length,
    [attendanceData]
  );

  const lateCount = attendanceData.length - presentCount - absentCount;

  const attendancePercentage = attendanceData.length
    ? Math.round((presentCount / attendanceData.length) * 100)
    : 0;

  // ⭐ Safety check
  if (!student) {
    return <div className="p-6 text-gray-500">No student selected</div>;
  }

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-2">Attendance Overview</h1>

      <p className="text-gray-600 mb-6">
        A quick visual of your child’s attendance this month
      </p>

      {/* ✅ Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded text-center">
          <p className="text-xl font-bold">{presentCount}</p>
          <p className="text-sm text-gray-600">Present</p>
        </div>

        <div className="bg-red-50 p-4 rounded text-center">
          <p className="text-xl font-bold">{absentCount}</p>
          <p className="text-sm text-gray-600">Absent</p>
        </div>

        <div className="bg-yellow-50 p-4 rounded text-center">
          <p className="text-xl font-bold">{lateCount}</p>
          <p className="text-sm text-gray-600">Late</p>
        </div>

        <div className="bg-blue-50 p-4 rounded text-center">
          <p className="text-xl font-bold">{attendancePercentage}%</p>
          <p className="text-sm text-gray-600">Attendance %</p>
        </div>
      </div>

      {/* ✅ Calendar Grid */}
      <div className="grid grid-cols-7 gap-3 mb-6">
        {attendanceData.map((day, index) => (
          <div
            key={index}
            className={`h-14 flex items-center justify-center rounded font-semibold ${getStatusStyle(
              day.status
            )}`}
          >
            {index + 1}
          </div>
        ))}
      </div>

      {/* ✅ Legend */}
      <div className="flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full" />
          Present
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full" />
          Absent
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-yellow-400 rounded-full" />
          Late
        </div>
      </div>
    </div>
  );
}