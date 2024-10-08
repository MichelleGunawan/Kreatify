import { COLORS } from "@/utils/constants";
import React from "react";

interface SeparatorProps {
  color?: string;
  direction?: string;
  width?: string;
  height?: string;
}

const Separator: React.FC<SeparatorProps> = ({
  color = COLORS.GREY300,
  direction = "horizontal",
  width,
  height,
}) => {
  return (
    <div
      style={{
        display: "flex",
        height: direction === "vertical" ? (height ? height : "100%") : "1px",
        width: direction === "vertical" ? "1px" : width ? width : "100%",
        backgroundColor: color,
      }}
    />
  );
};

export default Separator;
