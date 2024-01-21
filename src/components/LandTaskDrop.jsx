import React from 'react'


export default function LandTaskDrop( {
    state,
    inputClass = "bg-success",
    onChange,
    divClass,
    placeholder,
    data,
    lableClass,
    label,
    type,
    disabled = false,
}) {

    
    return (
        <div className={`${divClass}`}>
            <label className={` ${lableClass}`}>{label}</label>
            <select
                value={state}
                onChange={onChange}
                className={`p-2 text-light w-100 ${inputClass}`}
                placeholder={placeholder}
               
            >
                {data &&
                data.map(data=>(
                    <option  style={{background:"#fff",color:"#198754"}} value={data.uuid}>{data.title}</option>
                ))
        }
            </select>
        </div>
    )
}


