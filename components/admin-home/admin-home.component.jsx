import React from "react";
import { Icon, Image, Menu } from "semantic-ui-react";

const AdminHome = () => {
  return (
    <div>
      <Menu icon="labeled" vertical inverted>
        <Menu.Item name="gamepad">
          <Image src="/logo-slogan.png" alt="ReBroLand" size="medium" />
        </Menu.Item>

        <Menu.Item name="video camera" fitted="vertically" position="left">
          <Icon name="video camera" />
          Quản lý người dùng
        </Menu.Item>

        <Menu.Item name="video play">
          <Icon name="video play" />
          Quản lý quản trị viên
        </Menu.Item>

        <Menu.Item name="video play">
          <Icon name="video play" />
          Quản lý bài đăng
        </Menu.Item>

        <Menu.Item name="video play">
          <Icon name="video play" />
          Quản lý các báo cáo
        </Menu.Item>

        <Menu.Item name="video play">
          <Icon name="video play" />
          Lịch sử
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default AdminHome;
