import dayjs from 'dayjs'

export function TabShowPoints({ points, onEditPoint, onDeletePoint }) {
  const sortedPoint = [...points].sort((a, b) => {
    const timeA = dayjs(a.date).format('YYYY-MM-DD HH:mm');
    const timeB = dayjs(b.date).format('YYYY-MM-DD HH:mm');
    return dayjs(timeB).unix() - dayjs(timeA).unix();
  })
  return (
    <TablePoints points={points}>
      {sortedPoint.map((point, i) => (
        <tr>
          <td className="text-center text-nowrap">
            {point.type == "D"
              ? "Daily Login"
              : point.type == "T"
                ? "Task"
                : point.type == "G"
                  ? "Games"
                  : point.type == "P"
                    ? "Productivity"
                    : point.type == "CK"
                      ? "Communication"
                      : point.type == "PS"
                        ? "Problem Solving"
                        : "Collabration"}
          </td>
          <td className="text-center">{point.description}</td>
          <td className="text-center">
            {point.rating}
            <i className="bi bi-star-fill text-warning fs-6 ms-2"></i>
          </td>
          <td className="text-center text-nowrap">
            {point.date}
          </td>
          <td className="text-center table-edit">
            <i
              className="bi bi-pencil-square "
              onClick={() => onEditPoint(point.uuid)}
            ></i>
          </td>
          <td className="text-center table-remove">
            <i
              className="bi bi-trash3 "
              onClick={() => onDeletePoint(point.uuid)}
            ></i>
          </td>
        </tr>
      ))}
    </TablePoints>
  );
}
function TablePoints({ points, children }) {
  return (
    <>
      {points.length === 0 ? (
        <div className="table-parent w-100  border-prim1 mt-3">
          <h4 className="header-task">All Points</h4>
          <div className="d-flex justify-content-center">
            <span>There is nothing to show.</span>
          </div>
        </div>
      ) : (
        <div style={{ maxHeight: "500px" }} className="table-container w-100">
          <table className="table-task-profile table ">
            <thead>
              <tr>
                <th className="text-center">Type</th>
                <th className="text-center">Description</th>
                <th className="text-center">Points</th>
                <th className="text-center">Date</th>
                <th className="text-center">Edit</th>
                <th className="text-center">Remove</th>
              </tr>
            </thead>
            <tbody>{children}</tbody>
          </table>
        </div>
      )}
    </>
  );
}
