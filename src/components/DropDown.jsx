

function DropDown({
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
      <label style={{marginBottom:"10px"}} className={` ${lableClass}`}>{label}</label>
      <select
        value={state}
        onChange={onChange}
        className={`p-2 text-light w-100 ${inputClass}`}
        placeholder={placeholder}
        disabled={disabled}
        style={{borderRadius:"8px"}}
      >
        {data &&
          Array.from({ length: data && data.length }, (_, i) => i + 1).map(
            (val) =>
              type === 1 ? (
                <option
                  className="bg-light text-success"
                  key={data[val - 1].id}
                  value={data[val - 1].id + data[val - 1].uuid}
                >
                  {data[val - 1].first_name +
                    " " +
                    data[val - 1].last_name +
                    " (" +
                    data[val - 1].username +
                    ")"}
                </option>
              ) : type === 2 ? (
                <option
                  className="bg-light text-success"
                  key={data[val - 1].uuid}
                  value={data[val - 1].uuid}
                  selected={data[val - 1].uuid === -1}
                >
                  {data[val - 1].name}
                </option>
              ) : type === 3 ? (
                <option
                  className="bg-light text-success"
                  key={data[val - 1].uuid}
                  value={data[val - 1].uuid}
                  selected={data[val - 1].uuid === -1}
                >
                  {data[val - 1].title}
                </option>
              ) : type === 4 ? (
                <option
                  className="bg-light text-success"
                  key={data[val - 1].uuid}
                  value={data[val - 1].uuid}
                  selected={data[val - 1].uuid === -1}
                >
                  {data[val - 1].title}
                </option>
              ) : (
                <></>
              )
          )
        }
      </select>
    </div>
  );
}

export default DropDown;


