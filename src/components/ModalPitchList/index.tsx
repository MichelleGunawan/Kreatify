import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useGlobalContext } from "@/context";
import Modal from "../Modal";
import InputText from "../InputText";
import UserRow from "./components";
import Separator from "../Separator";
import InputMultiselectUser from "../InputMultiselectUser";
import { PitchlistUserType, UserPreviewType } from "@/types/user.type";
import usePitchlistData from "@/hooks/usePitchlistData";
import useUsersData from "@/hooks/useUsersData";
import {
  createPitchlist,
  updatePitchlist,
} from "@/services/pitchlists/post_actions";
import "./styles/index.scss";
import { UUID } from "crypto";
import { convertToUUID } from "@/utils/functions/converter.functions";

const ModalPitchList: React.FC<ModalPitchListProps> = ({
  setOpen,
  title,
  id = null,
  selectedUsers = [],
}) => {
  const { agencyId, managerId } = useGlobalContext();
  const { talentsWithSocialsByAgency } = useUsersData({ agencyId: agencyId });
  const {
    pitchlistName,
    pitchlistInfluencers,
    pitchlistDescription,
    setPitchListName,
    setPitchlistInfluencers,
    setPitchListDescription,
  } = usePitchlistData({
    pitchlistId: convertToUUID(id),
  });

  useEffect(() => {
    if (selectedUsers.length > 0) {
      const selectedUserRates = selectedUsers.map((user) => ({
        id: user,
        rate: 0,
      }));
      setPitchlistInfluencers(selectedUserRates);
    }
  }, [selectedUsers, setPitchlistInfluencers]);

  const [errors, setErrors] = useState({
    name: "",
    talents: "",
  });
  const [loading, setLoading] = useState(false);

  const removeUser = (talentId: string) => {
    setPitchlistInfluencers(
      pitchlistInfluencers.filter((t: PitchlistUserType) => t.id !== talentId)
    );
  };

  const editRate = (talentId: string, rate: number) => {
    setPitchlistInfluencers(
      pitchlistInfluencers.map((t: PitchlistUserType) =>
        t.id === talentId ? { ...t, rate } : t
      )
    );
  };

  const handleSave = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    if (!pitchlistName || pitchlistInfluencers.length === 0) {
      setErrors({
        name: !pitchlistName ? "Please select a name" : "",
        talents:
          pitchlistInfluencers.length === 0
            ? "Pitch list must include at least one talent"
            : "",
      });
      return;
    }

    if (id === null && agencyId && managerId) {
      // Show a loading state or navigate immediately

      // Create the pitchlist
      createPitchlist(agencyId, managerId, pitchlistName, pitchlistInfluencers)
        .then((pitchlistId) => {
          // Go to pitchlist page once it's created
          window.location.href = `/pitchlist/${pitchlistId}`;
        })
        .catch((error) => {
          console.error("Error creating pitchlist:", error);
          // Handle error state
        })
        .finally(() => {
          setLoading(false); // Reset loading state
        });
    }

    if (id !== null && managerId) {
      await updatePitchlist({
        pitchlistId: convertToUUID(id),
        managerId,
        pitchlistName,
        pitchlistDescription,
        pitchlistInfluencers,
      }).then(() => {
        // Reload page
        // TODO: just update frontend
        window.location.reload();
      });
    }

    setOpen(false);
  };

  return (
    <Modal
      setOpen={setOpen}
      title={title}
      noButtonText="Cancel"
      onNoButtonClick={() => setOpen(false)}
      goButtonText={id === null ? "Create" : "Update"}
      onGoButtonClick={handleSave}
    >
      <div className="modal-pitchlist-body">
        <InputText
          label="Pitch List Name*"
          value={pitchlistName}
          onChange={setPitchListName}
          error={errors.name}
        />
        <InputText
          label="Pitch Description"
          value={pitchlistDescription}
          onChange={setPitchListDescription}
          minRow={3}
          maxRows={3}
        />
        <InputMultiselectUser
          label="Creators*"
          options={talentsWithSocialsByAgency}
          value={pitchlistInfluencers.map((t: PitchlistUserType) => t.id)}
          onChange={(value) => {
            const userWithRate = value.map((id: string) => ({
              id,
              rate: 0,
            }));
            setPitchlistInfluencers(userWithRate);
          }}
          error={errors.talents}
        />
        <div className="user-rows-container">
          <Separator />
          {pitchlistInfluencers.length > 0 &&
            pitchlistInfluencers.map((influencer: any, index: number) => {
              const selectedInfluencer = talentsWithSocialsByAgency.find(
                (t) => t.id === influencer?.id
              );
              return (
                <UserRow
                  key={index}
                  name={selectedInfluencer?.name}
                  profileImage={selectedInfluencer?.profile_image}
                  socials={selectedInfluencer?.social_following}
                  niches={selectedInfluencer?.niches}
                  userRole={selectedInfluencer?.user_role}
                  rate={influencer?.rate} // Use the rate from pitchlistInfluencers
                  removeUser={() => removeUser(selectedInfluencer?.id)}
                  editRate={(rate: number) =>
                    editRate(selectedInfluencer?.id, rate)
                  }
                />
              );
            })}
        </div>
      </div>
    </Modal>
  );
};

export default ModalPitchList;

type ModalPitchListProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  id?: string;
  selectedUsers?: string[];
};
