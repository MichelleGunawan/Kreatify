import { useState, useEffect } from "react";
import { UUID } from "crypto";
import { fetchInfluencerPreviews } from "@/services/users/fetch_actions";
import { UserPreviewType } from "@/types/user.type";

type useInfluencerPreviewProps = {
  influencerId: UUID | null;
};

function useInfluencerPreview({ influencerId }: useInfluencerPreviewProps) {
  const [userPreview, setInfluencerPreview] = useState<UserPreviewType | null>(
    null
  );

  useEffect(() => {
    if (influencerId) {
      fetchInfluencerPreviews({
        influencerIds: [influencerId],
      }).then((userPreviews) => {
        setInfluencerPreview(userPreviews[0] as UserPreviewType);
      });
    }
  }, [influencerId]);

  return {
    userPreview,
  };
}

export default useInfluencerPreview;
