import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import UserDetailPage from "../../components/page-user-detail/page-user-detail.component";
import SubHeader from "../../components/sub-header/sub-header.component";
import API_URL from "../../utils/apiUrl";
import { redirectUser } from "../../utils/authUser";
import { parseCookies } from "nookies";

const UserDetail = ({
  user,
  postsData,
  followingPosts,
  setFollowingPosts,
  setLoginOpen,
  setRegisterOpen,
  allowRate,
}) => {
  const [totalResult, setTotalResult] = useState(postsData.lists.totalResult);
  return (
    <div>
      <SubHeader
        title="Chi tiết người dùng"
        subtitle={`Có tất cả ${totalResult} bất động sản`}
        background="/zyro-image.png"
      />
      <UserDetailPage
        allowRate={allowRate}
        postsData={postsData}
        followingPosts={followingPosts}
        setFollowingPosts={setFollowingPosts}
        user={user}
        setLoginOpen={setLoginOpen}
        setRegisterOpen={setRegisterOpen}
        setTotalResult={setTotalResult}
      />
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const { userId, allowRate } = context.query;
    const { token } = parseCookies(context);

    const res = await axios.get(`${API_URL}/api/posts/original/${userId}`, {
      headers: { Authorization: token },
    });

    return { props: { postsData: res.data, allowRate: allowRate || false } };
  } catch (error) {
    redirectUser(context, "/404");
  }
}

export default UserDetail;
