import Link from "next/link";
import Router from "next/router";
import React, { useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Button,
  Dimmer,
  Divider,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Label,
  List,
  Loader,
  Popup,
  Radio,
  Segment,
} from "semantic-ui-react";
import { logoutUser, switchRole } from "../../actions/auth";
import {
  getNotifications,
  readNotifications,
} from "../../actions/notifications";
import { NavContainer, Menu, LogoContainer } from "./main-navigation.styles";

const MainNavigation = ({
  user,
  isBroker,
  className,
  setLoginOpen,
  setRegisterOpen,
  setLoading,
  followingPosts,
  unreadNotification,
  setUnreadNotification,
  setFollowingPosts,
}) => {
  const [notifications, setNotifications] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const isFirstTime = useRef(true);
  const [openNotification, setOpenNotification] = useState(false);

  const handleSwitchBroker = async () => {
    await switchRole(setLoading);
  };

  const handleShowNotification = async () => {
    setOpenNotification(true);
    if (isFirstTime.current === true || unreadNotification > 0) {
      const data = await getNotifications(0);
      setNotifications([...data]);
      setUnreadNotification(null);
    }
    isFirstTime.current = false;
  };

  const fetchNotificationsOnScroll = async () => {
    try {
      const data = await getNotifications(pageNumber);

      if (data.length === 0) setHasMore(false);

      setNotifications([...notifications, ...data]);
      setPageNumber((prev) => prev + 1);
    } catch (error) {
      alert("Error fetching Posts");
    }
  };

  return (
    <div>
      <NavContainer className={className} fluid>
        <Menu>
          <Grid>
            <Grid.Column width={4} textAlign="left" verticalAlign="middle">
              <Link
                href={user && user.currentRole === 3 ? "/nha-moi-gioi" : "/"}
                passHref
              >
                <a>
                  <LogoContainer
                    src="/logo-slogan.png"
                    alt="ReBroLand"
                    size="medium"
                  />
                </a>
              </Link>
            </Grid.Column>
            <Grid.Column width={8} textAlign="center" verticalAlign="middle">
              <List horizontal relaxed="very">
                <Link href="/">
                  <List.Item as="a">Trang chủ</List.Item>
                </Link>
                <Link
                  href={
                    user && user.currentRole === 3
                      ? "/nha-moi-gioi/bat-dong-san"
                      : "/bat-dong-san"
                  }
                >
                  <List.Item as="a">Bất động sản</List.Item>
                </Link>
                {(!user || (user && user.currentRole === 2)) && (
                  <Link href="/danh-sach-nha-moi-gioi">
                    <List.Item as="a">Nhà môi giới</List.Item>
                  </Link>
                )}
                {user && user.currentRole === 3 && (
                  <Link href="/nha-moi-gioi/xu-ly-yeu-cau-lien-he-lai">
                    <List.Item as="a">Yêu cầu liên hệ lại</List.Item>
                  </Link>
                )}
                {user && user.currentRole === 3 && (
                  <Link href="/nha-moi-gioi/cham-soc-khach-hang">
                    <List.Item as="a">Chăm sóc khách hàng</List.Item>
                  </Link>
                )}
                <Link href="/lien-he">
                  <List.Item as="a">Liên hệ</List.Item>
                </Link>
              </List>
            </Grid.Column>
            <Grid.Column width={4} textAlign="right" verticalAlign="middle">
              <List horizontal relaxed={user ? false : true}>
                {!user ? (
                  <>
                    <List.Item as="a" onClick={() => setLoginOpen(true)}>
                      Đăng nhập
                    </List.Item>
                    <List.Item as="a" onClick={() => setRegisterOpen(true)}>
                      Đăng ký
                    </List.Item>
                  </>
                ) : (
                  <>
                    <List.Item>
                      <Dropdown
                        trigger={
                          <>
                            <Image
                              avatar
                              src={user.avatar || "/default-avatar.png"}
                              alt="avatar"
                            />
                            <span>{user.fullName}</span>
                          </>
                        }
                        simple
                        direction="left"
                      >
                        <Dropdown.Menu>
                          {isBroker ? (
                            <>
                              <Dropdown.Header
                                content={
                                  user.currentRole === 3
                                    ? "Chế độ nhà môi giới"
                                    : "Chế độ người dùng"
                                }
                              />
                              <Radio
                                toggle
                                className="btn-radio"
                                checked={user.currentRole === 3}
                                onChange={handleSwitchBroker}
                              />
                            </>
                          ) : (
                            <Dropdown.Item
                              icon="home"
                              text="Trở thành nhà môi giới"
                              style={{ fontWeight: "bold" }}
                              onClick={() => {
                                Router.push("/nha-moi-gioi/dang-ky");
                              }}
                            />
                          )}
                          <Dropdown.Divider />
                          <Dropdown.Item
                            icon="user outline"
                            text="Thông tin cá nhân"
                            onClick={() => {
                              Router.push("/trang-ca-nhan/thong-tin-ca-nhan");
                            }}
                          />
                          {user && user.currentRole === 2 && (
                            <Dropdown.Item
                              icon="file alternate outline"
                              text="Bất động sản của tôi"
                              onClick={() => {
                                Router.push(
                                  "/trang-ca-nhan/bat-dong-san-cua-toi"
                                );
                              }}
                            />
                          )}
                          {user && user.currentRole === 3 && (
                            <Dropdown.Item
                              icon="file alternate outline"
                              text="Bất động sản phái sinh"
                              onClick={() => {
                                Router.push(
                                  "/trang-ca-nhan/bat-dong-san-phai-sinh-cua-toi"
                                );
                              }}
                            />
                          )}
                          <Dropdown.Item
                            icon="heart outline"
                            text="Bất động sản đã lưu"
                            onClick={() => {
                              Router.push(
                                "/trang-ca-nhan/danh-sach-tin-da-luu"
                              );
                            }}
                          />
                          <Dropdown.Item
                            icon="credit card outline"
                            text="Nạp tiền vào ví"
                            onClick={() => {
                              Router.push("/trang-ca-nhan/nap-tien");
                            }}
                          />
                          <Dropdown.Item
                            icon="credit card outline"
                            text="Chuyển khoản"
                            onClick={() => {
                              Router.push("/trang-ca-nhan/chuyen-khoan");
                            }}
                          />
                          <Dropdown.Item
                            icon="money bill alternate outline"
                            text="Rút tiền"
                            onClick={() => {
                              Router.push("/trang-ca-nhan/rut-tien");
                            }}
                          />
                          <Dropdown.Item
                            icon="key"
                            text="Đổi mật khẩu"
                            onClick={() => {
                              Router.push("/trang-ca-nhan/thay-doi-mat-khau");
                            }}
                          />
                          {user && user.currentRole === 2 && (
                            <Dropdown.Item
                              icon="volume control phone"
                              text="Yêu cầu liên hệ lại"
                              onClick={() => {
                                Router.push(
                                  "/trang-ca-nhan/yeu-cau-lien-he-lai"
                                );
                              }}
                            />
                          )}
                          <Dropdown.Item
                            icon="phone"
                            text="Đổi số điện thoại"
                            onClick={() => {
                              Router.push(
                                "/trang-ca-nhan/thay-doi-so-dien-thoai"
                              );
                            }}
                          />
                          <Dropdown.Item
                            icon="sign out"
                            text="Đăng xuất"
                            onClick={async () => {
                              await logoutUser();
                            }}
                          />
                        </Dropdown.Menu>
                      </Dropdown>
                    </List.Item>
                    <Popup
                      wide="very"
                      content={
                        <>
                          <Header
                            as="h3"
                            textAlign="center"
                            style={{
                              fontFamily: "Tahoma",
                            }}
                          >
                            Tin đăng đã lưu
                          </Header>
                          <Divider />
                          <Item.Group divided link>
                            {followingPosts &&
                              followingPosts.map((post, index) => {
                                return (
                                  index < 3 && (
                                    <Item key={index}>
                                      <Item.Image
                                        size="tiny"
                                        src={
                                          post.thumbnail ||
                                          "https://www.phoenixpropertymaster.com/wp-content/uploads/2021/12/Real-Estate.jpg"
                                        }
                                        className="following-image"
                                      />
                                      <Item.Content verticalAlign="top">
                                        {post.title}
                                        <Item.Extra>
                                          {post.startDate}
                                        </Item.Extra>
                                      </Item.Content>
                                    </Item>
                                  )
                                );
                              })}
                          </Item.Group>
                          <Divider />
                          <Link href="/trang-ca-nhan/danh-sach-tin-da-luu">
                            Xem tất cả
                          </Link>
                        </>
                      }
                      on="click"
                      pinned
                      basic
                      position="bottom center"
                      trigger={
                        <List.Item as="a">
                          <Icon
                            name="heart outline"
                            inverted
                            color="grey"
                            size="large"
                          />
                          {followingPosts && followingPosts.length > 0 && (
                            <Label circular color="red" floating size="tiny">
                              {followingPosts.length}
                            </Label>
                          )}
                        </List.Item>
                      }
                    />
                    <Popup
                      wide="very"
                      content={
                        <NotificationList
                          notifications={notifications}
                          setNotifications={setNotifications}
                          hasMore={hasMore}
                          fetchNotificationsOnScroll={
                            fetchNotificationsOnScroll
                          }
                          setOpenNotification={setOpenNotification}
                        />
                      }
                      on="click"
                      onOpen={handleShowNotification}
                      onClose={() => setOpenNotification(false)}
                      open={openNotification}
                      basic
                      pinned
                      position="bottom center"
                      trigger={
                        <List.Item as="a">
                          <Icon
                            name="bell outline"
                            inverted
                            color="grey"
                            size="large"
                          />
                          {unreadNotification && unreadNotification > 0 && (
                            <Label circular color="red" floating size="tiny">
                              {unreadNotification}
                            </Label>
                          )}
                        </List.Item>
                      }
                    />
                  </>
                )}

                <List.Item as="a">
                  <Button
                    inverted
                    color="red"
                    disabled={user && user.currentRole === 3}
                    onClick={() => {
                      user && Router.push("/dang-tin");
                      !user && setLoginOpen(true);
                    }}
                  >
                    Đăng tin
                  </Button>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid>
        </Menu>
      </NavContainer>
    </div>
  );
};

