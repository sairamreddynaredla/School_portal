import { useContext, useState } from "react";
import { SchoolContext } from "../../context/SchoolContext";

export default function Attendance() {
  const today = new Date().toISOString().split("T")[0];

  // ⭐ GET DATA FROM SCHOOL CONTEXT
  const { students, markAttendance } = useContext(SchoolContext);

  // ---------- STORAGE KEY ----------
  const DATE_KEY = "attendance_saved_dates";

  // ✅ PRO WAY: Lazy load saved dates (runs only once)
  const [savedDates, setSavedDates] = useState(() => {
    try {
      const d = JSON.parse(localStorage.getItem(DATE_KEY));
      return Array.isArray(d) ? d : [];
    } catch {
      // ignore localStorage parse errors
      return [];
    }
  });

  const isTodayLocked = savedDates.includes(today);

  // Unlock attendance for today
  const unlockAttendance = () => {
    const updatedDates = savedDates.filter((date) => date !== today);
    localStorage.setItem(DATE_KEY, JSON.stringify(updatedDates));
    setSavedDates(updatedDates);
    alert("Attendance unlocked for today! You can now re-mark attendance.");
  };

  // Check if all students marked
  const allMarked = (students || []).every(
    (student) =>
      Array.isArray(student.attendance) &&
      student.attendance.some((a) => a.date === today)
  );

  // ---------- CALCULATE ATTENDANCE % ----------
  const calculatePercentage = (attendance = []) => {
    const totalDays = attendance.length;
    if (totalDays === 0) return 0;

    const presentDays = attendance.filter(
      (a) => a.status === "Present"
    ).length;

    return Math.round((presentDays / totalDays) * 100);
  };

  // ---------- SAVE + LOCK ----------
  const saveAttendance = () => {
    const updatedDates = [...savedDates, today];
    localStorage.setItem(DATE_KEY, JSON.stringify(updatedDates));
    setSavedDates(updatedDates);

    alert("Attendance saved and locked for today!");
  };

  return (
    <div className="p-6 pb-32">
      <h1 className="text-2xl font-bold mb-3">
        Attendance – Teacher
      </h1>

      {/* ===== DATE HEADER ===== */}
      <div className="mb-6 flex items-center justify-between sticky top-0 bg-white z-10 py-2 border-b">
        <div className="text-lg font-semibold">Date: {today}</div>
        {isTodayLocked && (
          <span className="text-red-600 font-medium">
            Attendance Locked
          </span>
        )}
      </div>

      {/* ===== STUDENT CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(students || []).map((student) => {
          const percentage = calculatePercentage(student.attendance);
          const isLowAttendance = percentage < 75;

          const todayRecord = Array.isArray(student.attendance)
            ? student.attendance.find((a) => a.date === today)
            : null;

          const todayStatus = todayRecord ? todayRecord.status : null;

          return (
            <div
              key={student.id}
              className="rounded-xl shadow border p-6 flex flex-col gap-3 bg-white hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg">
                  {student.name}
                </span>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    isLowAttendance
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {percentage}%
                </span>
              </div>

              {/* ===== BUTTONS ===== */}
              <div className="flex gap-2 mt-2">
                <button
                  disabled={isTodayLocked}
                  onClick={() =>
                    markAttendance(student.id, "Present")
                  }
                  className={`flex-1 px-3 py-2 rounded font-semibold ${
                    isTodayLocked
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : todayStatus === "Present"
                      ? "bg-green-600 text-white border-2 border-green-800"
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
                  className={`flex-1 px-3 py-2 rounded font-semibold ${
                    isTodayLocked
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : todayStatus === "Absent"
                      ? "bg-red-600 text-white border-2 border-red-800"
                      : "bg-red-100 text-red-800 hover:bg-red-200"
                  }`}
                >
                  Absent
                </button>
              </div>

              <div className="text-xs text-gray-500 mt-2">
                Today's Status:
                <span className="font-semibold">
                  {todayStatus ? todayStatus : " Not Marked"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== SAVE BAR ===== */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t py-4 flex flex-col md:flex-row justify-center items-center gap-4 z-20">
        <button
          disabled={isTodayLocked || !allMarked}
          onClick={saveAttendance}
          className={`px-8 py-3 rounded-lg text-lg font-bold shadow ${
            isTodayLocked || !allMarked
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
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
            className="px-6 py-3 rounded-lg text-lg font-bold bg-yellow-500 text-white hover:bg-yellow-600 shadow"
          >
            Unlock Attendance
          </button>
        )}
      </div>
    </div>
  );
}