import { useState, useEffect } from "react";
import { fetchTalentMonthlyEarnings } from "@/services/finance/talent_actions";
import {
  fetchAgencyMonthlyEarnings,
  fetchManagerMonthlyEarnings,
} from "@/services/finance/manager_actions";
import { UUID } from "crypto";
import { isValidUUID } from "@/utils/functions/validation.functions";
import usePermission from "@/hooks/usePermission";
import { USER_PERMISSIONS } from "@/utils/constants";

interface useEarningsDataProps {
  myEarningsYear: number;
  agencyEarningsYear?: number;
  talentId?: UUID | null;
  managerId?: UUID | null;
  agencyId?: UUID | null;
}

function useEarningsData(props: useEarningsDataProps) {
  const I1Permission = usePermission(USER_PERMISSIONS.TIER_I1);
  const M3Permission = usePermission(USER_PERMISSIONS.TIER_M3);

  const { myEarningsYear, agencyEarningsYear, talentId, managerId, agencyId } =
    props;

  const [myMonthlyEarnings, setMyMonthlyEarnings] = useState<number[]>([]);
  const [agencyMonthlyEarnings, setAgencyMonthlyEarnings] = useState<number[]>(
    []
  );
  const [myYtdEarnings, setMyYtdEarnings] = useState<number>(0);

  const [agencyYtdEarnings, setAgencyYtdEarnings] = useState<number>(0);

  useEffect(() => {
    if (I1Permission && talentId && isValidUUID(talentId)) {
      fetchTalentMonthlyEarnings(talentId, myEarningsYear).then((data) => {
        setMyMonthlyEarnings(data);
        setMyYtdEarnings(data.reduce((a, b) => a + b, 0));
      });
    }
  }, [myEarningsYear, talentId, I1Permission]);

  useEffect(() => {
    if (M3Permission && managerId && isValidUUID(managerId)) {
      fetchManagerMonthlyEarnings(managerId, myEarningsYear).then((data) => {
        setMyMonthlyEarnings(data);
        setMyYtdEarnings(data.reduce((a, b) => a + b, 0));
      });
    }
  }, [myEarningsYear, managerId, M3Permission]);

  useEffect(() => {
    if (M3Permission && agencyId && agencyEarningsYear) {
      fetchAgencyMonthlyEarnings(agencyId, agencyEarningsYear).then((data) => {
        setAgencyMonthlyEarnings(data);
        setAgencyYtdEarnings(data.reduce((a, b) => a + b, 0));
      });
    }
  }, [agencyEarningsYear, agencyId, M3Permission]);

  return {
    myMonthlyEarnings,
    agencyMonthlyEarnings,
    myYtdEarnings,
    agencyYtdEarnings,
  };
}

export default useEarningsData;
