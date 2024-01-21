import React from 'react'
import './AddBoxBtn.css'
import { CiSquarePlus } from "react-icons/ci";
export default function AddBoxBtn(props) {

  const addBoxHandler = (props) => {
    props.onAddBox()
  }
  return (

    <div style={{ textAlign: "right", color: "blue", fontSize: "1.7rem", color: "#5DA25E" }}>
      <i style={{ color: "#5DA25E", fontSize: "40px" }}
        onClick={() => addBoxHandler(props)} className='bi bi-plus-square fs-5 text-prim2' />
    </div>
  )
}
