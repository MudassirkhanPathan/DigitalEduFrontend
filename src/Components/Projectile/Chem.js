import { useEffect, useState } from "react";
import "../Projectile/Projectile.css";

const elements = [
  { name: "Hydrogen", group: 1 },
  { name: "Helium", group: 18 },
  { name: "Lithium", group: 1 },
  { name: "Beryllium", group: 2 },
  { name: "Boron", group: 13 },
];

export default function PeriodicTableQuiz() {
  const [shuffledElements, setShuffledElements] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Shuffle elements at start
    setShuffledElements([...elements].sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleMatch = (element) => {
    if (!selectedGroup) {
      setMessage("Select a group first!");
      return;
    }

    if (parseInt(selectedGroup) === element.group) {
      setScore(score + 10);
      setMessage(`✅ Correct! +10 points`);
      // Remove matched element
      setShuffledElements(
        shuffledElements.filter((e) => e.name !== element.name)
      );
    } else {
      setMessage(`❌ Incorrect! Try again.`);
    }
    setSelectedGroup("");
  };

  return (
    <div className="periodic-container">
      <h2>Periodic Table Matching Game</h2>
      <p>Match each element with its correct group number!</p>

      <div className="timer-score">
        <p>Time Left: {timeLeft}s</p>
        <p>Score: {score}</p>
      </div>

      <div className="groups">
        {[1, 2, 13, 18].map((group) => (
          <button
            key={group}
            className={`group-btn ${selectedGroup == group ? "selected" : ""}`}
            onClick={() => setSelectedGroup(group)}
          >
            Group {group}
          </button>
        ))}
      </div>

      <div className="elements">
        {shuffledElements.map((element) => (
          <div
            key={element.name}
            className="element-card"
            onClick={() => handleMatch(element)}
          >
            {element.name}
          </div>
        ))}
      </div>

      {message && <p className="message">{message}</p>}
    </div>
  );
}
