import { useContext, useState } from "react";

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
} from "@fluentui/react-components";

import "./registerDialog.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../../app/userContext/userContext";

export const VolunteerRegisterDialog = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [shouldShowUsernameError, setShouldShowUsernameError] = useState(false);
  const [shouldShowFullnameError, setShouldShowFullnameError] = useState(false);
  const [shouldShowPasswordError, setShouldShowPasswordError] = useState(false);
  const [shouldShowVerifyPasswordError, setShouldShowVerifyPasswordError] =
    useState(false);
  const [shouldShowEmailError, setShouldShowEmailError] = useState(false);
  const [shouldShowPhoneError, setShouldShowPhoneError] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!username) {
      setShouldShowUsernameError(true);
      return;
    }

    if (!fullname) {
      setShouldShowFullnameError(true);
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

    if (!phone) {
      setShouldShowPhoneError(true);
      return;
    }

    // Make a POST request to your API
    const response = await fetch("/api/register/volunteer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        fullname,
        password,
        email,
        address,
        phone,
      }),
    });

    if (response.ok) {
      const userData = await response.json();
      sessionStorage.setItem("sessionToken", userData.token);
      setUser(userData);
      navigate("/volunteer");
    } else {
      // Handle error
      const errorData = await response.json();
      console.error(errorData.message);
    }
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
                label="שם מלא"
                required
                validationMessage="שדה חובה"
                validationMessageIcon={null}
                validationState={
                  shouldShowFullnameError && !fullname ? "error" : "none"
                }
              >
                <Input
                  type="text"
                  value={fullname}
                  onChange={(e) => {
                    setFullname(e.target.value);
                    setShouldShowFullnameError(true);
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
              <Field label="כתובת">
                <Input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Field>
              <Field
                label="טלפון"
                required
                validationMessage="חובה למלא טלפון"
                validationMessageIcon={null}
                validationState={
                  shouldShowPhoneError && !phone ? "error" : "none"
                }
              >
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
