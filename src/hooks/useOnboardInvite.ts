import { useState, useEffect } from "react";
import { UUID } from "crypto";
import { fetchOnboardInvite } from "@/services/invites/fetch_actions";
import { isValidUUID } from "@/utils/functions/validation.functions";

type useOnboardInviteProps = {
  inviteId?: UUID | null;
};

function useOnboardInviteData({ inviteId }: useOnboardInviteProps) {
  const [onboardInvite, setOnboardInvite] = useState<UserOnboardingType | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (inviteId && isValidUUID(inviteId)) {
        setLoading(true);
        setError(null); // Reset error state before fetching
        try {
          const data = await fetchOnboardInvite(inviteId);
          setOnboardInvite(data);
        } catch (err) {
          setError("Failed to fetch onboard invite data."); // Set error message
        } finally {
          setLoading(false); // Set loading to false after fetch attempt
        }
      } else {
        setError("Invalid onboard link"); // Set error for invalid UUID
      }
    };

    fetchData();
  }, [inviteId]);

  return {
    onboardInvite,
    loading,
    error,
  };
}

export default useOnboardInviteData;

type UserOnboardingType = {
  agency_id: string;
  contract_url: string | null;
  created_at: string;
  email: string;
  id: string;
  user_role: string;
  user_type: string;
};
