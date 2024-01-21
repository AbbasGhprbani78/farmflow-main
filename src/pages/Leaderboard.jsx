import NavBar from "../components/NavBar";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import LeaderBoardCom from "../components/LeaderBoardCom";
import "../Style/LeaderBoard.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { IP } from "../App";
import Loading from "../components/Laoding/Loading";

function Leaderboard() {

  const navigate = useNavigate();
  const [loding, setLoading] = useState(true)
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
        setLoading(false)
      }

    } catch (error) {
      navigate("*");
      if (error.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh')
        window.location.href = "/login"
      }
    }
  };
  useEffect(() => {
    fetchPersonData();

  }, []);
  return (
    <>
      {loding ? (
        <>
          <Loading />
        </>) : (
        <>
          <div className="d-flex">
            <div className="d-none d-lg-block">
              <NavBar />
            </div>
            <div className="w-100">
              <Header></Header>
              <LeaderBoardCom persons={persons} />
            </div>
          </div>
        </>
      )
      }

    </>

  );
}

export default Leaderboard;
