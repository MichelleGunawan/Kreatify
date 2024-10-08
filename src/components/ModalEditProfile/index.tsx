import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useGlobalContext } from "@/context";
import { UUID } from "crypto";

// Custom components
import Modal from "@/components/Modal";
import CustomTabs from "@/components/Tabs";
import InputText from "@/components/InputText";
import InputSocials from "@/components//InputSocials";
import InputPayments from "@/components/InputPayments";
import ImageUpload from "@/components/ImageUpload";
import InputMultiselect from "@/components/InputMultiselect";

// Utils
import { campaignCategoryOptions } from "@/utils/variables/campaign.variables";
import { getIconLink } from "@/utils/functions/iconLinks";
import { SocialDBType, SocialInputType } from "@/types/social.type";
import { PaymentType } from "@/types/payments.type";

// Data hooks
import useUsersData from "@/hooks/useUsersData";
import useUserSocialData from "@/hooks/useUserSocialData";
import {
  upsertInfluencerPaymentInfo,
  upsertSocials,
} from "@/services/profile/post_actions";
import usePermission from "@/hooks/usePermission";
import { COLORS, USER_PERMISSIONS } from "@/utils/constants";

// Style imports
import "./styles/index.scss";
import Button from "../Button";
import { removeManagerFromAgency } from "@/services/managers/delete_actions";
import InputSelect from "../InputSelect";
import {
  influencerRoleOptions,
  managerRoleOptions,
} from "@/utils/variables/user.variables";
import { removeInfluencerFromAgency } from "@/services/influencers/delete_actions";
import useProfileRoleData from "@/hooks/useUserProfileRole";
import {
  convertToSocialDBArray,
  convertToUUID,
} from "@/utils/functions/converter.functions";
import { platform } from "os";

const ModalEditProfile: React.FC<ModalEditProfileProps> = ({
  profileId,
  profileType,
  setOpen,
  currentProfileImage = "",
  currentNiches = [],
  currentBio = "",
  currentSocials = [],
  currentPaymentInfo = [],
  handleEditSave = () => {},
}) => {
  const { agencyId, talentId } = useGlobalContext();
  const I1Permission = usePermission(USER_PERMISSIONS.TIER_I1);
  const M3Permission = usePermission(USER_PERMISSIONS.TIER_M3);
  const M1Permission = usePermission(USER_PERMISSIONS.TIER_M1);

  const { role, setRole } = useProfileRoleData({
    talentId: profileType === "influencer" ? profileId : null,
    managerId: profileType === "manager" ? profileId : null,
  });

  const { socials } = useUserSocialData({
    talentId: profileType === "influencer" ? profileId : null,
  });

  useEffect(() => {
    if (socials.length > 0) setSocialsInput(socials);
  }, [socials]);

  const [tab, setTab] = useState(0);

  const [image, setImage] = useState(currentProfileImage);
  const [niches, setNiches] = useState<string[]>(currentNiches);
  const [bio, setBio] = useState(currentBio);
  const [socialsInput, setSocialsInput] = useState<SocialInputType[]>([
    { id: null, platform: "", handle: "" },
  ]);

  const [paymentInfo, setPaymentInfo] = useState<PaymentType[]>(
    currentPaymentInfo.length > 0
      ? currentPaymentInfo
      : [
          {
            type: "",
          },
        ]
  );

  const handleSave = () => {
    handleEditSave({
      profileImage: image,
      niches,
      bio,
      paymentInfo: paymentInfo.filter((payment) => payment.type !== ""),
      role,
    });

    if (profileType?.toLowerCase() === "influencer") {
      upsertInfluencerPaymentInfo({
        talentID: profileId,
        paymentInfo: paymentInfo,
      });
      if (convertToSocialDBArray(socialsInput).length === 0) {
        alert("At least one social account is required");
        return;
      }
      upsertSocials({
        talentID: profileId,
        socials: convertToSocialDBArray(socialsInput),
      });
    }

    setOpen(false);
  };

  return (
    <Modal
      setOpen={setOpen}
      title="Edit Profile Info"
      noButtonText="Cancel"
      onNoButtonClick={() => setOpen(false)}
      goButtonText="Save" //TODO: add function props
      onGoButtonClick={handleSave}
    >
      <div className="modal-edit-body">
        <div className="modal-edit-tabs">
          <CustomTabs
            tabs={
              I1Permission
                ? ["Personal Info", "Socials Info", "Payment Info"]
                : ["Personal Info"]
            }
            tab={tab}
            setTab={setTab}
          />
        </div>

        {profileType === "influencer" && tab === 0 && (
          <>
            <ImageUpload
              data={image}
              handleChange={setImage}
              icon={getIconLink("person")}
            />
            <InputMultiselect
              label="Niches"
              value={niches}
              onChange={(value) => setNiches(value)} // Convert single value to array
              options={campaignCategoryOptions}
            />
            <InputText label="Bio" value={bio} onChange={setBio} maxRows={5} />
            {M3Permission && (
              <InputSelect
                label="Role"
                value={role || ""}
                onChange={(value) => setRole(value)} // Convert single value to array
                options={influencerRoleOptions}
              />
            )}
            {M3Permission && (
              <div className="grid grid-cols-2 edit-profile-admin-buttons">
                <Button
                  label="Remove from Agency"
                  color={COLORS.RED}
                  borderColor={COLORS.RED}
                  width="95%"
                  onClick={async () => {
                    try {
                      await removeInfluencerFromAgency(
                        convertToUUID(profileId)
                      );
                    } catch (err) {
                      console.error(err);
                      alert(err);
                    }
                  }}
                />
              </div>
            )}
          </>
        )}

        {I1Permission && talentId === profileId && tab === 1 && (
          <>
            <InputSocials
              socials={socialsInput}
              setSocials={(value: SocialInputType[]) => {
                setSocialsInput(value);
              }}
            />
          </>
        )}
        {I1Permission && talentId === profileId && tab === 2 && (
          <>
            <InputPayments
              payments={paymentInfo}
              setPayments={setPaymentInfo}
            />
          </>
        )}
        {profileType === "manager" && tab === 0 && (
          <>
            <ImageUpload
              data={image}
              handleChange={setImage}
              icon={getIconLink("person")}
              label="Profile Image"
            />
            {M1Permission && (
              <InputSelect
                label="Role"
                value={role || ""}
                onChange={(value) => setRole(value)} // Convert single value to array
                options={managerRoleOptions}
              />
            )}

            {M1Permission && (
              <div className="grid grid-cols-2 edit-profile-admin-buttons">
                <Button
                  label="Remove from Agency"
                  color={COLORS.RED}
                  borderColor={COLORS.RED}
                  width="45%"
                  onClick={async () => {
                    try {
                      await removeManagerFromAgency(convertToUUID(profileId));
                    } catch (err) {
                      console.error(err);
                      alert(err);
                    }
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default ModalEditProfile;

type ModalEditProfileProps = {
  profileId: UUID | null;
  profileType?: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  currentProfileImage?: string;
  currentBio?: string;
  currentNiches?: string[];
  currentSocials?: SocialInputType[];
  currentPaymentInfo?: PaymentType[];
  handleEditSave?: ({ profileImage, niches, bio, paymentInfo }: any) => void;
};
