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
    <div className="w-full flex flex-col h-[70vh]">
      {/* Header */}
      <div className="mb-4 pb-4 border-b">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-6 h-6 text-blue-600" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
            <p className="text-xs text-gray-600">Direct communication with teachers</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 p-4 bg-gray-50 rounded-lg">
        {chatMessages.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">No messages yet</p>
            <p className="text-xs text-gray-400 mt-1">Start a conversation with your child's teacher</p>
          </div>
        ) : (
          chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-sm p-3 rounded-lg ${
                msg.sender === "parent"
                  ? "bg-blue-600 text-white ml-auto rounded-br-none"
                  : "bg-white text-gray-900 mr-auto rounded-bl-none border border-gray-200"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <span className={`text-xs opacity-70 mt-1 block ${msg.sender === "parent" ? "text-blue-100" : "text-gray-500"}`}>
                {msg.time}
              </span>
            </div>
          ))
        )}

        {typingUser === "teacher" && (
          <div className="max-w-sm p-3 rounded-lg bg-white border border-gray-200 mr-auto">
            <p className="text-xs text-gray-600">Teacher is typing...</p>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
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
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg px-4 py-2 font-medium transition flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          Send
        </button>
      </div>
    </div>
  );
}
