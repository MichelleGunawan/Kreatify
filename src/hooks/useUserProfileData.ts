import { useState, useEffect } from "react";
import {
  fetchInfluencerProfileInfo,
  fetchManagerProfileInfo,
  fetchInfluencerBasicInfo,
  fetchManagerBasicInfo,
  fetchInfluencerNotes,
} from "@/services/profile/fetch_acions";
import { UUID } from "crypto";
import { isValidUUID } from "@/utils/functions/validation.functions";

type useAgencyProps = {
  userId?: UUID | null;
  talentId?: UUID | null;
  managerId?: UUID | null;
  agencyId?: UUID | null;
};

function useUserProfileData({
  userId,
  talentId,
  managerId,
  agencyId,
}: useAgencyProps) {
  const [profileId, setProfileId] = useState<any>();
  const [profileImage, setProfileImage] = useState<any>();
  const [name, setName] = useState<any>("");
  const [niches, setNiches] = useState<any>([]);
  const [bio, setBio] = useState<any>();
  const [location, setLocation] = useState<any>();
  const [socialFollowing, setSocialFollowing] = useState<any>();
  const [notes, setNotes] = useState<any>("");

  const [basicInfo, setBasicInfo] = useState<any>();

  useEffect(() => {
    if (talentId && isValidUUID(talentId)) {
      fetchInfluencerProfileInfo(talentId).then(
        ({
          id,
          profile_image,
          name,
          niches,
          bio,
          city,
          state,
          social_following,
        }) => {
          if (id) setProfileId(id);
          if (profile_image) setProfileImage(profile_image);
          if (name) setName(name);
          if (niches && niches?.length > 0) setNiches(niches);
          if (bio) setBio(bio);
          if (city || state) {
            const locationParts = [city, state].filter(Boolean); // Filter out empty or null values
            setLocation(locationParts.join(", "));
          }
          if (social_following) setSocialFollowing(social_following);
        }
      );
      fetchInfluencerBasicInfo(talentId).then(setBasicInfo);
      fetchInfluencerNotes(talentId).then(setNotes);
    }
  }, [talentId]);

  useEffect(() => {
    if (managerId && isValidUUID(managerId)) {
      fetchManagerProfileInfo(managerId).then(
        ({ id, profile_image, name, location }) => {
          if (id) setProfileId(id);
          if (profile_image) setProfileImage(profile_image);
          if (name) setName(name);
          if (location) setLocation(location);
        }
      );
      fetchManagerBasicInfo(managerId).then((data) => {
        setBasicInfo(data);
      });
    }
  }, [managerId]);

  return {
    // profile header
    profileId,
    profileImage,
    name,
    niches,
    bio,
    location,
    socialFollowing,
    setProfileImage,
    setBio,
    setNiches,

    // info for profile basic info card
    basicInfo,

    // info for profile notes card
    notes,
    setNotes,
  };
}

export default useUserProfileData;
