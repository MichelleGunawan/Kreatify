import React, { Dispatch, SetStateAction, useState } from "react";
import { useGlobalContext } from "@/context";
import Modal from "@/components/Modal";
import InputMultiselectUser from "../InputMultiselectUser";
import { UserPreviewType } from "@/types/user.type";
import UserRow from "../UserRow";

import "./styles/index.scss";

import useUsersData from "@/hooks/useUsersData";
import { UUID } from "crypto";
import InputSelectUser from "../InputSelectUser";
import useUserTeamData from "@/hooks/useUserTeamData";
import { updateManagerTeam } from "@/services/team/post_actions";
import { convertToUUIDArray } from "@/utils/functions/converter.functions";

const ModalEditManagerTeam: React.FC<ModalEditManagerTeamProps> = ({
  setOpen,
}) => {
  const { agencyId } = useGlobalContext();
  const [selectedManagerId, setSelectedManagerId] = useState<UUID | null>(null);
  const { managersByAgency, talentsWithSocialsByAgency } = useUsersData({
    agencyId: agencyId,
  });
  const { teamIds, setTeamIds } = useUserTeamData({
    managerId: selectedManagerId,
  });

  const handleSave = () => {
    updateManagerTeam({
      managerID: selectedManagerId,
      influencerIDs: teamIds,
    });

    setOpen(false);
  };

  const removeUser = (talentId: string) => {
    setTeamIds(teamIds.filter((id: string) => id !== talentId));
  };

  return (
    <Modal
      setOpen={setOpen}
      title="Edit Manager Team"
      noButtonText="Cancel"
      onNoButtonClick={() => setOpen(false)}
      goButtonText="Save" //TODO: add function props
      onGoButtonClick={handleSave}
    >
      <div className="modal-edit-body">
        <InputSelectUser
          label="Manager"
          options={managersByAgency}
          value={selectedManagerId}
          onChange={(value) => setSelectedManagerId(value)}
        />
        <InputMultiselectUser
          label="Team"
          options={talentsWithSocialsByAgency}
          value={teamIds}
          onChange={(value) => {
            setTeamIds(convertToUUIDArray(value));
          }}
        />
        <div className="user-rows-container">
          {/* <Separator /> */}
          {teamIds.length > 0 &&
            talentsWithSocialsByAgency
              .filter((manager) => teamIds.includes(manager.id))
              .map(
                (
                  {
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
                    removeUser={() => removeUser(user_id)}
                  />
                  // <UserRow key={talents.user_id} name={talent.name} removeUser={removeUser} />
                )
              )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalEditManagerTeam;

type ModalEditManagerTeamProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};
