import { useState, useEffect } from "react";
import { UUID } from "crypto";
import { fetchUserPreviews } from "@/services/users/fetch_actions";
import { UserPreviewType } from "@/types/user.type";

type useUserPreviewsProps = {
  managerOrInfluencerIds: UUID[] | null;
};

function useUserPreviews({ managerOrInfluencerIds }: useUserPreviewsProps) {
  const [userPreviews, setUserPreviews] = useState<UserPreviewType[] | null>(
    null
  );

  useEffect(() => {
    if (managerOrInfluencerIds && managerOrInfluencerIds?.length > 0) {
      fetchUserPreviews({ managerOrInfluencerIds }).then((userPreviews) => {
        setUserPreviews(userPreviews as UserPreviewType[]);
      });
    }
  }, [managerOrInfluencerIds]);

  return {
    userPreviews,
  };
}

export default useUserPreviews;
