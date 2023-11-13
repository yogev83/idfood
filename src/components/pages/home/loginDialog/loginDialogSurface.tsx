import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAsUnit, loginAsVolunteer } from "../loginService";
import { UserContext } from "../../../../app/userContext/userContext";
import {
  Button,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTrigger,
  Field,
  Input,
  Subtitle1,
} from "@fluentui/react-components";

import "./loginDialog.css";
import { UnitRegisterDialog } from "../registerDialog/unitRegisterDialog";
import { VolunteerRegisterDialog } from "../registerDialog/volunteerRegisterDialog";

interface LoginDialogProps {
  loginType: string;
  isOpen?: boolean;
  target?: string;
}

export const LoginDialogSurface: React.FC<LoginDialogProps> = ({
  loginType,
  target,
}) => {
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
      target ? navigate(`/volunteer/wish/${target}`) : navigate(loginType);
    } catch (error: any) {
      console.log(error);
      // If the login attempt fails, set the error message
      setError(error.message);
    }
  };

  return (
    <DialogSurface>
      <DialogBody className="login-dialog-body">
        <DialogContent className="dialog-content">
          <Subtitle1>
            התחברו כ{loginType === "unit" ? "חיילים רעבים" : "אזרחים מתנדבים"}
          </Subtitle1>
          <form className="login-form" onSubmit={handleSubmit} dir="rtl">
            <Field
              label={loginType === "unit" ? "שם החייל / יחידה" : "שם משתמש"}
              required
            >
              <Input
                className="login-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Field>
            <Field label="סיסמא" required>
              <Input
                type="password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
            {error && <div className="error">{error}</div>}
          </form>
        </DialogContent>
        <DialogActions className="login-dialog-actions" dir="rtl">
          <DialogTrigger disableButtonEnhancement>
            <Button appearance="primary" type="submit" onClick={handleSubmit}>
              התחבר
            </Button>
          </DialogTrigger>
          {loginType === "unit" ? (
            <DialogTrigger disableButtonEnhancement>
              <UnitRegisterDialog />
            </DialogTrigger>
          ) : (
            <DialogTrigger disableButtonEnhancement>
              <VolunteerRegisterDialog />
            </DialogTrigger>
          )}
        </DialogActions>
      </DialogBody>
    </DialogSurface>
  );
};
