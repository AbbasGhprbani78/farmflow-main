import React from 'react'
import NavBar from '../Employees/components/NavBar'
import Header from '../Employees/components/Header'
export default function Employeereport() {
  return (
    <div className="d-flex">
    <div className="d-none d-lg-block">
          <NavBar />
        </div>
        <div className="w-100">
          <Header/>
        </div>
    </div>
  )
}
