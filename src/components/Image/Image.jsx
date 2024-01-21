import React from 'react'
import './Image.css'
export default function Image(props) { 

  return (
    <div className='option-image'>
        <img src={props.photo} alt="" />
        
    </div>
  )
}
