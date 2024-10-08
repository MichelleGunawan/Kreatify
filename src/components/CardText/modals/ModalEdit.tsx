import React, { Dispatch, SetStateAction, useState } from "react";
import Modal from "@/components/Modal";
import InputText from "@/components/InputText";
import "../styles/modals.scss";

const ModalEdit: React.FC<ModalEditProps> = ({
  setOpen,
  title,
  currentValue,
  onEdit,
}) => {
  const [newValue, setNewValue] = useState(currentValue);

  const handleSave = () => {
    onEdit(newValue);
    setOpen(false);
  };

  return (
    <Modal
      setOpen={setOpen}
      title={title}
      noButtonText="Cancel"
      onNoButtonClick={() => setOpen(false)}
      goButtonText="Save"
      onGoButtonClick={handleSave}
    >
      <InputText value={newValue} onChange={setNewValue} maxRows={5} />
    </Modal>
  );
};

export default ModalEdit;

type ModalEditProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  currentValue: string;
  onEdit: (value: string) => void;
};
