import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { classes, students, parents } from "../../../data/dummydata";

export default function ClassDetails() {
  const { className } = useParams(); 
  // className example: "8th Standard – A"

  /* ================= FIND CLASS ================= */

  const selectedClass = useMemo(() => {
    return classes.find(
      (cls) => `${cls.class}th Standard – ${cls.section}` === className
    );
  }, [className]);

  /* ================= FILTER STUDENTS ================= */

  const classStudents = useMemo(() => {
    return students.filter(
      (student) => student.class === className
    );
  }, [className]);

  /* ================= COUNT BOYS / GIRLS ================= */

  const boysCount = classStudents.filter(s => s.gender === "Boy").length;
  const girlsCount = classStudents.filter(s => s.gender === "Girl").length;

  if (!selectedClass) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold text-red-500">
          Class not found
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">

      {/* ================= CLASS HEADER ================= */}

      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold">
          {className}
        </h1>
        <p className="text-gray-500 mt-2">
          Section: {selectedClass.section}
        </p>
      </div>

      {/* ================= SUMMARY CARDS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-blue-50 rounded-2xl p-5 shadow">
          <h3 className="text-lg font-semibold text-blue-700">
            Total Students
          </h3>
          <p className="text-3xl font-bold mt-2">
            {classStudents.length}
          </p>
        </div>

        <div className="bg-green-50 rounded-2xl p-5 shadow">
          <h3 className="text-lg font-semibold text-green-700">
            Boys
          </h3>
          <p className="text-3xl font-bold mt-2">
            {boysCount}
          </p>
        </div>

        <div className="bg-pink-50 rounded-2xl p-5 shadow">
          <h3 className="text-lg font-semibold text-pink-700">
            Girls
          </h3>
          <p className="text-3xl font-bold mt-2">
            {girlsCount}
          </p>
        </div>

      </div>

      {/* ================= STUDENTS TABLE ================= */}

      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Students List
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Gender</th>
                <th className="p-3">Parent</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {classStudents.map((student) => {
                const parent = parents.find(
                  (p) => p.id === student.parentId
                );

                return (
                  <tr
                    key={student.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3">{student.id}</td>
                    <td className="p-3 font-medium">{student.name}</td>
                    <td className="p-3">{student.gender}</td>
                    <td className="p-3">
                      {parent ? parent.name : "-"}
                    </td>
                    <td className="p-3">
                      {parent ? parent.phone : "-"}
                    </td>
                    <td className="p-3">
                      <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                        {student.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {classStudents.length === 0 && (
            <p className="text-gray-500 mt-4">
              No students found in this class.
            </p>
          )}
        </div>
      </div>

    </div>
  );
}