import { useState, useEffect } from "react";
import { UUID } from "crypto";
import { fetchUserPreviews } from "@/services/users/fetch_actions";
import { UserPreviewType } from "@/types/user.type";

type useUserPreviewProps = {
  managerOrInfluencerId: UUID | null;
};

function useUserPreview({ managerOrInfluencerId }: useUserPreviewProps) {
  const [userPreview, setUserPreview] = useState<UserPreviewType | null>(null);

  useEffect(() => {
    if (managerOrInfluencerId) {
      fetchUserPreviews({
        managerOrInfluencerIds: [managerOrInfluencerId],
      }).then((userPreviews) => {
        setUserPreview(userPreviews[0] as UserPreviewType);
      });
    }
  }, [managerOrInfluencerId]);

  return {
    userPreview,
  };
}

export default useUserPreview;
