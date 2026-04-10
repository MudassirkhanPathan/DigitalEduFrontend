import axios from "axios";
import { useState } from "react";
import "../Certificate/Certificate.css";
export default function Certificate() {
  const [studentName, setStudentName] = useState("");
  const [subject, setSubject] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null); // pdf url store

  const handleGenerate = async () => {
    if (!studentName || !subject) {
      alert("Please enter your name and select subject");
      return;
    }

    try {
      const res = await axios.post(
        "https://digitaledubackend.onrender.com/api/certificate/generate",
        {
          studentName,
          subject,
        },
      );

      setPdfUrl(`http://localhost:5000${res.data.file}`); // pdf url set
    } catch (err) {
      console.error("Certificate error:", err.response?.data || err.message);
      alert("Something went wrong while generating certificate");
    }
  };

  return (
    <div className="certificate-container">
      <h2>Download Your Certificate</h2>

      <input
        type="text"
        placeholder="Enter your name"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        className="input-box"
        required
      />

      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="select-box"
      >
        <option value="">-- Select Subject --</option>
        <option value="Physics">Physics</option>
        <option value="Chemistry">Chemistry</option>
        <option value="Math">Math</option>
      </select>

      <button onClick={handleGenerate} className="download-btn">
        Generate Certificate
      </button>

      {pdfUrl && (
        <div className="pdf-preview">
          <h3>Certificate Preview</h3>
          <iframe
            src={pdfUrl}
            width="100%"
            height="500px"
            style={{ border: "1px solid #ccc", borderRadius: "8px" }}
            title="Certificate Preview"
          ></iframe>
          <a href={pdfUrl} download className="download-btn">
            Download Certificate
          </a>
        </div>
      )}
    </div>
  );
}
