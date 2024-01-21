function AllNotifs({ number, children }) {
  return (
    <div className="notifList">
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
      <ul className="listcroll w-100">{children}</ul>
    </div>
  );
}

export default AllNotifs;
