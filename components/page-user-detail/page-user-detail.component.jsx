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
import { getOriginalPostsByUserDetail } from "../../actions/post";
import RealEstateItem from "../item-real-estate/item-real-estate.component";
import Pagination from "../pagination/pagination.component";
import {
  PaginationContainer,
  UserDetailPageContainer,
} from "./page-user-detail.styles";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import FormContact from "../form-contact/form-contact.component";
import options from "../../utils/RealEstateSortValue";
import ModalItem from "../modal-item/modal-item.component";
import ReportUserForm from "../form-report-user/form-report-user.component";
import RatingForm from "../form-rating/form-rating.component";
import {
  checkAllowRatingUser,
  getListRateByUserId,
} from "../../actions/rating";

const UserDetailPage = ({
  user,
  postsData,
  followingPosts,
  setFollowingPosts,
  setLoginOpen,
  setRegisterOpen,
  allowRate,
  setTotalResult,
}) => {
  const [data, setData] = useState(postsData.lists || {});
  const [userDetail, setUserDetail] = useState(postsData.user || {});
  const [loading, setLoading] = useState(false);
  const [propertyType, setPropertyType] = useState(0);
  const [sortValue, setSortValue] = useState(0);
  const [reportOpen, setReportOpen] = useState(false);
  const [openRating, setOpenRating] = useState(false);
  const [rating, setRating] = useState(postsData.user.avgRate);
  const [listRate, setListRate] = useState({});
  const [rateLoading, setRateLoading] = useState(false);
  const [hiddenPhone, setHiddenPhone] = useState(true);

  useEffect(() => {
    fetchRateListAPI(0);
  }, []);

  useEffect(() => {
    allowRate === "false" && setOpenRating(true);
  }, []);

  const handleShowPhone = () => {
    setHiddenPhone(!hiddenPhone);
  };

  const fetchRateListAPI = async (pageNo) => {
    setRateLoading(true);
    const listRateData = await getListRateByUserId(postsData.user.id, pageNo);
    setListRate(listRateData);
    setRateLoading(false);
  };

  const handleRatePaginationChange = (e, { activePage }) =>
    fetchRateListAPI(activePage - 1);

  const handlePaginationChange = (e, { activePage }) =>
    fetchAPI(userDetail.id, propertyType, sortValue, activePage - 1);

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
    const posts = await getOriginalPostsByUserDetail(
      userId,
      propertyType,
      sortValue,
      pageNo
    );
    setData(posts.lists);
    setTotalResult(posts.lists.totalResult);
    setUserDetail(posts.user);
    setLoading(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <UserDetailPageContainer>
      <SemanticToastContainer position="bottom-right" maxToasts={3} />
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <Card fluid>
              <Card.Content textAlign="center" className="title-content">
                <Card.Header className="custom-header">
                  Thông tin cá nhân
                </Card.Header>
              </Card.Content>
              <Card.Content textAlign="center" className="user-information">
                <Image
                  src={
                    userDetail.avatar ||
                    "https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
                  }
                  circular
                  alt="avatar"
                  verticalAlign="middle"
                />
                <Card.Header>{userDetail.fullName}</Card.Header>
                <Card.Description>
                  <b style={{ marginRight: "5px" }}>{rating}</b>
                  <Rating
                    icon="star"
                    rating={rating.toFixed()}
                    maxRating={5}
                    disabled
                  />
                  {user && (
                    <a
                      className="vote"
                      onClick={async () => {
                        const status = await checkAllowRatingUser(
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
                                Bạn đã đánh giá người này trong vòng 7 ngày gần
                                đây
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
                <Card.Description textAlign="left">
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
                </Card.Description>
                <Card.Description textAlign="left">
                  <Icon name="mail outline" />
                  {userDetail.email ? userDetail.email : "Đang cập nhật"}
                </Card.Description>
                <Card.Description textAlign="left">
                  <Icon name="map marker alternate" />
                  {userDetail.ward ? userDetail.ward + ", " : null}
                  {userDetail.district ? userDetail.district + ", " : null}
                  {userDetail.province ? userDetail.province : null}
                  {!userDetail.province &&
                    !userDetail.district &&
                    !userDetail.ward &&
                    "Đang cập nhật"}
                </Card.Description>
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
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setReportOpen(true);
                    }}
                    color="orange"
                    name="warning sign"
                    size="large"
                    className="report-icon"
                  />
                )}
              </Card.Content>
            </Card>
            <Segment>
              <Header as="h2">Thông tin mô tả</Header>
              {userDetail.description
                ? userDetail.description
                : "Đang cập nhật"}
            </Segment>
          </Grid.Column>
          <Grid.Column width={9} className="user-detail">
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
            <Comment.Group>
              {/* <Dimmer active={rateLoading} inverted>
                <Loader inverted content="Đang tải" />
              </Dimmer> */}
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
                      src={rate.user.avatar}
                    />
                    <Comment.Content>
                      <Comment.Author as="a">
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
                roleId={2}
                toast={toast}
                currentUser={user}
                title="Liên hệ với chủ sở hữu"
                userId={userDetail.id}
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
          type="user"
          toast={toast}
          setOpenRating={setOpenRating}
          allowRate={allowRate}
          ratedUser={postsData.user}
          setRating={setRating}
          rating={rating}
          fetchRateListAPI={fetchRateListAPI}
        />
      </ModalItem>
    </UserDetailPageContainer>
  );
};

const ListProperty = ({
  user,
  data,
  followingPosts,
  setFollowingPosts,
  handlePaginationChange,
  toast,
}) => {
  return (
    <>
      {data.posts.length > 0 ? (
        <>
          <Card.Group itemsPerRow={3}>
            {data &&
              data.posts.map((post, index) => (
                <RealEstateItem
                  user={user}
                  post={post}
                  key={index}
                  followingPosts={followingPosts}
                  setFollowingPosts={setFollowingPosts}
                  toast={toast}
                  type="card"
                />
              ))}
          </Card.Group>
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
        </>
      ) : (
        <Header>Không có bất động sản nào</Header>
      )}
    </>
  );
};

export default UserDetailPage;
