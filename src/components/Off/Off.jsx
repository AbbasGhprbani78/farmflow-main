import React from 'react'
import './Off.css'
export default function Off(props) {
  return (
    <>
            <div className={ `${props.percent<=25 ? `blue`: props.percent<50 ? `yellow` : props.percent<75 ? `orange`:75<props.percent ?"red":``}  wrapper-off text-light mt-1`}>
                <p className='text-off'>{props.percent}%</p>
                <div className="cilp-path clip1"></div>
                <div className="cilp-path clip2"></div>
            </div>
    </>
  )
}
