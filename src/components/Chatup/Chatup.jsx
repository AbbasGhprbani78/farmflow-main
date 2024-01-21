import React from 'react'
import './Chatup.css'
import { FaArrowRight } from "react-icons/fa6";
import { IP } from '../../App';
import Avatar from "../../Images/profileadd/avatar.png"
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
              {props.audiuanceInfo.image ? (
                <img src={`${IP}${props.audiuanceInfo.image}`} alt="" className='m-3 img-audiuance' style={{ width: '50px' }} />
              ) : (
                  <img src={Avatar} className='m-3 img-audiuance' style={{ width: '50px' }}></img>
              )}

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
