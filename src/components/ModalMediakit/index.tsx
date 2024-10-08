import React, { Dispatch, SetStateAction, useState } from "react";
import Modal from "@/components/Modal";
import MediaKit from "@/app/mediakit/[id]/_components/MediaKit";
import useUserProfileData from "@/hooks/useUserProfileData";
import HeaderPresentation from "../HeaderPresentation";
import { UUID } from "crypto";
import "./styles/index.scss";

const ModalMediakit: React.FC<ModalMediakitProps> = ({
  setOpen,
  influencerId,
  agencyId,
}) => {
  const { profileImage, name, niches, bio, location, socialFollowing } =
    useUserProfileData({ talentId: influencerId });

  return (
    <div className="modal-mediakit-overlay">
      {/* Wrap the whole Modal inside the newly created StyledModalWrapper
    and use the ref */}
      <div className="modal-mediakit">
        <HeaderPresentation agencyId={agencyId} onExit={() => setOpen(false)} />
        <div className="modal-mediakit-body">
          <MediaKit
            profileId={influencerId}
            profileImage={profileImage}
            name={name}
            niches={niches}
            bio={bio}
            location={location}
            socialFollowing={socialFollowing}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalMediakit;

type ModalMediakitProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  influencerId: UUID | null;
  agencyId: UUID | null;
};
