import React from "react";
import NotificationsPage from "../components/page-notifications/page-notifications.component";
import SubHeader from "../components/sub-header/sub-header.component";

const Notifications = () => {
  return (
    <div>
      <SubHeader title="Thông báo" background="/zyro-image.png" />
      <NotificationsPage />
    </div>
  );
};

export default Notifications;
