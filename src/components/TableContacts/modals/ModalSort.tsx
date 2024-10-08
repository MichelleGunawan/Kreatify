import React, { Dispatch, SetStateAction, useState } from "react";
import { useGlobalContext } from "@/context";
import Modal from "@/components/Modal";
import { ContactsTableRowType } from "@/types/table.type";
import "../styles/modals.scss";

import InputSelect from "@/components/InputSelect";

const ModalSort: React.FC<ModalSortProps> = ({
  setOpen,
  title,
  setSort,
  sortBy,
  sortOrder,
}) => {
  const [newSortBy, setNewSortBy] = useState(sortBy);
  const [newSortOrder, setNewSortOrder] = useState(sortOrder);

  const sortOptions = [
    "Partnership Value",
    "Last Partnership Date",
    "Average Partnership Value",
    "Type",
  ];

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
          options={sortOptions}
          value={newSortBy}
          onChange={(value) => setNewSortBy(value)}
        />
        <InputSelect
          label="SortOrder"
          options={["Ascending", "Descending"]}
          value={newSortOrder}
          onChange={(value) => setNewSortOrder(value)}
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
  sortBy: string;
  sortOrder: string;
};
