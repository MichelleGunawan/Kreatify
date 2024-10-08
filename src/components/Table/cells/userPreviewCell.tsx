"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Tooltip } from "@mui/material";

// Custom components
import "../styles/cells.scss";
import { UserPreviewType } from "@/types/user.type";
import DisplayImage from "@/components/DisplayImage";

const UserPreviewCell: React.FC<UserPreviewCellProp> = ({ content }) => {
  const router = useRouter();

  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Tooltip key={content.user_id} title={content.name}>
        <div
          className="flex flex-row justify-start items-center gap-2 cursor-pointer"
          key={content.user_id}
          onClick={() =>
            router.push(`/profile/${content?.user_type}/${content?.id}`)
          }
        >
          {content.profile_image ? (
            <>
              <DisplayImage size="40px" data={content.profile_image} />{" "}
              <div>{content.name}</div>
            </>
          ) : (
            <div>{content.name}</div>
          )}
        </div>
      </Tooltip>
    </div>
  );
};

export default UserPreviewCell;

type UserPreviewCellProp = {
  content: UserPreviewType;
};
