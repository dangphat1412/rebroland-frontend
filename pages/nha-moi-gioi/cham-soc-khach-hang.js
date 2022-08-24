import React, { useState } from "react";
import TakeCareCustomerPage from "../../components/page-take-care-customer/page-take-care-customer.component";
import SubHeader from "../../components/sub-header/sub-header.component";
import { parseCookies } from "nookies";
import API_URL from "../../utils/apiUrl";
import axios from "axios";

const TakeCareCustomer = ({ user, caringList }) => {
  const [totalResult, setTotalResult] = useState(caringList.totalResult);
  return (
    <div>
      <SubHeader
        title="Chăm sóc khách hàng"
        subtitle={`Có tất cả ${totalResult} khách hàng`}
        background="/broker-background.jpg"
      />
      <TakeCareCustomerPage
        user={user}
        caringList={caringList}
        setTotalResult={setTotalResult}
      />
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const { token } = parseCookies(context);

    const res = await axios.get(`${API_URL}/api/user-care`, {
      headers: { Authorization: token },
    });

    return { props: { caringList: res.data } };
  } catch (error) {
    // return { props: { posts: [1, 2, 3] } };
  }
}

export default TakeCareCustomer;
