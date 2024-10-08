import React, { Dispatch, SetStateAction, useState } from "react";
import { useGlobalContext } from "@/context";
import Modal from "@/components/Modal";
import InputSelect from "@/components/InputSelect";
import "../styles/modals.scss";

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
    "Campaigns Created",
    "Campaigns Managed",
    "Value Created",
    "Value Managed",
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
          value={newSortBy || ""}
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
  setSort: (sort: { sortBy: string | null; sortOrder: string }) => void;
  sortBy: string | null;
  sortOrder: string;
};
