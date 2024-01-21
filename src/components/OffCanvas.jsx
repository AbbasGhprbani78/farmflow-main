import { useState } from "react";
import { Button } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaArrowLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { IP } from "../App";
import '../Style/offCanvas.css'
import axios from "axios";

const navItems = [
  {
    className: "nav-link ",
    direction: "/",
    iconClass: "bi bi-house  fa-xl icon",
    text: "HOME",
    liClass: "nav-item mb-3 ms-3",
  },
  {
    className: "nav-link ",
    direction: "/product",
    iconClass: "bi bi-box-seam  fa-xl icon",
    text: "PRODUCT",
    liClass: "nav-item mb-3 ms-3",
  },
  {
    className: "nav-link ",
    direction: "/machines",
    iconClass: "bi bi-truck  fa-xl icon",
    text: "MACHINES",
    liClass: "nav-item mb-3 ms-3",
  },
  {
    className: "nav-link ",
    direction: "/employees",
    iconClass: "bi bi-person-vcard  fa-xl icon",
    text: "EMPLOYEES",
    liClass: "nav-item mb-3 ms-3",
  },
  {
    className: "nav-link ",
    direction: "/leaderboard",
    iconClass: "bi bi-star  fa-xl icon",
    text: "LEADERBOARD",
    liClass: "nav-item mb-3 ms-3",
  },
  {
    className: "nav-link ",
    direction: "/game",
    iconClass: "bi bi-controller  fa-xl icon",
    text: "GAME",
    liClass: "nav-item mb-3 ms-3",
  },
  {
    className: "nav-link ",
    direction: "/convertpoint",
    iconClass: "bi bi-coin  fa-xl icon",
    text: "CONVERT POINT",
    liClass: "nav-item mb-3 ms-3",
  },
  {
    className: "nav-link ",
    direction: "/chat",
    iconClass: "bi bi-chat-dots fa-xl icon",
    text: "CHAT",
    liClass: "nav-item mb-3 ms-3",
  },
  {
    className: "nav-link ",
    direction: "/report",
    iconClass: "bi bi-clipboard2-check  fa-xl icon",
    text: "REPORT",
    liClass: "nav-item mb-3 ms-3",
  },
  {
    className: "nav-link ",
    direction: "/notifications",
    iconClass: "bi bi-bell  fa-xl icon",
    text: "NOTIFICATION",
    liClass: "nav-item mb-3 ms-3",
  },

];



function OffCanvas({ className, children, ...props }) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [activeItem, setActiveItem] = useState("")

  const logOutHandler = async () => {
    console.log("hello")
    const access = localStorage.getItem('access')
    const refresh = localStorage.getItem('refresh')

    const headers = {
      Authorization: `Bearer ${access}`,

    };
    const body = {
      refresh: refresh
    }
    try {
      const response = await axios.post(`${IP}/logout/`, body, {
        headers
      })

      if (response.status === 200) {
        console.log(response)
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh')
        window.location.href = "/login"
      }
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <>
      <div className={className} onClick={handleShow}>
        {children}
      </div>

      <Offcanvas
        className="w-auto overflow-auto vh-100  offcanvas-start"
        show={show}
        onHide={handleClose}
        {...props}
      >
        <Offcanvas.Header className="my-2 d-flex justify-content-between">
          <Button
            onClick={handleClose}
            className="btn btn-success rounded-circle"
          >
            <FaArrowLeft style={{ marginBottom: "4px" }}></FaArrowLeft>
          </Button>
          <NavLink to={'/login'} style={{ width: "auto", fontSize: "18px" }} onClick={logOutHandler}>
            <i className="bi bi-box-arrow-right  fa-xl icon"></i>
          </NavLink>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="navbar-nav text-start mt-3">
            {navItems.map((elm) => (
              <NavItems
                liClass={elm.liClass}
                className={`${elm.className} ${activeItem === elm.direction ? "active" : ""}`}
                direction={elm.direction}
                key={elm.direction}
                onClick={() => setActiveItem(elm.direction)} // Add this line
              >
                <i style={{ color: "inherit" }} role="button" className={elm.iconClass}></i>
                <span>{elm.text}</span>
              </NavItems>
            ))}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default OffCanvas;

function NavItems({ children, className = "", liClass = "", direction, onClick }) {
  return (
    <li className={liClass}>
      <NavLink
        to={direction}
        className={`${className}`}
        onClick={onClick}
      >
        {children}
      </NavLink>
    </li>
  );
}


