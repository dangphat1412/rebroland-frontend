import axios from "axios";
import React, { useState } from "react";
import ListBrokersPage from "../../components/page-list-brokers/page-list-brokers.component";
import SubHeader from "../../components/sub-header/sub-header.component";
import API_URL from "../../utils/apiUrl";
import { parseCookies } from "nookies";
import { redirectUser } from "../../utils/authUser";

const Broker = ({ brokersData, params }) => {
  console.log(params);
  const [totalResult, setTotalResult] = useState(brokersData.totalResult);
  return (
    <div>
      <SubHeader
        title="Danh sách nhà môi giới"
        subtitle={`Kết quả tìm kiếm có ${totalResult} Nhà môi giới`}
        background="/zyro-image.png"
      />
      <ListBrokersPage
        brokersData={brokersData}
        setTotalResult={setTotalResult}
        searchParams={params}
      />
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const { token } = parseCookies(context);
    const { data } = context.query;
    let params = {};
    if (data) params = JSON.parse(data) || {};
    let res;
    if (token) {
      res = await axios.get(`${API_URL}/api/users/broker`, {
        params: {
          keyword: params.key,
          propertyTypes: params.propertyTypes
            ? params.propertyTypes.toString()
            : undefined,
          province: params.province,
          district: params.district,
          ward: params.ward,
          sortValue: params.sortValue,
          pageNo: params.pageNo,
        },
        headers: { Authorization: token },
      });
    } else {
      res = await axios.get(`${API_URL}/api/users/broker`, {
        params: {
          keyword: params.key,
          propertyTypes: params.propertyTypes
            ? params.propertyTypes.toString()
            : undefined,
          province: params.province,
          district: params.district,
          ward: params.ward,
          sortValue: params.sortValue,
          pageNo: params.pageNo,
        },
      });
    }

    return { props: { brokersData: res.data, params: params } };
  } catch (error) {
    redirectUser(context, "/404");
  }
}

export default Broker;
