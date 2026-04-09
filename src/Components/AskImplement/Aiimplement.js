import axios from "axios";
import { useState } from "react";
import "../AskImplement/ai.css"; // 👈 CSS file import

export default function AIChat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAsk = async () => {
    if (!question.trim()) return;
    try {
      const res = await axios.post(
        "https://digitaledubackend.onrender.com/api/ask",
        {
          question,
        },
      );
      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer("Error fetching answer. Please try again.");
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
          Ask AI
        </button>
      </div>

      <div className="chat-answer">
        {answer ? (
          <div>
            {answer
              .split(/\n+/) // split on new lines
              .map((line, index) =>
                line.trim() ? <p key={index}>• {line.trim()}</p> : null,
              )}
          </div>
        ) : (
          <p className="placeholder">🤖 Waiting for your question...</p>
        )}
      </div>
    </div>
  );
}
