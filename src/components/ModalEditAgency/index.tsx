import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { UUID } from "crypto";
import ImageUpload from "@/components/ImageUpload";
import Modal from "@/components/Modal";
import CustomTabs from "@/components/Tabs";
import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";
import InputSelectCountry from "@/components/InputSelectCountry";
import useAgencyCommissionData from "@/hooks/useAgencyCommisions";
import InputAcceptedPayments from "../InputAcceptedPayments";
import InputCampaignMatching from "@/components/InputCampaignMatching";
import { getIconLink } from "@/utils/functions/iconLinks";
import {
  usCitiesOptions,
  usStatesOptions,
} from "@/utils/variables/onboarding.variables";
import {
  editAgency,
  editAgencyPaymentOptions,
} from "@/services/agency/post_actions";
import { createOrEditCampaignMatchingQuestions } from "@/services/campaignMatching/post_actions";
import { PaymentOptionsInputType } from "@/types/payments.type";
import { PaymentOptionsDBType } from "@/types/enum.types";
import "./styles/index.scss";
import {
  getEmailError,
  getPhoneError,
} from "@/utils/functions/validation.functions";
import useAgencyCampaignMatchingData from "@/hooks/useAgencyCampaignMatchingData";
import { convertToPaymentOptionDBArray } from "@/utils/functions/converter.functions";

