import React, { useState, useEffect } from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from 'axios';
import { IP } from '../../App'
import { MdOutlineDoneOutline } from "react-icons/md";

export default function EmployeeTabShowTasks({ tasks, fetchTasks }) {



    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseModal = () => setShow(false)

    const [showStatusModal, setShowStatusModal] = useState(false);
    const [statusToChange, setStatusToChange] = useState(null);


    const handleSaveChangeStatus = async () => {

        const access = localStorage.getItem("access")

        const headers = {
            Authorization: `Bearer ${access}`
        };
        const body = {
            status: "C",
            uuid: statusToChange
        }
        try {
            const response = await axios.post(`${IP}/change-task-status/`, body, {
                headers,
            })

            if (response.status === 200) {
                console.log(response)
                fetchTasks()
                handleCloseStatusModal()
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
    const sendStatusHandler = (uuid) => {
        setStatusToChange(uuid);
        setShowStatusModal(true);
    };

    const handleCloseStatusModal = () => {
        setShowStatusModal(false);
        setStatusToChange(null);
    };


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='notif-modal'>Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are You Sure About the Registration Status ?</Modal.Body>
                <Modal.Footer>
                    <Button style={{ width: "100px" }} variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button style={{ width: "100px", backgroundColor: "#77AB56", border: 'none' }} variant="primary" onClick={handleCloseModal}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showStatusModal} onHide={handleCloseStatusModal}>
                <Modal.Header closeButton>
                    <Modal.Title className='notif-modal'>Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are You Sure to Change Status This Task ?</Modal.Body>
                <Modal.Footer>
                    <Button style={{ width: "100px" }} variant="secondary" onClick={handleCloseStatusModal}>
                        Close
                    </Button>
                    <Button style={{ width: "100px", backgroundColor: "#5DA25E", border: "none" }} variant="primary" onClick={handleSaveChangeStatus}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
            <TableTasks tasks={tasks}>
                {tasks.map((task, i) => (
                    <tr>

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
                        <td className="text-center" >
                            {task.remaining_days}
                            <span className="ms-2">Days</span>

                        </td>
                        <td className="text-center">
                            {task.status === "P" ? (
                                <i className="bi bi-exclamation-circle text-warning"></i>
                            ) : task.status === "R" ? (
                                <i className="bi bi-x-circle text-danger"></i>
                            ) : task.status === "C" ? (
                                <i className="bi bi-check-circle text-primary"></i>
                            ) : task.status === "A" ? (
                                <i className="bi bi-check-circle-fill text-success"></i>
                            ) : ""}
                        </td>
                        <td className="text-center">
                            {tasks[i].status === "P" ? (<Button
                                style={{ background: "#5DA25E", border: "none", outline: "none", fontSize: "13px" }}
                                className='appro-btn d-flex align-items-center'
                                onClick={() => {

                                    sendStatusHandler(tasks[i].uuid);
                                }}
                            >
                                Approve<MdOutlineDoneOutline
                                    style={{ fontSize: "18px", marginLeft: "5px" }} />
                            </Button>) : null}
                        </td>

                    </tr>

                ))}

            </TableTasks>
        </>

    );
}
function TableTasks({ tasks, children }) {


    return (
        <>
            {tasks.length === 0 ? (
                <div className="table-parent w-100  border-prim1 mt-3">
                    <h4 className="header-task">All Task</h4>
                    <div className="d-flex justify-content-center">
                        <span>There is nothing to show.</span>
                    </div>
                </div>
            ) : (
                <div className="table-container w-100" style={{ maxHeight: "500px", overflowY: "scroll" }}>
                    <table className="table-task-profile table ">
                        <thead>
                            <tr>
                                <th className="text-center">Task</th>
                                <th className="text-center">Land</th>
                                <th className="text-center">Product</th>
                                <th className="text-center">Priority</th>
                                <th className="text-center">Remaining Day</th>
                                <th className="text-center">Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>{children}</tbody>
                    </table>
                </div>
            )}
        </>
    );
}
