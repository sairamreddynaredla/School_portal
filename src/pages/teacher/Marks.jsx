import { useSchool } from "../../context/SchoolContext";

export default function Marks() {
  // ⭐ Get live students data from context
  const { students } = useSchool();

  /* ===================================================
     📊 CALCULATE STATS DYNAMICALLY
  =================================================== */

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
    <div className="p-6 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">Marks</h1>

      {/* ===================================================
         ⭐ STATS CARDS (NOW REAL DATA)
      =================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          ["Total Students", totalStudents],
          ["Average Marks", `${averageMarks}%`],
          ["Highest Marks", `${highestMarks}%`],
          ["Lowest Marks", `${lowestMarks}%`],
        ].map(([label, value]) => (
          <div key={label} className="bg-white p-4 rounded shadow">
            <p className="text-gray-500 text-sm">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      {/* ===================================================
         ⭐ STUDENT MARKS LIST (LIVE FROM CONTEXT)
      =================================================== */}
      <div className="bg-white rounded shadow">
        <h2 className="text-lg font-semibold p-4 border-b">
          Student Marks Summary
        </h2>

        <div className="divide-y">
          {students.map((student) => {
            const marks =
              student.performance?.percentage || 0;

            return (
              <div key={student.id} className="p-4">
                <div className="flex justify-between mb-2">
                  <p className="font-medium">
                    {student.name}
                  </p>
                  <span className="font-semibold">
                    {marks}%
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
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
