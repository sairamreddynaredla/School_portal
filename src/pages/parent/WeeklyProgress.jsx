import { TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import useActiveStudent from "../../hooks/useActiveStudent";

export default function WeeklyProgress() {
  const student = useActiveStudent();

  const weeklyData = [
    { week: "Maths", score: student?.performance?.maths || 0 },
    { week: "Physics", score: student?.performance?.physics || 0 },
    { week: "Chemistry", score: student?.performance?.chemistry || 0 },
    { week: "Biology", score: student?.performance?.biology || 0 },
    { week: "English", score: student?.performance?.english || 0 },
    { week: "Overall", score: student?.performance?.percentage || 0 },
  ];

  const isImproving =
    weeklyData[weeklyData.length - 1].score >
    weeklyData[0].score;

  if (!student) {
    return (
      <div className="py-8 text-center text-gray-500">
        No student selected
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        className={`mb-8 rounded-lg border p-5 ${
          isImproving
            ? "bg-green-50 border-green-200"
            : "bg-blue-50 border-blue-200"
        }`}
      >
        <div className="flex items-start gap-3">
          {isImproving ? (
            <TrendingUp className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
          ) : (
            <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
          )}

          <div>
            <p
              className={`font-semibold ${
                isImproving ? "text-green-900" : "text-blue-900"
              }`}
            >
              {isImproving
                ? "📈 Your child is improving steadily"
                : "✓ Progress is stable — consistency is key"}
            </p>

            <p
              className={`mt-1 text-sm ${
                isImproving ? "text-green-700" : "text-blue-700"
              }`}
            >
              Focus on effort and growth. Small improvements compound over time.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-5 text-sm font-semibold text-gray-900">
          Performance by Subject
        </h3>

        <div className="space-y-5">
          {weeklyData.map((item, index) => (
            <div key={index}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {item.week}
                </span>

                <span
                  className={`text-lg font-bold ${
                    item.score >= 75
                      ? "text-green-600"
                      : item.score >= 60
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {item.score}%
                </span>
              </div>

              <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className={`h-3 rounded-full transition-all ${
                    item.score >= 75
                      ? "bg-green-500"
                      : item.score >= 60
                      ? "bg-yellow-400"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${item.score}%` }}
                />
              </div>

              <p className="mt-1 text-xs text-gray-500">
                {item.score >= 75
                  ? "✓ Excellent"
                  : item.score >= 60
                  ? "⚠ Good"
                  : "✗ Needs Improvement"}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-5">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />

          <div>
            <h4 className="mb-1 font-semibold text-blue-900">
              ❤️ Parent Tip
            </h4>

            <p className="text-sm text-blue-800">
              Praise effort and specific improvements. When your child works
              hard, acknowledge the dedication. This builds confidence and
              intrinsic motivation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}