const ModalEditAgency: React.FC<ModalEditProps> = ({
  setOpen,
  agencyId,
  agencyName,
  agencyLogo,
  agencyAddress,
  agencyCity,
  agencyState,
  agencyCountry,
  agencyBio,
  agencyEmail,
  agencyPhone,
  agencyWebsite,
  agencyPaymentOptions,
  agencyDateFounded,
  handleEditSave = () => {},
}) => {
  const { campaignMatchingQuestions, setCampaignMatchingQuestions } =
    useAgencyCampaignMatchingData({ agencyId });
  const {
    agencyAgencyCommission,
    agencyInfluencerCommission,
    agencyManagerCommission,
    setAgencyAgencyCommission,
    setAgencyInfluencerCommission,
    setAgencyManagerCommission,
  } = useAgencyCommissionData({ agencyId });
  const [logo, setLogo] = useState(agencyLogo);
  const [name, setName] = useState(agencyName);
  const [bio, setBio] = useState(agencyBio);
  const [email, setEmail] = useState(agencyEmail);
  const [phone, setPhone] = useState(agencyPhone);
  const [website, setWebsite] = useState(agencyWebsite);
  const [address, setAddress] = useState(agencyAddress);
  const [city, setCity] = useState(agencyCity);
  const [state, setState] = useState(agencyState);
  const [country, setCountry] = useState(agencyCountry);
  const [dateFounded, setDateFounded] = useState(agencyDateFounded);
  const [paymentOptions, setPaymentOptions] =
    useState<string[]>(agencyPaymentOptions);
  const [deletedQuestionIds, setDeletedQuestionIds] = useState<number[]>([]);
  // const [questions, setQuestions] = useState<CampaignMatchingType[]>([]);
  const [errors, setErrors] = useState<any>({});
  const [tab, setTab] = useState(0);

  const handleSave = () => {
    const emailError = getEmailError(email);
    const phoneError = getPhoneError(phone);

    if (!name || emailError || phoneError || !country) {
      setErrors({
        name: !name ? "Please enter a name" : "",
        email: emailError,
        phone: phoneError,
        country: !country ? "Please select a country" : "",
      });
      setTab(0);
      alert("Please enter required Agency Info fields");
      return;
    }
    const totalCommission =
      (agencyInfluencerCommission ?? 0) +
      (agencyAgencyCommission ?? 0) +
      (agencyManagerCommission ?? 0);

    if (totalCommission !== 100 && totalCommission !== 0) {
      setErrors({
        totalCommission: "Total commission must be 100%",
      });
      setTab(1);
      alert("Total commission must be 100%");
      return; // Prevent further execution if validation fails
    }

    handleEditSave({
      agency_name: name,
      agency_logo: logo,
      agency_bio: bio,
      agency_email: email,
      agency_phone: phone,
      agency_website: website,
      agency_address: address,
      agency_city: city,
      agency_state: state,
      agency_country: country,
      agency_payment_options: paymentOptions.filter((option) => option !== ""),
    });

    editAgency({
      agencyID: agencyId,
      name,
      logo,
      bio,
      website,
      email,
      phone,
      address,
      city,
      state,
      country,
      dateFounded,
      managerCommission: agencyManagerCommission,
      agencyCommission: agencyAgencyCommission,
      influencerCommission: agencyInfluencerCommission,
    });
    editAgencyPaymentOptions({
      agencyID: agencyId,
      payment_options: convertToPaymentOptionDBArray(paymentOptions),
    });
    createOrEditCampaignMatchingQuestions(
      agencyId,
      campaignMatchingQuestions,
      deletedQuestionIds
    );

    setOpen(false);
  };

  return (
    <Modal
      setOpen={setOpen}
      title="Edit Agency Info"
      noButtonText="Cancel"
      onNoButtonClick={() => setOpen(false)}
      goButtonText="Save" //TODO: add function props
      onGoButtonClick={handleSave}
    >
      <div className="modal-edit-body">
        <div className="modal-edit-tabs">
          <CustomTabs
            tabs={["Agency Info", "Payment Info", "Campaign Matching"]}
            tab={tab}
            setTab={setTab}
          />
        </div>

        {tab === 0 && (
          <>
            <ImageUpload
              data={logo}
              handleChange={setLogo}
              icon={getIconLink("agency")}
            />
            <InputText
              label="Agency Name*"
              value={name}
              onChange={(e) => {
                setName(e);
              }}
              error={errors.name}
              placeholder=""
            />
            <InputText
              label="Agency Bio"
              value={bio}
              onChange={(e) => {
                setBio(e);
              }}
              error={errors.bio}
              maxRows={20}
              placeholder=""
            />
            <InputText
              label="Website"
              value={website}
              onChange={(e) => {
                setWebsite(e);
              }}
              // error={errors.address}
            />
            <InputText
              label="Email*"
              value={email}
              onChange={(e) => {
                setEmail(e);
              }}
              error={errors.email}
            />
            <InputText
              label="Phone*"
              value={phone}
              onChange={(e) => {
                setPhone(e);
              }}
              error={errors.phone}
            />
            <InputText
              label="Address"
              value={address}
              onChange={(e) => {
                setAddress(e);
              }}
              // error={errors.address}
            />
            <InputSelect
              label="State"
              value={state}
              onChange={(e) => {
                setState(e);
              }}
              options={usStatesOptions}
              // error={errors.state}
            />
            <InputSelect
              label="City"
              value={city}
              onChange={(e) => {
                setCity(e);
              }}
              options={usCitiesOptions}
              // error={errors.city}
            />
            <InputSelectCountry
              label="Country*"
              value={country}
              onChange={(e) => {
                setCountry(e);
              }}
              error={errors.country}
            />
            <InputText
              label="Founded Date"
              value={dateFounded}
              onChange={(value) => setDateFounded(value)}
              placeholder=""
              type="date"
            />
          </>
        )}
        {tab === 1 && (
          <>
            <div className="grid grid-col-3">
              <InputText
                label="Agency Commission (%)"
                value={agencyAgencyCommission || ""} // Display an empty string if the value is null
                onChange={(value) => {
                  setAgencyAgencyCommission(Number(value));
                }}
                type="text"
                placeholder="0"
                error={errors.totalCommission}
              />

              <InputText
                label="Influencer Comission (%)"
                value={agencyInfluencerCommission || ""}
                onChange={(value) =>
                  setAgencyInfluencerCommission(Number(value))
                }
                type="text"
                placeholder="0"
                error={errors.totalCommission}
              />
              <InputText
                label="Manager Comission (%)"
                value={agencyManagerCommission || ""}
                onChange={(value) => setAgencyManagerCommission(Number(value))}
                type="text"
                placeholder="0"
                error={errors.totalCommission}
              />
            </div>
            <InputAcceptedPayments
              payments={paymentOptions}
              setPayments={setPaymentOptions}
            />
          </>
        )}
        {tab === 2 && (
          <>
            <InputCampaignMatching
              questions={campaignMatchingQuestions}
              setQuestions={setCampaignMatchingQuestions}
              deletedQuestionIds={deletedQuestionIds}
              setDeletedQuestionIds={setDeletedQuestionIds}
              error={""}
            />
          </>
        )}
      </div>
    </Modal>
  );
};

export default ModalEditAgency;

type ModalEditProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  agencyId: UUID;
  agencyName: string;
  agencyLogo: string;
  agencyAddress: string;

  agencyCity: string;
  agencyState: string;
  agencyCountry: string;
  agencyBio: string;
  agencyEmail: string;
  agencyPhone: string;
  agencyWebsite: string;
  agencyDateFounded: string;
  agencyPaymentOptions: PaymentOptionsInputType[];
  handleEditSave: (e: any) => void;
};
