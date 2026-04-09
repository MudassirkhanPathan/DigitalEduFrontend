import { useState } from "react";
import "../Quiz/QuizPage.css";

const QuizApp = ({ userId }) => {
  const subjects = [
    "MATHS",
    "PHYSICS",
    "CHEMISTRY",
    "ENGLISH",
    "HINDI",
    "BIOLOGY",
    "ACCOUNTANCY",
    "BUSINESS STUDIES",
    "ECONOMICS",
  ];

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [quiz, setQuiz] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [batch, setBatch] = useState(1);
  const [loading, setLoading] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null); // track clicked option
  const [showAnswer, setShowAnswer] = useState(false); // show correct/wrong

  // Fetch quiz from backend
  const fetchQuestions = async (
    type = "first",
    subjectParam = null,
    batchParam = null,
  ) => {
    const subjectToUse = subjectParam || selectedSubject;
    const batchToUse = batchParam || batch;

    const url =
      type === "first"
        ? "https://digitaledubackend.onrender.com/api/quiz/first"
        : "https://digitaledubackend.onrender.com/api/quiz/next";
    const body =
      type === "first"
        ? { subject: subjectToUse }
        : { subject: subjectToUse, batch: batchToUse };

    try {
      setLoading(true);
      setQuizCompleted(false);
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setQuiz(data);
        setCurrent(0);
        setSelectedOption(null);
        setShowAnswer(false);
      } else {
        alert(data.message || "No questions found!");
        setSelectedSubject(null);
        setQuiz([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Failed to fetch quiz!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubject = (sub) => {
    setSelectedSubject(sub);
    setBatch(1);
    setScore(0);
    fetchQuestions("first", sub, 1);
  };

  // Answer click handler with instant feedback
  const handleAnswer = (option) => {
    if (!quiz[current] || showAnswer) return;

    setSelectedOption(option);
    setShowAnswer(true);

    const correct = quiz[current].correctAnswer;
    if (option === correct) {
      setScore((prev) => prev + 1);
    }

    // Wait 1 second, then go to next question or finish batch
    setTimeout(() => {
      if (current + 1 < quiz.length) {
        setCurrent(current + 1);
        setSelectedOption(null);
        setShowAnswer(false);
      } else {
        setQuizCompleted(true);
      }
    }, 1000); // 1 second delay to show feedback
  };

  const handleNextBatch = async () => {
    try {
      const token = localStorage.getItem("token"); // userId ki zarurat nahi, backend token se nikal lega

      if (!token) {
        alert("User not logged in!");
        return;
      }
      //From data to pass the value

      const res = await fetch(
        "https://digitaledubackend.onrender.com/api/quiz/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ sahi format
          },
          body: JSON.stringify({
            subject: selectedSubject,
            score: score, // ✅ sirf subject aur score bhejna hai
          }),
        },
      );

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      console.log("Submit Response:", data);

      const nextBatch = batch + 1;
      setBatch(nextBatch);
      setScore(0);
      await fetchQuestions("next", selectedSubject, nextBatch);
    } catch (err) {
      console.error("Submit score error:", err);
      alert("Failed to submit score!");
    }
  };

  return (
    <div className="quiz-app">
      {!selectedSubject ? (
        <div className="subject-selection">
          <h2 className="quiz-title">🎓 Select Subject</h2>
          <div className="subject-cards">
            {subjects.map((sub) => (
              <div
                key={sub}
                className="subject-card"
                onClick={() => handleSubject(sub)}
              >
                <h3>{sub}</h3>
              </div>
            ))}
          </div>
        </div>
      ) : loading ? (
        <p className="loading-text">⏳ Loading questions...</p>
      ) : !quiz.length ? (
        <p className="no-questions">No questions available!</p>
      ) : quizCompleted ? (
        <div className="quiz-container">
          <h3 className="question-text">Batch Completed!</h3>
          <p className="score-text">
            You scored <span>{score}</span> / {quiz.length}
          </p>
          <div className="action-cards">
            <div className="action-card" onClick={handleNextBatch}>
              <span className="icon">➡️</span>
              <h3>Next Test</h3>
            </div>

            <div
              className="action-card"
              onClick={() => setSelectedSubject(null)}
            >
              <span className="icon">🔙</span>
              <h3>Back to Subjects</h3>
            </div>
          </div>
        </div>
      ) : (
        <div className="quiz-container">
          <h3 className="question-text">
            Q{quiz[current].serial}: {quiz[current].question}
          </h3>
          <div className="options-container">
            {quiz[current].options.map((opt, idx) => {
              let className = "option-btn";
              if (showAnswer) {
                if (opt === quiz[current].correctAnswer)
                  className += " correct";
                else if (opt === selectedOption) className += " wrong";
              }
              return (
                <button
                  key={idx}
                  className={className}
                  onClick={() => handleAnswer(opt)}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          <p className="score-text">
            Question {current + 1} / {quiz.length} | Score: {score}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
