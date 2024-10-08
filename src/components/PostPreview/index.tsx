"use client";
import React, { useState } from "react";
import "./styles/index.scss";

const PostPreview: React.FC<PostPreviewProps> = ({ image, platform }) => {
  return (
    <div
      className="post-preview"
      style={{ aspectRatio: "9/16", backgroundImage: `url(${image})` }}
    ></div>
  );
};

export default PostPreview;

type PostPreviewProps = {
  image: string;
  platform?: string;
};
