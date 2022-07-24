import React, { useState } from "react";
import {
  Card,
  Dimmer,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  Loader,
  Segment,
  Tab,
} from "semantic-ui-react";
import { getPostsByUserDetail } from "../../actions/post";
import RealEstateItem from "../item-real-estate/item-real-estate.component";
import Pagination from "../pagination/pagination.component";
import {
  PaginationContainer,
  UserDetailPageContainer,
} from "./page-user-detail.styles";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import FormContact from "../form-contact/form-contact.component";
import options from "../../utils/RealEstateSortValue";

const UserDetailPage = ({
  user,
  postsData,
  followingPosts,
  setFollowingPosts,
}) => {
  console.log(postsData.user);
  const [data, setData] = useState(postsData.lists || {});
  const [userDetail, setUserDetail] = useState(postsData.user || {});
  const [loading, setLoading] = useState(false);
  const [propertyType, setPropertyType] = useState(0);
  const [sortValue, setSortValue] = useState(0);

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
    const posts = await getPostsByUserDetail(
      userId,
      propertyType,
      sortValue,
      pageNo
    );
    setData(posts.lists);
    setUserDetail(posts.user);
    setLoading(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <UserDetailPageContainer>
      <SemanticToastContainer position="bottom-right" />
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
          </Grid.Column>
          <Grid.Column width={4}>
            <Segment>
              <FormContact
                title="Liên hệ với chủ sở hữu"
                userId={userDetail.id}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
