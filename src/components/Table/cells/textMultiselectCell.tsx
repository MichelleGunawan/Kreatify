"use client";
import React from "react";
import { formatListWithComma } from "@/utils/functions/format.functions";
import { Tooltip } from "@mui/material";
import "../styles/index.scss";

const TextMultiselectCell: React.FC<TextMultiselectCellProp> = ({
  content,
  onClick,
}) => {
  return <div onClick={onClick}>{formatListWithComma(content)}</div>;
};

export default TextMultiselectCell;

type TextMultiselectCellProp = {
  content: string[];
  onClick: () => void;
};
