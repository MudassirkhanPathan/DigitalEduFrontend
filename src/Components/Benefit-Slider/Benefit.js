import Slider from "react-slick";
import "../Benefit-Slider/Benefit.css";

export default function Benefit() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const sliderData = [
    {
      img: "./images/boards.jpeg",
      text: "You will get a blueprint of every subject.",
      name: "Marking Scheme",
    },
    {
      img: "./images/ncertB.png",
      text: "NCERT Books of all subject will be available",
      name: "NCERT Books",
    },
    {
      img: "./images/textSolution.png",
      text: "Exercise Solution on portals",
      name: "Solutions of Chapters",
    },
    {
      img: "./images/video.png",
      text: "Solution in youtube",
      name: "Video Solutions",
    },
    {
      img: "./images/solution.png",
      text: "Three different types of Solution",
      name: "Question Solution",
    },
  ];

  return (
    <div className="slider-container">
      <h1>Benefits</h1>
      <Slider {...settings}>
        {sliderData.map((slide, index) => (
          <div key={index} className="benefit-slide">
            <div className="dots">
              <img src={slide.img} alt="avatar" />
              <h3>{slide.name}</h3>
              <p>{slide.text}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
