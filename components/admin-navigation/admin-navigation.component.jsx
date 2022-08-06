import React from "react";
import { Grid, Header, List } from "semantic-ui-react";
import { AdminNavigationContainer } from "./admin-navigation.styles";

const AdminNavigation = ({ title }) => {
  return (
    <AdminNavigationContainer>
      <Grid>
        <Grid.Row>
          <Grid.Column textAlign="right" verticalAlign="middle">
            {/* <Header as="h1">{title}</Header> */}
            <List horizontal>
              <List.Item>Đăng nhập</List.Item>
              <List.Item>Đăng ký</List.Item>
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </AdminNavigationContainer>
  );
};

export default AdminNavigation;
