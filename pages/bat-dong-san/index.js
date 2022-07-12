import React from "react";
import SubHeader from "../../components/sub-header/sub-header.component";
import RealEstatePage from "../../components/page-real-estate/page-real-estate.component";
import axios from "axios";
import API_URL from "../../utils/apiUrl";

const RealEstate = ({ postsData, followingPosts, setFollowingPosts }) => {
  return (
    <div>
      <SubHeader title="Bất động sản" background="/zyro-image.png" />
      <RealEstatePage
        postsData={postsData}
        followingPosts={followingPosts}
        setFollowingPosts={setFollowingPosts}
      />
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const res = await axios.get(`${API_URL}/api/posts`);

    return { props: { postsData: res.data } };
  } catch (error) {
    // return { props: { posts: [1, 2, 3] } };
  }
}

export default RealEstate;
