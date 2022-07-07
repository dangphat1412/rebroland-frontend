import React from "react";
import MyProfilePage from "../../components/page-my-profile/page-my-profile.component";
import SubHeader from "../../components/sub-header/sub-header.component";

const MyInformation = () => {
  return (
    <div>
      <SubHeader title="Thông tin cá nhân" />
      <MyProfilePage />
    </div>
  );
};

export default MyInformation;
