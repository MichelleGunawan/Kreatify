"use client";
import React, { useState, Dispatch, SetStateAction } from "react";

//Component import
import Button from "@/components/Button";
import CustomTabs from "@/components/Tabs";
import ModalInvite from "@/components/ModalInvite";
import ModalEditInfluencerTeam from "../ModalEditInfluencerTeam";
import { getIconLink } from "@/utils/functions/iconLinks";

//CSS import
import "@/styles/header.scss";
import Alert from "../Alert";

const HeaderInfluencers: React.FC<HeaderInfluencersProps> = ({
  tab,
  setTab,
}) => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isEditManagersModalOpen, setIsEditManagersModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleTabChange = (index: number) => {
    setTab(index);
  };

  const handleInviteButtonClick = () => {
    setIsInviteModalOpen(true);
  };

  const handleEditManagersButtonClick = () => {
    setIsEditManagersModalOpen(true);
  };

  return (
    <>
      <div className="header">
        <div className="header-left">
          <CustomTabs
            tabs={["My Creators", "All Creators"]}
            tab={tab}
            setTab={handleTabChange}
            color="#775FFF"
          />
        </div>
        <div className="header-right">
          <Button
            label="Edit Teams"
            icon={getIconLink("team")}
            color="#775FFF"
            borderColor="#775FFF"
            width="140px"
            height="40px"
            borderRadius="10px"
            textClass="h3"
            onClick={handleEditManagersButtonClick}
          />
          <Button
            label="Add Creator"
            icon={getIconLink("add")}
            color="#ffffff"
            backgroundColor="#775FFF"
            borderColor="#775FFF"
            width="140px"
            height="40px"
            borderRadius="10px"
            textClass="h3"
            onClick={handleInviteButtonClick}
          />
        </div>
      </div>
      {isInviteModalOpen && (
        <ModalInvite
          title="Invite Creator"
          setOpen={setIsInviteModalOpen}
          setShowAlert={setShowAlert}
        />
      )}

      {isEditManagersModalOpen && (
        <ModalEditInfluencerTeam setOpen={setIsEditManagersModalOpen} />
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

export default HeaderInfluencers;
type HeaderInfluencersProps = {
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
};
