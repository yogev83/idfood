import React, { useContext, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTrigger,
  Field,
  Input,
  Subtitle1,
  Textarea,
} from "@fluentui/react-components";

import "./registerDialog.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../../app/userContext/userContext";

export const UnitRegisterDialog = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [unitname, setUnitname] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");

  const [shouldShowUsernameError, setShouldShowUsernameError] = useState(false);
  const [shouldShowUnitnameError, setShouldShowUnitnameError] = useState(false);
  const [shouldShowPasswordError, setShouldShowPasswordError] = useState(false);
  const [shouldShowVerifyPasswordError, setShouldShowVerifyPasswordError] =
    useState(false);
  const [shouldShowEmailError, setShouldShowEmailError] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!username) {
      setShouldShowUsernameError(true);
      return;
    }

    if (!unitname) {
      setShouldShowUnitnameError(true);
      return;
    }

    if (!password || !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      setShouldShowPasswordError(true);
      return;
    }

    if (password !== verifyPassword) {
      setShouldShowVerifyPasswordError(true);
      return;
    }

    if (!email) {
      setShouldShowEmailError(true);
      return;
    }

    // Make a POST request to your API
    const response = await fetch("/api/register/unit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        unitname,
        password,
        email,
        about,
      }),
    });

    if (response.ok) {
      const userData = await response.json();
      sessionStorage.setItem("sessionToken", userData.token);
      setUser(userData);
      navigate("/unit");
    } else {
      // Handle error
      const errorData = await response.json();
      console.error(errorData.message);
    }

    // // Reset error
    // setError("");

    // // Validate inputs
    // if (!username || !password) {
    //   setError("חובה למלא את כל השדות");
    //   return;
    // }

    // try {
    //   let userData;
    //   if (loginType === "unit") {
    //     userData = await loginAsUnit(username, password);
    //   } else if (loginType === "volunteer") {
    //     userData = await loginAsVolunteer(username, password);
    //   }

    //   sessionStorage.setItem("loginToken", userData.token);
    //   setUser(userData);
    //   navigate(loginType);
    // } catch (error: any) {
    //   console.log(error);
    //   // If the login attempt fails, set the error message
    //   setError(error.message);
    // }
  };

  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button>משתמשים חדשים?</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody className="register-dialog-body">
          <DialogContent className="dialog-content">
            <Subtitle1>הרשמה כחיילים</Subtitle1>
            <form className="register-form" onSubmit={handleSubmit} dir="rtl">
              <Field
                label="שם משתמש"
                hint="באנגלית בלבד"
                required
                validationMessage="שדה חובה"
                validationMessageIcon={null}
                validationState={
                  shouldShowUsernameError && !username ? "error" : "none"
                }
              >
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setShouldShowUsernameError(true);
                  }}
                />
              </Field>
              <Field
                label="סיסמא"
                required
                validationMessage="הסיסמא חייבת להיות בת 8 תווים לפחות, ובשילוב של אותיות ומספרים"
                validationMessageIcon={null}
                validationState={
                  shouldShowPasswordError && !password ? "error" : "none"
                }
              >
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setShouldShowPasswordError(true);
                  }}
                />
              </Field>
              <Field
                label="אימות סיסמא"
                required
                validationMessage="הסיסמאות לא תואמות"
                validationMessageIcon={null}
                validationState={
                  shouldShowVerifyPasswordError && password !== verifyPassword
                    ? "error"
                    : "none"
                }
              >
                <Input
                  type="password"
                  value={verifyPassword}
                  onChange={(e) => {
                    setVerifyPassword(e.target.value);
                    setShouldShowVerifyPasswordError(true);
                  }}
                />
              </Field>
              <Field
                label="שם החייל / יחידה"
                required
                validationMessage="שדה חובה"
                validationMessageIcon={null}
                validationState={
                  shouldShowUnitnameError && !unitname ? "error" : "none"
                }
              >
                <Input
                  type="text"
                  value={unitname}
                  onChange={(e) => {
                    setUnitname(e.target.value);
                    setShouldShowUnitnameError(true);
                  }}
                />
              </Field>
              <Field
                label="אימייל"
                required
                validationMessage="חובה למלא אימייל"
                validationMessageIcon={null}
                validationState={
                  shouldShowEmailError && !email ? "error" : "none"
                }
              >
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setShouldShowEmailError(true);
                  }}
                />
              </Field>
              <Field
                label="קצת עליכם"
                hint="המטרה שלנו היא לחבר בינכם ובין האזרחים. עזרו למתנדבים שלנו להכיר אתכם בכמה מילים"
              >
                <Textarea
                  resize="vertical"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </Field>
            </form>
          </DialogContent>
          <DialogActions className="register-dialog-actions" dir="rtl">
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="primary" type="submit" onClick={handleSubmit}>
                להרשמה
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
