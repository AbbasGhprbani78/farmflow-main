import React from 'react'
import './Point.css'
export default function Point(props) {
  return (
        <div className="wrapper text-light">
            <h3 >{props.point}</h3>
            <p className="point text-light" style={{margin:"0 auto"}}>point</p>
            <div className="clip-path"></div>
        </div>
  )
}
