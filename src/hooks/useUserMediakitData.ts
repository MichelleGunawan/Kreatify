import { useState, useEffect } from "react";
import { fetchInfluencerProfileInfo } from "@/services/profile/fetch_acions";
import { UUID } from "crypto";
import { isValidUUID } from "@/utils/functions/validation.functions";

type useUserMediakitProps = {
  userId?: UUID | null;
  talentId?: UUID | null;
  managerId?: UUID | null;
};

function useUserMediakitData({
  userId,
  talentId,
  managerId,
}: useUserMediakitProps) {
  const [profileId, setProfileId] = useState<any>();
  const [profileImage, setProfileImage] = useState<any>();
  const [name, setName] = useState<any>("");
  const [niches, setNiches] = useState<any>();
  const [bio, setBio] = useState<any>();
  const [location, setLocation] = useState<any>();
  const [socialFollowing, setSocialFollowing] = useState<any>();
  const [agencyId, setAgencyId] = useState<any>();
  // const [profileInfo, setProfileInfo] = useState<any>();

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
          agency_id,
        }) => {
          if (id) setProfileId(id);
          if (profile_image) setProfileImage(profile_image);
          if (name) setName(name);
          if (niches) setNiches(niches);
          if (bio) setBio(bio);
          if (city || state) {
            const locationParts = [city, state].filter(Boolean); // Filter out empty or null values
            setLocation(locationParts.join(", "));
          }
          if (social_following) setSocialFollowing(social_following);
          if (agency_id) setAgencyId(agency_id);
        }
      );
    }
  }, [talentId, location]);

  return {
    // profileInfo,
    agencyId,
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
  };
}

export default useUserMediakitData;
