import { useState } from "react";
import "../Information/Information.css";

const FAQ = () => {
  const [activeTab, setActiveTab] = useState("study");

  const tabs = [
    { id: "study", label: "Study Material" },
    { id: "teachers", label: "Teachers & Support" },
    { id: "exams", label: "Exams & Results" },
    { id: "quiz", label: "Quiz & Rewards" },
    { id: "payment", label: "Payments" },
  ];

  const faqData = {
    study: [
      {
        question: "Will I get the complete syllabus?",
        answer:
          "Yes, you will get the complete syllabus for every subject in one place, updated regularly as per the board.",
      },
      {
        question: "Are video lectures available?",
        answer:
          "Yes, high-quality video lectures are available that make concepts easier and more interactive to understand.",
      },
      {
        question: "In what format are the solutions provided?",
        answer:
          "Solutions are provided in both text and video formats, including step-by-step explanations for exercises.",
      },
      {
        question: "Can I download study materials?",
        answer:
          "Yes, most of the study materials and notes can be downloaded for offline use.",
      },
      {
        question: "Are previous year question papers available?",
        answer:
          "Yes, we provide past year question papers along with their solutions for better exam preparation.",
      },
    ],
    teachers: [
      {
        question: "Can I directly talk to a teacher?",
        answer:
          "Yes, you can directly interact with teachers via live sessions or chat to clear your doubts.",
      },
      {
        question: "When is teacher support available?",
        answer:
          "Teacher support is available between 9 AM and 9 PM. You can ask your doubts during this time.",
      },
      {
        question: "Will I get personal mentorship?",
        answer:
          "Yes, one-on-one mentorship sessions are available depending on your chosen plan.",
      },
      {
        question: "Are teachers experienced and certified?",
        answer:
          "All teachers are highly qualified, experienced, and certified in their respective subjects.",
      },
    ],
    exams: [
      {
        question: "Where can I find the timetable and exam details?",
        answer:
          "You will find all exam timetables, important dates, and official board notifications in one place.",
      },
      {
        question: "Will I get results on the platform?",
        answer:
          "Yes, both board exam results and mock test results will be available directly on the platform.",
      },
      {
        question: "Do you provide mock tests?",
        answer:
          "Yes, multiple mock tests are available for practice, designed as per the latest exam pattern.",
      },
      {
        question: "Will I get exam notifications?",
        answer:
          "Yes, you will receive timely notifications and updates about upcoming exams and important dates.",
      },
    ],
    quiz: [
      {
        question: "How will the quizzes work?",
        answer:
          "Quizzes will be available for every subject and chapter to test your preparation.",
      },
      {
        question: "How will I earn rewards?",
        answer:
          "Based on your quiz performance, you will earn points, badges, and exciting rewards.",
      },
      {
        question: "Are quizzes timed?",
        answer:
          "Yes, quizzes are time-bound to simulate the real exam environment.",
      },
      {
        question: "Can I track my quiz performance?",
        answer:
          "Yes, you will get detailed analytics for every quiz attempt to measure your progress.",
      },
    ],
    payment: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept UPI, debit/credit cards, net banking, and EMI options for eligible plans.",
      },
      {
        question: "Is there a refund policy?",
        answer:
          "No, refunds are not available. However, we provide complete support and guaranteed services with every plan.",
      },
      {
        question: "Do you offer EMI or installment options?",
        answer: "No, Options are available.",
      },
      {
        question: "Is my payment secure?",
        answer:
          "Yes, all transactions are 100% secure and encrypted using trusted payment gateways.",
      },
    ],
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <p className="faq-subtitle">
        Find answers related to study, teachers, exams, and payments
      </p>

      <div className="faq-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`faq-tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="faq-content">
        {faqData[activeTab].map((item, index) => (
          <div key={index} className="faq-item">
            <h3 className="faq-question">{item.question}</h3>
            <p className="faq-answer">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
