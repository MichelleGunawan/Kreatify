import React from "react";
import BrandCell from "@/components/Table/cells/brandCell";
import ContactCell from "@/components/Table/cells/contactCell";
import UserPreviewCell from "@/components/Table/cells/userPreviewCell";
import UserPreviewsCell from "@/components/Table/cells/userPreviewsCell";
import TextCell from "@/components/Table/cells/textCell";
import LinkCell from "@/components/Table/cells/linkCell";
import TextMultiselectCell from "@/components/Table/cells/textMultiselectCell";
import NumberCell from "@/components/Table/cells/numberCell";
import SocialCell from "@/components/Table/cells/socialCell";
import "../styles/index.scss";

export const renderCell = (
  type: string,
  cellContent: any,
  setSelectedCell: React.Dispatch<React.SetStateAction<any>>,
  setModalInfo: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!cellContent) {
    return <>--</>;
  }

  switch (type.toLowerCase()) {
    case "text":
      return (
        <TextCell
          content={cellContent}
          onClick={() => {
            setSelectedCell({
              type,
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
              type,
              cellContent,
            }),
              setModalInfo(true);
          }}
        />
      );
    case "userpreview":
      return <UserPreviewCell content={cellContent} />;
    case "userpreviews":
      return (
        <UserPreviewsCell ids={cellContent} totalCount={cellContent.length} />
      );
    case "number":
    case "money":
      return (
        <NumberCell
          content={cellContent}
          onClick={() => {
            setSelectedCell({
              type,
              cellContent,
            }),
              setModalInfo(true);
          }}
          type={type === "money" ? "money" : "number"}
        />
      );
    case "brand":
      return (
        <>
          <BrandCell content={cellContent} />
          {cellContent.brand_name}
        </>
      );
    case "link":
      return <LinkCell content={cellContent} />;
    case "contact":
      return <ContactCell content={cellContent} />;
    case "social":
      return <SocialCell content={cellContent} />;
    default:
      return <></>;
  }
};
