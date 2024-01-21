import "../Style/homeStyle.css";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Weather from "../components/Weather";
import { useEffect, useState } from "react";
import PlansForm from "../components/PlansForm";
import AllNotifs from "../components/AllNotifs";
import Notif from "../components/Notif";
import ShowModal from "../components/ShowModal";
import { PlanInfo } from "../components/Product Component/PlanInfo";
import axios from "axios";
import { IP } from "../App";

function HomePage() {

  const [show, setShow] = useState(false);
  const [activeId, setActiveId] = useState(0);
  const [notifData, setNotifData] = useState();
  const [weather, setWeather] = useState()
  const [unreadMessage, setUnreadMessage] = useState();
  const [jobDue, setJobDue] = useState()
  const [activeJob, setActiveJob] = useState()
  const [landCount, setLandCount] = useState()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [unNotif, setAllNotif] = useState()


  function handleClose() {
    setShow(false);
  }

  async function handleShow(id) {
    setNotifData((notifs) =>
      notifs.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
    setActiveId(id);
    setShow(true);

    const access = localStorage.getItem("access")
    const headers = {
      Authorization: `Bearer ${access}`
    };
    const body = {
      id: id
    }
    try {
      const response = await axios.post(`${IP}/notification/`, body, {
        headers,
      })

      if (response.status === 200) {
        console.log(response)
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
    let n = 0;
    for (const i in notifData) {
      if (!notifData[i].read) n++;
    }
    setAllNotif(n)

  }, [notifData]);


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
        setUnreadMessage(response.data.unread_chats_count)
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


  localStorage.setItem("unread", unreadMessage)

  const getWeather = async (uuid) => {

    const access = localStorage.getItem('access')
    const headers = {
      Authorization: `Bearer ${access}`
    };
    const body = {
      uuid: uuid
    }
    try {
      const response = await axios.post(`${IP}/weather-api/`, body, {
        headers,
      })

      if (response.status === 200) {
        if (response.data) {
          setWeather(response.data)
          console.log(weather)
        }


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


  const getApprovedTasks = async () => {

    const access = localStorage.getItem('access')
    const headers = {
      Authorization: `Bearer ${access}`
    };

    try {
      const response = await axios.get(`${IP}/count-approved-tasks/`, {
        headers,
      })

      if (response.status === 200) {
        setJobDue(response.data.count)
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

  const getPendingTasks = async () => {

    const access = localStorage.getItem('access')
    const headers = {
      Authorization: `Bearer ${access}`
    };

    try {
      const response = await axios.get(`${IP}/count-pending-tasks/`, {
        headers,
      })

      if (response.status === 200) {
        console.log(response)
        setActiveJob(response.data.count)

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
  const getLandCount = async () => {

    const access = localStorage.getItem('access')
    const headers = {
      Authorization: `Bearer ${access}`
    };

    try {
      const response = await axios.get(`${IP}/manager-land-count/`, {
        headers,
      })

      if (response.status === 200) {
        setLandCount(response.data.land_count)
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

    getApprovedTasks()
    getPendingTasks()
    getLandCount()
  }, [])


  const getNotification = async () => {

    const access = localStorage.getItem('access')
    const headers = {
      Authorization: `Bearer ${access}`,
    };
    try {
      const response = await axios.get(`${IP}/notification/`, {
        headers,
      });
      if (response.status === 200) {

        const sortedNotifData = response.data.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        });
        setNotifData(sortedNotifData);
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
    getNotification()
  }, [])

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
          <div className="d-flex">
            <div className="d-none d-lg-block">
              <NavBar />
            </div>
            <div className="w-100 mainbackground ">
              <Header unreadMessage={unreadMessage}></Header>
              <Container fluid>
                <Row>
                  <Col
                    className=" mt-3 mb-3 mt-lg-0"
                    xs={{ span: 12, offset: 0 }}
                    lg={{ span: 3, offset: 0 }}
                  >
                    <PlansForm getWeather={getWeather} />
                  </Col>
                  <Col className="" xs={12} lg={9}>
                    <Row>
                      <PlanInfo
                        pClassName=""
                        className="s1"
                        quality="good"
                        amount={landCount}
                        title="Lands"
                      >
                        <i className="bi bi-clipboard2 fs-3"></i>
                      </PlanInfo>
                      <PlanInfo
                        pClassName="mt-3 mt-sm-0"
                        className="s2"
                        quality="high"
                        amount={activeJob}
                        title=" Active Tasks"
                      >
                        <i className="bi bi-fire fs-3"></i>
                      </PlanInfo>
                      <PlanInfo
                        pClassName="mt-3 mt-xl-0"
                        className="s3"
                        quality="good"
                        amount={jobDue}
                        title="Completed Tasks"
                      >
                        <i className="bi bi-clock fs-3"></i>
                      </PlanInfo>
                    </Row>
                    <ValidDate />
                    <Weather weather={weather} />
                  </Col>
                  <Col
                    className=" mt-3 mb-3 mt-lg-0"
                    xs={{ span: 12, offset: 0 }}
                    lg={{ span: 3, offset: 0 }}
                  >

                    <AllNotifs number={unNotif}>
                      {notifData ? (
                        <>
                          {notifData && notifData.map((notif, i) => (
                            <Notif
                              text={notif.content}
                              date={notif.date}
                              time={notif.time}
                              read={notif.read}
                              onShow={() => handleShow(notif.id)}
                              key={notif.id}
                            />
                          ))}
                        </>) :
                        (<>
                          <span>there are no notification to dispaly</span>
                        </>)}
                    </AllNotifs>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
          {notifData && notifData.map((elm) => {
            if (activeId === elm.id)
              return (
                <ShowModal object={elm} show={show} handleClose={handleClose} />
              );
          })}
        </>) : (
        <>
          <div className="d-flex">
            <div className="d-none d-lg-block">
              <NavBar />
            </div>
            <div className="w-100 mainbackground ">
              <Header unreadMessage={unreadMessage}></Header>
              <Container fluid>
                <Row>
                  <Col className="" xs={12} xl={9}>
                    <Row className="align-items-end">
                      <PlanInfo
                        pClassName=""
                        className="s1"
                        quality="good"
                        amount={landCount}
                        title="Lands"
                      >
                        <i className="bi bi-clipboard2 fs-3"></i>
                      </PlanInfo>
                      <PlanInfo
                        pClassName="mt-3 mt-sm-0"
                        className="s2"
                        quality="high"
                        amount={activeJob}
                        title=" Active Tasks"
                      >
                        <i className="bi bi-fire fs-3"></i>
                      </PlanInfo>
                      <PlanInfo
                        pClassName="mt-3 mt-xl-0"
                        className="s3"
                        quality="good"
                        amount={jobDue}
                        title="Completed Tasks"
                      >
                        <i className="bi bi-clock fs-3"></i>
                      </PlanInfo>
                    </Row>
                    <ValidDate />
                    <Weather weather={weather} />
                  </Col>
                  <Col xs={12} xl={3}
                    className=" mt-3 mb-3 mt-lg-0"
                  >
                    <PlansForm getWeather={getWeather} />
                    <AllNotifs number={unNotif}>
                      {notifData ? (
                        <>
                          {notifData && notifData.map((notif, i) => (
                            <Notif
                              text={notif.content}
                              date={notif.date}
                              time={notif.time}
                              read={notif.read}
                              onShow={() => handleShow(notif.id)}
                              key={notif.id}
                            />
                          ))}
                        </>) :
                        (<>
                          <span>there are no notification to dispaly</span>
                        </>)}
                    </AllNotifs>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
          {notifData && notifData.map((elm) => {
            if (activeId === elm.id)
              return (
                <ShowModal object={elm} show={show} handleClose={handleClose} />
              );
          })}
        </>)}
    </>
  );
}

const dateConvertor = (startDate, endDate) => {
  const newStartDate = new Date(startDate);
  const newEndDate = new Date(endDate);
  const oneDay = 86400000;
  let result;
  result = Math.ceil((newEndDate.getTime() - newStartDate.getTime()) / oneDay);
  if (result < 0) {
    return 0;
  }
  return result;
};
function ValidDate() {
  const [remaining, setRemaining] = useState()
  const [purchase, setPurchase] = useState()
  const purchDate = purchase;
  const expireDate = "2028/04/10";
  const validation = dateConvertor(purchDate, expireDate);
  const todayDate = new Date();

  const formattedDate = todayDate
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("/");
  const remain = remaining;
  const percentage = Math.floor((remain / validation) * 100);

  const remainingDay = async () => {
    const access = localStorage.getItem('access')
    const headers = {
      Authorization: `Bearer ${access}`
    };

    try {
      const response = await axios.get(`${IP}/days-left/`, {
        headers,
      })

      if (response.status === 200) {
        console.log(response)
        setRemaining(response.data.days_remaining)
        setPurchase(response.data.start_date)
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
    remainingDay()
  }, [])
  return (
    <Row className="justify-content-center">
      <RemainDate percentage={percentage} />
      <PurchaseDate date={purchDate} />
    </Row>
  );
}
function RemainDate({ percentage }) {
  return (
    <Col xs={12} md={6} className="mt-2">
      <div className="remaining">
        <Row className="h-100">
          <Col xs={6}>
            <h4>Days Remaining</h4>
          </Col>
          <Col xs={6} className="vertical2">
            <div style={{ width: 100, height: 100 }}>
              <CircularProgressbar
                minValue={0}
                maxValue={100}
                value={percentage}
                text={`${percentage}%`}
                strokeWidth={5}
                background={false}
                styles={{
                  path: {
                    stroke: `rgb(255, 255, 255)`,
                  },
                  trail: {
                    stroke: "#334635",
                  },
                  text: {
                    fill: "#ffffff",
                    fontSize: "20px",
                  },
                }}
              />
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
}
function PurchaseDate({ date }) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const timestampStr = date
    const timestampObj = new Date(timestampStr);
    const year = timestampObj.getFullYear();
    const month = String(timestampObj.getMonth() + 1).padStart(2, '0');
    const day = String(timestampObj.getDate()).padStart(2, '0');

    const formattedDateStr = `${year}-${month}-${day}`;
    setFormattedDate(formattedDateStr);
  }, [date]);
  console.log(formattedDate)

  return (
    <Col xs={12} md={6} className="mt-2">
      <div className="remaining1 " style={{ height: "100%" }}>
        <Row className="h-100">
          <Col xs={6}>
            <p style={{ color: "#5DA25E", fontSize: "20px" }}>Purchase Date</p>
          </Col>
          <Col xs={6} className="vertical1">
            <span>{formattedDate}</span>
          </Col>
        </Row>
      </div>
    </Col>
  );
}

export default HomePage;

