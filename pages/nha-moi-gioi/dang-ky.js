import React from "react";
import BrokerRegisterPage from "../../components/page-broker-register/page-broker-register.component";
import SubHeader from "../../components/sub-header/sub-header.component";

const BrokerRegister = () => {
  return (
    <div>
      <SubHeader title="Đăng ký trở thành nhà môi giới" />
      <BrokerRegisterPage />
    </div>
  );
};

export default BrokerRegister;