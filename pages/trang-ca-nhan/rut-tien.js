import React from "react";
import CashOutPage from "../../components/page-cash-out/page-cash-out.component";
import SubHeader from "../../components/sub-header/sub-header.component";

const CashOut = ({ user }) => {
  return (
    <div>
      <SubHeader title="Rút tiền" background="/zyro-image.png" />
      <CashOutPage user={user} />
    </div>
  );
};

export default CashOut;
