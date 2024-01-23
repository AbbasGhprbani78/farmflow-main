import NavBar from "../Employees/components/NavBar";
import Header from "../Employees/components/Header";
import { Container, Row, Col } from "react-bootstrap";
import AddPoints from "../components/Profile add component/AddPoints";
import AddNewTask from "../components/Profile add component/AddNewTask";
import "../Style/profileadd.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Avatar from "../../src/Images/profileadd/avatar.png";
import { IP } from "../App";
import { TabShowProducts } from "../components/Profile add component/TabShowProducts";
import EmployeeTabShowTasks from "../components/Profile add component/EmployeeTabShowTasks";
import { Tabbed } from "../components/Tab component/Tabbed";
import EmployeeTabShowPoints from "../components/Profile add component/EmployeeTabShowPoints";
import EmployeeTabShowMachine from "../components/Profile add component/EmployeeTabShowMachine";


const empuuid = {
  uuid: localStorage.getItem('uuid')
}

function Employees() {

  const [selectedId, setSelectedId] = useState({ id: "", type: "add" });
  const [employees, setEmployees] = useState();
  const [changePassword, setChangePassword] = useState("");
  const [infoUser, setInfoUser] = useState({
    email: "",
    first_name: "",
    image: "",
    last_name: "",
    phone: "",
    username: "",
    password: "",
    conPassword: "",
    expertise: "",
    uuid: "",
  });


  function onHanddleBack(uuid) {
    setSelectedId({ id: uuid, type: "show" });
    if (employees) setInfoUser(employees[0]);
    else setInfoUser("");
  }
  function onHeader() {
    setInfoUser({
      email: "",
      first_name: "",
      image: "",
      last_name: "",
      phone: "",
      username: "",
      password: "",
      conPassword: "",
      expertise: "",
      uuid: "",
    });
    setSelectedId({ uuid: "", type: "add" });
  }
  function onClickUser(uuid) {
    setSelectedId({ id: uuid, type: "tasks" });
    setInfoUser(employees.find((member) => member.uuid === uuid));
  }
  function handleEdit(uuid) {
    setSelectedId({ id: uuid, type: "edit" });
    setInfoUser(employees.find((member) => member.uuid === uuid));
  }
  function handleRemove(uuid) {
    setSelectedId({ id: uuid, type: "remove" });
    setInfoUser(employees.find((member) => member.uuid === uuid));
  }
  function handleShow(uuid) {
    setSelectedId({ id: uuid, type: "show" });
    setInfoUser(employees.find((member) => member.uuid === uuid));
  }
  function handleChangeInfo(info) {
    setInfoUser(info);
  }
  function handleChangePassword(bool) {
    setChangePassword((value) => !value);
  }


  return (
    <div className="d-flex">
      <div className="d-none d-lg-block">
        <NavBar />
      </div>
      <div className="w-100  ">
        <Header></Header>
        <Container className="w-100">
          <ToastContainer />
          <Row className="d-flex justify-content-center">
            <Col
              className="mt-3 mt-xl-0 mb-3 "
              xs={12}
              lg={{ span: 8, offset: 2 }}
              xl={{ span: 8, offset: 0 }}
            >

              <ProfileTasks userInfo={infoUser} selectedId={selectedId} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

function ProfileTasks({ userInfo, selectedId }) {
  const [taskUuid, setTaskUuid] = useState()
  const [activeTab, setActiveTab] = useState(1);
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState({
    uuid: "",
    type: "add",
  });
  const [taskInfo, setTaskInfo] = useState({
    uuid: "",
    title: "",
    start_date: "",
    end_date: "",
    status: "",
    priority: "",
    type: "",
    land: "",
    product: "",
    description: "",
  });

  const [points, setPoints] = useState([]);
  const [selectedPointId, setSelectedPointId] = useState({
    uuid: "",
    type: "add",
  });
  const [pointInfo, setPointInfo] = useState({
    uuid: "",
    type: "",
    rating: "0",
    description: "",
    user: "",
    date: "",
  });

  const [lands, setLands] = useState();
  const [products, setProducts] = useState();

  const fetchPoints = async () => {
    const uuid = localStorage.getItem("uuid")
    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`,
    };
    try {
      const response = await axios.get(
        `${IP}/profile-points/${uuid}`,
        {
          headers,
        }
      );
      if (response.status === 200) {
        setPoints(response.data.points);
        console.log(response)
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

  const fetchTasks = async () => {
    const access = localStorage.getItem("access");
    const uuid = localStorage.getItem('uuid')
    const headers = {
      Authorization: `Bearer ${access}`,
    };
    try {
      const response = await axios.get(
        `${IP}/profile-tasks/${uuid}`,
        {
          headers,
        }
      );
      if (response.status === 200) {
        setTasks(response.data);
        console.log(response)

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
    fetchTasks();
  }, []);
  useEffect(() => {
    if (activeTab === 1) {
      fetchTasks();
    } else if (activeTab === 3) fetchPoints();
  }, [activeTab]);

  function handleChangeTaskInfo(info) {
    setTaskInfo(info);
  }
  function handleChangePointInfo(info) {
    setPointInfo(info);
  }
  //on show points component
  function handleDeletePoint(uuid) {
    setSelectedPointId({ uuid: uuid, type: "remove" });
    setPointInfo(points.find((item) => item.uuid === uuid));
    setActiveTab(6);
  }
  function handleEditPoint(uuid) {
    setSelectedPointId({ uuid: uuid, type: "edit" });
    setPointInfo(points.find((item) => item.uuid === uuid));
    setActiveTab(6);
  }

  function handleCancelPoint() {
    setPointInfo({
      uuid: "",
      type: "",
      rating: "0",
      description: "",
      user: "",
      date: "",
    });
    setActiveTab(3);
  }
  function handleCancelTask() {
    setTaskInfo({
      uuid: "",
      title: "",
      start_date: "",
      end_date: "",
      status: "",
      priority: "",
      type: "",
      land: "",
      product: "",
      description: "",
    });
    setActiveTab(1);
  }
  function handleDeleteTask(uuid) {
    setSelectedTaskId({ uuid: uuid, type: "remove" });
    setTaskInfo(tasks.find((item) => item.uuid === uuid));
    setLands(taskInfo.land);
    setActiveTab(5);
  }
  function handleEditTask(uuid) {
    setSelectedTaskId({ uuid: uuid, type: "edit" });
    setTaskInfo(tasks.find((item) => item.uuid === uuid));
    setActiveTab(5);
  }
  const removeTask = async () => {
    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`,
    };
    try {
      const response = await axios.delete(
        `${IP}/tasks/delete/${selectedTaskId.uuid}`,
        {
          headers,
        }
      );
      if (response.status === 200) {
        successMessage("Removing the task was successful!");
        fetchTasks();
      }

    } catch (error) {
      errorMessage("Removing the task was unsuccessful!");
      if (error.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh')
        window.location.href = "/login"
      }
    }
  };
  // add,edit,remove function of task
  function removingTask(uuid) {
    removeTask();
    setTaskInfo({
      uuid: "",
      title: "",
      start_date: "",
      end_date: "",
      status: "",
      priority: "",
      type: "",
      land: "",
      product: "",
      description: "",
    });
    setActiveTab(1);
  }
  function editingTask(editedTask) {
    console.log("editing task");
    successMessage("The task has edited successfully!");
    setTaskInfo({
      uuid: "",
      title: "",
      start_date: "",
      end_date: "",
      status: "",
      priority: "",
      type: "",
      land: "",
      product: "",
      description: "",
    });
    setActiveTab(1);
  }
  function addingTask(newTask) {
    console.log("adding task");
    setTasks((tasks) => [...tasks, taskInfo]);
    successMessage("The task has added successfully!");
    setTaskInfo({
      uuid: "",
      title: "",
      start_date: "",
      end_date: "",
      status: "",
      priority: "",
      type: "",
      land: "",
      product: "",
      description: "",
    });
    setActiveTab(1);
  }
  const removePoint = async () => {
    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`,
    };
    try {
      const response = await axios.delete(
        `${IP}/points/delete/${selectedPointId.uuid}`,
        {
          headers,
        }
      );
      if (response.status === 200) {
        successMessage("Removing the point was Successful!");
        fetchPoints();
      }

    } catch (error) {
      errorMessage("Removing the point was Unsuccessful!");
      if (error.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh')
        window.location.href = "/login"
      }
    }
  };
  // add,edit,remove function of point
  function removingPoint(uuid) {
    removePoint();
    setPointInfo({
      uuid: "",
      type: "",
      rating: "0",
      description: "",
      user: "",
      date: "",
    });
    setActiveTab(3);
  }
  function editingPoint(editedPoint) {
    console.log("editing point");
    successMessage("The point has edited successfully!");
    setPointInfo({
      uuid: "",
      type: "",
      rating: "0",
      description: "",
      user: "",
      date: "",
    });
    setActiveTab(3);
  }
  function addingPoint(newPoint) {
    console.log("adding point");
    setPoints((points) => [...points, pointInfo]);
    successMessage("The point has added successfully!");
    setPointInfo({
      uuid: "",
      type: "",
      rating: "0",
      description: "",
      user: "",
      date: "",
    });
    setActiveTab(3);
  }
  function changeAdd() {
    if (activeTab === 1) {
      setActiveTab(5);
      setSelectedTaskId({ uuid: "", type: "add" });
      setTaskInfo({
        uuid: "",
        title: "",
        start_date: "",
        end_date: "",
        status: "",
        priority: "",
        type: "",
        land: "",
        product: "",
        description: "",
      });
    } else if (activeTab === 3) {
      setActiveTab(6);
      setSelectedPointId({ uuid: "", type: "add" });
      setPointInfo({
        uuid: "",
        type: "",
        rating: "0",
        description: "",
        user: "",
        date: "",
      });
    } else if (activeTab === 5) {
      setActiveTab(1);
    } else if (activeTab === 6) {
      setActiveTab(3);
    }
  }
  useEffect(() => {
    setTaskInfo({
      uuid: "",
      title: "",
      start_date: "",
      end_date: "",
      status: "",
      priority: "",
      type: "",
      land: "",
      product: "",
      description: "",
    });
    setPointInfo({
      uuid: "",
      type: "",
      rating: "0",
      description: "",
      user: "",
      date: "",
    });
    setActiveTab(1);
  }, [userInfo]);

  const [employeeImage, setEmployeeImage] = useState()
  const access = localStorage.getItem('access');
  const employeeUuid = localStorage.getItem("uuid")

  const [employeeInfo, setEmployeeInfo] = useState()
  const getEmployeeImage = async () => {
    const headers = {
      Authorization: `Bearer ${access}`,
    };
    try {
      const response = await axios.get(
        `${IP}/employee-info/${employeeUuid}`,
        {
          headers,
        }
      );
      if (response.status === 200) {
        console.log(response)
        setEmployeeImage(response.data.image)
        setEmployeeInfo(response.data)
        console.log(employeeInfo)
      }

    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh')
        window.location.href = "/login"
      }
    }
  }
  useEffect(() => {
    getEmployeeImage()
  }, [])

  const userUuid = localStorage.getItem("uuid")

  return (
    <>
      {employeeInfo ? (
        <>
          <div className=" shadow p-3 ">
            <Row>
              <Col className="w-100 mt-3" xs={12}>
                <div className="content_top border-primary2-top border-primary2-bottom">
                  <div className="d-flex flex-row align-items-center justify-content-between py-3">
                    <div className="d-flex align-items-center">
                      {employeeInfo.image === null ? (
                        <img src={Avatar} alt="profile" className="imgprofile"></img>
                      ) : (
                        <img
                          src={`${IP}${employeeInfo.image}`}
                          alt="profile"
                          className="imgprofile"
                        ></img>

                      )}
                      <div className="ms-0 ms-md-3">
                        <div className="d-flex align-items-center">
                          <h3 className="color-primary2 mb-0">
                            {employeeInfo.first_name + " " + employeeInfo.last_name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {activeTab === 5 ? (
                  <AddNewTask
                    selectedTaskId={selectedTaskId}
                    taskInfo={taskInfo}
                    onChange={handleChangeTaskInfo}
                    onAdd={addingTask}
                    onRemove={removingTask}
                    onEdit={editingTask}
                    lands={lands}
                    products={products}
                    onBack={handleCancelTask}
                  />
                ) : activeTab === 6 ? (
                  <AddPoints
                    selectedPointId={selectedPointId}
                    pointInfo={pointInfo}
                    onChange={handleChangePointInfo}
                    onAdd={addingPoint}
                    onRemove={removingPoint}
                    onEdit={editingPoint}
                    onBack={handleCancelPoint}
                  />
                ) : (
                  <Tabbed activeTab={activeTab} setActiveTab={setActiveTab}>
                    {activeTab === 1 ? (
                      <EmployeeTabShowTasks
                        tasks={tasks}
                        fetchTasks={fetchTasks}
                      />
                    ) : activeTab === 4 ? (
                      <TabShowProducts userInfo={empuuid} />
                    ) : activeTab === 3 ? (
                      <ShowPoints
                        points={points}
                        userInfo={employeeInfo}
                        onDeletePoint={handleDeletePoint}
                        onEditPoint={handleEditPoint}
                      />
                    ) : activeTab === 2 ? (
                      <EmployeeTabShowMachine userInfo={userUuid} />
                    ) : (
                      <></>
                    )}
                  </Tabbed>
                )}
              </Col>
            </Row>
          </div>
        </>) :
        (<>

        </>)}
    </>

  );

}

function ShowPoints({ points, userInfo, onDeletePoint, onEditPoint }) {
  const [open, setOpen] = useState(false);
  function handleToggle() {
    setOpen((value) => !value);
  }
  return (
    <div className="my-3 ">
      <Row>
        <Col xs={12}>
          <div
            className="manager-points bg-success h-100"
            onClick={handleToggle}
          >
            <div
              className={`${open ? `manager-title-open` : `manager-title-close`
                }`}
            >
              <span className="manager-text">Total Points:</span>
            </div>
            <div
              className={`h-100 ${open ? `between-open` : `between-close`}`}
            ></div>
            <div className="manager-stars aling-center">
              <i className=" bi bi-star-fill icon-point"></i>
            </div>
          </div>
        </Col>
      </Row>
      {open ? (
        <EmployeeTabShowPoints
          points={points}
          onEditPoint={onEditPoint}
          onDeletePoint={onDeletePoint}
        />
      ) : (
        <PointsDetails userInfo={userInfo} />
      )}
    </div>
  );
}
function PointsDetails({ userInfo }) {
  const [pointDetail, setPointDetail] = useState()
  const [sum, setSum] = useState()

  const sums = async () => {

    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`,
    };

    const body = {
      uuid: userInfo.uuid
    }

    try {
      const response = await axios.post(
        `${IP}/sum/`, body,
        {
          headers,
        }
      );
      if (response.status === 200) {
        console.log(response.data)
        setSum(response.data[0])
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


  const fecthSecondPoint = async () => {

    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`,
    };

    const body = {
      uuid: userInfo.uuid
    }

    try {
      const response = await axios.post(
        `${IP}/sum-rating/`, body,
        {
          headers,
        }
      );
      if (response.status === 200) {
        console.log(response.data)
        setPointDetail(response.data);

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
    fecthSecondPoint()
    sums()
  }, [])

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
      {

        windowWidth < 992 ? (
          <>
            {
              pointDetail && pointDetail.length > 0 ? (
                <>
                  <div className="mt-3">
                    <div className="container">
                      <Row className="my-2 d-flex">
                        <Col
                          className="point-box point-box-green"
                          xs={6}
                        >
                          <span>{pointDetailData[0].first}</span>
                        </Col>
                        <Col
                          className="point-box seprated"
                          xs={6}
                        >
                          <span>Points</span>
                          <div className="point-details">
                            <span>{pointDetail && pointDetail[0].T && pointDetail[0].T.count ? pointDetail[0].T.count : 0}</span>
                            <i className="bi bi-star-fill text-warning fs-5 ms-2"></i>
                          </div>
                        </Col>
                      </Row>
                      <Row className="my-2 d-flex">
                        <Col
                          className="point-box point-box-green"
                          xs={6}
                        >
                          <span>{pointDetailData[1].first}</span>
                        </Col>
                        <Col
                          className="point-box seprated"
                          xs={6}
                        >
                          <span>Points</span>
                          <div className="point-details">
                            <span>{pointDetail[1] && pointDetail[1].D && pointDetail[1].D.sum_of_ratings ? pointDetail[1].D.sum_of_ratings : 0}</span>
                            <i className="bi bi-star-fill text-warning fs-5 ms-2"></i>
                          </div>
                        </Col>
                      </Row>
                      <Row className="my-2 d-flex">
                        <Col
                          className="point-box point-box-green"
                          xs={6}
                        >
                          <span>{pointDetailData[2].first}</span>
                        </Col>
                        <Col
                          className="point-box seprated"
                          xs={6}
                        >
                          <span>Points</span>
                          <div className="point-details">
                            <span>{pointDetail[2] && pointDetail[2].G.sum_of_ratings ? pointDetail[2].G.sum_of_ratings : 0}</span>
                            <i className="bi bi-star-fill text-warning fs-5 ms-2"></i>
                          </div>
                        </Col>
                      </Row>
                      <Row className="my-2 d-flex">
                        <Col
                          className="point-box point-box-green"
                          xs={6}
                        >
                          <span>performance evaluation</span>
                        </Col>

                        <Col
                          className="point-box seprated"
                          xs={6}
                        >
                          <span>Points</span>
                          <div className="point-details">
                            <span>{sum && sum.count ? sum.count : 0}</span>
                            <i className="bi bi-star-fill text-warning fs-5 ms-2"></i>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </>
              ) : (<>

              </>)

            }
          </>) : (
          <>
            {
              pointDetail && pointDetail.length > 0 ? (
                <>
                  <div className="mt-3">
                    <div className="container">
                      <Row className="my-2">
                        <Col
                          className="point-box point-box-green"
                          xs={{ offset: 1, span: 10 }}
                          sm={{ offset: 2, span: 8 }}
                          md={{ offset: 3, span: 6 }}
                          lg={{ offset: 0, span: 4 }}
                        >
                          <span>{pointDetailData[0].first}</span>
                        </Col>
                        <Col
                          className="point-box seprated my-3 my-lg-0 "
                          xs={{ offset: 1, span: 10 }}
                          sm={{ offset: 2, span: 8 }}
                          md={{ offset: 3, span: 6 }}
                          lg={{ offset: 0, span: 4 }}
                        >
                          <span>{pointDetailData[0].second}</span>
                          <span>{pointDetail && pointDetail[0].T && pointDetail[0].T.count ? pointDetail[0].T.count : 0}</span>
                        </Col>
                        <Col
                          className="point-box seprated"
                          xs={{ offset: 1, span: 10 }}
                          sm={{ offset: 2, span: 8 }}
                          md={{ offset: 3, span: 6 }}
                          lg={{ offset: 0, span: 4 }}
                        >
                          <span>Points</span>
                          <div className="point-details">
                            <span>{pointDetail[0] && pointDetail[0].T && pointDetail[0].T.sum_of_ratings ? pointDetail[0].T.sum_of_ratings : 0}</span>
                            <i className="bi bi-star-fill text-warning fs-5 ms-2"></i>
                          </div>
                        </Col>
                      </Row>
                      <Row className="my-2">
                        <Col
                          className="point-box point-box-green"
                          xs={{ offset: 1, span: 10 }}
                          sm={{ offset: 2, span: 8 }}
                          md={{ offset: 3, span: 6 }}
                          lg={{ offset: 0, span: 4 }}
                        >
                          <span>{pointDetailData[1].first}</span>
                        </Col>
                        <Col
                          className="point-box seprated my-3 my-lg-0 "
                          xs={{ offset: 1, span: 10 }}
                          sm={{ offset: 2, span: 8 }}
                          md={{ offset: 3, span: 6 }}
                          lg={{ offset: 0, span: 4 }}
                        >
                          <span>{pointDetailData[1].second}</span>
                          <span>{pointDetail[1] && pointDetail[1].D && pointDetail[1].D.count ? pointDetail[1].D.count : 0}</span>
                        </Col>
                        <Col
                          className="point-box seprated"
                          xs={{ offset: 1, span: 10 }}
                          sm={{ offset: 2, span: 8 }}
                          md={{ offset: 3, span: 6 }}
                          lg={{ offset: 0, span: 4 }}
                        >
                          <span>Points</span>
                          <div className="point-details">
                            <span>{pointDetail[1] && pointDetail[1].D && pointDetail[1].D.sum_of_ratings ? pointDetail[1].D.sum_of_ratings : 0}</span>
                            <i className="bi bi-star-fill text-warning fs-5 ms-2"></i>
                          </div>
                        </Col>
                      </Row>
                      <Row className="my-2">
                        <Col
                          className="point-box point-box-green"
                          xs={{ offset: 1, span: 10 }}
                          sm={{ offset: 2, span: 8 }}
                          md={{ offset: 3, span: 6 }}
                          lg={{ offset: 0, span: 4 }}
                        >
                          <span>performance evaluation</span>
                        </Col>
                        <Col
                          className="point-box seprated my-3 my-lg-0 "
                          xs={{ offset: 1, span: 10 }}
                          sm={{ offset: 2, span: 8 }}
                          md={{ offset: 3, span: 6 }}
                          lg={{ offset: 0, span: 4 }}
                        >
                          <span>points from the manager</span>
                          <span>{sum && sum.performance_evaluation ? sum.performance_evaluation : 0}</span>
                        </Col>
                        <Col
                          className="point-box seprated"
                          xs={{ offset: 1, span: 10 }}
                          sm={{ offset: 2, span: 8 }}
                          md={{ offset: 3, span: 6 }}
                          lg={{ offset: 0, span: 4 }}
                        >
                          <span>Points</span>
                          <div className="point-details">
                            <span>{sum && sum.count ? sum.count : 0}</span>
                            <i className="bi bi-star-fill text-warning fs-5 ms-2"></i>
                          </div>
                        </Col>
                      </Row>

                    </div>
                  </div>
                </>
              ) : (<>
              </>)

            }
          </>)
      }

    </>
  );
}
export default Employees;
export function errorMessage(text) {
  toast.error(text, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}
export function warningMessage(text) {
  toast.warning(text, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}
function successMessage(text) {
  toast.success(text, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}
const pointDetailData = [
  { first: "Challenge And Game Success", second: "Completed Challengies" },
  { first: "Task Completion", second: "Completed Tasks" },
  { first: "Daily Login Rate", second: "Activity Days" },
];
