import { Link } from "react-router-dom";
import "../Projectile/Projectile.css"; // alag CSS file banao

export default function FourCards() {
  const cards = [
    {
      title: "Puzzle Game",
      desc: "Aptitude / Reasoning – Logic Puzzle",
      link: "/Aptitude-games",
    },
    {
      title: "Chemistry Game",
      desc: "Test periodic table knowledge",
      link: "/Chemistry-games",
    },
    {
      title: "Biology Game",
      desc: "Human Body Puzzle",
      link: "/Biology-games",
    },
    {
      title: "English Race",
      desc: "Grammar & sentence building",
      link: "/English-games",
    },
  ];

  return (
    <div className="game-cards-section">
      <h2 className="game-cards-heading">Select & Play</h2>
      <div className="game-cards-container">
        {cards.map((card, i) => (
          <Link to={card.link} key={i} className="game-card">
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
