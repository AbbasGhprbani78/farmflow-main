import React from 'react'
import './HistoryDiscount.css'
import { Container } from 'react-bootstrap'
import BoxDiscountHistory from '../BoxDiscountHistory/BoxDiscountHistory'
import { useState, useEffect } from 'react'
import '../Header'
import NavBar from '../NavBar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Row, Col } from "react-bootstrap"
import Header from '../Header'
import { IP } from '../../App'
import Loading from '../Laoding/Loading'
import dayjs from 'dayjs'


export default function History() {
  const [loading, setLoading] = useState(true)
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
        setLoading(false)
        console.log(boxes)
      }

    } catch (error) {
      console.log(error)
      if (error.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh')
        window.location.href = "/login"
      }
    }
  }

  const sortedBoxes = [...boxes].sort((a, b) => {
    const timeA = dayjs(a.date).format('YYYY-MM-DD HH:mm');
    const timeB = dayjs(b.date).format('YYYY-MM-DD HH:mm');
    return dayjs(timeB).unix() - dayjs(timeA).unix();
  })

  useEffect(() => {
    fetchHistoryPoint()
  }, [])
  return (
    <>
      {loading ? (<>
        <Loading />
      </>
      ) : (
        <>
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
                      <div className='d-flex' style={{ direction: "rtl" }}>
                        <Link  style={{width:"max-content"}}to={"/convertpoint"}
                        ><button
                          className='back-btn py-2 px-4'>
                            back
                          </button>
                        </Link>
                      </div>
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
          <div>
          </div>
        </>
      )}

    </>

  )
}
