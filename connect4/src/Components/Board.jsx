import Cell from './Cell';

const Board = ({ board, handleClick }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <Cell key={colIndex} value={cell} onClick={() => handleClick(colIndex)} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;