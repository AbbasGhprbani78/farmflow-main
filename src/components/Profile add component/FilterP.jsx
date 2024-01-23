import React from 'react'
import '../../Style/Filter.css'

export default function FilterP({ handleFilterItem }) {


    return (
        <select
            onChange={(e) => handleFilterItem(e.target.value)}
            className='select-t'>
            <option value="All" selected>priority</option>
            <option value="All">All</option>
            <option value="L">Low</option>
            <option value="M">Medium</option>
            <option value="H">High</option>
            <option value="E">Emergency</option>
        </select>

    )
}