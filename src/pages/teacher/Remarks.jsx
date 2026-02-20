import { useState } from "react";
import { useSchool } from "../../context/SchoolContext";

export default function Remarks() {
  // ⭐ GET LIVE STUDENTS FROM CONTEXT
  const { students, updateStudent } = useSchool();

  const [selectedStudentId, setSelectedStudentId] =
    useState("");
  const [remark, setRemark] = useState("");
  const [message, setMessage] = useState("");

  const handleSave = () => {
    if (!selectedStudentId || !remark.trim()) {
      setMessage("⚠ Please select a student and enter remarks");
      return;
    }

    const student = students.find(
      (s) => s.id === Number(selectedStudentId)
    );

    // ⭐ Add remark to student (REAL UPDATE)
    updateStudent(student.id, {
      remarks: [
        ...(student.remarks || []),
        {
          id: Date.now(),
          text: remark,
          date: new Date().toLocaleDateString(),
        },
      ],
    });

    setMessage("✅ Remark saved successfully");

    setSelectedStudentId("");
    setRemark("");
  };

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">
        Student Remarks
      </h1>

      {/* ⭐ Student Selection */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Select Student
        </label>

        <select
          value={selectedStudentId}
          onChange={(e) =>
            setSelectedStudentId(e.target.value)
          }
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

      {/* ⭐ Remark Input */}
      <div className="mb-6">
        <label className="block mb-1 font-medium">
          Teacher Remark
        </label>

        <textarea
          rows="4"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="Enter academic or behavioral feedback..."
          className="w-full border rounded px-3 py-2 resize-none"
        />
      </div>

      {/* ⭐ Save Button */}
      <button
        onClick={handleSave}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
      >
        Save Remark
      </button>

      {/* ⭐ Message */}
      {message && (
        <p
          className={`mt-4 font-medium ${
            message.startsWith("⚠")
              ? "text-red-600"
              : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
