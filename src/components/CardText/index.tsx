import React, { useState } from "react";
// Custom components
import { getIconLink } from "@/utils/functions/iconLinks";
import ModalEdit from "./modals/ModalEdit";
import Icon from "../Icon";

import "./styles/index.scss";
import "@/styles/card.scss";
import { COLORS } from "@/utils/constants";

const CardText: React.FC<CardTextProps> = ({
  label,
  value,
  labelColor,
  valueColor,
  color = "#ffffff",
  shadowColor = "rgba(73, 98, 216, 0.12)",
  onEdit,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  return (
    <>
      <div
        className="card"
        style={{
          backgroundColor: color,
          boxShadow: `5px 10px 50px 0px ${shadowColor}`,
        }}
      >
        <div
          className="full-width flex-row"
          style={{ justifyContent: "space-between" }}
        >
          {label && (
            <div className="p2" style={{ color: labelColor }}>
              {label}
            </div>
          )}
          {onEdit && (
            <Icon
              link={getIconLink("edit")}
              color={COLORS.PRIMARY}
              onClick={() => setIsEditModalOpen(true)}
            />
          )}
        </div>
        <p
          className="h2 "
          style={{ color: valueColor, whiteSpace: "pre-wrap" }}
        >
          {value}
        </p>
      </div>
      {isEditModalOpen && onEdit && (
        <ModalEdit
          title={`Edit ${label}`}
          currentValue={value}
          setOpen={setIsEditModalOpen}
          onEdit={onEdit}
        />
      )}
    </>
  );
};

export default CardText;

type CardTextProps = {
  label?: string;
  value: string;
  cols?: number;
  color?: string;
  shadowColor?: string;
  labelColor?: string;
  valueColor?: string;
  onEdit?: (value: string) => void;
};
