import React, { useEffect } from 'react'
import '../../Style/Filter.css'

export default function FilterP({ shoewfilter, handleFilterItem }) {


    return (
        <div className={shoewfilter ? "filter-container  active-filter" : "filter-container"}
        >
            <ul className='filter-list'>
                <li className='filter-item' onClick={() => handleFilterItem("all")}>All</li>
                <li className='filter-item' onClick={() => handleFilterItem("L")}>Low</li>
                <li className='filter-item' onClick={() => handleFilterItem("M")}>Medium</li>
                <li className='filter-item' onClick={() => handleFilterItem("H")}>High</li>
                <li className='filter-item' onClick={() => handleFilterItem("E")}>Emergency</li>
            </ul>
        </div>
    )
}
