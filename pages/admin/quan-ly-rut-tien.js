import React from "react";
import AdminPanel from "../../components/admin-panel/admin-panel.component";
import SubHeader from "../../components/sub-header/sub-header.component";

const CashoutManagement = () => {
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
          {/* <UserManagementPage
            usersData={usersData}
            setTotalResult={setTotalResult}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default CashoutManagement;
