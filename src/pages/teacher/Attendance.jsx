import { useContext, useState } from "react";
import { SchoolContext } from "../../context/SchoolContext";

export default function Attendance() {
  const today = new Date().toISOString().split("T")[0];

  // ⭐ GET DATA FROM SCHOOL CONTEXT
  const {
    students,
    activeStudentId,
    setActiveStudentId,
    markAttendance,
  } = useContext(SchoolContext);

  // ---------- STORAGE KEYS ----------
  const DATE_KEY = "attendance_saved_dates";

  // ---------- LOAD LOCKED DATES ----------
  let initialSavedDates = [];
  try {
    const d = JSON.parse(localStorage.getItem(DATE_KEY));
    if (Array.isArray(d)) initialSavedDates = d;
  } catch {
    // Intentionally ignore parsing errors
  }

  const [savedDates, setSavedDates] = useState(initialSavedDates);
  const isTodayLocked = savedDates.includes(today);

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-3">
        Attendance – Teacher
      </h1>

      {/* ⭐ TEACHER STUDENT SELECTOR */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">
          Select Student:
        </label>

        <select
          value={activeStudentId}
          onChange={(e) =>
            setActiveStudentId(Number(e.target.value))
          }
          className="border px-3 py-1 rounded"
        >
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
      </div>

      <p className="mb-4">
        Date: {today}
        {isTodayLocked && (
          <span className="text-red-600 ml-2">
            (Attendance Locked)
          </span>
        )}
      </p>

      {students
        .filter((student) => student.id === activeStudentId)
        .map((student) => {
          const percentage = calculatePercentage(student.attendance);
          const isLowAttendance = percentage < 75;
          // Find today's attendance status
          const todayRecord = Array.isArray(student.attendance)
            ? student.attendance.find((a) => a.date === today)
            : null;
          const todayStatus = todayRecord ? todayRecord.status : null;
          return (
            <div
              key={student.id}
              className="border p-4 mb-3 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{student.name}</p>
                <p className="text-sm">
                  Attendance: {percentage}%
                  {isLowAttendance && (
                    <span className="text-red-600 ml-2">⚠ Low Attendance</span>
                  )}
                </p>
                <p className="text-xs mt-1">
                  Today's Status: {todayStatus ? todayStatus : "Not Marked"}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  disabled={isTodayLocked}
                  onClick={() => markAttendance(student.id, "Present")}
                  className={`px-3 py-1 rounded text-white ${
                    isTodayLocked
                      ? "bg-gray-400"
                      : todayStatus === "Present"
                        ? "bg-green-700"
                        : "bg-green-600"
                  }`}
                >
                  Present
                </button>
                <button
                  disabled={isTodayLocked}
                  onClick={() => markAttendance(student.id, "Absent")}
                  className={`px-3 py-1 rounded text-white ${
                    isTodayLocked
                      ? "bg-gray-400"
                      : todayStatus === "Absent"
                        ? "bg-red-700"
                        : "bg-red-600"
                  }`}
                >
                  Absent
                </button>
              </div>
            </div>
          );
        })}

      <button
        disabled={isTodayLocked}
        onClick={saveAttendance}
        className={`mt-4 px-4 py-2 rounded text-white ${
          isTodayLocked
            ? "bg-gray-400"
            : "bg-blue-700"
        }`}
      >
        {isTodayLocked
          ? "Attendance Locked"
          : "Save Attendance"}
      </button>
    </div>
  );
}
