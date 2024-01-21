import React from 'react'
import { Card, Button, Modal } from 'react-bootstrap'
import './Card.css'
import { MdAttachMoney } from 'react-icons/md'
import { BsBasket2 } from 'react-icons/bs'
import { useState } from 'react'
import { IP } from '../../App'
export default function (props) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ height: "70px", borderBottom: "none" }}>
          <Modal.Title className='notif-modal'>Buy</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: '20px' }}>Are You Sure about buying the product ?</Modal.Body>
        <Modal.Footer style={{ borderTop: "none" }}>

          <a className='BtnShop' href={props.url}><p style={{ textAlign: "center", width: "100%" }}>Yes</p></a>

          <Button className='cancel  btn-modal' onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <Card style={{ width: '22rem', border: "none", boxShadow: "5px 5px 15px lightgray", maxHeight: "488px" }}>
        <div style={{ height: "250px" }} className='img-wrapper'>
          <Card.Img variant="top" src={`${IP}${props.image}`} style={{ height: "100%" }} />
        </div>
        <Card.Body>
          <Card.Title style={{ height: "auto" }} className='d-flex justify-content-between'>
            {props.title}
            <div>
              {props.price}
              <MdAttachMoney style={{ color: "#5DA25E" }} />
            </div>
          </Card.Title>
          <Card.Text style={{ overflowY: "scroll", height: "110px" }}>
            {props.description}
          </Card.Text>
          <Button className='buy-btn mt-3' onClick={handleShow}>
            buy
            <div className='icon-wrapper d-flex justify-content-center align-items-center'>
              <BsBasket2 style={{ color: '#5DA25E', verticalAlign: "middle", lineHeight: "100%" }} />
            </div>
          </Button>

        </Card.Body>
      </Card>
    </div>
  )
}