const NotificationList = ({
  notifications,
  setNotifications,
  hasMore,
  fetchNotificationsOnScroll,
  setOpenNotification,
}) => {
  return (
    <>
      <InfiniteScroll
        hasMore={hasMore}
        next={fetchNotificationsOnScroll}
        loader={
          <Segment>
            <Dimmer active inverted>
              <Loader inverted />
            </Dimmer>
          </Segment>
        }
        endMessage={<b>Đã xem hết thông báo</b>}
        dataLength={notifications.length}
        style={{ height: "80vh", width: "400px", overflowY: "scroll" }}
      >
        <Header as="h3" style={{ fontFamily: "Tahoma" }}>
          Thông báo
        </Header>
        <Link href={"/thong-bao"} floated="right">
          Xem tất cả
        </Link>
        <Divider />
        <Item.Group divided link>
          {notifications.map((notification, index) => {
            return (
              <Item
                key={index}
                onClick={async () => {
                  const data = await readNotifications(notification.id);
                  if (data) {
                    console.log("NOTIFICATION: ", data);
                    const list = notifications;
                    const index = list.findIndex(
                      (n) => n.id === notification.id
                    );
                    list[index].unRead = false;
                    setNotifications(list);
                    setOpenNotification(false);
                    console.log(notifications);
                    // if (data.type === "Contact") {
                    //   Router.push("/nha-moi-gioi/xu-ly-yeu-cau-lien-he-lai");
                    // }
                    // if (data.type === "Refund") {
                    //   Router.push("/trang-ca-nhan/thong-tin-ca-nhan");
                    // }
                    // if (data.type === "Report") {
                    //   Router.push(
                    //     `/trang-ca-nhan/bat-dong-san-cua-toi/${data.postId}`
                    //   );
                    // }
                    // if (data.type === "PostStatus") {
                    //   Router.push(
                    //     `/trang-ca-nhan/bat-dong-san-cua-toi/${data.postId}`
                    //   );
                    // }
                    // if (data.type === "FinishTakeCare") {
                    //   Router.push(
                    //     {
                    //       pathname: `/danh-sach-nha-moi-gioi/${data.sender}`,
                    //       query: { allowRate: data.unread },
                    //     },
                    //     `/danh-sach-nha-moi-gioi/${data.sender}`
                    //   );
                    // }
                    // if (data.type === "FinishTransaction") {
                    //   Router.push(
                    //     {
                    //       pathname: `/chi-tiet-nguoi-dung/${data.sender}`,
                    //       query: { allowRate: data.unread },
                    //     },
                    //     `/chi-tiet-nguoi-dung/${data.sender}`
                    //   );
                    // }
                  }
                }}
              >
                <Item.Image
                  src={
                    notification.type === "Contact"
                      ? "https://veganic.vn/images/social/phone.png"
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkTY0F2IXGOFku2yIu4HOqO6UMaTcke1w33xHRrSPu1dgHbX7amiOvnTu1W-cuSZppuEo&usqp=CAU"
                  }
                  size="tiny"
                />
                <Item.Content verticalAlign="middle">
                  {notification.type === "Contact" && (
                    <Item.Description>
                      Số điện thoại <b>{notification.phone}</b> muốn liên lạc
                      với bạn
                    </Item.Description>
                  )}
                  {notification.type === "Report" && (
                    <Item.Description>{notification.content}</Item.Description>
                  )}
                  {notification.type === "PostStatus" && (
                    <Item.Description>{notification.content}</Item.Description>
                  )}
                  {notification.type === "FinishTakeCare" && (
                    <Item.Description>{notification.content}</Item.Description>
                  )}
                  <Item.Extra>{notification.date}</Item.Extra>
                </Item.Content>
                {notification.unRead === true && (
                  <Item.Content verticalAlign="right" style={{ width: "20px" }}>
                    <Item.Extra>
                      <Label floated="right" circular color="blue" empty />
                    </Item.Extra>
                  </Item.Content>
                )}
              </Item>
            );
          })}
        </Item.Group>
      </InfiniteScroll>
    </>
  );
};

export default MainNavigation;
