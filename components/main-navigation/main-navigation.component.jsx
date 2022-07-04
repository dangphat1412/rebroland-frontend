import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";
import {
  Button,
  Dropdown,
  Grid,
  Icon,
  Image,
  List,
  Radio,
} from "semantic-ui-react";
import { logoutUser } from "../../actions/auth";
import { NavContainer, Menu, LogoContainer } from "./main-navigation.styles";

const MainNavigation = ({ user, className, setLoginOpen, setRegisterOpen }) => {
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
                          <Dropdown.Header content="Chế độ nhà môi giới" />
                          <Radio toggle className="btn-radio" />
                          <Dropdown.Divider />
                          <Dropdown.Item
                            icon="user outline"
                            text="Thông tin cá nhân"
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
                    <List.Item as="a">
                      <Icon
                        name="heart outline"
                        inverted
                        color="grey"
                        size="large"
                      />
                    </List.Item>
                    <List.Item as="a">
                      <Icon
                        name="bell outline"
                        inverted
                        color="grey"
                        size="large"
                      />
                    </List.Item>
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
