import NavBar from "../components/NavBar";
import Header from "../components/Header";
import { useState, useEffect } from 'react'
import axios from "axios";
import { IP } from "../App";
import Loading from "../components/Laoding/Loading";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../components/CardGame/CardGame.css'

function Game() {

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
          <div className="d-flex">
            <div className="d-none d-lg-block">
              <NavBar />
            </div>
            <div className="w-100 ">
              <Header></Header>

              <div className='Card-wrapper'>
                <Col xs={11} style={{ margin: "0 auto" }} className='mt-3 mb-3'>
                  <Row className='d-flex align-items-center cardgame-wrapper py-3'>
                    <Col className='part' md={2} lg={2}><img style={{ width: "90px" }}
                      src={"src/Images/game/Solution free vector icons designed by Freepik.png"} alt="" /></Col>
                    <Col className='part middle' md={7} lg={8}>
                      <h5>{infoGame[0].title}</h5>
                      <p className='text-muted card-game-text mt-2'>{infoGame[0].descriptions}</p>
                    </Col>
                    <Col className='part' md={3} lg={2}>
                      <Link to={"/memoryGame"}><button className="game-send-btn">play</button></Link>
                    </Col>
                  </Row>
                </Col>

                <Col xs={11} style={{ margin: "0 auto" }} className='mt-3 mb-3'>
                  <Row className='d-flex align-items-center cardgame-wrapper py-3'>
                    <Col className='part' md={2} lg={2}><img style={{ width: "90px" }}
                      src={"src/Images/game/Quiz free vector icons designed by Freepik.png"} alt="" /></Col>
                    <Col className='part middle' md={7} lg={8}>
                      <h5>{infoGame[1].title}</h5>
                      <p className='text-muted card-game-text mt-2'>{infoGame[1].descriptions}</p>
                    </Col>
                    <Col className='part' md={3} lg={2}>
                      <Link to={"/triviaHome"}><button className="game-send-btn">play</button></Link>
                    </Col>
                  </Row>
                </Col>
                <Col xs={11} style={{ margin: "0 auto" }} className='mt-3 mb-3'>
                  <Row className='d-flex align-items-center cardgame-wrapper py-3'>
                    <Col className='part' md={2} lg={2}><img style={{ width: "90px" }}
                      src={"src/Images/game/Questions free vector icons designed by Freepik.png"} alt="" /></Col>
                    <Col className='part middle' md={7} lg={8}>
                      <h5>{infoGame[2].title}</h5>
                      <p className='text-muted card-game-text mt-2'>{infoGame[2].descriptions}</p>
                    </Col>
                    <Col className='part' md={3} lg={2}>
                      <Link to={"/weatherGame"}><button className="game-send-btn">play</button></Link>
                    </Col>
                  </Row>
                </Col>
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

export default Game;




