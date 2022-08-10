import React from "react";
import PaymentPage from "../../components/page-payment/page-payment.component";
import SubHeader from "../../components/sub-header/sub-header.component";

const Payment = ({ user }) => {
  return (
    <div>
      <SubHeader title="Nạp tiền vào tài khoản" background="/zyro-image.png" />
      <PaymentPage user={user} />
    </div>
  );
};

export default Payment;
