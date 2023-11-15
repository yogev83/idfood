import { Badge, Body1Strong } from "@fluentui/react-components";

import "./notification.css";

interface NotificationProps {
  message: string;
}

export const Notification = ({
  notification,
}: {
  notification: NotificationProps;
}) => {
  return (
    <div className="notification menu-item" dir="rtl">
      <Badge
        className="notification-badge"
        size="extra-small"
        color="danger"
      ></Badge>
      <Body1Strong>בקשות בטיפול</Body1Strong>
    </div>
  );
};
