import NavBar from "../components/NavBar";
import Header from "../components/Header";
import React, { useState, useRef, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Chatup from '../components/Chatup/Chatup'
import '../Style/Chat.css'
import axios from 'axios'
import Send from '../components/Send/Send'
import { ImAttachment } from "react-icons/im"
import Message from '../components/Message/Message'
import MemebersChat from "../components/MembersChat/MemebersChat";
import { MdRecordVoiceOver } from "react-icons/md"
import { MdVoiceOverOff } from 'react-icons/md'
import { ReactMic } from 'react-mic';
import { IP } from '../App'

function Chat() {

  const [employees, setEmployees] = useState([])
  const [text, setText] = useState("")
  const [allMessage, setAllMessage] = useState([])
  const messageEndRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const micRef = useRef(null);
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [showChat, setShowChat] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [audiuanceinfo, setAudiuanceInfo] = useState()
  const [activeEmployee, setActiveEmployee] = useState(null);

  const getAllEmployeesChat = async () => {
    const access = localStorage.getItem("access")
    const headers = {
      Authorization: `Bearer ${access}`
    };
    try {
      const response = await axios.get(`${IP}/all-employees/`, {
        headers,
      })

      if (response.status === 200) {
        console.log(response)
        setEmployees(response.data.employees)
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

    getAllEmployeesChat()

  }, [])


  const clickChatHandler = (employeeId) => {
    localStorage.removeItem('userUuid')
    window.localStorage.setItem("userUuid", employeeId)
    const mainUser = employees.find(employee => employee.uuid == employeeId)
    setAudiuanceInfo(mainUser)
    setActiveEmployee(employeeId);
    setSelectedEmployee(employeeId)
    if (selectedEmployee) {
      setShowChat(true)
    }
  }

  useEffect(() => {

    if (employees.length > 0) {
      const inintId = employees[0].uuid
      clickChatHandler(inintId)
    }
  }, [employees])


  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const onStop = (recordedData) => {
    sendAudioToServer(recordedData.blob);

  };

  const fetchMessagesForEmployee = async (employeeId) => {
    const access = localStorage.getItem("access")
    const headers = {
      Authorization: `Bearer ${access}`
    };
    try {
      const response = await axios.get(`${IP}/get-messages/${employeeId}`, {
        headers,
      })

      if (response.status === 200) {
        setAllMessage(response.data.Messages)

      }
      else {
        setAllMessage([])
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
  const getUnreadMessages = async (employeeId) => {
    const access = localStorage.getItem("access")
    const headers = {
      Authorization: `Bearer ${access}`
    };
    try {
      const response = await axios.get(`${IP}/get-unread-messages/${employeeId}`, {
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
  const sendHandler = async (employeeId) => {
    console.log(employeeId)
    const access = localStorage.getItem("access")
    if (text) {

      const headers = {
        Authorization: `Bearer ${access}`
      };

      const body = {
        content: text,
        employees_uuid: employeeId
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

  const handleFileUpload = async (e, employeeId) => {
    const access = localStorage.getItem("access")
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    formData.append("employees_uuid", employeeId)

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

  useEffect(() => {
    if (selectedEmployee) {
      fetchMessagesForEmployee(selectedEmployee);
    }
  }, [selectedEmployee]);

  const sendAudioToServer = async (audioBlob) => {

    const uuid = localStorage.getItem("userUuid")
    const access = localStorage.getItem('access')
    if (audioBlob) {

      const formvoiceData = new FormData();
      formvoiceData.append('file', audioBlob);
      formvoiceData.append("employees_uuid", uuid)
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

  }

  useEffect(() => {
    const interval = setInterval(() => {
      getUnreadMessages(selectedEmployee);
    }, 1000);
    return () => clearInterval(interval);
  }, [allMessage]);


  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [allMessage])




  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftkey) {
      sendHandler(selectedEmployee)
      event.preventDefault()
    }
  }

  const onExitChatHandler = () => {
    setShowChat(false)
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


  return (
    <>



      {windowWidth < 768 ? (
        <>
          {showChat ? (
            <>
              <Col className="chat-container shadow" xs={12} md={7} lg={8} xl={9} style={{ height: "100%", overflowY: "hidden",position:"fixed" }}>
                <div className="chat-profile">
                  <Chatup onExit={onExitChatHandler} audiuanceInfo={audiuanceinfo} />
                </div>
                <div className="chat-message">
                  <div>
                    {allMessage.map((message, i) => (
                      <Message key={i}  {...message} />
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
                    className='text-muted inputChat'
                    placeholder='Write your Message ...'
                    style={{ background: 'transparent', border: "none" }} />
                  <div>
                    <div className="chat-button">
                      <div className=' pt-2 px-2'>
                        <input
                          type="file"
                          id='file'
                          onChange={(e) => handleFileUpload(e, selectedEmployee)}
                          style={{ width: "100%" }} />
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
                      <Send OnsendHandler={() => sendHandler(selectedEmployee)} />
                    </div>
                  </div>
                </div>
              </Col>
            </>

          ) : (
            <>
              <div className="d-flex">
                <div className="d-none d-lg-block">
                  <NavBar />
                </div>
                <div className="w-100 ">
                  <Header></Header>
                  <Col xs={12} md={4} lg={3} xl={2} className="employesWrapper shadow" >
                    {employees.length > 0 ? (

                      employees.map((employee, i) => (
                        <MemebersChat
                          key={i}
                          {...employee}
                          onClickhandler={clickChatHandler} />
                      ))

                    ) : (

                      <>
                        <h5 style={{ color: "#77ab56", textAlign: "center", marginTop: "30px" }}>No Contact</h5>
                        <hr style={{ background: "#77ab56" }} />
                      </>
                    )}

                  </Col>
                </div>
              </div>
            </>
          )}
        </>) :
        (<>
          <div className="d-flex">
            <div className="d-none d-lg-block">
              <NavBar />
            </div>
            <div className="w-100">
              <Header />
              <div className="d-flex justify-content-around" style={{ flexWrap: "wrap" }}>
                <Col xs={12} md={4} lg={3} xl={2} className="employesWrapper shadow" >

                  {
                    employees.length > 0 ? (
                      employees.map((employee, i) => (
                        <MemebersChat
                          key={i}
                          {...employee}
                          onClickhandler={clickChatHandler}
                          active={employee.uuid === activeEmployee}
                        />
                      ))

                    ) : (
                      <>
                        <h5 style={{ color: "#77ab56", textAlign: "center", marginTop: "30px" }}>No Contact</h5>
                        <hr style={{ background: "#77ab56" }} />
                      </>
                    )
                  }


                </Col>
                <Col className="chat-container shadow" xs={12} md={7} lg={8} xl={9}>
                  <div className="chat-profile">
                    <Chatup audiuanceInfo={audiuanceinfo} />
                  </div>
                  <div className="chat-message">
                    <div>
                      {allMessage.map((message, i) => (
                        <Message key={i}  {...message} />
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
                      className='text-muted inputChat'
                      placeholder='Write your Message ...'
                      style={{ background: 'transparent', width: "100%", border: "none" }} />
                    <div>
                      <div className="chat-button">
                        <div className=' pt-2 px-2'>
                          <input type="file" id='file' onChange={(e) => handleFileUpload(e, selectedEmployee)} />
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
                        <Send OnsendHandler={() => sendHandler(selectedEmployee)} />
                      </div>
                    </div>
                  </div>
                </Col>
              </div>
            </div>
          </div>
        </>)}
    </>
  )

}

export default Chat;


