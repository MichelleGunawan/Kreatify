import { useState, useEffect } from "react";
import { useGlobalContext } from "@/context";
import {
  fetchMilestoneById,
  fetchMilestoneNotes,
} from "@/services/deliverables/fetch_actions";
import { MilestoneNoteType, MilestoneStatusType } from "@/types/campaign.type";

const useMilestoneData = (id: number) => {
  const { userPermission } = useGlobalContext();
  const [milestoneType, setMilestoneType] = useState<string>("");
  const [milestoneSubmission, setMilestoneSubmission] = useState<any>({});
  const [milestoneStatus, setMilestoneStatus] =
    useState<MilestoneStatusType>("incomplete");
  const [milestoneNotes, setMilestoneNotes] = useState<MilestoneNoteType[]>([]);

  useEffect(() => {
    if (id) {
      fetchMilestoneById(id).then((data) => {
        if (data.type) setMilestoneType(data.type);
        if (data.submission) setMilestoneSubmission(data.submission);
        if (data.status) setMilestoneStatus(data.status);
      });
    }
  }, [id]);

  useEffect(() => {
    if (id && userPermission) {
      fetchMilestoneNotes(id, userPermission).then(setMilestoneNotes);
    }
  }, [id, userPermission]);

  return {
    milestoneNotes,
    setMilestoneNotes,

    milestoneType,
    setMilestoneType,
    milestoneSubmission,
    setMilestoneSubmission,
    milestoneStatus,
    setMilestoneStatus,
  };
};

export default useMilestoneData;
