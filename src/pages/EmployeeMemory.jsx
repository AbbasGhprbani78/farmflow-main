import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import NavBar from '../Employees/components/NavBar';
import '../Style/MemoryGame.css'
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { GoTriangleLeft, GoTriangleRight } from 'react-icons/go';
import { AiFillStar } from 'react-icons/ai';
import Image from '../components/Image/Image'
import axios from 'axios';
import { IP } from '../App'
import Loading from '../components/Laoding/Loading';


export default function MemoryGame() {

  const [photos, setPhotos] = useState([]);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [boxes, setBoxes] = useState(new Array(photos.length).fill(null));
  const [currentAnswer, setCurrentAnswer] = useState(0)
  const [time, setTime] = useState(60)
  const [point, setPoint] = useState(30);
  const [timerRunning, setTimerRunning] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [result, setResult] = useState()

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      window.history.back();
    }, 1000);
  }

  const getImages = async () => {
    const access = localStorage.getItem("access")
    const headers = {
      Authorization: `Bearer ${access}`
    };
    try {
      const response = await axios.get(`${IP}/send-game-image/`, {
        headers,
      })

      if (response.status === 200) {
        console.log(response)
        setPhotos(response.data.image_urls)
      }

    } catch (e) {
      console.log(e)
      if (e.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh')
        localStorage.removeItem('refresh')
        window.location.href = "/login"
      }
    }
  }
  useEffect(() => {

    if (currentPhotoIndex === photos.length - 1) {
      setTimerRunning(true);
    }
  }, [currentPhotoIndex, photos]);

  useEffect(() => {
    let timer;

    if (timerRunning && time > 0) {
      timer = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else if (time === 0) {
      finishGame();
      handleShow()

    }

    return () => {
      clearInterval(timer);
    };
  }, [timerRunning, time]);


  useEffect(() => {
    let timer;

    if (gameStarted) {
      timer = setTimeout(() => {
        if (currentPhotoIndex < photos.length - 1) {
          setCurrentPhotoIndex(currentPhotoIndex + 1);
        } else {
          finishGame();
        }
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [currentPhotoIndex, photos, gameStarted]);

  const shuffleArray = (array) => {

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const startGame = () => {
    setSelectedPhotos([]);
    setCurrentPhotoIndex(0);
    setGameStarted(true);
    setBoxes(new Array(photos.length).fill(null));
    setScore(0);
  };

  const finishGame = () => {
    setGameStarted(false);

    const shuffledPhotos = [...photos];
    shuffleArray(shuffledPhotos);

    const updatedBoxes = shuffledPhotos.map((photo, index) => ({
      photo,
      id: index,
    }));
    setBoxes(updatedBoxes);

  };
  const sendPhotosHandler = async (score) => {
    const access = localStorage.getItem("access")
    const headers = {
      Authorization: `Bearer ${access}`
    };

    const body = {
      correct_answers: score
    }
    try {
      const response = await axios.post(`${IP}/send-game-image/`, body, {
        headers,
      })


      if (response.status === 200) {
        console.log(response.data)
        setResult(response.data.point)
        setShowScore(true);
        setTimeout(() => {
          window.history.back();
        }, 4000);

      }

    } catch (e) {
      console.log(e)
      if (e.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh')
        window.location.href = "/login"
      }
    }
  }

  const selectPhoto = (index, box) => {

    if (currentAnswer === photos.length - 1) {

      if (box.photo === photos[currentAnswer]) {
        setScore(prevScore => {
          sendPhotosHandler(prevScore + 1);
          return prevScore + 1;
        });
      } else {
        setCurrentAnswer(currentAnswer + 1);
        sendPhotosHandler(score);
      }
      return false;
    }

    if (box.photo === photos[currentAnswer]) {
      setScore(score + 1)
      setCurrentAnswer(currentAnswer + 1)

    } else {
      setCurrentAnswer(currentAnswer + 1)

    }
    if (selectedBoxes.includes(box)) {
      setSelectedBoxes(selectedBoxes.filter(item => item !== box));
    } else {
      setSelectedBoxes([...selectedBoxes, box]);
    }
  }


  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  useEffect(() => {
    getImages()
    startGame();
  }, []);


  const backHandler = () => {
    window.history.back()
  }

  const [infoGame, setInfoGame] = useState([])
  const getGameInfo = async () => {
    const access = localStorage.getItem("access")
    const headers = {
      Authorization: `Bearer ${access}`
    };
    try {
      const response = await axios.get(`${IP}/get-game/`, {
        headers,
      })

      if (response.status === 200) {
        console.log(response)
        setInfoGame(response.data)

      }

    } catch (e) {
      console.log(e)
      if (e.response.status === 401) {
        localStorage.removeItem('refresh')
        window.location.href = "/login"
      }
    }
  }
  useEffect(() => {
    getGameInfo()
  }, [])

  return (
    <>
      {infoGame.length > 0 ? (
        <>
          <Modal
            style={{ textAlign: "center" }}
            show={show}
            onHide={handleClose}
            centered
          >
            <Modal.Header closeButton onClick={backHandler} className='notif-modal'>
              Game
            </Modal.Header>
            <Modal.Body>Time is over!</Modal.Body>
            <Modal.Footer className='d-flex justify-content-center'>
              <Link className='linkMemory' style={{ color: "#fff" }} to={"/game"}>
                <button className='btn' style={{ width: "100px", padding: "5px 0", backgroundColor: "#5DA25E", color: "#fff" }} variant="secondary" onClick={handleClose}>
                  Back
                </button>
              </Link>

            </Modal.Footer>
          </Modal>
          <div className="d-flex">
            <div className="d-none d-lg-block">
              <NavBar />
            </div>

            <div className="w-100 ">
              <Header></Header>
              <div className='memoryPage'>
                <div className="memorygame-wrapper">
                  <Row style={{ direction: "rtl" }}>
                    <div className="memory-btn-wrapper">
                      <Link style={{ color: "#5da25e" }} className='linkMemory' to={'/employeegame'}><button className='finishMemory'>back</button></Link>
                    </div>
                  </Row>
                  <Row>
                    <div className="memory-top d-flex justify-content-between">
                      <Col md={8} lg={4} className="memoryGame-text">
                        <div className="memoryGame-text-top d-flex align-item-center">
                          <p className="memory-title">{infoGame[0].title}</p>
                        </div>
                        <p className='memory-text'>{infoGame[0].descriptions}</p>
                      </Col>
                      <Col md={4} lg={4} className="memoryLevel-wrapper">
                        {/* <p className='memoryLevel'>
                          <GoTriangleLeft className='level-icon' />
                          level-1
                          <GoTriangleRight className='level-icon' />
                        </p> */}
                      </Col>
                      <Col md={12} lg={4} className="memory-time">
                        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                      </Col>
                    </div>
                  </Row>
                  {photos.length ? (
                    <div className="memoryImage-container">
                      <div className='d-flex justify-content-center'>
                        <Col xs={12} sm={5} md={5} lg={3}>
                          {gameStarted ? (
                            <div className="memory-mainImage">
                              <img className='mainImage' src={photos[currentPhotoIndex]} alt="Current" />
                            </div>
                          ) : ("")}
                        </Col>
                      </div>
                      <div className='d-flex justify-content-center mt-3'>
                        <Col className='optionsImage-wrapper' md={8}>
                          {showScore ? (
                            <>
                              <div className="score-container">
                                <div className="score-text">Score:</div>
                                <div className="score-value">{result}</div>
                              </div>
                              <div className="score-container">
                                <div className="score-text">Correct Answer :</div>
                                <div className="score-value">{score}</div>
                              </div>
                            </>
                          ) : (
                            boxes.map((box, index) => (
                              <div className='boxWrapper' onClick={() => selectPhoto(index, box)} key={index}>
                                {box && <Image {...box} />}
                                {selectedBoxes.includes(box) ? (<span className='numberImage'>{selectedBoxes.indexOf(box) + 1 > 0 && selectedBoxes.indexOf(box) + 1}</span>) : ("")}
                              </div>
                            ))
                          )}
                        </Col>
                      </div>

                    </div>
                  ) : (
                    <div className="scene" style={{ height: '100%', width: "100%" }}>
                      <div className="cube-wrapper">
                        <div className="cube">
                          <div className="cube-faces">
                            <div className="cube-face shadow"></div>
                            <div className="cube-face bottom"></div>
                            <div className="cube-face top"></div>
                            <div className="cube-face left"></div>
                            <div className="cube-face right"></div>
                            <div className="cube-face back"></div>
                            <div className="cube-face front"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </>) : (
        <>
          <Loading />
        </>)}
    </>
  );
}
