import React, { Dispatch, SetStateAction, useState } from "react";
import Modal from "../Modal";
import InputSelect from "../InputSelect";
import InputText from "../InputText";
import InputFile from "../InputFile";
import "./styles/index.scss";

const ModalConfirmDelete: React.FC<ModalConfirmDeleteProps> = ({
  setOpen,
  number,
  onDelete,
}) => {
  const handleDelete = () => {
    setOpen(false);
    onDelete();
  };
  return (
    <Modal
      setOpen={setOpen}
      noButtonText="Cancel"
      onNoButtonClick={() => setOpen(false)}
      goButtonText="Delete" //TODO: add function props
      onGoButtonClick={handleDelete}
    >
      <p className="h1 modal-confirm-text">
        Are you sure you want to delete {number} item(s)?
      </p>
      <p className="p1 modal-confirm-text">
        WARNING: This action is irreversible.
      </p>
    </Modal>
  );
};

export default ModalConfirmDelete;

type ModalConfirmDeleteProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  number: number;
  onDelete: () => void;
};
