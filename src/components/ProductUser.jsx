import React from 'react'

export default function ProductUser({
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
                className={`p-2 stext-light w-100 ${inputClass}`}
                placeholder={placeholder}
                disabled={disabled}
            >
               {data && data.map(data=>(
                <option
                className="bg-light text-success"
                key={data.uuid}
                value={data.uuid}
                >
                {data.first_name +
                " " +
                data.last_name +
                " ("+
                data.username +
               ")" }

                </option>
               ))}
            </select>
        </div>
    )
}
