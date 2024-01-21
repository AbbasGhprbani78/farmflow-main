import LogoHeader from "../../Images/header/logo.png";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import OffCanvas from "./OffCanvas";
import { IP } from "../../App";
import axios from "axios";
import { AiFillStar } from 'react-icons/ai';

export default function Header({ unreadMessage }) {
  const [userIamge, setUserImage] = useState()
  const [totalPoint, setTotalPoint] = useState()
  const [numberMessage, setUumberMessage] = useState();

  const getUnread = async () => {

    const access = localStorage.getItem('access')
    const headers = {
      Authorization: `Bearer ${access}`
    };

    try {
      const response = await axios.get(`${IP}/unread-message/`, {
        headers,
      })

      if (response.status === 200) {

        console.log(response)
        setUumberMessage(response.data.unread_chats_count)
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
  useEffect(() => {
    getUnread()
  }, [])

  const getUserIamge = async () => {
    const access = localStorage.getItem("access")
    const headers = {
      Authorization: `Bearer ${access}`
    };
    try {
      const response = await axios.get(`${IP}/user-photo/`, {
        headers,
      })

      if (response.status === 200) {
        console.log(response)
        setUserImage(response.data.photo_url)
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

  const getTotalPoint = async () => {
    const access = localStorage.getItem("access")
    const headers = {
      Authorization: `Bearer ${access}`
    };

    try {
      const response = await axios.get(`${IP}/total-point/`, {
        headers,
      })

      if (response.status === 200) {
        console.log(response)
        setTotalPoint(response.data.points)
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
    getUserIamge()
    getTotalPoint()
  }, [])

  const [isOpen, setIsOpen] = useState(false);
  function handleToggle() {
    setIsOpen((elm) => !elm);
    console.log(isOpen);
  }
  return (
    <>
      <TopHeader
        unreadMessage={unreadMessage}
        onOpen={handleToggle}
        userIamge={userIamge}
        totalPoint={totalPoint}
        numberMessage={numberMessage}
      />
      <hr className="text-secondary"></hr>
    </>
  );
}
const currentRoute = window.location.pathname;

function TopHeader({ onOpen, unreadMessage, userIamge, totalPoint, numberMessage }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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
      {windowWidth < 576 ? (
        <>
          <nav className="header-nav m-3">
            <div className="d-flex align-items-center">
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
              <Link className="notif-icon"
                style={{ width: "max-content", color: "#000" }}
                to={"/employeesChat"}>
                <i style={{ cursor: "pointer" }} className="bi bi-bell fs-5"></i>
                <span className="notif-number">{numberMessage}</span>
              </Link>
            </div>
            <div className="d-flex align-items-center">
              <div
                className="d-flex align-items-center"
                style={{ border: "1px solid lightgray", borderRadius: "8px", marginLeft: "15px", padding: "2px", fontWeight: 'bold' }}>
                <span style={{ marginRight: "5px" }}>{totalPoint ? totalPoint : 0}</span>
                <AiFillStar style={{ color: "#FDB51C" }} />
              </div>
              <Link to={"/employeeeditProf"} style={{ width: "max-content" }}>
                <img
                  style={{ marginLeft: "15px", borderRadius: "50%" }}
                  src={userIamge ? userIamge : "src/Images/chat/user.png"}
                  className="img2 "
                  alt="avatar">
                </img>
              </Link>
            </div>
          </nav>
        </>) : (
        <>
          <nav className="header-nav m-3">
            <div className="header-profile">
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
              <Link to={"/employeesHome"} className="justify-content-end">
                <div className="header-img">
                  <img src={LogoHeader} alt="farm flow logo"></img>
                </div>
              </Link>
            </div>
            <div className=" d-flex align-items-center profile-avt  rounded-pill float-end me-3 m-lg-0 m-2">
              <Link className="notif-icon"
                style={{ width: "max-content", color: "#000" }}
                to={"/employeesChat"}>
                <i style={{ cursor: "pointer" }} className="bi bi-bell fs-5"></i>
                <span className="notif-number">{numberMessage}</span>
              </Link>
              <div
                className="d-flex align-items-center"
                style={{ border: "1px solid lightgray", borderRadius: "8px", marginLeft: "15px", padding: "2px", fontWeight: 'bold' }}>
                <span style={{ marginRight: "5px" }}>{totalPoint ? totalPoint : 0}</span>
                <AiFillStar style={{ color: "#FDB51C" }} />
              </div>
              <Link to={"/employeeeditProf"} style={{ width: "max-content" }}>
                <div style={{ cursor: "pointer" }} >
                  <img
                    style={{ marginLeft: "15px", borderRadius: "50%" }}
                    src={userIamge ? userIamge : "src/Images/chat/user.png"}
                    className="img2 "
                    alt="avatar">
                  </img>
                </div>
              </Link>

            </div>
          </nav>
        </>)}
    </>

  );
}
