import React from 'react'
import NavBar from '../NavBar';
import './Shop.css'
import { useState, useEffect } from 'react'
import Card from '../Card/Card'
import { Col, Row } from 'react-bootstrap'
import Tabs from '../Tabs/Tabs'
import Header from "../Header"
import axios from 'axios'
import { IP } from '../../App';
import Loading from '../Laoding/Loading';

export default function Cards() {

  const [loading, setLoading] = useState(true)

  const fetchCards = async () => {
    const access = localStorage.getItem('access')
    const headers = {
      Authorization: `Bearer ${access}`
    };
    try {
      const response = await axios.get(`${IP}/awards/`, {
        headers,
      });
      if (response.status === 200) {
        console.log(response)
        setCard(response.data.Awards)
        setLoading(false)
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

  const [cards, setCard] = useState([])

  useEffect(() => {
    fetchCards()
  }, [])

  return (
    <>
      {loading ? (
        <>
          <Loading />
        </>)

        : (<>
          <div className="d-flex">
            <div className="d-none d-lg-block">
              <NavBar />
            </div>
            <div className="w-100">
              <Header />
              <div className='shopWrapper'>
                <Row>
                  <Col md={8} style={{ margin: "0 auto" }}>
                    <Col md={11} style={{ margin: "0 auto" }} className=' d-flex justify-content-between align-items-center'>
                      <Tabs />
                    </Col>
                    <Row  >
                      <div className='d-flex justify-content-around flex-wrap gap-4 mt-4 mb-4 '>
                        {cards.map(card => (
                          <Card {...card} />
                        ))}
                      </div>
                    </Row>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </>)
      }

    </>
  )
}
