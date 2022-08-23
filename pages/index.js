import HomeBackground from "../components/home-background/home-background.component";
import Milestones from "../components/milestones/milestones.component";
import SearchBox from "../components/search-box/search-box.component";
import ListPropertiesRecommend from "../components/list-properties-recommend/list-properties-recommend.component";
import API_URL from "../utils/apiUrl";
import axios from "axios";

export default function Home({ user, followingPosts, setFollowingPosts }) {
  return (
    <div>
      <HomeBackground background="/zyro-image.png" />
      <SearchBox />
      <Milestones />
      <ListPropertiesRecommend
        user={user}
        followingPosts={followingPosts}
        setFollowingPosts={setFollowingPosts}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    return {
      props: {},
    };
  } catch (error) {
    // return { props: { posts: [1, 2, 3] } };
  }
}
