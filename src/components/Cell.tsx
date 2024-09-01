import { CellType } from "@/pages/types";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { extendVariants } from "@nextui-org/react";

export const CellButton = extendVariants(Button, {
  variants: {
    color: {
      olive: "text-[#000] bg-[#84cc16]",
      orange: "bg-[#ff8c00] text-[#fff]",
      violet: "bg-[#8b5cf6] text-[#fff]",
    },
    isDisabled: {
      true: "bg-[#eaeaea] text-[#000] opacity-50 cursor-not-allowed",
    },
  },
  defaultVariants: {
    color: "primary",
  },
  compoundVariants: [
    {
      isDisabled: true,
      color: "primary",
    },
  ],
});

interface ICell {
  row: number;
  col: number;
  type: CellType;
  onCellTriggered: () => void;
}

export const Cell: React.FC<ICell> = ({ row, col, type, onCellTriggered }) => {
  const getCellColor = () => {
    switch (type) {
      case CellType.BLOCKER:
        return "violet";
      case CellType.START:
        return "olive";
      case CellType.END:
        return "orange";
      case CellType.CELL:
      default:
        return "primary";
    }
  };

  const displayCell = () => {
    switch (type) {
      case CellType.START:
        return (
          <Image width={30} height={30} alt="start" src="/assets/Start.png" />
        );
      case CellType.END:
        return (
          <Image
            width={30}
            height={30}
            alt="end"
            src="/assets/Destination.jpg"
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <CellButton
      key={`node-${row}-${col}`}
      isIconOnly
      color={getCellColor()}
      radius="none"
      variant="bordered"
      className="cell"
      onClick={onCellTriggered}
    >
      {displayCell()}
    </CellButton>
  );
};
