import { Container, Table } from "react-bootstrap";
import { IP } from '../App'
import { useState, useEffect } from "react";
export default function LeaderBoardCom({ persons }) {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (

    <Container className="w-100">
      <div className="leaderShadow  w-100 p-4">
        <div className="table-responsive mt-3 mx-0 mx-md-3 ">
          {windowWidth < 478 ? (
            <>
              <Table className="table-leader rounded mb-0">
                <thead>
                  <tr>
                    <th className="tabHeader text-start text-light ps-5">name</th>
                    <th className="tabHeader text-center text-light">score</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: persons.length }, (_, i) => i + 1).map(
                    (val) => (
                      <TableRow
                        key={val}
                        name={persons[val - 1][0]}
                        score={persons[val - 1][1]}
                        imgSrc={persons[val - 1][2]}
                      />
                    )
                  )}
                </tbody>
              </Table>
            </>) :
            (<>
              <Table className="table-leader rounded mb-0 responsive">
                <thead>
                  <tr>
                    <th className="tabHeader text-center text-light">rank</th>
                    <th  className="tabHeader text-start text-light ps-5">name</th>
                    <th className="tabHeader text-center text-light">score</th>
                  </tr>
                </thead>
                <tbody >
                  {Array.from({ length: persons.length }, (_, i) => i + 1).map(

                    (val) => (
                      <TableRow
                        rate={val}
                        key={val}
                        name={persons[val - 1][0]}
                        score={persons[val - 1][1]}
                        imgSrc={persons[val - 1][2]}
                      />
                    )
                  )}
                </tbody>
              </Table>
            </>)}

        </div>
      </div>
    </Container>
  );
}

function TableRow({ rate, name, score, imgSrc }) {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  return (
    <>
      {windowWidth < 478 ? (
        <>
          <tr>
            <td className="text-center cell-point">
              <div className="avatarimg">
                <img src={`${IP}${imgSrc}`} alt={""} />
                <span>{name}</span>
              </div>
            </td>
            <td className="text-center">
              <div className="scoreRate pt22  align-items-center">
                <span>{score}</span>
                <i className="bi bi-star-fill text-yellow "></i>
              </div>
            </td>
          </tr>
        </>) : (
        <>
          <tr>
            <td className="text-center ">
              <div className="rateClass pt22">
                <span>{rate < 9 ? `0${rate}` : `${rate}`}</span>
              </div>
            </td>
            <td className="text-center">
              <div className="avatarimg">
                <img src={imgSrc ? `${IP}${imgSrc}` :"src/Images/chat/user.png"} alt={""} />
                <span>{name}</span>
              </div>
            </td>
            <td className="text-center">
              <div className="scoreRate pt22  align-items-center">
                <span>{score}</span>
                <i className="bi bi-star-fill text-yellow "></i>
              </div>
            </td>

          </tr>
        </>)}

    </>

  );
}
//478