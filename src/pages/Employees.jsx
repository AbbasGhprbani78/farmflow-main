import NavBar from "../components/NavBar";
import Header from "../components/Header";
import { Row, Col } from "react-bootstrap";
import AddPoints from "../components/Profile add component/AddPoints";
import AddNewTask from "../components/Profile add component/AddNewTask";
import "../Style/profileadd.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Avatar from "../Images/profileadd/avatar.png"
import { AddMember } from "../components/Profile add component/AddMember";
import { Members } from "../components/Profile add component/Members";
import { TabShowProducts } from "../components/Profile add component/TabShowProducts";
import { TabShowTasks } from "../components/Profile add component/TabShowTasks";
import { Tabbed } from "../components/Tab component/Tabbed";
import { TabShowPoints } from "../components/Profile add component/TabShowPoints";
import { TabShowMachines } from "../components/Profile add component/TabShowMachines";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IP } from "../App";
import Loading from "../components/Laoding/Loading";
import { FaArrowLeftLong } from "react-icons/fa6";



function Employees() {

  const [userTaskUuid, setUserTaskUuid] = useState()
  const [selectedId, setSelectedId] = useState({ id: "", type: "add" });
  const [employees, setEmployees] = useState();
  const [changePassword, setChangePassword] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showTasks, setShowTasks] = useState(false)
  const [changeUser, setChangeUser] = useState()
  const [loading, setIsLodaing] = useState(false)
  const [AllEmployee, setAllEmployee] = useState(true)
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
    uuid: '',
  });

  const [manager, setManager] = useState([])

  const fetchEmployees = async (uuid) => {
    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`,
    };
    try {
      const response = await axios.get(`${IP}/all-employees/`, {
        headers,
      });
      if (response.status === 200) {
        if (response.data.employees.length === 0) {
          setSelectedId({ id: "", type: "add" });
          setInfoUser("");
        } else {
          setManager(response.data.manager[0])
          setEmployees(response.data.employees);

          setUserTaskUuid(response.data && response.data.employees.length > 0 && response.data.employees[0].uuid)
          if (uuid === "0") {
            setSelectedId({
              id: response.data.employees[0].uuid,
              type: "tasks",
            });
            setInfoUser(response.data.employees[0]);
          } else {
            setSelectedId({
              id: response.data.employees[response.data.employees.length - 1]
                .uuid,
              type: "tasks",
            });
            setInfoUser(
              response.data.employees[response.data.employees.length - 1]
            );
          }
        }
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
    fetchEmployees("0");
  }, []);

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
    setShowTasks(true)
  }

  function onClickUser(uuid) {
    setSelectedId({ id: uuid, type: "tasks" });
    setInfoUser(employees.find((member) => member.uuid === uuid));
    setUserTaskUuid(uuid)
    setChangeUser(uuid)
    setShowTasks(true)
    setAllEmployee(false)
  }

  function onManager(uuid) {
    setInfoUser(manager)
    setUserTaskUuid(uuid)
    setChangeUser(uuid)
    setShowTasks(true)
    setAllEmployee(false)
  }


  function handleEdit(uuid) {
    setSelectedId({ id: uuid, type: "edit" });
    setInfoUser(employees.find((member) => member.uuid === uuid));
    setShowTasks(true)
  }
  function handleRemove(uuid) {
    setSelectedId({ id: uuid, type: "remove" });
    setInfoUser(employees.find((member) => member.uuid === uuid));
    setShowTasks(true)
  }
  function handleShow(uuid) {
    setSelectedId({ id: uuid, type: "show" });
    setInfoUser(employees.find((member) => member.uuid === uuid));
    setShowTasks(true)
  }
  function handleMangerEdit(uuid) {
    setSelectedId({ id: uuid, type: "edit" });
    setInfoUser(manager);
    setShowTasks(true)
  }
  function handleMangerRemove(uuid) {
    setSelectedId({ id: uuid, type: "remove" });
    setInfoUser(manager);
    setShowTasks(true)
  }
  function handleMangerShow(uuid) {
    setSelectedId({ id: uuid, type: "show" });
    setInfoUser(manager);
    setShowTasks(true)
  }
  function handleChangeInfo(info) {
    setInfoUser(info);
  }
  function handleChangePassword(bool) {
    setChangePassword((value) => !value);
  }

  async function addingUser(formData) {
    try {
      const access = localStorage.getItem("access");
      const headers = {
        Authorization: `Bearer ${access}`,
      };
      const response = await axios.post(
        `${IP}/add-employee/`,
        formData,
        {
          headers,
        }
      );
      if (response.status === 201) {
        fetchEmployees("1");
        successMessage(response.data.message);
      }

    } catch (error) {

      if (error.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh')
        window.location.href = "/login"
      }
      toast.error(`${error.response.data.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

  }

  async function edittingUser(formData) {

    setIsLodaing(true)

    try {
      const access = localStorage.getItem("access");
      const headers = {
        Authorization: `Bearer ${access}`,
      };

      console.log("FormData content:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      if (formData.get("image") === null || formData.get("image").name === "") {
        formData.delete("image");
      }


      const response = await axios.put(
        `${IP}/edit-employee/`,
        formData,
        { headers }
      );


      if (response.status === 200) {
        console.log(response);
        successMessage("Edit user successful");
        setIsLodaing(false)
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh')
        window.location.href = "/login"
      }

    } finally {
      setIsLodaing(false);
    }
  }

  async function removingUser(uuid) {
    setIsLodaing(true)
    try {
      const access = localStorage.getItem("access");
      const headers = {
        Authorization: `Bearer ${access}`,
      };
      const response = await axios.delete(
        `${IP}/delete-employee/${uuid}`,

        {
          headers,
        }
      );
      if (response.status === 200) {
        fetchEmployees("0");
        setIsLodaing(true)
        successMessage(response.data.message);
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      }

    } catch (e) {
      errorMessage(e.message);
      if (e.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh')
        window.location.href = "/login"
      }
    } finally {
      setIsLodaing(false)
    }

  }

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const backHandler = () => {
    setShowTasks(false)
  }

  const handleAllEmpolyee = () => {
    setAllEmployee(true)
    setShowTasks(true)
  }
  return (
    <>
      {
        setEmployees ? (
          <>
            <div className="d-flex">
              <div className="d-none d-lg-block">
                <NavBar />
              </div>
              <div className="w-100  ">
                <Header></Header>
                <div className="w-100 container-fluid">
                  <ToastContainer />
                  <Row>
                    {windowWidth < 768 ? (
                      <>
                        {showTasks ? (
                          <>
                            <Col
                              onClick={backHandler}
                              style={{ textAlign: "left", color: "#5da25e", cursor: "pointer", fontSize: "18px", position: "relative" }}
                              xs={12}>
                              <FaArrowLeftLong />
                            </Col>
                            <Col
                              className="mt-3 mt-xl-0 mb-3 "
                              xs={12}
                            >
                              {selectedId && selectedId.type === "tasks" ? (
                                <ProfileTasks
                                  userInfo={infoUser}
                                  selectedId={selectedId}
                                  userTaskUuid={userTaskUuid}
                                  changeUser={changeUser}
                                  AllEmployee={AllEmployee}
                                />
                              ) : (
                                <AddMember
                                  user={infoUser}
                                  onHanddleCancel={onHanddleBack}
                                  onChangeInfo={handleChangeInfo}
                                  selectedId={selectedId}
                                  onRemove={removingUser}
                                  onEdit={edittingUser}
                                  onAdd={addingUser}
                                  onPass={changePassword}
                                  changePass={handleChangePassword}
                                  loading={loading}
                                />
                              )}
                            </Col>
                          </>) :
                          (
                            <>
                              <Col
                                className="px-3 px-xl-4 "
                                xs={12}
                                xl={{ span: 4, offset: 0 }}

                              >
                                <Members
                                  handleMangerEdit={handleMangerEdit}
                                  handleMangerRemove={handleMangerRemove}
                                  handleMangerShow={handleMangerShow}
                                  onManager={onManager}
                                  members={employees}
                                  onItem={onClickUser}
                                  selectedId={selectedId}
                                  onHeader={onHeader}
                                  onEdit={handleEdit}
                                  onRemove={handleRemove}
                                  onShow={handleShow}
                                  handleAllEmpolyee={handleAllEmpolyee}
                                  manager={manager}
                                  AllEmployee={AllEmployee}
                                />
                              </Col>
                            </>)}
                      </>) : (
                      <>
                        <Col
                          style={{ position: "relative" }}
                          className="px-3 px-xl-4 mb-3"
                          xs={12}
                          lg={4}
                          xl={{ span: 4, offset: 0 }}
                        >

                          <Members
                            handleMangerEdit={handleMangerEdit}
                            handleMangerRemove={handleMangerRemove}
                            handleMangerShow={handleMangerShow}
                            onManager={onManager}
                            members={employees}
                            onItem={onClickUser}
                            selectedId={selectedId}
                            onHeader={onHeader}
                            onEdit={handleEdit}
                            onRemove={handleRemove}
                            onShow={handleShow}
                            handleAllEmpolyee={handleAllEmpolyee}
                            manager={manager}
                            AllEmployee={AllEmployee}
                          />
                        </Col>
                        <Col
                          className="mt-3 mt-xl-0 mb-3 "
                          style={{ height: "100%", maxWidth: "1000px" }}
                          xs={12}
                          lg={8}
                          xl={{ span: 8, offset: 0 }}
                        >
                          {selectedId && selectedId.type === "tasks" ? (
                            <ProfileTasks
                              userInfo={infoUser}
                              selectedId={selectedId}
                              userTaskUuid={userTaskUuid}
                              changeUser={changeUser}
                              AllEmployee={AllEmployee}
                            />
                          ) : (
                            <AddMember
                              user={infoUser}
                              onHanddleCancel={onHanddleBack}
                              onChangeInfo={handleChangeInfo}
                              selectedId={selectedId}
                              onRemove={removingUser}
                              onEdit={edittingUser}
                              onAdd={addingUser}
                              onPass={changePassword}
                              changePass={handleChangePassword}
                              loading={loading}
                            />
                          )}
                        </Col>
                      </>)}
                  </Row>
                </div>
              </div>
            </div>
          </>) : (
          <>
            <Loading />
          </>)
      }

    </>
  );
}

