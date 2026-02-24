import { TrendingUp } from "lucide-react";
import useActiveStudent from "../../hooks/useActiveStudent";

export default function Marksheet() {
  const student = useActiveStudent();
  const performance = student?.performance || {};

  const subjects = Object.entries(performance).filter(
    ([key]) => key !== "percentage" && key !== "grade"
  );

  if (!student) {
    return (
      <div className="py-8 text-center text-gray-500">
        No student selected
      </div>
    );
  }

  const overallPercentage = performance.percentage || 0;
  const overallGrade = performance.grade || "-";

  return (
    <div className="w-full">
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
          <p className="text-sm font-medium text-blue-700">
            Overall Percentage
          </p>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {overallPercentage}%
          </p>
        </div>

        <div className="rounded-lg border border-purple-200 bg-purple-50 p-5">
          <p className="text-sm font-medium text-purple-700">
            Grade
          </p>
          <p className="mt-2 text-3xl font-bold text-purple-600">
            {overallGrade}
          </p>
        </div>

        <div className="rounded-lg border border-green-200 bg-green-50 p-5">
          <p className="text-sm font-medium text-green-700">
            Status
          </p>
          <p className="mt-2 text-xl font-bold text-green-600">
            {overallPercentage >= 60 ? "✓ Pass" : "✗ Fail"}
          </p>
        </div>
      </div>

      <div className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Subject-wise Performance
        </h2>

        {subjects.length === 0 ? (
          <p className="py-8 text-center text-gray-500">
            No marks data available
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Subject
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Marks
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Performance
                  </th>
                </tr>
              </thead>

              <tbody>
                {subjects.map(([subject, marks], index) => (
                  <tr
                    key={subject}
                    className={
                      index % 2 === 0
                        ? "bg-gray-50"
                        : "bg-white"
                    }
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 capitalize">
                      {subject}
                    </td>

                    <td className="px-4 py-3 text-sm font-bold text-gray-900">
                      {marks}/100
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                          marks >= 75
                            ? "bg-green-100 text-green-700"
                            : marks >= 60
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {marks >= 75
                          ? "✓ Excellent"
                          : marks >= 60
                          ? "⚠ Good"
                          : "✗ Needs Work"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-8 rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-5">
        <div className="flex items-start gap-3">
          <TrendingUp className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />

          <div>
            <p className="font-semibold text-blue-900">
              Performance Tips
            </p>
            <p className="mt-1 text-sm text-blue-800">
              Focus on weak subjects. Regular practice and seeking
              help from teachers can improve marks significantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}