import React from 'react'

export default function EmployeeTabShowPoints({ points, onEditPoint, onDeletePoint }) {
    return (
        <TablePoints points={points}>
            {points.map((point, i) => (
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
                <div className="table-container w-100">
                    <table className="table-task-profile table ">
                        <thead>
                            <tr>
                                <th className="text-center">Type</th>
                                <th className="text-center">Description</th>
                                <th className="text-center">Points</th>
                                <th className="text-center">Date</th>
                            </tr>
                        </thead>
                        <tbody>{children}</tbody>
                    </table>
                </div>
            )}
        </>
    );
}
