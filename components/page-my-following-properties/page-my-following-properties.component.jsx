import React, { useState } from "react";
import { Dimmer, Dropdown, Grid, Icon, Loader, Tab } from "semantic-ui-react";
import { getFollowingPostsByUser } from "../../actions/post";
import RealEstateItem from "../item-real-estate/item-real-estate.component";
import Pagination from "../pagination/pagination.component";
import UserPanel from "../user-panel/user-panel.component";
import {
  MyFollowingPropertiesContainer,
  PaginationContainer,
} from "./page-my-following-properties.styles";

const MyFollowingPropertiesPage = ({
  user,
  postsData,
  followingPosts,
  setFollowingPosts,
}) => {
  const [data, setData] = useState(postsData || {});
  const [loading, setLoading] = useState(false);
  const [propertyType, setPropertyType] = useState(0);
  const [sortValue, setSortValue] = useState(0);

  const handlePaginationChange = (e, { activePage }) =>
    fetchAPI(propertyType, sortValue, activePage);

  const handleOnTabChange = (e, { activeIndex }) => {
    setPropertyType(activeIndex);
    setSortValue(0);
    fetchAPI(activeIndex, 0, 0);
  };

  const handleFilterOption = (e, { value }) => {
    setSortValue(value);
    fetchAPI(propertyType, value, 0);
  };

  const fetchAPI = async (propertyType, sortValue, pageNo) => {
    setLoading(true);
    const posts = await getFollowingPostsByUser(
      propertyType,
      sortValue,
      pageNo
    );
    setData(posts);
    setLoading(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <MyFollowingPropertiesContainer>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <UserPanel user={user} />
          </Grid.Column>
          <Grid.Column width={13} className="my-following-property">
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
                      />
                    </Tab.Pane>
                  ),
                },
              ]}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </MyFollowingPropertiesContainer>
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
      {data.posts &&
        data.posts.map((post, index) => (
          <RealEstateItem
            user={user}
            post={post}
            key={index}
            followingPosts={followingPosts}
            setFollowingPosts={setFollowingPosts}
          />
        ))}
      {data.totalPage > 1 && (
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

export default MyFollowingPropertiesPage;
