import Link from "next/link";
import React, { useState } from "react";
import {
  Button,
  Dimmer,
  Divider,
  Grid,
  Header,
  Icon,
  Item,
  Label,
  Loader,
  Segment,
} from "semantic-ui-react";
import { NotificationsContainer } from "./page-notifications.styles";
import InfiniteScroll from "react-infinite-scroll-component";
import { getNotifications } from "../../actions/notifications";
import NotificationItem from "../item-notification/item-notification.component";

const NotificationsPage = ({ user, notificationList }) => {
  console.log(notificationList);
  const [notifications, setNotifications] = useState(notificationList || []);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  const [loading, setLoading] = useState(false);

  const fetchNotificationsOnScroll = async () => {
    try {
      const data = await getNotifications(pageNumber);

      if (data.length === 0) setHasMore(false);

      setNotifications([...notifications, ...data]);
      setPageNumber((prev) => prev + 1);
    } catch (error) {
      alert("Error fetching Posts");
    }
  };
  return (
    <NotificationsContainer>
      <Dimmer active={loading} inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={8}>
            <Segment>
              <InfiniteScroll
                hasMore={hasMore}
                next={fetchNotificationsOnScroll}
                loader={
                  <Segment>
                    <Dimmer active inverted>
                      <Loader inverted />
                    </Dimmer>
                  </Segment>
                }
                endMessage={<b>Đã xem hết thông báo</b>}
                dataLength={notifications.length}
              >
                <Item.Group divided link>
                  {notifications.map((notification, index) => {
                    return (
                      <NotificationItem
                        key={index}
                        user={user}
                        notification={notification}
                        notifications={notifications}
                        setNotifications={setNotifications}
                        setLoading={setLoading}
                      />
                    );
                  })}
                </Item.Group>
              </InfiniteScroll>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </NotificationsContainer>
  );
};

export default NotificationsPage;
