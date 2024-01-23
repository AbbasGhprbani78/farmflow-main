import React from 'react'
import './GameTab/GameM.css'
import { FaArrowLeftLong } from "react-icons/fa6";
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaLock } from "react-icons/fa6";

export default function GameEP({
    text,
    changeTab,
    tab
}) {
    return (
        <>
            <div>
                <p
                    onClick={() => changeTab(0)}
                    style={{ width: "max-content", paddingLeft: "10px", cursor: "pointer", color: "#5DA25E" }}>
                    <FaArrowLeftLong style={{ marginRight: "10px" }} />
                    {text}
                </p>
            </div>

            <Row className='mt-5 d-flex justify-content-center align-items-between'>
                <Col style={{ flexWrap: "wrap" }} xs={12} md={8} className='d-flex justify-content-center align-items-start'>

                    <Col xs={12} md={4} className='col-tab' >
                        <Link style={{ all: "unset", cursor: "pointer" }} to={tab === 1 ? "/employeememory" : tab === 2 ? "/employeetrivia" : "/employeeweather"}>
                            <div style={{ padding: "15px", border: "1px solid #5DA25E", borderRadius: "8px" }}>
                                <div className={tab === 1 ? "memorey level" : tab === 2 ? "trivia level " : "weathers level "}>
                                </div>
                            </div>
                            <p className='mt-3' style={{ fontWeight: "bold", textAlign: "center" }}>Level 1</p>
                        </Link>
                    </Col>

                    <Col xs={12} md={4} className='col-tab '>
                        <div style={{ padding: "15px", border: "1px solid #5DA25E", borderRadius: "8px", position: "relative" }}>
                            <div className={tab === 1 ? "memorey level bac" : tab === 2 ? "trivia level bac" : "weathers level bac"}>
                            </div>
                            <FaLock style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", fontSize: "30px" }} />
                        </div>
                        <p className='mt-3' style={{ fontWeight: "bold" }}>Level 2</p>
                        <p className='mt-3' style={{ fontWeight: "bold" }}> Cooming Soon</p>
                    </Col>
                    <Col xs={12} md={4} className='col-tab '>
                        <div style={{ padding: "15px", border: "1px solid #5DA25E", borderRadius: "8px", position: "relative" }}>
                            <div className={tab === 1 ? "memorey level bac" : tab === 2 ? "trivia level bac" : "weathers level bac"}>
                            </div>
                            <FaLock style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", fontSize: "30px" }} />
                        </div>
                        <p className='mt-3' style={{ fontWeight: "bold" }}>Level 3</p>
                        <p className='mt-3' style={{ fontWeight: "bold" }}>Cooming Soon</p>
                    </Col>
                </Col>
            </Row>
        </>
    )
}
