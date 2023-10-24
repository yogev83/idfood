import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../app/userContext/userContext";
import { loginWithToken } from "./loginService";
import { LoginForm } from "./loginForm/loginForm";

import { Button, Title2 } from "@fluentui/react-components";

import "./login.css";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [loginType, setLoginType] = useState<string | null>(null);

  // Check for existing login token
  useEffect(() => {
    const token = sessionStorage.getItem("loginToken");
    if (token) {
      // If token exists, get user data and navigate to appropriate page
      const fetchUserData = async () => {
        const userData = await loginWithToken(token);
        setUser(userData);
        navigate(userData.type);
      };

      fetchUserData();
    }
  }, [navigate, setUser]);

  const handleUnitLogin = async () => {
    setLoginType("unit");
  };

  const handleVolunteerLogin = async () => {
    setLoginType("volunteer");
  };

  return (
    <div className="login-page">
      {loginType ? (
        <LoginForm loginType={loginType} />
      ) : (
        <>
          <Title2>התחברו בתור</Title2>
          <span className="button-group">
            {" "}
            <Button
              onClick={handleUnitLogin}
              className="login-button unit-login"
            >
              חיילים רעבים
            </Button>
            <Button
              onClick={handleVolunteerLogin}
              className="login-button volunteer-login"
            >
              אזרחים מתנדבים
            </Button>
          </span>
        </>
      )}
    </div>
  );
};
