import { useEffect, useState } from "react";
import axios from "axios";
import { IP } from "../../App";

const landDataProducts = [
  {
    uuid: "1",
    title: "land number 1",
    products: [
      { uuid: "11", name: "Appple" },
      { uuid: "12", name: "Benana" },
      { uuid: "13", name: "PineApple" },
    ],
  },
  {
    uuid: "2",
    title: "land number 2",
    products: [
      { uuid: "14", name: "Orange" },
      { uuid: "15", name: "Grips" },
    ],
  },
];
export function TabShowProducts({ userInfo, activeTab }) {
  const [data, setData] = useState(landDataProducts);

  const fetchAllLands = async () => {
    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`,
    };
    try {
      const response = await axios.get(
        `${IP}/all-profile-lands/`,
        {
          headers,
        }
      );
      if (response.status === 200) {
        setData(response.data.lands);
      }

    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh')
        window.location.href = "/login"
      }
    }
  };
  const fetchLands = async () => {
    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`,
    };
    try {
      const response = await axios.get(
        `${IP}/profile-lands/${userInfo.uuid}`,
        {
          headers,
        }
      );
      if (response.status === 200) {
        console.log(response.data.lands);
        setData(response.data.lands);
      }

    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh')
        window.location.href = "/login"
      }
    }
  };
  useEffect(() => {
    if (activeTab === 4) {
      fetchAllLands()
    } else {
      fetchLands();
    }

  }, []);
  return (
    <TableProducts products={data}>
      {data &&
        Array.from({ length: data.length }, (_, i) => (
          <tr>
            <td className="text-center">{i + 1}</td>
            <td className="text-center">{data[i][0]}</td>
            <td className="text-center">
              {Array.from(
                { length: data[i][1] && data[i][1].length },
                (_, j) =>
                  data[i][1][j] + `${j === data[i][1].length - 1 ? "" : " / "}`
              )}
            </td>
          </tr>
        ))}
    </TableProducts>
  );
}
function TableProducts({ products, children }) {
  return (
    <>
      {products && products.length === 0 ? (
        <div className="table-parent w-100  border-prim1 mt-3">
          <h4 className="header-task">All Products</h4>
          <div className="d-flex justify-content-center">
            <span>There is nothing to show.</span>
          </div>
        </div>
      ) : (
        <div style={{ maxHeight: "500px", overflowY: "scroll" }} className="table-container w-100 ">
          <table className="table-product table  ">
            <thead>
              <tr>
                <th className="text-center p-0">#</th>
                <th className="text-center p-0">Land Name</th>
                <th className="text-center p-0">Products</th>
              </tr>
            </thead>
            <tbody>{children}</tbody>
          </table>
        </div>
      )}
    </>
  );
}
