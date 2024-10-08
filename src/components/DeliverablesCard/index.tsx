"use client";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@/context";
import CustomTabs from "../Tabs";
import Button from "../Button";
import Stepper from "../Stepper";
import InputFile from "../InputFile";
import Separator from "../Separator";
import MilestoneSubmissionCard from "../MilestoneSubmissionCard";
import ModalMilestoneInfo from "../ModalMilestoneInfo";
import { DeliverableType } from "@/types/campaign.type";
import { getIconLink } from "@/utils/functions/iconLinks";
import { formatDateForDisplay } from "@/utils/functions/format.functions";
import useDeliverablesCard from "@/hooks/useDeliverablesCard";
import "./styles/index.scss";

interface DeliverablesCardProps {
  deliverables: DeliverableType[];
  campaignStatus: string;
  createMilestoneSubmissionNotification: (milestoneType: string) => void;
}

const DeliverablesCard: React.FC<DeliverablesCardProps> = ({
  deliverables,
  campaignStatus,
  createMilestoneSubmissionNotification,
}) => {
  const [tab, setTab] = useState(0);
  const [modalInfoOpen, setModalInfoOpen] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(-1);

  const { completed, currentDeliverable, milestones } = useDeliverablesCard({
    deliverables,
    tab,
  });
  const handleTabChange = (index: number) => setTab(index);
  const handleCheckpointClick = (index: number) => {
    setClickedIndex(index);
    setModalInfoOpen(true);
  };

  const tabs =
    deliverables.length > 0
      ? deliverables.map((_, index) => `Deliverable ${index + 1}`)
      : ["Deliverable 1"];
  const deliverableMilestones = milestones.map((milestone, index) => ({
    id: index + 1,
    text: milestone.type,
    subText: formatDateForDisplay(milestone.due_date),
    icon: milestone?.social?.platform,
    tooltipText: milestone?.social?.handle,
    details: milestone.unread_note,
  }));

  return (
    <div className="deliverable-card">
      <div className="deliverable-card-header">
        <CustomTabs tabs={tabs} tab={tab} setTab={handleTabChange} />
        <div className="deliverable-card-header-button-container">
          <Button
            icon={getIconLink("prev")}
            color="#775FFF"
            backgroundColor="transparent"
            borderColor="#775FFF"
            width="40px"
            height="40px"
            borderRadius="100px"
            onClick={() => setTab(Math.max(tab - 1, 0))}
          />
          <Button
            icon={getIconLink("next")}
            color="#ffffff"
            backgroundColor="#775FFF"
            borderColor="#775FFF"
            width="40px"
            height="40px"
            borderRadius="100px"
            onClick={() => setTab(Math.min(tab + 1, deliverables.length - 1))}
          />
        </div>
      </div>

      <div className="deliverable-card-body">
        {/* Milestone Section */}
        <div className="deliverable-card-milestone-section">
          <div className="deliverable-card-milestones hide-scrollbar">
            <Stepper
              color="#FFAB05"
              inactiveColor="#FFEECD"
              checkpoints={deliverableMilestones}
              completed={completed}
              onCheckpointClick={handleCheckpointClick}
            />
          </div>
          {campaignStatus.toLowerCase() !== "pending" && (
            <>
              {milestones.map(({ id }, index) => (
                <MilestoneSubmissionCard
                  key={index}
                  milestoneId={id}
                  createMilestoneSubmissionNotification={
                    createMilestoneSubmissionNotification
                  }
                />
              ))}
              <Separator color="#ededed" />
            </>
          )}
        </div>

        {/* Attachments Section */}
        <div className="deliverable-card-attachments-section">
          <h2 className="h2 text-black">Attachments</h2>
          <div className="deliverable-card-attachments">
            {campaignStatus.toLowerCase() !== "pending" &&
              currentDeliverable?.attachments?.map((file, index) => (
                <InputFile
                  key={index}
                  file={file}
                  upload={false}
                  color="#775FFF"
                />
              ))}
          </div>
        </div>

        {/* Notes Section */}
        <div className="deliverable-card-notes-container">
          <h2 className="h2 text-black">Notes</h2>
          <p className="p2 text-black">{currentDeliverable?.note}</p>
        </div>
      </div>

      {/* Milestone Info Modal */}
      {modalInfoOpen && (
        <ModalMilestoneInfo
          milestone={milestones[clickedIndex]}
          setOpen={setModalInfoOpen}
        />
      )}
    </div>
  );
};

export default DeliverablesCard;
