import React, { useState } from "react";
import {
  Breadcrumb,
  Button,
  Dimmer,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Loader,
  Rating,
  Segment,
  Statistic,
  Table,
} from "semantic-ui-react";
import ImageGallery from "../image-gallery/image-gallery.component";
import Map from "../map/map.component";
import {
  ActionContainer,
  ContactInformationContainer,
  FormPropertyDetailContainer,
  ShotInformationContainer,
  UserInformationContainer,
} from "./form-property-detail.styles";
import ModalItem from "../modal-item/modal-item.component";
import FormReport from "../form-report/form-report.component";
import { followPost, historyPost } from "../../actions/post";
import Link from "next/link";
import { useRouter } from "next/router";

const FormPropertyDetail = ({ post, user }) => {
  const router = useRouter();

  const [reportOpen, setReportOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyData, setHistoryData] = useState();

  const showHistory = async (postId) => {
    setHistoryOpen(true);
    const data = await historyPost(postId);
    setHistoryData(data);
  };

  const createDerivativePost = (postId) => {
    router.push(`/nha-moi-gioi/tao-bai-phai-sinh/${postId}`);
  };

  const handleFollowProperty = (e, postId) => {
    e.stopPropagation();
    followPost(postId) ? console.log("done") : console.log("fail");
  };

  return (
    <FormPropertyDetailContainer>
      <Form size="large">
        <Grid columns="equal" padded>
          <Grid.Row>
            <Grid.Column width={12}>
              <Segment>
                <Header as="h1">{post.title}</Header>

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
                            {post.propertyType.name}
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
                          <Icon
                            name="warning sign"
                            onClick={() => {
                              setOpen(true);
                            }}
                          />
                        </List.Item>
                        <List.Item>
                          <Icon
                            name="heart"
                            onClick={(e) => {
                              handleFollowProperty(e, post.postId);
                            }}
                          />
                        </List.Item>
                      </ActionContainer>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <Divider />

                <Header as="h2">Thông tin mô tả</Header>
                <div>
                  <pre>{post.description}</pre>
                </div>
                <Header as="h2">Đặc điểm bất động sản</Header>
                <p>Đặc điểm bds</p>
                <Header as="h2">Hình ảnh</Header>
                {post.images && <ImageGallery images={post.images} />}

                <Header as="h2">Xem trên bản đồ</Header>
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
                <Link href={`/${post.user.id}`}>{post.user.fullName}</Link>
              </UserInformationContainer>

              <ContactInformationContainer textAlign="center">
                <p>Thông tin liên hệ</p>
                <Header as="h2">{post.contactName}</Header>
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

              <Button
                fluid
                size="large"
                color="teal"
                onClick={() => {
                  showHistory(post.postId);
                }}
              >
                Xem lịch sử bất động sản
              </Button>
              {user.currentRole === 3 && (
                <Button
                  fluid
                  size="large"
                  color="green"
                  onClick={() => {
                    createDerivativePost(post.postId);
                  }}
                >
                  Tạo bài phái sinh
                </Button>
              )}

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
      <ModalItem
        header="Báo cáo tin đăng không chính xác"
        onOpen={reportOpen}
        onClose={() => {
          setReportOpen(false);
        }}
      >
        <FormReport />
      </ModalItem>
      <ModalItem
        header="Lịch sử bất động sản"
        size="tiny"
        onOpen={historyOpen}
        onClose={() => {
          setHistoryOpen(false);
        }}
      >
        <FormHistory historyData={historyData} />
      </ModalItem>
    </FormPropertyDetailContainer>
  );
};

const FormHistory = ({ historyData }) => {
  return (
    <>
      {historyData ? (
        <>
          <Grid>
            <Grid.Row>
              <Grid.Column width={5}>
                <Header as="h5">Mã vạch</Header>
              </Grid.Column>
              <Grid.Column width={5}>
                {Object.values(historyData)[0][0].barcode}
              </Grid.Column>
            </Grid.Row>
            {Object.values(historyData)[0][0].plotNumber && (
              <Grid.Row>
                <Grid.Column width={5}>
                  <Header as="h5">Số thửa</Header>
                </Grid.Column>
                <Grid.Column width={5}>
                  {Object.values(historyData)[0][0].plotNumber}
                </Grid.Column>
              </Grid.Row>
            )}
            {Object.values(historyData)[0][0].buildingName && (
              <Grid.Row>
                <Grid.Column width={5}>
                  <Header as="h5">Tên toà nhà</Header>
                </Grid.Column>
                <Grid.Column width={5}>
                  {Object.values(historyData)[0][0].buildingName}
                </Grid.Column>
              </Grid.Row>
            )}
          </Grid>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Số thứ tự</Table.HeaderCell>
                <Table.HeaderCell>Họ và tên chủ hộ</Table.HeaderCell>
                <Table.HeaderCell>Số điện thoại</Table.HeaderCell>
                <Table.HeaderCell>Sở hữu từ</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            {}

            <Table.Body>
              {Object.values(historyData)[0].map((d, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{d.owner}</Table.Cell>
                    <Table.Cell>{d.phone}</Table.Cell>
                    <Table.Cell>{d.startDate}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </>
      ) : (
        <>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        </>
      )}
    </>
  );
};

export default FormPropertyDetail;
