"use client";
import React, {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";
import { UUID } from "crypto";
import CustomTabs from "../Tabs";
import Button from "../Button";
import StepperEdit from "../StepperEdit";
import InputText from "../InputText";
import Icon from "../Icon";
import Separator from "../Separator";
import InputFile from "../InputFile";
import ModalEditMilestone from "../StepperEdit/components/ModalEditMilestone";
import useUserSocialData from "@/hooks/useUserSocialData";
import { MilestoneType, DeliverableEditType } from "@/types/campaign.type";
import { getIconLink } from "@/utils/functions/iconLinks";
import { formatDateForDisplay } from "@/utils/functions/format.functions";
import "./styles/index.scss";
import "../DeliverablesCard/styles/index.scss";

interface DeliverablesCardEdit {
  deliverables: DeliverableEditType[];
  setDeliverables: Dispatch<SetStateAction<DeliverableEditType[]>>;
  contract: File | null;
  setContract: Dispatch<SetStateAction<File | null>>;
  selectedTalentId: UUID | null;
}

const DeliverablesCardEdit: React.FC<DeliverablesCardEdit> = ({
  deliverables,
  setDeliverables,
  contract,
  setContract,
  selectedTalentId,
}) => {
  const [tab, setTab] = useState(0);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(-1);
  const { socials } = useUserSocialData({ talentId: selectedTalentId });

  useMemo(() => {
    // If user changes influencer, remove all social data from milestones
    setDeliverables((prevDeliverables) =>
      prevDeliverables.map((deliverable) => ({
        ...deliverable,
        milestones: deliverable.milestones.map((milestone) => ({
          ...milestone,
          social_id: null,
        })),
      }))
    );
  }, [selectedTalentId]);

  const sortedDeliverables = useMemo(() => {
    return deliverables.map((deliverable) => ({
      ...deliverable,
      milestones: deliverable.milestones.slice().sort((a, b) => {
        return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
      }),
    }));
  }, [deliverables]);

  const tabs =
    sortedDeliverables.length > 0
      ? sortedDeliverables.map((_, index) => `Deliverable ${index + 1}`)
      : ["Deliverable 1"];

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const updatedDeliverables = [...sortedDeliverables];
      updatedDeliverables[tab].attachments = [
        ...(updatedDeliverables[tab].attachments || []),
        file,
      ];
      setDeliverables(updatedDeliverables);
    }
  };

  const removeFile = (index: number) => {
    const updatedDeliverables = [...sortedDeliverables];
    updatedDeliverables[tab].attachments = [
      ...(updatedDeliverables[tab].attachments || []).slice(0, index),
      ...(updatedDeliverables[tab].attachments || []).slice(index + 1),
    ];
    setDeliverables(updatedDeliverables);
  };

  const addDeliverable = () => {
    setDeliverables([
      ...sortedDeliverables,
      { milestones: [], attachments: [], note: "" },
    ]);
    setTab(sortedDeliverables.length);
  };

  const removeDeliverable = () => {
    if (sortedDeliverables.length <= 1) {
      setDeliverables([{ milestones: [], attachments: [], note: "" }]);
      setTab(0);
      return;
    }
    setDeliverables([
      ...sortedDeliverables.slice(0, tab),
      ...sortedDeliverables.slice(tab + 1),
    ]);
    setTab(Math.max(tab - 1, 0));
  };

  const editMilestone = (index: number, milestone: MilestoneType) => {
    const newMilestones = sortedDeliverables[tab]?.milestones
      ? [...sortedDeliverables[tab]?.milestones]
      : [];
    newMilestones[index] = milestone;
    setDeliverables([
      ...sortedDeliverables.slice(0, tab),
      { ...sortedDeliverables[tab], milestones: newMilestones },
      ...sortedDeliverables.slice(tab + 1),
    ]);
  };

  const removeMilestone = (index: number) => {
    const newMilestones = [
      ...sortedDeliverables[tab]?.milestones?.slice(0, index),
      ...sortedDeliverables[tab]?.milestones?.slice(index + 1),
    ];

    const newDeliverables = [
      ...sortedDeliverables.slice(0, tab),
      { ...sortedDeliverables[tab], milestones: newMilestones },
      ...sortedDeliverables.slice(tab + 1),
    ];

    setDeliverables(newDeliverables);
  };

  const deliverableMilestones = sortedDeliverables[tab]?.milestones?.map(
    ({ id, type, due_date, social_id, unread_note }) => ({
      id: id,
      text: type,
      subText: formatDateForDisplay(due_date),
      icon: socials.find((social) => social.id === social_id)?.platform,
      tooltipText: socials.find((social) => social.id === social_id)?.handle,
      details: unread_note,
    })
  );

  const handleCheckpointClick = (index: number) => {
    setClickedIndex(index);
    setModalEditOpen(true);
  };

  return (
    <>
      <div className="deliverable-card">
        <div className="deliverable-card-edit-header">
          <CustomTabs tabs={tabs} tab={tab} setTab={setTab} />

          <div className="deliverable-card-edit-header-button-container">
            <Button
              icon={getIconLink("minus")}
              color="#775FFF"
              backgroundColor="transparent"
              borderColor="#775FFF"
              width="40px"
              height="40px"
              borderRadius="100px"
              textClass="h3"
              onClick={removeDeliverable}
            />
            <Button
              icon={getIconLink("add")}
              color="#ffffff"
              backgroundColor="#775FFF"
              borderColor="#775FFF"
              width="40px"
              height="40px"
              borderRadius="100px"
              onClick={addDeliverable}
            />
          </div>
        </div>
        <div className="deliverable-card-body">
          <div className="deliverable-card-edit-milestone-section">
            <div className="deliverable-card-milestones hide-scrollbar">
              <StepperEdit
                color="#FFAB05"
                inactiveColor="#FFEECD"
                checkpoints={deliverableMilestones || []}
                onCheckpointClick={handleCheckpointClick}
                completed={0}
              />
            </div>
          </div>
          <div className="deliverable-card-attachments-section">
            <div className="deliverable-card-header">
              <h2 className="h2 text-black">Attachments</h2>
              <div>
                <Button
                  icon={getIconLink("add")}
                  color="#FFFFFF"
                  backgroundColor="#775FFF"
                  borderColor="#775FFF"
                  borderRadius="50px"
                  width="24px"
                  height="24px"
                  textClass="p"
                  onClick={() => fileInputRef.current?.click()}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />
              </div>
            </div>
            <div className="deliverable-card-attachments-container">
              {tab === 0 && (
                <>
                  <InputFile
                    file={contract}
                    onChange={setContract}
                    placeholder="Contract"
                    width="120px"
                    color={contract?.name ? "#775FFF" : "#a4a4a4"}
                  />

                  <Separator direction="vertical" />
                </>
              )}
              <div className="deliverable-card-attachments">
                {sortedDeliverables[tab]?.attachments?.map((file, index) => (
                  <div key={index} style={{ position: "relative" }}>
                    <InputFile file={file} color="#775FFF" upload={false} />
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "5px",
                      }}
                      onClick={() => removeFile(index)}
                    >
                      <Icon
                        link={getIconLink("remove")}
                        color="#775FFF"
                        size={15}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="deliverable-card-notes-container">
            <InputText
              label="Notes"
              value={sortedDeliverables[tab]?.note}
              onChange={(value) => {
                const newDeliverables = [...sortedDeliverables];
                newDeliverables[tab].note = value;
                setDeliverables(newDeliverables);
              }}
              maxRows={50}
            />
          </div>
        </div>
      </div>
      {modalEditOpen && (
        <ModalEditMilestone
          index={clickedIndex}
          socials={socials}
          milestone={
            sortedDeliverables[tab]?.milestones[clickedIndex] || {
              id: -1,
              type: "",
              status: "incomplete",
              due_date: "",
              unread_note: false,
            }
          }
          editCheckpoint={editMilestone}
          removeCheckpoint={removeMilestone}
          setOpen={setModalEditOpen}
        />
      )}
    </>
  );
};

export default DeliverablesCardEdit;
