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

const RealEstatePage = ({
  user,
  postsData,
  followingPosts,
  setFollowingPosts,
}) => {
  const [sortValue, setSortValue] = useState(0);

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

const options = [
  {
    key: 0,
    text: "Tin mới nhất",
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

export default RealEstatePage;
