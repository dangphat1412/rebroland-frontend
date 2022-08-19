import HomeBackground from "../components/home-background/home-background.component";
import Milestones from "../components/milestones/milestones.component";
import SearchBox from "../components/search-box/search-box.component";
import ListPropertiesRecommend from "../components/list-properties-recommend/list-properties-recommend.component";
import API_URL from "../utils/apiUrl";
import axios from "axios";

export default function Home({
  user,
  followingPosts,
  setFollowingPosts,
  outstandingData,
}) {
  return (
    <div>
      <HomeBackground background="/zyro-image.png" />
      <SearchBox />
      <Milestones />
      <ListPropertiesRecommend
        user={user}
        followingPosts={followingPosts}
        setFollowingPosts={setFollowingPosts}
        outstandingData={outstandingData}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const res = await axios.get(`${API_URL}/api/posts/outstanding`);

    return {
      props: {
        outstandingData: res.data,
      },
    };
  } catch (error) {
    // return { props: { posts: [1, 2, 3] } };
  }
}
