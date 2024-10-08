import { useState, useEffect } from "react";
import { UUID } from "crypto";
import { fetchAgencyLogoInfo } from "@/services/agency/fetch_actions";

const useAgencyLogo = ({ agencyId }: { agencyId: UUID | null }) => {
  const [agencyLogo, setAgencyLogo] = useState<string | null>(null);
  const [agencyName, setAgencyName] = useState<string | null>(null);
  const [agencyWebsite, setAgencyWebsite] = useState<string | null>(null);

  useEffect(() => {
    if (agencyId) {
      fetchAgencyLogoInfo(agencyId).then(
        ({ agency_logo, agency_name, agency_website }) => {
          setAgencyLogo(agency_logo);
          setAgencyName(agency_name);
          setAgencyWebsite(agency_website);
        }
      );
    }
  }, [agencyId]);

  return {
    agencyLogo,
    agencyName,
    agencyWebsite,
  };
};

export default useAgencyLogo;
