"use client";
import React from "react";
import { Tooltip } from "@mui/material";
import { formatString } from "@/utils/functions/format.functions";
import "../styles/cells.scss";

const TextCell: React.FC<TextCellProp> = ({ content, onClick }) => {
  return <div onClick={onClick}>{formatString(content)}</div>;
};

export default TextCell;

type TextCellProp = {
  content: string;
  onClick: () => void;
};
