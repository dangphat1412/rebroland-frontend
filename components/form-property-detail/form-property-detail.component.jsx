import React from "react";
import {
  Breadcrumb,
  Button,
  Divider,
  Form,
  Grid,
  Icon,
  Image,
  List,
  Rating,
  Segment,
  Statistic,
} from "semantic-ui-react";
import ImageGallery from "../image-gallery/image-gallery.component";
import Map from "../map/map.component";
import {
  ActionContainer,
  ContactInformationContainer,
  FormPropertyDetailContainer,
  HeaderContainer,
  ShotInformationContainer,
  UserInformationContainer,
} from "./form-property-detail.styles";
import Link from "next/link";

const FormPropertyDetail = ({ post, user }) => {
  console.log("POST: ", post);
  console.log("USER: ", user);
  return (
    <FormPropertyDetailContainer>
      <Form size="large">
        <Grid columns="equal" padded>
          <Grid.Row>
            <Grid.Column width={12}>
              <Segment>
                <HeaderContainer as="h1">{post.title}</HeaderContainer>

                <Breadcrumb
                  icon="right angle"
                  sections={[
                    {
                      key: "province",
                      content: `${post.province}`,
                      link: true,
                    },
                    {
                      key: "district",
                      content: `${post.district}`,
                      link: true,
                    },
                    { key: "ward", content: `${post.ward}`, link: true },
                    {
                      key: "address",
                      content: `${post.address}`,
                      active: true,
                    },
                  ]}
                />

                <Divider />

                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column verticalAlign="middle">
                      <ShotInformationContainer floated="left">
                        <Statistic>
                          <Statistic.Label>Loại bất động sản</Statistic.Label>
                          <Statistic.Value text>
                            {post.propertyType && post.propertyType.name}
                          </Statistic.Value>
                        </Statistic>
                        <Statistic>
                          <Statistic.Label>Mức giá</Statistic.Label>
                          <Statistic.Value text>14 tỷ</Statistic.Value>
                        </Statistic>
                        <Statistic>
                          <Statistic.Label>Diện tích</Statistic.Label>
                          <Statistic.Value text>{post.area} m²</Statistic.Value>
                        </Statistic>
                      </ShotInformationContainer>
                    </Grid.Column>
                    <Grid.Column verticalAlign="middle">
                      <ActionContainer
                        horizontal
                        relaxed
                        size="massive"
                        floated="right"
                        selection
                      >
                        <List.Item>
                          <Icon name="share alternate" />
                        </List.Item>
                        <List.Item>
                          <Icon name="warning sign" />
                        </List.Item>
                        <List.Item>
                          <Icon name="heart" />
                        </List.Item>
                      </ActionContainer>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <Divider />

                <HeaderContainer as="h2">Thông tin mô tả</HeaderContainer>
                <pre style={{ fontFamily: "Tahoma" }}>{post.description}</pre>
                <HeaderContainer as="h2">Đặc điểm bất động sản</HeaderContainer>
                <p>Đặc điểm bds</p>
                <HeaderContainer as="h2">Hình ảnh</HeaderContainer>
                {post.images && <ImageGallery images={post.images} />}

                <HeaderContainer as="h2">Xem trên bản đồ</HeaderContainer>
                {post.coordinates && (
                  <Map
                    position={post.coordinates.map((coordinate) => {
                      return {
                        lat: coordinate.latitude,
                        lng: coordinate.longitude,
                      };
                    })}
                  />
                )}
              </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <UserInformationContainer textAlign="center">
                <Image
                  src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
                  size="tiny"
                  circular
                  alt="avatar"
                  verticalAlign="middle"
                />
                <p className="prefix-user">Được đăng bởi</p>
                <Link href="/">{user.fullName}</Link>
              </UserInformationContainer>

              <ContactInformationContainer textAlign="center">
                <p>Thông tin liên hệ</p>
                <h2>{post.contactName}</h2>
                {post.contactAddress && (
                  <div>
                    <Icon name="map marker alternate" />
                    {post.contactAddress}
                  </div>
                )}
                <Button fluid color="blue" size="large">
                  <Icon name="phone" />
                  <span>0917768923</span>
                </Button>
                <br />
                <Button fluid color="blue" size="large">
                  <Icon name="mail" />
                  <span>phatnguyen1412@gmail.com</span>
                </Button>
                <br />
                <Button fluid color="blue" size="large">
                  Yêu cầu liên hệ lại
                </Button>
              </ContactInformationContainer>

              <Segment textAlign="left">
                <h3>Người môi giới đang theo dõi</h3>
                <List relaxed>
                  <List.Item>
                    <List.Content floated="right">
                      <Button primary>Xem bài phái sinh</Button>
                    </List.Content>
                    <Image
                      avatar
                      src="https://react.semantic-ui.com/images/avatar/small/rachel.png"
                      alt="avatar"
                    />
                    <List.Content>
                      <List.Header as="a">Nguyễn Văn A</List.Header>
                      <List.Description>
                        <Rating
                          icon="star"
                          defaultRating={4}
                          maxRating={5}
                          disabled
                        />
                      </List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content floated="right">
                      <Button primary>Xem bài phái sinh</Button>
                    </List.Content>
                    <Image
                      avatar
                      src="https://react.semantic-ui.com/images/avatar/small/rachel.png"
                      alt="avatar"
                    />
                    <List.Content>
                      <List.Header as="a">Nguyễn Văn A</List.Header>
                      <List.Description>
                        <Rating
                          icon="star"
                          defaultRating={5}
                          maxRating={5}
                          disabled
                        />
                      </List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content floated="right">
                      <Button primary>Xem bài phái sinh</Button>
                    </List.Content>
                    <Image
                      avatar
                      src="https://react.semantic-ui.com/images/avatar/small/rachel.png"
                      alt="avatar"
                    />
                    <List.Content>
                      <List.Header as="a">Nguyễn Văn A</List.Header>
                      <List.Description>
                        <Rating
                          icon="star"
                          defaultRating={3}
                          maxRating={5}
                          disabled
                        />
                      </List.Description>
                    </List.Content>
                  </List.Item>
                </List>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </FormPropertyDetailContainer>
  );
};

export default FormPropertyDetail;
