import React from "react";
import PaymentSuccessfullyPage from "../components/page-payment-successfully/page-payment-successfully.component";
import SubHeader from "../components/sub-header/sub-header.component";

const PaymentSuccessfully = ({ user }) => {
  return (
    <div>
      <SubHeader
        title="Thanh toán thành công"
        background={
          user && user.currentRole === 3
            ? "/broker-background.jpg"
            : "/zyro-image.png"
        }
      />
      <PaymentSuccessfullyPage />
    </div>
  );
};

export default PaymentSuccessfully;
