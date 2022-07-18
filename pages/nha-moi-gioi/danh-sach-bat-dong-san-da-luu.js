import React from "react";
import MyFollowingPropertiesBrokerPage from "../../components/page-my-following-properties-broker/page-my-following-properties-broker.component";
import SubHeader from "../../components/sub-header/sub-header.component";

const MyFollowPropertiesBroker = ({ user }) => {
  return (
    <div>
      <SubHeader
        title="Danh sách bất động sản đã lưu"
        background="/bg-real-estate.jpg"
      />
      <MyFollowingPropertiesBrokerPage user={user} />
    </div>
  );
};

export default MyFollowPropertiesBroker;
