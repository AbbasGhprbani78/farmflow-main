import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import './Score.css'
export default function Score({data}) {

  return (
    <div className='score d-flex justify-content-between align-items-center px-2 '>
     
       <span className='score-number'>{data}</span>
        <AiFillStar className='star'/>
    </div>
  )
}
// {score}
