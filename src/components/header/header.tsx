import { useContext } from "react";
import { UserContext } from "../../app/userContext/userContext";
import { useNavigate } from "react-router-dom";
import { Menu } from "./menu/menu";

import { Caption1Strong, Caption1Stronger } from "@fluentui/react-components";
import { AlternatingText } from "./alternatingText/alternatingText";

import "./header.css";

export const Header = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <span className="header-tools">
        <Menu />
      </span>

      {user?.username && (
        <Caption1Strong className="welcome">
          !שלום {user.fullname || user.unitname}
        </Caption1Strong>
      )}
      <span className="logo-wrapper">
        <Caption1Stronger>?</Caption1Stronger>
        <AlternatingText />
        <Caption1Stronger>מי פנוי ל</Caption1Stronger>
        <img
          src="/idfood.png"
          alt="IDFood Logo"
          className="logo"
          onClick={() => navigate("/")}
        />
      </span>
    </header>
  );
};
