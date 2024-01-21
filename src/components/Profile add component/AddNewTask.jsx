import TextInput from "../TextInput";
import TextArea from "../TextArea";
import LandTaskDrop from '../LandTaskDrop'
import ProductTaskDrop from '../ProductTaskDrop'
import { ToastContainer, toast } from "react-toastify";
import { Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import { IP } from "../../App";
import { useEffect, useState } from "react";


function AddNewTask({
  selectedTaskId,
  taskInfo,
  onChange,
  onAdd,
  onRemove,
  onEdit,
  lands,
  onBack,
  userInfo
}) {

  function handleSubmit(e) {
    e.preventDefault();
    if (selectedTaskId && selectedTaskId.type == "remove") {
      onRemove(taskInfo.uuid);
    } else {
      if (!taskInfo.land || taskInfo.land == "-1") {
        errorMessage("Please chose a Land!");
        return;
      } else if (!taskInfo.product || taskInfo.product == "-1") {
        errorMessage("Please chose a Product!");
        return;
      } else if (!taskInfo.title) {
        errorMessage("Please enter a Title for Task!");
        return;
      } else if (taskInfo.title.length < 5) {
        warningMessage(
          "Please enter a title with length more than 5 characters!"
        );
        return;
      } else if (!taskInfo.start_date) {
        errorMessage("Please select a Start Date!");
        return;
      } else if (!taskInfo.end_date) {
        errorMessage("Please select a End Date!");
        return;
      } else if (isGreater(taskInfo.end_date, taskInfo.start_date) === false) {
        warningMessage("Please select an End Date after the Start Date !");
        return;
      } else if (!taskInfo.priority) {
        errorMessage("Please chose the Priority of task!");
        return;
      }
      if (selectedTaskId && selectedTaskId.type == "edit") {
        onEdit(taskInfo);
      } else {
        onAdd(taskInfo);
      }
    }
  }
  function setTitle(title) {
    onChange((info) => ({ ...info, title: title }));
  }
  function setPriority(priority) {
    onChange((info) => ({ ...info, priority: priority }));
  }
  function setStatus(status) {
    onChange((info) => ({ ...info, status: status }));
  }

  const [products, setProducts] = useState()

  async function setLand(uuid) {
    if (uuid == -1) return;
    else onChange((info) => ({ ...info, land: uuid }
    ));

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
        setProduct(response.data[0].uuid)
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
    if (lands && lands[0]?.uuid) {
      setLand(lands[0].uuid);
    }
  }, [lands]);


  function setProduct(uuid) {
    if (uuid == -1) return;
    else onChange((info) => ({ ...info, product: uuid }));
  }

  function setStartDate(strDate) {
    onChange((info) => ({ ...info, start_date: strDate }));
  }
  function setEndDate(end) {
    onChange((info) => ({ ...info, end_date: end }));
  }
  function setTaskDes(des) {
    onChange((info) => ({ ...info, description: des }));
  }


  return (
    <div className="d-flex flex-column ">
      <div className="d-flex justify-content-center justify-content-md-start  py-3 mb-3 border-doubeled  ps-md-5 ps-lg-6">
        <h5 className="mt-0 color-primary2">
          {selectedTaskId && selectedTaskId.type === "edit"
            ? "Editting The Task"
            : selectedTaskId.type === "add"
              ? "Adding New Task"
              : "Removing The Task"}
        </h5>
      </div>
      {console.log(taskInfo)}
      <form className="d-flex flex-column" onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} md={6} className="px-4 px-md-5 px-lg-6">
            <LandTaskDrop
              key={3}
              divClass=" mb-3 "
              state={taskInfo.land}
              onChange={(e) => setLand(e.target.value)}
              placeholder="Name Of Plan"
              data={lands}
              label="Name Of Plan:"
              lableClass="text-success"
              type={3}
              disabled={selectedTaskId && selectedTaskId.type == "remove"}
            />
            <ProductTaskDrop
              key={2}
              divClass="mb-3 "
              state={taskInfo.product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="Choose Your Product"
              data={products}
              label="Choose Your Product:"
              lableClass={`${taskInfo.land !== "" ? `text-success` : `text-gray`
                }`}
              inputClass={`${taskInfo.land !== "" ? `bg-success` : `bg-gray`}`}
              type={2}
              disabled={
                selectedTaskId && selectedTaskId.type == "remove"
                  ? true
                  : taskInfo.land !== ""
                    ? false
                    : true
              }

            />
            <TextInput
              value={taskInfo.title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              palce="Enter your new task"
              inputClass="mt-0"
              divClass="mb-3"
              label="Task Name"
              disabled={selectedTaskId && selectedTaskId.type == "remove"}
            />
          </Col>
          <Col xs={12} md={6} className="px-4 px-md-5 px-lg-6">
            <TextInput
              value={taskInfo.start_date}
              onChange={(e) => setStartDate(e.target.value)}
              type="date"
              divClass="mb-3"
              inputClass="mt-0"
              label="Start"
              disabled={selectedTaskId && selectedTaskId.type == "remove"}
            />
            <TextInput
              value={taskInfo.end_date}
              onChange={(e) => setEndDate(e.target.value)}
              type="date"
              divClass="mb-3"
              inputClass="mt-0"
              label="End"
              disabled={selectedTaskId && selectedTaskId.type == "remove"}
            />
            <TextArea
              value={taskInfo.description}
              onChange={(e) => setTaskDes(e.target.value)}
              palce="Enter your text"
              label="Description"
              lableClass="text-success"
              row={4}
              height="50px"
              inputClass="area-height"
              disabled={selectedTaskId && selectedTaskId.type == "remove"}
            />
          </Col>
        </Row>
        <div className="d-flex flex-row w-100 justify-content-start align-items-center mb-3  ps-3 ps-md-4 ps-lg-5">
          <label className="text-success me-1">Priority:</label>

          <Row>
            {priorityData.map((radio, i) => (
              <Col xs={6} lg={3}>
                <Form.Check
                  className="mb-0 d-flex justify-content-around"
                  inline
                  value={taskInfo.priority}
                  defaultChecked={taskInfo.priority == radio.id}
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
        </div>
        {selectedTaskId && selectedTaskId.type !== "add" ? (
          <div className="d-flex flex-row w-100 justify-content-start align-items-center mb-3 ps-3 ps-md-4 ps-lg-5">
            <label className="text-success me-1">Status:</label>
            <Row>

              {statusData.map((radio, i) => (
                <Col xs={6} lg={3}>
                  <Form.Check
                    className="mb-0"
                    inline
                    value={taskInfo.status}
                    defaultChecked={taskInfo.status == radio.id}
                    onClick={() => setStatus(radio.id)}
                    label={radio.label}
                    name={radio.name}
                    type={radio.type}
                    id={radio.id}
                    key={i}
                    disabled={selectedTaskId && selectedTaskId.type == "remove"}
                  />
                </Col>
              ))}
            </Row>
          </div>
        ) : (
          <></>
        )}
        <div className="submit_button">
          {selectedTaskId && selectedTaskId.type === "remove" ? (
            <span className="text-danger">
              Are you sure to delete this task?
            </span>
          ) : selectedTaskId.type === "edit" ? (
            <span className="text-warning">
              Are you are sure to edit this task?
            </span>
          ) : (
            <></>
          )}
          <div className="buttons">
            <button
              type="submit"
              className={`btn  ${selectedTaskId && selectedTaskId.type === "remove"
                ? `btn-outline-danger`
                : selectedTaskId.type === "edit"
                  ? `btn-outline-warning`
                  : `btn-outline-success`
                }`}
            >
              {selectedTaskId && selectedTaskId.type === "add"
                ? "Add"
                : selectedTaskId.type === "edit"
                  ? "Edit"
                  : "Remove"}
            </button>
            <button
              type="button"
              className={`btn  cancel-button ${selectedTaskId && selectedTaskId.type === "remove"
                ? `btn-success`
                : selectedTaskId.type === "edit"
                  ? `btn-success`
                  : `btn-danger`
                }`}
              onClick={onBack}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddNewTask;
const isGreater = (firsrDate, secondDate) => {
  const fr = firsrDate.split("-").join("");
  const sc = secondDate.split("-").join("");
  if (fr >= sc) return true;
  else return false;
};
const priorityData = [
  { id: "L", name: "group1", label: "Low", type: "radio" },
  { id: "M", name: "group1", label: "Medium", type: "radio" },
  { id: "H", name: "group1", label: "High", type: "radio" },
  { id: "E", name: "group1", label: "Emergency", type: "radio" },
];
const statusData = [
  { id: "P", name: "group2", label: "Pending", type: "radio" },
  { id: "R", name: "group2", label: "Rejected", type: "radio" },
  { id: "C", name: "group2", label: "Completed", type: "radio" },
  { id: "A", name: "group2", label: "Approved", type: "radio" },
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
