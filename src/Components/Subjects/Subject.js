import { Link } from "react-router-dom";
import "../Subjects/Subjects.css";

export default function Subjects() {
  return (
    <div className="subjects-section">
      <h1 className="subjects-heading">Subjects</h1>

      <div className="container">
        {/* Mathematics Card */}
        <div className="card">
          <h2>MATHEMATICS</h2>
          <img src="./images/maths.png" className="iconMaths" alt="Maths" />
          <div className="button-group">
            <Link to="/maths">
              <button>MATHS</button>
            </Link>
            <Link to="/physics">
              <button>PHYSICS</button>
            </Link>
            <Link to="/chemistry">
              <button>CHEMISTRY</button>
            </Link>
            <Link to="/english">
              <button>ENGLISH</button>
            </Link>
            <Link to="/hindi">
              <button>HINDI</button>
            </Link>
          </div>
        </div>

        {/* Biology Card */}
        <div className="card">
          <h2>BIOLOGY</h2>
          <img src="./images/bio.png" className="icon" alt="Biology" />
          <div className="button-group">
            <Link to="/bio">
              <button>BIOLOGY</button>
            </Link>
            <Link to="/physics">
              <button>PHYSICS</button>
            </Link>
            <Link to="/chemistry">
              <button>CHEMISTRY</button>
            </Link>
            <Link to="/english">
              <button>ENGLISH</button>
            </Link>
            <Link to="/hindi">
              <button>HINDI</button>
            </Link>
          </div>
        </div>

        {/* Commerce Card */}
        <div className="card">
          <h2>COMMERCE</h2>
          <img src="./images/commerce.png" className="icon" alt="Commerce" />
          <div className="button-group">
            <Link to="/account">
              <button>ACCOUNTANCY</button>
            </Link>
            <Link to="/business">
              <button>BUSINESS STUDIES</button>
            </Link>
            <Link to="/economics">
              <button>ECONOMICS</button>
            </Link>
            <Link to="/english">
              <button>ENGLISH</button>
            </Link>
            <Link to="/hindi">
              <button>HINDI</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
