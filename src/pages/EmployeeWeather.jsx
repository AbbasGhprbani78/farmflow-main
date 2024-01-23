import React, { useEffect } from 'react'
import '../Style/WeatherGame.css'
import Modal from 'react-bootstrap/Modal';
import NavBar from '../Employees/components/NavBar'
import Header from '../Employees/components/Header'
import { Col, Row } from "react-bootstrap"
import { Link } from 'react-router-dom';
import WeatherItem from '../components/WeatherGame/WeatherItem';
import MobileWeather from '../components/WeatherGame/MobileWeather';
import { useState } from 'react';
import { FaAngleRight } from 'react-icons/fa'
import axios from 'axios';
import { IP } from '../App'
import '../components/WeatherGame/WeatherItem.css'
import Loading from '../components/Laoding/Loading';


export default function WeatherGame() {

    const [score, setScore] = useState(0)
    const [showScore, setShowScore] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedOption, setSelectedOption] = useState(Array(4).fill(null))
    const [finalanswer, setFinalAnswer] = useState([]);
    const [time, setTime] = useState(60)
    const [show, setShow] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);


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

    const [questions, setQuestions] = useState([])

    const getQuestion = async () => {

        const access = localStorage.getItem('access')
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}/get-question/`, {
                headers,
            })

            if (response.status === 200) {
                console.log(response)
                setQuestions(response.data)
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

    const sendAnswer = async () => {

        const access = localStorage.getItem('access');
        const headers = {
            Authorization: `Bearer ${access}`,
        };
        // const numberQuestion = {
        //     numberQuestion: questions.length
        // }
        // finalanswer.push(numberQuestion)
        const answer = finalanswer

        try {
            const response = await axios.post(`${IP}/get-question/`, answer, {
                headers,
            });

            if (response.status === 200) {
                console.log(response.data);
                setScore(response.data)
            }
        } catch (e) {
            console.log(e);
            if (e.response.status === 401) {
                localStorage.removeItem('access')
                localStorage.removeItem('uuid')
                localStorage.removeItem('refresh')
                window.location.href = "/login";
            }
        }
    };


    const nextQusetion = () => {
        if (currentQuestion === questions.length - 1) {
            console.log(finalanswer);
            sendAnswer(finalanswer);
            setShowScore(true);
            setTimeout(() => {
                window.history.back();
            }, 3000);
        } else {
            setCurrentQuestion((prevState) => {
                return prevState + 1;
            });
        }
    };

    const prevQuestion = () => {
        setCurrentQuestion(PrevState => {
            return PrevState - 1
        })

    }

    const selectAnswer = (answer, optionIndex) => {
        const updateSelectedOptions = [...selectedOption];
        updateSelectedOptions[currentQuestion] = answer;
        setSelectedOption(updateSelectedOptions);

        const update = [...finalanswer];
        update[currentQuestion] = {
            id: questions[currentQuestion].id,
            answer: answer,
        };
        setFinalAnswer(update);
    }
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setTimeout(() => {

            window.history.back();
        }, 1000);
    }

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
            {
                infoGame.length > 0 ? (
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
                            <Modal.Body>time is over!</Modal.Body>
                            <Modal.Footer className='d-flex justify-content-center'>
                                <Link className='linkWeather' style={{ color: "#fff" }} to={"/game"}>
                                    <button className='finishWeather' style={{ width: "100px" }} variant="secondary" onClick={handleClose}>
                                        Back
                                    </button>
                                </Link>

                            </Modal.Footer>
                        </Modal>
                        <div style={{ overflow: "hidden" }} className="d-flex">
                            <div className="d-none d-lg-block">
                                <NavBar />
                            </div>

                            <div className="w-100 ">
                                <Header></Header>
                                <div className="gameWeather-wrapper">
                                    <Row style={{ direction: "rtl", paddingRight: "5px" }}><Link to={"/employeegame"}><button className='backGame'>back</button></Link></Row>
                                    <Row className='gameWeather-top d-flex justify-content-between'>
                                        <Col sm={12} md={6} className='weather-content'>
                                            <div className="weathertitle-wrapper d-flex ">
                                                <h5 className='weathertitle'>{infoGame[2].title}</h5>
                                            </div>
                                            <p className="weather-text">{infoGame[2].descriptions}</p>
                                        </Col>
                                        <Col sm={12} md={6} className="time-game">{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</Col>
                                    </Row>
                                    <Row className='d-flex justify-content-center align-items-center mt-3'>
                                        <Col md={8} >
                                            {questions.length === 0 ? (
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
                                            ) : (
                                                <>
                                                    {showScore ? (
                                                        <>
                                                            <div className="score-container-weather">
                                                                <div className="score-text">Score:</div>
                                                                <div className="score-value">{score.point ? score.point : score.message}</div>
                                                            </div>
                                                            <div className="score-container-weather mt-3">
                                                                <div className="score-text">correct Answer:</div>
                                                                <div className="score-value">{score.correct_answers}</div>
                                                            </div>
                                                        </>
                                                    ) : (

                                                        <>
                                                            <Row className="situation-wrapper d-flex justify-content-evenly">
                                                                {windowWidth < 769 ? (
                                                                    <Row style={{ backgroundColor: "#fff" }} className='d-flex justify-content-center situation-content py-2'>
                                                                        {questions.length > 0 && (
                                                                            <MobileWeather {...questions[currentQuestion]} />
                                                                        )}
                                                                    </Row>
                                                                ) : (
                                                                    <>
                                                                        {questions.length > 0 && (
                                                                            <WeatherItem {...questions[currentQuestion]} />
                                                                        )}
                                                                    </>
                                                                )}

                                                            </Row>
                                                            <Row className='d-flex  boxGameWeather-question justify-content-center'>
                                                                <Col className='mt-3'>
                                                                    <div className="d-flex justify-content-between">
                                                                        <p style={{ fontSize: "20px", color: "#5DA25E", display: "hidden" }}>Level-{currentQuestion + 1} <FaAngleRight /></p>
                                                                    </div>
                                                                    <div className="weathergame-question">
                                                                        <p className="weathergame-question-text" style={{ fontWeight: "bold" }}>{questions[currentQuestion].question}</p>
                                                                    </div>

                                                                    <Row className='weatherGame-answer d-flex'>
                                                                        {Object.keys(questions[currentQuestion]).map((key, index) => {
                                                                            if (key.includes('option')) {
                                                                                return (
                                                                                    <Col xs={12} sm={6} key={index} className='inputweather qusetionWeather'>
                                                                                        <button
                                                                                            key={index}
                                                                                            className={`answerSelect ${selectedOption[currentQuestion] === index + 1 ? 'selected' : ''}`}
                                                                                            onClick={() => selectAnswer(questions[currentQuestion][key], index)}
                                                                                        >
                                                                                            {questions[currentQuestion][key]}
                                                                                        </button>
                                                                                    </Col>
                                                                                );
                                                                            }
                                                                            return null;
                                                                        })}
                                                                    </Row>

                                                                    <div style={{ paddingBottom: "10px" }} className="weathergame-btns">
                                                                        <button onClick={nextQusetion} disabled={selectedOption === null} className='btn-game next-game-btn'>{`${currentQuestion === questions.length - 1 ? "Submit" : "Next"}`}<FaAngleRight /></button>
                                                                        <button onClick={prevQuestion} disabled={currentQuestion === 0} className='btn-game back-game-btn'>Back</button>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </Col>
                                    </Row>
                                </div>
                            </div>

                        </div>
                    </>) : (
                    <>
                        <Loading />
                    </>)
            }

        </>
    )
}








