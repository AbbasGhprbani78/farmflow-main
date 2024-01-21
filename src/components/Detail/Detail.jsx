import React from 'react'
import './Detail.css'
import { useState } from 'react';
import Score from '../Score/Score';
import axios from 'axios';
import { IP } from '../../App';

export default function Detail(props) {

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    sendHandler()
  }

  const handleShow = () => setShow(true)

  const access = localStorage.getItem('access')
  async function sendHandler() {

    const headers = {
      Authorization: `Bearer ${access}`
    };
    const body = {

    }

    try {
      const response = await axios.post(`${IP}/discount/`, body)
      if (response.status === 200) {
        console.log(response)
        console.log(response.data)
      }


    } catch (error) {
      console.log(error)
      if (error.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh')
        window.location.href = "/login"
      }
    }

  }

  return (
    <>
      <div className={`${show && `showModal`}  modal-container`}>
        <div className='modall'>
          <div className="madal-header d-flex justify-content-between align-items-center">
            <div className="modal-wrapper text-light">
              <h3 >{props.point}</h3>
              <p className="point text-light">point</p>
              <div className="clip-path"></div>
            </div>
            <Score {...props} />
          </div>
          <div className="modal-body  ">
            <h5 className="text-modal">Are You Sure ?</h5>

          </div>
          <div className="modal-footer ">
            <button onClick={handleClose} className="shop modal-btn">Yes</button>
            <button onClick={handleClose} className="cancel modal-btn">No</button>
          </div>
        </div>
      </div>
      <div className='ms-5'>
        <div className='mt-1 mt-md-3'>
          {props.description}
        </div>
        <button onClick={handleShow} className='morebtn btn text-light mt-2 mt-md-4'>more</button>
      </div>
    </>

  )
}
