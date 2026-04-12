import { useNavigate } from "react-router-dom";
import profileImg from "../StudentRelated/Study.gif";
import "./Student.css";

const Student = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const handleExplore = (e) => {
    e.stopPropagation();
    navigate("/features");
  };

  const handleHowItWorks = (e) => {
    e.stopPropagation();
    navigate("/how-it-works");
  };

  return (
    <section className="student-section">
      {/* ── Section Heading above card ── */}
      <div className="section-eyebrow">
        <div className="eyebrow-line" />
        <span className="eyebrow-text">Smart Learning Platform</span>
      </div>

      <h2 className="section-heading">
        Your gateway to <span>knowledge</span> &amp; growth
      </h2>

      {/* ── Hero Card ── */}
      <div className="hero-wrapper" onClick={handleClick}>
        {/* Optional live badge */}
        <div className="hero-badge">🎓 10,000+ Active Learners</div>

        {/* ── Left ── */}
        <div className="left-section">
          <h1>
            Learn Smarter.
            <br />
            Build Your <span className="highlight">Future</span>
            <br />
            with EduNova.
          </h1>

          <div className="tagline">
            <div className="avatar-sm">EN</div>
            <p>
              Track your progress, complete expert-curated courses, and unlock
              your full potential — all in one smart dashboard.
            </p>
          </div>

          <div className="btn-row">
            <button className="btn-primary">Explore Features</button>

            <div className="btn-secondary" onClick={handleHowItWorks}>
              <div className="play-icon" />
              How it works
            </div>
          </div>
        </div>

        {/* ── Right ── */}
        <div className="right-section">
          <div className="stats-col">
            <div className="stat-card">
              <div className="num">120+</div>
              <div className="lbl">Expert Courses</div>
            </div>
            <div className="stat-card">
              <div className="num">85%</div>
              <div className="lbl">Completion Rate</div>
            </div>
          </div>

          <div className="image-circle">
            <img
              src={profileImg}
              alt="Student learning"
              className="profile-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Student;
