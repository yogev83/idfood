import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAsUnit, loginAsVolunteer } from "../loginService";
import "./loginForm.css";
import { UserContext } from "../../../../app/userContext/userContext";
import { Button, Field, Input } from "@fluentui/react-components";
import axios from 'axios';

interface LoginFormProps {
  loginType: 'unit' | 'volunteer';
}

export const LoginForm: React.FC<LoginFormProps> = ({ loginType }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // ###
  if(!user || !user?.id){
    axios.get('http://localhost:3000/.auth/me')
      .then(response => {
        // The user is authenticated, you can use the response data
        console.log('hi! a')
        console.log(response.data)
        setUser({id: response.data.id, email: response.data.emails[0].value, type: loginType})
        sessionStorage.setItem("loginToken", response.data.id);
        navigate("/unit");
      })
      .catch(error => {
        // The user is not authenticated, redirect to the login
        window.location.href = 'http://localhost:3000/.auth/login/';
      });
  }
  else {
    console.log('not fetched user user is ', user)
    navigate("/unit");
  }
  // ###

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Reset error
    setError("");

    // Validate inputs
    if (!username || !password) {
      setError("חובה למלא את כל השדות");
      return;
    }

    try {
      let userData;
      if (loginType === "unit") {
        userData = await loginAsUnit(username, password);
      } else if (loginType === "volunteer") {
        userData = await loginAsVolunteer(username, password);
      }

      sessionStorage.setItem("loginToken", userData.token);
      setUser(userData);
      navigate(loginType);
    } catch (error: any) {
      console.log(error);
      // If the login attempt fails, set the error message
      setError(error.message);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit} dir="rtl">
      <Field label="שם משתמש" required>
        <Input
          className="login-input"
          type="text"
          placeholder={loginType === "unit" ? "שם היחידה" : "שם משתמש"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Field>
      <Field label="סיסמא" required>
        <Input
          type="password"
          className="login-input"
          placeholder="סיסמא"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Field>
      {error && <div className="error">{error}</div>}
      <Button type="submit">התחבר</Button>
      <Button as="a">משתמשים חדשים</Button>
    </form>
  );
};
