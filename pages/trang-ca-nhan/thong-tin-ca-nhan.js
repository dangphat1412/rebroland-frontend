import React from "react";
import SubHeader from "../../components/sub-header/sub-header.component";
import UserPanel from "../../components/user-panel/user-panel.component";

const MyInformation = () => {
  return (
    <div>
      <SubHeader title="Thông tin cá nhân" />
      <UserPanel />
    </div>
  );
};

export default MyInformation;
