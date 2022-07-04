import React, { useState, useEffect } from "react";
import MainNavigation from "../main-navigation/main-navigation.component";
import SubNavigation from "../sub-navigation/sub-navigation.component";
import { NavigationContainer } from "./navigation.styles";

const Navigation = ({ user, setLoginOpen, setRegisterOpen }) => {
  const [showSubnavigation, setShowSubnavigation] = useState(true);

  const controlSubnavigation = () => {
    setShowSubnavigation(window.scrollY > 0 ? false : true);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlSubnavigation);
    return () => {
      window.removeEventListener("scroll", controlSubnavigation);
    };
  }, []);

  return (
    <NavigationContainer className={!showSubnavigation && "active"} fluid>
      {showSubnavigation && <SubNavigation />}
      <MainNavigation
        className={!showSubnavigation && "sticky"}
        user={user}
        setLoginOpen={setLoginOpen}
        setRegisterOpen={setRegisterOpen}
      />
    </NavigationContainer>
  );
};

export default Navigation;
