import React, { useState, useEffect } from 'react'
import '../Style/Filter.css'
import { IP } from '../App'
import axios from 'axios'

export default function FilterL({ handleFilterItemL }) {

    const [allLands, setAllLands] = useState(new Set());

    const fetchAllTasks = async () => {
        const access = localStorage.getItem("access");
        const headers = {
            Authorization: `Bearer ${access}`,
        };

        try {
            const response = await axios.get(
                `${IP}/all-profile-tasks/`,
                { headers }
            );
            if (response.status === 200) {
                const uniqueLandTitles = new Set(response.data.map(land => land.land.title));
                setAllLands(uniqueLandTitles);
            }

        } catch (error) {
            console.log(error)
            if (error.response.status === 401) {
                localStorage.removeItem('access')
                localStorage.removeItem('uuid')
                localStorage.removeItem('refresh')
                window.location.href = "/login"
            }
        }
    };
    useEffect(() => {
        fetchAllTasks()
    }, [])
    return (

        <select className='select-t' onChange={(e) => handleFilterItemL(e.target.value)}>
            <option value="All" selected>Lands</option>
            <option value="All">All</option>
            {
                Array.from(allLands).map((land, i) => (
                    <option key={i} value={land}>{land}</option>
                ))
            }
        </select>

    )
}
