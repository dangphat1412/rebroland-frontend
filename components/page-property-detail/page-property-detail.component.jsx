import React, { useEffect, useRef, useState } from "react";
import {
  Breadcrumb,
  Button,
  Checkbox,
  Confirm,
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
  Message,
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
  deletepPost,
  dropPost,
  endTransactionWithInfo,
  extendPost,
  finishTransaction,
  followPost,
  getOtpEndTransaction,
  getPricePerDay,
  historyPost,
  reupPost,
  switchAllowCreateDerivative,
} from "../../actions/post";
import Link from "next/link";
import Router, { useRouter } from "next/router";
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
import { ratingListBroker } from "../../actions/rating";
import PaymentInformationForm from "../payment-information-form/payment-information-form.component";
import EditPostForm from "../form-edit-post/form-edit-post.component";
import OtpInput from "react-otp-input";
import CustomButton from "../custom-button/custom-button.component";

const PagePropertyDetail = ({
  detailPost,
  user,
  brokers,
  isAllowDerivative,
  followingPosts,
  setFollowingPosts,
  setLoginOpen,
  setRegisterOpen,
}) => {
  const router = useRouter();

  const [post, setPost] = useState(detailPost);
  const [hiddenPhone, setHiddenPhone] = useState(true);
  const [reportOpen, setReportOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [endTransactionOpen, setEndTransactionOpen] = useState(false);
  const [historyData, setHistoryData] = useState();
  const [allowCreateDerivative, setAllowCreateDerivative] = useState(
    detailPost.allowDerivative
  );
  const [openRate, setOpenRate] = useState(false);
  const { price, pricePerSquare } = calculatePrice(detailPost);
  const [items, setItems] = useState([]);

  const [openEditPost, setOpenEditPost] = useState(false);
  const [openDeletePost, setOpenDeletePost] = useState(false);
  const [openReupPost, setOpenReupPost] = useState(false);
  const [openDropPost, setOpenDropPost] = useState(false);
  const [openExtendPost, setOpenExtendPost] = useState(false);
  const [priceData, setPriceData] = useState(null);
  const [openReupDerivativePost, setOpenReupDerivativePost] = useState(false);

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await getPricePerDay();
      setPriceData(data);
    };

    fetchAPI();
  }, []);

  useEffect(() => {
    setItems(
      post.images
        .sort(function (a, b) {
          return a.id - b.id;
        })
        .map((item) => {
          return {
            original: item.image,
            thumbnail: item.image,
            srcSet: null,
            originalHeight: 500,
            thumbnailHeight: 50,
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

  const handleShowPhone = () => {
    setHiddenPhone(!hiddenPhone);
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
                {post.block === true && (
                  <Label
                    as="a"
                    color="red"
                    ribbon="right"
                    size="huge"
                    style={{
                      position: "absolute",
                      top: "50px",
                      left: "1280px",
                    }}
                  >
                    <Icon name="times circle outline" /> Bị chặn
                  </Label>
                )}
                {post.block === false && post.status.id !== 1 && (
                  <Label
                    as="a"
                    color={post.status.id === 3 ? "green" : "orange"}
                    ribbon="right"
                    size="huge"
                    style={{
                      position: "absolute",
                      top: "50px",
                      left: "1280px",
                    }}
                  >
                    {post.status.id === 3 ? (
                      <>
                        <Icon name="check circle outline" /> Xác nhận là đã bán
                      </>
                    ) : (
                      post.status.name
                    )}
                  </Label>
                )}

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
                        {user && user.id === post.user.id && (
                          <List.Item>
                            <Dropdown icon="ellipsis vertical" floating>
                              <Dropdown.Menu>
                                {post.block === false && post.status.id === 5 && (
                                  <Dropdown.Item
                                    onClick={() => {
                                      setOpenExtendPost(true);
                                    }}
                                  >
                                    <b>
                                      <Icon
                                        name="clock outline"
                                        circular
                                        inverted
                                        color="orange"
                                        style={{ marginRight: "10px" }}
                                      />
                                      Gia hạn bài viết
                                    </b>
                                  </Dropdown.Item>
                                )}

                                {post.block === false && post.status.id === 2 && (
                                  <Dropdown.Item
                                    onClick={() => {
                                      user.currentRole === 2 &&
                                        setOpenReupPost(true);
                                      user.currentRole === 3 &&
                                        setOpenReupDerivativePost(true);
                                    }}
                                  >
                                    <b>
                                      <Icon
                                        name="redo"
                                        circular
                                        inverted
                                        color="orange"
                                        style={{ marginRight: "10px" }}
                                      />
                                      Đăng lại
                                    </b>
                                  </Dropdown.Item>
                                )}

                                {post.block === false && post.status.id === 1 && (
                                  <Dropdown.Item
                                    onClick={() => {
                                      setOpenDropPost(true);
                                    }}
                                  >
                                    <b>
                                      <Icon
                                        name="hand point down"
                                        circular
                                        inverted
                                        color="orange"
                                        style={{ marginRight: "10px" }}
                                      />
                                      Hạ bài
                                    </b>
                                  </Dropdown.Item>
                                )}

                                {post.status.id !== 3 && post.block === false && (
                                  <Dropdown.Item
                                    onClick={() => {
                                      setOpenEditPost(true);
                                    }}
                                  >
                                    <b>
                                      <Icon
                                        color="green"
                                        name="edit outline"
                                        circular
                                        inverted
                                        style={{ marginRight: "10px" }}
                                      />
                                      Chỉnh sửa
                                    </b>
                                  </Dropdown.Item>
                                )}

                                <Dropdown.Item
                                  onClick={() => {
                                    setOpenDeletePost(true);
                                  }}
                                >
                                  <b>
                                    <Icon
                                      color="red"
                                      name="trash alternate"
                                      circular
                                      inverted
                                      style={{ marginRight: "10px" }}
                                    />
                                    Xoá bài viết
                                  </b>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </List.Item>
                        )}
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
                                    }, 100);
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
                {post.images && post.images.length > 0 && (
                  <>
                    <Header as="h2">Hình ảnh</Header>
                    <ReactImageGallery
                      items={items}
                      showIndex={true}
                      disableKeyDown={false}
                    />
                  </>
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
                    {post.numberOfBedroom > 0 && (
                      <PropertyItem
                        iconClass="kikor kiko-bedroom"
                        title="Phòng ngủ"
                        description={post.numberOfBedroom}
                      />
                    )}
                    {post.numberOfBathroom > 0 && (
                      <PropertyItem
                        iconClass="kikor kiko-bathroom"
                        title="Phòng tắm"
                        description={post.numberOfBathroom}
                      />
                    )}
                    {post.numberOfFloor > 0 && (
                      <PropertyItem
                        iconClass="kikor kiko-stairs"
                        title="Số tầng"
                        description={post.numberOfFloor}
                      />
                    )}
                    {post.frontispiece > 0 && (
                      <PropertyItem
                        iconClass="kikor kiko-real-estate-auction"
                        title="Mặt tiền"
                        description={`${post.frontispiece} m²`}
                      />
                    )}
                    {post.longevity && (
                      <PropertyItem
                        iconClass="kikor kiko-real-estate-auction"
                        title="Tuổi nhà"
                        description={post.longevity.name}
                      />
                    )}
                    <PropertyItem
                      iconClass="kikor kiko-apartment-ownership"
                      title="Giấy tờ"
                      description={
                        post.certification && post.certification === true
                          ? "Sổ đỏ/Sổ hồng"
                          : "Đang chờ sổ"
                      }
                    />
                  </Grid.Row>
                </Grid>
                {post.additionalDescription && (
                  <Grid.Row>
                    <div style={{ fontSize: "16px" }}>
                      <b>Mô tả bổ sung: </b> {post.additionalDescription}
                    </div>
                  </Grid.Row>
                )}

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
              <Divider />
              <ShotInformationContainer floated="left">
                <Statistic>
                  <Statistic.Label>Mã bài đăng</Statistic.Label>
                  <Statistic.Value text>{post.postId}</Statistic.Value>
                </Statistic>
                <Statistic>
                  <Statistic.Label>Ngày đăng</Statistic.Label>
                  <Statistic.Value text>{post.startDate}</Statistic.Value>
                </Statistic>
                <Statistic>
                  <Statistic.Label>Ngày hết hạn</Statistic.Label>
                  <Statistic.Value text>
                    {post.transactionEndDate}
                  </Statistic.Value>
                </Statistic>
              </ShotInformationContainer>
              <Divider />
            </Grid.Column>
            <Grid.Column width={4}>
              <UserInformationContainer textAlign="center">
                <Image
                  src={post.user.avatar || "/default-avatar.png"}
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
                {user && post.user.id === user.id && (
                  <Link href={`/trang-ca-nhan/bat-dong-san-cua-toi`}>
                    {post.user.fullName}
                  </Link>
                )}
                {user && post.user.id !== user.id && user.currentRole === 3 && (
                  <Link href={`/chi-tiet-nguoi-dung/${post.user.id}`}>
                    {post.user.fullName}
                  </Link>
                )}
                {user &&
                  post.user.id !== user.id &&
                  user.currentRole === 2 &&
                  post.user.broker === true && (
                    <Link href={`/danh-sach-nha-moi-gioi/${post.user.id}`}>
                      {post.user.fullName}
                    </Link>
                  )}
                {user &&
                  post.user.id !== user.id &&
                  user.currentRole === 2 &&
                  post.user.broker === false && (
                    <Link href={`/chi-tiet-nguoi-dung/${post.user.id}`}>
                      {post.user.fullName}
                    </Link>
                  )}
                {!user && post.user.broker === false && (
                  <Link href={`/chi-tiet-nguoi-dung/${post.user.id}`}>
                    {post.user.fullName}
                  </Link>
                )}
                {!user && post.user.broker === true && (
                  <Link href={`/danh-sach-nha-moi-gioi/${post.user.id}`}>
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
                    <b>
                      {hiddenPhone
                        ? post.contactPhone.slice(0, -3) + "***"
                        : post.contactPhone}
                    </b>{" "}
                    <Button color="teal" onClick={handleShowPhone}>
                      {hiddenPhone ? "Hiện số" : "Ẩn số"}
                    </Button>
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

              {user &&
                user.id === post.user.id &&
                post.status.id !== 3 &&
                post.originalPost === null && (
                  <Button
                    fluid
                    size="big"
                    color="red"
                    onClick={() => {
                      setEndTransactionOpen(true);
                    }}
                  >
                    Đánh dấu là đã bán
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
                post.originalPost === null &&
                post.allowDerivative === true &&
                isAllowDerivative === true && (
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
              {post.originalPost !== null &&
                user &&
                user.currentRole === 3 &&
                user.id === post.user.id && (
                  <Link
                    href={`/nha-moi-gioi/bat-dong-san/${convertToSlug(
                      post.title
                    )}-${post.originalPost}`}
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
                                  broker.user.avatar || "/default-avatar.png"
                                }
                                alt="avatar"
                              />
                              <List.Content>
                                <List.Header as="a">
                                  <Link
                                    href={`/danh-sach-nha-moi-gioi/${broker.user.id}`}
                                  >
                                    {broker.user.fullName}
                                  </Link>
                                </List.Header>
                                <List.Description>
                                  <Rating
                                    icon="star"
                                    defaultRating={broker.user.avgRate.toFixed()}
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
        header="Gia hạn bài viết"
        size="small"
        onOpen={openExtendPost}
        onClose={() => {
          setOpenExtendPost(false);
        }}
      >
        <FormReupPost user={user} priceData={priceData} detailPost={post} />
      </ModalItem>

      <ModalItem
        header="Chỉnh sửa bài viết"
        size="large"
        onOpen={openEditPost}
        onClose={() => {
          setOpenEditPost(false);
        }}
      >
        <EditPostForm user={user} editedPost={post} />
      </ModalItem>

      <Confirm
        open={openDropPost}
        header="Xác nhận hạ bài"
        content="Bạn có chắc chắn muốn hạ bài không? Nếu bạn hạ bài bạn sẽ mất những ngày còn lại"
        cancelButton="Huỷ bỏ"
        confirmButton="Xác nhận"
        onCancel={() => {
          setOpenDropPost(false);
        }}
        onConfirm={async () => {
          const status = await dropPost(post.postId);
          if (status === 201) {
            Router.reload();
          }
        }}
      />

      <Confirm
        open={openDeletePost}
        header="Xác nhận xoá bài viết"
        confirmButton="Xác nhận"
        cancelButton="Huỷ bỏ"
        content="Bạn có chắc chắn muốn xoá bài viết không?"
        onCancel={() => {
          setOpenDeletePost(false);
        }}
        onConfirm={async () => {
          const status = await deletepPost(post.postId);
          if (status === 201) {
            user &&
              user.currentRole === 2 &&
              post.user.id === user.id &&
              post.originalPost === null &&
              Router.push("/trang-ca-nhan/bat-dong-san-cua-toi");

            user &&
              user.currentRole === 3 &&
              post.user.id === user.id &&
              post.originalPost !== null &&
              Router.push("/trang-ca-nhan/bat-dong-san-phai-sinh-cua-toi");
          }
        }}
      />

      <Confirm
        open={openReupDerivativePost}
        content="Xác nhận đăng lại bài phái sinh"
        confirmButton="Xác nhận"
        cancelButton="Huỷ bỏ"
        onCancel={() => {
          setOpenReupDerivativePost(false);
        }}
        onConfirm={async () => {
          const status = await reupPost(post.postId);
          if (status === 201) {
            Router.reload();
          }
        }}
      />

      <ModalItem
        header="Đăng lại"
        size="small"
        onOpen={openReupPost}
        onClose={() => {
          setOpenReupPost(false);
        }}
      >
        <>
          <FormReupPost user={user} priceData={priceData} detailPost={post} />
        </>
      </ModalItem>

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
          roleId={post.originalPost ? 3 : 2}
          postId={post.postId}
          userId={post.user.id}
          toast={toast}
          setContactOpen={setContactOpen}
          setLoginOpen={setLoginOpen}
          setRegisterOpen={setRegisterOpen}
        />
      </ModalItem>
      <ModalItem
        header="Đánh dấu là đã bán"
        size="small"
        onOpen={endTransactionOpen}
        onClose={() => {
          setEndTransactionOpen(false);
        }}
      >
        <FormEndTransaction
          toast={toast}
          post={post}
          setPost={setPost}
          brokers={brokers}
          setEndTransactionOpen={setEndTransactionOpen}
          setOpenRate={setOpenRate}
        />
      </ModalItem>
      <ModalItem
        header="Đánh giá nhà môi giới"
        size="small"
        onOpen={openRate}
        onClose={() => {
          setOpenRate(false);
        }}
      >
        <FormRateBroker
          toast={toast}
          brokers={brokers}
          user={user}
          setOpenRate={setOpenRate}
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

const FormReupPost = ({ user, priceData, detailPost }) => {
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
      numberOfPostedDay: 7,
    },
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data, e) => {
    const status = await extendPost(detailPost.postId, data);
    if (status === 201) {
      Router.reload();
    }
  };

  return (
    <>
      {priceData && detailPost && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <PaymentInformationForm
            user={user}
            priceData={priceData}
            setValue={setValue}
            getValues={getValues}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        </Form>
      )}
    </>
  );
};

const FormRateBroker = ({ user, brokers, setOpenRate, toast }) => {
  const [listRating, setListRating] = useState(
    brokers.map((broker) => {
      return {
        userRated: broker.user.id,
        starRate: null,
        description: null,
        error: null,
      };
    })
  );

  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (e) => {
    let error = false;

    listRating.forEach((rate) => {
      if (rate.description && !rate.starRate) {
        setListRating(
          [...listRating].map((object) => {
            if (object.userRated === rate.userRated) {
              return {
                ...object,
                error: "Đánh giá nhà môi giới để nhập nhận xét",
              };
            } else return object;
          })
        );
        error = true;
      } else {
        setListRating(
          [...listRating].map((object) => {
            if (object.userRated === rate.userRated) {
              return {
                ...object,
                error: null,
              };
            } else return object;
          })
        );
      }
    });

    if (error === true) return;

    const data = { lists: listRating };
    console.log(data);
    const status = await ratingListBroker(data, setErrorMessage);
    if (status === 200) {
      setOpenRate(false);
      toast({
        type: "success",
        title: "Đánh giá nhà môi giới",
        description: "Đánh giá nhà môi giới thành công",
      });
      Router.reload();
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <List celled size="big">
        {brokers &&
          brokers.length > 0 &&
          brokers.map((broker, index) => {
            return (
              <List.Item key={index}>
                <Image
                  avatar
                  src={broker.user.avatar || "/default-avatar.png"}
                />
                <List.Content style={{ width: "600px" }}>
                  <List.Header style={{ fontFamily: "Tahoma" }}>
                    {broker.user.fullName}
                  </List.Header>
                  <b style={{ marginRight: "5px" }}>
                    {" "}
                    {broker.user.avgRate.toFixed()}
                  </b>
                  <Rating
                    maxRating={5}
                    defaultRating={broker.user.avgRate.toFixed()}
                    icon="star"
                    size="mini"
                    disabled
                  />
                  <br />
                  <br />
                  <Rating
                    icon="star"
                    maxRating={5}
                    size="massive"
                    clearable
                    onRate={(e, { rating }) => {
                      setListRating(
                        [...listRating].map((object) => {
                          if (object.userRated === broker.user.id) {
                            return {
                              ...object,
                              starRate: rating,
                            };
                          } else return object;
                        })
                      );
                    }}
                  />
                  <br />
                  <InputField
                    style={{
                      width: "100% !important",
                    }}
                    fieldType="textarea"
                    rows={3}
                    name={`description_${broker.user.id}`}
                    placeholder="Nhận xét về nhà môi giới này"
                    onChange={(e, { name, value }) => {
                      setListRating(
                        [...listRating].map((object) => {
                          if (object.userRated === broker.user.id) {
                            return {
                              ...object,
                              description: value,
                            };
                          } else return object;
                        })
                      );
                    }}
                  />
                  <b
                    style={{
                      color: "red",
                      fontSize: "12px",
                      marginTop: "-15px",
                      display: "block",
                    }}
                  >
                    {listRating[index].error}
                  </b>
                </List.Content>
              </List.Item>
            );
          })}
      </List>
      <Grid>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Button
              style={{
                fontFamily: "Tahoma",
                background: "#ff9219",
                color: "#fff",
              }}
            >
              Đánh giá
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
};

const FormEndTransaction = ({
  toast,
  post,
  setPost,
  setEndTransactionOpen,
  setOpenRate,
  brokers,
}) => {
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
      phone: post.ownerPhone,
      barcode: post.barcode,
      plotNumber: post.plotNumber,
      buildingName: post.buildingName,
      roomNumber: post.roomNumber,
    },
  });

  const [transactionData, setTransactionData] = useState(null);
  const [openOtpEndTransaction, setOpenOtpEndTransaction] = useState(false);

  const handleChange = (e, { name, value }) => {
    setValue(name, value);
  };

  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data, e) => {
    console.log(post);
    if (getValues("provideInfo") === false) {
      const status = await finishTransaction(
        post.postId,
        {
          ...data,
          typeId: post.propertyType.id,
        },
        setErrorMessage
      );
      if (status === 201) {
        setEndTransactionOpen(false);
        const p = post;
        p.status.id = 3;
        setPost(p);
        if (brokers.length > 0) {
          setOpenRate(true);
        }
      }
    } else {
      const transactionData = await getOtpEndTransaction(
        post.postId,
        {
          ...data,
          typeId: post.propertyType.id,
        },
        setErrorMessage
      );
      if (transactionData) {
        console.log(transactionData);
        setTransactionData(transactionData);
        setOpenOtpEndTransaction(true);
      }
    }
  };

  return (
    <>
      <Header as="h3" style={{ fontFamily: "Tahoma" }}>
        Xác nhận kết thúc giao dịch
      </Header>

      <Form onSubmit={handleSubmit(onSubmit)} error={errorMessage !== null}>
        <Message
          error
          list={errorMessage}
          onDismiss={() => setErrorMessage(null)}
        />
        <Form.Checkbox
          name="provideInfo"
          label={`Cung cấp thông tin bất động sản (Hoàn tiền %)`}
          onClick={(e, { name, checked }) => {
            setValue(name, checked);
          }}
          {...register("provideInfo")}
          style={{ marginBottom: "10px" }}
          defaultChecked={getValues("provideInfo")}
        />
        {getValues("provideInfo") === true && (
          <>
            <Form.Group widths={2}>
              <InputField
                fluid
                label="Tên chủ hộ"
                name="owner"
                {...register("owner", {
                  validate: {
                    checkNull: (value) =>
                      (getValues("provideInfo") === true &&
                        !value &&
                        "Nhập tên chủ hộ") ||
                      true,
                    checkValid: (value) =>
                      !/[$&+,:;=\\\\?@#|/'<>.^*()%!-1234567890]/.test(value) ||
                      "Họ và tên không hợp lệ",
                  },
                })}
                placeholder="Nhập tên chủ hộ"
                onChange={handleChange}
                onFocus={(e) => {
                  setValue("owner", getValues("owner"));
                }}
                defaultValue={post.owner}
                value={watch("owner")}
                error={errors.owner}
                requiredField
              />

              <InputField
                label="Số điện thoại"
                name="phone"
                {...register("phone", {
                  validate: {
                    checkNull: (value) =>
                      (getValues("provideInfo") === true &&
                        !value &&
                        "Số điện thoại không được để trống") ||
                      true,
                    checkValid: (value) =>
                      (getValues("provideInfo") === true &&
                        !/^(84|0[3|5|7|8|9])+([0-9]{8})$/.test(value) &&
                        "Số điện thoại là số Việt Nam và có 10 chữ số") ||
                      true,
                  },
                })}
                placeholder="Nhập số điện thoại"
                value={watch("phone")}
                defaultValue={post.phone}
                onChange={(e, { name, value }) =>
                  setValue(name, value.replace(/[^0-9]/g, ""))
                }
                onFocus={(e) => {
                  setValue("phone", getValues("phone"));
                }}
                error={errors.phone}
                requiredField
              />
            </Form.Group>
            <Form.Group widths={2}>
              <InputField
                fluid
                label="Mã vạch"
                name="barcode"
                placeholder="Nhập mã vạch"
                {...register("barcode", {
                  validate: {
                    checkNull: (value) =>
                      (getValues("provideInfo") === true &&
                        !value &&
                        "Mã vạch không được để trống") ||
                      true,
                    checkValid: (value) =>
                      (getValues("provideInfo") === true &&
                        !/^(^\d{13}$)|(^\d{15}$)$/.test(value) &&
                        "Nhập mã vạch gồm 13 hoặc 15 số") ||
                      true,
                  },
                })}
                onChange={(e, { name, value }) =>
                  setValue(name, value.replace(/[^0-9]/g, ""))
                }
                onFocus={(e) => {
                  setValue("barcode", getValues("barcode"));
                }}
                value={watch("barcode")}
                defaultValue={post.barcode}
                error={errors.barcode}
                requiredField
              />

              <InputField
                label="Số thửa"
                name="plotNumber"
                placeholder="Nhập số thửa"
                {...register("plotNumber", {
                  validate: (value) =>
                    (getValues("provideInfo") === true &&
                      !value &&
                      "Nhập số thửa") ||
                    true,
                })}
                defaultValue={post.plotNumber}
                onChange={(e, { name, value }) =>
                  setValue(name, value.replace(/[^0-9]/g, ""))
                }
                onFocus={(e) => {
                  setValue("plotNumber", getValues("plotNumber"));
                }}
                value={watch("plotNumber")}
                error={errors.plotNumber}
                maxLength={5}
                requiredField
              />
            </Form.Group>
            {post.propertyType.id === 2 && (
              <Form.Group widths={2}>
                <InputField
                  fluid
                  label="Tên toà nhà"
                  name="buildingName"
                  {...register("buildingName", {
                    validate: (value) =>
                      (getValues("provideInfo") === true &&
                        post.propertyType.id === 2 &&
                        !value &&
                        "Tên toà nhà không được để trống") ||
                      true,
                  })}
                  placeholder="Nhập tên toà nhà"
                  onChange={(e, { name, value }) => {
                    setValue(name, value);
                    console.log(value);
                  }}
                  onFocus={(e) => {
                    setValue("buildingName", getValues("buildingName"));
                  }}
                  value={watch("buildingName")}
                  defaultValue={post.buildingName}
                  error={errors.buildingName}
                  requiredField
                />

                <InputField
                  label="Phòng số"
                  name="roomNumber"
                  {...register("roomNumber", {
                    validate: (value) =>
                      (getValues("provideInfo") === true &&
                        post.propertyType.id === 2 &&
                        !value &&
                        "Số phòng không được để trống") ||
                      true,
                  })}
                  placeholder="Nhập số phòng"
                  defaultValue={post.roomNumber}
                  onChange={handleChange}
                  onFocus={(e) => {
                    setValue("roomNumber", getValues("roomNumber"));
                  }}
                  error={errors.roomNumber}
                  requiredField
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
              {watch("provideInfo") === true
                ? "Tiếp tục"
                : "Xác nhận là đã bán"}
            </Button>
          </Grid.Column>
        </Grid>
      </Form>
      <ModalItem
        header="Xác nhận mã OTP"
        size="mini"
        onOpen={openOtpEndTransaction}
        onClose={() => {
          setOpenOtpEndTransaction(false);
        }}
      >
        <OtpEndTransaction
          post={post}
          setPost={setPost}
          transactionData={transactionData}
          setOpenOtpEndTransaction={setOpenOtpEndTransaction}
          setEndTransactionOpen={setEndTransactionOpen}
          setOpenRate={setOpenRate}
          brokers={brokers}
        />
      </ModalItem>
    </>
  );
};

const FormHistory = ({ post, historyData }) => {
  return (
    <>
      {historyData ? (
        <>
          {Object.values(historyData)[0] ? (
            <>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={5}>
                    <Header as="h5" style={{ fontFamily: "Tahoma" }}>
                      Mã vạch:
                    </Header>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Barcode value={post.barcode} {...config} />
                  </Grid.Column>
                </Grid.Row>

                {post.plotNumber && (
                  <Grid.Row>
                    <Grid.Column width={5}>
                      <Header as="h5" style={{ fontFamily: "Tahoma" }}>
                        Số thửa:
                      </Header>
                    </Grid.Column>
                    <Grid.Column width={5}>{post.plotNumber}</Grid.Column>
                  </Grid.Row>
                )}

                {post.buildingName && (
                  <Grid.Row>
                    <Grid.Column width={5}>
                      <Header as="h5" style={{ fontFamily: "Tahoma" }}>
                        Tên toà nhà:
                      </Header>
                    </Grid.Column>
                    <Grid.Column width={5}>{post.buildingName}</Grid.Column>
                  </Grid.Row>
                )}

                {post.roomNumber && (
                  <Grid.Row>
                    <Grid.Column width={5}>
                      <Header as="h5" style={{ fontFamily: "Tahoma" }}>
                        Phòng số:
                      </Header>
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
                    return <ItemHistory d={d} key={index} index={index} />;
                  })}
                </Table.Body>
              </Table>
            </>
          ) : (
            <Header as="h3" style={{ fontFamily: "Tahoma" }}>
              Không ghi nhận lịch sử bất động sản nào
            </Header>
          )}
        </>
      ) : (
        <>
          <Dimmer active inverted>
            <Loader inverted>Đang tải</Loader>
          </Dimmer>
        </>
      )}
    </>
  );
};

const ItemHistory = ({ d, index }) => {
  const [hiddenPhone, setHiddenPhone] = useState(true);

  const handleShowPhone = () => {
    setHiddenPhone(!hiddenPhone);
  };

  return (
    <Table.Row>
      <Table.Cell>{index + 1}</Table.Cell>
      <Table.Cell>{d.owner}</Table.Cell>
      <Table.Cell>
        <b>{hiddenPhone ? d.phone.slice(0, -3) + "***" : d.phone}</b>{" "}
        <Button color="teal" onClick={handleShowPhone}>
          {hiddenPhone ? "Hiện số" : "Ẩn số"}
        </Button>
      </Table.Cell>
      <Table.Cell>{d.startDate}</Table.Cell>
      <Table.Cell>
        <Barcode value={d.barcode} {...config} />
      </Table.Cell>
    </Table.Row>
  );
};

const OtpEndTransaction = ({
  post,
  setPost,
  transactionData,
  setOpenOtpEndTransaction,
  setOpenRate,
  brokers,
  setEndTransactionOpen,
}) => {
  const [transaction, setTransaction] = useState(transactionData.historyData);
  const [counter, setCounter] = useState(transactionData.tokenTime * 60);
  const [remainTime, setRemainTime] = useState(transactionData.remainTime);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPhone, setShowPhone] = useState(
    transactionData.historyData.phone.replace(/^(\d{3})\d{4}(\d+)/, "$1****$2")
  );

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const handleChange = (value) => {
    setTransaction((prev) => ({ ...prev, token: value }));
  };

  const handleResentOtp = async () => {
    const data = await getOtpEndTransaction(
      post.postId,
      transaction,
      setErrorMessage
    );
    console.log(data);
    if (data) {
      setTransaction(data.transferData);
      setCounter(data.tokenTime * 60);
      setTransaction((prev) => ({ ...prev, token: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const status = await endTransactionWithInfo(
      post.postId,
      transaction,
      setTransaction,
      setErrorMessage,
      remainTime,
      setRemainTime
    );
    if (status === 201) {
      setOpenOtpEndTransaction(false);
      setEndTransactionOpen(false);
      const p = post;
      p.status.id = 3;
      setPost(p);
      if (brokers.length > 0) {
        setOpenRate(true);
      }
    }
  };

  return (
    <div>
      {remainTime && remainTime > 0 ? (
        <Form onSubmit={handleSubmit} error={errorMessage !== null}>
          <Message
            error
            content={errorMessage}
            onDismiss={() => setErrorMessage(null)}
          />
          <Form.Field>
            <label>Nhập mã OTP được gửi về số điện thoại {showPhone}</label>
            <OtpInput
              value={transaction.token}
              onChange={handleChange}
              numInputs={6}
              isInputNum={true}
              separator={<span>&nbsp;</span>}
              containerStyle={{ justifyContent: "center" }}
              inputStyle={{ width: "3em", height: "3.5em", fontSize: "1.2em" }}
            />
          </Form.Field>
          <Grid>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Button
                  type="submit"
                  disabled={!transaction.token || transaction.token.length < 6}
                  style={{
                    color: "#fff",
                    background: "#ff9219",
                    fontFamily: "Tahoma",
                  }}
                >
                  Xác nhận
                </Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign="center">
                Số lần nhập còn lại:{" "}
                <span style={{ color: "#ff9219" }}>{remainTime}</span>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign="center">
                {counter > 0 ? (
                  <>
                    Gửi lại mã OTP trong{" "}
                    <span style={{ color: "#ff9219" }}>
                      {counter / 60 >= 10 ? "" : "0"}
                      {Math.floor(counter / 60)}:{counter % 60 >= 10 ? "" : "0"}
                      {counter % 60}
                    </span>
                  </>
                ) : (
                  <div
                    style={{
                      color: "#ff9219",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                    onClick={handleResentOtp}
                  >
                    {" "}
                    Gửi lại mã OTP{" "}
                  </div>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      ) : (
        <>
          <Header as="h3" style={{ fontFamily: "Tahoma" }}>
            Bạn đã nhập quá số lần quy định.
            <br /> Hãy thử lại sau.
          </Header>
          <Grid>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <CustomButton
                  type="button"
                  onClick={() => {
                    setOpenOtpEndTransaction(false);
                  }}
                >
                  Đóng
                </CustomButton>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </>
      )}
    </div>
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
