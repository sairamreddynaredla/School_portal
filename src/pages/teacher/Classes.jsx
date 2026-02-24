import { useNavigate } from "react-router-dom";
import { students } from "../../data/dummydata";

export default function Classes() {
  const navigate = useNavigate();

  const classes = Array.from(
    new Set(students.map((s) => s.class))
  ).map((className, index) => {
    const classStudents = students.filter(
      (s) => s.class === className
    );

    return {
      id: index + 1,
      name: className,
      totalStudents: classStudents.length,
    };
  });

  return (
    <div className="max-w-6xl p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">
          Classes
        </h2>

        <p className="text-gray-600">
          Classes handled by the teacher
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((cls) => (
          <div
            key={cls.id}
            className="rounded-lg bg-white p-6 shadow transition hover:shadow-lg"
          >
            <h3 className="mb-2 text-lg font-bold">
              {cls.name}
            </h3>

            <p className="mb-1 text-gray-600">
              Students: {cls.totalStudents}
            </p>

            <p className="mb-4 text-sm text-gray-400">
              Academic Year 2025-26
            </p>

            <button
              onClick={() =>
                navigate(`/teacher/students/${cls.name}`)
              }
              className="w-full rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            >
              View Students
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}