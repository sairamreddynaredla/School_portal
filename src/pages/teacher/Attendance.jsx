import { useContext, useState } from "react";
import { SchoolContext } from "../../context/SchoolContext";

export default function Attendance() {
  const today = new Date().toISOString().split("T")[0];

  const { students, markAttendance } = useContext(SchoolContext);

  const DATE_KEY = "attendance_saved_dates";

  const [savedDates, setSavedDates] = useState(() => {
    try {
      const d = JSON.parse(localStorage.getItem(DATE_KEY));
      return Array.isArray(d) ? d : [];
    } catch {
      return [];
    }
  });

  const isTodayLocked = savedDates.includes(today);

  const unlockAttendance = () => {
    const updatedDates = savedDates.filter((date) => date !== today);
    localStorage.setItem(DATE_KEY, JSON.stringify(updatedDates));
    setSavedDates(updatedDates);
    alert("Attendance unlocked for today! You can now re-mark attendance.");
  };

  const allMarked = (students || []).every(
    (student) =>
      Array.isArray(student.attendance) &&
      student.attendance.some((a) => a.date === today)
  );

  const calculatePercentage = (attendance = []) => {
    const totalDays = attendance.length;
    if (totalDays === 0) return 0;

    const presentDays = attendance.filter(
      (a) => a.status === "Present"
    ).length;

    return Math.round((presentDays / totalDays) * 100);
  };

  const saveAttendance = () => {
    const updatedDates = [...savedDates, today];
    localStorage.setItem(DATE_KEY, JSON.stringify(updatedDates));
    setSavedDates(updatedDates);

    alert("Attendance saved and locked for today!");
  };

  return (
    <div className="p-6 pb-32">
      <h1 className="mb-3 text-2xl font-bold">
        Attendance – Teacher
      </h1>

      <div className="sticky top-0 z-10 mb-6 flex items-center justify-between border-b bg-white py-2">
        <div className="text-lg font-semibold">
          Date: {today}
        </div>

        {isTodayLocked && (
          <span className="font-medium text-red-600">
            Attendance Locked
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {(students || []).map((student) => {
          const percentage = calculatePercentage(
            student.attendance
          );

          const isLowAttendance = percentage < 75;

          const todayRecord = Array.isArray(student.attendance)
            ? student.attendance.find(
                (a) => a.date === today
              )
            : null;

          const todayStatus = todayRecord
            ? todayRecord.status
            : null;

          return (
            <div
              key={student.id}
              className="flex flex-col gap-3 rounded-xl border bg-white p-6 shadow transition-all hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">
                  {student.name}
                </span>

                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    isLowAttendance
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {percentage}%
                </span>
              </div>

              <div className="mt-2 flex gap-2">
                <button
                  disabled={isTodayLocked}
                  onClick={() =>
                    markAttendance(student.id, "Present")
                  }
                  className={`flex-1 rounded px-3 py-2 font-semibold ${
                    isTodayLocked
                      ? "cursor-not-allowed bg-gray-200 text-gray-400"
                      : todayStatus === "Present"
                      ? "border-2 border-green-800 bg-green-600 text-white"
                      : "bg-green-100 text-green-800 hover:bg-green-200"
                  }`}
                >
                  Present
                </button>

                <button
                  disabled={isTodayLocked}
                  onClick={() =>
                    markAttendance(student.id, "Absent")
                  }
                  className={`flex-1 rounded px-3 py-2 font-semibold ${
                    isTodayLocked
                      ? "cursor-not-allowed bg-gray-200 text-gray-400"
                      : todayStatus === "Absent"
                      ? "border-2 border-red-800 bg-red-600 text-white"
                      : "bg-red-100 text-red-800 hover:bg-red-200"
                  }`}
                >
                  Absent
                </button>
              </div>

              <div className="mt-2 text-xs text-gray-500">
                Today's Status:
                <span className="font-semibold">
                  {todayStatus
                    ? todayStatus
                    : " Not Marked"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-0 left-0 z-20 flex w-full flex-col items-center justify-center gap-4 border-t bg-white py-4 md:flex-row">
        <button
          disabled={isTodayLocked || !allMarked}
          onClick={saveAttendance}
          className={`rounded-lg px-8 py-3 text-lg font-bold shadow ${
            isTodayLocked || !allMarked
              ? "cursor-not-allowed bg-gray-300 text-gray-500"
              : "bg-blue-700 text-white hover:bg-blue-800"
          }`}
        >
          {isTodayLocked
            ? "Attendance Locked"
            : !allMarked
            ? "Mark all students first"
            : "Save & Lock Attendance"}
        </button>

        {isTodayLocked && (
          <button
            onClick={unlockAttendance}
            className="rounded-lg bg-yellow-500 px-6 py-3 text-lg font-bold text-white shadow hover:bg-yellow-600"
          >
            Unlock Attendance
          </button>
        )}
      </div>
    </div>
  );
}