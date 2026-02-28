import { TrendingUp } from "lucide-react";
import useActiveStudent from "../../hooks/useActiveStudent";

export default function Marksheet() {
  const student = useActiveStudent();

  if (!student) {
    return (
      <div className="py-8 text-center text-gray-500">
        No student selected
      </div>
    );
  }

  const subjects = student.performance || [];

  /* CALCULATIONS */
  const totalMax = subjects.reduce(
    (sum, s) => sum + s.maxMarks,
    0
  );

  const totalObtained = subjects.reduce(
    (sum, s) => sum + s.marksObtained,
    0
  );

  const percentage =
    totalMax > 0
      ? Math.round((totalObtained / totalMax) * 100)
      : 0;

  const getGrade = (percent) => {
    if (percent >= 90) return "A+";
    if (percent >= 80) return "A";
    if (percent >= 70) return "B";
    if (percent >= 60) return "C";
    return "D";
  };

  const grade = getGrade(percentage);

  const isPass = subjects.every(
    (s) => s.marksObtained >= s.passMarks
  );

  return (
    <div className="w-full">

      {/* SUMMARY CARDS */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">

        <Stat label="Total Marks" value={`${totalObtained} / ${totalMax}`} />
        <Stat label="Percentage" value={`${percentage}%`} />
        <Stat label="Grade" value={grade} />
        <Stat label="Result" value={isPass ? "PASS" : "FAIL"} />

      </div>

      {/* SUBJECT TABLE */}
      <div className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">
          Subject-wise Marks
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-3 text-left">Subject</th>
              <th className="p-3 text-left">Marks</th>
              <th className="p-3 text-left">Result</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((sub, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-50" : ""}
              >
                <td className="p-3">{sub.subject}</td>
                <td className="p-3">
                  {sub.marksObtained} / {sub.maxMarks}
                </td>
                <td className="p-3 font-semibold">
                  {sub.marksObtained >= sub.passMarks
                    ? "PASS"
                    : "FAIL"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PERFORMANCE TIP */}
      <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-5">
        <div className="flex gap-3">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          <p className="text-sm">
            Focus on weaker subjects. Regular revision and
            practice tests will improve overall performance.
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-lg border p-5 bg-gray-50">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}