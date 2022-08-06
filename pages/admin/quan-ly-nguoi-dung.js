import React, { useState } from "react";
import AdminNavigation from "../../components/admin-navigation/admin-navigation.component";
import AdminPanel from "../../components/admin-panel/admin-panel.component";
import UserManagementPage from "../../components/page-user-management/page-user-management.component";
import API_URL from "../../utils/apiUrl";
import { parseCookies } from "nookies";
import axios from "axios";
import SubHeader from "../../components/sub-header/sub-header.component";

const UserManagement = ({ usersData }) => {
  const [totalResult, setTotalResult] = useState(usersData.totalResult);
  return (
    <div style={{ display: "flex" }}>
      <AdminPanel />
      <div style={{ width: "83%" }}>
        {/* <AdminNavigation title="Quản lý người dùng" /> */}
        <SubHeader
          title="Quản lý người dùng"
          subtitle={`Có tất cả ${totalResult} người dùng`}
          background="/zyro-image.png"
        />
        <div style={{ padding: "30px" }}>
          <UserManagementPage
            usersData={usersData}
            setTotalResult={setTotalResult}
          />
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const { token } = parseCookies(context);

    const res = await axios.get(`${API_URL}/api/admin/list-users`, {
      headers: { Authorization: token },
    });

    return { props: { usersData: res.data } };
  } catch (error) {
    // return { props: { posts: [1, 2, 3] } };
  }
}

export default UserManagement;
