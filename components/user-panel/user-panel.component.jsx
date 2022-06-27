import React, { useEffect, useState } from "react";
import {
  Grid,
  Icon,
  Image,
  Item,
  List,
  Pagination,
  Segment,
  Table,
} from "semantic-ui-react";
import Link from "next/link";
import { getPostsByUser } from "../../actions/post";
import { UserPanelContainer } from "./user-panel.styles";
import MyProfileProperty from "../my-profile-property/my-profile-property.component";

const UserPanel = () => {
  return (
    <UserPanelContainer>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
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
              </List>
            </Segment>
          </Grid.Column>
          <Grid.Column width={12}>
            <MyProfileProperty />
            <Pagination
              defaultActivePage={5}
              ellipsisItem={{
                content: <Icon name="ellipsis horizontal" />,
                icon: true,
              }}
              firstItem={{
                content: <Icon name="angle double left" />,
                icon: true,
              }}
              lastItem={{
                content: <Icon name="angle double right" />,
                icon: true,
              }}
              prevItem={{ content: <Icon name="angle left" />, icon: true }}
              nextItem={{ content: <Icon name="angle right" />, icon: true }}
              totalPages={10}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </UserPanelContainer>
  );
};

export default UserPanel;
