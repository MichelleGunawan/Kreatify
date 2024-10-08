import React, { useState } from "react";
import { renderCell } from "./functions";
import {
  getCampaignColor,
  formatHexToRgba,
} from "@/utils/functions/color.functions";
import "./styles/index.scss";
import "@/styles/card.scss";

const CardInfoCols: React.FC<CardInfoColsProps> = ({ data, cols = 3 }) => {
  // Will be used for modal for info feature
  const [selectedCell, setSelectedCell] = useState<{
    header: string;
    cellContent: string;
  } | null>(null);
  const [modalInfo, setModalInfo] = useState(false);

  return (
    <div className="card">
      <div
        className="display-cols-info-container"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
        }}
      >
        {data.map(({ label, type, value }, index) => (
          <div
            key={index}
            style={{
              borderRight:
                (index + 1) % cols === 0 ? "none" : "1px solid #E5E5E5",
            }}
            className="display-cols-text"
          >
            <div className="p2 text-black ">{label}</div>
            <div className="h2 text-black  display-cols-value">
              {renderCell(
                type ? type : "text",
                value,
                setSelectedCell,
                setModalInfo
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardInfoCols;

type CardInfoColsProps = {
  data: Info[];
  cols?: number;
};

type Info = {
  label: string;
  value: any;
  type?: string;
};
