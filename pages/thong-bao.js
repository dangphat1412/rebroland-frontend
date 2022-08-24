import React from "react";
import NotificationsPage from "../components/page-notifications/page-notifications.component";
import SubHeader from "../components/sub-header/sub-header.component";
import API_URL from "../utils/apiUrl";
import { parseCookies } from "nookies";
import axios from "axios";

const Notifications = ({ user, notificationList }) => {
  return (
    <div>
      <SubHeader
        title="Thông báo"
        background={
          user && user.currentRole === 3
            ? "/broker-background.jpg"
            : "/zyro-image.png"
        }
      />
      <NotificationsPage notificationList={notificationList} />
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const { token } = parseCookies(context);

    const res = await axios.get(`${API_URL}/api/notification?pageNo=0`, {
      headers: { Authorization: token },
    });

    return { props: { notificationList: res.data } };
  } catch (error) {
    // return { props: { posts: [1, 2, 3] } };
  }
}

export default Notifications;
