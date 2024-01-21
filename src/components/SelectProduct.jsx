import React from 'react'

export default function SelectProduct(
  {
  
    state,
    inputClass = "bg-success",
    onChange,
    divClass,
    placeholder,
    data,
    lableClass,
    label,
    type,
    disabled = false
}) {
  console.log(state)
  return (
    <div className={`${divClass}`}>
    <label className={` ${lableClass}`}>{label}</label>
    <select
      value={state}
      onChange={onChange}
      className={`p-2 rounded-5  text-light w-100 ${inputClass}`}
      placeholder={placeholder}
      disabled={disabled}
    >
      {data &&
      <option value={data.uuid}></option>
      }
    </select>
  </div>
  )
}
