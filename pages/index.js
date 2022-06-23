import HomeBackground from "../components/home-background/home-background.component";
import Milestones from "../components/milestones/milestones.component";
import SearchBox from "../components/search-box/search-box.component";
import ListPropertiesRecommend from "../components/list-properties-recommend/list-properties-recommend.component";

export default function Home() {
  return (
    <div>
      <HomeBackground />
      <SearchBox />
      <Milestones />
      <ListPropertiesRecommend />
    </div>
  );
}
