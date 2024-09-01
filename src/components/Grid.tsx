import { Cell } from "@/components/Cell";
import { CellType } from "@/pages/types";
import { useRef, useState } from "react";

interface IGrid {
  height: number;
  width: number;
}

export const generateGrid = (height: number, width: number): CellType[][] => {
  let grid = [];
  for (let i = 0; i < height; i++) {
    let row = [];
    for (let j = 0; j < width; j++) {
      row.push(CellType.CELL);
    }
    grid.push(row);
  }
  return grid;
};

export const Grid: React.FC<IGrid> = ({ height, width }) => {
  const gridRef = useRef(generateGrid(height, width));
  const [clickCount, setClickCount] = useState(0);
  const [, forceUpdate] = useState({});

  const onCellTriggered = (row: number, col: number) => {
    const currentCell = gridRef.current[row][col];

    if (clickCount === 0 && currentCell === CellType.CELL) {
      gridRef.current[row][col] = CellType.START;
      setClickCount(1);
    } else if (clickCount === 1 && currentCell === CellType.CELL) {
      gridRef.current[row][col] = CellType.END;
      setClickCount(2);
    } else {
      if (currentCell === CellType.CELL) {
        gridRef.current[row][col] = CellType.BLOCKER;
      } else if (currentCell === CellType.BLOCKER) {
        gridRef.current[row][col] = CellType.CELL;
      }
    }
    forceUpdate({});
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="grid">
        {gridRef.current.map((row, rowId) => (
          <div key={`row-${rowId}`} className="flex gap-0 items-center">
            {row.map((col, colId) => (
              <Cell
                key={`${rowId}-${colId}`}
                row={rowId}
                col={colId}
                type={gridRef.current[rowId][colId]}
                onCellTriggered={() => onCellTriggered(rowId, colId)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
