import { useState } from "react";
import { Link } from "react-router-dom";
import "../Footer/Footer.css";

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [showPopup, setShowPopup] = useState(false); // Popup state
  const [popupMessage, setPopupMessage] = useState(""); // Popup text

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setPopupMessage(
        "✅ Your query has been submitted! Our support team will reach out soon."
      );
      setShowPopup(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setPopupMessage(`❌ ${err.message}`);
      setShowPopup(true);
      console.error("Submit error:", err);
    }
  };

  return (
    <footer>
      <div className="footer-container">
        {/* Left Side - Info */}
        <div className="footer-info">
          <h3>EduHub</h3>
          <p>Your one-stop platform for learning & growth</p>
          <p>
            <strong>Support:</strong> support@eduhub.com
          </p>
          <p>
            <strong>Call us:</strong> +91-9644045744
          </p>
          <p>
            <strong>Find us:</strong> EduHub HQ, Knowledge Park, Khargone, India
          </p>
        </div>

        {/* Right Side - Contact Form */}
        <div className="footer-form">
          <h3>Have a Question?</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="Your name *"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your email *"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="text"
              name="subject"
              placeholder="Subject (e.g. Exam, Payment, Quiz)"
              value={formData.subject}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} EduHub | Learn. Grow. Succeed.</p>
        <div className="footer-links">
          <Link to="/about">About Us</Link>
          <Link to="/faq">FAQs</Link>
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
        <div className="social-links">
          <a href="#">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-content">
            <p>{popupMessage}</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </footer>
  );
}
