import axios from "axios";
import { useState } from "react";
import "../AskImplement/ai.css";

export default function AIChat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await axios.post(
        "https://digitaledubackend.onrender.com/api/ask",
        { question },
      );

      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer("⚠️ Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <h1 className="chat-title">AI Study Assistant 📘</h1>

      <div className="chat-box">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your question..."
          className="chat-input"
        />

        <button onClick={handleAsk} className="chat-button">
          {loading ? "Thinking..." : "Ask AI"}
        </button>
      </div>

      <div className="chat-answer">
        {loading ? (
          <p>🤖 Thinking...</p>
        ) : answer ? (
          answer
            .split(/\n+/)
            .map((line, i) => (line.trim() ? <p key={i}>• {line}</p> : null))
        ) : (
          <p className="placeholder">🤖 Waiting for your question...</p>
        )}
      </div>
    </div>
  );
}
