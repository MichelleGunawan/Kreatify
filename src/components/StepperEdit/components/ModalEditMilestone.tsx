import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "@/components/Modal";
import InputText from "@/components/InputText";
import InputSelect from "@/components/InputSelect";
import ModalConfirmDelete from "@/components/ModalConfirmDelete";
import InputSelectSocial from "@/components/InputSelectSocial";
import { deleteMilestone } from "@/services/campaign/delete_actions";
import { SocialInputType } from "@/types/social.type";
import {
  formatDateForDisplay,
  formatDateForDB,
} from "@/utils/functions/format.functions";
import { MilestoneSubmitType } from "@/types/campaign.type";
import { milestoneTypes } from "@/utils/variables/campaign.variables";
import "../styles/modalEdit.scss";

const ModalEditMilestone: React.FC<ModalEditMilestoneProps> = ({
  index,
  milestone,
  setOpen,
  editCheckpoint,
  removeCheckpoint,
  socials,
}) => {
  const [type, setType] = useState(milestone.type);
  const [dueDate, setDueDate] = useState(milestone.due_date);
  const [socialId, setSocialId] = useState<string | null>(
    milestone?.social_id ?? null
  );

  const [errors, setErrors] = useState({
    type: "",
    dueDate: "",
    socialId: "",
  });
  const [modalConfirmDeleteOpen, setModalConfirmDeleteOpen] = useState(false);

  useEffect(() => {
    if (milestone.due_date) {
      setDueDate(formatDateForDB(milestone.due_date));
    }
  }, [milestone.due_date]);

  const handleSave = () => {
    if (!type || !dueDate) {
      setErrors({
        ...errors,
        type: !type ? "Please select a milestone type" : "",
        dueDate: !dueDate ? "Please set a due date" : "",
      });
      return;
    }
    const newCheckpoint: MilestoneSubmitType = {
      id: milestone.id,
      type: type,
      due_date: formatDateForDisplay(`${dueDate} 00:00:00`),
      social_id: socialId,
      status: "incomplete",
      unread_note: false,
    };

    editCheckpoint(index, newCheckpoint);
    setOpen(false);
  };

  const handleDeleteMilestone = () => {
    deleteMilestone(milestone.id);
    removeCheckpoint(index);
    setOpen(false);
  };

  return (
    <>
      <Modal
        setOpen={setOpen}
        title="Edit Milestone Info"
        noButtonText="Delete"
        onNoButtonClick={() => {
          setModalConfirmDeleteOpen(true);
        }}
        goButtonText="Save" //TODO: add function props
        onGoButtonClick={handleSave}
      >
        <div className="modal-edit-milestone-body">
          <div className="modal-edit-milestone-row">
            <InputSelect
              label="Type*"
              value={type}
              onChange={(value) => {
                if (type != "Repost" || value == "Repost") {
                  setSocialId(null);
                }

                setType(value);
              }}
              options={milestoneTypes}
              error={errors.type}
            />
            <InputText
              label="Due Date*"
              value={dueDate}
              onChange={setDueDate}
              type="date"
              error={errors.dueDate}
            />
          </div>
          {(type == "Post" || type == "Repost") && (
            <InputSelectSocial
              label="Social Handle*"
              value={socialId}
              onChange={setSocialId}
              options={socials}
              placeholder={
                socials.length == 0
                  ? "Select an influencer first"
                  : "Select a social handle"
              }
              error={errors.socialId}
            />
          )}
        </div>
      </Modal>
      {modalConfirmDeleteOpen && (
        <ModalConfirmDelete
          number={1}
          setOpen={setModalConfirmDeleteOpen}
          onDelete={handleDeleteMilestone}
        />
      )}
    </>
  );
};

export default ModalEditMilestone;

type ModalEditMilestoneProps = {
  index: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
  milestone: MilestoneSubmitType;
  editCheckpoint: (id: number, milestone: MilestoneSubmitType) => void;
  removeCheckpoint: (id: number) => void;
  socials: SocialInputType[];
};
