import Link from "next/link";
import React, { useState } from "react";
import {
  Card,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
  Tab,
} from "semantic-ui-react";
import { getPostsByUserDetail } from "../../actions/post";
import convertToSlug from "../../utils/convertToSlug";
import Pagination from "../pagination/pagination.component";
import {
  PaginationContainer,
  UserDetailPageContainer,
} from "./page-user-detail.styles";

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
    fetchAPI(userDetail.id, propertyType, sortValue, activePage);

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
          <Grid.Column width={13} className="user-detail">
            <Header as="h2">Danh sách bất động sản</Header>
            <Dropdown
              selection
              options={options}
              className="filter"
              value={sortValue}
              onChange={handleFilterOption}
            />
            <Tab
              onTabChange={handleOnTabChange}
              menu={{ secondary: true, pointing: true }}
              panes={[
                {
                  menuItem: "Tất cả bất động sản",
                  render: () => (
                    <Tab.Pane as="div" attached={false}>
                      <ListProperty
                        data={data}
                        handlePaginationChange={handlePaginationChange}
                      />
                    </Tab.Pane>
                  ),
                },
                {
                  menuItem: "Nhà ở",
                  render: () => (
                    <Tab.Pane as="div" attached={false}>
                      <ListProperty
                        data={data}
                        handlePaginationChange={handlePaginationChange}
                      />
                    </Tab.Pane>
                  ),
                },
                {
                  menuItem: "Chung cư",
                  render: () => (
                    <Tab.Pane as="div" attached={false}>
                      <ListProperty
                        data={data}
                        handlePaginationChange={handlePaginationChange}
                      />
                    </Tab.Pane>
                  ),
                },
                {
                  menuItem: "Đất nền",
                  render: () => (
                    <Tab.Pane as="div" attached={false}>
                      <ListProperty
                        data={data}
                        handlePaginationChange={handlePaginationChange}
                      />
                    </Tab.Pane>
                  ),
                },
              ]}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </UserDetailPageContainer>
  );
};

const ListProperty = ({ data, handlePaginationChange }) => {
  return (
    <>
      {data.posts.length > 0 ? (
        <>
          <Card.Group itemsPerRow={4}>
            {data &&
              data.posts.map((post, index) => (
                <RealEstateItem post={post} key={index} />
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

const RealEstateItem = ({ post }) => {
  return (
    <Link href={`/bat-dong-san/${convertToSlug(post.title)}-${post.postId}`}>
      <Card className="real-estate-item">
        <Image
          src={
            post.thumbnail ||
            "https://thodiahanoi.com/wp-content/uploads/2021/01/ban-nha-tho-cu-nha-mat-dat-ha-noi-52.jpg"
          }
          wrapped
          ui={false}
          alt="real estate"
        />
        <Card.Content>
          <Card.Header>{post.title}</Card.Header>
          <Card.Meta>
            <span className="date">Joined in 2015</span>
          </Card.Meta>
          <Card.Description>{post.description}</Card.Description>
        </Card.Content>
      </Card>
    </Link>
  );
};

const options = [
  {
    key: 0,
    text: "Thông thường",
    value: 0,
  },
  {
    key: 1,
    text: "Giá từ thấp đến cao",
    value: 1,
  },
  {
    key: 2,
    text: "Giá từ cao đến thấp",
    value: 2,
  },
  {
    key: 3,
    text: "Giá trên m² từ thấp đến cao",
    value: 3,
  },
  {
    key: 4,
    text: "Giá trên m² từ cao đến thấp",
    value: 4,
  },
  {
    key: 5,
    text: "Diện tích từ bé đến lớn",
    value: 5,
  },
  {
    key: 6,
    text: "Diện tích từ lớn đến bé",
    value: 6,
  },
];

export default UserDetailPage;
