import React from "react";
import UserDetailPage from "../../components/page-user-detail/page-user-detail.component";
import SubHeader from "../../components/sub-header/sub-header.component";

const UserDetail = () => {
  return (
    <div>
      <SubHeader title="Chi tiết người dùng" background="/zyro-image.png" />
      <UserDetailPage />
    </div>
  );
};

export default UserDetail;
