import React from 'react'
import '../Style/TriviaGame.css'
import { Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { FaAngleRight } from 'react-icons/fa'
import Modal from 'react-bootstrap/Modal';
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import { Link } from 'react-router-dom'
import axios from 'axios';
import { IP } from '../App'
import Loading from '../components/Laoding/Loading'


export default function TriviaGame() {
    const [questions, setQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedOption, setSelectedOption] = useState(Array(4).fill(null))
    const [finalanswer, setFinalAnswer] = useState([]);
    const [showScore, setShowScore] = useState(false)
    const [score, setScore] = useState(0)
    const [time, setTime] = useState(60)
    const [show, setShow] = useState(false);


    const handleClose = () => {
        setShow(false)
        setTimeout(() => {
            window.history.back();
        }, 1000);
    }
    const handleShow = () => setShow(true);

    const getQuestion = async () => {
        const access = localStorage.getItem('access')
        const headers = {
            Authorization: `Bearer ${access}`
        };

        try {
            const response = await axios.get(`${IP}/challenge/`, {
                headers,
            })

            if (response.status === 200) {
                console.log(response.data.questions)
                setQuestions(response.data.questions)
                console.log(questions)

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
    useEffect(() => {
        getQuestion()
    }, [])


    const selectAnswer = (answer, optionIndex) => {

        const updateSelectedOptions = [...selectedOption]
        updateSelectedOptions[currentQuestion] = answer
        setSelectedOption(updateSelectedOptions)
        const update = [...finalanswer]
        update[currentQuestion] = optionIndex + 1
        setFinalAnswer(update)
    }

    const nextQusetion = () => {

        if (currentQuestion === questions.length - 1) {
            console.log(finalanswer)
            sendAnswer(finalanswer)
            setShowScore(true)
            setTimeout(() => {
                window.history.back();
            }, 2000);

        } else {
            setCurrentQuestion(PrevState => {
                return PrevState + 1
            })
        }
    }

    const sendAnswer = async (allAnswer) => {
        const access = localStorage.getItem('access')
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.post(`${IP}/challenge/`, allAnswer, {
                headers,
            })
            if (response.status === 200) {
                console.log(response.data)
                setScore(response.data)
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

    const prevQuestion = () => {
        setCurrentQuestion(PrevState => {
            return PrevState - 1
        })
    }


    useEffect(() => {
        const timerInterval = setInterval(() => {
            if (time > 0) {
                setTime(time - 1)
            } else {
                clearInterval(timerInterval)
                handleShow()
            }
        }, 1000);
        return () => {
            clearInterval(timerInterval)
        }
    }, [time]);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
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
                localStorage.removeItem('access')
                localStorage.removeItem('uuid')
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
                        <Modal.Header closeButton className='notif-modal'>
                            Game
                        </Modal.Header>
                        <Modal.Body>Time is over!</Modal.Body>
                        <Modal.Footer className='d-flex justify-content-center'>
                            <Link className='linkTrivia' style={{ color: "#fff" }} to={"/game"}>
                                <button className='finishTrivia' style={{ width: "100px" }} variant="secondary" onClick={handleClose}>
                                    Back
                                </button>
                            </Link>

                        </Modal.Footer>
                    </Modal>
                    <div style={{ overflowX: "hidden" }} className="d-flex">
                        <div className="d-none d-lg-block">
                            <NavBar />
                        </div>
                        <div className="w-100">
                            <Header />

                            <div className='TriviaGame-wrapper'>
                                <div className="d-flex">
                                    <div className="w-100">

                                    </div>
                                </div>
                                <div className='backBtn-game-wrapper'>
                                    <Link style={{ width: "100px" }} to={"/game"}><button className='backBtn-game' >Back</button></Link>
                                </div>
                                <div className='game-box-Container'>
                                    <Row style={{ padding: "0 18px" }} className='d-flex align-items-start justify-content-center'>
                                        <Col md={6}>
                                            <p className='title-container'>{infoGame[1].title}</p>
                                            <small className='question'>{infoGame[1].descriptions}</small>
                                        </Col>
                                        <Col md={6}>
                                            <p className='time-game'>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</p>
                                        </Col>
                                    </Row>
                                    <Row >
                                        <Col className="game-box d-flex justify-content-between" style={{ margin: "10px auto 0 auto", padding: "0" }} xs={10}>
                                            <div className="game-left col-12 col-md-9">
                                                {questions.length ? (
                                                    <div>
                                                        {showScore ? (
                                                            <>
                                                                <div className="score-container-trivia">
                                                                    <div className="score-text">Score:</div>
                                                                    <div className="score-value">{score.Point ? score.Point : score.message}</div>
                                                                </div>
                                                                <div className="score-container-trivia mt-3">
                                                                    <div className="score-value">{score.correct_answers}</div>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div>
                                                                <div className="level-item d-flex justify-content-between">
                                                                    <p style={{ fontSize: "20px", color: "#5DA25E", display: "hidden" }}>Level-{currentQuestion + 1} <FaAngleRight /></p>
                                                                    <p style={{ paddingRight: "15px" }}>{currentQuestion + 1}/{questions.length}</p>
                                                                </div>
                                                                <div className="questions-wrapper">
                                                                    <p className="questionText" style={{ fontWeight: "bold" }}>{questions[currentQuestion].question}</p>
                                                                </div>
                                                                <div className='answers mt-5 '>
                                                                    <Row className='d-flex justify-content-center align-items-center'>
                                                                        <Col className=" d-flex flex-wrap ">
                                                                            {questions[currentQuestion].options.map((option, index) => (
                                                                                <div key={index} className='input-top  question col-md-6 input-top'>
                                                                                    <button onClick={() => selectAnswer(option, index)} className={` answerSelect ${selectedOption[currentQuestion] === option ? "activeq" : ""}`}>{option}</button>
                                                                                </div>
                                                                            ))}
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                                <div className="game-btns-wrapper">
                                                                    <button onClick={nextQusetion} className='btn-game next-game-btn'>{`${currentQuestion === questions.length - 1 ? "Submit" : "Next"}`}<FaAngleRight /></button>
                                                                    <button onClick={prevQuestion} disabled={currentQuestion === 0} className='btn-game back-game-btn'>Back</button>
                                                                </div>
                                                            </div>
                                                        )
                                                        }
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
                                            <div className="game-right  col-md-3">
                                            </div>
                                        </Col >
                                    </Row >
                                </div >
                            </div >
                        </div>
                    </div>
                </>) :

                (<>
                    <Loading />
                </>)}

        </>

    )
}




{/* <div className='fianl-score text-center'>
<p style={{ fontSize: "30px", color: "#27C73F" }}>Your scored <p className='text-center' style={{ color: "#5DA25E" }}>{score}</p></p>
</div> */}