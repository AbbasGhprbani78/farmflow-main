import NavBar from '../Employees/components/NavBar'
import Header from '../Employees/components/Header'
import React, { useState, useRef, useEffect } from 'react'
import { Col } from 'react-bootstrap'
import Chatup from '../Employees/components/Chatup/Chatup'
import '../Style/Chat.css'
import axios from 'axios'
import Send from '../components/Send/Send'
import { ImAttachment } from "react-icons/im"
import MessageEmployee from '../Employees/components/MessagessEmployee/MessageEmployee'
import { MdRecordVoiceOver } from "react-icons/md"
import { MdVoiceOverOff } from 'react-icons/md'
import { ReactMic } from 'react-mic';
import { IP } from '../App'
import OffCanvas from '../Employees/components/OffCanvas'
import { FaBars, FaCodepen } from "react-icons/fa";


export default function ChatEmployee() {

  const [text, setText] = useState("")
  const [allMessage, setAllMessage] = useState([])
  const messageEndRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const micRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const onStop = (recordedData) => {

    sendAudioToServer(recordedData.blob);
  };

  const getMessages = async () => {
    const access = localStorage.getItem('access')
    let uuid = localStorage.getItem('uuid')
    const headers = {
      Authorization: `Bearer ${access}`
    };
    try {
      const response = await axios.get(`${IP}/get-messages/${uuid}`, {
        headers,
      })

      if (response.status === 200) {

        setAllMessage(response.data.Messages)

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

  const getUnreadMessages = async () => {
    const access = localStorage.getItem('access')
    let uuid = localStorage.getItem('uuid')
    const headers = {
      Authorization: `Bearer ${access}`
    };
    try {
      const response = await axios.get(`${IP}/get-unread-messages/${uuid}`, {
        headers,
      });
      if (response.status === 200) {


        setAllMessage(prevState => {
          return [...prevState, ...response.data.Messages]
        })

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
  const sendHandler = async () => {
    const access = localStorage.getItem('access')
    let uuid = localStorage.getItem('uuid')
    if (text) {

      const headers = {
        Authorization: `Bearer ${access}`
      };

      const body = {
        content: text,
        employees: uuid,

      }

      try {
        const response = await axios.post(`${IP}/send-message/`, body, {
          headers,
        })

        if (response.status === 200) {

          setText('')
        }

      }
      catch (e) {
        console.log(e)
        if (e.response.status === 401) {
          localStorage.removeItem('access')
          localStorage.removeItem('uuid')
          localStorage.removeItem('refresh')
          window.location.href = "/login"
        }
      }

    }
  }

  const handleFileUpload = async (e) => {

    const access = localStorage.getItem('access')
    let uuid = localStorage.getItem('uuid')
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    formData.append("employees", uuid)

    const headers = {
      Authorization: `Bearer ${access}`
    };

    try {

      const response = await axios.post(`${IP}/send-message/`, formData, {
        headers,
      })

      if (response.status === 200) {

        console.log(response)
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
  const sendAudioToServer = async (audioBlob) => {
    const access = localStorage.getItem('access')
    let uuid = localStorage.getItem('uuid')
    if (audioBlob) {
      const formvoiceData = new FormData();
      formvoiceData.append('file', audioBlob);
      formvoiceData.append("employees", uuid)

      const headers = {
        Authorization: `Bearer ${access}`
      };
      try {

        const response = await axios.post(`${IP}/send-message/`, formvoiceData, {
          headers,
        })

        if (response.status === 200) {

          console.log(response)

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
  };

  useEffect(() => {
    getMessages()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      getUnreadMessages();
      console.log("hello")
    }, 1000);
    return () => clearInterval(interval);
  }, [allMessage]);


  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [allMessage])

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftkey) {
      sendHandler()
      event.preventDefault()
    }
  }

  useEffect(() => {

    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const currentRoute = window.location.pathname;

  const [managerInfo, setManagerInfo] = useState([])
  const getManagerInfo = async () => {

    const access = localStorage.getItem("access")
    const headers = {
      Authorization: `Bearer ${access}`
    };
    try {

      const response = await axios.get(`${IP}/get-manager-info-chat/`, {
        headers,
      })

      if (response.status === 200) {
        console.log(response)
        setManagerInfo(response.data)
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
    getManagerInfo()
  }, [])

  return (
    <>
      {windowWidth < 576 ? (
        <>
          <div className="w-100">
            <div className='d-flex justify-content-center'>
              <Col className="chat-container shadow" xs={12} md={7} lg={8} xl={9} style={{ height: "100%", position: "fixed", bottom: "0" }}>
                <div className="chat-profile d-flex justify-content-between">
                  <OffCanvas
                    className={"d-lg-none m-2"}
                    placement={"start"}
                    activeItem={currentRoute}
                  >
                    <FaBars
                      size="30px"
                      color="#5DA25E"
                      style={{ margin: "3px" }}
                    ></FaBars>
                  </OffCanvas>
                  <div >
                    <div className='d-flex align-items-center' >
                      <div>
                        <div className=' emloyeeName'>{managerInfo.manager_name}</div>
                        <div className='text-muted  farm'>{managerInfo.manager_last_name}</div>
                      </div>
                      <img src={managerInfo ? `${managerInfo.manager_image_url}` : `src/Images/chat/user.png`}
                        alt=""
                        className='m-3'
                        style={{ width: '50px,', height: "50px" }} />
                    </div>
                    <hr className='mt-0 mb-0' />
                  </div>
                </div>
                <div className="chat-message">
                  <div>
                    {allMessage.map((message, i) => (
                      <MessageEmployee key={i}  {...message} />
                    ))}
                  </div>
                  <div ref={messageEndRef} />
                </div>
                <div className="chat-control">
                  <input
                    onKeyDown={handleKeyDown}
                    value={text}
                    onChange={e => setText(e.target.value)}
                    type='text'
                    className='text-muted  inputChat'
                    placeholder='Write your Message ...'
                    style={{ background: 'transparent', width: "100%", border: "none" }} />
                  <div>
                    <div className="chat-button">
                      <div className=' pt-2 px-2'>
                        <input type="file" id='file' onChange={(e) => handleFileUpload(e)} />
                        <label htmlFor="file" style={{ cursor: "pointer" }}><ImAttachment /></label>
                      </div>
                      <ReactMic className='Voice-wave'
                        record={isRecording}
                        onStop={onStop}
                        ref={micRef}
                      />
                      {
                        isRecording ? (

                          <button className='audio-btn' onClick={stopRecording}>< MdRecordVoiceOver /></button>
                        ) : (
                          <button className='audio-btn' onClick={startRecording}><MdVoiceOverOff /></button>
                        )
                      }

                      <Send OnsendHandler={sendHandler} />
                    </div>
                  </div>
                </div>
              </Col>
            </div>
          </div>
        </>

      ) : (
        <>
          <div className="d-flex">
            <div className="d-none d-lg-block">
              <NavBar />
            </div>
            <div className="w-100">
              <Header />
              <div className='d-flex justify-content-center' style={{ flexWrap: "wrap", height: "85%" }}>
                <Col className="chat-container shadow" xs={12} md={7} lg={8} xl={9}>
                  <div className="chat-profile">
                    <Chatup />
                  </div>
                  <div className="chat-message">
                    <div>
                      {allMessage.map((message, i) => (
                        <MessageEmployee key={i}  {...message} />
                      ))}
                    </div>
                    <div ref={messageEndRef} />
                  </div>
                  <div className="chat-control">
                    <input
                      onKeyDown={handleKeyDown}
                      value={text}
                      onChange={e => setText(e.target.value)}
                      type='text'
                      className='text-muted  inputChat'
                      placeholder='Write your Message ...'
                      style={{ background: 'transparent', width: "100%", border: "none" }} />
                    <div>
                      <div className="chat-button">
                        <div className=' pt-2 px-2'>
                          <input type="file" id='file' onChange={(e) => handleFileUpload(e)} />
                          <label htmlFor="file" style={{ cursor: "pointer" }}><ImAttachment /></label>
                        </div>
                        <ReactMic className='Voice-wave'
                          record={isRecording}
                          onStop={onStop}
                          ref={micRef}
                        />
                        {
                          isRecording ? (

                            <button className='audio-btn' onClick={stopRecording}>< MdRecordVoiceOver /></button>
                          ) : (
                            <button className='audio-btn' onClick={startRecording}><MdVoiceOverOff /></button>
                          )
                        }

                        <Send OnsendHandler={sendHandler} />
                      </div>
                    </div>
                  </div>
                </Col>
              </div>
            </div>
          </div>
        </>
      )}

    </>
  )
}

//get-manager-chat