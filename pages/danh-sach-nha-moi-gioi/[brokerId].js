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
  allowRate,
}) => {
  const router = useRouter();
  const [totalResult, setTotalResult] = useState(postsData.lists.totalResult);
  return (
    <>
      <SubHeader
        title="Chi tiết nhà môi giới"
        subtitle={`Có tất cả ${totalResult} bất động sản`}
        background="/zyro-image.png"
      />
      <DetailBrokerPage
        key={router.asPath}
        user={user}
        postsData={postsData}
        followingPosts={followingPosts}
        setFollowingPosts={setFollowingPosts}
        setTotalResult={setTotalResult}
        searchParams={params}
        setLoginOpen={setLoginOpen}
        setRegisterOpen={setRegisterOpen}
        allowRate={allowRate}
      />
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    const { brokerId } = context.query;
    const { data, allowRate } = context.query;
    let params = {};
    if (data) params = JSON.parse(data) || {};
    const res = await axios.get(`${API_URL}/api/posts/user/${brokerId}`);

    return {
      props: {
        postsData: res.data,
        params: params,
        allowRate: allowRate || false,
      },
    };
  } catch (error) {
    // return { props: { posts: [1, 2, 3] } };
  }
}

export default DetailBroker;
