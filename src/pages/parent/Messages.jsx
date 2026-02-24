import { useState, useEffect, useRef } from "react";
import { Send, MessageCircle } from "lucide-react";
import { useSchool } from "../../context/SchoolContext";

export default function Messages() {
  const {
    messages,
    sendMessage,
    activeStudentId,
    typingUser,
    setTypingUser,
  } = useSchool();

  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const chatMessages = messages.filter(
    (m) => m.studentId === activeStudentId
  );

  function handleSend() {
    if (!text.trim()) return;
    sendMessage("parent", text, activeStudentId);
    setText("");
  }

  return (
    <div className="flex h-[70vh] w-full flex-col">
      <div className="mb-4 border-b pb-4">
        <div className="flex items-center gap-3">
          <MessageCircle className="h-6 w-6 text-blue-600" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Messages
            </h2>
            <p className="text-xs text-gray-600">
              Direct communication with teachers
            </p>
          </div>
        </div>
      </div>

      <div className="mb-4 flex-1 space-y-3 overflow-y-auto rounded-lg bg-gray-50 p-4">
        {chatMessages.length === 0 ? (
          <div className="py-8 text-center">
            <MessageCircle className="mx-auto mb-2 h-10 w-10 text-gray-300" />
            <p className="text-gray-500">No messages yet</p>
            <p className="mt-1 text-xs text-gray-400">
              Start a conversation with your child's teacher
            </p>
          </div>
        ) : (
          chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-sm rounded-lg p-3 ${
                msg.sender === "parent"
                  ? "ml-auto rounded-br-none bg-blue-600 text-white"
                  : "mr-auto rounded-bl-none border border-gray-200 bg-white text-gray-900"
              }`}
            >
              <p className="text-sm">{msg.text}</p>

              <span
                className={`mt-1 block text-xs opacity-70 ${
                  msg.sender === "parent"
                    ? "text-blue-100"
                    : "text-gray-500"
                }`}
              >
                {msg.time}
              </span>
            </div>
          ))
        )}

        {typingUser === "teacher" && (
          <div className="mr-auto max-w-sm rounded-lg border border-gray-200 bg-white p-3">
            <p className="text-xs text-gray-600">
              Teacher is typing...
            </p>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setTypingUser("parent");
            setTimeout(() => setTypingUser(null), 800);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder="Type your message here..."
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:bg-gray-400"
        >
          <Send className="h-4 w-4" />
          Send
        </button>
      </div>
    </div>
  );
}