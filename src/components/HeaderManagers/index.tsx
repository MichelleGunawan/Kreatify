"use client";
import React, { useState, Dispatch, SetStateAction } from "react";

//Component import
import Button from "@/components/Button";
import ModalInvite from "@/components/ModalInvite";
import ModalEditManagerTeam from "../ModalEditManagerTeam";
import { getIconLink } from "@/utils/functions/iconLinks";

//CSS import
import "@/styles/header.scss";
import Alert from "../Alert";

const HeaderManagers: React.FC<HeaderManagersProps> = ({}) => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isEditTeamModalOpen, setIsEditTeamModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInviteButtonClick = () => {
    setIsInviteModalOpen(true);
  };

  const handleEditTeamButtonClick = () => {
    setIsEditTeamModalOpen(true);
  };

  return (
    <>
      <div className="header">
        <div className="header-left"></div>
        <div className="header-right">
          <Button
            label="Edit Teams"
            icon={getIconLink("team")}
            color="#775FFF"
            borderColor="#775FFF"
            width="130px"
            height="40px"
            borderRadius="10px"
            textClass="h3"
            onClick={handleEditTeamButtonClick}
          />
          <Button
            label="Add Manager"
            icon={getIconLink("add")}
            color="#ffffff"
            backgroundColor="#775FFF"
            borderColor="#775FFF"
            width="130px"
            height="40px"
            borderRadius="10px"
            textClass="h3"
            onClick={handleInviteButtonClick}
          />
        </div>
      </div>
      {isEditTeamModalOpen && (
        <ModalEditManagerTeam setOpen={setIsEditTeamModalOpen} />
      )}
      {isInviteModalOpen && (
        <ModalInvite
          title="Invite Manager"
          setOpen={setIsInviteModalOpen}
          setShowAlert={setShowAlert}
        />
      )}

      {showAlert && (
        <Alert
          text="Invite sent! Link copied."
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      )}
    </>
  );
};

export default HeaderManagers;
type HeaderManagersProps = {};
