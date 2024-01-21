import dayjs from 'dayjs'

function Notif({ text, date , time , read , onShow }) {

const fomatDate=dayjs(date)
const formatValueData=fomatDate.format("YYYY/MM/DD")
const fomatTime=dayjs(date)
const formatValueTime=fomatDate.format("HH:MM")
  return (
    <li className="notification" role="button" onClick={onShow}>
      <i
        className={`mx-2 notif-icon bi ${
          read
            ? `bi-envelope-open text-dark-green`
            : `bi-envelope-fill text-green`
        }`}
      ></i>
      <div className="notif-data text-dark-green">
        <div
          className={`notif-text ${
            read ? `text-dark-green` : `text-green font-custom`
          }`}
        >
          <span>{text}</span>
        </div>
        <div className="notif-info">
          <div className="notif-date">{formatValueData}</div>
          <div className="notif-time">{formatValueTime}</div>
        </div>
      </div>
    </li>
  );
}

export default Notif;
