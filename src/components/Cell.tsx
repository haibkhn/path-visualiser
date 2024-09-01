import { CellType } from "@/pages/types";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { extendVariants } from "@nextui-org/react";
import { Dispatch, HTMLAttributes, SetStateAction } from "react";

export const CellButton = extendVariants(Button, {
  variants: {
    // <- modify/add variants
    color: {
      olive: "text-[#000] bg-[#84cc16]",
      orange: "bg-[#ff8c00] text-[#fff]",
      violet: "bg-[#8b5cf6] text-[#fff]",
    },
    isDisabled: {
      true: "bg-[#eaeaea] text-[#000] opacity-50 cursor-not-allowed",
    },
    // size: {
    //   xs: "px-2 min-w-12 h-6 text-tiny gap-1 rounded-small",
    //   md: "px-4 min-w-20 h-10 text-small gap-2 rounded-small",
    //   xl: "px-8 min-w-28 h-14 text-large gap-4 rounded-medium",
    // },
  },
  defaultVariants: {
    // <- modify/add default variants
    color: "primary",
    // size: "xl",
  },
  compoundVariants: [
    // <- modify/add compound variants
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
  onCellTriggered: (row: number, col: number) => void;
  onMouseEnter: (e: React.MouseEvent) => void;
}

export const Cell: React.FC<ICell> = ({
  row,
  col,
  type,
  onCellTriggered,
  onMouseEnter,
}) => {
  const onOpened = (e: React.MouseEvent) => {
    onCellTriggered(row, col);
  };

  const getCellColor = () => {
    switch (type) {
      case CellType.BLOCKER:
        return "olive";
      case CellType.CELL:
        return "primary";
      default:
        return "primary";
    }
  };

  const displayCell = () => {
    switch (type) {
      case CellType.START:
        return (
          <Image width={30} height={30} alt="end" src="/assets/Start.png" />
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
      onClick={onOpened}
      onMouseEnter={onMouseEnter}
    >
      {displayCell()}
    </CellButton>
  );
};
