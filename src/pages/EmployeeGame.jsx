import React from 'react'
import Header from '../Employees/components/Header'
import NavBar from '../Employees/components/NavBar'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { IP } from '../App'
import { Col, Row } from "react-bootstrap";
import Loading from '../components/Laoding/Loading'
import '../components/GameEP'
import GameEP from '../components/GameEP'
export default function EmployeeGame() {

  const [infoGame, setInfoGame] = useState([])
  const [activeTab, SetActiveTab] = useState(0)
  const [tab, setTab] = useState(1)

  const changeTab = (tab, status) => {
    SetActiveTab(tab)
    setTab(status)
  }

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

        infoGame && infoGame.length > 0 ? (
          <>
            <div className="d-flex">
              <div className="d-none d-lg-block">
                <NavBar />
              </div>
              <div className="w-100 ">
                <Header></Header>

                {activeTab === 0 &&
                  <div className='Card-wrapper'>
                    <Col xs={11} style={{ margin: "0 auto" }} className='mt-3 mb-3'>
                      <Row className='d-flex align-items-center cardgame-wrapper py-3'>
                        <Col className='part' md={2} lg={2}><img style={{ width: "90px" }}
                          src={"src/Images/game/memory.png"} alt="" /></Col>
                        <Col className='part middle' md={7} lg={8}>
                          <h5>{infoGame[0].title}</h5>
                          <p className='text-muted card-game-text mt-2'>{infoGame[0].descriptions}</p>
                        </Col>
                        <Col className='part' md={3} lg={2}>
                          <button onClick={() => changeTab(1, 1)} className="game-send-btn">play</button>
                        </Col>
                      </Row>
                    </Col>

                    <Col xs={11} style={{ margin: "0 auto" }} className='mt-3 mb-3'>
                      <Row className='d-flex align-items-center cardgame-wrapper py-3'>
                        <Col className='part' md={2} lg={2}><img style={{ width: "90px" }}
                          src={"src/Images/game/Quiz.png"} alt="" /></Col>
                        <Col className='part middle' md={7} lg={8}>
                          <h5>{infoGame[1].title}</h5>
                          <p className='text-muted card-game-text mt-2'>{infoGame[1].descriptions}</p>
                        </Col>
                        <Col className='part' md={3} lg={2}>
                          <button onClick={() => changeTab(1, 2)} className="game-send-btn">play</button>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={11} style={{ margin: "0 auto" }} className='mt-3 mb-3'>
                      <Row className='d-flex align-items-center cardgame-wrapper py-3'>
                        <Col className='part' md={2} lg={2}><img style={{ width: "90px" }}
                          src={"src/Images/game/Questions.png"} alt="" /></Col>
                        <Col className='part middle' md={7} lg={8}>
                          <h5>{infoGame[2].title}</h5>
                          <p className='text-muted card-game-text mt-2'>{infoGame[2].descriptions}</p>
                        </Col>
                        <Col className='part' md={3} lg={2}>
                          <button onClick={() => changeTab(1, 3)} className="game-send-btn">play</button>
                        </Col>
                      </Row>
                    </Col>
                  </div>
                }
                {
                  activeTab === 1 &&
                  <GameEP
                    text={"Back"}
                    changeTab={changeTab}
                    tab={tab}
                  />
                }

              </div>
            </div>
          </>) : (
          <>
            <Loading />
          </>)
      }

    </>
  );
}
