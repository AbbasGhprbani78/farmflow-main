import NavBar from "../components/NavBar";
import Header from "../components/Header";
import NotificationsCom from "../components/NotificationsCom";
import "../Style/notifStyle.css";
import '../components/Laoding/Loading'
import { useEffect, useState } from "react";
import axios from "axios";
import { IP } from "../App";
import Loading from "../components/Laoding/Loading";

function Notifications() {
  const [notif, setNotif] = useState();
  const [tasks, setTasks] = useState();
  const [loading, setLoading] = useState(true)

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
        setLoading(false)
        const sortedNotifData = response.data.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        });
        setNotif(sortedNotifData);
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
      {
        loading ? (
          <>
            <Loading />
          </>
        ) : (
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
    </>
  );
}

export default Notifications;
