import React, { useEffect, useState } from "react";
import { Grid, Icon, List, Loader, Segment } from "semantic-ui-react";
import { getPosts } from "../../actions/post";
import ListRealEstate from "../list-real-estate/list-real-estate.component";
import SearchBox from "../search-box/search-box.component";
import {
  CategoriesContainer,
  PaginationContainer,
  RealEstatePageContainer,
} from "./page-real-estate.styles";
import PaginationItem from "../pagination-item/pagination-item.component";

const RealEstatePage = () => {
  const [data, setData] = useState([]);

  const handlePaginationChange = (e, { activePage }) => {
    fetchAPI(activePage);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

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
            ) : (
              <>
                <ListRealEstate posts={data.posts} />
                <PaginationContainer>
                  <PaginationItem
                    defaultActivePage={1}
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
