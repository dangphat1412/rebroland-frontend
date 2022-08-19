import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import UserDetailPage from "../../components/page-user-detail/page-user-detail.component";
import SubHeader from "../../components/sub-header/sub-header.component";
import API_URL from "../../utils/apiUrl";

const UserDetail = ({
  user,
  postsData,
  followingPosts,
  setFollowingPosts,
  setLoginOpen,
  setRegisterOpen,
  allowRate,
}) => {
  return (
    <div>
      <SubHeader title="Chi tiết người dùng" background="/zyro-image.png" />
      <UserDetailPage
        allowRate={allowRate}
        postsData={postsData}
        followingPosts={followingPosts}
        setFollowingPosts={setFollowingPosts}
        user={user}
        setLoginOpen={setLoginOpen}
        setRegisterOpen={setRegisterOpen}
      />
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const { userId, allowRate } = context.query;
    const res = await axios.get(`${API_URL}/api/posts/original/${userId}`);

    return { props: { postsData: res.data, allowRate: allowRate || false } };
  } catch (error) {
    // return { props: { posts: [1, 2, 3] } };
  }
}

export default UserDetail;
