import React, { Dispatch, SetStateAction, useState } from "react";
import Modal from "@/components/Modal";
import Checkbox from "@/components/Checkbox";
import "../styles/modals.scss";
import { managerRoleOptions } from "@/utils/variables/user.variables";

const ModalFilter: React.FC<ModalFilterProps> = ({ setOpen, title }) => {
  const [roles, setRoles] = useState<Record<string, boolean>>(
    managerRoleOptions.reduce((acc, value) => {
      acc[value] = false;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const handleRolesChange = (value: string) => {
    setRoles((prevCheckedValues) => ({
      ...prevCheckedValues,
      [value]: !prevCheckedValues[value],
    }));
  };

  return (
    <Modal
      setOpen={setOpen}
      title={title}
      noButtonText="Cancel"
      goButtonText="Filter" //TODO: add input function props
    >
      <div className="modal-filter-pitchlists-body">
        <div className="modal-filter-pitchlists-section">
          <p className="h2 text-black">role</p>
          {managerRoleOptions.map((role) => (
            <React.Fragment key={role}>
              <Checkbox
                label={role}
                isChecked={roles[role]}
                onClick={() => handleRolesChange(role)}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ModalFilter;

type ModalFilterProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
};
