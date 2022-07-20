import axios from "axios";
import React from "react";
import RealEstatePage from "../../components/page-real-estate/page-real-estate.component";
import SubHeader from "../../components/sub-header/sub-header.component";
import API_URL from "../../utils/apiUrl";
import { parseCookies } from "nookies";

const RealEstateForBroker = ({
  user,
  postsData,
  followingPosts,
  setFollowingPosts,
}) => {
  return (
    <div>
      <SubHeader
        title="Bất động sản cho Nhà môi giới"
        background="/bg-real-estate.jpg"
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
    const { token } = parseCookies(context);

    const res = await axios.get(`${API_URL}/api/posts/broker/original`, {
      headers: { Authorization: token },
    });

    return { props: { postsData: res.data } };
  } catch (error) {
    // return { props: { posts: [1, 2, 3] } };
  }
}

export default RealEstateForBroker;
