"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/context";
import { useRouter } from "next/navigation";
import { UUID } from "crypto";
import useUsersData from "@/hooks/useUsersData";
import useCampaignData from "@/hooks/useCampaignData";
import LoggedinLayout from "@/layouts/LoggedinLayout";
import InputText from "@/components/InputText";
import InputSelect from "@/components/InputSelect";
import InputSelectUser from "@/components/InputSelectUser";
import InputSelectContact from "@/components/InputSelectContact";
import Separator from "@/components/Separator";
import DeliverablesCardEdit from "@/components/DeliverablesCardEdit";
import HeaderEditCampaign from "@/components/HeaderEditCampaign";
import {
  partnershipTypeOptions,
  campaignCategoryOptions,
} from "@/utils/variables/campaign.variables";
import "@/styles/campaign.edit.scss";
import {
  useEditCampaignInfo,
  useCommissionCalculations,
} from "@/hooks/useEditCampaignData";
import {
  createCampaignWithPayment,
  // createDeliverablesWithMilestones,
  updateCampaign,
  updateCampaignPayment,
  upsertDeliverablesWithMilestones,
} from "@/services/campaign/post_actions";
import { DeliverableType } from "@/types/campaign.type";
import { createNotification } from "@/services/notifications/post_actions";
import { isValidUUID } from "@/utils/functions/validation.functions";
import useAgencyCommissionData from "@/hooks/useAgencyCommisions";
import { useSession } from "@/hooks/useSession";
import { convertToUUID } from "@/utils/functions/converter.functions";

