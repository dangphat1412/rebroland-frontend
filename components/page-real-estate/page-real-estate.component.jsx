import React, { useEffect, useState } from "react";
import {
  Dimmer,
  Dropdown,
  Grid,
  Icon,
  List,
  Loader,
  Segment,
} from "semantic-ui-react";
import { getAllCategories } from "../../actions/post";
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
import { useRouter } from "next/router";

const RealEstatePage = ({
  user,
  postsData,
  followingPosts,
  setFollowingPosts,
  setTotalResult,
  searchParams,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sortValue, setSortValue] = useState(searchParams.sortValue || 0);
  const [data, setData] = useState(postsData || {});

  const [categories, setCategoties] = useState(null);

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await getAllCategories();
      setCategoties(data);
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    setData(postsData);
    setTotalResult(postsData.totalResult);
    setSortValue(searchParams.sortValue || 0);
  }, [searchParams]);

  const handleFilterOption = (e, { value }) => {
    setSortValue(value);
    fetchAPI(searchParams, value, 0);
  };

  const handlePaginationChange = (e, { activePage }) => {
    fetchAPI(searchParams, sortValue, activePage - 1);
  };

  const fetchAPI = async (params, sortValue, pageNo) => {
    const data = { ...params, sortValue, pageNo };
    if (router.asPath === "/bat-dong-san")
      router.push(
        {
          pathname: router.asPath,
          query: { data: JSON.stringify(data) },
        },
        "/bat-dong-san",
        { scroll: true }
      );
    if (router.asPath === "/nha-moi-gioi/bat-dong-san")
      router.push(
        {
          pathname: router.asPath,
          query: { data: JSON.stringify(data) },
        },
        "/nha-moi-gioi/bat-dong-san",
        { scroll: true }
      );
    // setLoading(true);
    // let postData;
    // if (router.pathname === "/bat-dong-san") {
    //   postData = params
    //     ? await searchPosts(params, sortValue, page)
    //     : await getPosts(sortValue, page);
    // } else {
    //   postData = params
    //     ? await searchOriginalPosts(params, sortValue, page)
    //     : await getOriginalPosts(sortValue, page);
    // }

    // setData(postData);
    // setTotalResult(postData.totalResult);
    // setLoading(false);
    // window.scrollTo({
    //   top: 0,
    //   behavior: "smooth",
    // });
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
              <SearchBox searchParams={searchParams} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            {data.totalResult === 0 ? (
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
            <Dimmer active={loading} inverted>
              <Loader>Đang tải dữ liệu</Loader>
            </Dimmer>
          </Grid.Column>
          <Grid.Column width={4}>
            <Dropdown
              fluid
              selection
              value={sortValue}
              options={options}
              onChange={handleFilterOption}
            />
            <CategoriesContainer>
              <h1>Danh mục Bất động sản</h1>
              {categories && (
                <List divided verticalAlign="middle" size="large" relaxed>
                  <List.Item>
                    <List.Content floated="right">
                      {categories.house} bất động sản
                    </List.Content>
                    <List.Content>Nhà ở</List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content floated="right">
                      {categories.apartment} bất động sản
                    </List.Content>
                    <List.Content>Nhà chung cư</List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content floated="right">
                      {categories.land} bất động sản
                    </List.Content>
                    <List.Content>Đất nền</List.Content>
                  </List.Item>
                </List>
              )}
            </CategoriesContainer>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </RealEstatePageContainer>
  );
};

export default RealEstatePage;