function ProfileTasks({ userInfo, userTaskUuid, changeUser, AllEmployee }) {

  console.log(userInfo)
  const [activeTab, setActiveTab] = useState(1);
  const [tasks, setTasks] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [allTask, setAllTask] = useState([])
  const [selectedTaskId, setSelectedTaskId] = useState({
    uuid: "",
    type: "add",
  });

  const [taskInfo, setTaskInfo] = useState({
    uuid: "",
    title: "",
    start_date: "",
    end_date: "",
    priority: "",
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
    type: "T",
    rating: "0",
    description: "",
    user: "",
    date: "",
  });

  const [lands, setLands] = useState();
  const [products, setProducts] = useState();

  const fetchLand = async () => {
    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`,
    };
    try {
      const response = await axios.get(
        `${IP}/lands/`,
        {
          headers,
        }
      );
      if (response.status === 200) {
        console.log(response)
        setLands(response.data);

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



  const fetchProduct = async (uuid) => {
    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`,
    };
    const body = {
      uuid: uuid
    }
    try {
      const response = await axios.post(
        `${IP}/get-product-land/`, body,
        {
          headers,
        }
      );
      if (response.status === 200) {
        console.log(response)
        setProducts(response.data)

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

  const fetchPoints = async () => {
    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`,
    };
    try {
      const response = await axios.get(
        `${IP}/profile-points/${userInfo.uuid}`,
        {
          headers,
        }
      );
      if (response.status === 200) {
        setPoints(response.data.points);

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
  };

  const fetchAllTasks = async () => {
    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`,
    };

    try {
      const response = await axios.get(
        `${IP}/all-profile-tasks/`,
        { headers }
      );
      if (response.status === 200) {
        setAllTask(response.data)
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
  };
  useEffect(() => {
    fetchAllTasks()
  }, [])

  const fetchTasks = async () => {
    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`,
    };

    try {
      const response = await axios.get(
        `${IP}/profile-tasks/${userInfo.uuid}`,

        { headers }
      );
      if (response.status === 200) {
        setTasks(response.data);
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
  };

  useEffect(() => {
    fetchTasks();
  }, [userInfo])

  useEffect(() => {
    if (activeTab === 1) {
      fetchTasks();
    } else if (activeTab === 3) fetchPoints();
  }, [activeTab]);



  function handleChangeTaskInfo(info) {
    setTaskInfo(info);
    fetchProduct()
  }

  function handleChangePointInfo(info) {
    setPointInfo(info);
  }

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
      type: "T",
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
      status: "P",
      priority: "",
      type: "T",
      land: "",
      product: "",
      description: "",
    });
    setActiveTab(1);
  }

  function handleEditTask(uuid) {
    fetchLand()
    fetchTasks()
    setSelectedTaskId({ uuid: uuid, type: "edit" });
    setTaskInfo(tasks.find((item) => item.uuid === uuid));
    setActiveTab(5);
  }
  const removeTask = async (uuid) => {
    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`,
    };
    try {
      const response = await axios.delete(
        `${IP}/tasks/delete/${uuid}`,
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

  function removingTask(uuid) {
    removeTask(uuid);
    setTaskInfo({
      uuid: "",
      title: "",
      start_date: "",
      end_date: "",
      status: "P",
      priority: "",
      type: "T",
      land: "",
      product: "",
      description: "",
    });
    setActiveTab(1);
  }

  const EditTask = async (editedTask) => {

    const access = localStorage.getItem('access')
    const managerUuid = localStorage.getItem('uuid')
    const headers = {
      Authorization: `Bearer ${access}`
    };

    const body = {

      uuid: editedTask.uuid,
      title: editedTask.title,
      start_date: editedTask.start_date,
      end_date: editedTask.end_date,
      status: editedTask.status,
      priority: editedTask.priority,
      type: editedTask.type,
      land: editedTask.land,
      product: editedTask.product,
      description: editedTask.description,
      manager: managerUuid,

    }

    try {
      const response = await axios.put(
        `${IP}/tasks/`, body,
        {
          headers,
        }
      );
      if (response.status === 200) {
        successMessage("Editing the task was successful!");
        fetchTasks();
      }

    } catch (error) {
      errorMessage("Editing the task was unsuccessful!");
      if (error.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh')
        window.location.href = "/login"
      }
    }
  };

  async function editingTask(editedTask) {

    EditTask(editedTask)

    successMessage("The task has edited successfully!");
    setTaskInfo({
      uuid: "",
      title: "",
      start_date: "",
      end_date: "",
      status: "P",
      priority: "",
      type: "T",
      land: "",
      product: "",
      description: "",
    });
    setActiveTab(1);
  }

  const addTask = async (newTask) => {
    console.log(newTask.uuid)
    const access = localStorage.getItem('access')
    const managerUuid = localStorage.getItem('uuid')
    const headers = {
      Authorization: `Bearer ${access}`
    };

    const body = {
      employee: newTask.uuid,
      title: newTask.title,
      start_date: newTask.start_date,
      end_date: newTask.end_date,
      status: "P",
      priority: newTask.priority,
      type: "T",
      land: newTask.land,
      product: newTask.product,
      description: newTask.description,
      manager: managerUuid,

    }

    try {
      const response = await axios.post(
        `${IP}/tasks/`, body,
        {
          headers,
        }
      );
      if (response.status === 201) {
        fetchTasks()
        console.log(response)
        successMessage("Task Added Successfully")

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
  function addingTask(newTask) {
    addTask(newTask)
    setTasks((tasks) => [...tasks, taskInfo]);

    setTaskInfo({
      uuid: "",
      title: "",
      start_date: "",
      end_date: "",
      status: "P",
      priority: "",
      type: "T",
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

  function removingPoint(uuid) {
    removePoint();
    setPointInfo({
      uuid: "",
      type: "T",
      rating: "0",
      description: "",
      user: "",
      date: "",
    });
    setActiveTab(3);
  }

  const editPoint = async (editedPoint) => {
    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`,
    };



    const body = {
      user: userInfo.uuid,
      uuid: editedPoint.uuid,
      type: editedPoint.type,
      rating: editedPoint.rating,
      description: editedPoint.description,
      date: editedPoint.date.slice(0, -2)
    }

    console.log(body)
    try {
      const response = await axios.put(
        `${IP}/edit-profile-points/`, body,
        {
          headers,
        }
      );
      if (response.status === 200) {
        console.log(response)
        successMessage("The point has edited successfully!");
        TabShowPoints()
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

  function editingPoint(editedPoint) {
    console.log("editing point");
    editPoint(editedPoint)
    setPointInfo({
      uuid: "",
      type: "T",
      rating: "0",
      description: "",
      user: "",
      date: "",
    });
    setActiveTab(3);
  }
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const addPoint = async (newPoint) => {

    console.log(newPoint)
    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`,
    };

    const body = newPoint

    try {
      const response = await axios.post(
        `${IP}/points/`, body,
        {
          headers,
        }
      );
      console.log("Response status code:", response);
      if (response.status === 201) {
        console.log(response)
        successMessage("The point has added successfully!");
      }
      if (response.status === 400) {
        console.log('hello')
      }

    } catch (error) {
      if (error.response.status === 400) {
        handleShow()
      }
      if (error.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh')
        window.location.href = "/login"
      }
    }

  }
  function addingPoint(newPoint) {
    addPoint(newPoint)
    setPoints((points) => [...points, pointInfo]);
    fetchPoints()
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
      fetchLand()
      setActiveTab(5);
      setSelectedTaskId({ uuid: "", type: "add" });
      setTaskInfo({
        uuid: userTaskUuid,
        title: "",
        start_date: "",
        end_date: "",
        status: "P",
        priority: "",
        type: "T",
        land: "",
        product: "",
        description: "",
      });
    } else if (activeTab === 3) {
      setActiveTab(6);
      setSelectedPointId({ uuid: "", type: "add" });
      setPointInfo({
        uuid: "",
        type: "T",
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
      status: "P",
      priority: "",
      type: "T",
      land: "",
      product: "",
      description: "",
    });
    setPointInfo({
      uuid: "",
      type: "T",
      rating: "0",
      description: "",
      user: "",
      date: "",
    });
    setActiveTab(1);
  }, [userInfo]);


  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='notif-modal'>Add Point</Modal.Title>
        </Modal.Header>
        <Modal.Body>You Already Added Point for this Month!</Modal.Body>
        <Modal.Footer>
          <Button style={{ width: "100px", backgroundColor: "#5DA25E", border: "none" }} onClick={handleClose}>
            Ok
          </Button>

        </Modal.Footer>
      </Modal>
      <div className=" shadow p-3 ">
        <Row>
          {
            AllEmployee ?
              <>
                <Tabbed activeTab={activeTab} setActiveTab={setActiveTab} divClass={'tab-style'} nopoint={"false"}>
                  {activeTab === 1 ? (
                    <TabShowTasks
                      tasks={allTask}
                      onDeleteTask={removingTask}
                      onEditTask={handleEditTask}
                      fetchTasks={fetchTasks}
                      main={"false"}
                    />
                  ) : activeTab === 4 ? (
                    <TabShowProducts userInfo={userInfo} activeTab={4} />
                  ) : activeTab === 2 ? (
                    <TabShowMachines userInfo={userInfo.uuid} activeTab={8} />
                  ) : (
                    <></>
                  )}
                </Tabbed>
              </> :
              <Col className="w-100 mt-3" xs={12}>

                <div className="content_top border-primary2-top border-primary2-bottom top-task-name">
                  <div className="d-flex flex-row align-items-center justify-content-between py-3">
                    <div className="d-flex align-items-center">
                      {userInfo.image === null ? (
                        <img src={Avatar} alt="profile" className="imgprofile"></img>
                      ) : (
                        <img
                          src={`${IP}${userInfo.image}`}
                          alt="profile"
                          className="imgprofile"
                        ></img>
                      )}
                      <div className="ms-0 ms-md-3">
                        <div className="d-flex align-items-center">
                          <p className="color-primary2 mb-0 member-task-employee">
                            {userInfo.first_name + " " + userInfo.last_name}
                          </p>
                        </div>
                      </div>
                    </div>
                    {activeTab !== 2 && activeTab !== 4 ? (
                      <span className="addtwo" onClick={changeAdd}>
                        {activeTab === 1
                          ? "Add Task"
                          : activeTab === 3
                            ? "Add Point"
                            : activeTab === 5
                              ? "Back"
                              : activeTab === 6
                                ? "Back"
                                : ""}
                      </span>
                    ) : (
                      <></>
                    )}
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
                    userInfo={userInfo}
                    selectedPointId={selectedPointId}
                    pointInfo={pointInfo}
                    onChange={handleChangePointInfo}
                    onAdd={addingPoint}
                    onRemove={removingPoint}
                    onEdit={editingPoint}
                    onBack={handleCancelPoint}
                  />
                ) : (
                  <Tabbed activeTab={activeTab} setActiveTab={setActiveTab} divClass={'tab-style'}>
                    {activeTab === 1 ? (
                      <TabShowTasks
                        tasks={tasks}
                        onDeleteTask={removingTask}
                        onEditTask={handleEditTask}
                        fetchTasks={fetchTasks}
                      />
                    ) : activeTab === 4 ? (
                      <TabShowProducts userInfo={userInfo} />
                    ) : activeTab === 3 ? (
                      <ShowPoints
                        points={points}
                        userInfo={userInfo}
                        onDeletePoint={handleDeletePoint}
                        onEditPoint={handleEditPoint}
                      />
                    ) : activeTab === 2 ? (
                      <TabShowMachines userInfo={userInfo.uuid} />
                    ) : (
                      <></>
                    )}
                  </Tabbed>
                )}
              </Col>
          }

        </Row>
      </div>
    </>
  );
}

function ShowPoints({ points, onDeletePoint, onEditPoint, userInfo }) {
  const [open, setOpen] = useState(false);

  function handleToggle() {
    setOpen((value) => !value);
  }
  return (
    <div className="my-3">
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
        <TabShowPoints
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
                            <span>{pointDetail && pointDetail[2].T && pointDetail[2].T.sum_of_ratings ? pointDetail[2].T.sum_of_ratings : 0}</span>
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
                            <span>{pointDetail[0] && pointDetail[0].D && pointDetail[0].D.sum_of_ratings ? pointDetail[0].D.sum_of_ratings : 0}</span>
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
                            <span>{pointDetail[1] && pointDetail[1].G && pointDetail[1].G.sum_of_ratings ? pointDetail[1].G.sum_of_ratings : 0}</span>
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
                <Loading />
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
                          <span>{pointDetail && pointDetail[2].T && pointDetail[2].T.count ? pointDetail[2].T.count : 0}</span>
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
                            <span>{pointDetail[2] && pointDetail[2].T && pointDetail[2].T.sum_of_ratings ? pointDetail[2].T.sum_of_ratings : 0}</span>
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
                          <span>{pointDetail[0] && pointDetail[0].D && pointDetail[0].D.count ? pointDetail[0].D.count : 0}</span>
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
                            <span>{pointDetail[0] && pointDetail[0].D && pointDetail[0].D.sum_of_ratings ? pointDetail[0].D.sum_of_ratings : 0}</span>
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
                          <span>{pointDetailData[2].first}</span>
                        </Col>
                        <Col
                          className="point-box seprated my-3 my-lg-0 "
                          xs={{ offset: 1, span: 10 }}
                          sm={{ offset: 2, span: 8 }}
                          md={{ offset: 3, span: 6 }}
                          lg={{ offset: 0, span: 4 }}
                        >
                          <span>{pointDetailData[2].second}</span>
                          <span>{pointDetail[1] && pointDetail[1].G && pointDetail[1].G.count ? pointDetail[1].G.count : 0}</span>
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
                            <span>{pointDetail[1] && pointDetail[1].G && pointDetail[1].G.sum_of_ratings ? pointDetail[1].G.sum_of_ratings : 0}</span>
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
  { first: "Task Completion", second: "Completed Tasks" },
  { first: "Daily Login Rate", second: "Activity Days" },
  { first: "Challenge And Game Success", second: "Completed Challengies" },
];





//sum/