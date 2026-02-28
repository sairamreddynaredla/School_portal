import { useState } from "react";
import {
  teachers,
  classes,
  teacherClasses,
} from "../../../data/dummydata";

export default function AssignClass() {
  const [formData, setFormData] = useState({
    teacherId: "",
    class: "",
    day: "",
    time: "",
  });

  /* ================= HANDLE INPUT ================= */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= ASSIGN CLASS ================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.teacherId || !formData.class || !formData.day || !formData.time) {
      alert("Please fill all fields");
      return;
    }

    const selectedTeacher = teachers.find(
      (t) => t.id === formData.teacherId
    );

    // 🔒 Prevent duplicate assignment
    const alreadyAssigned = teacherClasses.find(
      (tc) =>
        tc.teacherId === formData.teacherId &&
        tc.class === formData.class &&
        tc.day === formData.day &&
        tc.time === formData.time
    );

    if (alreadyAssigned) {
      alert("This class is already assigned to the teacher!");
      return;
    }

    teacherClasses.push({
      teacherId: formData.teacherId,
      subject: selectedTeacher.subject,
      class: formData.class,
      day: formData.day,
      time: formData.time,
    });

    alert("Class Assigned Successfully ✅");

    setFormData({
      teacherId: "",
      class: "",
      day: "",
      time: "",
    });
  };

  /* ================= DELETE ASSIGNMENT ================= */

  const handleDelete = (index) => {
    teacherClasses.splice(index, 1);
    alert("Assignment Removed ❌");
  };

  /* ================= CLASS OPTIONS ================= */

  const classOptions = classes.map(
    (cls) => `${cls.class}th Standard – ${cls.section}`
  );

  return (
    <div className="p-6 space-y-8">

      {/* ================= FORM ================= */}

      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          Assign Class to Teacher
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Teacher */}
          <div>
            <label className="block mb-1 font-medium">
              Select Teacher
            </label>
            <select
              name="teacherId"
              value={formData.teacherId}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name} ({teacher.subject})
                </option>
              ))}
            </select>
          </div>

          {/* Class */}
          <div>
            <label className="block mb-1 font-medium">
              Select Class
            </label>
            <select
              name="class"
              value={formData.class}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select Class</option>
              {classOptions.map((cls, index) => (
                <option key={index} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          {/* Day */}
          <div>
            <label className="block mb-1 font-medium">
              Day
            </label>
            <select
              name="day"
              value={formData.day}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select Day</option>
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
            </select>
          </div>

          {/* Time */}
          <div>
            <label className="block mb-1 font-medium">
              Time
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Assign Class
          </button>

        </form>
      </div>

      {/* ================= ASSIGNED TABLE ================= */}

      <div className="bg-white shadow-xl rounded-2xl p-6 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">
          Assigned Classes
        </h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-3 text-left">Teacher</th>
              <th className="p-3 text-left">Subject</th>
              <th className="p-3 text-left">Class</th>
              <th className="p-3 text-left">Day</th>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {teacherClasses.map((item, index) => {
              const teacher = teachers.find(
                (t) => t.id === item.teacherId
              );

              return (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3">{teacher?.name}</td>
                  <td className="p-3">{item.subject}</td>
                  <td className="p-3">{item.class}</td>
                  <td className="p-3">{item.day}</td>
                  <td className="p-3">{item.time}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {teacherClasses.length === 0 && (
          <p className="text-gray-500 mt-4">
            No classes assigned yet.
          </p>
        )}
      </div>

    </div>
  );
}