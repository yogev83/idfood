import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAsUnit, loginAsVolunteer } from "../loginService";
import "./loginForm.css";
import { UserContext } from "../../../../app/userContext/userContext";

interface LoginFormProps {
  loginType: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ loginType }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={loginType === "unit" ? "שם היחידה" : "שם משתמש"}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="סיסמא"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <div className="error">{error}</div>}
      <button type="submit">התחבר</button>
      <button>משתמשים חדשים</button>
    </form>
  );
};
