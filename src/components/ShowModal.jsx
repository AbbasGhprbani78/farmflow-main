import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function ShowModal({ show, handleClose, object }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="notifHeader">
            <span>Notifications!</span>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{object.content}</Modal.Body>
      <Modal.Footer>
        <Button style={{width:"100px"}} className=" btn-success" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ShowModal;
