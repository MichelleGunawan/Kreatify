import React, { useState, Dispatch, SetStateAction } from "react";
import { useGlobalContext } from "@/context";
import Modal from "@/components/Modal";
import InputText from "@/components/InputText";
import { getPasswordError } from "@/utils/functions/validation.functions";
import "../styles/modalEdit.scss";
import { changePassword } from "@/services/auth/post_actions";

const ModalEditPassword: React.FC<ModalEditPasswordProps> = ({ setOpen }) => {
  const { userId } = useGlobalContext();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<any>({});

  return (
    <Modal
      setOpen={setOpen}
      title={`Edit Password`}
      noButtonText="Cancel"
      onNoButtonClick={() => setOpen(false)}
      goButtonText="Save" //TODO: add function props
      onGoButtonClick={async () => {
        const passwordErrors = getPasswordError(newPassword, confirmPassword);
        setErrors(passwordErrors);

        if (!passwordErrors.password && !passwordErrors.confirmPassword) {
          //TODO: add save
          const response = await changePassword({
            currentPassword,
            newPassword,
          });

          if (response) {
            setErrors({ confirmPassword: response });
            return;
          }

          setOpen(false);
        }
      }}
    >
      <div className="modal-password-body">
        <InputText
          placeholder="Current Password"
          value={currentPassword}
          onChange={setCurrentPassword}
          type="password"
          error={errors.currentPassword}
        />

        <InputText
          placeholder="New Password"
          value={newPassword}
          onChange={setNewPassword}
          type="password"
          error={errors.password}
        />

        <InputText
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          type="password"
          error={errors.confirmPassword}
        />
      </div>
    </Modal>
  );
};

export default ModalEditPassword;

type ModalEditPasswordProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};
