import { useState, useEffect } from "react";
import {
  fetchManagerContacts,
  fetchAgencyContacts,
} from "@/services/contacts/contact_actions";
import { UUID } from "crypto";
import { isValidUUID } from "@/utils/functions/validation.functions";
import usePermission from "@/hooks/usePermission";
import { USER_PERMISSIONS } from "@/utils/constants";

interface useContactsDataProps {
  managerId?: UUID | null;
  agencyId?: UUID | null;
}

function useContactsData(props: useContactsDataProps) {
  const M3Permission = usePermission(USER_PERMISSIONS.TIER_M3);

  const { managerId, agencyId } = props;

  const [managerContacts, setManagerContacts] = useState<any[]>([]);
  const [agencyContacts, setAgencyContacts] = useState<any[]>([]);

  useEffect(() => {
    if (M3Permission && managerId && isValidUUID(managerId)) {
      fetchManagerContacts(managerId).then(setManagerContacts);
    }
  }, [managerId, M3Permission]);

  useEffect(() => {
    if (M3Permission && agencyId && isValidUUID(agencyId)) {
      fetchAgencyContacts(agencyId).then(setAgencyContacts);
    }
  }, [agencyId, M3Permission]);

  return {
    managerContacts,
    agencyContacts,
  };
}

export default useContactsData;
