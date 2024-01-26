import { IP } from '../../App'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdOutlineDoneOutline } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import FilterP from './FilterP'
import FilterL from '../FilterL';
export function TabShowTasks({ tasks, onEditTask, onDeleteTask, fetchTasks, main }) {

  const [show, setShow] = useState(false);
  const [selectedTaskUuid, setSelectedTaskUuid] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusToChange, setStatusToChange] = useState(null);
  const [disabledButtons, setDisabledButtons] = useState({})

  const [status, setStatus] = useState("All")
  const [statusL, setStatusL] = useState("All")


  const handleFilterItem = (priority) => {
    setStatus(priority)
    setStatusL(null)
  }
  const handleFilterItemL = (land) => {
    setStatusL(land)
    setStatus(null)
  }

  const handleClose = () => {
    setShow(false);
    setSelectedTaskUuid(null);
  };
  const handleShow = (uuid) => {
    setSelectedTaskUuid(uuid);
    setShow(true);
  };

  const handleSaveChanges = () => {

    onDeleteTask(selectedTaskUuid);
    handleClose();
  };

  const handleSaveChangeStatus = async () => {
    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`,
    };

    const body = {
      status: "A",
      uuid: statusToChange
    }
    try {
      const response = await axios.post(`${IP}/change-task-status/`, body, {
        headers,
      });
      if (response.status === 200) {
        fetchTasks()
        handleCloseStatusModal()
        setDisabledButtons((prevDisabledButtons) => ({
          ...prevDisabledButtons,
          [statusToChange]: true,
        }));
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

  const sendStatusHandler = (uuid) => {
    setStatusToChange(uuid);
    setShowStatusModal(true);
  };

  const handleCloseStatusModal = () => {
    setShowStatusModal(false);
    setStatusToChange(null);
  };

  useEffect(() => {
    const storedDisabledButtons = JSON.parse(localStorage.getItem('disabledButtons')) || {};
    setDisabledButtons(storedDisabledButtons);
  }, []);


  useEffect(() => {
    localStorage.setItem('disabledButtons', JSON.stringify(disabledButtons));
  }, [disabledButtons]);



  return (

    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='notif-modal'>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You Sure ?</Modal.Body>
        <Modal.Footer>
          <Button style={{ width: "100px" }} variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button style={{ width: "100px", backgroundColor: "#5DA25E", border: "none" }} variant="primary" onClick={handleSaveChanges}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showStatusModal} onHide={handleCloseStatusModal}>
        <Modal.Header closeButton>
          <Modal.Title className='notif-modal'>Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You Sure ?</Modal.Body>
        <Modal.Footer>
          <Button style={{ width: "100px" }} variant="secondary" onClick={handleCloseStatusModal}>
            Close
          </Button>
          <Button style={{ width: "100px", backgroundColor: "#5DA25E", border: "none" }} variant="primary" onClick={handleSaveChangeStatus}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <TableTasks
        tasks={tasks}
        main={main}
        handleFilterItem={handleFilterItem}
        handleFilterItemL={handleFilterItemL}>


        {tasks && tasks.filter(task => task.priority === status).map((task, i) => (
          <tr>
            {
              main !== "false" &&
              <> <td className="text-center table-remove" onClick={() => handleShow(task.uuid)}>
                <i
                  className="bi bi-trash3 "

                ></i>
              </td>
                <td className="text-center table-edit" >
                  <i
                    className="bi bi-pencil-square "
                    onClick={() => onEditTask(task.uuid)}
                  ></i>
                </td></>
            }

            {
              main === "false" &&
              <td className="text-center">{task.employee.first_name} {task.employee.last_name}</td>
            }

            <td className="text-center">{task.title}</td>
            <td className="text-center">{task.land.title}</td>
            <td className="text-center">{task.product.name}</td>
            <td className="text-center">
              {task.priority === "L"
                ? "Low"
                : task.priority === "M"
                  ? "Medium"
                  : task.priority === "H"
                    ? "High"
                    : "Emergency"}
            </td>

            <td className="text-center tdsta" style={{ borderRight: "none !important" }}>
              {task.remaining_days}
              <span span className="ms-2" > Days</span>

            </td>
            <td style={{ textAlign: "center" }}>
              {task.status === "P" ? (
                <i className="bi bi-exclamation-circle text-warning"></i>
              ) : task.status === "R" ? (
                <i className="bi bi-x-circle text-danger"></i>
              ) : task.status === "C" ? (
                <i className="bi bi-check-circle text-primary"></i>
              ) : (
                <i className="bi bi-check-circle-fill text-success"></i>
              )}

            </td>

            {
              main !== "false" &&
              <td className="text-center">
                {tasks[i].status === "C" ? (<Button
                  style={{ background: "#5DA25E", border: "none", outline: "none", fontSize: "13px" }}
                  className='appro-btn d-flex align-items-center'
                  onClick={() => {

                    sendStatusHandler(tasks[i].uuid);
                  }}
                >
                  Confirm<MdOutlineDoneOutline
                    style={{ fontSize: "18px", marginLeft: "5px" }} />
                </Button>) : null}

              </td>
            }
            <td>
              {task.description}
            </td>
          </tr>

        ))}

        {tasks && tasks.filter(task => task.land.title === statusL).map((task, i) => (
          <tr>
            {
              main !== "false" &&
              <> <td className="text-center table-remove" onClick={() => handleShow(task.uuid)}>
                <i
                  className="bi bi-trash3 "

                ></i>
              </td>
                <td className="text-center table-edit" >
                  <i
                    className="bi bi-pencil-square "
                    onClick={() => onEditTask(task.uuid)}
                  ></i>
                </td></>
            }

            {
              main === "false" &&
              <td className="text-center">{task.employee.first_name} {task.employee.last_name}</td>
            }

            <td className="text-center">{task.title}</td>
            <td className="text-center">{task.land.title}</td>
            <td className="text-center">{task.product.name}</td>
            <td className="text-center">
              {task.priority === "L"
                ? "Low"
                : task.priority === "M"
                  ? "Medium"
                  : task.priority === "H"
                    ? "High"
                    : "Emergency"}
            </td>

            <td className="text-center tdsta" style={{ borderRight: "none !important" }}>
              {task.remaining_days}
              <span span className="ms-2" > Days</span>

            </td>
            <td style={{ textAlign: "center" }}>
              {task.status === "P" ? (
                <i className="bi bi-exclamation-circle text-warning"></i>
              ) : task.status === "R" ? (
                <i className="bi bi-x-circle text-danger"></i>
              ) : task.status === "C" ? (
                <i className="bi bi-check-circle text-primary"></i>
              ) : (
                <i className="bi bi-check-circle-fill text-success"></i>
              )}

            </td>

            {
              main !== "false" &&
              <td className="text-center">
                {tasks[i].status === "C" ? (<Button
                  style={{ background: "#5DA25E", border: "none", outline: "none", fontSize: "13px" }}
                  className='appro-btn d-flex align-items-center'
                  onClick={() => {

                    sendStatusHandler(tasks[i].uuid);
                  }}
                >
                  Confirm<MdOutlineDoneOutline
                    style={{ fontSize: "18px", marginLeft: "5px" }} />
                </Button>) : null}

              </td>
            }
            <td>
              {task.description}
            </td>
          </tr>

        ))}

        {status === "All" || statusL === "All" ? tasks.map((task, i) => (
          <tr>

            {
              main !== "false" &&
              <> <td className="text-center table-remove" onClick={() => handleShow(task.uuid)}>
                <i
                  className="bi bi-trash3 "

                ></i>
              </td>
                <td className="text-center table-edit" >
                  <i
                    className="bi bi-pencil-square "
                    onClick={() => onEditTask(task.uuid)}
                  ></i>
                </td></>
            }

            {
              main === "false" &&
              <td className="text-center">{task.employee.first_name} {task.employee.last_name}</td>
            }

            <td className="text-center">{task.title}</td>
            <td className="text-center">{task.land.title}</td>
            <td className="text-center">{task.product.name}</td>
            <td className="text-center">
              {task.priority === "L"
                ? "Low"
                : task.priority === "M"
                  ? "Medium"
                  : task.priority === "H"
                    ? "High"
                    : "Emergency"}
            </td>

            <td className="text-center tdsta" style={{ borderRight: "none !important" }}>
              {task.remaining_days}
              <span span className="ms-2" > Days</span>

            </td>
            <td style={{ textAlign: "center" }}>
              {task.status === "P" ? (
                <i className="bi bi-exclamation-circle text-warning"></i>
              ) : task.status === "R" ? (
                <i className="bi bi-x-circle text-danger"></i>
              ) : task.status === "C" ? (
                <i className="bi bi-check-circle text-primary"></i>
              ) : (
                <i className="bi bi-check-circle-fill text-success"></i>
              )}

            </td>
            {
              main !== "false" &&
              <td className="text-center">
                {tasks[i].status === "C" ? (<Button
                  style={{ background: "#5DA25E", border: "none", outline: "none", fontSize: "13px" }}
                  className='appro-btn d-flex align-items-center'
                  onClick={() => {

                    sendStatusHandler(tasks[i].uuid);
                  }}
                >
                  Confirm<MdOutlineDoneOutline
                    style={{ fontSize: "18px", marginLeft: "5px" }} />
                </Button>) : null}

              </td>
            }

            <td>{task.description}</td>
          </tr>

        )) : <></>}



      </TableTasks >
    </>

  );
}
function TableTasks({ tasks, children, main, handleFilterItem, handleFilterItemL }) {
  return (
    <>
      {tasks && tasks.length === 0 ? (
        <div className="table-parent w-100 border-prim1 mt-3">
          <h4 className="header-task">All Machines</h4>
          <div className="d-flex justify-content-center">
            <span>There is nothing to show.</span>
          </div>
        </div>
      ) : (
        <div style={{ maxHeight: "500px", overflowY: "scroll" }} className="table-container w-100">
          <table className="table-task-profile table ">
            <thead>
              <tr>
                {
                  main !== "false" &&
                  <><th className="text-center">Remove</th>
                    <th className="text-center">Edit</th>
                  </>
                }

                {
                  main === "false" &&
                  <th className="text-center">Employee</th>
                }

                <th className="text-center">Task</th>
                <th
                  style={{ textAlign: "center", position: "relative" }}
                  className={main === "false" ? "fa-angle" : ""}>
                  {main === "false" ? <FilterL handleFilterItemL={handleFilterItemL} /> : "Land"}
                </th>
                <th className="text-center">Product</th>
                <th
                  style={{ textAlign: "center", position: "relative" }}
                  className={main === "false" ? "fa-angle" : ""}>
                  {main === "false" ? <FilterP handleFilterItem={handleFilterItem} /> : " Priority"}</th>
                <th className="text-center">Remaining Day</th>

                <th className="text-center">Status</th>
                {
                  main !== "false" &&
                  <th>
                    Actions
                  </th>
                }

                <th>description</th>
              </tr>
            </thead>
            <tbody>{children}</tbody>
          </table>
        </div>
      )}
    </>
  );
}

//   tasks && statusL === "all" && tasks.map((task, i) => (
//     <tr>
//       {
//         main !== "false" &&
//         <> <td className="text-center table-remove" onClick={() => handleShow(task.uuid)}>
//           <i
//             className="bi bi-trash3 "

//           ></i>
//         </td>
//           <td className="text-center table-edit" >
//             <i
//               className="bi bi-pencil-square "
//               onClick={() => onEditTask(task.uuid)}
//             ></i>
//           </td></>
//       }

//       {
//         main === "false" &&
//         <td className="text-center">{task.employee.first_name} {task.employee.last_name}</td>
//       }

//       <td className="text-center">{task.title}</td>
//       <td className="text-center">{task.land.title}</td>
//       <td className="text-center">{task.product.name}</td>
//       <td className="text-center">
//         {task.priority === "L"
//           ? "Low"
//           : task.priority === "M"
//             ? "Medium"
//             : task.priority === "H"
//               ? "High"
//               : "Emergency"}
//       </td>

//       <td className="text-center tdsta" style={{ borderRight: "none !important" }}>
//         {task.remaining_days}
//         <span span className="ms-2" > Days</span>

//       </td>
//       <td style={{ textAlign: "center" }}>
//         {task.status === "P" ? (
//           <i className="bi bi-exclamation-circle text-warning"></i>
//         ) : task.status === "R" ? (
//           <i className="bi bi-x-circle text-danger"></i>
//         ) : task.status === "C" ? (
//           <i className="bi bi-check-circle text-primary"></i>
//         ) : (
//           <i className="bi bi-check-circle-fill text-success"></i>
//         )}

//       </td>

//       <td className="text-center">
//         {tasks[i].status === "C" ? (<Button
//           style={{ background: "#5DA25E", border: "none", outline: "none", fontSize: "13px" }}
//           className='appro-btn d-flex align-items-center'
//           onClick={() => {

//             sendStatusHandler(tasks[i].uuid);
//           }}
//         >
//           Confirm<MdOutlineDoneOutline
//             style={{ fontSize: "18px", marginLeft: "5px" }} />
//         </Button>) : null}

//       </td>
//       <td>{task.description}</td>
//     </tr>

//   ))
// } 