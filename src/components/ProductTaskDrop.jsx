import React from 'react'

export default function ProductTaskDrop({
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
    style={{borderRadius:"8px",padding:"7px 0",color:"#fff"}}
        value={state}
        onChange={onChange}
        className={`p-2text-light w-100 ${inputClass}`}
        placeholder={placeholder}
      
    >
        {data &&
        data.map(data=>(
            <option style={{backgroundColor:"#fff",color:"#198754"}} value={data.uuid}>{data.name}</option>
        ))
}
    </select>
</div>
  )
}
