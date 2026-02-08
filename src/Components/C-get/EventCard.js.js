import "../C-get/EventCard.css";

export default function EventCard() {
  return (
    <div className="event-wrapper">
      {/* Heading */}
      <h1 className="certificate-heading">Certificate Download</h1>

      <article className="card">
        <div className="thumb"></div>
        <div className="infos">
          <h2 className="title">
            Quiz Certificate <span className="flag"></span>
          </h2>
          <h3 className="date">Complete Your Quiz</h3>
          <h3 className="seats">Earn your certificate instantly</h3>
          <p className="txt">
            Here you can download your certificate once you complete the quiz
            test. The certificate will be generated with your name.
          </p>
          <a href="/pdf" className="details-btn">
            Download Certificate
          </a>
        </div>
      </article>
    </div>
  );
}
