import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://digitaledubackend.onrender.com/api/auth/login",
        { email, password },
      );

      console.log("Login response:", res.data);

      if (res.data.success) {
        const userData = res.data.data.user;
        const token = res.data.data.token;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));

        navigate("/dashboard");
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.response?.data?.message || "Server error, try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* 🔥 BACKGROUND SVG */}
      <svg
        className="login-bg-svg"
        viewBox="0 0 900 600"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle cx="120" cy="100" r="180" fill="#e8ecfb" opacity="0.5" />
        <circle cx="780" cy="480" r="160" fill="#f0ebe8" opacity="0.5" />
        <circle cx="820" cy="80" r="100" fill="#d6e4f7" opacity="0.35" />
        <circle cx="60" cy="500" r="120" fill="#ede8fb" opacity="0.35" />
        <circle cx="450" cy="560" r="90" fill="#e8f4fd" opacity="0.3" />

        <circle
          cx="120"
          cy="100"
          r="38"
          fill="none"
          stroke="#6366f1"
          strokeWidth="1.5"
          opacity="0.2"
          className="pulse-ring"
        />

        <circle
          cx="780"
          cy="480"
          r="38"
          fill="none"
          stroke="#3498db"
          strokeWidth="1.5"
          opacity="0.2"
          className="pulse-ring"
        />

        {/* Icons */}
        <text
          x="160"
          y="504"
          textAnchor="middle"
          fontSize="22"
          fill="#8b5cf6"
          opacity="0.5"
        >
          🎓
        </text>

        <text
          x="740"
          y="207"
          textAnchor="middle"
          fontSize="18"
          fill="#06b6d4"
          opacity="0.5"
        >
          💡
        </text>

        <text
          x="381"
          y="65"
          textAnchor="middle"
          fontSize="20"
          fill="#3498db"
          opacity="0.4"
        >
          📚
        </text>

        <text
          x="680"
          y="536"
          textAnchor="middle"
          fontSize="16"
          fill="#f59e0b"
          opacity="0.5"
        >
          ★
        </text>
      </svg>

      {/* 🔥 LOGIN FORM */}
      <div className="login-form">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="form-footer">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
