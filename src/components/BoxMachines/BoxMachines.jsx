import React, { useState, useEffect, useRef } from 'react'
import './BoxMachines.css'
import { IoCloseSharp } from "react-icons/io5";
import { FaArrowDown } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import DeleteModal from '../DeleteModal'
import { IP } from '../../App'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BoxMachines(props) {

  const [changedValues, setChangedValues] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [imgSrc, setImgSrc] = useState()
  const [vehicle, setVehicle] = useState(props.model ? props.model : "")
  const [staut, setstaut] = useState(props.status.length > 0 && props.status[0] ? props.status[0] : "")
  const [employeeName, setEmployeeName] = useState(props.employee.length > 0 && props.employee[0].uuid ? props.employee[0].uuid : "")
  const [plans, setPlans] = useState(props.land.length > 0 && props.land[0].uuid ? props.land[0].uuid : "")
  const [name, setName] = useState(props.name.length > 0 ? props.name[0].id : null)
  const [defaultStatus, setDefaultStatus] = useState(["IU", "A", "UM"])
  const [editInformation, setEditInformation] = useState(null)
  const [modalMessage, setModalMessage] = useState("");
  const [defaultImg, setDefaultImg] = useState()
  const [pdf, setPdf] = useState()
  const [newBox, setNewBox] = useState('src/Images/homePage/download.png')
  const messageEndRef = useRef(null);
  const handleClose = () => setShow(false);
  const handleShowDelete = () => setShowDeleteModal(true)
  const handleCloseDelete = () => setShowDeleteModal(false)

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

  const handleShow = (message) => {
    setShow(true);
    setModalMessage(message);
  };

  const deleteBoxHandler = async (uuid) => {

    const access = localStorage.getItem('access')

    const headers = {
      Authorization: `Bearer ${access}`
    };

    try {
      const response = await axios.delete(`${IP}/delete-tool/${uuid}`, {
        headers,
      })

      if (response.status === 200) {
        console.log(response)
        props.onDelete(uuid)
        setShowDeleteModal(false)
        successMessage("the deletion was successful")

      }

    } catch (e) {

      console.log(e)
      if (e.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh')
        window.location.href = "/login"
      }
      if (e.response.status === 500) {
        props.onDelete(uuid)
        setShowDeleteModal(false)
        successMessage("the deletion was successful")
      }

    }

  }


  const handleInputChange = (key, value) => {
    if (key === "image") {
      setImgSrc(value);
    }
    setChangedValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const sendEditHandler = async (uuid) => {
    if (!vehicle) {
      toast.error(`model is required`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }
    const access = localStorage.getItem('access')
    const formData = new FormData()
    Object.entries(changedValues).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append("uuid", uuid);
    formData.append("type", props.selectedTab)

    const headers = {
      Authorization: `Bearer ${access}`
    };


    try {
      const response = await axios.put(`${IP}/edit-tool/`, formData, {
        headers,
      })

      if (response.status === 200) {
        setEditMode(false)
        props.getAllBox()
        successMessage("Editing was done successfully");

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
  const toggleEditMode = () => {
    if (editMode) {

      sendEditHandler(props.uuid);

    } else if (props.isNew) {

      sendBoxHandler();
    }
    else {
      setEditMode(true)
      setEditInformation(props.example)
    }
  };

  const validateInputs = () => {
    const requiredInputs = ["model", "image", "manual"];

    for (const input of requiredInputs) {
      if (!changedValues[input]) {
        toast.error(`${input.charAt(0).toUpperCase() + input.slice(1)} is required`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return false;
      }
    }

    return true;
  };

  
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 968 && window.innerWidth >= 653);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const sendBoxHandler = async () => {

    if (!validateInputs()) {
      return;
    }

    const access = localStorage.getItem('access')
    const formData = new FormData()
    formData.append("type", props.selectedTab)
    formData.append("name", name)
    formData.append("model", vehicle)
    formData.append("status", staut)
    formData.append("manual", pdf)
    formData.append("image", imgSrc)
    formData.append("land", plans)
    formData.append("employee", employeeName)

    const headers = {
      Authorization: `Bearer ${access}`
    };
    try {
      const response = await axios.post(`${IP}/add-tool/`, formData, {
        headers,
      })

      if (response.status === 201) {
        props.getAllBox()
        setEditMode(false)
        successMessage("Box was added successfully");
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

  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [])

  useEffect(() => {
    const isEmptyEmployee = !props.employee || props.employee.length === 0;
    const isEmptyLand = !props.land || props.land.length === 0;

    if (isEmptyEmployee && isEmptyLand) {
      toast.warning(`Dropdowns 'Employee' and 'Land' are empty`, {
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
  }, [props.employee, props.land]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='notif-modal'>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button
            style={{ width: "100px", backgroundColor: "#5da25e", border: "none", outline: "none" }}
            variant="primary"
            onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      <DeleteModal show={showDeleteModal} handleClose={handleCloseDelete} handleDeleteClose={() => deleteBoxHandler(props.uuid)} />
      <div className="boxMachines-wrapper">
        <div className='closeMachine d-flex justify-content-between' style={{ textAlign: "right", padding: "3px 20px" }}>
          <button style={{ color: "#fff" }}
            className='edit-btn-machine'
            onClick={toggleEditMode}>
            {editMode ? "save" : props.isNew && props.index === props.newBoxIndex ? 'Send' : 'Edit'} {props.isNew && props.index === props.newBoxIndex ? "" : <MdEdit />}
          </button> <IoCloseSharp className='delete-box' onClick={handleShowDelete} style={{ color: "black", cursor: "pointer" }} /></div>
        {isSmallScreen ? (
          <>
            <div className="machine-content2">
              <div className="machines-img">
                <img
                  src={defaultImg ? defaultImg : props.isNew ? newBox : (props.image ? `${IP}${props.image}` : "")}
                  alt=""
                  onError={(event) => { event.target.src = imgSrc }} />
                <label htmlFor={`input-file-${props.id}`}></label>
                <input className='upload-machines input-machine'
                  type="file"
                  onChange={(e) => {
                    setImgSrc(e.target.files[0]);
                    setDefaultImg(URL.createObjectURL(e.target.files[0]))
                    handleInputChange('image', e.target.files[0]);
                  }}
                  accept='image/jpeg, image/png, image/jpg'
                  id={`input-file-${props.id}`}
                  disabled={!(editMode || props.isNew)} />
              </div>
              <div className="input-machine-container">
                <div className="machine-top">
                  <div className={`dropdown-machine machinInput ${editMode ? 'editable' : ''}`}>
                    <select
                      className='select'
                      name="machine"
                      id="machine"
                      disabled={!(editMode || props.isNew)}
                      value={name}
                      onChange={(e) => { setName(e.target.value); handleInputChange("name", e.target.value) }}>
                      <option style={{ color: "#5DA25E" }} value="name" disabled="disabled">Name</option>

                      {editInformation ? (
                        <>
                          {editInformation.tools.map((item, i) => (
                            <option style={{ color: "#5DA25E" }} key={i} value={item.id}>{item.name}</option>

                          ))}
                        </>) :
                        (<>
                          {props.name && props.name.length > 0 ? (
                            props.name.map(name => (
                              <option style={{ color: "#5DA25E" }} value={name.id}>{name.name}</option>
                            ))
                          ) : (<>
                            <option style={{ color: "#5DA25E" }} ></option>
                          </>)}

                        </>)}

                    </select>
                  </div>
                  <div className='inputWrapper machinInput'>
                    <input value={vehicle}
                      type="text"
                      onChange={(e) => {
                        setVehicle(e.target.value);
                        handleInputChange("model", e.target.value)
                      }}
                      placeholder='Vehicle Modale'
                      className='vehicle input-machine'
                      disabled={!(editMode || props.isNew)} />
                  </div>
                  <div className={`dropdown-machine machinInput ${editMode ? 'editable' : ''}`}>
                    <select
                      className='select'
                      value={employeeName}
                      name="machine" id="machine"
                      disabled={!(editMode || props.isNew)}
                      onChange={(e) => {
                        setEmployeeName(e.target.value);
                        handleInputChange("employee", e.target.value)
                      }}>
                      <option style={{ color: "#5DA25E" }} value="name" disabled="disabled" selected="selected">Employer Name</option>
                      {editInformation ? (
                        <>
                          {editInformation.employee.map((item, i) => (
                            <option style={{ color: "#5DA25E" }} key={i} value={item.uuid}>{item.username}</option>
                          ))}
                        </>) :
                        (<>
                          {props.employee && props.employee.length > 0 ? (props.employee.map((employee, i) => (
                            <option style={{ color: "#5DA25E" }} key={i} value={employee.uuid}>{employee.username}</option>
                          ))) : (<>
                            <option style={{ color: "#5DA25E" }} ></option>
                          </>)}
                        </>)}

                    </select>
                  </div>
                  {!(editMode || props.isNew) ?

                    (<>
                      <div className="machines-pdf machinInput">
                        <label style={{ borderRadius: "5px", position: "relative" }} htmlFor="input-file" className='lable-pdf'>
                          PDF <FaArrowDown />
                          <a className='pdfDown' href={`${IP}${props.manual}`} target='blank' download></a>
                        </label>
                      </div>
                    </>) :
                    (<>
                      <div className="machines-pdf machinInput">
                        <label style={{ borderRadius: "5px" }} htmlFor="input-file" className='lable-pdf'>
                          PDF <FaArrowDown />
                          <input
                            onChange={(e) => {
                              setPdf(e.target.files[0]);
                              handleInputChange("manual", e.target.files[0])
                            }}
                            className='upload-pdf input-machine'
                            type="file"
                            id='input-file'
                            disabled={!(editMode || props.isNew)} />
                        </label>
                      </div>
                    </>)}
                </div>
                <div className="machine-bottom">
                  <div className={`dropdown-machine machinInput ${editMode ? 'editable' : ''}`}>
                    <select className='select' value={plans} name="machine" id="machine" disabled={!(editMode || props.isNew)}
                      onChange={(e) => {
                        setPlans(e.target.value);
                        handleInputChange("land", e.target.value)
                      }}>
                      <option style={{ color: "#5DA25E" }} value="name" disabled="disabled" selected="selected">Plans</option>
                      {editInformation ? (
                        <>
                          {editInformation.lands.map((item, i) => (
                            <option key={i} value={item.uuid}>{item.name}</option>
                          ))}
                        </>) :
                        (<>
                          {props.land && props.land.length > 0 ? (
                            props.land.map((land, i) => (
                              <option style={{ color: "#5DA25E" }} key={i} value={land.uuid}>{land.name}</option>
                            ))
                          ) : (<>
                            <option style={{ color: "#5DA25E" }} ></option>
                          </>)}

                        </>)}
                    </select>
                  </div>
                  <div className={`inputWrapper machinInput machine-time-dropDoawn ${editMode ? 'editable' : ''}`}>
                    <select className='select' value={staut} name="machine" id="machine" disabled={!(editMode || props.isNew)}
                      onChange={(e) => {
                        setstaut(e.target.value);
                        handleInputChange("status", e.target.value)
                      }}>
                      <option value="name" disabled="disabled" selected="selected">status</option>
                      {editInformation ? (
                        <>
                          {defaultStatus.map((status, i) => (
                            <option
                              style={{ color: "#5DA25E" }}
                              key={i}
                              value={status}>
                              {status === "A" ? "Available" : status === "IU" ? "In Use" : "Under Maintenance"}
                            </option>
                          ))}
                        </>) :
                        (<>

                          {props.status.map((status, i) => (
                            <option
                              style={{ color: "#5DA25E" }}
                              key={i}
                              value={status}>
                              {status === "A" ? "Available" : status === "IU" ? "In Use" : "Under Maintenance"}
                            </option>
                          ))}
                        </>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </>

        ) : (
          <>
            <div className="machine-content">
              <div className="machines-img">
                <img
                  src={defaultImg ? defaultImg : props.isNew ? newBox : (props.image ? `${IP}${props.image}` : "")}
                  alt=""
                  onError={(event) => { event.target.src = imgSrc }} />
                <label htmlFor={`input-file-${props.id}`}></label>
                <input
                  className='upload-machines input-machine'
                  type="file"
                  onChange={(e) => {
                    setImgSrc(e.target.files[0]);
                    setDefaultImg(URL.createObjectURL(e.target.files[0]))
                    handleInputChange('image', e.target.files[0]);
                  }}
                  accept='image/jpeg, image/png, image/jpg'
                  id={`input-file-${props.id}`}
                  disabled={!(editMode || props.isNew)} />
              </div>

              <div className={`dropdown-machine machinInput ${editMode ? 'editable' : ''}`}>
                <select
                  className='select'
                  name="machine"
                  id="machine"
                  disabled={!(editMode || props.isNew)}
                  value={name}
                  onChange={(e) => { setName(e.target.value); handleInputChange("name", e.target.value) }}>
                  <option style={{ color: "#5DA25E" }} value="name" disabled="disabled">Name</option>

                  {editInformation ? (
                    <>
                      {editInformation.tools.map((item, i) => (
                        <option style={{ color: "#5DA25E" }} key={i} value={item.id}>{item.name}</option>
                      ))}
                    </>) :
                    (<>
                      {props.name && props.name.length > 0 ? (
                        props.name.map(name => (
                          <option style={{ color: "#5DA25E" }} value={name.id}>{name.name}</option>
                        ))
                      ) : (<>
                        <option style={{ color: "#5DA25E" }} ></option>
                      </>)}

                    </>)}

                </select>
              </div>
              <div className='inputWrapper machinInput'>
                <input
                  value={vehicle}
                  type="text"
                  onChange={(e) => {
                    setVehicle(e.target.value);
                    handleInputChange("model", e.target.value)
                  }}
                  placeholder='Vehicle Modale'
                  className='vehicle input-machine'
                  disabled={!(editMode || props.isNew)} />
              </div>
              <div className={`dropdown-machine machinInput ${editMode ? 'editable' : ''}`}>
                <select
                  className='select'
                  value={employeeName}
                  name="machine" id="machine"
                  disabled={!(editMode || props.isNew)}
                  onChange={(e) => {
                    setEmployeeName(e.target.value);
                    handleInputChange("employee", e.target.value)
                  }}>
                  <option style={{ color: "#5DA25E" }} value="name" disabled="disabled" selected="selected">Employer Name</option>
                  {editInformation ? (
                    <>
                      {editInformation.employee.map((item, i) => (
                        <option style={{ color: "#5DA25E" }} key={i} value={item.uuid}>{item.username}</option>
                      ))}
                    </>) :
                    (<>
                      {props.employee && props.employee.length > 0 ? (props.employee.map((employee, i) => (
                        <option style={{ color: "#5DA25E" }} key={i} value={employee.uuid}>{employee.username}</option>
                      ))) : (<>
                        <option style={{ color: "#5DA25E" }} ></option>
                      </>)}

                    </>)}

                </select>
              </div>
              <div className={`dropdown-machine machinInput plans ${editMode ? 'editable' : ''}`}>
                <select value={plans}
                  className='select'
                  name="machine"
                  id="machine"
                  disabled={!(editMode || props.isNew)}
                  onChange={(e) => {
                    setPlans(e.target.value);
                    handleInputChange("land", e.target.value)
                  }}>
                  <option style={{ color: "#5DA25E" }} value="name" disabled="disabled" selected="selected">Plans</option>
                  {editInformation ? (
                    <>
                      {editInformation.lands.map((item, i) => (
                        <option key={i} value={item.uuid}>{item.name}</option>
                      ))}
                    </>) :
                    (<>
                      {props.land && props.land.length > 0 ? (
                        props.land.map((land, i) => (
                          <option style={{ color: "#5DA25E" }} key={i} value={land.uuid}>{land.name}</option>
                        ))
                      ) : (<>
                        <option style={{ color: "#5DA25E" }} ></option>
                      </>)}

                    </>)}

                </select>
              </div>
              <div className={`inputWrapper machinInput machine-time-dropDoawn ${editMode ? 'editable' : ''}`}>
                <select
                  className='select'
                  value={staut}
                  name="machine"
                  id="machine"
                  disabled={!(editMode || props.isNew)}
                  onChange={(e) => {
                    setstaut(e.target.value);
                    handleInputChange("status", e.target.value)
                  }}>
                  <option style={{ color: "#5DA25E" }} value="name" disabled="disabled" selected="selected">Staus</option>
                  {editInformation ? (
                    <>
                      {defaultStatus.map((status, i) => (
                        <option
                          style={{ color: "#5DA25E" }}
                          key={i}
                          value={status}>
                          {status === "A" ? "Available" : status === "IU" ? "In Use" : "Under Maintenance"}
                        </option>
                      ))}
                    </>) :
                    (<>

                      {props.status.map((status, i) => (
                        <option
                          style={{ color: "#5DA25E" }}
                          key={i}
                          value={status}>
                          {status === "A" ? "Available" : status === "IU" ? "In Use" : "Under Maintenance"}
                        </option>
                      ))}
                    </>)}

                </select>
              </div>
              {!(editMode || props.isNew) ? (
                <div className="machines-pdf machinInput">
                  <label
                    style={{ borderRadius: "5px", height: "100%", width: "57px", position: "relative" }}
                    htmlFor="input-file"
                    className='lable-pdf'>
                    PDF <FaArrowDown />
                    <a className='pdfDown' href={`${IP}${props.manual}`} target='blank' download></a>
                  </label>
                </div>
              ) : (
                <div className="machines-pdf machinInput">
                  <label style={{ borderRadius: "5px" }} htmlFor="input-file" className='lable-pdf'>
                    PDF <FaArrowDown />
                    <input
                      className='upload-pdf input-machine'
                      type="file" id='input-file'
                      disabled={!(editMode || props.isNew)}
                      onChange={(e) => {
                        setPdf(e.target.files[0]);
                        handleInputChange("manual", e.target.files[0])
                      }} />
                  </label>
                </div>
              )}
            </div>
          </>
        )}

      </div>
      <div ref={messageEndRef} />
    </>
  )
}


{/* <>
  <div className="machines-img">
    <img
      src={defaultImg ? defaultImg : props.isNew ? newBox : (props.image ? `${IP}${props.image}` : "")}
      alt=""
      onError={(event) => { event.target.src = imgSrc }} />
    <label htmlFor={`input-file-${props.id}`}></label>
    <input className='upload-machines input-machine'
      type="file"
      onChange={(e) => {
        setImgSrc(e.target.files[0]);
        setDefaultImg(URL.createObjectURL(e.target.files[0]))
        handleInputChange('image', e.target.files[0]);
      }}
      accept='image/jpeg, image/png, image/jpg'
      id={`input-file-${props.id}`}
      disabled={!(editMode || props.isNew)} />
  </div>


  <div className="machines-img">
    <img
      src={defaultImg ? defaultImg : props.isNew ? newBox : (props.image ? `${IP}${props.image}` : "")}
      alt=""
      onError={(event) => { event.target.src = imgSrc }} />
    <label htmlFor={`input-file-${props.id}`}></label>
    <input
      className='upload-machines input-machine'
      type="file"
      onChange={(e) => {
        setImgSrc(e.target.files[0]);
        setDefaultImg(URL.createObjectURL(e.target.files[0]))
        handleInputChange('image', e.target.files[0]);
      }}
      accept='image/jpeg, image/png, image/jpg'
      id={`input-file-${props.id}`}
      disabled={!(editMode || props.isNew)} />
  </div>
</> */}
