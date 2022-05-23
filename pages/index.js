import { Image } from "semantic-ui-react";
import Header from "../components/header/Header.component";

export default function Home() {
  return (
    <div>
      <Header />
      <div
        style={{
          height: "1500px",
          width: "100%",
          position: "relative",
          padding: "0",
          maxHeight: "680px",
          overflow: "hidden",
          backgroundImage: "url('./zyro-image.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
      >
      </div>
    </div>
  );
}
