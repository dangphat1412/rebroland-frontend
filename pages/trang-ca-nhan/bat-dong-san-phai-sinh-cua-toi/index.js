import axios from "axios";
import React, { useState } from "react";
import MyDerivativePropertyPage from "../../../components/page-my-derivative-property/page-my-derivative-property.component";
import SubHeader from "../../../components/sub-header/sub-header.component";
import API_URL from "../../../utils/apiUrl";
import { parseCookies } from "nookies";

const MyDerivativeProperty = ({ user, postsData }) => {
  const [totalResult, setTotalResult] = useState(postsData.totalResult);
  return (
    <div>
      <SubHeader
        title="Bất động sản phái sinh của tôi"
        subtitle={`Có tất cả ${totalResult} bất động sản`}
        background="/bg-real-estate.jpg"
      />
      <MyDerivativePropertyPage
        user={user}
        setTotalResult={setTotalResult}
        postsData={postsData}
      />
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const { token } = parseCookies(context);
    const res = await axios.get(`${API_URL}/api/posts/derivative/list`, {
      headers: { Authorization: token },
    });

    return { props: { postsData: res.data } };
  } catch (error) {
    // return { props: { posts: [1, 2, 3] } };
  }
}

export default MyDerivativeProperty;
