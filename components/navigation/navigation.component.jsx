import React, { useState, useEffect } from "react";
import MainNavigation from "../main-navigation/main-navigation.component";
import SubNavigation from "../sub-navigation/sub-navigation.component";
import { NavigationContainer } from "./navigation.styles";
import { Client } from "@stomp/stompjs";
import SOCKET_URL from "../../utils/socketUrl";
import { useRouter } from "next/router";

const Navigation = ({
  user,
  isBroker,
  setLoading,
  followingPosts,
  setFollowingPosts,
  toast,
  setLoginOpen,
  setRegisterOpen,
}) => {
  const [showSubnavigation, setShowSubnavigation] = useState(true);
  const [unreadNotification, setUnreadNotification] = useState(
    (user && user.unreadNotification) || null
  );

  const router = useRouter();

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

  if (
    router.asPath !== "/admin/quan-ly-bai-dang" &&
    router.asPath !== "/admin/quan-ly-bao-cao" &&
    router.asPath !== "/admin/quan-ly-tai-chinh" &&
    router.asPath !== "/admin/quan-ly-nguoi-dung"
  )
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
      </>
    );
};

export default Navigation;
