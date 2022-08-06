import React from "react";
import AdminPanel from "../../components/admin-panel/admin-panel.component";
import FinancialManagementPage from "../../components/page-financial-management/page-financial-management.component";
import SubHeader from "../../components/sub-header/sub-header.component";

const TransationManagement = () => {
  return (
    <div style={{ display: "flex" }}>
      <AdminPanel />
      <div style={{ width: "83%" }}>
        <SubHeader title="Quản lý tài chính" background="/zyro-image.png" />
        <div style={{ padding: "30px" }}>
          <FinancialManagementPage />
        </div>
      </div>
    </div>
  );
};

export default TransationManagement;
