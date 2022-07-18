import React from "react";
import {
  Button,
  Card,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Segment,
  Tab,
} from "semantic-ui-react";
import FormContactBroker from "../form-contact-broker/form-contact-broker.component";
import SearchBoxBroker from "../search-box-broker/search-box-broker.component";
import { DetailBrokerContainer } from "./page-detail-broker.styles";

const DetailBrokerPage = () => {
  return (
    <DetailBrokerContainer>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Segment
              style={{
                backgroundImage: "url('/zyro-image.png')",
                color: "white",
              }}
            >
              <SearchBoxBroker />
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>
              <Item.Group>
                <Item>
                  <Item.Image
                    size="small"
                    src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
                  />
                  <Item.Content>
                    <Item.Header>Nguyễn Đăng Phát</Item.Header>
                    <Item.Description>
                      <Icon name="mobile alternate" />
                      0917768923
                    </Item.Description>
                    <Item.Description>
                      <Icon name="mail outline" />
                      phatnguyen1412@gmail.com
                    </Item.Description>
                    <Item.Description>
                      <Icon name="map marker alternate" />
                      <span>Ngọc Nội, Trạm Lộ, Thuận Thành, Bắc Ninh</span>
                    </Item.Description>
                    <Item.Description className="social-media-list">
                      <a
                        href="https://www.facebook.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Image
                          src="https://cdn.icon-icons.com/icons2/2108/PNG/512/facebook_icon_130940.png"
                          alt="fb"
                          size="mini"
                        />
                      </a>
                      <a
                        href="https://www.facebook.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Image
                          src="https://cdn1.iconfinder.com/data/icons/logos-brands-in-colors/2500/zalo-seeklogo.com-512.png"
                          alt="fb"
                          size="mini"
                        />
                      </a>
                    </Item.Description>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Segment>
            <Segment>
              <Header as="h2">Thông tin về tôi</Header>
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
              {/* <div>
                <pre>{post.description}</pre>
              </div> */}
            </Segment>
            <Header as="h2">Danh sách bất động sản</Header>
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
          </Grid.Column>
          <Grid.Column width={4}>
            <Segment>
              <FormContactBroker />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </DetailBrokerContainer>
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

export default DetailBrokerPage;
