"use client";
import React from "react";
import { LinkType } from "@/types/utils.type";
import "../styles/cells.scss";

const LinkCell: React.FC<LinkCellProp> = ({ content }) => {
  return (
    <a href={content.link} target="_blank" rel="noopener noreferrer">
      <div>{content.text}</div>
    </a>
  );
};

export default LinkCell;

type LinkCellProp = {
  content: LinkType;
};
