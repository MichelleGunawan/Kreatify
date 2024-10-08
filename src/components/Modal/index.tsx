import React, { Dispatch, SetStateAction } from "react";
import Button from "@/components/Button";
import "./styles/index.scss";
import { COLORS } from "@/utils/constants";

const Modal: React.FC<ModalProps> = ({
  setOpen,
  children,
  title,
  subTitle,
  noButtonText,
  onNoButtonClick,
  goButtonText,
  onGoButtonClick,
  scroll = true,
}) => {
  const handleCloseClick = (e: any) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <div className="modal-overlay">
      {/* Wrap the whole Modal inside the newly created StyledModalWrapper
    and use the ref */}
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">
            <h1 className="h1 text-black">{title}</h1>
            <h2 className="p2 text-black">{subTitle}</h2>
          </div>
          <a href="#" onClick={handleCloseClick} className="modal-close-button">
            x
          </a>
        </div>

        <div className={scroll ? "modal-body-scroll" : "modal-body"}>
          {children}
        </div>

        {(noButtonText || goButtonText) && (
          <div className="modal-button-container">
            <div>
              {noButtonText && (
                <Button
                  color={COLORS.PRIMARY}
                  borderColor={COLORS.PRIMARY}
                  borderRadius="15px"
                  width="120px"
                  textClass="h2"
                  label={noButtonText}
                  onClick={onNoButtonClick}
                />
              )}
            </div>
            <div>
              {goButtonText && (
                <Button
                  color="#ffffff"
                  borderColor={COLORS.PRIMARY}
                  backgroundColor={COLORS.PRIMARY}
                  borderRadius="15px"
                  width="120px"
                  textClass="h2"
                  label={goButtonText}
                  onClick={onGoButtonClick}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;

type ModalProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  title?: string;
  subTitle?: string;
  scroll?: boolean;
  noButtonText?: string;
  onNoButtonClick?: () => void;
  goButtonText?: string;
  onGoButtonClick?: () => void;
};
