import { useEffect, useState } from "react";
import axios from "axios";
import { IP } from "../../App";


export function TabShowMachines({ userInfo, activeTab }) {
  const [machines, setMachines] = useState([]);

  const fetchAllMachines = async () => {
    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`,
    };
    try {
      const response = await axios.get(
        `${IP}/all-profile-tools/`,
        {
          headers,
        }
      );
      if (response.status === 200) {
        setMachines(response.data);
        console.log(response)

      }

    } catch (error) {
      console.log(error)
      if (error.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh')
        window.location.href = "/login"
      }
    }
  };
  const fetchMachines = async () => {
    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`,
    };
    try {
      const response = await axios.get(
        `${IP}/profile-tools/${userInfo}`,
        {
          headers,
        }
      );
      if (response.status === 200) {
        setMachines(response.data);
        console.log(response)
      }

    } catch (error) {
      console.log(error)
      if (error.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh')
        window.location.href = "/login"
      }
    }
  };
  useEffect(() => {
    if (activeTab === 8) {
      fetchAllMachines()
    } else {
      fetchMachines();
    }

  }, []);

  console.log(machines)
  return (
    <TableMachines machines={machines}>
      {machines &&
        machines.map((machine, i) => (
          <tr key={i}>
            <td className="text-center image-machine">
              <img src={`${IP}${machine.image}`} alt="machine" />
            </td>
            <td className="text-center">
              <span>
                {machine.type === "M"
                  ? "Machinery"
                  : machine.type === "V"
                    ? "Vehicle"
                    : machine.type === "S"
                      ? "Smart Monitoring Device"
                      : "Tools And Implements"}
              </span>
            </td>
            <td className="text-center">
              <span>{machine.name.name}</span>
            </td>
            <td className="text-center">
              <span>{machine.model}</span>
            </td>
            <td className="text-center">
              <span>{machine.land.title}</span>
            </td>
            <td className="text-center">
              {machine.status === "A" ? (
                <span className="text-success">Available</span>
              ) : machine.status === "IU" ? (
                <span className="text-danger">In Use</span>
              ) : (
                <span className="text-warning">Under Maintenance</span>
              )}
            </td>
            <td className="text-center pdf-download">
              <a href={`${IP}${machine.manual}`} rel="noreferrer" target="_blank" download>
                <button className="btn btn-outline-success">
                  <span>PDF</span>
                  <i className="bi bi-arrow-down-square fs-6 ms-1"></i>
                </button>
              </a>
            </td>
          </tr>
        ))}
    </TableMachines>
  );
}
function TableMachines({ machines, children }) {
  return (
    <>
      {machines && machines.length === 0 ? (
        <div className="table-parent w-100 border-prim1 mt-3">
          <h4 className="header-task">All Machines</h4>
          <div className="d-flex justify-content-center">
            <span>There is nothing to show.</span>
          </div>
        </div>
      ) : (
        <div style={{ maxHeight: "500px", overflowY: "scroll" }} className="table-container w-100">
          <table className="table-machine-profile table ">
            <thead>
              <tr>
                <th className="text-center">Image</th>
                <th className="text-center">Vehicle Type</th>
                <th className="text-center">Vehicle Name</th>
                <th className="text-center">Model</th>
                <th className="text-center">Land</th>
                <th className="text-center">Availability</th>
                <th className="text-center">How To Use</th>
              </tr>
            </thead>
            <tbody className="machine-body">{children}</tbody>
          </table>
        </div>
      )}
    </>
  );
}
