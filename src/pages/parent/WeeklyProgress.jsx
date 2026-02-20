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
    {
      week: "Overall",
      score: student?.performance?.percentage || 0,
    },
  ];

  const isImproving = weeklyData[weeklyData.length - 1].score > weeklyData[0].score;

  const getScoreColor = (score) => {
    if (score >= 75) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (!student) {
    return (
      <div className="text-gray-500 text-center py-8">
        No student selected
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        className={`p-5 rounded-lg mb-8 border ${
          isImproving
            ? "bg-green-50 border-green-200"
            : "bg-blue-50 border-blue-200"
        }`}
      >
        <div className="flex items-start gap-3">
          {isImproving ? (
            <TrendingUp className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          ) : (
            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          )}
          <div>
            <p className={`font-semibold ${
              isImproving ? "text-green-900" : "text-blue-900"
            }`}>
              {isImproving
                ? "📈 Your child is improving steadily"
                : "✓ Progress is stable — consistency is key"}
            </p>
            <p className={`text-sm mt-1 ${
              isImproving ? "text-green-700" : "text-blue-700"
            }`}>
              Focus on effort and growth. Small improvements compound over time.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-5">Performance by Subject</h3>
        <div className="space-y-5">
          {weeklyData.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">{item.week}</span>
                <span className={`font-bold text-lg ${
                  item.score >= 75 ? "text-green-600" : item.score >= 60 ? "text-yellow-600" : "text-red-600"
                }`}>
                  {item.score}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all ${
                    item.score >= 75 ? "bg-green-500" : item.score >= 60 ? "bg-yellow-400" : "bg-red-500"
                  }`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {item.score >= 75 ? "✓ Excellent" : item.score >= 60 ? "⚠ Good" : "✗ Needs Improvement"}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg border border-blue-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">❤️ Parent Tip</h4>
            <p className="text-sm text-blue-800">
              Praise effort and specific improvements. When your child works hard, acknowledge the dedication. This builds confidence and intrinsic motivation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
