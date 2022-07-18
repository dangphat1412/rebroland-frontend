import React, { useState, useEffect } from "react";
import LoginRegisterModal from "../login-register-modal/login-register-modal.component";
import MainNavigation from "../main-navigation/main-navigation.component";
import SubNavigation from "../sub-navigation/sub-navigation.component";
import { NavigationContainer } from "./navigation.styles";

const Navigation = ({
  user,
  isBroker,
  setLoading,
  followingPosts,
  setFollowingPosts,
}) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [otpForgotPasswordOpen, setOtpForgotPasswordOpen] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [otpRegisterOpen, setOtpRegisterOpen] = useState(false);
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
    <>
      <NavigationContainer className={!showSubnavigation && "active"} fluid>
        {showSubnavigation && <SubNavigation />}
        <MainNavigation
          className={!showSubnavigation && "sticky"}
          user={user}
          isBroker={isBroker}
          setLoginOpen={setLoginOpen}
          setRegisterOpen={setRegisterOpen}
          setLoading={setLoading}
          followingPosts={followingPosts}
          setFollowingPosts={setFollowingPosts}
        />
      </NavigationContainer>
      <LoginRegisterModal
        loginOpen={loginOpen}
        setLoginOpen={setLoginOpen}
        registerOpen={registerOpen}
        setRegisterOpen={setRegisterOpen}
        forgotPasswordOpen={forgotPasswordOpen}
        setForgotPasswordOpen={setForgotPasswordOpen}
        otpForgotPasswordOpen={otpForgotPasswordOpen}
        setOtpForgotPasswordOpen={setOtpForgotPasswordOpen}
        resetPasswordOpen={resetPasswordOpen}
        setResetPasswordOpen={setResetPasswordOpen}
        otpRegisterOpen={otpRegisterOpen}
        setOtpRegisterOpen={setOtpRegisterOpen}
        setLoading={setLoading}
        followingPosts={followingPosts}
        setFollowingPosts={setFollowingPosts}
      />
    </>
  );
};

export default Navigation;
