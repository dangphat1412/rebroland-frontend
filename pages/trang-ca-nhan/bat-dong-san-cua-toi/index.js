import React, { useState } from "react";
import MyPropertyPage from "../../../components/page-my-property/page-my-property.component";
import SubHeader from "../../../components/sub-header/sub-header.component";
import { parseCookies } from "nookies";
import axios from "axios";
import API_URL from "../../../utils/apiUrl";

const MyPropertyHome = ({ user, postsData }) => {
  const [totalResult, setTotalResult] = useState(postsData.totalResult);
  return (
    <div>
      <SubHeader
        title="Bất động sản của tôi"
        subtitle={`Có tất cả ${totalResult} bất động sản`}
        background="/zyro-image.png"
      />
      <MyPropertyPage
        postsData={postsData}
        user={user}
        setTotalResult={setTotalResult}
      />
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const { token } = parseCookies(context);

    const res = await axios.get(`${API_URL}/api/posts/user`, {
      headers: { Authorization: token },
    });

    return { props: { postsData: res.data } };
  } catch (error) {
    // return { props: { posts: [1, 2, 3] } };
  }
}

export default MyPropertyHome;
