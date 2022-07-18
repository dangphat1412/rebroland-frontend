import React from "react";
import TakeCareCustomerPage from "../../components/page-take-care-customer/page-take-care-customer.component";
import SubHeader from "../../components/sub-header/sub-header.component";

const TakeCareCustomer = ({ user }) => {
  return (
    <div>
      <SubHeader title="Chăm sóc khách hàng" background="/bg-real-estate.jpg" />
      <TakeCareCustomerPage user={user} />
    </div>
  );
};

export default TakeCareCustomer;
