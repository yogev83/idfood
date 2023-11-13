import { Dialog, DialogTrigger } from "@fluentui/react-components";
import { LoginDialogSurface } from "./loginDialogSurface";

import "./loginDialog.css";

interface LoginDialogWithTriggerButtonProps {
  loginType: string;
  children: any;
}

export const LoginDialogWithTriggerButton: React.FC<
  LoginDialogWithTriggerButtonProps
> = ({ loginType, children }) => {
  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <div>{children}</div>
      </DialogTrigger>
      <LoginDialogSurface loginType={loginType} />
    </Dialog>
  );
};
