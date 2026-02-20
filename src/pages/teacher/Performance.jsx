import { useState } from "react";
import { useSchool } from "../../context/SchoolContext";

export default function Performance() {
  const { students, updateMarks } = useSchool();

  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [marks, setMarks] = useState({});
  const [message, setMessage] = useState("");

  // ⭐ Find selected student from context
  const selectedStudent = students.find(
    (s) => s.id === Number(selectedStudentId)
  );

  // ⭐ Use student performance OR local edited marks
  const currentMarks =
    Object.keys(marks).length > 0
      ? marks
      : selectedStudent?.performance || {};

  // ⭐ Auto percentage
  const percentage = (() => {
    const values = Object.entries(currentMarks)
      .filter(
        ([key]) => key !== "percentage" && key !== "grade"
      )
      .map(([, v]) => Number(v));

    const total = values.reduce((a, b) => a + b, 0);

    return values.length ? (total / values.length).toFixed(2) : 0;
  })();

  // ⭐ Auto grade
  const grade = (() => {
    if (percentage >= 90) return "A+";
    if (percentage >= 75) return "A";
    if (percentage >= 60) return "B";
    if (percentage >= 40) return "C";
    return "Fail";
  })();

  const handleSave = () => {
    if (!selectedStudentId) {
      setMessage("⚠ Please select a student");
      return;
    }

    updateMarks(Number(selectedStudentId), {
      ...currentMarks,
      percentage: Number(percentage),
      grade,
    });

    setMessage("✅ Performance updated successfully");
    setMarks({});
    setSelectedStudentId("");
  };

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">
        Student Performance Entry
      </h1>

      {/* Student Selection */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Select Student
        </label>

        <select
          value={selectedStudentId}
          onChange={(e) => {
            setSelectedStudentId(e.target.value);
            setMarks({}); // reset edits when student changes
          }}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">-- Choose Student --</option>

          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
      </div>

      {/* ⭐ Dynamic Marks Inputs */}
      {selectedStudent && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {Object.entries(currentMarks)
            .filter(
              ([key]) =>
                key !== "percentage" && key !== "grade"
            )
            .map(([subject, value]) => (
              <div key={subject}>
                <label className="block mb-1 capitalize">
                  {subject}
                </label>

                <input
                  type="number"
                  value={value}
                  onChange={(e) =>
                    setMarks((prev) => ({
                      ...prev,
                      [subject]: e.target.value,
                    }))
                  }
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            ))}
        </div>
      )}

      {/* Result */}
      {selectedStudent && (
        <div className="bg-gray-100 p-4 rounded mb-6">
          <p className="text-lg">
            Percentage: <strong>{percentage}%</strong>
          </p>
          <p className="text-lg">
            Grade:{" "}
            <strong
              className={
                grade === "Fail"
                  ? "text-red-600"
                  : "text-green-600"
              }
            >
              {grade}
            </strong>
          </p>
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
      >
        Save Performance
      </button>

      {message && (
        <p className="mt-4 font-medium text-green-600">
          {message}
        </p>
      )}
    </div>
  );
}
