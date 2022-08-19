import React, { useState, useEffect } from "react";
import MainNavigation from "../main-navigation/main-navigation.component";
import SubNavigation from "../sub-navigation/sub-navigation.component";
import { NavigationContainer } from "./navigation.styles";
import { useRouter } from "next/router";
import Pusher from "pusher-js";

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

    Pusher.logToConsole = true;

    let pusher;

    pusher = new Pusher("242a962515021986a8d8", {
      cluster: "ap1",
      enabledTransports: ["ws"],
    });
    let channel;
    if (user) channel = pusher.subscribe(`my-channel-${user.id}`);
    user &&
      channel.bind("my-event", function (data) {
        if (data.message) {
          setUnreadNotification(unreadNotification + 1);
          setTimeout(() => {
            sound && sound.play();
            toast({
              type: "info",
              title: "Info Toast",
              description: <p>{data.message}</p>,
            });
          }, 100);
        }
      });
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
    router.asPath !== "/admin/quan-ly-nguoi-dung" &&
    router.asPath !== "/admin/quan-ly-rut-tien"
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
