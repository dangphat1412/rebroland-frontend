import React, { useState, useEffect } from "react";
import LoginRegisterModal from "../login-register-modal/login-register-modal.component";
import MainNavigation from "../main-navigation/main-navigation.component";
import SubNavigation from "../sub-navigation/sub-navigation.component";
import { NavigationContainer } from "./navigation.styles";
import { Client } from "@stomp/stompjs";

const SOCKET_URL = "ws://localhost:8080/ws-message";

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

  const [message, setMessage] = useState("You server message here.");

  useEffect(() => {
    let onConnected = () => {
      console.log("Connected!!");
      client.subscribe("/topic/message", function (msg) {
        if (msg.body) {
          var jsonBody = JSON.parse(msg.body);
          if (jsonBody.message) {
            setMessage(jsonBody.message);
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

  let onConnected = () => {
    console.log("Connected!!");
  };

  let onMessageReceived = (msg) => {
    setMessage(msg.message);
  };

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
      {/* <SockJsClient
        url={SOCKET_URL}
        topics={["/topic/message"]}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={(msg) => onMessageReceived(msg)}
        debug={false}
        autoReconnect={true}
      /> */}

      <div>{message}</div>

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
