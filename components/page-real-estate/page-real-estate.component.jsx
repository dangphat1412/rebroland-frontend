import React, { useEffect, useState } from "react";
import { Dropdown, Grid, Icon, List, Loader, Segment } from "semantic-ui-react";
import { getPosts } from "../../actions/post";
import SearchBox from "../search-box/search-box.component";
import {
  CategoriesContainer,
  PaginationContainer,
  RealEstatePageContainer,
} from "./page-real-estate.styles";
import Pagination from "../pagination/pagination.component";
import RealEstateItem from "../item-real-estate/item-real-estate.component";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import options from "../../utils/RealEstateSortValue";

const RealEstatePage = ({
  user,
  postsData,
  followingPosts,
  setFollowingPosts,
  setTotalResult,
}) => {
  const [sortValue, setSortValue] = useState(0);

  const [data, setData] = useState(postsData || {});

  const handlePaginationChange = (e, { activePage }) => {
    fetchAPI(activePage-1);
  };

  const fetchAPI = async (page) => {
    const postData = await getPosts(page);
    setData(postData);
    setTotalResult(postData.totalResult);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <RealEstatePageContainer>
      <SemanticToastContainer position="bottom-right" />
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Segment
              style={{
                backgroundImage: "url('/zyro-image.png')",
                color: "white",
              }}
            >
              <SearchBox setData={setData} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            {data.length === 0 ? (
              <Segment basic>
                <Loader active inline="centered" />
              </Segment>
            ) : data.totalResult === 0 ? (
              <>Không tìm thấy kết quả phù hợp</>
            ) : (
              <>
                {data &&
                  data.posts.map((post, index) => (
                    <RealEstateItem
                      user={user}
                      post={post}
                      key={index}
                      followingPosts={followingPosts}
                      setFollowingPosts={setFollowingPosts}
                      toast={toast}
                    />
                  ))}
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
            )}
          </Grid.Column>
          <Grid.Column width={4}>
            <Dropdown fluid selection value={sortValue} options={options} />
            <CategoriesContainer>
              <h1>Danh mục Bất động sản</h1>
              <List divided verticalAlign="middle" size="large" relaxed>
                <List.Item>
                  <List.Content floated="right">100 bất động sản</List.Content>
                  <List.Content>Nhà ở</List.Content>
                </List.Item>
                <List.Item>
                  <List.Content floated="right">100 bất động sản</List.Content>
                  <List.Content>Nhà chung cư</List.Content>
                </List.Item>
                <List.Item>
                  <List.Content floated="right">100 bất động sản</List.Content>
                  <List.Content>Đất nền</List.Content>
                </List.Item>
              </List>
            </CategoriesContainer>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </RealEstatePageContainer>
  );
};

export default RealEstatePage;
