import { createContext, useContext, useState } from "react";
import { students as dummyStudents } from "../data/dummydata";

// 🏫 Create School Context
export const SchoolContext = createContext();

// 📚 School Provider Component
export function SchoolProvider({ children }) {
  const [students, setStudents] = useState(dummyStudents);
  const [activeStudentId, setActiveStudentId] = useState(1);

  /* ===================================================
     💬 REAL-TIME CHAT STATE (Parent ↔ Teacher)
  =================================================== */

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "parent",
      studentId: 1,
      text: "Hello teacher",
      time: "10:00 AM",
    },
  ]);

  const [unreadCount, setUnreadCount] = useState(0);
  const [typingUser, setTypingUser] = useState(null);

  /* ===================================================
     ⭐ MAIN UNIVERSAL UPDATE FUNCTION
  =================================================== */

  const updateStudent = (studentId, updates) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (student.id !== studentId) return student;

        const updatedStudent = {
          ...student,
          ...updates,
          performance: {
            ...student.performance,
            ...(updates.performance || {}),
          },
        };

        /* ===================================================
           📊 AUTO CALCULATE PERFORMANCE (percentage + grade)
        =================================================== */

        if (updates.performance) {
          const performanceValues = Object.entries(
            updatedStudent.performance
          )
            .filter(
              ([key, value]) =>
                key !== "percentage" &&
                key !== "grade" &&
                typeof value === "number"
            )
            .map(([, value]) => value);

          if (performanceValues.length > 0) {
            const total = performanceValues.reduce(
              (a, b) => a + b,
              0
            );

            const percentage = Math.round(
              total / performanceValues.length
            );

            let grade = "C";
            if (percentage >= 90) grade = "A+";
            else if (percentage >= 75) grade = "A";
            else if (percentage >= 60) grade = "B";

            updatedStudent.performance.percentage =
              percentage;
            updatedStudent.performance.grade = grade;
          }
        }

        /* ===================================================
           📅 AUTO CALCULATE ATTENDANCE %
        =================================================== */

        if (updates.attendance) {
          const totalDays = updates.attendance.length;
          const presentDays = updates.attendance.filter(
            (a) => a.status === "Present"
          ).length;

          updatedStudent.attendancePercentage =
            totalDays > 0
              ? Math.round((presentDays / totalDays) * 100)
              : 0;
        }

        return updatedStudent;
      })
    );
  };

  /* ===================================================
     ⭐ MARKS UPDATE
  =================================================== */

  const updateMarks = (studentId, performanceObject) => {
    updateStudent(studentId, {
      performance: performanceObject,
    });
  };

  /* ===================================================
     ⭐ ATTENDANCE UPDATE
  =================================================== */

  // Mark attendance for a student for a specific date (add if not exists, update if exists)
  const markAttendance = (studentId, status) => {
    const today = new Date().toLocaleDateString("en-CA"); // yyyy-mm-dd
    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (student.id !== studentId) return student;
        // Check if today's record exists
        const attendance = Array.isArray(student.attendance) ? [...student.attendance] : [];
        const idx = attendance.findIndex((a) => a.date === today);
        if (idx !== -1) {
          attendance[idx].status = status;
        } else {
          attendance.push({ date: today, status });
        }
        return { ...student, attendance };
      })
    );
  };

  /* ===================================================
     💬 UNIVERSAL CHAT FUNCTION (REAL-TIME)
  =================================================== */

  const sendMessage = (sender, text, studentId) => {
    if (!text.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender,
      text,
      studentId,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);

    // ⭐ Increase unread badge when parent sends
    if (sender === "parent") {
      setUnreadCount((prev) => prev + 1);
    }

    // reset typing indicator
    setTypingUser(null);
  };

  /* ===================================================
     ⭐ CONTEXT VALUE
  =================================================== */

  const value = {
    students,
    activeStudentId,
    setActiveStudentId,
    updateStudent,
    updateMarks,
    markAttendance,

    // 💬 CHAT STATE
    messages,
    sendMessage,
    unreadCount,
    setUnreadCount,
    typingUser,
    setTypingUser,
  };

  return (
    <SchoolContext.Provider value={value}>
      {children}
    </SchoolContext.Provider>
  );
}

// 🪝 Custom Hook
export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error(
      "useSchool must be used within SchoolProvider"
    );
  }
  return context;
};
