import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import './CardGame.css'
export default function CardGame(props) {

  return (

    <Col xs={11} style={{ margin: "0 auto" }} className='mt-3 mb-3'>
      <Row className='d-flex align-items-center cardgame-wrapper py-3'>
        <Col className='part' md={2} lg={2}><img style={{ width: "90px" }} src={props.Image} alt="" /></Col>
        <Col className='part middle' md={7} lg={8}>
          <h5>{props.title}</h5>
          <p className='text-muted card-game-text mt-2'>{props.description}</p>
        </Col>
        <Col className='part' md={3} lg={2}>
          <Link to={props.link}><button className="game-send-btn">play</button></Link>
        </Col>
      </Row>
    </Col>
  )
}
