import React from 'react'
import NavBar from '../Employees/components/NavBar'
import Header from '../Employees/components/Header'
import '../components/Shop/Shop.css'
import { useState, useEffect } from 'react'
import Card from '../components/Card/Card'
import EmployeeTabs from '../components/EmployeeTabs'
import axios from 'axios'
import { IP } from '../App'
import { Col, Container, Row } from 'react-bootstrap'
import Loading from '../components/Laoding/Loading'

export default function EmployeeShop() {
  const [cards, setCard] = useState([])
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
    fetchCards()
  }, [])

  return (
    <>
      {
        cards ? (
          <div className="d-flex">
            <div className="d-none d-lg-block">
              <NavBar />
            </div>
            <div className="w-100">
              <Header />
              <div className='shopWrapper'>
                <Row>
                  <Col md={8} style={{ margin: "0 auto" }}>
                    <Col md={11} className='d-flex justify-content-between align-items-center'>
                      <EmployeeTabs />
                    </Col>
                    <Row >
                      <div className='d-flex justify-content-around flex-wrap gap-4 mt-4 mb-4'>
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

        ) : (

          <Loading />
        )
      }

    </>


  )
}
