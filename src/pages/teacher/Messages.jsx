import { useState, useEffect, useRef } from "react";
import { useSchool } from "../../context/SchoolContext";

export default function Messages() {
  const {
    messages,
    sendMessage,
    activeStudentId,
    typingUser,
    setTypingUser,
    setUnreadCount,
  } = useSchool();

  const [text, setText] = useState("");

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    setUnreadCount(0);
  }, [setUnreadCount]);

  const chatMessages = messages.filter(
    (m) => m.studentId === activeStudentId
  );

  const handleSend = () => {
    sendMessage("teacher", text, activeStudentId);
    setText("");
  };

  return (
    <div className="flex h-[80vh] max-w-4xl flex-col p-6">
      <h1 className="mb-4 text-2xl font-bold">
        Teacher Messages
      </h1>

      <div className="flex-1 space-y-2 overflow-y-auto rounded bg-gray-50 p-4">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-xs rounded-lg p-2 ${
              msg.sender === "teacher"
                ? "ml-auto bg-green-500 text-white"
                : "bg-gray-200"
            }`}
          >
            <p>{msg.text}</p>
            <span className="text-xs opacity-70">
              {msg.time}
            </span>
          </div>
        ))}

        {typingUser === "parent" && (
          <p className="text-xs text-gray-500">
            Parent is typing...
          </p>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setTypingUser("teacher");

            setTimeout(() => {
              setTypingUser(null);
            }, 800);
          }}
          placeholder="Type message..."
          className="flex-1 rounded border px-3 py-2"
        />

        <button
          onClick={handleSend}
          className="rounded bg-green-600 px-4 text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}