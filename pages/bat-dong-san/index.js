import React from "react";
import SubHeader from "../../components/sub-header/sub-header.component";
import RealEstatePage from "../../components/page-real-estate/page-real-estate.component";
import axios from "axios";
import API_URL from "../../utils/apiUrl";

const RealEstate = ({ user, postsData, followingPosts, setFollowingPosts }) => {
  return (
    <div>
      <SubHeader
        title="Bất động sản"
        subtitle={`Kết quả tìm kiếm có ${postsData.totalResult} bất động sản`}
        background="/zyro-image.png"
      />
      <RealEstatePage
        postsData={postsData}
        followingPosts={followingPosts}
        setFollowingPosts={setFollowingPosts}
        user={user}
      />
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const res = await axios.get(`${API_URL}/api/posts/lists`);

    return { props: { postsData: res.data } };
  } catch (error) {
    // return { props: { posts: [1, 2, 3] } };
  }
}

export default RealEstate;
