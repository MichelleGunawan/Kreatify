import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchSession } from "@/services/auth/fetch_actions";
import { useGlobalContext } from "@/context";

export const useSession = ({
  privatePage = true,
}: {
  privatePage?: boolean;
}) => {
  const [sessionLoading, setSessionLoading] = useState(true);
  const router = useRouter();
  const {
    setFirstName,
    setLastName,
    setUserId,
    setTalentId,
    setManagerId,
    setAgencyId,
    setUserPermission,
  } = useGlobalContext();

  useEffect(() => {
    const fetchSessionData = async () => {
      const sessionData = await fetchSession();

      if (!sessionData?.userId && privatePage) {
        router.push("/login");
      } else {
        // Destructure the session data
        const {
          firstName,
          lastName,
          userId,
          influencerId,
          managerId,
          agencyId,
          userPermission,
        } = sessionData;

        if (
          privatePage &&
          (!firstName || !lastName || !userId || !userPermission)
        ) {
          router.push("/login");
        }

        // Set global state values
        if (firstName) setFirstName(firstName);
        if (lastName) setLastName(lastName);
        if (userId) setUserId(userId);
        if (influencerId) setTalentId(influencerId);
        if (managerId) setManagerId(managerId);
        if (agencyId) setAgencyId(agencyId);
        setUserPermission(userPermission);
      }

      setSessionLoading(false);
    };

    fetchSessionData();
  }, [
    privatePage,
    setAgencyId,
    setFirstName,
    setLastName,
    setManagerId,
    setTalentId,
    setUserPermission,
    setUserId,
    router,
  ]);

  return { sessionLoading };
};
