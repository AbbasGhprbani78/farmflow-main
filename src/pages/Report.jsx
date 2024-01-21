import NavBar from "../components/NavBar";
import Header from "../components/Header";
import { Row, Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import axios from "axios";
import { IP } from "../App";
import WeatherReport from "../components/WeatherReport";
import '../Style/Report.css'
import Table from 'react-bootstrap/Table';
import Loading from "../components/Laoding/Loading";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  CategoryScale,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Chart as ChartJS
} from 'chart.js'

function Report() {

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

  const priorityData = [
    { id: "L", name: "group1", label: "Low", type: "radio" },
    { id: "M", name: "group1", label: "Medium", type: "radio" },
    { id: "H", name: "group1", label: "High", type: "radio" },
    { id: "E", name: "group1", label: "Emergency", type: "radio" },
  ]

  const [selectProduct, setSelectedProduct] = useState()
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [typeSensor, setTypeSensor] = useState()
  const [lands, setLands] = useState()
  const [products, setProducts] = useState([])
  const [plans, setPlans] = useState([]);
  const [weather, setWeather] = useState()
  const [showModal, setShowModal] = useState(false)
  const [show, setShow] = useState(false);
  const [selectedRowUuid, setSelectedRowUuid] = useState(null);
  const [chart, setChart] = useState()
  const [tableinfo, setTableInfo] = useState()
  const [modalInfo, setModalInfo] = useState()
  const [allEmployee, setAllEmployee] = useState()
  const [selectEmployee, setSelectedEmployee] = useState()
  const [priority, setPriority] = useState("L")
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  const isGreater = (firsrDate, secondDate) => {
    const fr = firsrDate.split("-").join("");
    const sc = secondDate.split("-").join("");
    if (fr >= sc) return true;
    else return false;
  };


  const options = {
    scales: {
      x: {
        type: 'category',
      },
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            if (chart && chart.length > context.dataIndex) {
              const label = chart[context.dataIndex];
              const date = new Date(label.date);
              return `${date.getHours()}:${date.getMinutes()}`;
            }
            return '';
          },
        },
      },
    },
  };

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
        setWeather(response.data)
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
  const getLandsWeather = async () => {
    const access = localStorage.getItem('access')
    const headers = {
      Authorization: `Bearer ${access}`
    };

    try {
      const response = await axios.get(`${IP}/manager-land-count/`, {
        headers,
      })

      if (response.status === 200) {
        console.log(response)
        setPlans(response.data.manager_lands)

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



  const getAll = async () => {
    const access = localStorage.getItem("access")
    const headers = {
      Authorization: `Bearer ${access}`
    };
    try {
      const response = await axios.get(`${IP}/lands/`, {
        headers,
      })

      if (response.status === 200) {
        console.log(response)
        setLands(response.data)
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

  const getProduct = async (uuid) => {
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

  const getSensortask = async () => {
    const access = localStorage.getItem("access")
    const headers = {
      Authorization: `Bearer ${access}`
    };
    try {
      const response = await axios.get(`${IP}/get-sensor-task/`, {
        headers,
      })

      if (response.status === 200) {
        console.log(response.data)
        setTableInfo(response.data)
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

  const getSensorData = async () => {
    const access = localStorage.getItem("access")
    const headers = {
      Authorization: `Bearer ${access}`
    };

    const body = {
      uuid: selectProduct,
      type: typeSensor
    }
    try {
      const response = await axios.post(
        `${IP}/get-sensor-data/`, body,
        {
          headers,
        }
      );

      if (response.status === 200) {
        console.log(response)
        setChart(response.data)
        setChart(response.data)
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
  
  useEffect(()=>{
    getSensorData()
  },[selectProduct])


  const getAllEmployee = async () => {
    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`,
    };
    try {
      const response = await axios.get(`${IP}/addproduct/`, {
        headers,
      });
      if (response.status === 200) {
        console.log(response)
        setAllEmployee(response.data.employees)
        if (allEmployee) {
          console.log(allEmployee)
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
  }

  const chartReport = chart
    ? {
      labels: chart && chart.length > 0 && chart.map(item => {
        const date = new Date(item.date);
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.toLocaleString('default', { day: 'numeric' });
        return `${month} ${day}`;
      }),

      datasets: [
        {
          label: '#count',
          data: chart.map(item => item.value),
          borderColor: '#5DA25E',
        },
      ],
    }
    : null;

  const getWeathers = (selectedPlanUuid) => {
    if (selectedPlanUuid) {
      console.log(`Getting weather for plan: ${selectedPlanUuid}`);
      getWeather(selectedPlanUuid);
    }
  }

  const onDeleteTask = async (uuid) => {
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
        console.log(response)
        successMessage("Removing the task was successful!");
        getSensortask()
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
  }

  const openModalReport = (info) => {
    setShowModal(true)
    setModalInfo(info)
  }
  const closeModal = () => {
    setShowModal(false)
  }

  const sendInfoHandler = async (e) => {
    e.preventDefault()
    setShowModal(false)

    const todayDate = new Date();
    const formattedDate = todayDate
      .toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/")
      .reverse()
      .join("-");

    if (!startDate) {
      errorMessage("Please select a start time !");
      return;
    }
    if (!endDate) {
      errorMessage("Please select a end time !");
      return;
    }
    if (isGreater(startDate, formattedDate) === false) {
      warningMessage("Please select an start time after today !");
      return;
    }

    if (isGreater(endDate, startDate) === false) {
      warningMessage("Please select an end time after the start time !");
      return;
    }

    const body = {

      uuid: modalInfo.uuid,
      title: modalInfo.title,
      start_date: startDate,
      end_date: endDate,
      priority: priority,
      type: modalInfo.type,
      description: modalInfo.description,
      manager: modalInfo.manager,
      employee: selectEmployee,
      status: "P"
    }

    const access = localStorage.getItem('access')
    const headers = {
      Authorization: `Bearer ${access}`,
    };
    try {
      const response = await axios.put(
        `${IP}/tasks/`, body,
        {
          headers,
        }
      );
      if (response.status === 200) {
        successMessage("Editing the task was successful!");
        setShowModal(false)
        console.log(response)

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

  }

  const handleClose = () => {
    setShow(false);
    setSelectedRowUuid(null);
  };

  const handleShow = (uuid) => {
    setSelectedRowUuid(uuid);
    setShow(true);
  };

  const handleSaveChanges = () => {
    onDeleteTask(selectedRowUuid);
    handleClose();
  };

  useEffect(() => {
    if (lands && lands.length > 0 && lands[0]?.uuid) {
      getProduct(lands[0].uuid);
    }
  }, [lands]);

  useEffect(() => {
    if (lands && plans.length > 0) {
      const firstPlanUuid = plans[0].uuid;
      setSelectedPlan(firstPlanUuid);
      getWeathers(firstPlanUuid);
    }
  }, [plans]);

  useEffect(() => {

    if (allEmployee && allEmployee.length > 0) {
      setSelectedEmployee(allEmployee[0].uuid)
      console.log(allEmployee[0].uuid)
    }
  }, [allEmployee]);

  useEffect(() => {
    if (products && products.length > 0) {
      const firstProductuuid = products[0].uuid;
      setSelectedProduct(firstProductuuid)

    }
  }, [products]);


  useEffect(() => {
    setTypeSensor("wind_speed")
    getSensortask()
    getLandsWeather()
    getAll()
    getSensorData()
    getAllEmployee()
  }, []);


  const truncateDescription = (description) => {
    const words = description.split(' ');
    const truncatedText = words.length > 0 ? `${words[0].substring(0, 5)}${words.length > 1 ? ' ...' : ''}` : '';
    return truncatedText;
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='notif-modal'>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You Sure to Delete This Task ?</Modal.Body>
        <Modal.Footer>
          <Button style={{ width: "100px" }} variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button style={{ width: "100px", backgroundColor: "#5DA25E", border: "none" }} variant="primary" onClick={handleSaveChanges}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {
        showModal &&
        <div className="modal-report-container">
          <div className="modal-report">
            <p className="close-report">
              <i style={{ cursor: "pointer", marginTop: "20px" }} className="bi bi-x" onClick={closeModal}></i>
            </p>
            <h5 className="modal-report-title">
              Task Name
            </h5>
            <p className="report-modal-text">
              Choose Your Selected Course For<br /> Setup Your Challenge
            </p>
            <form className="form-report" onSubmit={sendInfoHandler}>
              <Row className="justify-content-between">
                <Col xs={12}>
                  <div className=" input-parent">
                    <span className="onBorder">Start Date:</span>
                    <input
                      onChange={(e) => setStartDate(e.target.value)}
                      style={{ fontSize: "10px", paddingRight: "15px" }}
                      type="date"
                      className=" input input-sign"
                    ></input>
                  </div>
                </Col>
                <Col xs={12}>
                  <div className="input-parent">
                    <span className="onBorder">End Date:</span>
                    <input
                      onChange={(e) => setEndDate(e.target.value)}
                      style={{ fontSize: "10px", paddingRight: "15px" }}
                      type="date"
                      className="  input input-sign"
                    ></input>
                  </div>
                </Col>
                <Col xs={12}>
                  <div className="input-parent">
                    <span className="onBorder">employee:</span>
                    <select
                      value={selectEmployee}
                      onChange={(e) => setSelectedEmployee(e.target.value)}
                      className="input input-sign"
                      placeholder="Choose Employee Name"
                      style={{ fontSize: "13px", background: "fff" }}
                    >
                      <option disabled value="Choose Employee Name">Employee Name</option>
                      {allEmployee && allEmployee.map((employee, i) => (
                        <option key={i} value={employee.uuid}>{employee.first_name} {employee.last_name}</option>
                      ))}
                    </select>
                  </div>
                </Col>

                <Col xs={12}>
                  <div className="input-parent">
                    <span className="onBorder">Land:</span>
                    <input
                      disabled={true}
                      value={modalInfo.land.title}
                      type="text"
                      className="  input input-sign"
                    ></input>
                  </div>
                </Col>
                <Col xs={12}>
                  <div className=" input-parent">
                    <span className="onBorder">Product:</span>
                    <input
                      disabled={true}
                      value={modalInfo.product.name}
                      type="text"
                      className=" input input-sign"
                    ></input>
                  </div>
                </Col>
                <Col style={{ marginTop: "40px" }} xs={12}>
                  <div style={{ borderRadius: "8px", overflow: "hidden" }} className="input-parent">
                    <span style={{ top: "-2px" }} className="onBorder">Description</span>
                    <textarea disabled={true} style={{ height: "90px", padding: "15px", background: "#fff" }}>
                      {modalInfo.description}
                    </textarea>
                  </div>
                </Col>
                <Col className="d-flex align-items-center check-report" xs={12}>
                  <label style={{ fontWeight: "bold" }} className="text-success me-1">Priority:</label>
                  <Row>
                    {priorityData.map((radio, i) => (
                      <Col xs={6} lg={3}>
                        <Form.Check
                          className="mb-0 d-flex justify-content-around"
                          inline
                          defaultChecked={modalInfo.priority == radio.id}
                          onClick={() => setPriority(radio.id)}
                          label={radio.label}
                          name={radio.name}
                          type={radio.type}
                          id={radio.id}
                          key={i}
                        />
                      </Col>
                    ))}
                  </Row>

                </Col>
                <Col xs={12}>
                  <button
                    style={{ padding: "8px 0", color: "#fff", background: "#5DA25E", width: "100%", borderRadius: "8px", border: "none", outline: "none" }}
                    type="submit">save</button>
                </Col>
              </Row>
            </form>
          </div>
        </div>
      }

      {
        products &&
          lands ?
          (
            <div className="d-flex">
              <div className="d-none d-lg-block">
                <NavBar />
              </div>
              <div className="w-100 ">
                <Header></Header>
                <div className="container">
                  <Row className="top-report">
                    <Col className="drop-report d-flex" xs={12} md={3}>
                      <select
                        value={typeSensor}
                        onChange={(e) => {
                          setTypeSensor(e.target.value)
                          getSensorData()
                        }}
                        className="drop-ch">

                        <option style={{ fontWeight: "bold" }} disabled selected value="Land">Type Of Sensor</option>
                        <option style={{ fontWeight: "bold" }} value="wind_speed">wind speed</option>
                        <option style={{ fontWeight: "bold" }} value="temperature">temperature</option>
                        <option style={{ fontWeight: "bold" }} value="humidity">humidity</option>
                        <option style={{ fontWeight: "bold" }} value="soil_moisture">soil moisture</option>

                      </select>
                      <select
                        value={selectedPlan}
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          setSelectedPlan(selectedValue);
                          getWeather(selectedValue);
                          getProduct(selectedValue);
                          getSensorData()
                        }}
                        className="drop-ch"
                      >
                        <option style={{ fontWeight: "bold" }} selected disabled value="Land">Land</option>
                        {plans &&
                          plans.map(plan => (
                            <option key={plan.uuid} value={plan.uuid}>{plan.title}</option>
                          ))
                        }
                      </select>
                      <select
                        value={selectProduct}
                        onChange={(e) => {
                          setSelectedProduct(e.target.value)
                          getSensorData()
                        }}
                        className="drop-ch">
                        <option style={{ fontWeight: "bold" }} selected disabled value="Product">Product</option>
                        {products && products.map((product, i) => (
                          <option key={i} value={product.uuid}>{product.name}</option>
                        ))}
                      </select>
                    </Col>
                    <Col className="chart-report" md={9}>
                      {
                        chartReport &&
                        <Line className="line" data={chartReport} options={options} />
                      }
                    </Col>
                  </Row>
                  <Row className="weather-report-container mt-3">
                    <Col className="weather-report" xs={12}>
                      <WeatherReport weather={weather} />
                    </Col>
                  </Row>
                  <Row className="table-report-row mt-3">
                    <Col className="table-report-container">
                      <p className="report-table-text">
                        Suggested tasks
                      </p>
                      <Row className="row-table-container">
                        <div className="table-chart-container">
                          {
                            tableinfo &&
                            <Table className="table table-responsive-custome">
                              <thead style={{ textAlign: "center" }}>
                                <tr className="noborder-shadow">
                                  <th className="thead-report">Name</th>
                                  <th className="thead-report">Land</th>
                                  <th className="thead-report">Product</th>
                                  <th className="thead-report">description</th>
                                  <th className="thead-report">Action</th>
                                </tr>
                              </thead>

                              <tbody style={{ textAlign: "center" }}>
                                {tableinfo && tableinfo.map((info, i) => (
                                  <tr key={i} className="noborder-shadow">
                                    <td className="td-report">{info.title}</td>
                                    <td className="td-report">{info.land.title}</td>
                                    <td className="td-report">{info.product.name}</td>
                                    <td className="td-report dec-th" style={{ cursor: "pointer" }} onClick={() => openModalReport(info)}>
                                      {truncateDescription(info.description)}
                                    </td>
                                    <td className="td-report  action-report justify-content-center">
                                      <i style={{ cursor: "pointer" }} className="bi bi-check2 fs-5 text-success" onClick={() => openModalReport(info)}>
                                      </i>
                                      <i style={{ cursor: "pointer" }} className="bi bi-trash3 fs-5 text-danger" onClick={() => handleShow(info.uuid)} >
                                      </i>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          }

                        </div>

                      </Row>
                      <Row >
                      </Row>
                    </Col>
                  </Row>
                </div>
              </div>
              <ToastContainer />
            </div>
          ) :
          (

            <Loading />
          )
      }
    </>
  );
}

export default Report;

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



