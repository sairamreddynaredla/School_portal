import { useState } from "react";
import { useSchool } from "../../context/SchoolContext";

export default function Performance() {
  const { students, updateMarks } = useSchool();

  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [marks, setMarks] = useState({});
  const [message, setMessage] = useState("");

  const selectedStudent = students.find(
    (s) => s.id === Number(selectedStudentId)
  );

  const currentMarks =
    Object.keys(marks).length > 0
      ? marks
      : selectedStudent?.performance || {};

  const percentage = (() => {
    const values = Object.entries(currentMarks)
      .filter(
        ([key]) => key !== "percentage" && key !== "grade"
      )
      .map(([, v]) => Number(v));

    const total = values.reduce((a, b) => a + b, 0);

    return values.length
      ? (total / values.length).toFixed(2)
      : 0;
  })();

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
    <div className="max-w-4xl p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Student Performance Entry
      </h1>

      <div className="mb-4">
        <label className="mb-1 block font-medium">
          Select Student
        </label>

        <select
          value={selectedStudentId}
          onChange={(e) => {
            setSelectedStudentId(e.target.value);
            setMarks({});
          }}
          className="w-full rounded border px-3 py-2"
        >
          <option value="">
            -- Choose Student --
          </option>

          {students.map((student) => (
            <option
              key={student.id}
              value={student.id}
            >
              {student.name}
            </option>
          ))}
        </select>
      </div>

      {selectedStudent && (
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {Object.entries(currentMarks)
            .filter(
              ([key]) =>
                key !== "percentage" &&
                key !== "grade"
            )
            .map(([subject, value]) => (
              <div key={subject}>
                <label className="mb-1 block capitalize">
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
                  className="w-full rounded border px-3 py-2"
                />
              </div>
            ))}
        </div>
      )}

      {selectedStudent && (
        <div className="mb-6 rounded bg-gray-100 p-4">
          <p className="text-lg">
            Percentage:
            <strong> {percentage}%</strong>
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

      <button
        onClick={handleSave}
        className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
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