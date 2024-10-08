import { useState, useEffect } from "react";
import { useGlobalContext } from "@/context";
import { fetchInfluencerCampaignMatchingAnswers } from "@/services/campaignMatching/fetch_actions";
import { UUID } from "crypto";
import { isValidUUID } from "@/utils/functions/validation.functions";
import { formatListWithComma } from "@/utils/functions/format.functions";

type useCampaignMatchingProps = {
  userId?: UUID | null;
  talentId?: UUID | null;
  managerId?: UUID | null;
  agencyId?: UUID | null;
  questionId?: number | null;
};
const useCampaignMatchingData = ({
  talentId,
  questionId,
}: useCampaignMatchingProps = {}) => {
  const [answerId, setAnswerId] = useState<number>(-1);
  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    if (talentId && questionId && isValidUUID(talentId)) {
      fetchInfluencerCampaignMatchingAnswers(talentId, questionId).then(
        ({ id, answer }) => {
          if (id) setAnswerId(id);
          if (answer) setAnswer(answer);
        }
      );
    }
  }, [talentId, questionId]);

  return {
    answerId,
    answer,
    setAnswer,
  };
};

export default useCampaignMatchingData;
