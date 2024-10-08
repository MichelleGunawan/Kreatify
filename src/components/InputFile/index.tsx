import React, { useRef } from "react";
import Icon from "../Icon";
import { getIconLink } from "@/utils/functions/iconLinks";
import "./styles/index.scss";
import { formatFilename } from "@/utils/functions/format.functions";

interface InputFileProps {
  label?: string;
  file?: any;
  onChange?: (value: any) => void;
  onClick?: () => void;
  error?: string;
  accept?: string;
  upload?: boolean;
  placeholder?: string;
  color?: string;
  width?: string;
  height?: string;
}

const InputFile: React.FC<InputFileProps> = ({
  label,
  file,
  onChange = () => {},
  onClick = () => {},
  error,
  accept,
  upload = true,
  placeholder = "Upload file",
  color = "#a4a4a4",
  width,
  height,
}) => {
  const fileInput = useRef<HTMLInputElement>(null);
  return (
    <div
      className="input-file-container"
      style={{
        width,
        height,
      }}
    >
      <div className="p2 input-file-label">{label}</div>
      <button
        className="p2 input-file-input"
        style={{
          color: color,
          border: `1px solid ${color}`,
        }}
        onClick={() => {
          if (!upload) {
            onClick();
            return;
          }
          if (fileInput.current) {
            fileInput.current.click();
          }
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "4px",
          }}
        >
          {file?.name && (
            <Icon link={getIconLink("file")} size={24} color={color} />
          )}
          <div className="p2">{formatFilename(file?.name) ?? placeholder}</div>
        </div>
        {!file?.name && (
          <Icon link={getIconLink("upload")} size={24} color={color} />
        )}
      </button>
      <input
        type="file"
        ref={fileInput}
        accept={accept}
        onChange={(event) => {
          const files = event.target.files;
          if (files && files.length > 0) {
            const file = files[0];
            onChange(file);
          }
        }}
        style={{ display: "none" }}
      />
      {error != "" && <span className="p2 input-file-error-text">{error}</span>}
    </div>
  );
};

export default InputFile;
