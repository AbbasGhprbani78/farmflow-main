import React from 'react'
import "./BoxShopHistory"
import {MdAttachMoney} from 'react-icons/md'
export default function BoxShopHistory(props) {
  return (
      
    <div className="card mb-3" style={{maxWidth:"540px",boxShadow:"5px 5px 15px lightgray"}}>
          <div className="row no-gutters">
              <div className="col-md-4" style={{padding:'var(--bs-card-spacer-y) var(--bs-card-spacer-x)',}}>
                  <img src={props.img} style={{width:"100%",borderRadius:"5px"}}/>
              </div>
              <div className="col-md-8">
                  <div className="card-body">
                      <h5 className="card-title">{props.title}</h5>
                      <p className="card-text">{props.description}</p>
                      <div className="card-text mt-2 d-flex justify-content-between">
                          <small class="text-muted">{props.date}</small>
                          <div className='d-flex align-items-center'>
                              <small class="text-muted">{props.price}</small>
                              <MdAttachMoney style={{color:"#5DA25E",verticalAlign:"middle"}}/>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
  </div>
  )
}
