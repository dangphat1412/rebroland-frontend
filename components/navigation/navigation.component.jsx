import React, { useState, useReducer } from "react";
import {
  Grid,
  Image,
  List,
  Modal,
  TransitionablePortal,
} from "semantic-ui-react";
import LoginRegisterModal from "../login-register-modal/login-register-modal.component";
import Login from "../login/login.component";
import Register from "../register/register.component";
import { NavContainer, Menu } from "./navigation.styles";

const modalReducer = (state, action) => {
  switch (action.type) {
    case "close":
      return { open: false };
    case "open":
      return { open: true, header: action.header, formName: action.formName };
    default:
      throw new Error("Unsupported action...");
  }
};

const Navigation = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const [state, dispatch] = useReducer(modalReducer, {
    open: false,
    header: undefined,
    formName: undefined,
  });

  const { open, header, formName } = state;

  return (
    <>
      <NavContainer fluid>
        <Menu>
          <Grid>
            <Grid.Column width={4} textAlign="left" verticalAlign="middle">
              <Image src="/logo-slogan.png" alt="ReBroLand" size="medium" />
            </Grid.Column>
            <Grid.Column width={8} textAlign="center" verticalAlign="middle">
              <List horizontal relaxed="very">
                <List.Item as="a">Trang chủ</List.Item>
                <List.Item as="a">Stevie Feliciano</List.Item>
                <List.Item as="a">Nhà môi giới</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={4} textAlign="right" verticalAlign="middle">
              <List horizontal relaxed="very">
                <List.Item as="a" onClick={() => setLoginOpen(true)}>
                  Đăng nhập
                </List.Item>
                <List.Item as="a" onClick={() => setRegisterOpen(true)}>
                  Đăng ký
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
      />
    </>
  );
};

export default Navigation;
