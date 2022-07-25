import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Dimmer,
  Divider,
  Dropdown,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  List,
  Loader,
  Radio,
  Rating,
  Segment,
  Statistic,
  Table,
} from "semantic-ui-react";
import Map from "../map/map.component";
import {
  ActionContainer,
  ContactInformationContainer,
  FormPropertyDetailContainer,
  ShotInformationContainer,
  UserInformationContainer,
} from "./page-property-detail.styles";
import ModalItem from "../modal-item/modal-item.component";
import FormReport from "../form-report/form-report.component";
import { followPost, historyPost } from "../../actions/post";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactImageGallery from "react-image-gallery";
import Script from "next/script";
import Head from "next/head";
import convertToSlug from "../../utils/convertToSlug";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import calculatePrice from "../../utils/calculatePrice";
import FormContact from "../form-contact/form-contact.component";

const PagePropertyDetail = ({
  post,
  user,
  followingPosts,
  setFollowingPosts,
}) => {
  const router = useRouter();
  const [reportOpen, setReportOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [historyData, setHistoryData] = useState();
  const [items, setItems] = useState([]);

  const { price, pricePerSquare } = calculatePrice(post);

  useEffect(() => {
    setItems(
      post.images.map((item) => {
        return {
          original: item.image,
          thumbnail: item.image,
        };
      })
    );
  }, [post.images]);

  const showHistory = async (postId) => {
    setHistoryOpen(true);
    const data = await historyPost(postId);
    setHistoryData(data);
  };

  const createDerivativePost = (postId) => {
    router.push(`/nha-moi-gioi/tao-bai-phai-sinh/${postId}`);
  };

  const handleZaloShare = () => {
    console.log(router);
  };

  const handleFacebookShare = () => {};

  const handleFollowingPost = async (
    e,
    post,
    followingPosts,
    setFollowingPosts
  ) => {
    e.stopPropagation();
    user
      ? await followPost(post, followingPosts, setFollowingPosts)
      : setTimeout(() => {
          toast({
            type: "error",
            title: "Yêu cầu đăng nhập",
            description: <p>Đăng nhập để quan tâm bài viết</p>,
          });
        }, 1000);
  };

  const handleCopyLink = () => {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setTimeout(() => {
      toast({
        type: "success",
        title: "Sao chép liên kết",
        description: <p>Sao chép liên kết thành công</p>,
      });
    }, 1000);
  };

  const onContactSubmit = async (data, e) => {
    console.log(data);
  };

  return (
    <FormPropertyDetailContainer>
      <Head>
        <title>{post.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:url" content={router.asPath} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        {/* <meta property="og:image" content={post.images[0].image} /> */}
      </Head>
      <SemanticToastContainer position="bottom-right" maxToasts={3} />
      {/* <div
        class="fb-share-button"
        data-href="http://localhost:3000/bat-dong-san/gia-tu-32trm2-hang-ngoai-giao-dau-tu-gia-dot-1-view-ho-i1---i2-re-nhat-dong-10-ky-hdmb-ls-0-24t-38"
        data-layout="button_count"
        data-size="small"
      ></div>
      <div
        class="zalo-share-button"
        data-href="http://localhost:3000/bat-dong-san/gia-tu-32trm2-hang-ngoai-giao-dau-tu-gia-dot-1-view-ho-i1---i2-re-nhat-dong-10-ky-hdmb-ls-0-24t-38"
        data-oaid="2599619185893858022"
        data-layout="1"
        data-color="blue"
        data-customize="false"
      ></div> */}

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
                          <Statistic.Value text>
                            {post.unitPrice.id === 3 ? "Thoả thuận" : price}
                          </Statistic.Value>
                          <Statistic.Label>
                            {post.unitPrice.id !== 3 && pricePerSquare}
                          </Statistic.Label>
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
                          <Dropdown
                            icon="share alternate"
                            floating
                            labeled
                            className="icon"
                          >
                            <Dropdown.Menu>
                              <Dropdown.Item>
                                <Image
                                  src="https://cdn.icon-icons.com/icons2/2108/PNG/512/facebook_icon_130940.png"
                                  alt="fb"
                                  size="mini"
                                />
                                Facebook
                              </Dropdown.Item>
                              <Dropdown.Item onClick={handleZaloShare}>
                                <Image
                                  src="https://cdn1.iconfinder.com/data/icons/logos-brands-in-colors/2500/zalo-seeklogo.com-512.png"
                                  alt="fb"
                                  size="mini"
                                />
                                Zalo
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={(e, data) => {
                                  handleCopyLink();
                                }}
                              >
                                <Icon name="linkify" size="large" />
                                Sao chép liên kết
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </List.Item>
                        <List.Item>
                          <Icon
                            name="warning sign"
                            onClick={() => {
                              user
                                ? setReportOpen(true)
                                : setTimeout(() => {
                                    toast({
                                      type: "error",
                                      title: "Yêu cầu đăng nhập",
                                      description: (
                                        <p>Đăng nhập để báo cáo bài viết</p>
                                      ),
                                    });
                                  }, 1000);
                            }}
                          />
                        </List.Item>
                        <List.Item>
                          <Icon
                            name="heart"
                            onClick={(e) => {
                              handleFollowingPost(
                                e,
                                post,
                                followingPosts,
                                setFollowingPosts
                              );
                            }}
                            color={
                              followingPosts &&
                              followingPosts.filter(
                                (followingPost) =>
                                  followingPost.postId === post.postId
                              ).length > 0
                                ? "red"
                                : null
                            }
                          />
                        </List.Item>
                      </ActionContainer>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Divider />
                <Header as="h2">Hình ảnh</Header>
                {post.images && (
                  <ReactImageGallery
                    items={items}
                    showIndex={true}
                    disableKeyDown={false}
                    originalHeight={200}
                    thumbnailPosition="left"
                  />
                )}
                <Header as="h2">Thông tin mô tả</Header>
                <div>
                  <pre>{post.description}</pre>
                </div>
                <Header as="h2">Đặc điểm bất động sản</Header>
                <Grid columns={3} className="property" divided="vertically">
                  <Grid.Row>
                    <PropertyItem
                      iconClass="kikor kiko-square-footage"
                      title="Diện tích"
                      description={`${post.area} m²`}
                    />
                    <Grid.Column>
                      <Item>
                        <Item.Content
                          verticalAlign="middle"
                          className="property-content"
                        >
                          <Item.Header className="property-header">
                            <span className="kikor kiko-price-real-estate"></span>
                            Mức giá
                          </Item.Header>
                          <Item.Description className="property-description">
                            {post.unitPrice.id === 1 &&
                              (post.price >= 1000000000
                                ? post.price / 1000000000 + " tỷ"
                                : post.price / 1000000 + " triệu")}
                            {post.unitPrice.id === 2 &&
                              (post.price * post.area >= 1000000000
                                ? (post.price * post.area) / 1000000000 + " tỷ"
                                : (post.price * post.area) / 1000000 +
                                  " triệu")}
                            {post.unitPrice.id === 3 && "Thoả thuận"}
                          </Item.Description>
                        </Item.Content>
                      </Item>
                    </Grid.Column>
                    {post.direction && (
                      <PropertyItem
                        iconClass="kikor kiko-resale-property"
                        title="Hướng nhà"
                        description={post.direction.name}
                      />
                    )}
                    {post.numberOfBedroom && (
                      <PropertyItem
                        iconClass="kikor kiko-bedroom"
                        title="Phòng ngủ"
                        description={post.numberOfBedroom}
                      />
                    )}
                    {post.numberOfBathroom && (
                      <PropertyItem
                        iconClass="kikor kiko-bathroom"
                        title="Phòng tắm"
                        description={post.numberOfBathroom}
                      />
                    )}
                    {post.numberOfFloor && (
                      <PropertyItem
                        iconClass="kikor kiko-stairs"
                        title="Số tầng"
                        description={post.numberOfFloor}
                      />
                    )}
                    {post.frontispiece && (
                      <PropertyItem
                        iconClass="kikor kiko-real-estate-auction"
                        title="Mặt tiền"
                        description={`${post.frontispiece} m²`}
                      />
                    )}
                  </Grid.Row>
                </Grid>

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
                <Link href={`/chi-tiet-nguoi-dung/${post.user.id}`}>
                  {post.user.fullName}
                </Link>
              </UserInformationContainer>

              <ContactInformationContainer textAlign="center">
                <Header as="h5">Thông tin liên hệ</Header>
                <Header as="h2">{post.contactName}</Header>
                <div className="information">
                  <div>
                    <Icon name="mobile alternate" />
                    {post.contactPhone}
                  </div>
                  <div>
                    <Icon name="mail outline" />
                    {post.contactEmail}
                  </div>
                  <div>
                    <Icon name="map marker alternate" />
                    {post.contactAddress}
                  </div>
                </div>
                <Button
                  fluid
                  color="blue"
                  size="big"
                  onClick={() => {
                    setContactOpen(true);
                  }}
                >
                  Yêu cầu liên hệ lại
                </Button>
              </ContactInformationContainer>

              <Button
                fluid
                size="big"
                color="teal"
                onClick={() => {
                  showHistory(post.postId);
                }}
              >
                Xem lịch sử bất động sản
              </Button>
              {user && user.currentRole === 3 && (
                <Button
                  fluid
                  size="big"
                  color="green"
                  onClick={() => {
                    createDerivativePost(post.postId);
                  }}
                >
                  Tạo bài phái sinh
                </Button>
              )}
              {post.originalPost !== null && (
                <Link
                  href={`/bat-dong-san/${convertToSlug(post.title)}-${
                    post.originalPost
                  }`}
                >
                  <Button fluid size="big" color="green">
                    Xem bài viết gốc
                  </Button>
                </Link>
              )}

              {user && post.user.id === user.id && (
                <Segment>
                  <Radio toggle label="Cho phép tạo bài phái sinh" />
                  <Header as="h3">Người môi giới đang theo dõi</Header>
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
              )}
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
        <FormReport
          toast={toast}
          setReportOpen={setReportOpen}
          postId={post.postId}
        />
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
      <ModalItem
        header="Yêu cầu liên hệ lại"
        onOpen={contactOpen}
        onClose={() => {
          setContactOpen(false);
        }}
      >
        <FormContact
          postId={post.postId}
          userId={post.user.id}
          toast={toast}
          setContactOpen={setContactOpen}
        />
      </ModalItem>

      <Script
        async
        defer
        crossOrigin="anonymous"
        src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v14.0"
        nonce="tykp7X9M"
      ></Script>
      <Script src="https://sp.zalo.me/plugins/sdk.js"></Script>
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

const PropertyItem = ({ iconClass, title, description }) => {
  return (
    <Grid.Column>
      <Item>
        <Item.Content verticalAlign="middle" className="property-content">
          <Item.Header className="property-header">
            <span className={iconClass}></span>
            {title}
          </Item.Header>
          <Item.Description className="property-description">
            {description}
          </Item.Description>
        </Item.Content>
      </Item>
    </Grid.Column>
  );
};

export default PagePropertyDetail;
