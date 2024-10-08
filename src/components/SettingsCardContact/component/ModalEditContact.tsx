import React, { useState, Dispatch, SetStateAction } from "react";
import { useGlobalContext } from "@/context";
import Modal from "@/components/Modal";
import InputText from "@/components/InputText";
import { editUserContact } from "@/services/settings/post_actions";
import { getPhoneError } from "@/utils/functions/validation.functions";
import "../styles/modalEdit.scss";

const ModalEditContact: React.FC<ModalEditContactProps> = ({
  setOpen,
  firstName,
  lastName,
  phone,
  whatsapp,
  setFirstName,
  setLastName,
  setPhone,
  setWhatsapp,
  updateFrontend,
}) => {
  const { userId } = useGlobalContext();
  const [errors, setErrors] = useState<any>({});

  const handleSave = () => {
    if (!firstName || !lastName || getPhoneError(phone)) {
      setErrors({
        firstName: !firstName ? "Please enter your first name" : "",
        lastName: !lastName ? "Please enter your last name" : "",
        phone: getPhoneError(phone),
      });

      return;
    }
    if (userId) {
      editUserContact(userId, {
        firstName,
        lastName,
        phone,
        whatsapp,
      })
        .then(() => {
          updateFrontend({
            newFirstName: firstName,
            newLastName: lastName,
            newPhone: phone,
            newWhatsapp: whatsapp,
          });
        })
        .catch((error) => {
          console.error(error);
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
        <div className="grid grid-cols-2">
          <InputText
            label="First Name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e);
            }}
            error={errors.firstName}
          />
          <InputText
            label="Last Name"
            value={lastName}
            onChange={(e) => {
              setLastName(e);
            }}
            error={errors.lastName}
          />
        </div>
        <InputText
          label="Phone"
          value={phone}
          onChange={(e) => {
            setPhone(e);
          }}
          error={errors.phone}
          type="tel"
        />
        <InputText
          label="Whatsapp"
          value={whatsapp}
          onChange={(e) => {
            setWhatsapp(e);
          }}
          // error={errors.address}
          type="tel"
        />
      </div>
    </Modal>
  );
};

export default ModalEditContact;

type ModalEditContactProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  firstName: string;
  lastName: string;
  phone: string;
  whatsapp: string;
  setFirstName: Dispatch<SetStateAction<string>>;
  setLastName: Dispatch<SetStateAction<string>>;
  setPhone: Dispatch<SetStateAction<string>>;
  setWhatsapp: Dispatch<SetStateAction<string>>;
  updateFrontend: (newVals: any) => void;
};
