import React from "react";
import AdminPanel from "../../components/admin-panel/admin-panel.component";
import CashoutManagementPage from "../../components/page-cashout-management/page-cashout-management.component";
import SubHeader from "../../components/sub-header/sub-header.component";

import { parseCookies } from "nookies";
import API_URL from "../../utils/apiUrl";
import axios from "axios";

const CashoutManagement = ({ directWithdrawData }) => {
  return (
    <div style={{ display: "flex" }}>
      <AdminPanel />
      <div style={{ width: "83%" }}>
        <SubHeader
          title="Quản lý rút tiền"
          //   subtitle={`Có tất cả ${totalResult} người dùng`}
          background="/zyro-image.png"
        />
        <div style={{ padding: "30px" }}>
          <CashoutManagementPage directWithdrawData={directWithdrawData} />
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const { token } = parseCookies(context);

    const res = await axios.get(
      `${API_URL}/api/admin/list-cashout/direct-withdraw`,
      {
        headers: { Authorization: token },
      }
    );

    return { props: { directWithdrawData: res.data } };
  } catch (error) {
    // return { props: { posts: [1, 2, 3] } };
  }
}

export default CashoutManagement;
