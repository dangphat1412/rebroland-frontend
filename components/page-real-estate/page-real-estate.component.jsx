import React, { useEffect, useState } from "react";
import { Grid, Icon, List, Loader, Segment } from "semantic-ui-react";
import { getPosts } from "../../actions/post";
import SearchBox from "../search-box/search-box.component";
import {
  CategoriesContainer,
  PaginationContainer,
  RealEstatePageContainer,
} from "./page-real-estate.styles";
import PaginationItem from "../pagination-item/pagination-item.component";
import RealEstateItem from "../item-real-estate/item-real-estate.component";

const RealEstatePage = ({ postsData, followingPosts, setFollowingPosts }) => {
  const [data, setData] = useState(postsData || {});

  const handlePaginationChange = (e, { activePage }) => {
    fetchAPI(activePage);
  };

  const fetchAPI = async (page) => {
    const postData = await getPosts(page);
    setData(postData);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <RealEstatePageContainer>
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
            ) : data.posts.length === 0 ? (
              <>Không tìm thấy kết quả phù hợp</>
            ) : (
              <>
                {data &&
                  data.posts.map((post, index) => (
                    <RealEstateItem
                      post={post}
                      key={index}
                      followingPosts={followingPosts}
                      setFollowingPosts={setFollowingPosts}
                    />
                  ))}
                <PaginationContainer>
                  <PaginationItem
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
