import { useState } from "react";
import "../Projectile/Projectile.css";

const levels = [
  {
    level: 1,
    organs: [
      { name: "Heart", top: 120, left: 140 },
      { name: "Brain", top: 20, left: 130 },
    ],
  },
  {
    level: 2,
    organs: [
      { name: "Heart", top: 120, left: 140 },
      { name: "Brain", top: 20, left: 130 },
      { name: "Lungs", top: 80, left: 100 },
      { name: "Stomach", top: 200, left: 140 },
    ],
  },
  {
    level: 3,
    organs: [
      { name: "Heart", top: 120, left: 140 },
      { name: "Brain", top: 20, left: 130 },
      { name: "Lungs", top: 80, left: 100 },
      { name: "Stomach", top: 200, left: 140 },
      { name: "Liver", top: 180, left: 180 },
      { name: "Kidneys", top: 220, left: 80 },
    ],
  },
];

export default function HumanBodyPuzzle() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [placedOrgans, setPlacedOrgans] = useState([]);
  const [attempts, setAttempts] = useState(5);
  const [message, setMessage] = useState("");
  const [completed, setCompleted] = useState(false);

  const organs = levels[currentLevel].organs;

  const handleDrop = (e, organ) => {
    e.preventDefault();
    const targetId = e.target.id;

    if (targetId === organ.name) {
      if (!placedOrgans.includes(organ.name)) {
        setPlacedOrgans([...placedOrgans, organ.name]);
        setMessage(`✅ Correct! You placed the ${organ.name}`);
      }
    } else {
      setAttempts(attempts - 1);
      setMessage(`❌ Wrong place! Attempts left: ${attempts - 1}`);
    }

    // Check if level complete
    if (placedOrgans.length + 1 === organs.length) {
      if (currentLevel < levels.length - 1) {
        setTimeout(() => {
          setCurrentLevel(currentLevel + 1);
          setPlacedOrgans([]);
          setAttempts(5);
          setMessage(`🎉 Level ${currentLevel + 2} unlocked!`);
        }, 1000);
      } else {
        setCompleted(true);
      }
    }
  };

  const handleDragStart = (e, organName) => {
    e.dataTransfer.setData("organName", organName);
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  if (completed) {
    return (
      <div className="body-puzzle-container">
        <h2>🎉 Congratulations! You completed all levels!</h2>
      </div>
    );
  }

  return (
    <div className="body-puzzle-container">
      <h2>Human Body Puzzle - Level {currentLevel + 1}</h2>
      <p>Drag & drop the organs onto the correct place!</p>

      <div className="body-maze">
        {/* Human Body Diagram */}
        <div className="body-diagram">
          {organs.map((organ) => (
            <div
              key={organ.name}
              id={organ.name}
              className="drop-zone"
              style={{
                top: `${organ.top}px`,
                left: `${organ.left}px`,
                backgroundColor: placedOrgans.includes(organ.name)
                  ? "#4f46e5"
                  : "transparent",
              }}
              onDrop={(e) => handleDrop(e, organ)}
              onDragOver={allowDrop}
            ></div>
          ))}
        </div>

        {/* Organs to drag */}
        <div className="organs-pool">
          {organs.map(
            (organ) =>
              !placedOrgans.includes(organ.name) && (
                <div
                  key={organ.name}
                  className="organ-card"
                  draggable
                  onDragStart={(e) => handleDragStart(e, organ.name)}
                >
                  {organ.name}
                </div>
              )
          )}
        </div>
      </div>

      {message && <p className="message">{message}</p>}
      <p>Attempts left: {attempts}</p>
    </div>
  );
}
