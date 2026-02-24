import { useState } from "react";
import { useSchool } from "../../context/SchoolContext";

export default function Remarks() {
  const { students, updateStudent } = useSchool();

  const [selectedStudentId, setSelectedStudentId] = useState("");
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
    <div className="max-w-3xl p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Student Remarks
      </h1>

      <div className="mb-4">
        <label className="mb-1 block font-medium">
          Select Student
        </label>

        <select
          value={selectedStudentId}
          onChange={(e) =>
            setSelectedStudentId(e.target.value)
          }
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

      <div className="mb-6">
        <label className="mb-1 block font-medium">
          Teacher Remark
        </label>

        <textarea
          rows="4"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="Enter academic or behavioral feedback..."
          className="w-full resize-none rounded border px-3 py-2"
        />
      </div>

      <button
        onClick={handleSave}
        className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
      >
        Save Remark
      </button>

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