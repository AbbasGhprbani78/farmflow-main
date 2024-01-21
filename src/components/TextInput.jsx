function TextInput({
  value,
  onChange,
  type,
  inputClass = "",
  palce = "",
  label = "",
  divClass = "",
  lableClass = "",
  disabled = false,
  name = "",
}) {
  return (
    <div className={`d-flex flex-column  ${divClass}`}>
      <label style={{ marginBottom: "10px" }} className={`text-success ${lableClass}`}>{label}</label>
      <input
        autoComplete="false"
        style={{ borderRadius: "8px" }}
        disabled={disabled}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        className={`border border-success  px-2 py-1 bg-light drop-fill ${inputClass}`}
        placeholder={palce}
      ></input>
    </div>
  );
}

export default TextInput;
