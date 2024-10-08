"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

//Component import
import CustomTabs from "../Tabs";
import Button from "@/components/Button";
import ModalPitchList from "../ModalPitchList";
import { getIconLink } from "@/utils/functions/iconLinks";

//CSS import
import "@/styles/header.scss";

const HeaderPitchLists: React.FC<HeaderPitchListsProps> = ({ tab, setTab }) => {
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateButtonClick = () => {
    setIsCreateModalOpen(true);
  };
  const handleTabChange = (index: number) => {
    setTab(index);
  };

  return (
    <>
      <div className="header">
        <div className="header-left">
          <CustomTabs
            tabs={["My Pitch Lists", "All Pitch Lists"]}
            tab={tab}
            setTab={handleTabChange}
            color="#775FFF"
          />
        </div>
        <div className="header-right">
          <Button
            label="Add Pitch List"
            icon={getIconLink("add")}
            color="#ffffff"
            backgroundColor="#775FFF"
            borderColor="#775FFF"
            width="150px"
            height="40px"
            borderRadius="10px"
            textClass="h3"
            onClick={handleCreateButtonClick}
          />
        </div>
      </div>
      {isCreateModalOpen && (
        <ModalPitchList
          title="Create Pitch List"
          setOpen={setIsCreateModalOpen}
        />
      )}
    </>
  );
};

export default HeaderPitchLists;

type HeaderPitchListsProps = {
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
};
