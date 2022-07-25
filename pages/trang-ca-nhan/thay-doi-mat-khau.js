import React from "react";
import ChangePasswordPage from "../../components/page-change-password/page-change-change-password.component";
import SubHeader from "../../components/sub-header/sub-header.component";

const ChangePassword = ({ user }) => {
  return (
    <div>
      <SubHeader title="Thay đổi mật khẩu" background="/zyro-image.png" />
      <ChangePasswordPage user={user} />
    </div>
  );
};

export default ChangePassword;
