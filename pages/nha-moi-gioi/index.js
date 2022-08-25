import React from "react";
import HomeBackground from "../../components/home-background/home-background.component";
import ListPropertiesRecommend from "../../components/list-properties-recommend/list-properties-recommend.component";
import Milestones from "../../components/milestones/milestones.component";
import SearchBox from "../../components/search-box/search-box.component";

const BrokerHome = ({ user, followingPosts, setFollowingPosts }) => {
  return (
    <div>
      <HomeBackground background="/broker-background.jpg" />
      <SearchBox />
      <Milestones />
      {/* <ListPropertiesRecommend
        user={user}
        followingPosts={followingPosts}
        setFollowingPosts={setFollowingPosts}
      /> */}
    </div>
  );
};

export default BrokerHome;
