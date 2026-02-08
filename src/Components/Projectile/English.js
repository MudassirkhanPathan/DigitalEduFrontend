import { useEffect, useState } from "react";
import "../Projectile/Projectile.css";

const levels = [
  {
    level: 1,
    sentence: "I am going to school",
    words: ["going", "school", "I", "to", "am"],
  },
  {
    level: 2,
    sentence: "She loves reading books",
    words: ["She", "books", "reading", "loves"],
  },
  {
    level: 3,
    sentence: "We are watching a movie",
    words: ["We", "movie", "a", "are", "watching"],
  },
  {
    level: 4,
    sentence: "He is playing football",
    words: ["football", "He", "playing", "is"],
  },
  {
    level: 5,
    sentence: "They are going to the market",
    words: ["market", "the", "They", "are", "going", "to"],
  },
  {
    level: 6,
    sentence: "I like to eat pizza",
    words: ["I", "like", "pizza", "to", "eat"],
  },
  {
    level: 7,
    sentence: "We enjoy solving puzzles",
    words: ["puzzles", "solving", "We", "enjoy"],
  },
  {
    level: 8,
    sentence: "She is reading a book",
    words: ["reading", "book", "a", "She", "is"],
  },
  {
    level: 9,
    sentence: "He went to the park",
    words: ["park", "to", "He", "the", "went"],
  },
  {
    level: 10,
    sentence: "They are learning English",
    words: ["They", "learning", "are", "English"],
  },
  {
    level: 11,
    sentence: "I am watching TV",
    words: ["I", "watching", "TV", "am"],
  },
  {
    level: 12,
    sentence: "She likes swimming in the pool",
    words: ["swimming", "She", "in", "the", "pool", "likes"],
  },
  {
    level: 13,
    sentence: "We went to the zoo",
    words: ["We", "the", "went", "zoo", "to"],
  },
  {
    level: 14,
    sentence: "He is playing chess",
    words: ["He", "chess", "playing", "is"],
  },
  {
    level: 15,
    sentence: "They love listening to music",
    words: ["They", "music", "to", "love", "listening"],
  },
  {
    level: 16,
    sentence: "I am reading a newspaper",
    words: ["newspaper", "reading", "a", "I", "am"],
  },
  {
    level: 17,
    sentence: "She is going to the library",
    words: ["library", "She", "the", "is", "going", "to"],
  },
  {
    level: 18,
    sentence: "We enjoy playing football",
    words: ["football", "enjoy", "We", "playing"],
  },
  {
    level: 19,
    sentence: "He likes eating ice cream",
    words: ["ice", "cream", "He", "likes", "eating"],
  },
  {
    level: 20,
    sentence: "They are going on a trip",
    words: ["They", "a", "on", "going", "trip", "are"],
  },
];

export default function SentenceRace() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);

  const levelData = levels[currentLevel];
  const shuffledWords = [...levelData.words].sort(() => Math.random() - 0.5);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) setTimeLeft(timeLeft - 1);
      else setMessage("Time's up! Try again.");
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleWordClick = (word) => {
    setSelectedWords([...selectedWords, word]);
  };

  const handleSubmit = () => {
    if (selectedWords.join(" ") === levelData.sentence) {
      setScore(score + timeLeft); // score based on remaining time
      setMessage("Correct! Next level unlocked.");
      setTimeout(() => {
        if (currentLevel < levels.length - 1) {
          setCurrentLevel(currentLevel + 1);
          setSelectedWords([]);
          setTimeLeft(30);
          setMessage("");
        } else {
          setMessage("Congratulations! All 20 levels completed!");
        }
      }, 1000);
    } else {
      setMessage("Incorrect! Try again.");
    }
  };

  const handleReset = () => {
    setSelectedWords([]);
    setTimeLeft(30);
    setMessage("");
  };

  return (
    <div className="sentence-race-container">
      <h2>Sentence Formation Race - Level {currentLevel + 1}</h2>
      <p>Arrange the jumbled words into a correct sentence:</p>

      <div className="jumbled-words">
        {shuffledWords.map((word, idx) => (
          <button
            key={idx}
            className="word-btn"
            onClick={() => handleWordClick(word)}
            disabled={selectedWords.includes(word)}
          >
            {word}
          </button>
        ))}
      </div>

      <div className="selected-sentence">
        <h3>{selectedWords.join(" ")}</h3>
      </div>

      <div className="actions">
        <button onClick={handleSubmit} className="submit-btn">
          Submit
        </button>
        <button onClick={handleReset} className="reset-btn">
          Reset
        </button>
      </div>

      <div className="info">
        <p>Time Left: {timeLeft}s</p>
        <p>Score: {score}</p>
      </div>

      {message && <p className="message">{message}</p>}
    </div>
  );
}
