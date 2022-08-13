import React, { useEffect, useRef, useState } from "react";
import {
  Breadcrumb,
  Button,
  Checkbox,
  Dimmer,
  Divider,
  Dropdown,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Label,
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
import {
  finishTransaction,
  followPost,
  historyPost,
  switchAllowCreateDerivative,
} from "../../actions/post";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactImageGallery from "react-image-gallery";
import Script from "next/script";
import Head from "next/head";
import convertToSlug from "../../utils/convertToSlug";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import calculatePrice from "../../utils/calculatePrice";
import FormContact from "../form-contact/form-contact.component";
import HOST_URL from "../../utils/hostUrl";
import Barcode from "react-hooks-barcode";
import InputField from "../input-field/input-field.component";
import { useForm } from "react-hook-form";

const PagePropertyDetail = ({
  post,
  user,
  brokers,
  followingPosts,
  setFollowingPosts,
  setLoginOpen,
  setRegisterOpen,
}) => {
  console.log(
    post.coordinates.sort(function (a, b) {
      return a.id - b.id;
    })
  );
  const router = useRouter();

  const [reportOpen, setReportOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [endTransactionOpen, setEndTransactionOpen] = useState(false);
  const [historyData, setHistoryData] = useState();
  const [allowCreateDerivative, setAllowCreateDerivative] = useState(
    post.allowDerivative
  );
  const [openRate, setOpenRate] = useState(false);

  const { price, pricePerSquare } = calculatePrice(post);

  const [items, setItems] = useState([]);

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
    }, 100);
  };

  const handleChangeAllowCreateDerivative = async (postId) => {
    const status = await switchAllowCreateDerivative(postId);
    if (status === 200) {
      setAllowCreateDerivative(!allowCreateDerivative);
    }
  };

  const handleAddressSearch = (e, data) => {
    let params;
    if (data.content === "province") {
      params = { province: post.province };
    }
    if (data.content === "district") {
      params = { province: post.province, district: post.district };
    }
    if (data.content === "ward") {
      params = {
        province: post.province,
        district: post.district,
        ward: post.ward,
      };
    }

    if (user && user.currentRole === 3) {
      router.push(
        {
          pathname: "/nha-moi-gioi/bat-dong-san",
          query: { data: JSON.stringify(params) },
        },
        "/nha-moi-gioi/bat-dong-san",
        { scroll: true }
      );
    } else {
      router.push(
        {
          pathname: "/bat-dong-san",
          query: { data: JSON.stringify(params) },
        },
        "/bat-dong-san",
        { scroll: true }
      );
    }
  };

  return (
    <FormPropertyDetailContainer>
      <Head>
        <title>{post.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:url" content={`${HOST_URL}${router.asPath}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.thumbnail} />
      </Head>
      <SemanticToastContainer position="bottom-right" maxToasts={3} />

      <Form size="large">
        <Grid columns="equal" padded>
          <Grid.Row>
            <Grid.Column width={12}>
              <Segment>
                <Header as="h1">
                  {post.title}{" "}
                  {post.originalPost && (
                    <Label as="a" color="red" tag>
                      BÀI PHÁI SINH
                    </Label>
                  )}
                </Header>
                <Breadcrumb>
                  <Breadcrumb.Section
                    link
                    onClick={handleAddressSearch}
                    content="province"
                  >
                    {post.province}
                  </Breadcrumb.Section>
                  <Breadcrumb.Divider icon="right angle" />
                  <Breadcrumb.Section
                    link
                    onClick={handleAddressSearch}
                    content="district"
                  >
                    {post.district}
                  </Breadcrumb.Section>
                  <Breadcrumb.Divider icon="right angle" />
                  <Breadcrumb.Section
                    link
                    onClick={handleAddressSearch}
                    content="ward"
                  >
                    {post.ward}
                  </Breadcrumb.Section>
                  {post.address && (
                    <>
                      <Breadcrumb.Divider icon="right angle" />
                      <Breadcrumb.Section active>
                        {post.address}
                      </Breadcrumb.Section>
                    </>
                  )}
                </Breadcrumb>
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
                          <Dropdown icon="share alternate" floating>
                            <Dropdown.Menu>
                              <Dropdown.Item>
                                <a
                                  tracking-id="share-ldp"
                                  tracking-label="type=facebook"
                                  className="re__list-standard-1line-no-underline--md"
                                  id="facebook"
                                  target="_blank"
                                  rel="noreferrer"
                                  href={`https://www.facebook.com/sharer/sharer.php?u=${HOST_URL}${router.asPath}`}
                                >
                                  <Image
                                    src="https://cdn.icon-icons.com/icons2/2108/PNG/512/facebook_icon_130940.png"
                                    alt="facebook"
                                    size="mini"
                                  />
                                  <span>Facebook</span>
                                </a>
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <a
                                  tracking-id="share-ldp"
                                  tracking-label="type=zalo"
                                  className="zalo-share-button"
                                  data-script="https://sp.zalo.me/plugins/sdk.js"
                                  data-href={`${HOST_URL}${router.asPath}`}
                                  data-oaid="2599619185893858022"
                                  data-layout="2"
                                  data-color="blue"
                                  data-customize="true"
                                >
                                  <Image
                                    src="https://cdn1.iconfinder.com/data/icons/logos-brands-in-colors/2500/zalo-seeklogo.com-512.png"
                                    alt="zalo"
                                    size="mini"
                                  />
                                  <span>Zalo</span>
                                </a>
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
                        {user && user.id !== post.user.id && (
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
                        )}
                        {user && user.id !== post.user.id && (
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
                        )}
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
                    originalWidth={200}
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
                    position={post.coordinates
                      .sort(function (a, b) {
                        return a.id - b.id;
                      })
                      .map((coordinate) => {
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
                  src={
                    post.user.avatar ||
                    "https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
                  }
                  style={{
                    height: "150px",
                    width: "150px",
                    objectFit: "cover",
                  }}
                  avatar
                  alt="avatar"
                  verticalAlign="middle"
                />
                <p className="prefix-user">Được đăng bởi</p>
                {user ? (
                  post.user.id === user.id ? (
                    <Link href={`/trang-ca-nhan/bat-dong-san-cua-toi`}>
                      {post.user.fullName}
                    </Link>
                  ) : post.user.broker === true ? (
                    <Link href={`/danh-sach-nha-moi-gioi/${post.user.id}`}>
                      {post.user.fullName}
                    </Link>
                  ) : (
                    <Link href={`/chi-tiet-nguoi-dung/${post.user.id}`}>
                      {post.user.fullName}
                    </Link>
                  )
                ) : post.user.broker === true ? (
                  <Link href={`/danh-sach-nha-moi-gioi/${post.user.id}`}>
                    {post.user.fullName}
                  </Link>
                ) : (
                  <Link href={`/chi-tiet-nguoi-dung/${post.user.id}`}>
                    {post.user.fullName}
                  </Link>
                )}
              </UserInformationContainer>

              <ContactInformationContainer textAlign="center">
                <Header as="h5">Thông tin liên hệ</Header>
                <Header as="h2">{post.contactName}</Header>
                <div className="information">
                  <div>
                    <Icon name="mobile alternate" />
                    {post.contactPhone}
                  </div>
                  {post.contactEmail && (
                    <div>
                      <Icon name="mail outline" />
                      {post.contactEmail}
                    </div>
                  )}
                  {post.contactAddress && (
                    <div>
                      <Icon name="map marker alternate" />
                      {post.contactAddress}
                    </div>
                  )}
                </div>
                {(!user || (user && user.id !== post.user.id)) && (
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
                )}
              </ContactInformationContainer>

              {user && user.id === post.user.id && post.status.id !== 3 && (
                <Button
                  fluid
                  size="big"
                  color="red"
                  onClick={() => {
                    setEndTransactionOpen(true);
                  }}
                >
                  Kết thúc giao dịch
                </Button>
              )}

              {post.status.id === 3 && (
                <Button
                  basic
                  color="green"
                  fluid
                  size="big"
                  onClick={() => {
                    setOpenRate(true);
                  }}
                >
                  <Icon name="check circle" color="green" /> Kết thúc giao dịch
                </Button>
              )}

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
              {user &&
                user.id !== post.user.id &&
                user.currentRole === 3 &&
                post.originalPost === null && (
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

              {user && post.user.id === user.id && post.originalPost === null && (
                <Segment>
                  {post.status.id === 1 && (
                    <Radio
                      toggle
                      label={
                        allowCreateDerivative
                          ? "Cho phép tạo bài phái sinh"
                          : "Không cho phép tạo bài phái sinh"
                      }
                      onChange={(e) => {
                        handleChangeAllowCreateDerivative(post.postId);
                      }}
                      checked={allowCreateDerivative}
                    />
                  )}
                  {brokers && brokers.length > 0 && (
                    <>
                      <Header as="h3">Người môi giới đang theo dõi</Header>
                      <List relaxed>
                        {brokers.map((broker, index) => {
                          return (
                            <List.Item key={index}>
                              <List.Content floated="right">
                                <Button
                                  primary
                                  className="btn-view-derivative"
                                  onClick={() => {
                                    router.push(
                                      `/bat-dong-san/${broker.postId}`
                                    );
                                  }}
                                >
                                  Xem bài phái sinh
                                </Button>
                              </List.Content>
                              <Image
                                avatar
                                src={
                                  broker.user.avatar ||
                                  "https://react.semantic-ui.com/images/avatar/small/rachel.png"
                                }
                                alt="avatar"
                              />
                              <List.Content>
                                <List.Header as="a">
                                  {broker.user.fullName}
                                </List.Header>
                                <List.Description>
                                  <Rating
                                    icon="star"
                                    defaultRating={broker.user.avgRate}
                                    maxRating={5}
                                    disabled
                                  />
                                </List.Description>
                              </List.Content>
                            </List.Item>
                          );
                        })}
                      </List>
                    </>
                  )}
                </Segment>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
      <ModalItem
        header="Báo cáo tin đăng"
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
        size="small"
        onOpen={historyOpen}
        onClose={() => {
          setHistoryOpen(false);
        }}
      >
        <FormHistory post={post} historyData={historyData} />
      </ModalItem>
      <ModalItem
        header="Yêu cầu liên hệ lại"
        onOpen={contactOpen}
        onClose={() => {
          setContactOpen(false);
        }}
      >
        <FormContact
          currentUser={user}
          postId={post.postId}
          userId={post.user.id}
          toast={toast}
          setContactOpen={setContactOpen}
          setLoginOpen={setLoginOpen}
          setRegisterOpen={setRegisterOpen}
        />
      </ModalItem>
      <ModalItem
        header="Kết thúc giao dịch"
        size="small"
        onOpen={endTransactionOpen}
        onClose={() => {
          setEndTransactionOpen(false);
        }}
      >
        <FormEndTransaction post={post} />
      </ModalItem>
      <ModalItem
        header="Đánh giá nhà môi giới"
        size="small"
        onOpen={openRate}
        onClose={() => {
          setOpenRate(false);
        }}
      >
        <FormRateBroker brokers={brokers} />
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

const FormRateBroker = ({ brokers }) => {
  return (
    <Item.Group divided>
      {brokers &&
        brokers.length > 0 &&
        brokers.map((broker, index) => {
          return (
            <Item key={index}>
              <Item.Image
                src={
                  broker.user.avatar ||
                  "https://react.semantic-ui.com/images/avatar/large/matthew.png"
                }
              />

              <Item.Content>
                <Item.Header as="a" style={{ fontFamily: "Tahoma" }}>
                  {broker.user.fullName}{" "}
                  <span style={{ marginLeft: "20px" }}>
                    {broker.user.avgRate} <Icon name="star" color="yellow" />
                  </span>
                </Item.Header>
                <Item.Extra>
                  <Rating icon="star" maxRating={5} size="massive" />
                </Item.Extra>
                <Item.Extra>
                  <InputField
                    style={{ width: "100%" }}
                    fieldType="textarea"
                    rows={6}
                    name="description"
                    placeholder="Nhận xét về nhà môi giới này"
                    // onChange={handleChange}
                    // defaultValue={getValues("description")}
                    // error={errors.description}
                    // requiredField
                  />
                </Item.Extra>
              </Item.Content>
            </Item>
          );
        })}
    </Item.Group>
  );
};

const FormEndTransaction = ({ post }) => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearError,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      provideInfo: true,
      owner: post.owner,
      ownerPhone: post.ownerPhone,
      barcode: post.barcode,
      plotNumber: post.plotNumber,
      buildingName: post.buildingName,
      roomNumber: post.roomNumber,
    },
  });

  const handleChange = (e, { name, value }) => {
    setValue(name, value);
  };

  const onSubmit = async (data, e) => {
    const propertyTypeId = post.propertyType.id;

    if (data.provideInfo === true) {
      let error = false;
      if (data.owner === null) {
        setError("owner", {
          type: "not null",
          message: "Nhập tên chủ hộ",
        });
        error = true;
      }

      if (data.ownerPhone === null) {
        setError("ownerPhone", {
          type: "not null",
          message: "Nhập số điện thoại chủ hộ",
        });
        error = true;
      }

      if (data.barcode === null) {
        setError("barcode", {
          type: "not null",
          message: "Nhập mã vạch",
        });
        error = true;
      }
      if (data.plotNumber === null) {
        setError("plotNumber", {
          type: "not null",
          message: "Nhập số thửa",
        });
        error = true;
      }

      if (post.propertyType.id === 2) {
        if (data.buildingName === null) {
          setError("buildingName", {
            type: "not null",
            message: "Tên toà nhà không được để trống",
          });
          error = true;
        }

        if (data.roomNumber === null) {
          setError("roomNumber", {
            type: "not null",
            message: "Phòng số không được để trống",
          });
          error = true;
        }
      }
      if (error === true) return;
    }

    const status = await finishTransaction(post.postId, {
      ...data,
      propertyTypeId,
    });
  };

  return (
    <>
      <Header as="h3" style={{ fontFamily: "Tahoma" }}>
        Xác nhận kết thúc giao dịch
      </Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Checkbox
          name="provideInfo"
          label="Cung cấp thông tin bất động sản"
          onClick={(e, { name, checked }) => {
            setValue(name, checked);
          }}
          {...register("provideInfo")}
          style={{ marginBottom: "10px" }}
          defaultChecked={getValues("provideInfo")}
        />
        {watch("provideInfo") === true && (
          <>
            <Form.Group widths={2}>
              <InputField
                fluid
                label="Tên chủ hộ"
                name="owner"
                {...register("owner")}
                placeholder="Nhập tên chủ hộ"
                onChange={handleChange}
                defaultValue={post.owner}
                error={errors.owner}
                requiredField
              />

              <InputField
                label="Số điện thoại"
                name="ownerPhone"
                {...register("ownerPhone")}
                placeholder="Nhập số điện thoại"
                defaultValue={post.ownerPhone}
                onChange={handleChange}
                error={errors.ownerPhone}
                requiredField
              />
            </Form.Group>
            <Form.Group widths={2}>
              <InputField
                fluid
                label="Mã vạch"
                name="barcode"
                placeholder="Nhập mã vạch"
                {...register("barcode")}
                onChange={handleChange}
                defaultValue={post.barcode}
                error={errors.barcode}
                requiredField
              />

              <InputField
                label="Số thửa"
                name="plotNumber"
                placeholder="Nhập số thửa"
                {...register("plotNumber")}
                defaultValue={post.plotNumber}
                onChange={handleChange}
                error={errors.plotNumber}
                requiredField
              />
            </Form.Group>
            {post.propertyType.id === 2 && (
              <Form.Group widths={2}>
                <InputField
                  fluid
                  label="Tên toà nhà"
                  name="buildingName"
                  placeholder="Nhập tên toà nhà"
                  onChange={handleChange}
                  defaultValue={post.buildingName}
                  error={errors.buildingName}
                  requiredField
                  {...register("buildingName")}
                />

                <InputField
                  label="Phòng số"
                  name="roomNumber"
                  placeholder="Nhập số phòng"
                  defaultValue={post.roomNumber}
                  onChange={handleChange}
                  error={errors.roomNumber}
                  requiredField
                  {...register("roomNumber")}
                />
              </Form.Group>
            )}
          </>
        )}

        <Grid>
          <Grid.Column textAlign="center">
            <Button
              type="submit"
              style={{
                fontFamily: "Tahoma",
                background: "#ff9219",
                color: "#fff",
              }}
            >
              Kết thúc giao dịch
            </Button>
          </Grid.Column>
        </Grid>
      </Form>
    </>
  );
};

const FormHistory = ({ post, historyData }) => {
  return (
    <>
      {historyData ? (
        <>
          <Grid>
            <Grid.Row>
              <Grid.Column width={5}>
                <Header as="h5">Mã vạch:</Header>
              </Grid.Column>
              <Grid.Column width={5}>
                <Barcode value={post.barcode} {...config} />
              </Grid.Column>
            </Grid.Row>

            {post.plotNumber && (
              <Grid.Row>
                <Grid.Column width={5}>
                  <Header as="h5">Số thửa:</Header>
                </Grid.Column>
                <Grid.Column width={5}>{post.plotNumber}</Grid.Column>
              </Grid.Row>
            )}

            {post.buildingName && (
              <Grid.Row>
                <Grid.Column width={5}>
                  <Header as="h5">Tên toà nhà:</Header>
                </Grid.Column>
                <Grid.Column width={5}>{post.buildingName}</Grid.Column>
              </Grid.Row>
            )}

            {post.roomNumber && (
              <Grid.Row>
                <Grid.Column width={5}>
                  <Header as="h5">Phòng số:</Header>
                </Grid.Column>
                <Grid.Column width={5}>{post.roomNumber}</Grid.Column>
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
                <Table.HeaderCell>Mã vạch</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {Object.values(historyData)[0].map((d, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{d.owner}</Table.Cell>
                    <Table.Cell>{d.phone}</Table.Cell>
                    <Table.Cell>{d.startDate}</Table.Cell>
                    <Table.Cell>
                      <Barcode value={d.barcode} {...config} />
                    </Table.Cell>
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

const config = {
  format: "CODE128B",
  fontSize: 16,
  width: 1,
  height: 40,
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
