import { Cell } from '@/components/Cell'
import { CellType } from '@/pages/types';
import _ from 'lodash';
import { useRef, useState } from 'react';

interface IGrid {
    height: number;
    width: number;
}

export const generateGrid = (height: number, width: number): CellType[][] => {
    let grid = []

    for (let i = 0; i < height; i++) {
        let row = [];
        for (let j = 0; j < width; j++) {
            row.push(CellType.CELL);
        }
        grid.push(row);
    }
    return grid;
}



export const Grid: React.FC<IGrid> = ({
    height,
    width
}) => {

    let grid = useRef(generateGrid(height, width));

    const [cellType, setCellType] = useState(CellType.CELL);
    const [isMouseDown, setIsMouseDown] = useState(false);


    const onMouseEnter = (row: number, col: number) => {
        if (cellType !== CellType.BLOCKER || grid.current[row][col] !== CellType.CELL)
        {
            return;
        }
        grid.current[row][col] = cellType;
        setIsMouseDown(!isMouseDown)
    }
    
    const onCellTriggered = (row_index: number, col_index: number) => {
        if (grid.current[row_index][col_index] !== CellType.CELL) {
            return;
        }

        let newType = cellType;

        switch (cellType) {
            case CellType.CELL:
                newType = CellType.START;
                break;
            case CellType.START:
                newType = CellType.END;
                break;
            case CellType.END:
                newType = CellType.BLOCKER;
                break;
        }

        grid.current[row_index][col_index] = newType;

        setCellType(newType);

    }

    return (
        <div className="grid grid-cols-1 gap-4">

            <div className='grid'>
                {
                    grid.current.map((row, rowId) => {
                        return (
                            <div key={`row-${rowId}`} className="flex gap-0 items-center">
                                {row.map((col, colId) => {
                                    return (
                                        <Cell 
                                            key={`${rowId}-${colId}`}
                                            row={rowId} col={colId}
                                            type={grid.current[rowId][colId]}
                                            onMouseEnter={() => onMouseEnter(rowId, colId)} 
                                            
                                            onCellTriggered={onCellTriggered}  />
                                    );
                                })}
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
};