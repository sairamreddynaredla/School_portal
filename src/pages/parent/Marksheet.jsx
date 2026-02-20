import { Award, TrendingUp } from "lucide-react";
import useActiveStudent from "../../hooks/useActiveStudent";

export default function Marksheet() {
  const student = useActiveStudent();
  const performance = student?.performance || {};

  const subjects = Object.entries(performance).filter(
    ([key]) => key !== "percentage" && key !== "grade"
  );

  if (!student) {
    return (
      <div className="text-gray-500 text-center py-8">
        No student selected
      </div>
    );
  }

  const overallPercentage = performance.percentage || 0;
  const overallGrade = performance.grade || "-";

  return (
    <div className="w-full">
      {/* Overall Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
          <p className="text-sm text-blue-700 font-medium">Overall Percentage</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{overallPercentage}%</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
          <p className="text-sm text-purple-700 font-medium">Grade</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">{overallGrade}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-5">
          <p className="text-sm text-green-700 font-medium">Status</p>
          <p className="text-xl font-bold text-green-600 mt-2">{overallPercentage >= 60 ? "✓ Pass" : "✗ Fail"}</p>
        </div>
      </div>

      {/* Subject Marks Table */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Subject-wise Performance</h2>

        {subjects.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No marks data available</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Subject</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Marks</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Performance</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map(([subject, marks], index) => (
                  <tr key={subject} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 capitalize">{subject}</td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-900">{marks}/100</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        marks >= 75 ? "bg-green-100 text-green-700" : marks >= 60 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                      }`}>
                        {marks >= 75 ? "✓ Excellent" : marks >= 60 ? "⚠ Good" : "✗ Needs Work"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Progress Insight */}
      <div className="mt-8 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-900">Performance Tips</p>
            <p className="text-sm text-blue-800 mt-1">Focus on weak subjects. Regular practice and seeking help from teachers can improve marks significantly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
