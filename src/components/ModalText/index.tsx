import React, { Dispatch, SetStateAction, useState } from "react";
import Modal from "@/components/Modal";
import "./styles/index.scss";

const ModalText: React.FC<ModalTextProps> = ({
  setOpen,
  title,
  text,
  goButtonText,
  onGoButtonClick,
}) => {
  return (
    <Modal
      setOpen={setOpen}
      title={title}
      goButtonText={goButtonText}
      onGoButtonClick={onGoButtonClick}
    >
      <div className="modal-text-menu-body">
        <p className="p2 text-black"> {text} </p>
      </div>
    </Modal>
  );
};

export default ModalText;

type ModalTextProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  text?: string;
  goButtonText?: string;
  onGoButtonClick?: () => void;
};
