import React from "react";
import MyProfilePage from "../../components/page-my-profile/page-my-profile.component";
import SubHeader from "../../components/sub-header/sub-header.component";

const MyInformation = ({ user }) => {
  return (
    <div>
      <SubHeader
        title="Thông tin cá nhân"
        background={
          user && user.currentRole === 3
            ? "/broker-background.jpg"
            : "/zyro-image.png"
        }
      />
      <MyProfilePage user={user} />
    </div>
  );
};

export default MyInformation;
