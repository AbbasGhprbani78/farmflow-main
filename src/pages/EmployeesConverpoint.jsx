import React from 'react'
import NavBar from '../Employees/components/NavBar'
import Header from '../Employees/components/Header'
import '../Style/Discount.css'
import { Container, Row, Col } from 'react-bootstrap'
import BoxDiscount from '../components/BoxDiscount/BoxDiscount'
import { useState, useEffect } from 'react'
import HistoryPointBtn from '../components/HistoryPointBtn/HistoryPointBtn'
import EmployeeTabs from '../components/EmployeeTabs'
import axios from 'axios'
import Score from '../components/Score/Score'
import { IP } from '../App';
import Loading from '../components/Laoding/Loading'


export default function EmployeesClub() {

  const [loading, setLoading] = useState(true)

  const fetchEmployess = async () => {
    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`,
    };
    try {

      const response = await axios.get(`${IP}/discount/`, {
        headers,
      });
      if (response.status === 200) {
        console.log(response.data.discounts)
        setBoxes(response.data.discounts)
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
  const fetchPoint = async () => {
    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`
    };
    try {
      const response = await axios.get(`${IP}/total-point/`, {
        headers,
      });
      if (response.status === 200) {
        console.log(response.data.points)
        setScore(response.data.points)
      }

    } catch (e) {
      console.log(e)


    }
  }

  useEffect(() => {
    fetchEmployess();
    fetchPoint()

  }, [])

  const [boxes, setBoxes] = useState([])
  const [score, setScore] = useState([])
  return (
    <>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <div className="d-flex">
            <div className="d-none d-lg-block">
              <NavBar />
            </div>

            <div className="w-100 ">
              <Header></Header>
              <Container fluid>
                <Row>
                  <div className='d-flex flex-row-reverse'>
                    <Score data={score} />
                  </div>
                </Row>
              </Container>

              <Col md={8} style={{ margin: "0 auto" }}>
                <Row style={{ width: "100%" }}>
                  <Col className='d-flex justify-content-between align-items-center mb-3' style={{ margin: "0 auto" }}>
                    <EmployeeTabs />
                    <HistoryPointBtn link={'/employeehistoryDiscount'} />
                  </Col>
                </Row>
                <Row className='box-row' style={{ width: "100%" }}>
                  {boxes.map(box => (
                    <BoxDiscount key={box.uuid} {...box} data={score} fetchPoint={fetchPoint} />
                  ))}
                </Row>
              </Col>
            </div>
          </div>
        </>)}
    </>
  );
}
