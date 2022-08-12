import React from "react";
import TransferPage from "../../components/page-transfer/page-transfer.component";
import SubHeader from "../../components/sub-header/sub-header.component";

const Transfer = ({ user }) => {
  return (
    <div>
      <SubHeader title="Chuyển khoản" background="/zyro-image.png" />
      <TransferPage user={user} />
    </div>
  );
};

export default Transfer;