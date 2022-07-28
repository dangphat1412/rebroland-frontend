import React, { useState, useEffect } from "react";
import LoginRegisterModal from "../login-register-modal/login-register-modal.component";
import MainNavigation from "../main-navigation/main-navigation.component";
import SubNavigation from "../sub-navigation/sub-navigation.component";
import { NavigationContainer } from "./navigation.styles";
import { Client } from "@stomp/stompjs";
import SOCKET_URL from "../../utils/socketUrl";

const Navigation = ({
  user,
  isBroker,
  setLoading,
  followingPosts,
  setFollowingPosts,
  toast,
}) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [otpForgotPasswordOpen, setOtpForgotPasswordOpen] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [otpRegisterOpen, setOtpRegisterOpen] = useState(false);
  const [showSubnavigation, setShowSubnavigation] = useState(true);
  const [unreadNotification, setUnreadNotification] = useState(
    (user && user.unreadNotification) || null
  );

  useEffect(() => {
    const sound = new Audio("/light.mp3");

    let onConnected = () => {
      user &&
        client.subscribe(`/topic/message/${user.id}`, function (msg) {
          if (msg.body) {
            var jsonBody = JSON.parse(msg.body);
            if (jsonBody.message) {
              setUnreadNotification(unreadNotification + 1);
              setTimeout(() => {
                sound && sound.play();
                toast({
                  type: "info",
                  title: "Info Toast",
                  description: <p>{jsonBody.message}</p>,
                });
              }, 100);
            }
          }
        });
    };

    let onDisconnected = () => {
      console.log("Disconnected!!");
    };

    const client = new Client({
      brokerURL: SOCKET_URL,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: onConnected,
      onDisconnect: onDisconnected,
    });

    client.activate();
  });

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
          unreadNotification={unreadNotification}
          setUnreadNotification={setUnreadNotification}
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
