import React from "react";
import "./Alert.css";

const Alert = ({ alert }) => {
  return (
    alert !== null && (
      <div
        className={`alert alert-${alert.alertType} fixed top-0 z-[9999] w-full text-center font-bold`}
      >
        {alert.msg}
      </div>
    )
  );
};

export default Alert;
