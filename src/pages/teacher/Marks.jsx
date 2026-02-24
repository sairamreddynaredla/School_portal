import { useSchool } from "../../context/SchoolContext";

export default function Marks() {
  const { students } = useSchool();

  const totalStudents = students.length;

  const percentages = students.map(
    (s) => s.performance?.percentage || 0
  );

  const averageMarks =
    totalStudents > 0
      ? Math.round(
          percentages.reduce((a, b) => a + b, 0) / totalStudents
        )
      : 0;

  const highestMarks =
    percentages.length > 0 ? Math.max(...percentages) : 0;

  const lowestMarks =
    percentages.length > 0 ? Math.min(...percentages) : 0;

  return (
    <div className="max-w-6xl p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Marks
      </h1>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          ["Total Students", totalStudents],
          ["Average Marks", `${averageMarks}%`],
          ["Highest Marks", `${highestMarks}%`],
          ["Lowest Marks", `${lowestMarks}%`],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded bg-white p-4 shadow"
          >
            <p className="text-sm text-gray-500">
              {label}
            </p>
            <p className="text-2xl font-bold">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded bg-white shadow">
        <h2 className="border-b p-4 text-lg font-semibold">
          Student Marks Summary
        </h2>

        <div className="divide-y">
          {students.map((student) => {
            const marks =
              student.performance?.percentage || 0;

            return (
              <div
                key={student.id}
                className="p-4"
              >
                <div className="mb-2 flex justify-between">
                  <p className="font-medium">
                    {student.name}
                  </p>
                  <span className="font-semibold">
                    {marks}%
                  </span>
                </div>

                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className={`h-2 rounded-full ${
                      marks >= 75
                        ? "bg-green-500"
                        : marks >= 60
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${marks}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}