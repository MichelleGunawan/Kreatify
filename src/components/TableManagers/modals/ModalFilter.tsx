import React, { Dispatch, SetStateAction, useState } from "react";
import Modal from "@/components/Modal";
import InputMultiselect from "@/components/InputMultiselect";
import { ManagersFiltersType } from "@/types/table.type";
import "../styles/modals.scss";

const ModalFilter: React.FC<ModalFilterProps> = ({
  setOpen,
  title,
  setFilters,
  roleFilters,
}) => {
  const roleOptions = ["Owner", "Campaign", "Talent"];
  const [newRoleFilters, setNewRoleFilters] = useState(roleFilters);

  const handleReset = () => {
    setNewRoleFilters([]);
    setOpen(false);
  };

  const handleFilter = () => {
    setFilters({ roleFilters: newRoleFilters });
    setOpen(false);
  };

  return (
    <Modal
      setOpen={setOpen}
      title={title}
      noButtonText="Reset"
      onNoButtonClick={handleReset}
      goButtonText="Filter"
      onGoButtonClick={handleFilter}
    >
      <div className="modal-filter-managers-body">
        <div className="modal-filter-managers-section ">
          <InputMultiselect
            label="Select Role"
            options={roleOptions}
            value={newRoleFilters}
            onChange={setNewRoleFilters}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalFilter;

type ModalFilterProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  setFilters: (filters: ManagersFiltersType) => void;
  roleFilters: string[];
};
