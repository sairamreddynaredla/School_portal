import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { students, parents } from "../../../data/dummydata";

export default function StudentProfile() {
  const { id } = useParams();

  /* ================= FIND STUDENT ================= */

  const student = useMemo(() => {
    return students.find((s) => String(s.id) === String(id));
  }, [id]);

  const parent = useMemo(() => {
    if (!student) return null;
    return parents.find((p) => p.id === student.parentId);
  }, [student]);

  /* ================= CALCULATE PERFORMANCE ================= */

  const totalMarks = useMemo(() => {
    if (!student) return 0;
    return student.performance.reduce(
      (acc, subject) => acc + subject.marksObtained,
      0
    );
  }, [student]);

  const maxMarks = student?.performance.length * 100 || 0;
  const percentage = maxMarks
    ? ((totalMarks / maxMarks) * 100).toFixed(2)
    : 0;

  if (!student) {
    return (
      <div className="p-6">
        <h2 className="text-red-500 text-xl font-semibold">
          Student Not Found
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">

      {/* ================= BASIC INFO ================= */}

      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4">
          {student.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <p><strong>ID:</strong> {student.id}</p>
          <p><strong>Class:</strong> {student.class}</p>
          <p><strong>Gender:</strong> {student.gender}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              {student.status}
            </span>
          </p>
        </div>
      </div>

      {/* ================= PARENT INFO ================= */}

      {parent && (
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            Parent Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <p><strong>Name:</strong> {parent.name}</p>
            <p><strong>Relation:</strong> {parent.relation}</p>
            <p><strong>Phone:</strong> {parent.phone}</p>
          </div>
        </div>
      )}

      {/* ================= ATTENDANCE ================= */}

      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Attendance
        </h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {student.attendance.map((record, index) => (
              <tr key={index} className="border-b">
                <td className="p-3">{record.date}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      record.status === "Present"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= PERFORMANCE ================= */}

      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Academic Performance
        </h2>

        <table className="w-full border-collapse mb-4">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-3 text-left">Subject</th>
              <th className="p-3 text-left">Marks</th>
              <th className="p-3 text-left">Result</th>
            </tr>
          </thead>
          <tbody>
            {student.performance.map((subject, index) => (
              <tr key={index} className="border-b">
                <td className="p-3">{subject.subject}</td>
                <td className="p-3">
                  {subject.marksObtained} / {subject.maxMarks}
                </td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      subject.marksObtained >= subject.passMarks
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {subject.marksObtained >= subject.passMarks
                      ? "Pass"
                      : "Fail"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right font-semibold text-lg">
          Total: {totalMarks} / {maxMarks} <br />
          Percentage: {percentage}%
        </div>
      </div>

    </div>
  );
}