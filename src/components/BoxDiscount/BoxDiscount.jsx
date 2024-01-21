import React from 'react'
import './BoxDiscount.css'
import { Row, Col } from 'react-bootstrap'
import Point from '../Point/Point'
import Off from '../Off/Off'
import axios from 'axios';
import { useState, useEffect } from 'react'
import Score from '../Score/Score'
import { IP } from '../../App'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Box(props) {
  const [show, setShow] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [codes, setCodes] = useState()
  const [showCodes, setShowCodes] = useState(false)
  const [message, setMessage] = useState()

  const CloseModal = () => {
    setShow(false);
    setShowCodes(false)
  }
  const handleClose = () => {
    setShowCodes(true)
    sendHandler()

  }

  function successMessage(text) {
    toast.success(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  const handleShow = () => setShow(true)

  async function sendHandler() {
    const access = localStorage.getItem('access')
    const headers = {
      Authorization: `Bearer ${access}`
    };
    const body = {
      uuid: props.uuid
    }
    try {
      const response = await axios.post(`${IP}/discount/`, body, {
        headers,
      })
      if (response.status == 201) {
        setCodes(response.data.code)
        props.fetchPoint()
        successMessage("successful")
      }

      if (response.status === 200) {
        console.log(response)

        if (response.data.message) {
          setMessage(response.data.message)
        }

      }
    } catch (e) {
      console.log(e)
      if (e.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh')
        window.location.href = "/login"
      }
    }
  }

  useEffect(() => {

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <>

      {isSmallScreen ? (
        <>
          <div style={{ borderRadius: "8px", boxShadow: " 5px 5px 15px lightgray" }} className='d-flex justify-content-center mt-3'>
            <Col xs={12} lg={8}
              className='shadow'
              style={{ paddingBottom: "15px" }}
            >
              <div className='d-flex justify-content-between'>
                <div>
                  <Point {...props} />
                </div>
                <div style={{ paddingRight: "10px" }}>
                  <Off {...props} />
                </div>
              </div>
              <div style={{ paddingLeft: "10px", marginTop: "15px" }}>
                <div className={`${show && `showModal`}  modal-container`}>
                  <div className='modall'>
                    {showCodes ? (
                      <>
                        <>
                          <div className="madal-header d-flex justify-content-between">
                            <div className="modal-wrapper text-light">
                              <h3 >{props.point}</h3>
                              <p className="pointConvert text-light">point</p>
                              <div className="clip-path"></div>
                            </div>
                            <Score {...props} className={'score'} />
                          </div>
                          <p className='text-center mb-4'>{message ? <><p style={{ fontWeight: "bold" }}>{message}</p></> : <>discountCode : <p style={{ fontWeight: "bold" }}>{codes}</p></>}</p>
                          <div className="modal-footer ">
                            <button onClick={CloseModal} className="shop modal-btn">close</button>
                          </div>
                        </>
                      </>) : (
                      <>
                        <div className="madal-header d-flex justify-content-between">
                          <div className="modal-wrapper text-light">
                            <h3 >{props.point}</h3>
                            <p className="pointConvert text-light">point</p>
                            <div className="clip-path"></div>
                          </div>
                          <Score {...props} className={'score'} />
                        </div>
                        <div className="modal-body  ">
                          <h5 className="text-modal">Are You Sure about buying the product ?</h5>
                        </div>
                        <div className="modal-footer ">
                          <button onClick={handleClose} className="shop modal-btn">Yes</button>
                          <button onClick={CloseModal} className="cancel modal-btn">No</button>
                        </div>
                      </>)}
                  </div>
                </div>
                <div className='ms-2 detail'>
                  <div className='mt-1 mt-md-3'>
                    {props.description}
                  </div>
                  <button onClick={handleShow} className='morebtn btn text-light mt-2 mt-md-4'>Buy</button>
                </div>
              </div>
            </Col>
          </div>
        </>) :
        (<>
          <Row className='point-boxx'>
            <Col className='d-flex point-box-col'>
              <Col md={2}><Point {...props} /></Col>
              <Col md={8}>
                <div className={`${show && `showModal`}  modal-container`}>
                  <div className='modall'>
                    {showCodes ? (
                      <>
                        <>
                          <div className="madal-header d-flex justify-content-between">
                            <div className="modal-wrapper text-light">
                              <h3 >{props.point}</h3>
                              <p className="pointConvert text-light">point</p>
                              <div className="clip-path"></div>
                            </div>
                            <Score {...props} className={'score'} />
                          </div>
                          <p className='text-center mb-4'>{message ? <><p style={{ fontWeight: "bold" }}>{message}</p></> : <>discountCode : <p style={{ fontWeight: "bold" }}>{codes}</p></>}</p>
                          <div className="modal-footer ">
                            <button onClick={CloseModal} className="shop modal-btn">close</button>
                          </div>
                        </>
                      </>) : (
                      <>
                        <div className="madal-header d-flex justify-content-between">
                          <div className="modal-wrapper text-light">
                            <h3 >{props.point}</h3>
                            <p className="pointConvert text-light">point</p>
                            <div className="clip-path"></div>
                          </div>
                          <Score {...props} className={'score'} />
                        </div>
                        <div className="modal-body  ">
                          <h5 className="text-modal">Are You Sure about buying the product ?</h5>
                        </div>
                        <div className="modal-footer ">
                          <button onClick={handleClose} className="shop modal-btn">Yes</button>
                          <button onClick={CloseModal} className="cancel modal-btn">No</button>
                        </div>
                      </>)}
                  </div>
                </div>
                <div className='ms-2 detail'>
                  <div className='mt-1 mt-md-3'>
                    {props.description}
                  </div>
                  <button onClick={handleShow} className='morebtn btn text-light mt-2 mt-md-4'>Buy</button>
                </div>
              </Col>
              <Col md={2}>
                <Off {...props} />
              </Col>
            </Col>
          </Row>
        </>)}
      <ToastContainer />
    </>
  )
}



