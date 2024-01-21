import React from 'react'
import { NavLink } from 'react-router-dom'
import './active.css'

export default function EmployeeTabs() {
    return (
        <div className='d-fex justify-content-between align-items-center'>
            <div className='d-flex '>
                <NavLink className={(link) => link.isActive ? "activeTab" : ""} style={{textAlign:"center", textDecoration: "none", marginRight: "15px", color: "#5DA25E", padding: "5px 10px", width: "auto" }} to="/employeeconvertpoint">Convert Point</NavLink>
                <NavLink className={(link) => link.isActive ? "activeTab" : ""} style={{ textDecoration: "none", color: "#5DA25E", padding: "5px 10px", width: "auto" }} to="/employeeshop">Shop</NavLink>
            </div>
        </div>

    )
}
