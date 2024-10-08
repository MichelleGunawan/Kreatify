import React, { Dispatch, SetStateAction, useState } from "react";
import Modal from "../Modal";
import InputSelect from "../InputSelect";
import InputText from "../InputText";
import { ContactType } from "@/types/contact.type";
import { useGlobalContext } from "@/context";
import { getEmailError } from "@/utils/functions/validation.functions";
import "./styles/index.scss";

const ModalContact: React.FC<ModalContactProps> = ({
  setOpen,
  title,
  onCreate,
}) => {
  const { agencyId, managerId } = useGlobalContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [brand, setBrand] = useState("");
  const [position, setPosition] = useState("");
  const [type, setType] = useState<string>("Brand");

  const [errors, setErrors] = useState({
    name: "",
    brand: "",
    position: "",
    type: "",
  });
  const [emailError, setEmailError] = useState("");

  const typeOptions = ["brand", "agency", "music"];

  const handleCreate = () => {
    const emailErrorValue = getEmailError(email);
    setEmailError(emailErrorValue);

    if (!name || !brand || !position || !type) {
      setErrors({
        name: !name ? "Please select a name" : "",
        brand: !brand ? "Please select a brand" : "",
        position: !position ? "Please select a position" : "",
        type: !type ? "Please select a type" : "",
      });
      return;
    }

    if (
      agencyId &&
      managerId &&
      (type === "Brand" || type === "Agency" || type === "Music")
    ) {
      onCreate({
        agency_id: agencyId,
        manager_id: managerId,
        name,
        email,
        brand,
        position,
        type,
      });
    }

    setOpen(false);
  };

  return (
    <Modal
      setOpen={setOpen}
      title={title}
      noButtonText="Cancel"
      onNoButtonClick={() => setOpen(false)}
      goButtonText="Create" //TODO: add function props
      onGoButtonClick={handleCreate}
    >
      <div className="modal-contact-body">
        <InputText
          label="Name*"
          value={name}
          onChange={setName}
          error={errors.name}
        />
        <InputText
          label="Email*"
          value={email}
          onChange={(value) => {
            setEmail(value);
            setEmailError("");
          }}
          error={emailError}
        />
        <InputText
          label="Brand*"
          value={brand}
          onChange={setBrand}
          error={errors.brand}
        />
        <InputText
          label="Position*"
          value={position}
          onChange={setPosition}
          error={errors.position}
        />
        <InputSelect
          label="Type*"
          value={type as string}
          onChange={setType as Dispatch<SetStateAction<String>>}
          options={typeOptions}
          error={errors.type}
        />
      </div>
    </Modal>
  );
};

export default ModalContact;

type ModalContactProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  onCreate: (newContact: ContactType) => void;
};
