"use client";
import React, { useState, SetStateAction, Dispatch } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context";
import { getPaymentStatusColor } from "@/utils/functions/color.functions";

//Component import
import Button from "@/components/Button";
import Alert from "../Alert";
import ButtonSelect from "../ButtonSelect";
import { ContactPreviewType } from "@/types/user.type";
import { getIconLink } from "@/utils/functions/iconLinks";
import "@/styles/header.scss";
import useCampaignData from "@/hooks/useCampaignData";
import {
  updateCampaignPaymentStatus,
  updateCampaignStatusToCompleted,
  updateCampaignStatusToOngoing,
  updateCampaignStatusToRejected,
} from "@/services/campaign/post_actions";
import { PaymentStatusType } from "@/types/campaign.type";
import { UUID } from "crypto";
import usePermission from "@/hooks/usePermission";
import { USER_PERMISSIONS } from "@/utils/constants";

const HeaderCampaign: React.FC<HeaderCampaignProps> = ({
  campaignId,
  campaignStatus,
  brandContact,
  paymentStatus = "",
  setPaymentStatus,
  createAcceptCampaignNotification,
  createRejectCampaignNotification,
}) => {
  const router = useRouter();
  const I1Permission = usePermission(USER_PERMISSIONS.TIER_I1);
  const M3Permission = usePermission(USER_PERMISSIONS.TIER_M3);

  // const { setCampaignStatus } = useCampaignData(campaignId);
  const [showAlert, setShowAlert] = useState(false);
  const options = ["Pending", "Agency Paid", "Manager Paid", "Influencer Paid"];

  const [loading, setLoading] = useState(false);

  const handleAcceptCampaign = async () => {
    if (loading) return; // Prevent action if loading

    try {
      setLoading(true); // Set loading state to true
      const result = await updateCampaignStatusToOngoing(campaignId);
      createAcceptCampaignNotification();
      window.location.reload(); // TODO: Refresh data without page reload
      // setCampaignStatus && setCampaignStatus("ongoing");
    } catch (error) {
      console.error("Error updating campaign status:", error);
    }
  };

  const handleRejectCampaign = async () => {
    if (loading) return; // Prevent action if loading

    try {
      setLoading(true); // Set loading state to true
      const result = await updateCampaignStatusToRejected(campaignId);
      createRejectCampaignNotification();
      router.push("/campaign");
    } catch (error) {
      console.error("Error updating campaign status:", error);
    }
  };

  const handleCloseCampaign = async () => {
    try {
      const result = await updateCampaignStatusToCompleted(campaignId);
      window.location.reload(); // TODO: Refresh data without page reload
    } catch (error) {
      console.error("Error updating campaign status:", error);
    }
  };

  const handlePaymentStatusChange = (status: PaymentStatusType) => {
    updateCampaignPaymentStatus(campaignId, status);
    setPaymentStatus && setPaymentStatus(status);
  };

  return (
    <>
      <div className="header">
        <div className="header-left">
          <div className="header-buttons-container">
            <div className="header-buttons-flex">
              <>
                {M3Permission && brandContact?.email && (
                  <Button
                    label={`Email ${brandContact.name || "Brand"}`}
                    icon={getIconLink("email")}
                    color={"#775FFF"}
                    backgroundColor="transparent"
                    borderColor={"#775FFF"}
                    width="170px"
                    height="40px"
                    borderRadius="10px"
                    textClass="h3"
                    onClick={() => {
                      navigator.clipboard.writeText(brandContact.email);
                      setShowAlert(true);
                    }}
                    tooltipText={brandContact.email}
                  />
                )}
                {/* TODO: add when chat feature is ready
                <Button
                  label="Campaign Chat"
                  icon={getIconLink("chat")}
                  color="#ffffff"
                  backgroundColor={"#775FFF"}
                  borderColor={"#775FFF"}
                  width="170px"
                  height="40px"
                  borderRadius="10px"
                  textClass="h3"
                /> */}
              </>
            </div>
          </div>
        </div>
        <div className="campaign-page-header-right">
          <div className="header-buttons-container">
            <div className="header-buttons-flex">
              {campaignStatus === "pending" && I1Permission && (
                <>
                  <Button
                    label="Reject Campaign"
                    icon={getIconLink("remove")}
                    color="#ffffff"
                    backgroundColor={loading ? "#d5d5d5" : "#FF3A36"}
                    width="170px"
                    height="40px"
                    borderRadius="10px"
                    textClass="h3"
                    onClick={handleRejectCampaign}
                    disabled={loading}
                  />
                  <Button
                    label="Accept Campaign"
                    icon={getIconLink("checkmark")}
                    color="#ffffff"
                    backgroundColor={loading ? "#d5d5d5" : "#0ABC5D"}
                    width="170px"
                    height="40px"
                    borderRadius="10px"
                    textClass="h3"
                    onClick={handleAcceptCampaign}
                    disabled={loading}
                  />
                </>
              )}
              {(campaignStatus === "ongoing" || campaignStatus === "pending") &&
                M3Permission && (
                  <Button
                    label="Edit Campaign"
                    icon={getIconLink("edit")}
                    color={"#775FFF"}
                    backgroundColor="transparent"
                    borderColor={"#775FFF"}
                    width="170px"
                    height="40px"
                    borderRadius="10px"
                    textClass="h3"
                    onClick={() => {
                      router.push(`/campaign/edit/${campaignId}`);
                    }}
                  />
                )}
              {campaignStatus === "ongoing" && M3Permission && (
                <Button
                  label="Close Campaign"
                  icon={getIconLink("checkmark")}
                  color="#ffffff"
                  backgroundColor={"#775FFF"}
                  borderColor={"#775FFF"}
                  width="170px"
                  height="40px"
                  borderRadius="10px"
                  textClass="h3"
                  onClick={handleCloseCampaign}
                />
              )}
              {campaignStatus === "completed" && M3Permission && (
                <>
                  <ButtonSelect
                    value={paymentStatus}
                    options={options}
                    handleSelect={(newValue: string) =>
                      handlePaymentStatusChange(newValue as PaymentStatusType)
                    }
                    color="#fff"
                    backgroundColor={getPaymentStatusColor(paymentStatus)}
                    width="170px"
                    height="40px"
                    borderRadius="10px"
                    padding="8px"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {showAlert && (
        <Alert
          text="Copied!"
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      )}
    </>
  );
};

export default HeaderCampaign;

type HeaderCampaignProps = {
  campaignId: UUID | null;
  campaignStatus: string;
  brandContact?: ContactPreviewType;
  paymentStatus?: PaymentStatusType;
  setPaymentStatus?: Dispatch<SetStateAction<string>>;
  createAcceptCampaignNotification: () => void;
  createRejectCampaignNotification: () => void;
};
