import { IP } from "../../App";
import Avatar from "../../Images/profileadd/avatar.png"
export function Members({
  members,
  onHeader,
  onItem,
  onEdit,
  onRemove,
  selectedId,
  onShow,
  handleAllEmpolyee,
  manager,
  onManager,
  handleMangerEdit,
  handleMangerRemove,
  handleMangerShow,
  AllEmployee
}) {

  console.log(AllEmployee)

  const sortedMembers = members
    ? [...members].sort((a, b) => {
      // Compare first names
      const firstNameComparison = a.first_name.localeCompare(b.first_name);
      if (firstNameComparison !== 0) {
        return firstNameComparison; al - m
      }

      return a.last_name.localeCompare(b.last_name);
    })
    : null;
  return (
    <div style={{ borderRadius: "8px", height: "100%" }} className="shadow px-3  member-container-em">
      <div className="member-header " >
        <h4>Members</h4>
        <p className={AllEmployee === true ? "All-members" : "All-member-normal"} onClick={handleAllEmpolyee}>All Members</p>
        <i style={{ cursor: "pointer" }} className="bi bi-person-add" onClick={onHeader}></i>
      </div>
      <div className="scroll-member">
        {members ? (
          <ul className="list-unstyled ">
            <>
              {
                manager &&
                <li
                  className="d-flex justify-content-between align-items-center flex-row px-3 py-1"
                >
                  <div
                    className="member-info"
                    onClick={() => onManager(manager.uuid)}
                  >
                    <img
                      className="member-img"
                      src={manager.image ? `${IP}${manager.image}` : Avatar}
                      alt=""
                    ></img>
                    <div className="d-flex ms-3 justify-content-start align-items-center flex-row">
                      <div className="d-flex flex-row">
                        <span>{manager.first_name}</span>
                        <span className="ms-2">{manager.last_name}</span>
                      </div>
                    </div>
                  </div>

                  {selectedId && selectedId.id === manager.uuid ? (
                    <div className="icon-ex">
                      <i
                        className={`bi bi-pencil-square ${selectedId && selectedId.type == "edit"
                          ? `active-icon`
                          : ``
                          }`}
                        onClick={() => handleMangerEdit(manager.uuid)}
                      ></i>
                      <i
                        className={`bi bi-trash3 ${selectedId && selectedId.type == "remove"
                          ? `active-icon`
                          : ``
                          }`}
                        onClick={() => handleMangerRemove(manager.uuid)}
                      ></i>
                      <i
                        className={`bi bi-person-bounding-box ${selectedId && selectedId.type == "show"
                          ? `active-icon`
                          : ``
                          }`}
                        onClick={() => handleMangerShow(manager.uuid)}
                      ></i>
                    </div>
                  ) : (
                    <div className="icon-ex">
                      <i
                        className="bi bi-pencil-square "
                        onClick={() => handleMangerEdit(manager.uuid)}
                      ></i>
                      <i
                        className="bi bi-trash3 "
                        onClick={() => handleMangerRemove(manager.uuid)}
                      ></i>
                      <i
                        className="bi bi-person-bounding-box"
                        onClick={() => handleMangerShow(manager.uuid)}
                      ></i>
                    </div>
                  )}
                </li>
              }
              <hr></hr>
            </>
            {sortedMembers &&
              sortedMembers.map((member, i) => (
                <>
                  <li
                    className="d-flex justify-content-between align-items-center flex-row px-3 py-1"
                    key={i}

                  >
                    <div
                      className="member-info"
                      onClick={() => onItem(member.uuid)}
                    >
                      <img
                        className="member-img"
                        src={member.image ? `${IP}${member.image}` : Avatar}
                        alt=""
                      ></img>
                      <div className="d-flex ms-3 justify-content-start align-items-center flex-row">
                        <div className="d-flex flex-row">
                          <span>{member.first_name}</span>
                          <span className="ms-2">{member.last_name}</span>
                        </div>
                      </div>
                    </div>

                    {selectedId && selectedId.id === member.uuid ? (
                      <div className="icon-ex">
                        <i
                          className={`bi bi-pencil-square ${selectedId && selectedId.type == "edit"
                            ? `active-icon`
                            : ``
                            }`}
                          onClick={() => onEdit(member.uuid)}
                        ></i>
                        <i
                          className={`bi bi-trash3 ${selectedId && selectedId.type == "remove"
                            ? `active-icon`
                            : ``
                            }`}
                          onClick={() => onRemove(member.uuid)}
                        ></i>
                        <i
                          className={`bi bi-person-bounding-box ${selectedId && selectedId.type == "show"
                            ? `active-icon`
                            : ``
                            }`}
                          onClick={() => onShow(member.uuid)}
                        ></i>
                      </div>
                    ) : (
                      <div className="icon-ex">
                        <i
                          className="bi bi-pencil-square "
                          onClick={() => onEdit(member.uuid)}
                        ></i>
                        <i
                          className="bi bi-trash3 "
                          onClick={() => onRemove(member.uuid)}
                        ></i>
                        <i
                          className="bi bi-person-bounding-box"
                          onClick={() => onShow(member.uuid)}
                        ></i>
                      </div>
                    )}
                  </li>
                  <hr></hr>
                </>
              ))}
          </ul>
        ) : (
          <span className="my-4 color-primary2 ">Please Add A Member!</span>
        )}
      </div>
    </div>
  );
}





