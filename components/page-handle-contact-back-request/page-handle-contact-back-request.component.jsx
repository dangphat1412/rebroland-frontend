import React from "react";
import {
  Button,
  Card,
  Feed,
  Grid,
  Icon,
  Image,
  Item,
  Label,
  Search,
  Table,
} from "semantic-ui-react";
import UserPanel from "../user-panel/user-panel.component";
import { HandleContactBackRequestContainer } from "./page-handle-contact-back-request.styles";

const HandleContactBackRequestPage = ({ user }) => {
  return (
    <HandleContactBackRequestContainer>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <UserPanel user={user} />
          </Grid.Column>
          <Grid.Column width={13}>
            <Card fluid>
              <Card.Content textAlign="center" className="header-title">
                <Card.Header>Xử lý yêu cầu liên hệ lại</Card.Header>
              </Card.Content>
              <Card.Content>
                <Card.Header textAlign="center">
                  <Search placeholder="Tìm kiếm" fluid />
                </Card.Header>
                <Card fluid>
                  <Grid columns={2} divided className="customer-item">
                    <Grid.Row>
                      <Grid.Column>
                        <Card.Content>
                          <Image
                            floated="left"
                            size="tiny"
                            src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
                          />
                          <Card.Header>Nguyễn Đăng Phát</Card.Header>
                          <Card.Meta textAlign="left">
                            <Icon name="mobile alternate" />
                            {user.phone}
                          </Card.Meta>
                          <Card.Meta textAlign="left">
                            <Icon name="mail outline" />
                            {user.email}
                          </Card.Meta>
                          <Card.Meta textAlign="left">
                            <Icon name="map marker alternate" />
                            Ngọc Nội, Trạm Lộ, Thuận Thành, Bắc Ninh
                          </Card.Meta>
                          <br />
                          <Card.Description textAlign="left">
                            <Icon name="content" />
                            Tôi đang quan tâm đến bất động sản này, bạn có thể
                            tư vấn giúp tôi không. Tôi đang quan tâm đến bất
                            động sản này, bạn có thể tư vấn giúp tôi không.
                          </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                          <Button basic color="green">
                            Chấp nhận
                          </Button>
                          <Button basic color="red">
                            Từ chối
                          </Button>
                        </Card.Content>
                      </Grid.Column>
                      <Grid.Column>ABCD</Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Card>
                <Card fluid>
                  <Grid columns={2} divided className="customer-item">
                    <Grid.Row>
                      <Grid.Column>
                        <Card.Content>
                          <Image
                            floated="left"
                            size="tiny"
                            src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
                          />
                          <Card.Header>Nguyễn Đăng Phát</Card.Header>
                          <Card.Meta textAlign="left">
                            <Icon name="mobile alternate" />
                            {user.phone}
                          </Card.Meta>
                          <Card.Meta textAlign="left">
                            <Icon name="mail outline" />
                            {user.email}
                          </Card.Meta>
                          <Card.Meta textAlign="left">
                            <Icon name="map marker alternate" />
                            Ngọc Nội, Trạm Lộ, Thuận Thành, Bắc Ninh
                          </Card.Meta>
                          <br />
                          <Card.Description textAlign="left">
                            <Icon name="content" />
                            Tôi đang quan tâm đến bất động sản này, bạn có thể
                            tư vấn giúp tôi không. Tôi đang quan tâm đến bất
                            động sản này, bạn có thể tư vấn giúp tôi không.
                          </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                          <Button basic color="green">
                            Chấp nhận
                          </Button>
                          <Button basic color="red">
                            Từ chối
                          </Button>
                        </Card.Content>
                      </Grid.Column>
                      <Grid.Column>ABCD</Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Card>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </HandleContactBackRequestContainer>
  );
};

export default HandleContactBackRequestPage;
