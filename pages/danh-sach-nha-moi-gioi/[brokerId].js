import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import DetailBrokerPage from "../../components/page-detail-broker/page-detail-broker.component";
import SubHeader from "../../components/sub-header/sub-header.component";
import API_URL from "../../utils/apiUrl";

const DetailBroker = ({
  postsData,
  user,
  followingPosts,
  setFollowingPosts,
  params,
  setLoginOpen,
  setRegisterOpen,
}) => {
  const [totalResult, setTotalResult] = useState(postsData.lists.totalResult);
  return (
    <>
      <SubHeader
        title="Chi tiết nhà môi giới"
        subtitle={`Có tất cả ${totalResult} bất động sản`}
        background="/zyro-image.png"
      />
      <DetailBrokerPage
        user={user}
        postsData={postsData}
        followingPosts={followingPosts}
        setFollowingPosts={setFollowingPosts}
        setTotalResult={setTotalResult}
        searchParams={params}
        setLoginOpen={setLoginOpen}
        setRegisterOpen={setRegisterOpen}
      />
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    const { brokerId } = context.query;
    const { data } = context.query;
    let params = {};
    if (data) params = JSON.parse(data) || {};
    const res = await axios.get(`${API_URL}/api/posts/user/${brokerId}`);

    return { props: { postsData: res.data, params: params } };
  } catch (error) {
    // return { props: { posts: [1, 2, 3] } };
  }
}

export default DetailBroker;
