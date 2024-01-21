import React, { useEffect, useState } from 'react'
import './BoxDiscountHistory.css'
import { Row, Col } from 'react-bootstrap'
import Point from '../Point/Point'
import Off from '../Off/Off'
import dayjs from 'dayjs'
import Loading from '../Laoding/Loading'

export default function BoxDate(props) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const historyTime = dayjs(props.date)
  const formattedTime = historyTime.format('YYYY-MM-DD HH:mm')

  useEffect(() => {

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {props ? (
        <>
          {isSmallScreen ? (
            <>
              <div className='d-flex justify-content-center mt-3 dic-his' >
                <Col xs={12} lg={8}
                  className='shadow'
                  style={{ paddingBottom: "15px" }}>
                  <div className='d-flex justify-content-between'>
                    <div className="Point-wrapper">
                      <Point {...props} />
                    </div>
                    <div className="point-off d-flex ">
                      <Off {...props} />
                    </div>
                  </div>
                  <div className="point-desc" style={{ paddingLeft: "10px", marginTop: "15px" }}>
                    {props.description}
                    <p>discountCode : <span style={{ fontWeight: "bold" }}>{props.code}</span></p>
                    <p className='text-muted'>{formattedTime}</p>
                  </div>
                </Col>
              </div>
            </>) :
            (<>
              <div className='d-flex justify-content-center mt-3 dic-his' >
                <Col xs={12} lg={8}
                  className='shadow d-flex justify-content-between align-items-center'
                  style={{ paddingBottom: "15px", flexWrap: 'wrap' }}>
                  <Col xs={6} md={3} className="Point-wrapper">
                    <Point {...props} />
                  </Col>
                  <Col xs={12} md={6} className="point-desc">
                    {props.description}
                    <p>discountCode : <span style={{ fontWeight: "bold" }}>{props.code}</span></p>
                    <p className='text-muted'>{formattedTime}</p>
                  </Col>
                  <Col xs={6} md={3} className="point-off d-flex ">
                    <Off {...props} />
                  </Col>
                </Col>
              </div>
            </>)}
        </>) :
        (<>
          <Loading />
        </>)}


    </>
  )
}
