import React from "react";
import { Grid, Icon, Image, Menu, Segment } from "semantic-ui-react";
import { AdminContainer } from "./admin-home.styles";

const AdminHome = () => {
  return (
    <AdminContainer>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <Menu icon="labeled" vertical inverted className="admin-menu">
              <Menu.Item name="gamepad">
                <Image src="/logo-slogan.png" alt="ReBroLand" size="medium" />
              </Menu.Item>

              <Menu.Item name="video camera" active>
                <span class="kikor kiko-management-company"></span>
                Quản lý người dùng
              </Menu.Item>
              <Menu.Item name="video camera">
                <span class="kikor kiko-management-company"></span>
                Quản lý quản trị viên
              </Menu.Item>
              <Menu.Item name="video camera">
                <span class="kikor kiko-management-company"></span>
                Quản lý bài đăng
              </Menu.Item>
              <Menu.Item name="video camera">
                <span class="kikor kiko-management-company"></span>
                Quản lý các báo cáo
              </Menu.Item>
              <Menu.Item name="video camera">
                <span class="kikor kiko-management-company"></span>
                Lịch sử
              </Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column width={13}>
            <Segment>ABCDEF</Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </AdminContainer>
  );
};

export default AdminHome;
