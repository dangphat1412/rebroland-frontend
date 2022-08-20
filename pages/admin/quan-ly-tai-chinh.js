import axios from "axios";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import AdminPanel from "../../components/admin-panel/admin-panel.component";
import FinancialManagementPage from "../../components/page-financial-management/page-financial-management.component";
import SubHeaderAdmin from "../../components/sub-header-admin/sub-header-admin.component";
import API_URL from "../../utils/apiUrl";

const TransationManagement = ({ paymentData }) => {
  const [totalResult, setTotalResult] = useState(paymentData.totalResult);
  return (
    <div style={{ display: "flex" }}>
      <AdminPanel />
      <div style={{ width: "83%" }}>
        <SubHeaderAdmin
          title="Quản lý tài chính"
          subtitle={`Có tổng cộng ${totalResult} giao dịch`}
          background="/zyro-image.png"
        />
        <div style={{ padding: "30px" }}>
          <FinancialManagementPage
            paymentData={paymentData}
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

    const res = await axios.get(`${API_URL}/api/admin/list-payments`, {
      headers: { Authorization: token },
    });

    return { props: { paymentData: res.data } };
  } catch (error) {
    // return { props: { posts: [1, 2, 3] } };
  }
}

export default TransationManagement;
