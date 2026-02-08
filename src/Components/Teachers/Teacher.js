import { useNavigate } from "react-router-dom";
import bioImg from "../Teachers/Biology.png";
import CommerceImg from "../Teachers/Soumyasree.png";
import MathsImg from "../Teachers/maths.png";
import "./Teacher.css";

export const teachers = [
  {
    id: 1,
    name: "Dr. Ramesh Kumar",
    subject: "Mathematics",
    qualification: "M.Sc, PhD (Mathematics)",
    experience: "12+ years teaching experience",
    img: MathsImg,
  },
  {
    id: 2,
    name: "Dr. Sachin Kapur",
    subject: "Biology",
    qualification: "M.Sc, PhD (Biology)",
    experience: "10+ years teaching experience",
    img: bioImg,
  },
  {
    id: 3,
    name: "Mrs. Aastha Verma",
    subject: "Commerce",
    qualification: "M.Com, MBA",
    experience: "8+ years teaching experience",
    img: CommerceImg,
  },
];

export default function TeachersCard() {
  const navigate = useNavigate();

  return (
    <div className="teacher-container">
      <h1 className="teacher-title">Connect with Expert Teachers</h1>
      <div className="teacher-card-grid">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="teacher-card"
            onClick={() =>
              navigate(`/teacher/${teacher.id}`, { state: teacher })
            }
            style={{ cursor: "pointer" }}
          >
            <img
              src={teacher.img}
              alt={teacher.subject}
              className="teacher-img"
            />
            <h2>{teacher.name}</h2>
            <p className="teacher-subject">{teacher.subject} Teacher</p>
            <p className="teacher-detail">{teacher.qualification}</p>
            <p className="teacher-detail">{teacher.experience}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
