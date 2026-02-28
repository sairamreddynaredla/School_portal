import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  teachers,
  teacherClasses,
} from "../../../data/dummydata";

export default function TeachersList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  /* ================= FILTER ================= */

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) =>
      teacher.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  /* ================= UI ================= */

  return (
    <div className="p-6 space-y-6">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">
          Teachers
        </h1>

        <div className="bg-blue-50 px-5 py-2 rounded-xl font-semibold">
          Total: {teachers.length}
        </div>
      </div>

      {/* ================= SEARCH ================= */}

      <div className="bg-white shadow-lg rounded-2xl p-6">
        <input
          type="text"
          placeholder="Search teacher by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* ================= TABLE ================= */}

      <div className="bg-white shadow-lg rounded-2xl p-6 overflow-x-auto">

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-3 text-left">Teacher ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Subject</th>
              <th className="p-3 text-left">Assigned Classes</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredTeachers.map((teacher) => {
              const assigned = teacherClasses.filter(
                (tc) => tc.teacherId === teacher.id
              );

              return (
                <tr
                  key={teacher.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">{teacher.id}</td>
                  <td className="p-3 font-medium">{teacher.name}</td>
                  <td className="p-3">{teacher.subject}</td>
                  <td className="p-3">
                    {assigned.length}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() =>
                        navigate(`/admin/teachers/${teacher.id}`)
                      }
                      className="text-blue-600 hover:underline"
                    >
                      View Timetable
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredTeachers.length === 0 && (
          <p className="text-gray-500 mt-4">
            No teachers found.
          </p>
        )}
      </div>

    </div>
  );
}