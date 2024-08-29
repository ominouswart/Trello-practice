const Cell = ({ value, onClick }) => {
  return (
    <div className="cell" onClick={onClick}>
      {value && <div className={`disc ${value}`}></div>}
    </div>
  );
};

export default Cell;