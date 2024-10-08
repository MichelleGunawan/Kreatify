import { useState, useEffect } from "react";
import {
  fetchPitchlistInfo,
  fetchPitchlistContactInfo,
} from "@/services/pitchlists/fetch_actions";
import { PitchlistUserType, UserPreviewType } from "@/types/user.type";
import { UUID } from "crypto";
import { isValidUUID } from "@/utils/functions/validation.functions";
import { convertToUUID } from "@/utils/functions/converter.functions";

function usePitchlistData({ pitchlistId }: pitchlistHookType) {
  const [pitchlistName, setPitchListName] = useState<string>("");
  const [pitchlistDescription, setPitchListDescription] = useState<string>("");
  const [pitchlistAgencyId, setPitchListAgencyId] = useState<UUID | null>(null);
  const [influencerCount, setInfluencerCount] = useState<number>(0);
  const [pitchlistCreatedBy, setPichlistCreatedBy] = useState<
    UserPreviewType | any
  >([]);
  const [pitchlistContactInfo, setPitchListContactInfo] = useState<any>();
  const [pitchlistInfluencers, setPitchlistInfluencers] = useState<
    PitchlistUserType[]
  >([]);

  useEffect(() => {
    if (pitchlistId && isValidUUID(pitchlistId)) {
      fetchPitchlistInfo(pitchlistId).then(
        ({
          name,
          agency_id,
          influencer_count,
          created_by,
          influencers,
          description,
        }) => {
          if (name) {
            setPitchListName(name);
          }
          if (agency_id) {
            setPitchListAgencyId(convertToUUID(agency_id));
          }

          if (influencer_count) {
            setInfluencerCount(influencer_count);
          }
          if (created_by) {
            setPichlistCreatedBy(created_by);
          }
          if (influencers) {
            setPitchlistInfluencers(influencers as PitchlistUserType[]);
          }
          if (description) {
            setPitchListDescription(description);
          }
        }
      );
      fetchPitchlistContactInfo(pitchlistId).then(setPitchListContactInfo);
    }
  }, [pitchlistId]);

  return {
    pitchlistName,
    pitchlistAgencyId,
    influencerCount,
    pitchlistCreatedBy,
    pitchlistContactInfo,
    pitchlistInfluencers,
    pitchlistDescription,
    setPitchListName,
    setPitchlistInfluencers,
    setPitchListDescription,
  };
}

export default usePitchlistData;

type pitchlistHookType = {
  pitchlistId: UUID | null;
};
