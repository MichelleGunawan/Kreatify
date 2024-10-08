import React, { Dispatch, SetStateAction, useState } from "react";
import { useGlobalContext } from "@/context";
import { UUID } from "crypto";
import Modal from "@/components/Modal";
import UserRow from "../UserRow";
import InputSelectUser from "../InputSelectUser";
import InputMultiselectUser from "../InputMultiselectUser";
import useUserTeamData from "@/hooks/useUserTeamData";
import useUsersData from "@/hooks/useUsersData";
import { updateInfluencerTeam } from "@/services/team/post_actions";
import { UserPreviewType } from "@/types/user.type";
import "./styles/index.scss";
import { convertToUUIDArray } from "@/utils/functions/converter.functions";

const ModalEditInfluencerTeam: React.FC<ModalEditInfluencerTeamProps> = ({
  setOpen,
}) => {
  const { agencyId } = useGlobalContext();
  const [selectedInfluencerId, setSelectedInfluencerId] = useState<UUID | null>(
    null
  );
  const { managersByAgency, talentsWithSocialsByAgency } = useUsersData({
    agencyId: agencyId,
  });
  const { teamIds, setTeamIds } = useUserTeamData({
    talentId: selectedInfluencerId,
  });

  const handleSave = () => {
    updateInfluencerTeam({
      talentID: selectedInfluencerId,
      managerIDs: convertToUUIDArray(teamIds),
    });

    setOpen(false);
  };

  const removeUser = (managerId: string) => {
    setTeamIds(teamIds.filter((id) => id !== managerId));
  };

  return (
    <Modal
      setOpen={setOpen}
      title="Edit Influencer Team"
      noButtonText="Cancel"
      onNoButtonClick={() => setOpen(false)}
      goButtonText="Save" //TODO: add function props
      onGoButtonClick={handleSave}
    >
      <div className="modal-edit-body">
        <InputSelectUser
          label="Influencer"
          options={talentsWithSocialsByAgency}
          value={selectedInfluencerId}
          onChange={(value) => setSelectedInfluencerId(value)}
        />
        <InputMultiselectUser
          label="Team"
          options={selectedInfluencerId ? managersByAgency : []}
          value={teamIds}
          onChange={(value) => {
            setTeamIds(convertToUUIDArray(value));
          }}
        />
        <div className="user-rows-container">
          {/* <Separator /> */}
          {teamIds.length > 0 &&
            managersByAgency
              .filter((manager) => teamIds.includes(manager.id))
              .map(
                (
                  {
                    id,
                    name,
                    profile_image,
                    social_following,
                    niches,
                    user_id,
                    user_role,
                  }: any,
                  index: number
                ) => (
                  <UserRow
                    key={index}
                    name={name}
                    profileImage={profile_image}
                    socials={social_following}
                    niches={niches}
                    userRole={user_role}
                    removeUser={() => removeUser(id)}
                  />
                  // <UserRow key={talents.user_id} name={talent.name} removeUser={removeUser} />
                )
              )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalEditInfluencerTeam;

type ModalEditInfluencerTeamProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};
