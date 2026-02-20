import { useNavigate } from "react-router-dom";
import { useSchool } from "../../context/SchoolContext";
import { useState } from "react";

export default function StudentDetails() {
  const navigate = useNavigate();

  // ⭐ Use new universal updater
  const { students, activeStudentId, updateStudent } =
    useSchool();

  const student = students.find(
    (s) => s.id === activeStudentId
  );

  const [marks, setMarks] = useState(
    student?.performance || {}
  );

  if (!student) {
    return (
      <div className="p-6 text-gray-500">
        No student selected
      </div>
    );
  }

  // ⭐ Update attendance using updateStudent
  const handleUpdateAttendance = () => {
    const lastDate =
      student.attendance[student.attendance.length - 1].date;

    const updatedAttendance = student.attendance.map(
      (record) =>
        record.date === lastDate
          ? { ...record, status: "Absent" }
          : record
    );

    updateStudent(student.id, {
      attendance: updatedAttendance,
    });
  };

  // ⭐ Save marks using universal updater
  const handleSaveMarks = () => {
    updateStudent(student.id, {
      performance: marks,
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">
          Student Details
        </h2>
        <p className="text-gray-600">
          Teacher can update marks & attendance
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6 max-w-xl">
        <p className="mb-3">
          <strong>Name:</strong> {student.name}
        </p>

        <p className="mb-3">
          <strong>Class:</strong> {student.class}
        </p>

        <h3 className="font-semibold mt-6 mb-3">
          Edit Performance
        </h3>

        <div className="space-y-3">
          {Object.entries(marks)
            .filter(
              ([key]) =>
                key !== "percentage" && key !== "grade"
            )
            .map(([subject, value]) => (
              <div key={subject} className="flex gap-3">
                <label className="w-40 capitalize">
                  {subject}
                </label>

                <input
                  type="number"
                  value={value}
                  onChange={(e) =>
                    setMarks((prev) => ({
                      ...prev,
                      [subject]: Number(e.target.value),
                    }))
                  }
                  className="border p-1 rounded w-full"
                />
              </div>
            ))}
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Back
          </button>

          <button
            onClick={handleUpdateAttendance}
            className="px-4 py-2 bg-yellow-500 text-white rounded"
          >
            Update Attendance
          </button>

          <button
            onClick={handleSaveMarks}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save Marks
          </button>
        </div>
      </div>
    </div>
  );
}
