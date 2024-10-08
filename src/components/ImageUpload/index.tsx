import React, { useRef } from "react";
import Icon from "../Icon";
import { getIconLink } from "@/utils/functions/iconLinks";
import { COLORS } from "@/utils/constants";
import "./styles/index.scss";

const ImageUpload: React.FC<ImageUploadProps> = ({
  data,
  handleChange,
  label,
  color = COLORS.PRIMARY,
  icon = getIconLink("upload"),
  error,
}) => {
  const fileInput = useRef<HTMLInputElement>(null);

  return (
    <div className="image-upload-container">
      <button
        className="image-upload-image-container"
        style={{
          borderColor: color,
        }}
        onClick={() => {
          if (fileInput.current) {
            fileInput.current.click();
          }
        }}
      >
        {!data && <Icon link={icon} size={44} color={color} />}
        {data && (
          <img src={data} alt="Profile Pic" className="image-upload-image" />
        )}
        <div className="h2 image-upload-overlay">Upload Image</div>
      </button>
      <input
        type="file"
        role="image"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        ref={fileInput}
        onChange={(event) => {
          if (event.target.files) {
            handleChange("img", URL.createObjectURL(event.target.files[0]));
          }
        }}
        style={{ display: "none" }}
      />
      <div className="p2 image-upload-label">{label}</div>
      {error != "" && (
        <span className="p2 image-upload-error-text">{error}</span>
      )}
    </div>
  );
};

export default ImageUpload;

interface ImageUploadProps {
  data: string | null;
  handleChange: (field: string, value: any) => void;
  label?: string;
  color?: string;
  icon?: string;
  error?: string;
}
