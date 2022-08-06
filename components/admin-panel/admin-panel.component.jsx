import React, { useState } from "react";
import { Icon, Image, Menu } from "semantic-ui-react";
import { AdminPanelContainer } from "./admin-panel.styles";
import { useRouter } from "next/router";
import { logoutUser } from "../../actions/auth";

const AdminPanel = () => {
  const router = useRouter();

  const handleItemClick = (e, { name }) => {
    switch (name) {
      case "users":
        router.push("/admin/quan-ly-nguoi-dung");
        break;
      case "posts":
        router.push("/admin/quan-ly-bai-dang");
        break;
      case "reports":
        router.push("/admin/quan-ly-bao-cao");
        break;
      case "payment":
        router.push("/admin/quan-ly-tai-chinh");
        break;
      default:
      // code block
    }
  };

  return (
    <AdminPanelContainer>
      <Menu
        icon="labeled"
        vertical
        inverted
        className="admin-panel"
        fixed="left"
      >
        <Menu.Item>
          <Image src="/logo-slogan.png" alt="ReBroLand" size="medium" />
        </Menu.Item>

        <Menu.Item
          name="users"
          active={router.asPath === "/admin/quan-ly-nguoi-dung"}
          onClick={handleItemClick}
        >
          <Icon name="users" />
          Quản lý người dùng
        </Menu.Item>

        <Menu.Item
          name="posts"
          active={router.asPath === "/admin/quan-ly-bai-dang"}
          onClick={handleItemClick}
        >
          <Icon name="newspaper outline" />
          Quản lý bài đăng
        </Menu.Item>

        <Menu.Item
          name="reports"
          active={router.asPath === "/admin/quan-ly-bao-cao"}
          onClick={handleItemClick}
        >
          <Icon name="warning sign" />
          Quản lý báo báo
        </Menu.Item>

        <Menu.Item
          name="payment"
          active={router.asPath === "/admin/quan-ly-tai-chinh"}
          onClick={handleItemClick}
        >
          <Icon name="credit card outline" />
          Quản lý giao dịch
        </Menu.Item>
        <Menu.Item
          onClick={async () => {
            await logoutUser();
          }}
        >
          <Icon name="sign out" />
          Đăng xuất
        </Menu.Item>
      </Menu>
    </AdminPanelContainer>
  );
};

export default AdminPanel;
