"use client";
import React from "react";
import "../styles/cells.scss";
import { formatNumber } from "@/utils/functions/format.functions";

const NumberCell: React.FC<NumberCellProp> = ({ content, onClick, type }) => {
  return (
    <div onClick={onClick}>
      {type === "money" ? "$" : ""}
      {formatNumber(content)}
    </div>
  );
};

export default NumberCell;

type NumberCellProp = {
  content: number;
  onClick: () => void;
  type: string;
};
