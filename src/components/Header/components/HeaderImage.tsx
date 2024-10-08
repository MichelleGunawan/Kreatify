"use client";
import React, { useState } from "react";
import DisplayImage from "@/components/DisplayImage";
import HeaderMenu from "@/components/HeaderMenu";
import "../styles/headerImage.scss";

const HeaderImage: React.FC<HeaderImageProps> = ({ profilePic }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="header-image">
      <DisplayImage
        data={profilePic}
        size="40px"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />

      <HeaderMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
};

export default HeaderImage;

type HeaderImageProps = {
  profilePic: string;
};
