import React from "react";
import { ChevronLeft24Filled } from "@fluentui/react-icons";
import "./slidy.css";

interface SlidyProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Slidy: React.FC<SlidyProps> = ({ open, onClose, children }) => {
  return (
    <div className={`slidy ${open ? "open" : ""}`}>
      <div className="slidy-header">
        <ChevronLeft24Filled className="close-icon" onClick={onClose} />
      </div>
      <div className="slidy-content">{children}</div>
    </div>
  );
};
