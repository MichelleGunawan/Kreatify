"use client";
import React from "react";
import { UUID } from "crypto";
import { useRouter } from "next/navigation";

// Custom components
import DisplayImage from "@/components/DisplayImage";
import useUserPreviews from "@/hooks/useUserPreviews";
import { Tooltip } from "@mui/material";

import "../styles/cells.scss";

const UserPreviewsCell: React.FC<UsersCellProp> = ({ ids, totalCount }) => {
  const router = useRouter();
  const { userPreviews } = useUserPreviews({ managerOrInfluencerIds: ids });

  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {userPreviews &&
          userPreviews.length > 0 &&
          userPreviews
            .slice(0, 3)
            .map(({ id, name, profile_image, user_type }, index) => (
              <Tooltip key={id} title={name}>
                <div
                  className="user-preview"
                  style={{
                    marginLeft: index !== 0 ? "-4px" : "4px",
                    zIndex: index,
                  }}
                >
                  <DisplayImage
                    size="40px"
                    data={profile_image}
                    onClick={() => router.push(`/profile/${user_type}/${id}`)}
                  />
                </div>
              </Tooltip>
            ))}
        {totalCount - 3 > 0 && (
          <div
            className="user-preview"
            style={{ marginLeft: "-4px", zIndex: 5 }}
          >
            <h3 className="p2">{`${totalCount - 3} +`}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPreviewsCell;

type UsersCellProp = {
  ids: UUID[];
  totalCount: number;
};
