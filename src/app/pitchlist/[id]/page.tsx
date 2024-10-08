"use client";
import React, { useState, useEffect } from "react";

//Component import
import LoggedinLayout from "@/layouts/LoggedinLayout";
import PresentationLayout from "@/layouts/PresentationLayout";
import HeaderPitchList from "@/components/HeaderPitchList";
import PitchListUserCard from "@/components/PitchListUserCard";
import CardInfoCols from "@/components/CardInfoCols";
import { PageIdPropsType } from "@/types/utils.type";
import usePitchlistData from "@/hooks/usePitchlistData";

//CSS import
import "@/styles/pitchlist.page.scss";

import { MediakitPreviewType } from "@/types/pitchlist.type";
import { UUID } from "crypto";
import { useSession } from "@/hooks/useSession";
import { useGlobalContext } from "@/context";
import { usePitchlistPermission } from "@/hooks/usePitchlistPermission";
import { PAGE_PERMISSIONS } from "@/utils/constants";
import { convertToUUID } from "@/utils/functions/converter.functions";

const PitchListPage: React.FC<PageIdPropsType> = ({ params }) => {
  const { sessionLoading } = useSession({ privatePage: false });
  const { talentId, managerId } = useGlobalContext();
  const { id } = params;
  const { pagePermission } = usePitchlistPermission({
    talentId,
    managerId,
    pitchlistId: convertToUUID(id),
  });

  const {
    pitchlistName,
    pitchlistAgencyId,
    pitchlistCreatedBy,
    pitchlistContactInfo,
    influencerCount,
    pitchlistInfluencers,
    pitchlistDescription,
  } = usePitchlistData({ pitchlistId: convertToUUID(id) });

  const pitchListData = [
    {
      label: "Number of Influencers",
      value: influencerCount,
      type: "number",
    },
    {
      label: "Created By",
      value: pitchlistCreatedBy,
      type: "userpreview",
    },
    {
      label: "Agency Name",
      value: pitchlistAgencyId,
      type: "agencypreview",
    },
  ];

  return (
    <>
      {pagePermission === PAGE_PERMISSIONS.ADMIN ? (
        <LoggedinLayout headerTitle="Pitch List">
          <HeaderPitchList
            id={id}
            name={pitchlistName}
            email={pitchlistContactInfo?.email}
            phone={pitchlistContactInfo?.phone_number}
            whatsapp={pitchlistContactInfo?.whatsapp_number}
            website={pitchlistContactInfo?.website_url}
            view={"internal"}
          />
          <p className="p1 pitchlist-description hide-scrollbar">
            {pitchlistDescription}
          </p>
          <CardInfoCols data={pitchListData} cols={3} />
          <div className="pitchlist-users">
            {pitchlistInfluencers?.length > 0 &&
              pitchlistInfluencers.map(
                ({ id, rate }: { id: string; rate: number }, index: number) => {
                  return (
                    <PitchListUserCard
                      key={index}
                      influencerId={convertToUUID(id)} // Use the matched influencer
                      rate={rate}
                      agencyId={convertToUUID(pitchlistAgencyId)}
                    />
                  );
                }
              )}
          </div>
        </LoggedinLayout>
      ) : (
        <>
          <PresentationLayout agencyId={pitchlistAgencyId}>
            <HeaderPitchList
              id={id}
              name={pitchlistName}
              email={pitchlistContactInfo?.email}
              phone={pitchlistContactInfo?.phone_number}
              whatsapp={pitchlistContactInfo?.whatsapp_number}
              website={pitchlistContactInfo?.website_url}
              view={"external"}
            />
            <CardInfoCols data={pitchListData} cols={3} />
            <div className="pitchlist-users">
              {pitchlistInfluencers?.length > 0 &&
                pitchlistInfluencers.map(
                  (
                    { id, rate }: { id: string; rate: number },
                    index: number
                  ) => {
                    return (
                      <PitchListUserCard
                        key={index}
                        influencerId={convertToUUID(id)} // Use the matched influencer
                        rate={rate}
                        agencyId={convertToUUID(pitchlistAgencyId)}
                      />
                    );
                  }
                )}
            </div>
          </PresentationLayout>
        </>
      )}
    </>
  );
};

export default PitchListPage;
