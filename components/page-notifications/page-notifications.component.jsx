import React from "react";
import { Grid, Header, Segment } from "semantic-ui-react";
import { NotificationsContainer } from "./page-notifications.styles";

const NotificationsPage = () => {
  return (
    <NotificationsContainer>
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={8}>
            <Segment>
              <Header as="h1">Thông báo</Header>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </NotificationsContainer>
  );
};

export default NotificationsPage;
