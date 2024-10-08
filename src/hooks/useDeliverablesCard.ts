import { useState, useEffect, useMemo } from "react";
import { DeliverableType } from "@/types/campaign.type"; // Adjust the import as needed

interface UseDeliverablesCardProps {
  deliverables: DeliverableType[];
  tab: number;
}

const useDeliverablesCard = ({
  deliverables,
  tab,
}: UseDeliverablesCardProps) => {
  const [completed, setCompleted] = useState(0);
  const currentDeliverable = deliverables[tab];
  const milestones = useMemo(
    () => currentDeliverable?.milestones || [],
    [currentDeliverable]
  );

  useEffect(() => {
    const firstIncomplete = milestones.findIndex(
      (milestone) =>
        milestone.status === "incomplete" || milestone.status === "denied"
    );
    setCompleted(
      firstIncomplete === -1 ? milestones.length - 1 : firstIncomplete
    );
  }, [milestones, tab]);

  return {
    completed,
    currentDeliverable,
    milestones,
  };
};

export default useDeliverablesCard;
