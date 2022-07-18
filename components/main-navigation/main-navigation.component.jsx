import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";
import {
  Button,
  Divider,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Label,
  List,
  Popup,
  Radio,
} from "semantic-ui-react";
import { logoutUser, switchRole } from "../../actions/auth";
import { NavContainer, Menu, LogoContainer } from "./main-navigation.styles";

const MainNavigation = ({
  user,
  isBroker,
  className,
  setLoginOpen,
  setRegisterOpen,
  setLoading,
  followingPosts,
  setFollowingPosts,
}) => {
  console.log(followingPosts);
  const handleSwitchBroker = async () => {
    await switchRole(setLoading);
  };

  return (
    <div>
      <NavContainer className={className} fluid>
        <Menu>
          <Grid>
            <Grid.Column width={4} textAlign="left" verticalAlign="middle">
              <Link href="/" passHref>
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
                    user && user.currentRole
                      ? "/nha-moi-gioi/bat-dong-san"
                      : "/bat-dong-san"
                  }
                >
                  <List.Item as="a">Bất động sản</List.Item>
                </Link>
                <Link href="/danh-sach-nha-moi-gioi">
                  <List.Item as="a">Nhà môi giới</List.Item>
                </Link>
                {user && user.currentRole === 3 && (
                  <Link href="/nha-moi-gioi/cham-soc-khach-hang">
                    <List.Item as="a">Chăm sóc khách hàng</List.Item>
                  </Link>
                )}
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
                              src="https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg"
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
                          <Dropdown.Item
                            icon="file alternate outline"
                            text="Bất động sản của tôi"
                            onClick={() => {
                              Router.push(
                                "/trang-ca-nhan/bat-dong-san-cua-toi"
                              );
                            }}
                          />
                          <Dropdown.Item
                            icon="heart outline"
                            text="Danh sách tin đã lưu"
                            onClick={() => {
                              Router.push(
                                "/trang-ca-nhan/danh-sach-tin-da-luu"
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
                          <Link href="/">Xem tất cả</Link>
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
                      content="I will not flip!"
                      on="click"
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
                          <Label circular color="red" floating size="tiny">
                            2
                          </Label>
                        </List.Item>
                      }
                    />
                  </>
                )}

                <List.Item as="a">
                  <Link href="/dang-tin">
                    <Button inverted color="red">
                      Đăng tin
                    </Button>
                  </Link>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid>
        </Menu>
      </NavContainer>
    </div>
  );
};

export default MainNavigation;
