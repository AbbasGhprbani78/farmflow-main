import React from 'react'
import './Chatup.css'
import { FaArrowRight } from "react-icons/fa6";
import { IP } from '../../App';

export default function Chatup(props) {

  const exitHandler = (props) => {
    props.onExit()
  }
  return (
    <>
      {
        props.audiuanceInfo &&
        <div>
          <div className='d-flex align-items-center justify-content-between' >
            <div className='d-flex  align-items-center'>
              <img src={`${IP}${props.audiuanceInfo.image}`} alt="" className='m-3 img-audiuance' style={{ width: '50px' }} />
              <div>
                <div className=' emloyeeName'>{props.audiuanceInfo.first_name}</div>
                <div className='text-muted  farm'>{props.audiuanceInfo.last_name}</div>
              </div>
            </div>
            <button onClick={() => exitHandler(props)} style={{ backgroundColor: "transparent", cursor: "pointer", marginRight: "15px" }}><FaArrowRight className='backChat' /></button>
          </div>
          <hr className='mt-0 mb-0' />
        </div>
      }
    </>



  )
}
