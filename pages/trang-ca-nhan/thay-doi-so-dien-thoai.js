import React from "react";
import ChangePhonePage from "../../components/page-change-phone/page-change-phone.component";
import SubHeader from "../../components/sub-header/sub-header.component";

const ChangePhone = ({ user }) => {
  return (
    <div>
      <SubHeader title="Thay đổi số điện thoại" background="/zyro-image.png" />
      <ChangePhonePage user={user} />
    </div>
  );
};

export default ChangePhone;
