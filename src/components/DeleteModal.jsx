import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function DeleteBox({handleClose,handleDeleteClose,show}) {
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='notif-modal'>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are You Sure About The Deletion?</Modal.Body>
                <Modal.Footer>
                    <Button style={{width:"100px"}} variant="secondary" onClick={handleClose}>
                      No
                    </Button>
                    <Button style={{width:"100px"}} variant="success" onClick={handleDeleteClose}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
