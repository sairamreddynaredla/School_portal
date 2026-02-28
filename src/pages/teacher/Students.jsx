import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { students as studentData } from "../../data/dummydata";

export default function Students() {
  const navigate = useNavigate();
  const { className } = useParams();

  const [students] = useState(() => {
    const stored = localStorage.getItem("students_data");
    return stored ? JSON.parse(stored) : studentData;
  });

  const filteredStudents = className
    ? students.filter((s) => s.class === className)
    : students;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">
            Students {className ? `- Class ${className}` : ""}
          </h2>

          <p className="text-gray-600">
            {className
              ? `Students from Class ${className}`
              : "List of all students assigned to you"}
          </p>
        </div>

        {className && (
          <button
            onClick={() => navigate("/teacher/classes")}
            className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-300"
          >
            ← Back to Classes
          </button>
        )}
      </div>

      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Class</th>
              <th className="p-4">Attendance</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{student.id}</td>
                <td className="p-4 font-medium">{student.name}</td>
                <td className="p-4">{student.class}</td>
                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      (student.attendancePercentage || 0) < 75
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {student.attendancePercentage || 0}%
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() =>
                      navigate(`/teacher/student/${student.id}`)
                    }
                    className="font-medium text-blue-600 hover:underline"
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