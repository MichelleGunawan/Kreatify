"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import ModalInfo from "./components/ModalInfo";
import { renderHeader, renderCell } from "./render";
import { TableColumnType } from "@/types/table.type";

// Custom components
import "./styles/index.scss";
import { Tooltip } from "@mui/material";

const Table: React.FC<TableProp> = ({
  data,
  colInfo,
  selectedRowIds,
  setSelectedRowIds,
  isSmall = false,
}) => {
  const [selectedCell, setSelectedCell] = useState<{
    header: string;
    cellContent: string;
  } | null>(null);
  const [modalInfo, setModalInfo] = useState(false);

  return (
    <div className="table">
      {/* Render header*/}
      <div
        className={` 
        table-row ${isSmall ? "hidden" : "hide-when-small"}
        `}
      >
        {colInfo.map(({ headerText, tooltipText }, index) => (
          <React.Fragment key={index}>
            {renderHeader(headerText, tooltipText)}
          </React.Fragment>
        ))}
      </div>

      {data.map((rowData, index) => {
        return (
          <div
            className={` ${isSmall ? "table-row-isSmall" : "table-row"}`}
            key={index}
          >
            {/* Render row data*/}
            {colInfo.map((colData, colIndex) => {
              return (
                <div
                  className={`p2  ${
                    isSmall ? "table-cell-isSmall" : "table-cell"
                  }`}
                  key={colIndex}
                >
                  {colIndex !== 0 && (
                    <div
                      className={`h3  ${
                        isSmall
                          ? "table-card-header-isSmall"
                          : "table-card-header"
                      }`}
                    >
                      {colInfo[colIndex].headerText}
                    </div>
                  )}
                  <div
                    className={`p2 table-cell-content ${
                      colIndex !== 0 && isSmall
                        ? "table-cell-content-isSmall"
                        : ""
                    }`}
                  >
                    {/* Render the cell content for each cell in row */}
                    {renderCell(
                      rowData,
                      colData.dataId,
                      colInfo[colIndex].type,
                      colIndex,
                      colInfo[colIndex].headerText,
                      selectedRowIds,
                      setSelectedRowIds,
                      setSelectedCell,
                      setModalInfo
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      {modalInfo && selectedCell && (
        <ModalInfo
          title={selectedCell.header}
          value={selectedCell.cellContent}
          setOpen={setModalInfo}
        />
      )}
    </div>
  );
};

export default Table;

type TableProp = {
  data: any[];
  colInfo: TableColumnType[];
  selectedRowIds: any[];
  setSelectedRowIds: Dispatch<SetStateAction<any[]>>;
  isSmall?: boolean;
};
