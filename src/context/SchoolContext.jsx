import { createContext, useContext, useState } from "react";
import { students as dummyStudents } from "../data/dummydata";

export const SchoolContext = createContext();

export function SchoolProvider({ children }) {
  const [students, setStudents] = useState(dummyStudents);
  const [activeStudentId, setActiveStudentId] = useState(1);

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

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "info",
      title: "Attendance Updated",
      message: "Student marked present today",
      time: "Just now",
    },
  ]);

  /* ⭐ UPDATE STUDENT */
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

        return updatedStudent;
      })
    );
  };

  /* ⭐ UPDATE MARKS */
  const updateMarks = (studentId, performanceObject) => {
    updateStudent(studentId, {
      performance: performanceObject,
    });
  };

  /* ⭐ MARK ATTENDANCE (MATCH DUMMYDATA FORMAT) */
  const markAttendance = (studentId, status) => {
    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });

    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (student.id !== studentId) return student;

        const attendance = Array.isArray(student.attendance)
          ? [...student.attendance]
          : [];

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

  /* ⭐ SEND MESSAGE */
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

    if (sender === "parent") {
      setUnreadCount((prev) => prev + 1);
    }

    setTypingUser(null);
  };

  const value = {
    students,
    activeStudentId,
    setActiveStudentId,
    updateStudent,
    updateMarks,
    markAttendance,
    messages,
    sendMessage,
    unreadCount,
    setUnreadCount,
    typingUser,
    setTypingUser,
    alerts,
    setAlerts,
  };

  return (
    <SchoolContext.Provider value={value}>
      {children}
    </SchoolContext.Provider>
  );
}

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error("useSchool must be used within SchoolProvider");
  }
  return context;
};