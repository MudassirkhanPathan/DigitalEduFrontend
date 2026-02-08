import { useEffect, useState } from "react";
import "../Instruction-slider/InstructSlider.css";

export default function InstructSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      img: "/images/slide1.png",
      content: "Step 1: Read all instructions carefully.",
    },
    {
      img: "/images/slide2.png",
      content: "Step 2: Make sure your system is ready.",
    },
    {
      img: "/images/slide3.png",
      content: "Step 3: Start the quiz and stay focused.",
    },
  ];

  const totalSlides = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 4000); // 4 seconds per slide

    return () => clearInterval(interval);
  }, [totalSlides]);

  const showSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="slider">
      <h2 className="slider-title">Instructions</h2>
      <div className="slides-wrapper">
        <div
          className="slides"
          style={{ transform: `translateX(${-currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="slide">
              <img
                src={slide.img}
                alt={`Slide ${index + 1}`}
                className="slide-image"
              />
              <p className="slide-content">{slide.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="navigation-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => showSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}
