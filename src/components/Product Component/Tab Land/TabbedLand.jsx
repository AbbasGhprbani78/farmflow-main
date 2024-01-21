
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
    <>
      
          <div className="w-100  mt-3 ">
            <div className="tabbs top_land">
              <select className="product-lands-drow bg-success text-light"
                onChange={(e) => setActiveTab(e.target.value)}
                value={activeTab}
                style={{ width: "155px", padding: "7px" }}
              >
                {lands.map((land, i) => (
                  <option style={{ backgroundColor: "#fff", color: "#198754" }} key={i} value={land.uuid}>{land.title}</option>
                ))}
              </select>
              <div>
              </div>
              <div className="add_edit_land">
                <i
                  style={{ color: "#198754" }}
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
    </>

  );
}

export default TabbedLand;
