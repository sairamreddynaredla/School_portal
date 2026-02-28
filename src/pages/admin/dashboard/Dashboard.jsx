import { useMemo } from "react";
import {
  students,
  teachers,
  classes,
  teacherClasses,
} from "../../../data/dummydata";

export default function Dashboard() {

  /* ================= BASIC COUNTS ================= */

  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalClasses = classes.length;
  const totalAssignments = teacherClasses.length;

  /* ================= GENDER STATS ================= */

  const boys = students.filter((s) => s.gender === "Boy").length;
  const girls = students.filter((s) => s.gender === "Girl").length;

  /* ================= ATTENDANCE % ================= */

  const attendancePercent = useMemo(() => {
    let totalRecords = 0;
    let totalPresent = 0;

    students.forEach((student) => {
      student.attendance.forEach((record) => {
        totalRecords++;
        if (record.status === "Present") {
          totalPresent++;
        }
      });
    });

    return totalRecords > 0
      ? ((totalPresent / totalRecords) * 100).toFixed(1)
      : 0;
  }, []);

  /* ================= AVERAGE PERFORMANCE ================= */

  const averagePerformance = useMemo(() => {
    let totalMarks = 0;
    let totalSubjects = 0;

    students.forEach((student) => {
      student.performance.forEach((subject) => {
        totalMarks += subject.marksObtained;
        totalSubjects++;
      });
    });

    return totalSubjects > 0
      ? (totalMarks / totalSubjects).toFixed(1)
      : 0;
  }, []);

  return (
    <div className="p-6 space-y-8">

      {/* ================= HEADER ================= */}

      <h1 className="text-2xl font-bold">
        Admin Dashboard
      </h1>

      {/* ================= STATS CARDS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-white shadow-xl rounded-2xl p-6">
          <h3 className="text-gray-500">Total Students</h3>
          <p className="text-3xl font-bold mt-2">
            {totalStudents}
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6">
          <h3 className="text-gray-500">Total Teachers</h3>
          <p className="text-3xl font-bold mt-2">
            {totalTeachers}
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6">
          <h3 className="text-gray-500">Total Classes</h3>
          <p className="text-3xl font-bold mt-2">
            {totalClasses}
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6">
          <h3 className="text-gray-500">Class Assignments</h3>
          <p className="text-3xl font-bold mt-2">
            {totalAssignments}
          </p>
        </div>

      </div>

      {/* ================= SECOND ROW ================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-blue-50 shadow-xl rounded-2xl p-6">
          <h3 className="text-gray-600">Boys</h3>
          <p className="text-2xl font-bold mt-2">
            {boys}
          </p>
        </div>

        <div className="bg-pink-50 shadow-xl rounded-2xl p-6">
          <h3 className="text-gray-600">Girls</h3>
          <p className="text-2xl font-bold mt-2">
            {girls}
          </p>
        </div>

        <div className="bg-green-50 shadow-xl rounded-2xl p-6">
          <h3 className="text-gray-600">Overall Attendance</h3>
          <p className="text-2xl font-bold mt-2">
            {attendancePercent}%
          </p>
        </div>

      </div>

      {/* ================= PERFORMANCE SUMMARY ================= */}

      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Academic Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600">Average Marks (All Subjects)</p>
            <p className="text-3xl font-bold mt-2">
              {averagePerformance} / 100
            </p>
          </div>

          <div>
            <p className="text-gray-600">System Health</p>
            <p className="text-3xl font-bold mt-2 text-green-600">
              Active
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}