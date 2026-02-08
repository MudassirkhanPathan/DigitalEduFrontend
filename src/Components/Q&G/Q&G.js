import { Link } from "react-router-dom";
import boyAnimation from "../Q&G/Boys.gif";
import "../Q&G/Q&G.css";

export default function HeroSection() {
  return (
    <div className="hq-hero-container">
      {/* Center Main Heading */}
      <h1 className="hq-main-heading">
        Welcome to <span>Digital Quiz & Games</span>
      </h1>

      {/* Left Side - Animated GIF */}
      <div className="hq-hero-left">
        <img
          src={boyAnimation}
          alt="Animated Boy"
          className="hq-boy-animation"
        />
      </div>

      {/* Right Side - Sub Heading + Cards */}
      <div className="hq-hero-right">
        <h2 className="hq-hero-heading">
          Let's do <span>QUIZ</span> & <span>GAMES</span>
        </h2>

        <div className="hq-cards-wrapper">
          {/* QUIZ Card */}
          <Link to="/Quiz-page" className="hq-card hq-top-card">
            <h2>QUIZ</h2>
            <span className="hq-card-link">Start Quiz ➡️</span>
          </Link>

          {/* GAMES Card */}
          <Link to="/Main-games" className="hq-card hq-bottom-card">
            <h2>GAMES</h2>
            <span className="hq-card-link">Play Games ➡️</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
