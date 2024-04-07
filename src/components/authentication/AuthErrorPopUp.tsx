import React from "react";
import { Button } from "@mui/material";

interface ErrorPopupProps {
  message: string;
  onClose: () => void;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ message, onClose }) => (
  <div style={{ backgroundColor: "#f5f5f5", padding: "10px", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", borderRadius: "5px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", width: "300px" }}>
    <div style={{ backgroundColor: "#1976d2", padding: "10px", borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}>
      <p style={{ color: "#ffffff", margin: 0 }}>Error</p>
    </div>
    <div style={{ padding: "10px" }}>
      <p>{message}</p> {/* Display dynamic error message */}
      <Button onClick={onClose} variant="contained" color="primary">Close</Button>
    </div>
  </div>
);

export default ErrorPopup;


