import DropDown from "../DropDown";
import TextInput from "../TextInput";
import TextArea from "../TextArea";
import "../../Style/addProduct.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { IP } from "../../App";
import Table from 'react-bootstrap/Table';
import Loading from "../Laoding/Loading";

function AddProduct({ productInfo, selectedProduct, onBack, onChange }) {
  const [allTask, setAllTask] = useState([]);
  const [employeeData, setEmployeeData] = useState();
  const [landData, setLandData] = useState();
  const [productDate, setProductData] = useState();
  const [loding, setLoading] = useState(true)


  const fetchAddProduct = async () => {
    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`,
    };
    try {
      const response = await axios.get(`${IP}/addproduct/`, {
        headers,
      });
      if (response.status === 200) {
        setEmployeeData(response.data.employees);
        setLandData(response.data.lands);
        setProductData(response.data.products);
        setLoading(false)
        console.log(response)
      }
    } catch (error) { }
  };

  useEffect(() => {
    fetchAddProduct();
  }, []);

  async function handleSave(data) {

    const allData = {
      product: data,
      tasks: allTask,
    };

    try {
      const access = localStorage.getItem("access");
      const headers = {
        Authorization: `Bearer ${access}`,
      };
      const response = await axios.post(
        `${IP}/addproduct/`,
        allData,
        {
          headers,
        }
      );
      if (response.status === 201) {
        successMessage(response.data.message);
        window.location.href = "/product"
      }
    } catch (e) {
      errorMessage(e.message);
    }
  }

  function handleAddTask(task) {
    setAllTask((tasks) => [...tasks, task]);
  }
  function handleDeleteTask(id) {
    setAllTask((tasks) => tasks.filter((task) => task.id !== id));
    warningMessage("The task is removed successfully!");
  }


  return (
    <>
      {loding ? (
        <>
          <Loading />
        </>) : (
        <>
          <Container className="w-100 h-75">
            <ToastContainer />
            <Row className="h-100">
              <Col xs={12} md={5} className="add-newProduct-container">

                <AddNewProduct
                  onSave={handleSave}
                  planesNameData={landData}
                  productData={productDate}
                  onBack={onBack}
                />
              </Col>
              <Col xs={12} md={7}>
                <AddNewTask
                  key={1}
                  onAddTask={handleAddTask}
                  employee={employeeData}
                  onDeleteTask={handleDeleteTask}
                  tasks={allTask}
                  land={landData}
                  onBack={onBack}

                />
              </Col>
            </Row>
          </Container>
        </>
      )}

    </>
  );
}

function AddNewProduct({ productData, planesNameData, onSave, onBack }) {
  const data1 = productData;
  const data2 = planesNameData;
  const [product, setProduct] = useState(productData[0].id);
  const [selectedTitle, setSelectedTitle] = useState(productData[0].name)
  const [plansName, setPlansName] = useState(planesNameData[0].uuid);
  const [implant, setImplant] = useState();
  const [productDes, setProductDes] = useState();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


  function handleSubmit(e) {
    e.preventDefault();
    if (!product) {
      errorMessage("Please choose the product!");
      return;
    } else if (!plansName) {
      errorMessage("Please choose the land!");
      return;
    } else if (!implant) {
      errorMessage("Please choose the implant date!");
      return;
    }
    let description = productDes;
    if (!productDes) {
      description = "none";
    }
    const newItem = {
      id: product,
      name: selectedTitle,
      land: plansName,
      sow_date: implant,
      description: description,
    };
    onSave(newItem);
    setProduct("");
    setPlansName("");
    setImplant("");
    setProductDes("");
    setSelectedTitle("")


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
    window.location.href = "/product"
  }
  return (
    <>
      {windowWidth < 768 ? (
        <>
          <h5 className="ms-3 mb-3">Add New Product</h5>
          <div className="newProductglass">
            <form
              className="d-flex  pe-0 pe-md-4 flex-column form-land"
              onSubmit={handleSubmit}
            >
              <div className="mb-3 fielddrop">
                <label className="text-success" style={{ marginTop: "25px" }}>chose your product</label>
                <select
                  style={{ borderRadius: "8px", marginTop: "10px" }}
                  disabled={false}
                  placeholder="Choose Your Product"
                  className="p-2 text-light w-100 bg-success"
                  value={product}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    setProduct(selectedValue);
                    const selectedData = productData.find(data => data.id == selectedValue)
                    setSelectedTitle(selectedData ? selectedData.name : '');
                  }}>

                  {productData && productData.map(data => (
                    <option style={{ backgroundColor: "#fff", color: "#198754" }} key={data.id} value={data.id}>{data.name}</option>
                  ))}
                </select>
              </div>

              <DropDown
                key={3}
                divClass=" mb-3 fielddrop"
                state={plansName}
                onChange={(e) => setPlansName(e.target.value)}
                placeholder="Name Of Plan"
                data={data2}
                label="Name Of Land:"
                lableClass="text-success"
                type={3}

              />

              <TextInput
                value={implant}
                onChange={(e) => setImplant(e.target.value)}
                type="date"
                inputClass="mt-0"
                label="Date of implant"
                key={4}
                divClass="fielddrop mb-3"
                lableClass="product-date"
              />
              <TextArea
                key={5}
                value={productDes}
                onChange={(e) => setProductDes(e.target.value)}
                palce="Enter your text"
                label="Description "
                lableClass="text-success product-date"
                row={4}
                height="100px"
                inputClass=""
                divClass={"area-product"}
              />
              <div className="btns-tasks-wrapper w-100 justify-content-center justify-content-md-start align-items-center mb-3 gap-3">
                <button className="btn btn-success" style={{ width: "100%" }} id="btn-prodct-save">
                  Save
                </button>
                <button
                  type="button"
                  style={{ width: "100%" }}
                  onClick={onBack}
                  className="btn btn-light border border-success text-success cancel-button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </>) :
        (
          <>
            <div className="h-100 d-flex justify-content-between justify-content-md-start aligin-items-center flex-column border-side">
              <h5 className="ms-3">Add New Product</h5>
              <div>
                <form
                  className="d-flex w-100 pe-0 pe-md-4 flex-column"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-3 fielddrop">
                    <label className="text-success"></label>
                    <select
                      style={{ borderRadius: "8px", marginTop: "10px" }}
                      disabled={false}
                      placeholder="Choose Your Product"
                      className="p-2 text-light w-100 bg-success"
                      value={product}
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        setProduct(selectedValue);
                        const selectedData = productData.find(data => data.id == selectedValue)
                        setSelectedTitle(selectedData ? selectedData.name : '');
                      }}>

                      {productData && productData.map(data => (
                        <option style={{ backgroundColor: "#fff", color: "#198754" }} key={data.id} value={data.id}>{data.name}</option>
                      ))}
                    </select>
                  </div>

                  <DropDown
                    key={3}
                    divClass=" mb-3 fielddrop"
                    state={plansName}
                    onChange={(e) => setPlansName(e.target.value)}
                    placeholder="Name Of Plan"
                    data={data2}
                    label="Name Of Land:"
                    lableClass="text-success"
                    type={3}
                  />

                  <TextInput
                    value={implant}
                    onChange={(e) => setImplant(e.target.value)}
                    type="date"
                    inputClass="mt-0 input-reduis"
                    label="Date of implant"
                    key={4}
                    divClass="fielddrop mb-3"
                  />
                  <TextArea
                    key={5}
                    value={productDes}
                    onChange={(e) => setProductDes(e.target.value)}
                    palce="Enter your text"
                    label="Description "
                    lableClass="text-success"
                    row={4}
                    height="100px"
                    inputClass=""
                  />

                  <div className="d-flex w-100 justify-content-evenly justify-content-md-start align-items-center">
                    <button type="submit" className="btn btn-success w-25">
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={backHandler}
                      className="btn btn-light border border-success text-success ms-2 cancel-button w-25 ms-3"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )
      }
    </>

  );
}

function AddNewTask({ onAddTask, employee, onDeleteTask, tasks, land, onBack }) {
  const newEmployee = employee;
  console.log(newEmployee)
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [task, setTask] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setendtDate] = useState("");
  const [taskDes, setTaskDes] = useState("");
  const [worker, setWorker] = useState(employee && employee.length > 0 ? employee[0].uuid : "");
  const [editObject, setEditObject] = useState("");
  const [username, setUserName] = useState(employee && employee.length > 0 ? employee[0].first_name : "")
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


  function handleEdit(object) {
    warningMessage(`Your are edditing the task ${object.title} !`);
    setEditObject(object);
    onDeleteTask(object.id);
    setTask(object.title);
    setStartDate(object.start_date);
    setendtDate(object.end_date);
    setSelectedRadio(object.priority);
    setWorker(object.employee + object.username);
    if (object.description === "none") {
      setTaskDes("");
    } else {
      setTaskDes(object.description);
    }
  }

  function handleSubmit(e) {

    e.preventDefault();
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
    if (!task) {
      errorMessage("Please enter your new task !");
      return;
    } else if (task.length < 5) {
      warningMessage(
        "Please enter a title with length more than 5 characters!"
      );
      return;
    } else if (!startDate) {
      errorMessage("Please select a start time !");
      return;
    } else if (isGreater(startDate, formattedDate) === false) {
      warningMessage("Please select an start time after today !");
      return;
    } else if (!endDate) {
      errorMessage("Please select a end time !");
      return;
    } else if (isGreater(endDate, startDate) === false) {
      warningMessage("Please select an end time after the start time !");
      return;
    } else if (!selectedRadio) {
      errorMessage("Please chose the priority of task!");
      return;
    } else if (!worker) {
      errorMessage("Please assign the task to an employee !");
      return;
    }

    let description = taskDes;
    if (!taskDes) {
      description = "none";
    }

    const newItem = {
      title: task,
      start_date: startDate,
      end_date: endDate,
      employee: worker,
      priority: selectedRadio,
      description: description,
      username: username

    };
    onAddTask(newItem);
    setTask("");
    setStartDate("");
    setendtDate("");
    setTaskDes("");

    if (editObject) {
      setEditObject("");
      successMessage("Edditing the task is done successfully!");

    } else {
      successMessage("New task is added completely.");
    }
  }

  function handleChange(id) {
    setSelectedRadio(id);

  }
  function handleRemove() {
    if (editObject) {
      onAddTask(editObject);
      setEditObject("");
      warningMessage("Edditing the task is cancelled!");
    } else {
      warningMessage("Addign new task is cancelled!");
    }
    setTask("");
    setStartDate("");
    setendtDate("");
    setTaskDes("");
    setSelectedRadio("");
    setWorker("");
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

  useEffect(() => {
    if (employee.length <= 0) {
      warningMessage("No employees available. Please add employees first.");
    }
  }, [])
  return (

    <>
      {windowWidth < 768 ? (
        <>
          <h5 className="my-3 mx-3">{editObject ? "Editting the task" : "Add New Task"}</h5>
          <div className="newProductglass" id="productglass">
            <form className="d-flex flex-column form-land" onSubmit={handleSubmit}>
              <Row>
                <Col xs={12} md={6}>
                  <TextInput
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    type="text"
                    palce="Enter your new task"
                    inputClass="mt-0 "
                    divClass="mb-3 input-reduis"
                    label={editObject ? "Edit Your Task" : "New Task"}
                    lableClass="add-task-product"
                  />
                  <TextInput
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    type="date"
                    divClass="mb-3 input-reduis"
                    inputClass="mt-0 "
                    label="Start"
                    lableClass="add-task-product"
                  />
                  <TextInput
                    value={endDate}
                    onChange={(e) => setendtDate(e.target.value)}
                    type="date"
                    divClass="mb-3 input-reduis"
                    inputClass="mt-0 "
                    label="End"
                    lableClass="add-task-product"
                  />
                </Col>
                <Col xs={12} md={6}>
                  <div className="mb-3">
                    <label style={{ marginBottom: "10px" }} className="text-success add-task-product">Assign To</label>
                    {<select
                      disabled={false}
                      className="p-2  text-light w-100 bg-success input-reduis"
                      placeholder="Assign To"
                      value={worker}
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        setWorker(selectedValue);
                        const selectedEmployee = newEmployee.find((data) => data.uuid === selectedValue);
                        setUserName(selectedEmployee ? selectedEmployee.username : '');
                      }}
                    >
                      {newEmployee && newEmployee.map(data => (
                        <option
                          className="bg-light text-success"
                          value={data.uuid}
                          key={data.uuid}
                        >
                          {data.first_name +
                            " " +
                            data.last_name +
                            " (" +
                            data.username +
                            ")"}

                        </option>
                      ))}

                    </select>}
                  </div>


                  <TextArea
                    value={taskDes}
                    onChange={(e) => setTaskDes(e.target.value)}
                    palce="Enter your text"
                    label="Description "
                    lableClass="text-success add-task-product"
                    row={4}
                    height="119px"
                  />
                </Col>
              </Row>
              <label className="mb-3 text-success" style={{ marginRight: "10px", width: "100%", textAlign: "100%" }}>Priority:</label>
              <div className="d-flex flex-row w-100 justify-content-start align-items-center mb-3">
                <Row>
                  {priorityData.map((radio, i) => (
                    <Col xs={6} lg={3}>
                      <Form.Check
                        className="mb-3 d-flex"
                        inline
                        value={selectedRadio}
                        defaultChecked={selectedRadio === radio.id}
                        onClick={() => handleChange(radio.id)}
                        label={radio.label}
                        name={radio.name}
                        type={radio.type}
                        id={radio.id}
                        key={i}
                      />
                    </Col>
                  ))}
                </Row>
              </div>
              <div className="btns-tasks-wrapper w-100 justify-content-center justify-content-md-start align-items-center mb-3 gap-3">
                <button type="submit" className="btn btn-success " style={{ width: "100%" }}>
                  {editObject ? "Edit" : "Add"}
                </button>
                <button
                  style={{ width: "100%" }}
                  type="button"
                  className="btn btn-light border border-success text-success  cancel-button"
                  onClick={handleRemove}
                >
                  {editObject ? "Cancel" : "Remove"}
                </button>
              </div>

              <TableTasks tasks={tasks}>
                {tasks.map((task, i) => (
                  <tr>
                    <td className="edit-remove">
                      <i
                        className="bi bi-pencil-square "
                        onClick={() => handleEdit(task)}
                      ></i>
                      <i
                        className="bi bi-trash3 "
                        onClick={() => onDeleteTask(task.id)}
                      ></i>
                    </td>
                    <td>{i + 1}</td>
                    <td>{task.title}</td>
                    <td>{task.start_date.split("-").join("/")}</td>
                    <td>{task.end_date.split("-").join("/")}</td>
                    <td>
                      {task.priority === "L"
                        ? "Low"
                        : task.priority === "M"
                          ? "Medium"
                          : task.priority === "H"
                            ? "High"
                            : "Emergency"}
                    </td>
                    <td>{task.username}</td>
                    <td>{task.description}</td>
                  </tr>
                ))}
              </TableTasks>
            </form>
          </div>
        </>) :

        (
          <>

            <div className="d-flex flex-column">
              <h5>{editObject ? "Editting the task" : "Add New Task"}</h5>
              <form className="d-flex flex-column" onSubmit={handleSubmit}>
                <Row>
                  <Col xs={12} md={6}>
                    <TextInput
                      value={task}
                      onChange={(e) => setTask(e.target.value)}
                      type="text"
                      palce="Enter your new task"
                      inputClass="mt-0 "
                      divClass="mb-3 input-reduis"
                      label={editObject ? "Edit Your Task" : "New Task"}
                    />
                    <TextInput
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      type="date"
                      divClass="mb-3 input-reduis"
                      inputClass="mt-0 "
                      label="Start"
                    />
                    <TextInput
                      value={endDate}
                      onChange={(e) => setendtDate(e.target.value)}
                      type="date"
                      divClass="mb-3 input-reduis"
                      inputClass="mt-0 "
                      label="End"
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <div className="mb-3">
                      <label className="text-success">Assign To</label>
                      {<select
                        disabled={false}
                        className="p-2 input-reduis  text-light w-100 bg-success"
                        placeholder="Assign To"
                        value={worker}
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          setWorker(selectedValue);
                          const selectedEmployee = newEmployee.find((data) => data.uuid === selectedValue);
                          setUserName(selectedEmployee ? selectedEmployee.username : '');
                        }}
                      >
                        {newEmployee && newEmployee.map(data => (
                          <option
                            className="bg-light text-success"
                            value={data.uuid}
                            key={data.uuid}
                          >
                            {data.first_name +
                              " " +
                              data.last_name +
                              " (" +
                              data.username +
                              ")"}

                          </option>
                        ))}

                      </select>}
                    </div>


                    <TextArea
                      value={taskDes}
                      onChange={(e) => setTaskDes(e.target.value)}
                      palce="Enter your text"
                      label="Description"
                      lableClass="text-success product-date"
                      row={4}
                      height="119px"
                    />
                  </Col>
                </Row>
                <div className="d-flex flex-row w-100 justify-content-start align-items-center mb-3">
                  <label className="text-success me-1">Priority:</label>
                  <Row>
                    {priorityData.map((radio, i) => (
                      <Col xs={6} lg={3}>
                        <Form.Check
                          className="mb-0"
                          inline
                          value={selectedRadio}
                          defaultChecked={selectedRadio === radio.id}
                          onClick={() => handleChange(radio.id)}
                          label={radio.label}
                          name={radio.name}
                          type={radio.type}
                          id={radio.id}
                          key={i}
                        />
                      </Col>
                    ))}
                  </Row>
                </div>
                <div className="d-flex w-100 justify-content-evenly justify-content-md-start align-items-center mb-3 gap-3">
                  <button type="submit" className="btn btn-success w-25">
                    {editObject ? "Edit" : "Add"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-light border border-success text-success ms-2 cancel-button w-25"
                    onClick={handleRemove}
                  >
                    {editObject ? "Cancel" : "Remove"}
                  </button>
                </div>
                <TableTasks tasks={tasks}>
                  {tasks.map((task, i) => (
                    <tr style={{ verticalAlign: "start" }}>
                      <td className="edit-remove">
                        <i
                          className="bi bi-pencil-square "
                          onClick={() => handleEdit(task)}
                        ></i>
                        <i
                          className="bi bi-trash3 "
                          onClick={() => onDeleteTask(task.id)}
                        ></i>
                      </td>
                      <td>{i + 1}</td>
                      <td>{task.title}</td>
                      <td>{task.start_date.split("-").join("/")}</td>
                      <td>{task.end_date.split("-").join("/")}</td>
                      <td>
                        {task.priority === "L"
                          ? "Low"
                          : task.priority === "M"
                            ? "Medium"
                            : task.priority === "H"
                              ? "High"
                              : "Emergency"}
                      </td>
                      <td>{task.username}</td>
                      <td>{task.description}</td>
                    </tr>
                  ))}
                </TableTasks>
              </form>
            </div>
          </>
        )
      }
    </>

  );
}
function TableTasks({ tasks, children }) {
  return (
    <>
      {tasks.length === 0 ? (
        <div className="table-parent w-100  border-prim2">
          <h4 className="header-task">All Task</h4>
          <div className="d-flex justify-content-center">
            <span>There is nothing to show.</span>
          </div>
        </div>
      ) : (
        <div className="table-container table-task border-prim2  w-100 mb-3">
          <Table className="table table-responsiv-custome  table-borderless tabscr">
            <thead>
              <tr>
                <th>Edit/Remove</th>
                <th>#</th>
                <th>Task</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Priority</th>
                <th>Employee</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>{children}</tbody>
          </Table>
        </div>
      )}
    </>
  );
}
export default AddProduct;
const priorityData = [
  { id: "L", name: "group1", label: "Low", type: "radio" },
  { id: "M", name: "group1", label: "Medium", type: "radio" },
  { id: "H", name: "group1", label: "High", type: "radio" },
  { id: "E", name: "group1", label: "Emergency", type: "radio" },
];

function errorMessage(text) {
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
function warningMessage(text) {
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
const isGreater = (firsrDate, secondDate) => {
  const fr = firsrDate.split("-").join("");
  const sc = secondDate.split("-").join("");
  if (fr >= sc) return true;
  else return false;
};





