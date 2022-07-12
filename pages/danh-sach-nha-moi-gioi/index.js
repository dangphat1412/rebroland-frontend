import axios from "axios";
import React from "react";
import ListBrokersPage from "../../components/page-list-brokers/page-list-brokers.component";
import SubHeader from "../../components/sub-header/sub-header.component";
import API_URL from "../../utils/apiUrl";

const Broker = ({ listBrokers }) => {
  return (
    <div>
      <SubHeader
        title="Danh sách nhà môi giới"
        subtitle="Kết quả tìm kiếm nhà môi giới"
        background="/zyro-image.png"
      />
      <ListBrokersPage listBrokers={listBrokers} />
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const res = await axios.get(`${API_URL}/api/users/broker`);

    return { props: { listBrokers: res.data } };
  } catch (error) {
    // return { props: { post: [1, 2, 3] } };
  }
}

export default Broker;
