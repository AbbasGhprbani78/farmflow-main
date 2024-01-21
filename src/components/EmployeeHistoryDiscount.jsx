import React from 'react'
import NavBar from '../Employees/components/NavBar'
import Header from '../Employees/components/Header'
import '../components/HistoryDiscount/HistoryDiscount.css'
import { Container } from 'react-bootstrap'
import BoxDiscountHistory from '../components/BoxDiscountHistory/BoxDiscountHistory'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Row, Col } from "react-bootstrap"
import { IP } from '../App'
import dayjs from 'dayjs'
import Loading from './Laoding/Loading'

export default function EmployeeHistoryDicount() {
  const [serverTime, setServerTime] = useState('')
  const [boxes, setBoxes] = useState([])
  const fetchHistoryPoint = async () => {
    const access = localStorage.getItem('access')

    const headers = {
      Authorization: `Bearer ${access}`
    };
    try {
      const response = await axios.get(`${IP}/discount-history/`, {
        headers,
      });

      if (response.status === 200) {
        console.log(response)
        setBoxes(response.data.discount_history)
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
    fetchHistoryPoint()
  }, [])

  const sortedBoxes = [...boxes].sort((a, b) => {
    const timeA = dayjs(a.date).format('YYYY-MM-DD HH:mm');
    const timeB = dayjs(b.date).format('YYYY-MM-DD HH:mm');
    return dayjs(timeB).unix() - dayjs(timeA).unix();
  })
  return (
    <>
      {sortedBoxes ? (
        <div className="d-flex">
          <div className="d-none d-lg-block">
            <NavBar />
          </div>
          <div className="w-100">
            <Header />
            <div className="historyDisciuntWrapper">
              <Container>
                <Row>
                  <Col md={8} style={{ margin: "0 auto" }}>
                    <div className='d-flex' style={{ direction: "rtl" }}><Link to={"/employeeconvertpoint"}><button className='back-btn py-1 px-4'>back</button></Link></div>
                  </Col>
                </Row>
                <div style={{ height: "500px", overflowY: "scroll" }}>
                  {sortedBoxes.map(box => (
                    <BoxDiscountHistory  {...box} />
                  ))}
                </div>

              </Container>
            </div>
          </div>
        </div>

      ) : (

        <Loading />
      )}
    </>

  )
}
