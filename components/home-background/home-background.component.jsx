import React from "react";
import { HomeBackgroundContainer } from "./home-background.styles";

const HomeBackground = ({ background }) => {
  return (
    <HomeBackgroundContainer
      style={{ backgroundImage: `url('${background}')` }}
    >
      <h1>Muốn nói cái gì thì nói vào đây</h1>
    </HomeBackgroundContainer>
  );
};

export default HomeBackground;
