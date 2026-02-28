import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { students, parents, classes } from "../../../data/dummydata";

export default function StudentsList() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  /* ================= FILTER LOGIC ================= */

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch = student.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesClass = selectedClass
        ? student.class === selectedClass
        : true;

      return matchesSearch && matchesClass;
    });
  }, [search, selectedClass]);

  /* ================= CLASS OPTIONS ================= */

  const classOptions = classes.map(
    (cls) => `${cls.class}th Standard – ${cls.section}`
  );

  return (
    <div className="p-6 space-y-6">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">
          Students
        </h1>

        <button
          onClick={() => navigate("/admin/students/add")}
          className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          + Add Student
        </button>
      </div>

      {/* ================= FILTERS ================= */}

      <div className="bg-white shadow-lg rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Search */}
        <input
          type="text"
          placeholder="Search student by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Class Filter */}
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border rounded-lg p-3"
        >
          <option value="">All Classes</option>
          {classOptions.map((cls, index) => (
            <option key={index} value={cls}>
              {cls}
            </option>
          ))}
        </select>

        {/* Total Count */}
        <div className="flex items-center justify-center bg-blue-50 rounded-xl font-semibold">
          Total: {filteredStudents.length}
        </div>

      </div>

      {/* ================= TABLE ================= */}

      <div className="bg-white shadow-lg rounded-2xl p-6 overflow-x-auto">

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Class</th>
              <th className="p-3 text-left">Gender</th>
              <th className="p-3 text-left">Parent</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((student) => {
              const parent = parents.find(
                (p) => p.id === student.parentId
              );

              return (
                <tr key={student.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{student.id}</td>
                  <td className="p-3 font-medium">{student.name}</td>
                  <td className="p-3">{student.class}</td>
                  <td className="p-3">{student.gender}</td>
                  <td className="p-3">
                    {parent ? parent.name : "-"}
                  </td>
                  <td className="p-3">
                    {parent ? parent.phone : "-"}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() =>
                        navigate(`/admin/students/${student.id}`)
                      }
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredStudents.length === 0 && (
          <p className="text-gray-500 mt-4">
            No students found.
          </p>
        )}
      </div>

    </div>
  );
}