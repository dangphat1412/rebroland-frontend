import Link from "next/link";
import React, { useState } from "react";
import { Button, Grid, List } from "semantic-ui-react";
import LoginRegisterModal from "../login-register-modal/login-register-modal.component";
import { NavContainer, Menu, LogoContainer } from "./main-navigation.styles";

const MainNavigation = ({ className }) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [otpResetPasswordOpen, setOtpResetPasswordOpen] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [otpRegisterOpen, setOtpRegisterOpen] = useState(false);

  return (
    <div>
      <NavContainer className={className} fluid>
        <Menu>
          <Grid>
            <Grid.Column width={4} textAlign="left" verticalAlign="middle">
              <Link href="/">
                <LogoContainer
                  src="/logo-slogan.png"
                  alt="ReBroLand"
                  size="medium"
                />
              </Link>
            </Grid.Column>
            <Grid.Column width={8} textAlign="center" verticalAlign="middle">
              <List horizontal relaxed="very">
                <List.Item as="a">Trang chủ</List.Item>
                <List.Item as="a">Stevie Feliciano</List.Item>
                <List.Item as="a">Stevie Feliciano</List.Item>
                <List.Item as="a">Nhà môi giới</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={4} textAlign="right" verticalAlign="middle">
              <List horizontal relaxed>
                <List.Item as="a" onClick={() => setLoginOpen(true)}>
                  Đăng nhập
                </List.Item>
                <List.Item as="a" onClick={() => setRegisterOpen(true)}>
                  Đăng ký
                </List.Item>
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
      <LoginRegisterModal
        loginOpen={loginOpen}
        setLoginOpen={setLoginOpen}
        registerOpen={registerOpen}
        setRegisterOpen={setRegisterOpen}
        forgotPasswordOpen={forgotPasswordOpen}
        setForgotPasswordOpen={setForgotPasswordOpen}
        otpResetPasswordOpen={otpResetPasswordOpen}
        setOtpResetPasswordOpen={setOtpResetPasswordOpen}
        resetPasswordOpen={resetPasswordOpen}
        setResetPasswordOpen={setResetPasswordOpen}
        otpRegisterOpen={otpRegisterOpen}
        setOtpRegisterOpen={setOtpRegisterOpen}
      />
    </div>
  );
};

export default MainNavigation;
