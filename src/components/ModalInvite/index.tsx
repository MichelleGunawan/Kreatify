import React, { Dispatch, SetStateAction, useState } from "react";
import { useGlobalContext } from "@/context";
import Modal from "../Modal";
import InputSelect from "../InputSelect";
import InputText from "../InputText";
import { inviteUser } from "@/services/invites/post_actions";
import { getEmailError } from "@/utils/functions/validation.functions";
import "./styles/index.scss";
import { getInviteInfluencerError } from "@/services/influencers/fetch_actions";
import { getInviteManagerError } from "@/services/managers/post_actions";
import {
  influencerRoleOptions,
  managerRoleOptions,
} from "@/utils/variables/user.variables";

const ModalInvite: React.FC<ModalInviteProps> = ({
  setOpen,
  title,
  setShowAlert,
}) => {
  const { agencyId } = useGlobalContext();
  const [role, setUserRole] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [errors, setErrors] = useState({
    role: "",
    email: "",
  });

  const type = title?.includes("Creator") ? "influencer" : "manager";

  const handleInvite = async () => {
    const emailError = getEmailError(email);
    if (!role || emailError) {
      setErrors({
        role: !role ? "Please select a role" : "",
        email: emailError,
      });
      return;
    }

    if (!agencyId || !role || !email) {
      alert("Error inviting user");
      return;
    }

    // Await the result of the error check before continuing
    let inviteError;
    if (type === "influencer") {
      inviteError = await getInviteInfluencerError({
        email,
        agencyID: agencyId,
        role: role,
      });
    }

    if (type === "manager") {
      inviteError = await getInviteManagerError({
        email,
        agencyID: agencyId,
        role: role,
      });
    }

    // If there's an error, alert and stop execution
    if (inviteError && inviteError !== "") {
      alert(inviteError);
      return;
    }

    // Proceed with inviting the user only if no errors are found
    const id = await inviteUser({
      type: type,
      role: role,
      email: email,
      agency_id: agencyId,
    });

    if (id) {
      navigator.clipboard.writeText(
        `${window.location.origin}/onboarding/invite/${id}`
      );

      setShowAlert(true);
    }

    setOpen(false);
  };

  return (
    <Modal
      setOpen={setOpen}
      title={title}
      noButtonText="Cancel"
      onNoButtonClick={() => setOpen(false)}
      goButtonText="Invite" //TODO: add function props
      onGoButtonClick={handleInvite}
    >
      <div className="modal-invite-body">
        <InputSelect
          label="Role*"
          value={role}
          onChange={setUserRole}
          options={
            type === "influencer" ? influencerRoleOptions : managerRoleOptions
          }
          error={errors.role}
        />
        <InputText
          label="Email*"
          value={email}
          onChange={setEmail}
          error={errors.email}
        />
        {/* <InputFile label="Contract" file={file} onChange={setFile} /> */}
      </div>
    </Modal>
  );
};

export default ModalInvite;

type ModalInviteProps = {
  title?: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
};
