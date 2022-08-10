import React from "react";
import BrokerRegisterPage from "../../components/page-broker-register/page-broker-register.component";
import SubHeader from "../../components/sub-header/sub-header.component";
import API_URL from "../../utils/apiUrl";
import { parseCookies } from "nookies";
import axios from "axios";

const BrokerRegister = ({ priceList }) => {
  return (
    <div>
      <SubHeader
        title="Đăng ký trở thành nhà môi giới"
        background="/zyro-image.png"
      />
      <BrokerRegisterPage priceList={priceList} />
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const { token } = parseCookies(context);

    const res = await axios.get(`${API_URL}/api/users/broker/price`, {
      headers: { Authorization: token },
    });

    return { props: { priceList: res.data } };
  } catch (error) {
    // return { props: { posts: [1, 2, 3] } };
  }
}

export default BrokerRegister;
