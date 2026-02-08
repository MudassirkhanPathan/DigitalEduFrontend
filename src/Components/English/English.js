import React, { useState,useEffect } from 'react';
import '../Mathematics/Maths.css'; 
import EnglishData from './EnglishData.json';
import EnglishData2 from './EnglishData2.json' 

export default function English() {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const[selectedSChapter,setSelectedSChapter]= useState(null)

  const openPopup = (chapter) => {
    setSelectedChapter(chapter);
   
  };
  const openPopupS = (Schapter)=>{
    setSelectedSChapter(Schapter)

  }
  const closePopupS = ()=>{
    setSelectedSChapter(null);

  } 

  const closePopup = () => {
    setSelectedChapter(null);
  };


  // ============ slider start =============
  const slides = [
    { img: "./images/slide1.png", content: "Content for Slide 1" },
    { img: "./images/slide2.png", content: "Content for Slide 2" },
    { img: "./images/slide3.png", content: "Content for Slide 3" }
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
      {/* ========== english blueprint start =============== */}
      <div className="container-blueprint">
        <div className="card-blueprint blueprint-popup">
          <img src="./images/mpboard.png" alt="Image 1" />
          <div className="card-blueprint-content">
            <h2>MP BOARD BLUEPRINT</h2>
            <p>English Blueprint</p>
            
          </div>
        </div>
        <div className="card-blueprint">
          <img src="./images/cbscboard.png" alt="Image 2" />
          <div className="card-blueprint-content">
            <h2>CBSE BOARD BLUEPRINT</h2>
            <p>English Blueprint</p>
          </div>
        </div>
        
      </div>
      {/* ========== english blueprint end =============== */}

      {/* ========== english slider start =============== */}
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
      {/* ========== english slider end =============== */}

       {/* ========== english table start =============== */}

    <div className="table-container">
      <h2>ENGLISH (Flamingo)</h2>
      <table>
        <thead>
          <tr>
            <th>S no.</th>
            <th>Chapters</th>
            <th className="blueprint-num">Marks</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {EnglishData.map((chapter) => (
            <tr key={chapter.id} onClick={() => openPopup(chapter)}>
              <td>{chapter.id}</td>
              <td>{chapter.name}</td>
              <td className="blueprint-num">{chapter.marks}</td>
              <td className="delete-icon"></td>
            </tr>
          ))}
          <tr>
            <td>Total</td>
            <td></td>
            <td className="table-Total">100</td>
            <td className="delete-icon"></td>
          </tr>
        </tbody>
      </table>

      {selectedChapter && (
        <div className={`popup-container ${selectedChapter ? 'open' : ''}`}>
          <div className="overlay open" onClick={closePopup}></div>
          <div className="popup open" style={{border:'2px solid'}}>
            <div className="popup-header">
              <h2>ENGLISH DETAILS</h2>
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
      {/* ========== english table end =============== */}


 {/* ================ Second Table ================  */}
<div className="table-container">
      <h2>ENGLISH (Vistas)</h2>
      <table>
        <thead>
          <tr>
            <th>S no.</th>
            <th>Chapters</th>
            <th className="blueprint-num">Marks</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {EnglishData2.map((Schapter) => (
            <tr key={Schapter.id} onClick={() => openPopupS(Schapter)}>
              <td>{Schapter.id}</td>
              <td>{Schapter.Sname}</td>
              <td className="blueprint-num">{Schapter.SHname}</td>
              <td className="delete-icon"></td>
            </tr>
          ))}
          <tr>
            <td>Total</td>
            <td></td>
            <td className="table-Total">100</td>
            <td className="delete-icon"></td>
          </tr>
        </tbody>
      </table>

      {selectedSChapter && (
        <div className={`popup-container ${selectedSChapter ? 'open' : ''}`}>
          <div className="overlay open" onClick={closePopupS}></div>
          <div className="popup open" style={{border:'2px solid'}}>
            <div className="popup-header">
              <h2>ENGLISH DETAILS</h2>
              <button className="popup-close" onClick={closePopupS}>&times;</button>
            </div>
            <div className="popup-body">
              <table>
                <tbody>
                <tr><th>S no.</th><td>{selectedSChapter.id}</td><td>{selectedSChapter.id}</td></tr>
                  <tr><th>Chapter Name</th><td>{selectedSChapter.Sname}</td><td>{selectedSChapter.SHname}</td></tr>
                  <tr><th>NCERT BOOK</th>
                    <td><a href={selectedSChapter.SncertLink} target="_blank" rel="noopener noreferrer">{selectedSChapter.Sname}</a></td><td><a href={selectedSChapter.SHncertLink} target="_blank" rel="noopener noreferrer">{selectedSChapter.SHname}</a></td>
                  </tr>
                  <tr><th>Chapter Solutions</th>
                     <td className='chapterLinks'>
                  
                      <a className='C-links' href={selectedSChapter.SchapterLinks.SchapterLink1} target="_blank" rel="noopener noreferrer">Solution 1</a><br/>
                      <a className='C-links' href={selectedSChapter.SchapterLinks.SchapterLink2} target="_blank" rel="noopener noreferrer">Solution 2</a><br/>
                      <a className='C-links' href={selectedSChapter.SchapterLinks.SchapterLink3} target="_blank" rel="noopener noreferrer">Solution 3</a><br/>

                    </td>
                    <td className='chapterLinks'>
                  
                      <a className='C-links' href={selectedSChapter.SHchapterLinks.SHchapterLink1} target="_blank" rel="noopener noreferrer">Solution 1</a><br/>
                      {/* <a className='C-links' href={selectedChapter.HchapterLinks.HchapterLink2} target="_blank" rel="noopener noreferrer">Solution 2</a><br/>
                      <a className='C-links' href={selectedChapter.HchapterLinks.HchapterLink3} target="_blank" rel="noopener noreferrer">Solution 3</a><br/> */}

                    </td> 
                  </tr>
                  <tr><th>YouTube Links</th>
                    <td className='youtubeLinks'>
                    
                {selectedSChapter.SyoutubeLinks.SyoutubeLinks1 && (
                        <a className='C-links' href={selectedSChapter.SyoutubeLinks.SyoutubeLinks1} target="_blank" rel="noopener noreferrer">YouTube Solution 1</a>
                      )}
                      {selectedSChapter.SyoutubeLinks.SyoutubeLinks2 && (
                        <a className='C-links' href={selectedSChapter.SyoutubeLinks.SyoutubeLinks2} target="_blank" rel="noopener noreferrer">YouTube Solution 2</a>
                      )}
                      {selectedSChapter.SyoutubeLinks.SyoutubeLinks3 && (
                        <a className='C-links' href={selectedSChapter.SyoutubeLinks.SyoutubeLinks3} target="_blank" rel="noopener noreferrer">YouTube Solution 3</a>
                      )}

                     
                    </td>
                    <td className='youtubeLinks'>
                    
                {selectedSChapter.SyoutubeLinks.SyoutubeLinks1 && (
                        <a className='C-links' href={selectedSChapter.SHyoutubeLinks.SHyoutubeLinks1} target="_blank" rel="noopener noreferrer">YouTube Solution 1</a>
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
    
      {/* ========== second table  end =============== */}
    </>
  );
}


 