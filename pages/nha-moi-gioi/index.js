import React from "react";
import HomeBackground from "../../components/home-background/home-background.component";
import Milestones from "../../components/milestones/milestones.component";
import SearchBox from "../../components/search-box/search-box.component";

const BrokerHome = () => {
  return (
    <div>
      <HomeBackground background="/broker-background.jpg" />
      <SearchBox />
      <Milestones />
    </div>
  );
};

export default BrokerHome;
