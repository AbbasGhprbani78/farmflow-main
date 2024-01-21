import LandTab from "./LandTab";
function TabbedLand({
  children,
  activeTab,
  setActiveTab,
  lands,
  onAddLand,
  onEditLand,
  onDeleteLand,
}) {

  return (
  
    <div className="w-100  mt-3 ">
      <div className="tabbs top_land">
        <div>
          {Array.from({ length: lands.length }, (_, i) => (
            <LandTab
              num={lands[i].uuid}
              active={activeTab}
              onClick={setActiveTab}
              name={lands[i].title}
              key={i}
            />
          ))}
        </div>
        <div className="add_edit_land">
          <i
            className="bi bi-plus-square fs-5 text-prim2"
            onClick={() => onAddLand()}
          ></i>
          <i
            className="bi bi-pencil-square fs-5 mx-3 text-warning"
            onClick={() => onEditLand(activeTab)}
          ></i>
          <i
            className="bi bi-trash3 fs-5 text-danger"
            onClick={() => onDeleteLand(activeTab)}
          ></i>
        </div>
      </div>

      {children}
    </div>
  );
}

export default TabbedLand;
