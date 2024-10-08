import React, { useState, Dispatch, SetStateAction } from "react";
import { useGlobalContext } from "@/context";

import Modal from "@/components/Modal";
import InputText from "@/components/InputText";
import InputSelect from "@/components/InputSelect";
import "../styles/modalEdit.scss";
import InputSelectCountry from "@/components/InputSelectCountry";
import { editUserLocation } from "@/services/settings/post_actions";
import {
  usStatesOptions,
  usCitiesOptions,
} from "@/utils/variables/onboarding.variables";

const ModalEditLocation: React.FC<ModalEditLocationProps> = ({
  setOpen,

  address,
  state,
  city,
  country,
  setAddress,
  setState,
  setCity,
  setCountry,
  updateFrontend,
}) => {
  const { userId } = useGlobalContext();
  const [errors, setErrors] = useState<any>({});

  const handleSave = () => {
    if (!country) {
      setErrors({
        country: "Please select your country",
      });
      return;
    }
    if (userId) {
      editUserLocation(userId, {
        country: country,
        city,
        state,
        address,
      }).then(() => {
        updateFrontend({
          newAddress: address,
          newCity: city,
          newState: state,
          newCountry: country,
        });
      });
    }

    setOpen(false);
  };

  return (
    <Modal
      setOpen={setOpen}
      title={`Edit Location`}
      noButtonText="Cancel"
      onNoButtonClick={() => setOpen(false)}
      goButtonText="Save" //TODO: add function props
      onGoButtonClick={handleSave}
    >
      <div className="modal-edit-body">
        <InputText
          label="Address"
          value={address}
          onChange={(e) => {
            setAddress(e);
          }}
          // error={errors.address}
        />
        <InputSelect
          label="State"
          value={state}
          onChange={(e) => {
            setState(e);
          }}
          options={usStatesOptions}
          // error={errors.state}
        />
        <InputSelect
          label="City"
          value={city}
          onChange={(e) => {
            setCity(e);
          }}
          options={usCitiesOptions}
          // error={errors.city}
        />
        <InputSelectCountry
          label="Country"
          value={country}
          onChange={(e) => {
            setCountry(e);
          }}
          error={errors.country}
        />
      </div>
    </Modal>
  );
};

export default ModalEditLocation;

type ModalEditLocationProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;

  address: string;
  city: string;
  state: string;
  country: any;
  setAddress: Dispatch<SetStateAction<string>>;
  setCity: Dispatch<SetStateAction<string>>;
  setState: Dispatch<SetStateAction<string>>;
  setCountry: Dispatch<SetStateAction<any>>;
  updateFrontend: (newVals: any) => void;
};
