import { useEffect, useState } from "react";
import "../Projectile/Projectile.css";

const puzzles = [
  { question: "Find the missing number: 2, 4, 8, 16, ?", answer: "32" },
  { question: "If CAT = DBU, then DOG = ?", answer: "EPH" },
  { question: "Odd One Out: Apple, Mango, Banana, Potato", answer: "Potato" },
  { question: "1, 4, 9, 16, ?", answer: "25" },
  {
    question:
      "Five friends A, B, C, D, E sit in a row. A is left of B, C is right of D. Who is in the middle?",
    answer: "C",
  },

  // 6
  { question: "Next in series: 3, 6, 11, 18, 27, ?", answer: "38" }, // +11 pattern
  // 7
  { question: "If PEN = QFO, then RUG = ?", answer: "SVH" }, // each letter +1, +? check rule: P+1=Q, E+1=F, N+1=O => similarly R->S U->V G->H => "SVH"
  // 8
  { question: "Find the odd one out: 2, 3, 5, 7, 9, 11", answer: "9" },
  // 9
  { question: "Series: 5, 10, 20, 40, ?", answer: "80" },
  // 10
  { question: "If BOX = ERA, then CAR = ?", answer: "FDU" }, // B->E (+3), O->R (+3), X->A (+3 wrapping): C->F A->D R->U => FDU

  // 11
  { question: "Find the next: 7, 14, 28, 56, ?", answer: "112" },
  // 12
  {
    question:
      "Seating: A sits to left of B, C sits between B and D, E sits at extreme left. Who sits second from left?",
    answer: "A",
  },
  // 13
  {
    question: "If 'MONKEY' is coded as 'NPOJLF', then 'TIGER' -> ?",
    answer: "UJHFS",
  }, // each letter +1
  // 14
  {
    question: "Pattern: 2, 5, 10, 17, 26, ? (difference: 3,5,7,9...)",
    answer: "37",
  },
  // 15
  {
    question: "Odd one out: Circle, Square, Triangle, Cylinder",
    answer: "Cylinder",
  },

  // 16
  {
    question:
      "Clock problem: If it's 3:15 now, what is the angle between hour and minute hand?",
    answer: "7.5",
  }, // degrees
  // 17
  {
    question: "Calendar: If 1 Jan 2021 was a Friday, what day was 1 Jan 2022?",
    answer: "Saturday",
  },
  // 18
  {
    question:
      "Blood relation: 'A is father of B. C is daughter of B. How is C related to A?'",
    answer: "Granddaughter",
  },
  // 19
  {
    question:
      "Riddle: I speak without a mouth and hear without ears. I have nobody, but I come alive with wind. What am I?",
    answer: "Echo",
  },
  // 20
  { question: "Math puzzle: If x + 1/x = 5, find x^2 + 1/x^2", answer: "23" }, // (x+1/x)^2 - 2 = 25 - 2 = 23

  // 21
  { question: "Number series: 1, 1, 2, 3, 5, 8, ?", answer: "13" }, // Fibonacci
  // 22
  {
    question: "Coding: If 3 -> C, 1 -> A, 20 -> T, then 8 5 12 16 -> ?",
    answer: "HELP",
  }, // A1=1 mapping
  // 23
  {
    question:
      "Arrange in order of increasing size: Atom, Molecule, Cell, Organ",
    answer: "Atom,Molecule,Cell,Organ",
  },
  // 24
  { question: "Find next: 81, 27, 9, 3, ?", answer: "1" },
  // 25
  {
    question:
      "Logical: If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops Lazzies? (Yes/No)",
    answer: "Yes",
  },
];

export default function LogicPuzzle() {
  const [level, setLevel] = useState(0);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  const currentPuzzle = puzzles[level];

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setMessage("⏰ Time's up! Try again.");
    }
  }, [timeLeft]);

  const handleSubmit = () => {
    if (input.trim().toLowerCase() === currentPuzzle.answer.toLowerCase()) {
      setScore(score + timeLeft);
      setMessage("✅ Correct! Moving to next level...");
      setTimeout(() => {
        if (level < puzzles.length - 1) {
          setLevel(level + 1);
          setInput("");
          setMessage("");
          setTimeLeft(30);
        } else {
          setMessage("🎉 Congratulations! You solved all puzzles!");
        }
      }, 1000);
    } else {
      setMessage("❌ Wrong Answer! Try again.");
    }
  };

  return (
    <div className="puzzle-container">
      <h2>Logic Puzzle - Level {level + 1}</h2>
      <p className="question">{currentPuzzle.question}</p>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your answer"
      />

      <button onClick={handleSubmit}>Submit</button>

      <p>Time Left: {timeLeft}s</p>
      <p>Score: {score}</p>

      {message && <p className="message">{message}</p>}
    </div>
  );
}
