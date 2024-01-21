export function Tab({ num, active, onClick, name }) {
  return (
    <button
      className={`newtab ms-1 ms-md-3 ${num === active ? `active` : ``}`}
      onClick={() => onClick(num)}
    >
      {name}
    </button>
  );
}
