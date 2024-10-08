import { useState, useEffect } from "react";
import { fetchInfluencerPayments } from "@/services/profile/fetch_acions";
import { UUID } from "crypto";
import { isValidUUID } from "@/utils/functions/validation.functions";

type useUserPaymentProps = {
  userId?: UUID | null;
  talentId?: UUID | null;
  managerId?: UUID | null;
  agencyId?: UUID | null;
};

function useUserPaymentData({
  userId,
  talentId,
  managerId,
  agencyId,
}: useUserPaymentProps) {
  const [paymentInfo, setPaymentInfo] = useState<any>();

  useEffect(() => {
    if (talentId && isValidUUID(talentId)) {
      fetchInfluencerPayments(talentId).then((data: any) => {
        if (data.length > 0) setPaymentInfo(data);
      });
    }
  }, [talentId]);

  return {
    // info for payment sections
    paymentInfo,
    setPaymentInfo,
  };
}

export default useUserPaymentData;
