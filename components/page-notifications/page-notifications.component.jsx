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

const NotificationsPage = ({ notificationList }) => {
  console.log(notificationList);
  const [notifications, setNotifications] = useState(notificationList || []);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

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
                      <Item key={index}>
                        <Item.Image
                          src="https://flyclipart.com/thumb2/excited-icons-download-free-png-and-vector-icons-unlimited-661241.png"
                          size="tiny"
                        />
                        <Item.Content>
                          {notification.type === "Contact" && (
                            <Item.Description>
                              Số điện thoại <b>{notification.phone}</b> muốn
                              liên lạc với bạn
                            </Item.Description>
                          )}
                          <Item.Extra>{notification.date} </Item.Extra>
                        </Item.Content>
                        {notification.unRead === false && (
                          <Item.Content style={{ position: "relative" }}>
                            <Label
                              style={{ position: "absolute", right: "0px" }}
                              circular
                              color="blue"
                              empty
                            />
                          </Item.Content>
                        )}
                      </Item>
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
