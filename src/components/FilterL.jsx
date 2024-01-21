import React, { useState, useEffect } from 'react'
import '../Style/Filter.css'
import { IP } from '../App'
import axios from 'axios'

export default function FilterL({ shoewfilter, handleFilterItemL }) {

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


        <div className={shoewfilter ? "filter-container  active-filter" : "filter-container"}
        >
            <ul className='filter-list'>
                <li className='filter-item' onClick={() => handleFilterItemL("all")}>All</li>
                {
                    Array.from(allLands).map((land, i) => (
                        <li key={i} className='filter-item' onClick={() => handleFilterItemL(land)}>{land}</li>
                    ))
                }

            </ul>
        </div>
    )
}
