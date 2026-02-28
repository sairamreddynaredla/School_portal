import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  classes,
  students,
  teacherClasses,
  teachers,
} from "../../../data/dummydata";

export default function ClassesList() {
  const navigate = useNavigate();

  const classData = useMemo(() => {
    return classes.map((cls) => {
      const className = `${cls.class}th Standard – ${cls.section}`;

      const classStudents = students.filter(
        (student) => student.class === className
      );

      const totalStudents = classStudents.length;

      const boys = classStudents.filter(
        (s) => s.gender === "Boy"
      ).length;

      const girls = classStudents.filter(
        (s) => s.gender === "Girl"
      ).length;

      /* ===== Attendance % Calculation ===== */

      let totalAttendanceRecords = 0;
      let totalPresent = 0;

      classStudents.forEach((student) => {
        student.attendance.forEach((record) => {
          totalAttendanceRecords++;
          if (record.status === "Present") {
            totalPresent++;
          }
        });
      });

      const attendancePercent =
        totalAttendanceRecords > 0
          ? ((totalPresent / totalAttendanceRecords) * 100).toFixed(1)
          : 0;

      /* ===== Class Teacher (First Assigned Teacher) ===== */

      const assignedTeacher = teacherClasses.find(
        (tc) => tc.class === className
      );

      const teacherName = assignedTeacher
        ? teachers.find((t) => t.id === assignedTeacher.teacherId)?.name
        : "Not Assigned";

      return {
        className,
        totalStudents,
        boys,
        girls,
        attendancePercent,
        teacherName,
      };
    });
  }, []);

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Classes Overview
        </h1>
        <div className="bg-blue-50 px-4 py-2 rounded-xl font-semibold">
          Total Classes: {classes.length}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-xl rounded-2xl p-6 overflow-x-auto">

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-3 text-left">Class</th>
              <th className="p-3 text-left">Class Teacher</th>
              <th className="p-3 text-left">Students</th>
              <th className="p-3 text-left">Boys</th>
              <th className="p-3 text-left">Girls</th>
              <th className="p-3 text-left">Attendance %</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {classData.map((cls, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3 font-semibold">
                  {cls.className}
                </td>
                <td className="p-3">
                  {cls.teacherName}
                </td>
                <td className="p-3">
                  {cls.totalStudents}
                </td>
                <td className="p-3">
                  {cls.boys}
                </td>
                <td className="p-3">
                  {cls.girls}
                </td>
                <td className="p-3">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {cls.attendancePercent}%
                  </span>
                </td>
                <td className="p-3">
                  <button
                    onClick={() =>
                      navigate(`/admin/classes/${cls.className}`)
                    }
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}