import { Link } from "react-router-dom";
import "../Homepage/Home.css";

export default function Home() {
  return (
    <div>
      <header className="homeNav">
        <h2>
          <a href="#">EduNova</a>
        </h2>
        <ul className="nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/subject">Subject</Link>
          </li>
          <li>
            <Link to="/about">About us</Link>
          </li>
          <li>
            <Link to="/benefit">Benefits</Link>
          </li>
        </ul>
      </header>
      <section className="box">
        <video autoPlay loop muted>
          <source src="/images/bgVideo.mp4" type="video/mp4" />
        </video>
        <div className="boxBlur">
          <h1>
            {" "}
            Unlock Your <span>Class 12th Journey</span>{" "}
          </h1>
          <h3>
            “Learning is not about memorizing, it’s about{" "}
            <span>exploring, adapting,</span>
            and creating your own future.”{" "}
          </h3>
          {/* Ask Anything Button */}
          <Link to="/ask-question" className="ask-ai-link">
            <div className="ask-ai-box">
              <div className="ask-ai-header">AI Assist</div>
              <div className="ask-ai-content">
                <p>
                  <span className="blue">Evening</span>{" "}
                  <span className="black">James</span>,<br />
                  <span className="blue">How can I</span>{" "}
                  <span className="purple">help you with?</span>
                </p>
              </div>
              <div className="ask-ai-input">
                <input type="text" placeholder="Ask me anything..." disabled />
              </div>
            </div>
          </Link>
        </div>
      </section>
      {/* <!-- =========== Main vedio box END =============== --> */}

      {/* <!-- ========= Subject Cards Start ============== --> */}
    </div>
  );
}
