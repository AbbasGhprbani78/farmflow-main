import TextInput from "../TextInput";
import TextArea from "../TextArea";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";
import MapComponent from "../MapComponent";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";


import "../../Style/addland.css";

function AddLand({
  landInfo,
  selectedLand,
  onBack,
  onChange,
  addingLand,
  edditingLand,
  removingLand,
}) {
  const [markerPosition, setMarkerPosition] = useState([
    landInfo.x_coordinate,
    landInfo.y_coordinate,
  ]);

  console.log(markerPosition)
  function setTitle(title) {
    onChange((info) => ({ ...info, title: title }));
  }
  function setAddress(address) {
    onChange((info) => ({ ...info, address: address }));
  }
  function setX(x) {
    setMarkerPosition([x, landInfo.y_coordinate]);
    onChange((info) => ({ ...info, x_coordinate: x }));
  }
  function setY(y) {
    setMarkerPosition([landInfo.x_coordinate, y]);
    onChange((info) => ({ ...info, y_coordinate: y }));
   
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (selectedLand.type == "remove") {
      removingLand(landInfo.uuid);
    }
    if (!landInfo.title) {
      errorMessage("Please enter the title!");
      return;
    } else if (landInfo.title.length < 2) {
      warningMessage(
        "Please enter a title with length more than 2 characters!"
      );
      return;
    } else if (!landInfo.address) {
      errorMessage("Please enter the address!");
      return;
    } else if (landInfo.address.length < 2) {
      warningMessage(
        "Please enter an address with length more than 2 characters!"
      );
      return;
    } else if (!landInfo.x_coordinate) {
      warningMessage("Please enter X coordinates!");
      return;
    } else if (!landInfo.y_coordinate) {
      warningMessage("Please enter Y coordinates!");
      return;
    }
    if (selectedLand.type == "add") {
      addingLand();
    } else if (selectedLand.type == "edit") {
      edditingLand();
    }
  }

  function handleMarkPosition(x, y) {
    setX(landInfo.x_coordinate);
    setY(landInfo.y_coordinate);
  }
  useEffect(() => {
    setMarkerPosition([landInfo.x_coordinate, landInfo.y_coordinate]);
   
  }, [landInfo.x_coordinate, landInfo.y_coordinate]);

  return (
    <Container className="w-100">
      <Row>
        <Col xs={12} lg={8} className=" mapProduct">
          <div className="leaderShadow  w-100 p-4 mapProduct">
            <h6
              className={`headerLeader ${
                selectedLand.type == "add"
                  ? `text-prim2`
                  : selectedLand.type == "edit"
                  ? `text-warning`
                  : `text-danger`
              }`}
            >
              {selectedLand && selectedLand.type === "edit"
                ? "Editting The Land:"
                : selectedLand.type === "add"
                ? "Adding New Land:"
                : "Removing The Land:"}
            </h6>
            <Map
              xCoor={landInfo.x_coordinate}
              yCoor={landInfo.y_coordinate}
              onXChange={setX}
              onYChange={setY}
              markerPosition={markerPosition}
              onSetMarkPosition={handleMarkPosition}
            />
          </div>
        </Col>
        <Col xs={12} lg={4} className="mt-3 mb-3 mt-sm-0 detailmap  form-map">
          <div className="leaderShadow  w-100 p-4 "  style={{height:"100%"}}>
            <h6 className="headerLeader text-success">Details:</h6>
            <form
              className="d-flex w-100 flex-column justify-content-center"
              onSubmit={handleSubmit}
            >
              <TextInput
                value={landInfo.title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                inputClass="mt-0  focus inputfarm"
                label="Title:"
                palce="title"
                divClass="w-100"
                disabled={selectedLand.type == "remove"}
              />
              <TextArea
                key={5}
                value={landInfo.address}
                onChange={(e) => setAddress(e.target.value)}
                palce="write address"
                label="Address:"
                lableClass="text-success"
                row={5}
                height="175px"
                inputClass="py-1 focus textarea areaMap"
                disabled={selectedLand.type == "remove"}
                divClass={"areaContainer"}
              />
              <TextInput
                value={landInfo.x_coordinate}
                onChange={(e) => setX(e.target.value)}
                type="number"
                inputClass="mt-0 focus mb-3"
                label="GPS:"
                palce="X"
                divClass="w-100"
                disabled={selectedLand.type == "remove"}
              />
              <TextInput
                value={landInfo.y_coordinate}
                onChange={(e) => setY(e.target.value)}
                type="number"
                inputClass="mt-0  focus mb-3"
                label=""
                palce="Y"
                divClass="w-100"
                disabled={selectedLand.type == "remove"}
              />
              <div className="submit_button">
                {selectedLand && selectedLand.type === "remove" ? (
                  <span className="text-danger">
                    Are you sure to delete this Land?
                  </span>
                ) : selectedLand.type === "edit" ? (
                  <span className="text-warning">
                    Are you are sure to edit this Land?
                  </span>
                ) : (
                  <></>
                )}
                <div className="buttons">
                  <button
                    type="submit"
                    className={`btn  ${
                      selectedLand && selectedLand.type === "remove"
                        ? `btn-outline-danger`
                        : selectedLand.type === "edit"
                        ? `btn-outline-warning`
                        : `btn-outline-success`
                    }`}
                  >
                    {selectedLand && selectedLand.type === "add"
                      ? "Add"
                      : selectedLand.type === "edit"
                      ? "Edit"
                      : "Remove"}
                  </button>
                  <button
                    type="button"
                    className={`btn  cancel-button ${
                      selectedLand && selectedLand.type === "remove"
                        ? `btn-success`
                        : selectedLand.type === "edit"
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
        </Col>
      </Row>
    </Container>
  );
}

function Map({
  xCoor,
  yCoor,
  onXChange,
  onYChange,
  markerPosition,
  onSetMarkPosition,
}) {
  
  return (
    <div style={{height:"515px"}}>
      <MapComponent
        x={xCoor}
        y={yCoor}
        onXChange={onXChange}
        onYChange={onYChange}
        onSetMarkPosition={onSetMarkPosition}
        markerPosition={markerPosition}
      />
    </div>
  );
}

export default AddLand;
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
