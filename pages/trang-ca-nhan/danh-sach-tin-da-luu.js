import React from "react";
import MyFollowingPropertiesPage from "../../components/page-my-following-properties/page-my-following-properties.component";
import SubHeader from "../../components/sub-header/sub-header.component";
import { parseCookies } from "nookies";
import axios from "axios";
import API_URL from "../../utils/apiUrl";

const MyFollowProperties = ({
  postsData,
  followingPosts,
  setFollowingPosts,
}) => {
  return (
    <div>
      <SubHeader title="Danh sách tin đã lưu" />
      <MyFollowingPropertiesPage
        postsData={postsData}
        followingPosts={followingPosts}
        setFollowingPosts={setFollowingPosts}
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
