import React, { useState, useEffect } from 'react'
import NavBar from '../Employees/components/NavBar'
import Header from '../Employees/components/Header'
import NotificationsCom from '../components/NotificationsCom'
import '../Style/notifStyle.css'
import axios from "axios";
import { IP } from "../App"

export default function EmployeeNotifications() {

  const [notif, setNotif] = useState();
  const [tasks, setTasks] = useState();
  const fetchNotifData = async () => {

    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`,
    };
    try {
      const response = await axios.get(`${IP}/notification/`, {
        headers,
      });
      if (response.status === 200) {
        console.log(response.data);
        setNotif(response.data);
      }

    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh')
        window.location.href = "/login"
      }
    }
  };
  const fetchTaskData = async () => {
    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`,
    };
    try {
      const response = await axios.get(`${IP}/uncompleted-tasks/`, {
        headers,
      });
      if (response.status === 200) {
        console.log(response.data);
        setTasks(response.data);
      }

    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh')
        window.location.href = "/login"
      }
    }
  };
  useEffect(() => {
    fetchNotifData();
    fetchTaskData();
  }, []);
  return (
    <>
      <div className="d-flex">
        <div className="d-none d-lg-block">
          <NavBar />
        </div>

        <div className="w-100 ">
          <Header></Header>
          <NotificationsCom
            notifData={notif}
            tasks={tasks}
            setNotifData={(notifs) => setNotif(notifs)}
          />
        </div>
      </div>
    </>
  )
}
