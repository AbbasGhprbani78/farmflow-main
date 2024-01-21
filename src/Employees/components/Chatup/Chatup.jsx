import React from 'react'
import './Chatup.css'
import { IP } from '../../../App'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function Chatup() {

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
    <div >
      <div className='d-flex align-items-center' >
        <img src={managerInfo ? `${managerInfo.manager_image_url}` : `src/Images/chat/user.png`}
          alt=""
          className='m-3'
          style={{ width: '50px,', height: "50px" }} />
        <div>
          <div className=' emloyeeName'>{managerInfo.manager_name}</div>
          <div className='text-muted  farm'>{managerInfo.manager_last_name}</div>
        </div>
      </div>
      <hr className='mt-0 mb-0' />
    </div>

  )
}
