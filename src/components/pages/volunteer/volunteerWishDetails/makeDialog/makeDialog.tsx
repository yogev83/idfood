import { Button } from "@fluentui/react-button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTrigger,
} from "@fluentui/react-dialog";
import { Caption1Strong } from "@fluentui/react-text";
import { CheckmarkCircle24Regular } from "@fluentui/react-icons";
import { Field, Input, Subtitle2, Title2 } from "@fluentui/react-components";
import { useContext, useState } from "react";
import { UserContext } from "../../../../../app/userContext/userContext";

import "./makeDialog.css";

export const MakeDialog = ({ handleDone }: { handleDone: () => void }) => {
  const { user } = useContext(UserContext);
  const [phone, setPhone] = useState<string | undefined>(user?.phone);

  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button
          appearance="primary"
          className="done-button"
          icon={<CheckmarkCircle24Regular />}
        >
          <Caption1Strong className="action-caption">אני אכין</Caption1Strong>
        </Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody className="make-dialog-body">
          <DialogContent className="dialog-content">
            <Title2>אלופים שאתם!</Title2>
            <br />
            <Subtitle2>תודה רבה על ההתנדבות</Subtitle2>
            <form className="make-details-form">
              <Field
                label="טלפון"
                hint="מספר הטלפון שישותף עם החיילים כדי שיוכלו להעביר לכם את המיקום למשלוח"
              >
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </Field>
            </form>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">התחרטתי</Button>
            </DialogTrigger>
            <DialogTrigger disableButtonEnhancement>
              <Button onClick={handleDone} appearance="primary">
                מסכימ/ה
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
