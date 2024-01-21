import React from 'react'
import './WeatherItem.css'
import { Row,Col } from 'react-bootstrap'
export default function WeatherItem({ id, question, humidity, precipitation, temperature, wind_speed }) {
  return (
    <Row>
      <Col md={3}>
        <div className='situation'>
          <p className="titleSituation">
            humidity
          </p>
          <p className='valueSituation'>
            {humidity}
          </p>
        </div>
      </Col>
      <Col md={3}>
        <div className='situation'>
          <p className="titleSituation">
            precipitation
          </p>
          <p className='valueSituation'>
            {precipitation}
          </p>
        </div>
      </Col>

      <Col md={3}>
        <div className='situation'>
          <p className="titleSituation">
            temperature
          </p>
          <p className='valueSituation'>
            {temperature}
          </p>
        </div>
      </Col>

      <Col md={3}>
        <div className='situation'>
          <p className="titleSituation">
            wind_speed
          </p>
          <p className='valueSituation'>
            {wind_speed}
          </p>
        </div>
      </Col>
    </Row>
  )
}
