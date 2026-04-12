import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      return alert("All fields required");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://digitaledubackend.onrender.com/api/auth/signup",
        form,
      );

      if (res.data.success) {
        alert("Signup successful 🚀");
        navigate("/login");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* 🔥 SAME BACKGROUND SVG */}
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

      {/* 🔥 FORM (same class as login) */}
      <div className="login-form">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            {loading ? "Creating..." : "Signup"}
          </button>
        </form>

        <p className="form-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
