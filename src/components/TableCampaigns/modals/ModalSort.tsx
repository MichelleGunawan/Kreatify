import React, { Dispatch, SetStateAction, useState } from "react";
import { useGlobalContext } from "@/context";
import Modal from "@/components/Modal";
import { getSortOptions } from "../functions/modal.functions";
import "../styles/modals.scss";

import InputSelect from "@/components/InputSelect";
import { CampaignStatusType } from "@/types/campaign.type";

const ModalSort: React.FC<ModalSortProps> = ({
  setOpen,
  title,
  campaignStatus,
  setSort,
  sortBy,
  sortOrder,
}) => {
  const { userPermission } = useGlobalContext();
  const [newSortBy, setNewSortBy] = useState(sortBy);
  const [newSortOrder, setNewSortOrder] = useState(sortOrder);

  const handleReset = () => {
    setNewSortBy("");
    setNewSortOrder("");
  };

  const handleSort = () => {
    setSort({ sortBy: newSortBy, sortOrder: newSortOrder });
    setOpen(false);
  };

  return (
    <Modal
      setOpen={setOpen}
      title={title}
      noButtonText="Reset"
      onNoButtonClick={handleReset}
      goButtonText="Sort"
      onGoButtonClick={handleSort}
    >
      <div className="modal-filter-campaigns-body">
        <InputSelect
          label="Sort by"
          options={getSortOptions(campaignStatus, userPermission)}
          value={newSortBy}
          onChange={setNewSortBy}
        />
        <InputSelect
          label="Order"
          options={["Ascending", "Descending"]}
          value={newSortOrder}
          onChange={setNewSortOrder}
        />
      </div>
    </Modal>
  );
};

export default ModalSort;

type ModalSortProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  setSort: (sort: { sortBy: string; sortOrder: string }) => void;
  campaignStatus: CampaignStatusType;
  sortBy: string;
  sortOrder: string;
};
