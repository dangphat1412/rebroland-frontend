import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";
import {
  Button,
  Dropdown,
  Grid,
  Icon,
  Image,
  Label,
  List,
  Popup,
  Radio,
} from "semantic-ui-react";
import { logoutUser } from "../../actions/auth";
import { NavContainer, Menu, LogoContainer } from "./main-navigation.styles";

const MainNavigation = ({
  user,
  isBroker,
  followingPosts,
  setFollowingPosts,
  className,
  setLoginOpen,
  setRegisterOpen,
}) => {
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
                <Link href="/bat-dong-san">
                  <List.Item as="a">Bất động sản</List.Item>
                </Link>
                <List.Item as="a">Nhà môi giới</List.Item>
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
                              <Dropdown.Header content="Chế độ nhà môi giới" />
                              <Radio toggle className="btn-radio" />
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
                      content="I will not flip!"
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
                          {followingPosts.length > 0 && (
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
