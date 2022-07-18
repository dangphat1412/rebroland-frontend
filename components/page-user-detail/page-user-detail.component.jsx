import React from "react";
import {
  Card,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
  Tab,
} from "semantic-ui-react";
import { UserDetailPageContainer } from "./page-user-detail.styles";

const UserDetailPage = () => {
  return (
    <UserDetailPageContainer>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <Card fluid>
              <Card.Content textAlign="center" className="title-content">
                <Card.Header className="custom-header">
                  Thông tin cá nhân
                </Card.Header>
              </Card.Content>
              <Card.Content textAlign="center">
                <Image
                  src={
                    "https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
                  }
                  circular
                  alt="avatar"
                  verticalAlign="middle"
                />
                <Card.Header>Nguyễn Đăng Phát</Card.Header>
                <Card.Description textAlign="left">
                  <Icon name="mobile alternate" />
                  0917768923
                </Card.Description>
                <Card.Description textAlign="left">
                  <Icon name="mail outline" />
                  phatnguyen1412@gmail.com
                </Card.Description>
                <Card.Description textAlign="left">
                  <Icon name="map marker alternate" />
                  Ngọc Nội, Trạm Lộ, Thuận Thành, Bắc Ninh
                </Card.Description>
              </Card.Content>
            </Card>
            <Segment>
              <Header as="h2">Thông tin mô tả</Header>
              <div>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Excepturi dolorem molestiae ullam mollitia odit tempore sint
                officiis delectus magnam! Aperiam optio labore sapiente itaque
                illo possimus accusamus numquam nam reiciendis.
              </div>
              <div>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Excepturi dolorem molestiae ullam mollitia odit tempore sint
                officiis delectus magnam! Aperiam optio labore sapiente itaque
                illo possimus accusamus numquam nam reiciendis.
              </div>
            </Segment>
          </Grid.Column>
          <Grid.Column width={13}>
            <Header as="h2">Danh sách bất động sản</Header>
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </UserDetailPageContainer>
  );
};

const panes = [
  {
    menuItem: "Tất cả bất động sản",
    render: () => (
      <Tab.Pane as="div" attached={false}>
        <Card.Group itemsPerRow={3}>
          <RealEstateItem />
          <RealEstateItem />
          <RealEstateItem />
          <RealEstateItem />
          <RealEstateItem />
          <RealEstateItem />
          <RealEstateItem />
          <RealEstateItem />
        </Card.Group>
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Nhà ở",
    render: () => (
      <Tab.Pane as="div" attached={false}>
        <Card.Group itemsPerRow={3}>
          <RealEstateItem />
          <RealEstateItem />
          <RealEstateItem />
        </Card.Group>
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Chung cư",
    render: () => (
      <Tab.Pane as="div" attached={false}>
        <Card.Group itemsPerRow={3}>
          <RealEstateItem />
          <RealEstateItem />
          <RealEstateItem />
          <RealEstateItem />
        </Card.Group>
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Đất nền",
    render: () => (
      <Tab.Pane as="div" attached={false}>
        {" "}
        <Card.Group itemsPerRow={3}>
          <RealEstateItem />
          <RealEstateItem />
          <RealEstateItem />
          <RealEstateItem />
          <RealEstateItem />
          <RealEstateItem />
        </Card.Group>
      </Tab.Pane>
    ),
  },
];

const RealEstateItem = () => {
  return (
    <Card>
      <Image
        src="https://thodiahanoi.com/wp-content/uploads/2021/01/ban-nha-tho-cu-nha-mat-dat-ha-noi-52.jpg"
        wrapped
        ui={false}
        alt="real estate"
      />
      <Card.Content>
        <Card.Header>Matthew</Card.Header>
        <Card.Meta>
          <span className="date">Joined in 2015</span>
        </Card.Meta>
        <Card.Description>
          Matthew is a musician living in Nashville.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="user" />
          22 Friends
        </a>
      </Card.Content>
    </Card>
  );
};

export default UserDetailPage;
