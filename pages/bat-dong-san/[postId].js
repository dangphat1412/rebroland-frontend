import axios from "axios";
import React from "react";
import PagePropertyDetail from "../../components/page-property-detail/page-property-detail.component";
import SubHeader from "../../components/sub-header/sub-header.component";
import API_URL from "../../utils/apiUrl";

const DetailRealEstate = ({
  postData,
  user,
  followingPosts,
  setFollowingPosts,
  setLoginOpen,
  setRegisterOpen,
}) => {
  return (
    <>
      <SubHeader title="Chi tiết bất động sản" background="/zyro-image.png" />
      <PagePropertyDetail
        post={postData.post}
        brokers={postData.brokers}
        user={user}
        followingPosts={followingPosts}
        setFollowingPosts={setFollowingPosts}
        setLoginOpen={setLoginOpen}
        setRegisterOpen={setRegisterOpen}
      />
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    const { postId } = context.query;

    const res = await axios.get(
      `${API_URL}/api/posts/${postId.split("-").pop()}`
    );

    return { props: { postData: res.data } };
  } catch (error) {
    // return { props: { post: [1, 2, 3] } };
  }
}

export default DetailRealEstate;
