import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { students as studentData } from "../../data/dummydata";

export default function Students() {
  const navigate = useNavigate();

  const [students] = useState(() => {
    const stored = localStorage.getItem("students_data");
    return stored ? JSON.parse(stored) : studentData;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Students</h2>
        <p className="text-gray-600">
          List of all students assigned to you
        </p>
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
            {students.map((student) => (
              <tr
                key={student.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4">{student.id}</td>

                <td className="p-4 font-medium">
                  {student.name}
                </td>

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