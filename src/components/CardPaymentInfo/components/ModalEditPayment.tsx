import React, { Dispatch, SetStateAction, useState } from "react";
import Modal from "@/components/Modal";
import InputText from "@/components/InputText";
import { PaymentType } from "@/types/payments.type";
import "../styles/modalEditPayment.scss";

const ModalEditPayment: React.FC<ModalEditPaymentProps> = ({
  type,
  answer = "",
  setAnswer,
  setOpen,
}) => {
  return (
    <Modal
      title={type}
      setOpen={setOpen}
      noButtonText="Cancel"
      onNoButtonClick={() => setOpen(false)}
      goButtonText="Save" //TODO: add function props
    >
      <div className="modal-edit-payment-container">
        {type === "Paypal" && (
          <InputText
            label="Email"
            value={answer.email}
            onChange={(value) => setAnswer({ ...answer, email: value })}
          />
        )}
        {type === "Zelle" && (
          <InputText
            label="Phone"
            value={answer.phone}
            onChange={(value) => setAnswer({ ...answer, phone: value })}
          />
        )}
        {(type === "Direct Deposit" || type === "Wise") && (
          <>
            <InputText
              label="Account Holder Name"
              value={answer.acct_holder_name}
              onChange={(value) =>
                setAnswer({ ...answer, acct_holder_name: value })
              }
            />
            <InputText
              label="Account Number"
              value={answer.acct_number}
              onChange={(value) => setAnswer({ ...answer, acct_number: value })}
            />
            <InputText
              label="Routing Number"
              value={answer.routing_number}
              onChange={(value) =>
                setAnswer({ ...answer, routing_number: value })
              }
            />
            <InputText
              label="Swift Code"
              value={answer.swift_code}
              onChange={(value) => setAnswer({ ...answer, swift_code: value })}
            />
          </>
        )}
      </div>
    </Modal>
  );
};

export default ModalEditPayment;

type ModalEditPaymentProps = {
  type: string;
  answer?: any;
  setAnswer: Dispatch<SetStateAction<PaymentType>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
