"use client";
import React, { useState } from "react";
import Icon from "@/components/Icon";
import ModalPitchList from "@/components/ModalPitchList";
import Alert from "@/components/Alert";
import { getIconLink } from "@/utils/functions/iconLinks";

// Custom components
import "../styles/index.scss";
import { UUID } from "crypto";
import { COLORS } from "@/utils/constants";

const PitchListActionsCell: React.FC<PitchListActionsCellProp> = ({ id }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  return (
    <>
      <Icon
        link={getIconLink("link")}
        size={24}
        color={COLORS.PRIMARY}
        tooltipText={"Copy Link"}
        onClick={() => {
          navigator.clipboard.writeText(
            "https://app.kreatify.com/pitchlist/" + id
          );
          setShowAlert(true);
        }}
      />
      <Icon
        link={getIconLink("edit")}
        size={24}
        color={COLORS.PRIMARY}
        tooltipText={"Edit Pitch List"}
        onClick={() => setModalOpen(true)}
      />
      {modalOpen && (
        <ModalPitchList
          title="Edit Pitch List"
          setOpen={setModalOpen}
          id={id}
        />
      )}
      {showAlert && (
        <Alert
          text="Link copied!"
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      )}
    </>
  );
};

export default PitchListActionsCell;

type PitchListActionsCellProp = {
  id: UUID;
};
