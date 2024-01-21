import React from 'react'
import './EditProduct.css'
import { Row } from 'react-bootstrap'
export default function () {
    return (

        <>
            <Row>
                <form action="">
                    <div>
                        <label htmlFor="">Product</label>
                        <select>

                        </select>
                    </div>
                    <div>
                        <label htmlFor="">Land</label>
                        <select>

                        </select>
                    </div>
                    <div>
                        <label htmlFor="">Date</label>
                        <input type="date" />
                    </div>
                    <div>
                        <label>Description</label>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    </div>
                </form>
            </Row>
        </>
    )
}
