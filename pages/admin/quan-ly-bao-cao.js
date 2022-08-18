import axios from "axios";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import AdminPanel from "../../components/admin-panel/admin-panel.component";
import ReportManagementPage from "../../components/page-report-management/page-report-management.component";
import SubHeaderAdmin from "../../components/sub-header-admin/sub-header-admin.component";
import SubHeader from "../../components/sub-header/sub-header.component";
import API_URL from "../../utils/apiUrl";

const ReportManagement = ({ reportData }) => {
  const [totalResult, setTotalResult] = useState(reportData.totalResult);
  return (
    <div style={{ display: "flex" }}>
      <AdminPanel />
      <div style={{ width: "83%" }}>
        <SubHeaderAdmin
          title="Quản lý báo cáo"
          subtitle={`Có tất cả ${totalResult} bài đăng bị báo cáo`}
        />
        <div className="main" style={{ padding: "30px" }}>
          <ReportManagementPage
            postReport={reportData}
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

    const res = await axios.get(`${API_URL}/api/admin/list-reports`, {
      headers: { Authorization: token },
    });

    return { props: { reportData: res.data } };
  } catch (error) {
    // return { props: { posts: [1, 2, 3] } };
  }
}

export default ReportManagement;
