import React from "react";
import "./styles/index.scss";

const DisplayImage: React.FC<DisplayImageProps> = ({
  data,
  label,
  alt = "Image",
  size = "100px",
  onClick,
}) => {
  return (
    <div className="display-image-container" onClick={onClick}>
      <div
        className="display-image-image-container"
        style={{ width: size, height: size }}
      >
        {data && (
          <img
            src={
              data ||
              "https://res.cloudinary.com/dqfvqkqhe/image/upload/v1720151320/grey.png"
            }
            alt={alt}
            className="display-image-image"
            loading="lazy"
          />
        )}
      </div>

      {label && <div className="p2 display-image-label">{label}</div>}
    </div>
  );
};

export default DisplayImage;

interface DisplayImageProps {
  data?: string | null;
  label?: string;
  alt?: string;
  size?: string;
  onClick?: () => void;
}
