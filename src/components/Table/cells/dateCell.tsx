"use client";
import React from "react";
import { Tooltip } from "@mui/material";
import { formatDateForDisplay } from "@/utils/functions/format.functions";
import "../styles/cells.scss";

const DateCell: React.FC<DateCellProp> = ({ content, onClick }) => {
  return <div onClick={onClick}>{formatDateForDisplay(content)}</div>;
};

export default DateCell;

type DateCellProp = {
  content: string;
  onClick: () => void;
};
