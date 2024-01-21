import React, { useRef } from 'react'
import './MembersChat.css'
import { IP } from '../../App'
import Avatar from "../../Images/profileadd/avatar.png"

export default function MemebersChat(props) {
    const managerChatHandler = (uuid) => {
        props.onClickhandler(uuid)

    }

    return (
        <div
            className={`employesContainer ${props.active ? 'active' : ''}`}
            onClick={() => managerChatHandler(props.uuid)}>
            <div className={`employeContent`}>
                <div className="employeeImage">
                    {props.image === null ? (
                            <img src={Avatar} alt="" />
                    ): (
                            <img src = {`${IP}${props.image}`} alt="" />
                    )}

                </div>
                <div className="employeText">
                    <p> {props.first_name}</p>
                    <p style={{ fontSize: "13px" }} className='text-muted'>{props.last_name}</p>
                </div>
            </div>
        </div>
    )
}
