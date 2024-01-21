function TextArea({
  value,
  onChange,
  row,
  inputClass,
  palce,
  label,
  divClass,
  lableClass,
  height,
  disabled,
}) {
  return (
    <div  className={`d-flex flex-column mb-3 ${divClass}`}>
      <label style={{marginBottom:"10px"}} className={` ${lableClass}`}>{label}</label>
      <textarea
        style={{ height: height, outline: "none",width:"100%",borderRadius:"8px" }}
        placeholder={palce}
        value={value}
        onChange={onChange}
        rows={row}
        className={`border border-success px-2 bg-light ${inputClass}`}
        disabled={disabled}
      ></textarea>
    </div>
  );
}

export default TextArea;