const EditCampaignPage = ({ params }: { params: { id: string[] } }) => {
  const { sessionLoading } = useSession({});
  const router = useRouter();
  const { agencyId, managerId } = useGlobalContext();

  const { managersByAgency, talentsByAgency, brandContactsByAgency } =
    useUsersData({ agencyId });

  const { id } = params;
  const campaignId = convertToUUID(id?.[0]);
  const [loading, setLoading] = useState(false); // Add loading state

  const {
    agencyAgencyCommission,
    agencyManagerCommission,
    agencyInfluencerCommission,
  } = useAgencyCommissionData({
    agencyId: campaignId === null ? convertToUUID(agencyId) : null,
  });

  const {
    name,
    setName,
    campaignRate,
    setCampaignRate,
    influencerCommission,
    setInfluencerCommission,
    agencyCommission,
    setAgencyCommission,
    managerCommission,
    setManagerCommission,
    usage,
    setUsage,
    exclusivity,
    setExclusivity,
    partnershipType,
    setPartnershipType,
    category,
    setCategory,
    brand,
    setBrand,
    brandWebsite,
    setBrandWebsite,
    brandContact,
    setBrandContact,
    influencerId,
    setInfluencerId,
    campaignManagerId,
    setCampaignManagerId,
    contract,
    setContract,
  } = useEditCampaignInfo(campaignId);

  const { influencerPayout, setInfluencerPayout, updateInfluencerCommission } =
    useCommissionCalculations(campaignRate, influencerCommission);

  const { campaignDeliverables } = useCampaignData(convertToUUID(campaignId));
  const [deliverables, setDeliverables] = React.useState<DeliverableType[]>([
    {
      milestones: [],
      attachments: [],
      note: "",
    },
  ]);

  useEffect(() => {
    if (campaignDeliverables) {
      setDeliverables(campaignDeliverables);
    }
  }, [campaignDeliverables]);

  useEffect(() => {
    if (campaignId === null) {
      setManagerCommission(agencyManagerCommission);
      setInfluencerCommission(agencyInfluencerCommission);
      setAgencyCommission(agencyAgencyCommission);
    }
  }, [
    campaignId,
    agencyManagerCommission,
    agencyInfluencerCommission,
    agencyAgencyCommission,
    setManagerCommission,
    setInfluencerCommission,
    setAgencyCommission,
  ]);

  const createPendingCampaignNotification = (campaignID: UUID | null) => {
    if (!campaignID || !isValidUUID(campaignID)) return;
    if (!influencerId || !isValidUUID(influencerId)) return;
    createNotification({
      talentRecipientIDs: [influencerId],
      type: "pendingcampaign",
      header_text: name,
      body_text: `You have a new pending campaign. Check it out!`,
      routing: `/campaign/${campaignID}`,
    });
  };

  const onSave = async () => {
    // Prevent multiple submissions
    if (loading) return;
    // Validate input fields
    const requiredFields = [
      name,
      brand,
      usage,
      exclusivity,
      partnershipType,
      category,
      campaignRate,
    ];

    // Check for empty required fields
    const emptyFields = requiredFields.filter((field) => !field);
    if (emptyFields.length > 0) {
      alert("Please fill in all fields.");
      return; // Prevent further execution if validation fails
    }

    // Check that commissions add up to 100%
    const totalCommission =
      (influencerCommission ?? 0) +
      (agencyCommission ?? 0) +
      (managerCommission ?? 0);

    if (totalCommission !== 100) {
      alert(
        "The total of Influencer, Agency, and Manager commissions must equal 100%."
      );
      return; // Prevent further execution if validation fails
    }
    const campaignData = {
      name,
      brand,
      brand_link: brandWebsite,
      usage,
      exclusivity,
      partnership_type: partnershipType,
      category,
      talent_manager: managerId,
      campaign_manager: campaignManagerId,
      influencer: influencerId,
      agency_id: agencyId,
      ...(brandContact !== -1 && { brand_contact_id: brandContact }),
    };
    const paymentData = {
      amount: campaignRate,
      influencer_percentage: influencerCommission,
      agency_percentage: agencyCommission,
      manager_percentage: managerCommission,
      agency_id: agencyId,
    };

    // Set loading to true to prevent further submissions
    setLoading(true);
    try {
      if (campaignId === null) {
        // Create a new campaign
        const newCampaignId = await createCampaignWithPayment(
          campaignData,
          paymentData
        );
        await upsertDeliverablesWithMilestones(
          deliverables,
          convertToUUID(newCampaignId)
        );

        // Create a notification for the new campaign
        createPendingCampaignNotification(convertToUUID(newCampaignId));

        // Redirect to the campaign route
        router.push(`/campaign/${newCampaignId}`);
      } else {
        // Updating an existing campaign
        await updateCampaign(campaignId, campaignData);
        await updateCampaignPayment(campaignId, paymentData);
        await upsertDeliverablesWithMilestones(
          deliverables,
          convertToUUID(campaignId)
        );
        router.push(`/campaign/${campaignId}`);
      }
    } catch (error) {
      console.error("Error saving campaign:", error);
    } finally {
    }
  };
  return (
    <LoggedinLayout
      headerTitle={campaignId === null ? "Create Campaign" : "Edit Campaign"}
    >
      <HeaderEditCampaign
        campaignId={campaignId}
        onSave={onSave}
        saveDisabled={loading}
      />
      <div className="grid grid-col-1">
        <InputText
          label="Campaign Name"
          value={name}
          onChange={setName}
          placeholder="Nike X Michelle"
        />
      </div>
      <div className="grid grid-col-2">
        <InputSelectContact
          label="Brand Contact"
          value={brandContact}
          onChange={setBrandContact}
          options={brandContactsByAgency}
          placeholder="brand@email.com"
        />
        <InputText
          label="Brand Website"
          value={brandWebsite}
          onChange={setBrandWebsite}
          placeholder="https://brand.com"
        />
      </div>
      <div className="grid grid-col-4 ">
        <InputText
          label="Campaign Rate ($)"
          value={campaignRate || ""}
          onChange={(value) => setCampaignRate(value ? Number(value) : null)}
          placeholder="0"
          type="text"
        />
        <InputText
          label="Influencer Commission (%)"
          value={updateInfluencerCommission(influencerPayout) || ""}
          onChange={(value) =>
            setInfluencerCommission(value ? Number(value) : null)
          }
          placeholder="0"
          type="text"
        />
        <InputText
          label="Agency Commission (%)"
          value={agencyCommission || ""}
          onChange={(value) =>
            setAgencyCommission(value ? Number(value) : null)
          }
          placeholder="0"
          type="text"
        />
        <InputText
          label="Manager Commission (%)"
          value={managerCommission || ""}
          onChange={(value) =>
            setManagerCommission(value ? Number(value) : null)
          }
          placeholder="0"
          type="text"
        />
      </div>
      <Separator />
      <div className="grid grid-col-4">
        <InputText
          label="Influencer Payout"
          value={influencerPayout || ""}
          onChange={(value) =>
            setInfluencerPayout(value ? Number(value) : null)
          }
          placeholder="0"
          type="text"
        />
        <InputText
          label="Brand"
          value={brand}
          onChange={setBrand}
          placeholder="Nike"
        />
        <InputSelectUser
          label="Creator"
          value={influencerId}
          onChange={setInfluencerId}
          options={talentsByAgency}
          placeholder={
            talentsByAgency.length
              ? "Select an creator"
              : "Invite creators to get started"
          }
        />
        <InputSelectUser
          label="Campaign Manager"
          value={campaignManagerId}
          onChange={setCampaignManagerId}
          options={managersByAgency}
        />
      </div>
      <div className="grid grid-col-4">
        <InputText
          label="Usage"
          value={usage}
          onChange={setUsage}
          placeholder="30 days"
        />
        <InputText
          label="Exclusivity"
          value={exclusivity}
          onChange={setExclusivity}
          placeholder="30 days"
        />
        <InputSelect
          label="Partnership Type"
          value={partnershipType}
          onChange={setPartnershipType}
          options={partnershipTypeOptions}
        />
        <InputSelect
          label="Category"
          value={category}
          onChange={setCategory}
          options={campaignCategoryOptions}
        />
      </div>
      <div className="grid grid-col-1 z-2">
        <DeliverablesCardEdit
          deliverables={deliverables}
          setDeliverables={setDeliverables}
          contract={contract}
          setContract={setContract}
          selectedTalentId={convertToUUID(influencerId)}
        />
      </div>
    </LoggedinLayout>
  );
};

export default EditCampaignPage;
