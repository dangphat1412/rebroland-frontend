import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Comment,
  Dimmer,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Loader,
  Rating,
  Segment,
  Tab,
} from "semantic-ui-react";
import FormContact from "../form-contact/form-contact.component";
import RealEstateItem from "../item-real-estate/item-real-estate.component";
import SearchBoxBroker from "../search-box-broker/search-box-broker.component";
import {
  DetailBrokerContainer,
  PaginationContainer,
} from "./page-detail-broker.styles";
import Pagination from "../pagination/pagination.component";
import options from "../../utils/RealEstateSortValue";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import { getPostsByUserDetail } from "../../actions/post";
import ModalItem from "../modal-item/modal-item.component";
import ReportUserForm from "../form-report-user/form-report-user.component";
import RatingForm from "../form-rating/form-rating.component";
import {
  checkAllowRatingBroker,
  getListRateByBrokerId,
} from "../../actions/rating";
import { useRouter } from "next/router";
import Link from "next/link";

const DetailBrokerPage = ({
  user,
  postsData,
  followingPosts,
  setFollowingPosts,
  setTotalResult,
  searchParams,
  setLoginOpen,
  setRegisterOpen,
  allowRate,
}) => {
  const [userDetail, setUserDetail] = useState(postsData.user);
  const [data, setData] = useState(postsData.lists);
  const [loading, setLoading] = useState(false);
  const [propertyType, setPropertyType] = useState(0);
  const [sortValue, setSortValue] = useState(0);
  const [reportOpen, setReportOpen] = useState(false);
  const [rating, setRating] = useState(postsData.user.avgRate);
  const [listRate, setListRate] = useState({});
  const [rateLoading, setRateLoading] = useState(false);
  const [hiddenPhone, setHiddenPhone] = useState(true);

  const [openRating, setOpenRating] = useState(false);

  const router = useRouter();

  useEffect(() => {
    fetchRateListAPI(0);
  }, []);

  useEffect(() => {
    allowRate === "true" && setOpenRating(true);
  }, []);

  const fetchRateListAPI = async (pageNo) => {
    setRateLoading(true);
    const listRateData = await getListRateByBrokerId(postsData.user.id, pageNo);
    setListRate(listRateData);
    setRateLoading(false);
  };

  const handlePaginationChange = (e, { activePage }) =>
    fetchAPI(userDetail.id, propertyType, sortValue, activePage - 1);

  const handleRatePaginationChange = (e, { activePage }) =>
    fetchRateListAPI(activePage - 1);

  const handleOnTabChange = (e, { activeIndex }) => {
    setPropertyType(activeIndex);
    setSortValue(0);
    fetchAPI(userDetail.id, activeIndex, 0, 0);
  };

  const handleFilterOption = (e, { value }) => {
    setSortValue(value);
    fetchAPI(userDetail.id, propertyType, value, 0);
  };

  const fetchAPI = async (userId, propertyType, sortValue, pageNo) => {
    setLoading(true);
    const posts = await getPostsByUserDetail(
      userId,
      propertyType,
      sortValue,
      pageNo
    );
    setData(posts.lists);
    setTotalResult(posts.lists.totalResult);
    setLoading(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleShowPhone = () => {
    setHiddenPhone(!hiddenPhone);
  };

  return (
    <DetailBrokerContainer>
      <SemanticToastContainer position="bottom-right" maxToasts={1} />

      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Segment
              style={{
                backgroundImage: "url('/zyro-image.png')",
                color: "white",
              }}
            >
              <SearchBoxBroker searchParams={searchParams} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>
              <Item.Group>
                <Item>
                  <Item.Image
                    size="small"
                    src={userDetail.avatar || "/default-avatar.png"}
                    className="broker-avatar"
                  />
                  <Item.Content style={{ position: "relative" }}>
                    <Item.Header>{userDetail.fullName}</Item.Header>
                    <Card.Description>
                      <b style={{ marginRight: "5px" }}>{rating}</b>
                      <Rating
                        maxRating={5}
                        rating={rating.toFixed()}
                        icon="star"
                        size="mini"
                        disabled
                      />
                      {user && (
                        <a
                          className="vote"
                          onClick={async () => {
                            const status = await checkAllowRatingBroker(
                              postsData.user.id
                            );
                            if (status === 200) {
                              setOpenRating(true);
                            } else {
                              toast({
                                type: "error",
                                title: "Đánh giá thất bại",
                                description: (
                                  <p>
                                    Bạn đã đánh giá người này trong vòng 30 giây
                                    gần đây
                                  </p>
                                ),
                              });
                            }
                          }}
                        >
                          Đánh giá
                        </a>
                      )}
                    </Card.Description>
                    <Item.Description>
                      <Icon name="mobile alternate" />
                      <b>
                        {hiddenPhone
                          ? userDetail.phone.slice(0, -3) + "***"
                          : userDetail.phone}
                      </b>{" "}
                      <Button
                        size="mini"
                        color="teal"
                        onClick={handleShowPhone}
                        style={{ fontFamily: "Tahoma" }}
                      >
                        {hiddenPhone ? "Hiện số" : "Ẩn số"}
                      </Button>
                    </Item.Description>
                    <Item.Description>
                      <Icon name="mail outline" />
                      {userDetail.email ? userDetail.email : "Đang cập nhật"}
                    </Item.Description>
                    <Item.Description>
                      <Icon name="map marker alternate" />
                      {userDetail.ward ? userDetail.ward + ", " : null}
                      {userDetail.district ? userDetail.district + ", " : null}
                      {userDetail.province ? userDetail.province : null}
                      {!userDetail.province &&
                        !userDetail.district &&
                        !userDetail.ward &&
                        "Đang cập nhật"}
                    </Item.Description>

                    <Item.Description className="social-media-list">
                      {userDetail.facebookLink && (
                        <a
                          href={userDetail.facebookLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Image
                            src="https://cdn.icon-icons.com/icons2/2108/PNG/512/facebook_icon_130940.png"
                            alt="fb"
                            size="mini"
                          />
                        </a>
                      )}

                      {userDetail.zaloLink && (
                        <a
                          href={userDetail.zaloLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Image
                            src="https://cdn1.iconfinder.com/data/icons/logos-brands-in-colors/2500/zalo-seeklogo.com-512.png"
                            alt="fb"
                            size="mini"
                          />
                        </a>
                      )}
                    </Item.Description>
                    {user && (
                      <Icon
                        style={{
                          cursor: "pointer",
                          position: "absolute",
                          right: "0px",
                          top: "0px",
                        }}
                        onClick={() => {
                          setReportOpen(true);
                        }}
                        color="orange"
                        name="warning sign"
                        size="large"
                      />
                    )}
                  </Item.Content>
                </Item>
              </Item.Group>
            </Segment>
            <Segment>
              <Header as="h2">Thông tin mô tả về nhà môi giới</Header>
              <div>
                <pre>
                  {userDetail.description
                    ? userDetail.description
                    : "Đang cập nhật"}
                </pre>
              </div>
            </Segment>
            <div className="list-property">
              <Header as="h2">Danh sách bất động sản</Header>
              <Dropdown
                selection
                options={options}
                className="filter"
                value={sortValue}
                onChange={handleFilterOption}
              />
              <Dimmer active={loading} inverted>
                <Loader>Đang tải dữ liệu</Loader>
              </Dimmer>
              <Tab
                onTabChange={handleOnTabChange}
                menu={{ secondary: true, pointing: true }}
                panes={[
                  {
                    menuItem: "Tất cả bất động sản",
                    render: () => (
                      <Tab.Pane as="div" attached={false}>
                        <ListProperty
                          user={user}
                          data={data}
                          followingPosts={followingPosts}
                          setFollowingPosts={setFollowingPosts}
                          handlePaginationChange={handlePaginationChange}
                          toast={toast}
                        />
                      </Tab.Pane>
                    ),
                  },
                  {
                    menuItem: "Nhà ở",
                    render: () => (
                      <Tab.Pane as="div" attached={false}>
                        <ListProperty
                          user={user}
                          data={data}
                          followingPosts={followingPosts}
                          setFollowingPosts={setFollowingPosts}
                          handlePaginationChange={handlePaginationChange}
                          toast={toast}
                        />
                      </Tab.Pane>
                    ),
                  },
                  {
                    menuItem: "Chung cư",
                    render: () => (
                      <Tab.Pane as="div" attached={false}>
                        <ListProperty
                          user={user}
                          data={data}
                          followingPosts={followingPosts}
                          setFollowingPosts={setFollowingPosts}
                          handlePaginationChange={handlePaginationChange}
                          toast={toast}
                        />
                      </Tab.Pane>
                    ),
                  },
                  {
                    menuItem: "Đất nền",
                    render: () => (
                      <Tab.Pane as="div" attached={false}>
                        {" "}
                        <ListProperty
                          user={user}
                          data={data}
                          followingPosts={followingPosts}
                          setFollowingPosts={setFollowingPosts}
                          handlePaginationChange={handlePaginationChange}
                          toast={toast}
                        />
                      </Tab.Pane>
                    ),
                  },
                ]}
              />
            </div>
            <Comment.Group>
              <Header as="h3" dividing>
                Đánh giá{" "}
                <span style={{ fontSize: "13px" }}>
                  (Có {listRate.totalResult} đánh giá)
                </span>
              </Header>

              {listRate &&
                listRate.lists &&
                listRate.lists.length > 0 &&
                listRate.lists.map((rate, index) => (
                  <Comment key={index}>
                    <Comment.Avatar
                      className="rater-avatar"
                      src={rate.user.avatar || "/default-avatar.png"}
                    />
                    <Comment.Content>
                      <Comment.Author as="span">
                        {rate.user.fullName}
                      </Comment.Author>
                      <Comment.Metadata>
                        <div>{rate.startDate}</div>
                      </Comment.Metadata>
                      <Comment.Actions>
                        <Comment.Action>
                          <Rating
                            icon="star"
                            defaultRating={rate.starRate}
                            maxRating={5}
                            disabled
                          />
                        </Comment.Action>
                      </Comment.Actions>
                      <Comment.Text>{rate.description}</Comment.Text>
                    </Comment.Content>
                  </Comment>
                ))}
              {listRate.totalPages > 1 && (
                <Pagination
                  activePage={listRate.pageNo}
                  boundaryRange={1}
                  siblingRange={1}
                  ellipsisItem={{
                    content: <Icon name="ellipsis horizontal" />,
                    icon: true,
                  }}
                  totalPages={listRate.totalPages}
                  onPageChange={handleRatePaginationChange}
                  pointing
                  secondary
                />
              )}
            </Comment.Group>
          </Grid.Column>
          <Grid.Column width={4}>
            <Segment>
              <FormContact
                title="Liên lạc với nhà môi giới"
                toast={toast}
                roleId={3}
                userId={userDetail.id}
                currentUser={user}
                setLoginOpen={setLoginOpen}
                setRegisterOpen={setRegisterOpen}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <ModalItem
        header="Báo cáo người dùng"
        onOpen={reportOpen}
        onClose={() => {
          setReportOpen(false);
        }}
      >
        <ReportUserForm
          user={user}
          toast={toast}
          setReportOpen={setReportOpen}
          userId={postsData.user.id}
          setLoginOpen={setLoginOpen}
          setRegisterOpen={setRegisterOpen}
        />
      </ModalItem>
      <ModalItem
        header="Đánh giá người dùng"
        onOpen={openRating}
        onClose={() => {
          setOpenRating(false);
        }}
      >
        <RatingForm
          type="broker"
          toast={toast}
          setOpenRating={setOpenRating}
          ratedUser={postsData.user}
          allowRate={allowRate}
          rating={rating}
          fetchRateListAPI={fetchRateListAPI}
          setRating={setRating}
        />
      </ModalItem>
    </DetailBrokerContainer>
  );
};

const ListProperty = ({
  user,
  data,
  followingPosts,
  setFollowingPosts,
  handlePaginationChange,
}) => {
  return (
    <>
      <Card.Group itemsPerRow={3}>
        {data.posts && data.posts.length > 0 ? (
          data.posts.map((post, index) => (
            <RealEstateItem
              type="card"
              user={user}
              post={post}
              key={index}
              followingPosts={followingPosts}
              setFollowingPosts={setFollowingPosts}
              toast={toast}
            />
          ))
        ) : (
          <>
            <br />
            <Header as="h4" style={{ marginLeft: "15px" }}>
              Không có bất động sản nào
            </Header>
          </>
        )}
      </Card.Group>
      {data.totalPages > 1 && (
        <PaginationContainer>
          <Pagination
            activePage={data.pageNo}
            boundaryRange={1}
            siblingRange={1}
            ellipsisItem={{
              content: <Icon name="ellipsis horizontal" />,
              icon: true,
            }}
            totalPages={data.totalPages}
            onPageChange={handlePaginationChange}
          />
        </PaginationContainer>
      )}
    </>
  );
};

export default DetailBrokerPage;
