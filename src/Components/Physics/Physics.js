import React, { useState,useEffect } from 'react';
import '../Mathematics/Maths.css'; 
import PhysicsData from './PhysicsData.json'; 



export default function Physics() {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openPopup = (chapter) => {
    setSelectedChapter(chapter);
  };

  const closePopup = () => {
    setSelectedChapter(null);
  };

  // ============ slider start =============
  const slides = [
    { img: "./images/Physics-slide1.png", content: "Content for Slide 1" },
    { img: "./images/Physics-slide2.png", content: "Content for Slide 2" },
    { img: "./images/Physics-slide3.png", content: "Content for Slide 3" }
  ];

  const totalSlides = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, totalSlides]);

  const showSlide = (index) => {
    setCurrentIndex(index);
  };
  // ============ slider end =============

 return (
    <>
    {/* ========== physics blueprint start =============== */}
   <div className="container-blueprint">
        <div className="card-blueprint blueprint-popup"> 
          <img src="./images/mpboard.png" alt="Image 1" />
          <div className="card-blueprint-content">
           <a href='https://www.mpbse.nic.in/MARKING%20SCHEME_2024_25.pdf'> <h2>MP BOARD BLUEPRINT</h2></a>
            <p>Physics Blueprint</p>
            
          </div>
        </div>
        <div className="card-blueprint">
          <img src="./images/cbscboard.png" alt="Image 2" />
          <div className="card-blueprint-content">
           <a href='https://cbseacademic.nic.in/web_material/CurriculumMain25/SrSec/Physics_SrSec_2024-25.pdf'> <h2>CBSE BOARD BLUEPRINT</h2></a>
            <p>Physics Blueprint</p>
          </div>
        </div>
        
      </div>
  {/* ========== physics blueprint end =============== */}
   
     {/* ========== physics slider start =============== */}
     <div className="instruct-slider">
        <h1>Instructions</h1>
        <div className="slides" style={{ transform: `translateX(${-currentIndex * 100}%)` }}>
          {slides.map((slide, index) => (
            <div key={index} className="slide">
              <img className="slider-images" src={slide.img} style={{height: "300px"}} alt={`Slide ${index + 1}`} />
              <br />
              {slide.content}
            </div>
          ))}
        </div>
        <div className="navigation-dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => showSlide(index)}
            ></span>
          ))}
        </div>
      </div>
      {/* ========== physics slider end =============== */}

  {/* =========== physics table start =========== */}
    <div className="table-container">
      <h2>PHYSICS</h2>
      <table>
        <thead>
          <tr>
            <th>S no.</th>
            <th>Chapters</th>
            <th className="blueprint-num">अध्याय</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {PhysicsData.map((chapter) => (
            <tr key={chapter.id} onClick={() => openPopup(chapter)}>
              <td>{chapter.id}</td>
              <td>{chapter.name}</td>
              <td className="blueprint-num">{chapter.Hname}</td>
              <td className="delete-icon"></td>
            </tr>
          ))}
          <tr>
            <td>Total</td>
            <td></td>
            <td className="table-Total">70</td>
            <td className="delete-icon"></td>
          </tr>
        </tbody>
      </table>

      {selectedChapter && (
        <div className={`popup-container ${selectedChapter ? 'open' : ''}`}>
          <div className="overlay open" onClick={closePopup}></div>
          <div className="popup open" style={{border:'2px solid'}}>
            <div className="popup-header">
              <h2>PHYSICS DETAILS</h2>
              <button className="popup-close" onClick={closePopup}>&times;</button>
            </div>
            <div className="popup-body">
              <table>
                <tbody>
                <tr><th>S no.</th><td>{selectedChapter.id}</td><td>{selectedChapter.id}</td></tr>
                  <tr><th>Chapter Name</th><td>{selectedChapter.name}</td><td>{selectedChapter.Hname}</td></tr>
                  <tr><th>NCERT BOOK</th>
                    <td><a href={selectedChapter.ncertLink} target="_blank" rel="noopener noreferrer">{selectedChapter.name}</a></td><td><a href={selectedChapter.HncertLink} target="_blank" rel="noopener noreferrer">{selectedChapter.Hname}</a></td>
                  </tr>
                  <tr><th>Chapter Solutions</th>
                     <td className='chapterLinks'>
                  
                      <a className='C-links' href={selectedChapter.chapterLinks.chapterLink1} target="_blank" rel="noopener noreferrer">Solution 1</a><br/>
                      <a className='C-links' href={selectedChapter.chapterLinks.chapterLink2} target="_blank" rel="noopener noreferrer">Solution 2</a><br/>
                      <a className='C-links' href={selectedChapter.chapterLinks.chapterLink3} target="_blank" rel="noopener noreferrer">Solution 3</a><br/>

                    </td>
                    <td className='chapterLinks'>
                  
                      <a className='C-links' href={selectedChapter.HchapterLinks.HchapterLink1} target="_blank" rel="noopener noreferrer">Solution 1</a><br/>
                      {/* <a className='C-links' href={selectedChapter.HchapterLinks.HchapterLink2} target="_blank" rel="noopener noreferrer">Solution 2</a><br/>
                      <a className='C-links' href={selectedChapter.HchapterLinks.HchapterLink3} target="_blank" rel="noopener noreferrer">Solution 3</a><br/> */}

                    </td> 
                  </tr>
                  <tr><th>YouTube Links</th>
                    <td className='youtubeLinks'>
                    
                {selectedChapter.youtubeLinks.youtubeLinks1 && (
                        <a className='C-links' href={selectedChapter.youtubeLinks.youtubeLinks1} target="_blank" rel="noopener noreferrer">YouTube Solution 1</a>
                      )}
                      {selectedChapter.youtubeLinks.youtubeLinks2 && (
                        <a className='C-links' href={selectedChapter.youtubeLinks.youtubeLinks2} target="_blank" rel="noopener noreferrer">YouTube Solution 2</a>
                      )}
                      {selectedChapter.youtubeLinks.youtubeLinks3 && (
                        <a className='C-links' href={selectedChapter.youtubeLinks.youtubeLinks3} target="_blank" rel="noopener noreferrer">YouTube Solution 3</a>
                      )}

                     
                    </td>
                    <td className='youtubeLinks'>
                    
                {selectedChapter.youtubeLinks.youtubeLinks1 && (
                        <a className='C-links' href={selectedChapter.HyoutubeLinks.HyoutubeLinks1} target="_blank" rel="noopener noreferrer">YouTube Solution 1</a>
                      )}
                      {/* {selectedChapter.youtubeLinks.youtubeLinks2 && (
                        <a className='C-links' href={selectedChapter.HyoutubeLinks.HyoutubeLinks2} target="_blank" rel="noopener noreferrer">YouTube Solution 2</a>
                      )} */}
                      {/* {selectedChapter.youtubeLinks.youtubeLinks3 && (
                        <a className='C-links' href={selectedChapter.HyoutubeLinks.HyoutubeLinks3} target="_blank" rel="noopener noreferrer">YouTube Solution 3</a>
                      )} */}

                     
                    </td>  
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
     {/* =========== physics table end =========== */}
     </>
  );
}


 