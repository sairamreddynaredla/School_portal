import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { classes, students, parents } from "../../../data/dummydata";

export default function AddStudent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    gender: "Boy",
    class: "",
    parentName: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= DEFAULT PERFORMANCE ================= */

  const createPerformance = () => {
    return [
      { subject: "Mathematics", maxMarks: 100, passMarks: 35, marksObtained: 0 },
      { subject: "Physics", maxMarks: 100, passMarks: 35, marksObtained: 0 },
      { subject: "Chemistry", maxMarks: 100, passMarks: 35, marksObtained: 0 },
      { subject: "Biology", maxMarks: 100, passMarks: 35, marksObtained: 0 },
      { subject: "English", maxMarks: 100, passMarks: 35, marksObtained: 0 },
      { subject: "Social Studies", maxMarks: 100, passMarks: 35, marksObtained: 0 },
    ];
  };

  /* ================= DEFAULT ATTENDANCE ================= */

  const createAttendance = () => {
    return [
      { date: "01 Mar", status: "Present" },
      { date: "02 Mar", status: "Present" },
    ];
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.class || !formData.parentName || !formData.phone) {
      alert("Please fill all fields");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      alert("Phone number must be 10 digits");
      return;
    }

    // Prevent duplicate name in same class
    const duplicate = students.find(
      (s) =>
        s.name.toLowerCase() === formData.name.toLowerCase() &&
        s.class === formData.class
    );

    if (duplicate) {
      alert("Student with same name already exists in this class");
      return;
    }

    /* ===== Generate IDs ===== */

    const newId = students.length + 1;
    const parentId = `P${String(newId).padStart(3, "0")}`;
    const admissionNumber = `ADM${String(newId).padStart(4, "0")}`;

    // Generate roll number class-wise
    const classStudents = students.filter(
      (s) => s.class === formData.class
    );
    const rollNumber = classStudents.length + 1;

    /* ===== Add Parent ===== */

    parents.push({
      id: parentId,
      name: formData.parentName,
      relation: formData.gender === "Boy" ? "Father" : "Mother",
      phone: formData.phone,
    });

    /* ===== Add Student ===== */

    students.push({
      id: newId,
      admissionNumber,
      rollNumber,
      parentId,
      name: formData.name,
      gender: formData.gender,
      class: formData.class,
      status: "Active",
      attendance: createAttendance(),
      performance: createPerformance(),
    });

    alert("Student Added Successfully ✅");

    navigate("/admin/students");
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          Add New Student
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-1 font-medium">Student Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="Boy">Boy</option>
              <option value="Girl">Girl</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Class</label>
            <select
              name="class"
              value={formData.class}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select Class</option>
              {classes.map((cls, index) => {
                const className = `${cls.class}th Standard – ${cls.section}`;
                return (
                  <option key={index} value={className}>
                    {className}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Parent Name</label>
            <input
              type="text"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Parent Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Add Student
          </button>

        </form>
      </div>
    </div>
  );
}