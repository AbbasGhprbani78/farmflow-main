import React from 'react'
import NavBar from '../Employees/components/NavBar'
import Header from '../Employees/components/Header'
import { useNavigate } from "react-router-dom";
import LeaderBoardCom from "../components/LeaderBoardCom";
import "../Style/LeaderBoard.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { IP } from "../App";


export default function EmployeeLeaderboard() {
  const navigate = useNavigate();

  const [persons, setPersons] = useState("");
  const fetchPersonData = async () => {
    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`,
    };
    try {
      const response = await axios.get(`${IP}/leaderboard/`, {
        headers,
      });
      if (response.status === 200) {
        console.log(response)
        console.log(response.data.employees_points);
        setPersons(response.data.employees_points);
      }
      
    } catch (error) {
     navigate("*")
     
    }
  };
  useEffect(() => {
    fetchPersonData();
  }, []);

  return (
    <div className="d-flex">
    <div className="d-none d-lg-block">
          <NavBar />
        </div>
        <div className="w-100">
          <Header/>
          <LeaderBoardCom persons={persons} />
        </div>
    </div>
  )
}
