import { useNavigate } from "react-router-dom";
import { students } from "../../data/dummydata";

export default function Classes() {
  const navigate = useNavigate();

  /* ⭐ Get unique classes from students data (backend-like logic) */
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
    <div className="p-6 max-w-6xl">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Classes</h2>
        <p className="text-gray-600">
          Classes handled by the teacher
        </p>
      </div>

      {/* CLASS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((cls) => (
          <div
            key={cls.id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold mb-2">
              {cls.name}
            </h3>

            {/* ⭐ Realistic info */}
            <p className="text-gray-600 mb-1">
              Students: {cls.totalStudents}
            </p>

            <p className="text-sm text-gray-400 mb-4">
              Academic Year 2025-26
            </p>

            <button
              onClick={() => navigate(`/teacher/students/${cls.name}`)}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              View Students
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
