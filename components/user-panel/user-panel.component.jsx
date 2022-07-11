import React from "react";
import { Grid, Header, Icon, Image, List, Segment } from "semantic-ui-react";
import Link from "next/link";
import { UserPanelContainer } from "./user-panel.styles";

const UserPanel = ({ user }) => {
  return (
    <UserPanelContainer>
      <Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Image
                src={
                  user.avatar ||
                  "https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
                }
                size="small"
                // circular
                alt="avatar"
                verticalAlign="middle"
              />
              <Header as="h3">{user.fullName}</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div>
          <Icon name="mobile alternate" />
          {user.phone}
        </div>
        <div>
          <Icon name="mail outline" />
          {user.email}
        </div>
        <div>
          <Icon name="map marker alternate" />
          <span>Ngọc Nội, Trạm Lộ, Thuận Thành, Bắc Ninh</span>
        </div>
      </Segment>
      <Segment>
        <List divided relaxed selection size="big">
          <Link href="/trang-ca-nhan/thong-tin-ca-nhan">
            <List.Item>
              <List.Icon name="user outline" />
              <List.Content>
                <List.Header as="h4">Thông tin cá nhân</List.Header>
              </List.Content>
            </List.Item>
          </Link>
          <Link href="/trang-ca-nhan/bat-dong-san-cua-toi">
            <List.Item>
              <List.Icon name="file outline" />
              <List.Content>
                <List.Header as="h4">Bất động sản của tôi</List.Header>
              </List.Content>
            </List.Item>
          </Link>
          <List.Item>
            <List.Icon name="heart outline" />
            <List.Content>
              <List.Header as="h4">Bất động sản đã thích</List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="edit outline" />
            <List.Content>
              <List.Header as="h4">Đăng tin</List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="log out" />
            <List.Content>
              <List.Header as="h4">Đăng xuất</List.Header>
            </List.Content>
          </List.Item>
        </List>
      </Segment>
    </UserPanelContainer>
  );
};

export default UserPanel;
