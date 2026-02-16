import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./chatbot.css";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Welcome to Arah Infotech 👋 How can we assist you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/chatbot",
        { message: input }
      );

      setMessages(prev => [
        ...prev,
        { sender: "bot", text: res.data.reply }
      ]);

    } catch (error) {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "Service temporarily unavailable. Please try again later." }
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Icon */}
      <div className="ai-toggle" onClick={() => setOpen(!open)}>
        💬
      </div>

      {/* Chat Widget */}
      <div className={`ai-widget ${open ? "show" : ""}`}>
        <div className="ai-header">
          <div>
            <h4>Arah Infotech</h4>
            <span>AI Support Assistant</span>
          </div>
          <button onClick={() => setOpen(false)}>✕</button>
        </div>

        <div className="ai-body">
          {messages.map((msg, index) => (
            <div key={index} className={`ai-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}

          {loading && <div className="ai-message bot">Typing...</div>}

          <div ref={bottomRef}></div>
        </div>

        <div className="ai-footer">
          <input
            type="text"
            placeholder="Ask about our services..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
