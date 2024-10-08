import React, { Dispatch, SetStateAction, useState } from "react";
import Modal from "@/components/Modal";
import { formatListWithComma } from "@/utils/functions/format.functions";
import "../styles/modals.scss";

const ModalInfo: React.FC<ModalInfoProps> = ({ setOpen, title, value }) => {
  return (
    <Modal setOpen={setOpen} title={title}>
      <div className="modal-context-menu-body">
        <p className="p2 text-black">
          {typeof value === "object" ? formatListWithComma(value) : value}
        </p>
      </div>
    </Modal>
  );
};

export default ModalInfo;

type ModalInfoProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  value: string | string[] | number;
};
