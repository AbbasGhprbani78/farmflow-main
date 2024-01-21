import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
import '../Style/Spinner.css'

export default function Spinne() {
    return (
        <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", zIndex: "999", backdropFilter: "blur(3px)" }}>
            <Spinner className='spinner' variant="success" />
        </div>
    )
}
