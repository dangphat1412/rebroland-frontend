import React from "react";
import { HomeBackgroundContainer } from "./home-background.styles";

const HomeBackground = ({ background }) => {
  return (
    <HomeBackgroundContainer
      style={{ backgroundImage: `url('${background}')` }}
    >
      <h1>
        <span style={{ color: "#fc9f1c" }}>REBROLAND</span> - lựa chọn chung cho
        mái ấm gia đình
      </h1>
    </HomeBackgroundContainer>
  );
};

export default HomeBackground;
