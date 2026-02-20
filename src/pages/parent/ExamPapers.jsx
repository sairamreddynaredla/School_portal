import { Download, FileText } from "lucide-react";
import useActiveStudent from "../../hooks/useActiveStudent";

export default function ExamResult() {
  const student = useActiveStudent();
  const examResults = student?.examPapers || [];

  if (!student) {
    return (
      <div className="text-gray-500 text-center py-8">
        No student selected
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Exam Result</h1>
        <p className="text-gray-600">View your exam results and performance here</p>
      </div>

      {examResults.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 font-medium">No exam results available yet</p>
          <p className="text-gray-500 text-sm mt-1">Results will be added after exams</p>
        </div>
      ) : (
        <div className="space-y-6">
          {examResults.map((exam, exIndex) => (
            <div key={exIndex} className="bg-white rounded-lg border p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-4 border-b">
                📋 {exam.exam}
              </h2>

              <div className="space-y-3">
                {exam.papers.map((paper, pIndex) => (
                  <div
                    key={pIndex}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">{paper.subject}</p>
                        <p className="text-xs text-gray-600">{paper.file}</p>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        alert(`Downloading ${paper.file}...`)
                      }
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
                    >
                      <Download className="w-4 h-4" />
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
