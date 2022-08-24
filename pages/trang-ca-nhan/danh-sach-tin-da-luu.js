import React, { useState } from "react";
import MyFollowingPropertiesPage from "../../components/page-my-following-properties/page-my-following-properties.component";
import SubHeader from "../../components/sub-header/sub-header.component";
import { parseCookies } from "nookies";
import axios from "axios";
import API_URL from "../../utils/apiUrl";

const MyFollowProperties = ({
  user,
  postsData,
  followingPosts,
  setFollowingPosts,
}) => {
  const [totalResult, setTotalResult] = useState(postsData.totalResult);
  return (
    <div>
      <SubHeader
        title="Danh sách tin đã lưu"
        subtitle={`Có tất cả ${totalResult} bất động sản`}
        background={
          user && user.currentRole === 3
            ? "/broker-background.jpg"
            : "/zyro-image.png"
        }
      />
      <MyFollowingPropertiesPage
        user={user}
        postsData={postsData}
        followingPosts={followingPosts}
        setFollowingPosts={setFollowingPosts}
        setTotalResult={setTotalResult}
      />
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const { token } = parseCookies(context);

    const res = await axios.get(`${API_URL}/api/posts/user/follow?pageNo=0`, {
      headers: { Authorization: token },
    });

    return { props: { postsData: res.data } };
  } catch (error) {
    // return { props: { posts: [1, 2, 3] } };
  }
}

export default MyFollowProperties;
