import React from "react";
import Navigation from "../navigation/navigation.component";
import SubNavigation from "../sub-navigation/sub-navigation.component";
import { HeaderContainer } from "./Header.styles";

const Header = () => {
  return (
    <HeaderContainer fluid>
      <SubNavigation />
      <Navigation />
    </HeaderContainer>
  );
};

export default Header;
