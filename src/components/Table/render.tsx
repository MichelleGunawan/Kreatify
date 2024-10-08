import React from "react";
import ContactCell from "./cells/contactCell";
import TextCell from "./cells/textCell";
import NumberCell from "./cells/numberCell";
import LinkCell from "./cells/linkCell";
import UserCell from "./cells/userCell";
import CampaignCell from "./cells/campaignCell";
import SocialCell from "./cells/socialCell";
import PaymentStatusCell from "./cells/paymentStatusCell";
import TextMultiselectCell from "./cells/textMultiselectCell";
import ProgressBarCell from "./cells/progressBarCell";
import PitchListCell from "./cells/pitchListCell";
import UserPreviewCell from "./cells/userPreviewCell";
import UserPreviewsCell from "./cells/userPreviewsCell";
import PitchListActionsCell from "./cells/pitchListActionsCell";
import ContactsCell from "./cells/contactsCell";
import { Tooltip } from "@mui/material";
import "./styles/index.scss";
import BrandCell from "./cells/brandCell";
import DateCell from "./cells/dateCell";
import { UUID } from "crypto";
import AgencyPreviewCell from "./cells/agencyPreviewCell";
import { convertToUUIDArray } from "@/utils/functions/converter.functions";

export const renderHeader = (
  header: string,
  tooltipText: string = "",
  fixed: boolean = false
) => (
  <div className={`table-cell ${fixed ? "table-cell-fixed" : ""}`}>
    <Tooltip title={tooltipText} placement="top">
      <div
        className="h3 table-row-header"
        style={{
          textOverflow: "ellipsis",
        }}
      >
        {header}
      </div>
    </Tooltip>
  </div>
);

export const renderCell = (
  rowData: any,
  dataIds: string[],
  type: string,
  colIndex: number,
  header: string,
  selectedRowIds: number[] | string[],
  setSelectedRowIds: React.Dispatch<React.SetStateAction<number[] | string[]>>,
  setSelectedCell: React.Dispatch<React.SetStateAction<any>>,
  setModalInfo: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const cellContent = rowData[dataIds[0]];
  const extraCellData = rowData[dataIds[1]];
  const rowId = rowData["id"];
  if (!cellContent && cellContent !== 0) {
    return <>--</>;
  }

  switch (type.toLowerCase()) {
    case "user":
      return (
        <UserCell
          content={cellContent}
          id={rowId}
          selected={convertToUUIDArray(selectedRowIds)}
          onSelect={
            setSelectedRowIds as React.Dispatch<React.SetStateAction<UUID[]>>
          }
        />
      );
    case "campaign":
      return (
        <CampaignCell
          category={rowData["category"]}
          brand={rowData["brand"]}
          content={cellContent}
          id={rowId}
          selected={convertToUUIDArray(selectedRowIds)}
          onSelect={
            setSelectedRowIds as React.Dispatch<React.SetStateAction<UUID[]>>
          }
        />
      );
    case "pitchlist":
      return (
        <PitchListCell
          content={cellContent}
          id={rowId}
          selected={convertToUUIDArray(selectedRowIds)}
          onSelect={
            setSelectedRowIds as React.Dispatch<React.SetStateAction<UUID[]>>
          }
        />
      );
    case "contacts":
      return (
        <ContactsCell
          content={cellContent}
          id={rowId}
          selected={selectedRowIds as number[]}
          onSelect={
            setSelectedRowIds as React.Dispatch<React.SetStateAction<number[]>>
          }
        />
      );
    case "date":
      return (
        <DateCell
          content={cellContent}
          onClick={() => {
            setSelectedCell({
              header,
              cellContent,
            }),
              setModalInfo(true);
          }}
        />
      );
    case "text":
      return (
        <TextCell
          content={cellContent}
          onClick={() => {
            setSelectedCell({
              header,
              cellContent,
            }),
              setModalInfo(true);
          }}
        />
      );
    case "textmultiselect":
      return (
        <TextMultiselectCell
          content={cellContent}
          onClick={() => {
            setSelectedCell({
              header,
              cellContent,
            }),
              setModalInfo(true);
          }}
        />
      );
    case "agencypreview":
      return <AgencyPreviewCell agencyId={cellContent} />;
    case "userpreview":
      return <UserPreviewCell content={cellContent} />;
    case "userpreviews":
      return (
        <UserPreviewsCell ids={cellContent} totalCount={rowData[dataIds[1]]} />
      );
    case "number":
    case "money":
      return (
        <NumberCell
          content={cellContent}
          onClick={() => {
            setSelectedCell({
              header,
              cellContent,
            }),
              setModalInfo(true);
          }}
          type={type === "money" ? "money" : "number"}
        />
      );
    case "brand":
      return <BrandCell content={cellContent} />;
    case "link":
      return <LinkCell content={cellContent} />;
    case "contact":
      return <ContactCell content={cellContent} />;
    case "social":
      return <SocialCell content={cellContent} />;
    case "progressbar":
      return (
        <ProgressBarCell
          content={cellContent}
          tooltipText={`Next Milestone: ${extraCellData}`}
        />
      );
    case "paymentstatus":
      return <PaymentStatusCell id={rowId} content={cellContent} />;
    case "pitchlistactions":
      return <PitchListActionsCell id={rowId} />;
    default:
      return <></>;
  }
};
