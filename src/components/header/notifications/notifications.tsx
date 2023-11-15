import { useContext } from "react";

import { UserContext } from "../../../app/userContext/userContext";
import { Notification } from "./notification/notification";

import "./notifications.css";

export const Notifications = () => {
  const { user } = useContext(UserContext);
  console.log(">", user);

  if (!user || user.notifications?.length === 0) {
    return null;
  }

  return (
    <div className="notifications">
      {user.notifications?.map((notification) => (
        <Notification notification={notification} />
      ))}
    </div>
  );
};
