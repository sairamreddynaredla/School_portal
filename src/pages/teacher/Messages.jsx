import { useState, useEffect, useRef } from "react";
import { useSchool } from "../../context/SchoolContext";

export default function Messages() {
  /* ===================================================
     ⭐ GET GLOBAL CHAT STATE
  =================================================== */

  const {
    messages,
    sendMessage,
    activeStudentId,
    typingUser,
    setTypingUser,
    setUnreadCount,
  } = useSchool();

  const [text, setText] = useState("");

  /* ===================================================
     ⭐ AUTO SCROLL (WhatsApp Feel)
  =================================================== */

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  /* ===================================================
     ⭐ RESET UNREAD COUNT WHEN TEACHER OPENS CHAT
  =================================================== */

  useEffect(() => {
    setUnreadCount(0);
  }, [setUnreadCount]);

  /* ===================================================
     ⭐ FILTER CHAT BY ACTIVE STUDENT
  =================================================== */

  const chatMessages = messages.filter(
    (m) => m.studentId === activeStudentId
  );

  /* ===================================================
     💬 SEND MESSAGE (TEACHER SIDE)
  =================================================== */

  const handleSend = () => {
    sendMessage("teacher", text, activeStudentId);
    setText("");
  };

  return (
    <div className="p-6 max-w-4xl flex flex-col h-[80vh]">
      <h1 className="text-2xl font-bold mb-4">
        Teacher Messages
      </h1>

      {/* ===================================================
          💬 CHAT AREA
      =================================================== */}

      <div className="flex-1 overflow-y-auto bg-gray-50 p-4 rounded space-y-2">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-xs p-2 rounded-lg ${
              msg.sender === "teacher"
                ? "bg-green-500 text-white ml-auto"
                : "bg-gray-200"
            }`}
          >
            <p>{msg.text}</p>
            <span className="text-xs opacity-70">
              {msg.time}
            </span>
          </div>
        ))}

        {/* ⭐ Typing Indicator */}
        {typingUser === "parent" && (
          <p className="text-xs text-gray-500">
            Parent is typing...
          </p>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ===================================================
          ✏️ INPUT AREA
      =================================================== */}

      <div className="flex gap-2 mt-4">
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);

            // show typing status
            setTypingUser("teacher");

            setTimeout(() => {
              setTypingUser(null);
            }, 800);
          }}
          placeholder="Type message..."
          className="flex-1 border rounded px-3 py-2"
        />

        <button
          onClick={handleSend}
          className="bg-green-600 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
