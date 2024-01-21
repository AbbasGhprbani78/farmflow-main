import StarRating from "../StartRating";
import TextInput from "../TextInput";
import TextArea from "../TextArea";
import DropDown from "../DropDown";
import { ToastContainer, toast } from "react-toastify";
import { Row, Col } from "react-bootstrap";
function AddPoints({
  pointInfo,
  selectedPointId,
  onChange,
  onAdd,
  onRemove,
  onEdit,
  onBack,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    if (selectedPointId && selectedPointId.type == "remove") {
      onRemove(pointInfo.uuid);
    } else {
      if (!pointInfo.type || pointInfo.type == "-1") {
        errorMessage("Please chose a Type!");
        return;
      } else if (!pointInfo.date) {
        errorMessage("Please select a Date!");
        return;
      } else if (pointInfo.rating == "0") {
        errorMessage("Please set a Rate!");
        return;
      }
      if (selectedPointId && selectedPointId.type == "edit") {
        onEdit(pointInfo);
      } else {
        onAdd(pointInfo);
      }
    }
  }
  function setType(type) {
    if (type == -1) return;
    onChange((info) => ({ ...info, type: type }));
  }
  function setRating(rate) {
    onChange((info) => ({ ...info, rating: rate }));
  }
  function setTaskDes(des) {
    onChange((info) => ({ ...info, description: des }));
  }
  function setDate(date) {
    onChange((info) => ({ ...info, date: date }));
  }
  console.log(pointInfo);
  return (
    <div className="d-flex flex-column ">
      <div className="d-flex justify-content-center justify-content-md-start  py-3 mb-3 border-doubeled  ps-md-5 ps-lg-6">
        <h5 className="mt-0 color-primary2">
          {selectedPointId && selectedPointId.type === "edit"
            ? "Editting The Point"
            : selectedPointId.type === "add"
            ? "Adding New Point"
            : "Removing The Point"}
        </h5>
      </div>
      <form onSubmit={handleSubmit} className="d-flex flex-column">
        <Row>
          <Col xs={12} md={6} className="px-4 px-md-5 px-lg-6">
            <DropDown
              key={4}
              divClass=" mb-3 "
              state={pointInfo.type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Type Of Point"
              data={pointData}
              label="Type Of Point:"
              lableClass="text-success"
              type={4}
              disabled={selectedPointId && selectedPointId.type == "remove"}
            />
            <TextInput
              value={pointInfo.date.substring(0, 7)}
              onChange={(e) => setDate(e.target.value)}
              type="month"
              divClass="mb-3"
              inputClass="mt-0"
              label="Month/Year:"
              disabled={selectedPointId && selectedPointId.type == "remove"}
            />
          </Col>
          <Col xs={12} md={6} className="px-4 px-md-5 px-lg-6">
            <div className="d-flex flex-column mb-3 w-100">
              <label className="text-success">Rating:</label>
              <StarRating
                size={40}
                defaultRating={pointInfo.rating}
                onSetRating={setRating}
              />
            </div>
            <TextArea
              value={pointInfo.description}
              onChange={(e) => setTaskDes(e.target.value)}
              palce="Enter your text"
              label="Description:"
              lableClass="text-success"
              row={4}
              height="50px"
              inputClass="area-height"
              disabled={selectedPointId && selectedPointId.type == "remove"}
            />
          </Col>
        </Row>
        <div className="submit_button">
          {selectedPointId && selectedPointId.type === "remove" ? (
            <span className="text-danger">
              Are you sure to delete this point?
            </span>
          ) : selectedPointId.type === "edit" ? (
            <span className="text-warning">
              Are you are sure to edit this point?
            </span>
          ) : (
            <></>
          )}
          <div className="buttons">
            <button
              type="submit"
              className={`btn  ${
                selectedPointId && selectedPointId.type === "remove"
                  ? `btn-outline-danger`
                  : selectedPointId.type === "edit"
                  ? `btn-outline-warning`
                  : `btn-outline-success`
              }`}
            >
              {selectedPointId && selectedPointId.type === "add"
                ? "Add"
                : selectedPointId.type === "edit"
                ? "Edit"
                : "Remove"}
            </button>
            <button
              type="button"
              className={`btn  cancel-button ${
                selectedPointId && selectedPointId.type === "remove"
                  ? `btn-success`
                  : selectedPointId.type === "edit"
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

export default AddPoints;
const pointData = [
  { uuid: "P", title: "Productivity" },
  { uuid: "CK", title: "Communication" },
  { uuid: "PS", title: "Problem Solving" },
  { uuid: "CO", title: "Collaboration" },
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
