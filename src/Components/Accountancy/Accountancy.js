import React, { useState,useEffect } from 'react';
import '../Mathematics/Maths.css'; 
import AccountancyData from './AccountancyData.json'; 

const MpBoardData = () => {
  return (
    <div style={{height:"500px" ,overflow:"scroll"}} >
           <table className="popup-table" style={{height:"500px"}}>
        <thead>
          <tr>
            <th>S No.</th>
            <th>Chapter</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
        <tr><td>01</td><td>Relations and Functions</td><td>5</td></tr>
          <tr><td>02</td><td>Inverse Trigonometric Functions</td><td>6</td></tr>
          <tr><td>03</td><td>Matrices</td><td>6</td></tr>
          <tr><td>04</td><td>Determinant</td><td>6</td></tr>
          <tr><td>05</td><td>Continuity and Differentiability</td><td>8</td></tr>
          <tr><td>06</td><td>Applications of Derivatives</td><td>6</td></tr>
          <tr><td>07</td><td>Integration</td><td>12</td></tr>
          <tr><td>08</td><td>Applications of integrals</td><td>3</td></tr>
          <tr><td>09</td><td>Differential Equations</td><td>6</td></tr>
          <tr><td>10</td><td>Vector Algebra</td><td>7</td></tr>
          <tr><td>11</td><td>Three Dimensional Geometry</td><td>7</td></tr>
          <tr><td>12</td><td>Linear Programming</td><td>3</td></tr>
          <tr><td>13</td><td>Probability</td><td>5</td></tr>
          <tr><td><strong>Total</strong></td><td></td><td><strong>100</strong></td></tr>
        </tbody>
      </table>
    </div>
  );
};
const CBSCData = () => {
  return (
    <div style={{height:"500px" ,overflow:"scroll"}} >
           <table className="popup-table" style={{height:"500px"}}>
        <thead>
          <tr>
            <th>नं</th>
            <th>विषय</th>
            <th>मार्क्स</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>01</td><td>संबंध् एवं फलन</td><td>5</td></tr>
          <tr><td>02</td><td>प्रतिलोम त्रिकोणमितीय फलन</td><td>6</td></tr>
          <tr><td>03</td><td>आव्यूह</td><td>6</td></tr>
          <tr><td>04</td><td>सारणिक</td><td>6</td></tr>
          <tr><td>05</td><td>सांतत्य तथा अवकलनीयता</td><td>8</td></tr>
          <tr><td>06</td><td>अवकलज वेफ अनुप्रयोग</td><td>6</td></tr>
          <tr><td>07</td><td>समाकलन</td><td>12</td></tr>
          <tr><td>08</td><td>समाकलनों वेफ अनुप्रयोग</td><td>3</td></tr>
          <tr><td>09</td><td>अवकल समीकरण</td><td>6</td></tr>
          <tr><td>10</td><td>सदिश बीजगणित</td><td>7</td></tr>
          <tr><td>11</td><td>त्रि-विमीय ज्यामिति</td><td>7</td></tr>
          <tr><td>12</td><td>रैखिक प्रोग्रामन</td><td>3</td></tr>
          <tr><td>13</td><td>प्रायिकता</td><td>5</td></tr>
          <tr><td><strong>कुल</strong></td><td></td><td><strong>100</strong></td></tr>
        </tbody>
      </table>
    </div>
  );
};

export default function Accountancy() {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openPopup = (chapter) => {
    setSelectedChapter(chapter);
  };

  const closePopup = () => {
    setSelectedChapter(null);
    setSelectedCard(null);
  };

  const openCardPopup = (card) => {
    setSelectedCard(card);
  };

  // ============ slider start =============
  const slides = [
    { img: "./images/Account-slide1.png", content: "Content for Slide 1" },
    { img: "./images/Account-slide2.png", content: "Content for Slide 2" },
    { img: "./images/Account-slide3.png", content: "Content for Slide 3" }
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
    {/* ========== account blueprint start =============== */}
    <div className="container-blueprint">
      <div className="card-blueprint blueprint-popup" onClick={() => openCardPopup({ title: "MP BOARD BLUEPRINT", link: <MpBoardData /> })}>
        <img src="./images/mpboard.png" alt="Image 1" />
        <div className="card-blueprint-content">
          <h2>MP BOARD BLUEPRINT</h2>
          <p>Accountancy Blueprint</p>
          
        </div>
      </div>
      <div className="card-blueprint" onClick={() => openCardPopup({title: "CBSC BOARD BLUEPRINT", link: <CBSCData/>})}>
        <img src="./images/cbscboard.png" alt="Image 2" />
        <div className="card-blueprint-content">
          <h2>CBSE BOARD BLUEPRINT</h2>
          <p>Accountancy Blueprint</p>
        </div>
      </div>
      
    </div>
    {/* ========== account blueprint end =============== */}

    {/* ========== account slider start =============== */}
    <div className="instruct-slider">
      <h1>Instructions</h1>
      <div className="slides" style={{ transform: `translateX(${-currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            <img className="slider-images" src={slide.img} alt={`Slide ${index + 1}`} />
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
    {/* ========== account slider end =============== */}

 {/* =========== account table start =========== */}
    <div className="table-container">
      <h2>ACCOUNTANCY</h2>
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
          {AccountancyData.map((chapter) => (
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
            <td className="table-Total">80</td>
            <td className="delete-icon"></td>
          </tr>
        </tbody>
      </table>

      {selectedChapter && (
        <div className={`popup-container ${selectedChapter ? 'open' : ''}`}>
          <div className="overlay open" onClick={closePopup}></div>
          <div className="popup open" style={{border:'2px solid'}}>
            <div className="popup-header">
              <h2>ACCOUNTANCY DETAILS</h2>
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
     {/* =========== account table end =========== */}

      {/* =========== card popup =========== */}
      {selectedCard && (
        <div className={`popup-container ${selectedCard ? 'open' : ''}`}>
          <div className="overlay open" onClick={closePopup}></div>
          <div className="popup open">
            <div className="popup-header">
              <h2>{selectedCard.title}</h2>
              <button className="popup-close" onClick={closePopup}>&times;</button>
            </div>
            <div className="popup-body">
              <p>{selectedCard.link}</p>
            </div>
          </div>
        </div>
      )}
      {/* =========== card popup end =========== */}
    </>
  );
}


 