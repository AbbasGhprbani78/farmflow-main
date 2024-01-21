import { useState } from "react";
import "../../Style/homeStyle.css";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { IP } from '../../App'
import axios from "axios";

const navItems = [
  {
    className: "nav-link text-light",
    direction: "/employeesHome",
    iconClass: "bi bi-house  fa-xl icon",
    text: "HOME",
  },
  {
    className: "nav-link text-light",
    direction: "/employeeProduct",
    iconClass: "bi bi-box-seam  fa-xl icon",
    text: "PRODUCT",
  },

  {
    className: "nav-link text-light",
    direction: "/employeess",
    iconClass: "bi bi-person-vcard  fa-xl icon",
    text: "EMPLOYEES",
  },
  {
    className: "nav-link text-light",
    direction: "/employeeLeaderboard",
    iconClass: "bi bi-award  fa-xl icon",
    text: "LEADERBOARD",
  },
  {
    className: "nav-link text-light",
    direction: "/employeegame",
    iconClass: "bi bi-controller  fa-xl icon",
    text: "GAME",
  },
  {
    className: "nav-link text-light",
    direction: "/employeeconvertpoint",
    iconClass: "bi bi-coin  fa-xl icon",
    text: "EMPLOYEE CLUB",
  },
  {
    className: "nav-link text-light",
    direction: "/employeesChat",
    iconClass: "bi bi-chat-dots fa-xl icon",
    text: "CHAT",
  },
  // {
  //   className: "nav-link text-light",
  //   direction: "/employeereport",
  //   iconClass: "bi bi-clipboard2-check  fa-xl icon",
  //   text: "REPORTS",
  // },
  {
    className: "nav-link text-light",
    direction: "/employeenotifications",
    iconClass: "bi bi-bell  fa-xl icon",
    text: "NOTIFICATION",
  },



];


function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  function handdleChange() {
    setIsOpen((elm) => !elm);
    console.log(isOpen);
  }
  const logOutHandler = async () => {

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
  function nullFunc() { }
  return (
    <nav
      className="mynav rounded-start-0 rounded-end-3"
      style={isOpen ? { width: "200px" } : { width: "55px" }}
    >
      <NavHeader className="head-nav pe-2 ps-3-custom">
        <FaBars
          onClick={!isOpen ? handdleChange : nullFunc}
          style={{ cursor: "pointer" }}
        />
        <FaTimes
          onClick={isOpen ? handdleChange : nullFunc}
          style={{ cursor: "pointer" }}
        />
      </NavHeader>
      <hr></hr>
      <div>
        {navItems.map((elm) => (
          <NavItems
            className={elm.className}
            direction={elm.direction}
            key={elm.direction}
          >
            <i role="button" className={elm.iconClass}></i>
            <span>{elm.text}</span>
          </NavItems>
        ))}
      </div>
      <hr></hr>
      <button onClick={logOutHandler}
        className="nav-link text-light "
      >
        <i role="button" className="bi bi-box-arrow-right  fa-xl icon"></i>
        <span style={{ marginLeft: "10px" }}>LOG OUT</span>
      </button>
    </nav>
  );
}

export default NavBar;
function NavItems({ children, className = "", direction = "/" }) {
  return (
    <NavLink to={direction} className={className}>
      {children}
    </NavLink>
  );
}
function NavHeader({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}
