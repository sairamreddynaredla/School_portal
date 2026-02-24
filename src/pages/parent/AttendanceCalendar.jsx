import { useMemo } from "react";
import useActiveStudent from "../../hooks/useActiveStudent";

export default function AttendanceCalendar() {
  const student = useActiveStudent();

  const attendanceData = useMemo(() => {
    return student?.attendance || [];
  }, [student]);

  const getStatusStyle = (status) => {
    if (status === "Present")
      return "bg-green-100 text-green-700 border-green-200";
    if (status === "Absent")
      return "bg-red-100 text-red-700 border-red-200";
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

  if (!student) {
    return <div className="p-6 text-gray-500">No student selected</div>;
  }

  return (
    <div className="max-w-4xl p-6">
      <h1 className="mb-2 text-2xl font-bold">
        Attendance Overview
      </h1>

      <p className="mb-6 text-gray-600">
        A quick visual of your child’s attendance this month
      </p>

      <div className="mb-6 grid grid-cols-4 gap-4">
        <div className="rounded bg-green-50 p-4 text-center">
          <p className="text-xl font-bold">{presentCount}</p>
          <p className="text-sm text-gray-600">Present</p>
        </div>

        <div className="rounded bg-red-50 p-4 text-center">
          <p className="text-xl font-bold">{absentCount}</p>
          <p className="text-sm text-gray-600">Absent</p>
        </div>

        <div className="rounded bg-yellow-50 p-4 text-center">
          <p className="text-xl font-bold">{lateCount}</p>
          <p className="text-sm text-gray-600">Late</p>
        </div>

        <div className="rounded bg-blue-50 p-4 text-center">
          <p className="text-xl font-bold">
            {attendancePercentage}%
          </p>
          <p className="text-sm text-gray-600">
            Attendance %
          </p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-7 gap-3">
        {attendanceData.map((day, index) => (
          <div
            key={index}
            className={`flex h-14 items-center justify-center rounded font-semibold ${getStatusStyle(
              day.status
            )}`}
          >
            {index + 1}
          </div>
        ))}
      </div>

      <div className="flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-green-500" />
          Present
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          Absent
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          Late
        </div>
      </div>
    </div>
  );
}