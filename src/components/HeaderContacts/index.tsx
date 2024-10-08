"use client";
import React, { useState, Dispatch, SetStateAction } from "react";

//Component import
import Button from "@/components/Button";
import CustomTabs from "@/components/Tabs";
import ModalContact from "../ModalContact";
import { getIconLink } from "@/utils/functions/iconLinks";

//CSS import
import "@/styles/header.scss";
import { ContactType } from "@/types/contact.type";

const HeaderContacts: React.FC<HeaderContactsProps> = ({
  tab,
  setTab,
  createContact,
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const handleTabChange = (index: number) => {
    setTab(index);
  };
  const handleCreateButtonClick = () => {
    setIsCreateModalOpen(true);
  };

  return (
    <>
      <div className="header">
        <div className="header-left">
          <CustomTabs
            tabs={["My Contacts", "All Contacts"]}
            tab={tab}
            setTab={handleTabChange}
            color="#775FFF"
          />
        </div>
        <div className="header-right">
          <Button
            label="Add Contact"
            icon={getIconLink("add")}
            color="#ffffff"
            backgroundColor="#775FFF"
            borderColor="#775FFF"
            width="140px"
            height="40px"
            borderRadius="10px"
            textClass="h3"
            onClick={handleCreateButtonClick}
          />
        </div>
      </div>
      {isCreateModalOpen && (
        <ModalContact
          title="Create Contacts"
          setOpen={setIsCreateModalOpen}
          onCreate={createContact}
        />
      )}
    </>
  );
};

export default HeaderContacts;
type HeaderContactsProps = {
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
  createContact: (contact: ContactType) => void;
};
