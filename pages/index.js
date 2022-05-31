import Footer from "../components/footer/footer.component";
import HomeBackground from "../components/home-background/home-background.component";
import Milestones from "../components/milestones/milestones.component";
import SearchBox from "../components/search-box/search-box.component";
import Navigation from "../components/navigation/navigation.component";

export default function Home() {
  return (
    <div>
      <Navigation />
      <HomeBackground />
      <SearchBox />
      <Milestones />
      <Footer />
    </div>
  );
}
