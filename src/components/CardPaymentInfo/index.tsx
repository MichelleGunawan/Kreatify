import React, { useState } from "react";
import { useGlobalContext } from "@/context";
import ModalEditPayment from "./components/ModalEditPayment";
import { PaymentType } from "@/types/payments.type";
import "./styles/index.scss";
import "@/styles/card.scss";

const CardPaymentInfo: React.FC<DisplayPaymentInfoProps> = ({
  paymentAccount,
}) => {
  const [edit, setEdit] = useState(false);
  const [answerEdit, setAnswerEdit] = useState({
    type: paymentAccount.type,
  } as PaymentType);

  return (
    <>
      <div className="card">
        <div className="payment-card-body">
          <div className="payment-card-row">
            <p className="h3 text-black">{paymentAccount.type}</p>
            <div>
              {/* {usePermission(USER_PERMISSIONS.TIER_I1)  && (
              <Button
                icon={getIconLink("edit")}
                onClick={() => setEdit(!edit)}
                width="30px"
                height="30px"
                color={COLORS.PRIMARY}
                borderRadius="100px"
                borderColor="transparent"
              />
            )} */}
            </div>
          </div>

          {paymentAccount.type === "Zelle" && (
            <div className="payment-card-row">
              <p className="p2 text-grey-500">Phone</p>
              <p className="h3 text-grey-500">{paymentAccount.phone}</p>
            </div>
          )}
          {paymentAccount.type === "Paypal" && (
            <div className="payment-card-row">
              <p className="p2 text-grey-500">Email</p>
              <p className="h3 text-grey-500">{paymentAccount.email}</p>
            </div>
          )}
          {(paymentAccount.type === "Direct Deposit" ||
            paymentAccount.type === "Wise") && (
            <>
              <div className="payment-card-row">
                <p className="p2 text-grey-500">Account Holder Name</p>
                <p className="h3 text-grey-500">
                  {paymentAccount.acct_holder_name}
                </p>
              </div>

              <div className="payment-card-row">
                <p className="p2 text-grey-500">Bank Name</p>
                <p className="h3 text-grey-500">{paymentAccount.bank_name}</p>
              </div>

              <div className="payment-card-row">
                <p className="p2 text-grey-500">Account Number</p>
                <p className="h3 text-grey-500">{paymentAccount.acct_number}</p>
              </div>

              <div className="payment-card-row">
                <p className="p2 text-grey-500">Routing Number</p>
                <p className="h3 text-grey-500">
                  {paymentAccount.routing_number}
                </p>
              </div>

              <div className="payment-card-row">
                <p className="p2 text-grey-500">Swift Code</p>
                <p className="h3 text-grey-500">{paymentAccount.swift_code}</p>
              </div>
            </>
          )}
        </div>
      </div>
      {edit && (
        <ModalEditPayment
          type={paymentAccount.type}
          answer={answerEdit}
          setAnswer={setAnswerEdit}
          setOpen={setEdit}
        />
      )}
    </>
  );
};

export default CardPaymentInfo;

type DisplayPaymentInfoProps = {
  paymentAccount: PaymentType;
};
