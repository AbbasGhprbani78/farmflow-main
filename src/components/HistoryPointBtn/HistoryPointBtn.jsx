import React from 'react'
import './HistoryPointBtn.css'
import { Link } from 'react-router-dom'

export default function History({link}) {
  return (
    
    <div className='history-btn-wrapper'>
        <Link style={{width:"max-Content"}} to={link} ><button className='history-btn py-2 px-3'>History</button></Link>
    </div>
    
  )
}
