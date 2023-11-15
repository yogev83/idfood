import { useNavigate } from "react-router-dom";
import { Slidy } from "../../slidy/slidy";
import { Navigation24Regular } from "@fluentui/react-icons";
import { useContext, useState } from "react";

import { Body1Strong } from "@fluentui/react-components";
import { UserContext } from "../../../app/userContext/userContext";
import { LoginDialogWithTriggerButton } from "../../pages/home/loginDialog/loginDialogWithTriggerButton";

import "./menu.css";

export const Menu = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`, // Pass the session token in the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      sessionStorage.removeItem("sessionToken"); // Remove the session token from sessionStorage
      sessionStorage.removeItem("loginToken"); // Remove the login token
      navigate("/");
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="menu">
      <Navigation24Regular onClick={() => setIsOpen(true)} />
      <Slidy open={isOpen} onClose={() => setIsOpen(false)}>
        {user ? (
          <Body1Strong onClick={handleLogout} className="menu-item">
            יציאה
          </Body1Strong>
        ) : (
          <>
            <LoginDialogWithTriggerButton loginType={"unit"}>
              <div className="menu-item">
                <Body1Strong>התחברו כחיילים</Body1Strong>{" "}
              </div>
            </LoginDialogWithTriggerButton>
            <LoginDialogWithTriggerButton loginType={"volunteer"}>
              <div className="menu-item">
                <Body1Strong>התחברו כמתנדבים</Body1Strong>
              </div>
            </LoginDialogWithTriggerButton>
          </>
        )}
      </Slidy>
    </div>
  );
};
