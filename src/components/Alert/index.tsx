import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import "./styles/index.scss";

const Alert: React.FC<AlertProps> = ({ text, showAlert, setShowAlert }) => {
  const [isTransformed, setIsTransformed] = useState(false);

  useEffect(() => {
    if (showAlert) {
      const transformTimer = setTimeout(() => {
        setIsTransformed(true);
      }, 1000); // Transform after 1.5 seconds

      const hideTimer = setTimeout(() => {
        setShowAlert(false);
        setIsTransformed(false);
      }, 1500); // Remove after 2 seconds

      return () => {
        clearTimeout(transformTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [showAlert, setShowAlert]);

  return (
    <div className={`alert ${isTransformed ? "hidden" : "visible"}`}>
      {text}
    </div>
  );
};

export default Alert;

type AlertProps = {
  text: String;
  showAlert: boolean;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
};
