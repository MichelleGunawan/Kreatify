"use client";
import React, { useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { UUID } from "crypto";
// Custom components
import ProfileInfo from "@/components/ProfileInfo";
import Separator from "../Separator";
import Button from "../Button";
import ModalShare from "../ModalShare";
import DisplayStat from "../DisplayStat";
import ModalMediakit from "../ModalMediakit";
import { MediakitPreviewType } from "@/types/pitchlist.type";
import useIsWidthLessThan from "@/hooks/layoutHooks";
import "./styles/index.scss";
import useUserPreview from "@/hooks/useUserPreview";
import useInfluencerPreview from "@/hooks/useInfluencerPreview";

const PitchListUserCard: React.FC<PitchListUserCardProps> = ({
  influencerId,
  rate,
  agencyId,
}) => {
  const { userPreview } = useInfluencerPreview({
    influencerId: influencerId,
  });
  const router = useRouter();
  const cardRef = useRef(null);
  const isSmall = useIsWidthLessThan(cardRef, 350);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isMediakitModalOpen, setIsMediakitModalOpen] = useState(false);
  const [selectedMediakit, setSelectedMediakit] = useState<string>();

  return (
    <div ref={cardRef} className="pitchlist-user-card">
      <div className="pitchlistuser-card-header">
        {userPreview?.name && (
          <ProfileInfo
            name={userPreview?.name}
            profileImage={userPreview?.profile_image}
            location={userPreview?.location}
            niches={userPreview?.niches}
            imageSize={isSmall ? "50px" : "100px"}
          />
        )}
        {rate !== 0 && (
          <div
            className="p2 text-black"
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            Rate: ${rate}
          </div>
        )}
      </div>
      <Separator />
      <h3 className="h3 text-black">Following</h3>
      <div className="pitchlistuser-following-container hide-scrollbar">
        {userPreview?.social_following?.map(
          ({ platform, handle, followers }, index) => (
            <DisplayStat
              key={index}
              icon={platform}
              title={handle}
              number={followers}
              type="social"
            />
          )
        )}
      </div>
      <div className="pitchlistuser-button-container">
        <Button
          label="Share"
          color="#775FFF"
          borderColor="#775FFF"
          borderRadius="10px"
          height="40px"
          width="50%"
          onClick={() => setIsShareModalOpen(true)}
        />
        <Button
          label="Open Media Kit"
          color="#FFF"
          backgroundColor="#775FFF"
          borderRadius="10px"
          height="40px"
          width="50%"
          onClick={() => {
            setSelectedMediakit(userPreview?.id);
            setIsMediakitModalOpen(true);
            //router.push(`/mediakit/${userPreview?.id}`)
          }}
        />
      </div>
      {isShareModalOpen && (
        <ModalShare
          setOpen={setIsShareModalOpen}
          title={"Share Media Kit"}
          link={`https://app.kreatify.io/mediakit/${userPreview?.id}`} //TODO: add public media link here
        />
      )}

      {isMediakitModalOpen && (
        <ModalMediakit
          setOpen={setIsMediakitModalOpen}
          influencerId={influencerId}
          agencyId={agencyId}
        />
      )}
    </div>
  );
};

export default PitchListUserCard;

type PitchListUserCardProps = {
  influencerId: UUID | null;
  rate: number;
  agencyId: UUID | null;
};
