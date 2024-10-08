"use client";
import React, { useState } from "react";
import { BrandType } from "@/types/social.type";
import "../styles/cells.scss";
import { Tooltip } from "@mui/material";
import { formatUrl } from "@/utils/functions/format.functions";

const BrandCell: React.FC<BrandCellProp> = ({ content }) => {
  const brand_link = formatUrl(content.brand_link);
  const [imageError, setImageError] = useState(false);

  return (
    <Tooltip title={content.brand_name}>
      <a
        href={brand_link}
        target="_blank"
        rel="noopener noreferrer"
        className="cell-icon-container"
      >
        {!imageError && brand_link ? (
          <img
            src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${brand_link}&size=64`}
            alt={`${content.brand_name} logo`}
            onError={() => setImageError(true)} // Handle image load failure
            loading="lazy"
            className="cell-icon-container"
          />
        ) : (
          <div>{content.brand_name}</div> // Fallback content if image fails to load
        )}
      </a>
    </Tooltip>
  );
};

export default BrandCell;

type BrandCellProp = {
  content: BrandType;
};
