import React, { Dispatch, SetStateAction, useState } from "react";
import Modal from "@/components/Modal";
import Checkbox from "@/components/Checkbox";
import { influencerRoleOptions } from "@/utils/variables/user.variables";
import { socialPlatformOptions } from "@/utils/variables/socials.variables";

import "../styles/modals.scss";
import { genderOptions } from "@/utils/variables/onboarding.variables";

const ModalFilterTalent: React.FC<ModalFilterProps> = ({ setOpen, title }) => {
  const [email, setEmail] = useState("");

  const [roles, setRoles] = useState<Record<string, boolean>>(
    influencerRoleOptions.reduce((acc, value) => {
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
      noButtonText="Reset"
      goButtonText="Filter" //TODO: add input function props
    >
      <div className="modal-filter-talent-body">
        <div className="modal-filter-talent-section ">
          <p className="h2 text-black">Exclusive/Non-exclusive</p>
          <div className="modal-filter-talent-checkbox-container two-col">
            {influencerRoleOptions.map((role) => (
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
        <div className="modal-filter-talent-section">
          <p className="h2 text-black">Platforms</p>
          <div className="modal-filter-talent-checkbox-container two-col">
            {socialPlatformOptions.map((role) => (
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
        <div className="modal-filter-talent-section">
          <p className="h2 text-black">Gender</p>
          <div className="modal-filter-talent-checkbox-container three-col">
            {genderOptions.map((role) => (
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
      </div>
    </Modal>
  );
};

export default ModalFilterTalent;

type ModalFilterProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
};
