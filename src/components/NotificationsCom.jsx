import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaRegCalendarTimes } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";

function NotificationsCom({ notifData, tasks, setNotifData }) {
  const [activeTab, setActiveTab] = useState(0);
  const [activeIdNotif, setActiveIdNotif] = useState(0);
  const [activeIdTask, setActiveIdTask] = useState(0);
  const [unreadMessage, setUnreadMessage] = useState(0);
  function handleExpandNotif(id) {
    setNotifData((notifs) =>
      notifs.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    setActiveIdNotif(activeIdNotif === id ? 0 : id);
  }
  function handleExpandTask(id) {
    setActiveIdTask(activeIdTask === id ? 0 : id);
  }
  useEffect(() => {
    let n = 0;
    for (const i in notifData) {
      if (!notifData[i].read) n++;
    }
    setUnreadMessage(n);
  }, [notifData]);
  const today = new Date();
  const formattedDay = today
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("/");
  return (
    <Container className="w-100">
      <Row>
        <Col xs={12} sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
          <div className="notifShadow w-100 p-1 p-sm-3 p-md-3 p-lg-4">
            <Tabbed activeTab={activeTab} setActiveTab={setActiveTab}>
              {activeTab === 0 ? (
                <ContentTabNotif>
                  <AllNotifs2 number={unreadMessage}>
                    {notifData &&
                      notifData.map((notif) => {
                        return (
                          <Notif2
                            text={notif.content}
                            date={notif.date}
                            read={notif.read}
                            id={notif.id}
                            active={activeIdNotif}
                            onExpend={() => handleExpandNotif(notif.id)}
                            key={notif.id}
                          />
                        );
                      })}
                  </AllNotifs2>
                </ContentTabNotif>
              ) : activeTab === 1 ? (
                <ContentTabTask tasks={tasks}>
                  {tasks &&
                    tasks.map((task) => (
                      <Task
                        key={task.id}
                        title={task.title}
                        startDate={task.start_date}
                        endDate={task.end_date}
                        today={formattedDay}
                        priority={task.priority}
                        active={activeIdTask}
                        land={task.land}
                        id={task.id}
                        employer={task.employee}
                        product={task.product}
                        onExpend={() => handleExpandTask(task.id)}
                      />
                    ))}
                </ContentTabTask>
              ) : (
                ""
              )}
            </Tabbed>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
function Tabbed({ children, activeTab, setActiveTab }) {
  return (
    <div>
      <div className="tabs">
        <Tab num={0} active={activeTab} onClick={setActiveTab} name={"All"} />
        <Tab
          num={1}
          active={activeTab}
          onClick={setActiveTab}
          name={"Uncompleted"}
        />
      </div>
      {children}
    </div>
  );
}
function Tab({ num, active, onClick, name }) {
  return (
    <button
      className={num === active ? "tab active" : "tab"}
      onClick={() => onClick(num)}
    >
      {name}
    </button>
  );
}
function ContentTabNotif({ children }) {
  return <div>{children}</div>;
}
const dateConvertor = (startDate, endDate) => {
  const newStartDate = new Date(startDate);
  const newEndDate = new Date(endDate);
  const oneDay = 86400000;
  let result;
  result = Math.ceil((newEndDate - newStartDate) / (1000 * 60 * 60 * 24));
  console.log(result)
  if (result < 0) {
    return 0;
  }
  return result;
};
function ContentTabTask({ children, tasks }) {
  return (
    <div className="tab-content-task">
      <div className="taskHeader">
        <span style={{ padding: "10px" }}>Uncompleted Tasks</span>
        {tasks ? (
          <Row className=" mt-2">
            <Col
              xs={12}
              className="d-flex flex-wrap justify-content-around gap-2"
            >
              <div className=" flex-class-row  bor">
                <div style={{ background: "red", width: "15px", height: "15px", borderRadius: "50%", margin: "0px 5px" }}></div>
                <span className="fs-6" style={{ paddingRight: "10px" }}>Emergency</span>
              </div>
              <div className=" flex-class-row  bor">
                <div style={{ background: "orange", width: "15px", height: "15px", borderRadius: "50%", margin: "0px 5px" }}></div>
                <span className="fs-6">High</span>
              </div>
              <div className="flex-class-row  bor">
                <div style={{ background: "yellow", width: "15px", height: "15px", borderRadius: "50%", margin: "0px 5px" }}></div>
                <span className="fs-6">Medium</span>
              </div>
              <div className=" flex-class-row  bor">
                <div className="bor-blue" style={{ width: "15px", height: "15px", borderRadius: "50%", margin: "0px 5px" }}></div>
                <span className="fs-6">Low</span>
              </div>
            </Col>
          </Row>
        ) : (
          <span style={{ color: "#5da25e" }}>You have no notification!</span>
        )}
      </div>
      <div className="ylistscroll w-100">
        <ul>{children}</ul>
      </div>
    </div>
  );
}

function AllNotifs2({ number, children }) {
  return (
    <div className="xnotifList">
      <div className="notifHeader">
        <span>Notifications</span>
        <span className={number < 1 ? "read" : "unread"}>
          {number < 1
            ? "You have no unread notification!"
            : number === 1
              ? "You have an unread notification."
              : `You have ${number} unread notifications.`}
        </span>
      </div>
      <ul className="xlistscroll w-100">{children}</ul>
    </div>
  );
}
function Notif2({ text = "", date = "", read = "", id, onExpend, active }) {
  const isOpen = id === active;
  const displayContent = isOpen
    ? text
    : text.length > 40
      ? text.split(" ").slice(0, 5).join(" ") + " ..."
      : text;
  const datestr = date.slice().substring(0, 10).split("-").join("/");
  const time = date.slice().substring(11, 16);
  return (
    <li
      className={`notification ${isOpen ? `active` : ``}`}
      role="button"
      onClick={onExpend}
    >
      <i
        className={`mx-2 notif-icon fs-4 bi ${read
          ? `bi-envelope-open text-dark-green`
          : `bi-envelope-fill text-green`
          }`}
      ></i>
      <div className="notif-data text-dark-green">
        <div
          className={`notif-text ${read ? `text-dark-green` : `text-green font-custom`
            }`}
        >
          <span className={` ${isOpen ? `expended` : ``}`}>
            {displayContent}
          </span>
        </div>
        <div className="notif-info">
          <div className="notif-date">{datestr}</div>
          <div className="notif-time">{time}</div>
        </div>
      </div>
    </li>
  );
}
function Task({
  id,
  title = "",
  startDate = "",
  today = "",
  endDate = "",
  priority = "L",
  land = "",
  product = "",
  employer,
  active,
  onExpend,
}) {

  const [daysLeft, setDaysLeft] = useState(0);
  useEffect(() => {

    const startDates = new Date(startDate);
    const endDates = new Date(endDate);
    const timeDifference = endDates - startDates;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    setDaysLeft(daysDifference);
  }, [startDate, endDate]);
  const isOpen = true
  return (
    <li
      style={isOpen ? { height: "130px" } : { height: "45px" }}
      className={`taskitem flex-class-row w-100 ${daysLeft === 0 ? `expired-task` : ``
        }`}
      role="button"
      onClick={onExpend}
    >
      <div className={`m-2 pe-2 priority ${isOpen ? `h-100 ` : ``}`}>
        <div style={{ width: "15px", height: "15px", borderRadius: "50%" }}
          className={`fs-4 bi ${priority === "L"
            ? ` clow`
            : priority === "M"
              ? `mlow`
              : priority === "H"
                ? `hlo`
                : `emlo`
            }`}
        ></div>
      </div>
      <div className="w-100 flex-class-col ">
        <div
          className={`w-100 p-2 me-auto ${isOpen ? `align-self-start task-content` : ``
            }`}
        >
          {title}
        </div>
        <div className={`notif-info-c details ${isOpen ? `d-flex` : `d-none`}`}>
          {employer ? (
            <Row className="w-100 notif-info-c">
              <Col xs={12} lg={6} style={{ marginTop: "10px" }}>
                <span className="border-start">Start date:</span>
                <span className="notif-span">{startDate}</span>
              </Col>
              <Col xs={12} lg={6} style={{ marginTop: "10px" }}>
                <span className="border-start">End date:</span>
                <span className="notif-span">{endDate}</span>
              </Col>
              <Col xs={12} lg={6} style={{ marginTop: "10px" }}>
                <span className="border-start">Employee:</span>
                <span className="notif-span">{employer.first_name}</span>
              </Col>
              <Col xs={12} lg={6} style={{ marginTop: "10px" }}>
                <span className="border-start">Land:</span>
                <span className="notif-span">{land.title}</span>
              </Col>
              <Col xs={12} lg={6} style={{ marginTop: "10px" }}>
                <span className="border-start">Product:</span>
                <span className="notif-span">{product.name}</span>
              </Col>
              <Col xs={12} lg={6} style={{ marginTop: "10px" }}>
                <div style={{ width: "100%" }} className={` remainday ${isOpen ? `h-100 ` : ``}`}>
                  <div className="flex-class-row" style={{ width: "95px" }}>
                    <span style={{ paddingBottom: "10px" }} className={`${daysLeft === 0 ? `cemergency` : ``} day-notif`}>
                      {daysLeft === 0 ? `Expired!` : `${daysLeft}  days left!`}
                    </span>
                    <span className={`notif-span ${daysLeft === 0 ? `d-block` : `d-none`}`}>
                      {""}
                      <FaExclamationCircle color="red" fontSize={"20"} />
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          ) : (
            <></>
          )}
        </div>
      </div>


    </li>
  );
}

export default NotificationsCom;

