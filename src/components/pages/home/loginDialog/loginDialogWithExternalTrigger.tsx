import { Dialog } from "@fluentui/react-components";
import { LoginDialogSurface } from "./loginDialogSurface";

import "./loginDialog.css";

interface LoginDialogProps {
  loginType: string;
  isOpen: boolean;
  target?: string;
}

export const LoginDialogWithExternalTrigger: React.FC<LoginDialogProps> = ({
  loginType,
  isOpen,
  target,
}) => {
  return (
    <Dialog open={isOpen}>
      <LoginDialogSurface loginType={loginType} target={target} />
    </Dialog>
  );
};
