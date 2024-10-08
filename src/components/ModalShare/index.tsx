import React, { Dispatch, SetStateAction, useState } from "react";
import Modal from "../Modal";
import InputSelect from "../InputSelect";
import InputText from "../InputText";
import InputFile from "../InputFile";
import "./styles/index.scss";
import Button from "../Button";
import { getIconLink } from "@/utils/functions/iconLinks";
import { COLORS } from "@/utils/constants";

const ModalShare: React.FC<ModalShareProps> = ({
  setOpen,
  title = "Share",
  link,
  onCopyLink,
}) => {
  const [role, setUserRole] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [errors, setErrors] = useState({
    role: "",
    email: "",
  });

  const handleInvite = () => {
    if (!role || !email) {
      setErrors({
        role: !role ? "Please select a role" : "",
        email: !email ? "Please enter an email" : "",
      });
      return;
    }
    setOpen(false);
  };

  return (
    <Modal setOpen={setOpen} title={title} scroll={false}>
      <div className="modal-share-body">
        <div className="modal-share-link-container">{link}</div>
        <div className="modal-share-buttons-container">
          <Button
            icon={getIconLink("link")}
            label="Copy Link"
            color={COLORS.PRIMARY}
            borderColor={COLORS.PRIMARY}
            width="100%"
            height="50px"
            borderRadius="10px"
            compress={false}
            onClick={onCopyLink}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalShare;

type ModalShareProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  link?: string;
  onCopyLink?: () => void;
};
