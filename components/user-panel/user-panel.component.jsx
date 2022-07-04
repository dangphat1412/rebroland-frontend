import React from "react";
import { Image, List, Segment } from "semantic-ui-react";
import Link from "next/link";

const UserPanel = () => {
  return (
    <>
      <Segment textAlign="center">
        <Image
          src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
          size="small"
          circular
          alt="avatar"
          verticalAlign="middle"
        />
        <br />
        <h3>Nguyễn Đăng Phát</h3>
        <h3>Số điện thoại liên hệ: 0869009629</h3>
      </Segment>
      <Segment>
        <List divided relaxed selection size="big">
          <Link href="/trang-ca-nhan/thong-tin-ca-nhan">
            <List.Item>
              <List.Icon name="user outline" />
              <List.Content>
                <List.Header>Thông tin cá nhân</List.Header>
              </List.Content>
            </List.Item>
          </Link>
          <Link href="/trang-ca-nhan/bat-dong-san-cua-toi">
            <List.Item>
              <List.Icon name="file outline" />
              <List.Content>
                <List.Header>Bất động sản của tôi</List.Header>
              </List.Content>
            </List.Item>
          </Link>
          <List.Item>
            <List.Icon name="heart outline" />
            <List.Content>
              <List.Header>Bất động sản đã thích</List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="edit outline" />
            <List.Content>
              <List.Header>Đăng tin</List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="log out" />
            <List.Content>
              <List.Header>Đăng xuất</List.Header>
            </List.Content>
          </List.Item>
        </List>
      </Segment>
    </>
  );
};

export default UserPanel;
