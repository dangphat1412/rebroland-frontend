import React, { useState } from "react";
import { Dimmer, Dropdown, Grid, Icon, Loader, Tab } from "semantic-ui-react";
import { getFollowingPostsByUser } from "../../actions/post";
import RealEstateItem from "../item-real-estate/item-real-estate.component";
import Pagination from "../pagination/pagination.component";
import UserPanel from "../user-panel/user-panel.component";
import options from "../../utils/RealEstateSortValue";
import {
  MyFollowingPropertiesContainer,
  PaginationContainer,
} from "./page-my-following-properties.styles";

const MyFollowingPropertiesPage = ({
  user,
  postsData,
  followingPosts,
  setFollowingPosts,
  setTotalResult,
}) => {
  const [data, setData] = useState(postsData || {});
  const [loading, setLoading] = useState(false);
  const [propertyType, setPropertyType] = useState(0);
  const [sortValue, setSortValue] = useState(0);

  const handlePaginationChange = (e, { activePage }) =>
    fetchAPI(propertyType, sortValue, activePage - 1);

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
    setTotalResult(posts.totalResult);
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
      {data.lists &&
        data.lists.map((post, index) => (
          <RealEstateItem
            user={user}
            post={post}
            key={index}
            followingPosts={followingPosts}
            setFollowingPosts={setFollowingPosts}
          />
        ))}
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

export default MyFollowingPropertiesPage;
