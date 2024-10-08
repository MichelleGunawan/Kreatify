import React, { Dispatch, SetStateAction, useState } from "react";
import { useGlobalContext } from "@/context";
import Modal from "@/components/Modal";
import InputText from "@/components/InputText";
import { MilestoneType } from "@/types/campaign.type";
import "./styles/index.scss";
import { createMilestoneNote } from "@/services/deliverables/post_actions";
import useMilestoneData from "@/hooks/useMilestoneData";
import { formatDateForDisplay } from "@/utils/functions/format.functions";
import Button from "../Button";
import { getIconLink } from "@/utils/functions/iconLinks";
import ModalText from "../ModalText";
import ModalSubmission from "../ModalSubmission";
import Separator from "../Separator";

const ModalMilestoneInfo: React.FC<ModalMilestoneInfoProps> = ({
  milestone,
  setOpen,
}) => {
  const { firstName, lastName } = useGlobalContext();
  const [isModalTextOpen, setIsModalTextOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const { id, type } = milestone;
  const {
    milestoneNotes,
    setMilestoneNotes,
    milestoneSubmission,
    setMilestoneStatus,
  } = useMilestoneData(id);

  const [newNote, setNewNote] = useState("");
  // const [isModalTextOpen, setIsModalTextOpen] = useState(false);

  const handleAddNote = () => {
    if (newNote.trim() === "") return; // Prevent adding empty notes
    const createdDate = new Date().toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
    });

    createMilestoneNote(milestone.id, newNote, `${firstName} ${lastName}`);
    setMilestoneNotes([
      ...milestoneNotes,
      {
        id: Math.random(),
        milestone_id: id,
        note: newNote,
        created_at: createdDate,
        created_by: firstName ? `${firstName} ${lastName}` : "Guest",
        seen: false,
      },
    ]);
    setNewNote("");
  };

  return (
    <Modal
      setOpen={setOpen}
      title={type}
      scroll={false}
      goButtonText="Add Note"
      onGoButtonClick={handleAddNote}
    >
      <div className="modal-milestone-info-body">
        <div className="modal-milestone-header-footer">
          {milestoneSubmission &&
            (milestoneSubmission.type?.toLowerCase() === "file" ? (
              <Button
                icon={getIconLink("download")}
                color="#775fff"
                borderColor="#775fff"
                borderRadius="10px"
                label="Download File"
                compress={false}
                onClick={() => {}}
              />
            ) : milestoneSubmission.type?.toLowerCase() === "link" ? (
              <Button
                icon={getIconLink("link")}
                color="#775fff"
                borderColor="#775fff"
                borderRadius="10px"
                label="Open Link"
                compress={false}
                onClick={() =>
                  window.open(milestoneSubmission.submission, "_blank")
                }
              />
            ) : milestoneSubmission.type?.toLowerCase() === "text" ? (
              <Button
                icon={getIconLink("text")}
                color="#775fff"
                borderColor="#775fff"
                borderRadius="10px"
                label="View Text"
                compress={false}
                onClick={() => setIsModalTextOpen(true)}
              />
            ) : (
              <div className="no-submission">Awaiting Submission...</div>
            ))}
          {milestoneSubmission.description && (
            <InputText
              value={milestoneSubmission.description}
              onChange={() => {}}
              maxRows={3}
              disabled={true}
            />
          )}
        </div>
        <Separator />
        <div className="modal-milestone-info-notes">
          <h2 className="h2 text-black">Notes</h2>
          {milestoneNotes.length > 0 && (
            <div className="modal-info-milestone-notes-container">
              {milestoneNotes.map((note, index) => (
                <>
                  <div key={index} className="modal-info-milestone-notes">
                    <p className="p2 text-black">{note.note}</p>
                    <div className="modal-info-milestone-note-subtext-container">
                      <p className="p3 modal-info-milestone-note-subtext">
                        {note.created_by}
                      </p>
                      <p className="p3 modal-info-milestone-note-subtext">
                        {formatDateForDisplay(note.created_at)}
                      </p>
                    </div>
                  </div>
                </>
              ))}
            </div>
          )}
        </div>
        <div className="modal-milestone-header-footer">
          <InputText
            minRow={1}
            maxRows={5}
            value={newNote}
            onChange={setNewNote}
            placeholder="Add an update..."
          />
        </div>
      </div>
      {isModalTextOpen && (
        <ModalText
          setOpen={setIsModalTextOpen}
          title={type}
          text={milestoneSubmission?.submission}
        />
      )}
      {isSubmitModalOpen && (
        <></>
        // <ModalSubmission
        //   setOpen={setIsSubmitModalOpen}
        //   milestoneId={id}
        //   title={`Submit ${type}`}
        //   submission={milestoneSubmission?.submission}
        //   setSubmission={setMilestoneSubmission}
        //   setStatus={setMilestoneStatus}
        //   setShowAlert={setShowAlert}
        //   setIsModalTextOpen={setIsModalTextOpen}
        //   createMilestoneSubmissionNotification={
        //     createMilestoneSubmissionNotification
        //   }
        // />
      )}
    </Modal>
  );
};

export default ModalMilestoneInfo;

type ModalMilestoneInfoProps = {
  milestone: MilestoneType;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
