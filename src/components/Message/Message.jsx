
import React from 'react'
import './Message.css'
import { BsFillFileEarmarkArrowDownFill } from 'react-icons/bs'
import { IP } from '../../App';

export default function Message(props) {

        const imgPattern = /(jpg|png|jpeg|web|bmp)$/i;
        const voicePattern = /(mp3|wav|ogg|m4a|webm|mpeg|blob)$/i;
        const filePattern = /(pdf|txt|docx|doc|pptx|ppt|xlsx|xls|accdb|mdb|AVI|MKV|MP4|MOV|WMV|FLV|3GP|jsx|js|css|html|json|java|py|ts|php|zip|rar|exe)$/i;

        return (
                <>

                        {props.is_from_manager ?
                                (<>
                                        <div className='mt-2'>
                                                <div className='d-flex align-items-end  col-sm-12' style={{ direction: "rtl" }}>

                                                        {props.content &&
                                                                <div className="message-wrapper mt-2">

                                                                        <div className="message-content content-right">
                                                                                <p className="message-text">
                                                                                        {props.content}
                                                                                </p>
                                                                                <p className="message-time">
                                                                                        {props.date}
                                                                                </p>
                                                                        </div>
                                                                </div>
                                                        }
                                                        {props.file && imgPattern.test(props.file) &&

                                                                <div className='d-flex align-items-end mt-5 col-sm-12 my-5' style={{ direction: "rtl" }}>

                                                                        <a className='img-url ' href={`${IP}${props.file}`} target='blank'>
                                                                                <div className='file-content d-flex flex-column'>
                                                                                        <img className='img-send' src={`${IP}${props.file}`} />
                                                                                        <p className="message-time">
                                                                                                {props.date}
                                                                                        </p>
                                                                                </div>
                                                                        </a>



                                                                </div>}

                                                        {props.file && filePattern.test(props.file) &&
                                                                <div className='d-flex align-items-end mt-4 col-sm-12' style={{ direction: "rtl" }}>
                                                                        <div className='file-content'>
                                                                                <a className='place' href={`${IP}${props.file}`} target='blank' download>
                                                                                        <BsFillFileEarmarkArrowDownFill className='fileIcon file-right' />
                                                                                </a>
                                                                                <p className="message-time">
                                                                                        {props.date}
                                                                                </p>
                                                                        </div>

                                                                </div>
                                                        }
                                                        {props.file && !filePattern.test(props.file) && !imgPattern.test(props.file) &&

                                                                <div className='d-flex align-items-end mt-4 col-sm-12' style={{ direction: "rtl" }}>
                                                                        <div className='file-content'>
                                                                                <audio className='audioright' src={`${IP}${props.file}`} controls></audio>
                                                                                <p className="message-time-audio">
                                                                                        {props.date}
                                                                                </p>
                                                                        </div>

                                                                </div>}

                                                </div>
                                        </div>

                                </>

                                ) : (
                                        <>
                                                <div className='align-items-center mt-2 col-sm-12'>
                                                        {
                                                                props.content &&
                                                                <div className="message-wrapper mt-2">

                                                                        <div className="message-content  content-left">
                                                                                <p className="message-text">
                                                                                        {props.content}
                                                                                </p>
                                                                                <p className="message-time">
                                                                                        {props.date}
                                                                                </p>
                                                                        </div>
                                                                </div>
                                                        }

                                                        {props.file && imgPattern.test(props.file) &&
                                                                <div className='d-flex mt-5 user align-items-end my-5'>
                                                                        <a className='img-url' href={`${IP}${props.file}`} target='blank'>
                                                                                <div className='d-flex flex-column' style={{ marginLeft: "10px" }}>
                                                                                        <img src={(`${IP}${props.file}`)} className='img-send' />
                                                                                        <p className="message-time">
                                                                                                {props.date}
                                                                                        </p>
                                                                                </div>
                                                                        </a>

                                                                </div>}
                                                        {props.file && filePattern.test(props.file) &&

                                                                <div className='d-flex mt-4 user align-items-end'>

                                                                        <div style={{ marginLeft: "10px" }}>
                                                                                <a href={`${IP}${props.file}`} className='place' target='blank' download>
                                                                                        <BsFillFileEarmarkArrowDownFill className='fileIcon file-left' />
                                                                                </a>
                                                                                <p className="message-time">
                                                                                        {props.date}
                                                                                </p>
                                                                        </div>
                                                                </div>}
                                                        {
                                                                props.file && !filePattern.test(props.file) && !imgPattern.test(props.file) &&

                                                                <div className='d-flex mt-4 user align-items-end'>

                                                                        <div style={{ marginLeft: "10px" }}>
                                                                                <audio className='audioChat audio-left' src={`${IP}${props.file}`} controls></audio>
                                                                                <p className=" message-time-audio">
                                                                                        {props.date}
                                                                                </p>
                                                                        </div>
                                                                </div>
                                                        }
                                                </div>

                                        </>
                                )

                        }

                </>
        )
}




