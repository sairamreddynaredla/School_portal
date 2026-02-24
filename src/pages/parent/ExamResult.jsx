import { Download, FileText } from "lucide-react";
import useActiveStudent from "../../hooks/useActiveStudent";

export default function ExamResult() {
  const student = useActiveStudent();
  const examResults = student?.examPapers || [];

  if (!student) {
    return (
      <div className="py-8 text-center text-gray-500">
        No student selected
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Exam Result
        </h1>
        <p className="text-gray-600">
          View your exam results and performance here
        </p>
      </div>

      {examResults.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-12 text-center">
          <FileText className="mx-auto mb-3 h-12 w-12 text-gray-400" />
          <p className="font-medium text-gray-600">
            No exam results available yet
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Results will be added after exams
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {examResults.map((exam, exIndex) => (
            <div
              key={exIndex}
              className="rounded-lg border bg-white p-6 shadow-sm"
            >
              <h2 className="mb-4 border-b pb-4 text-lg font-semibold text-gray-900">
                📋 {exam.exam}
              </h2>

              <div className="space-y-3">
                {exam.papers.map((paper, pIndex) => (
                  <div
                    key={pIndex}
                    className="flex items-center justify-between rounded border bg-gray-50 p-3"
                  >
                    <div>
                      <span className="font-medium text-gray-800">
                        {(() => {
                          if (
                            paper.subject === "Mathematics" ||
                            paper.subject === "Science"
                          ) {
                            return exam.exam;
                          }
                          return paper.subject;
                        })()}
                      </span>

                      <span className="ml-2 text-sm text-gray-500">
                        {paper.marks} marks
                      </span>
                    </div>

                    <a
                      href={paper.fileUrl}
                      download
                      className="flex items-center gap-2 rounded bg-blue-100 px-3 py-1.5 text-blue-700 hover:bg-blue-200"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </a>
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