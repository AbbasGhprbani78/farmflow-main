import React from 'react'
import { AiOutlineSend } from "react-icons/ai"
import './send.css'
export default function Send(props) {

  function sendHandler() {
    props.OnsendHandler()
  }
  return (
    <div className='col-2 message  pt-2 ps-1  mx-2' style={{ width: '40px', height: " 40px" }} onClick={sendHandler}>
      <AiOutlineSend style={{ fontSize: "25px", color: "blue",cursor:"pointer" }} />
    </div>
  )
}
